
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import Replicate from "replicate";
import dotenv from "dotenv";

dotenv.config();
async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Lazy Initialization for Gemini API
  let genAI: GoogleGenAI | null = null;
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please set GEMINI_API_KEY in your .env file.");
    }
    if (!genAI) {
      genAI = new GoogleGenAI({ 
        apiKey
      });
    }
    return genAI;
  };

  app.post("/api/ai/generate-ad-copy", async (req, res) => {
    try {
      const { productName, targetAudience, tone } = req.body;
      const model = "gemini-3-flash-preview";
      const ai = getGenAI();
      
      const prompt = `Create a compelling 50-word ad copy for a Digital Out-of-Home (DOOH) billboard. 
Product: ${productName}
Target Audience: ${targetAudience}
Tone: ${tone}

Return ONLY the ad copy text, no additional commentary.`;
      
      const response = await ai.models.generateContent({
        model,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          systemInstruction: "You are a creative advertising copywriter specializing in DOOH advertising. Generate concise, impactful ad copy."
        }
      });

      const resultText = response.text || "Unable to generate ad copy.";
      res.json({ copy: resultText });
    } catch (error: any) {
      console.error("Ad Copy Generation Error:", error);
      res.status(500).json({ error: error.message });
    }
  });


  app.post("/api/ai/generate-poster", async (req, res) => {
    try {
      const { productName, style, colors } = req.body;
      const apiKey = process.env.REPLICATE_API_KEY;
      
      // If Replicate API key is not set, use mock
      if (!apiKey) {
        const posterUrl = `https://via.placeholder.com/1080x1920/2c3e50/ffffff?text=${encodeURIComponent(productName)}`;
        return res.json({ 
          posterUrl,
          message: "Poster generated (mock). Add REPLICATE_API_KEY to .env for real generation."
        });
      }
      
      // Use Replicate for real image generation
      const replicate = new Replicate({ auth: apiKey });
      const prompt = `Create a modern, premium DOOH advertising poster for ${productName}. Style: ${style}. Colors: ${colors}. Professional, eye-catching design. 16:9 aspect ratio, high resolution. Only the visual, no text overlay.`;
      
      const output = await replicate.run(
        "stability-ai/stable-diffusion-3",
        {
          input: {
            prompt,
            aspect_ratio: "16:9",
            output_format: "webp",
            negative_prompt: "text, watermark, blurry, low quality"
          }
        }
      );
      
      const posterUrl = Array.isArray(output) ? output[0] : output;
      res.json({ posterUrl, message: "Professional poster generated via Replicate" });
    } catch (error: any) {
      console.error("Poster Generation Error:", error);
      // Fall back to mock on error
      const posterUrl = `https://via.placeholder.com/1080x1920/2c3e50/ffffff?text=${encodeURIComponent(req.body.productName || "Ad")}`;
      res.json({ posterUrl, message: "Using fallback poster due to API error", error: error.message });
    }
  });

  app.post("/api/ai/generate-video", async (req, res) => {
    try {
      const { productName, duration, style } = req.body;
      const apiKey = process.env.REPLICATE_API_KEY;
      
      // If Replicate API key is not set, use mock
      if (!apiKey) {
        const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
        return res.json({ 
          videoUrl,
          duration,
          message: "Video generated (mock). Add REPLICATE_API_KEY to .env for real generation."
        });
      }
      
      // Use Replicate Stable Video Diffusion for real video generation
      const replicate = new Replicate({ auth: apiKey });
      const prompt = `Professional DOOH advertisement video for ${productName}. Style: ${style}. Duration: ${duration} seconds. Modern, engaging, eye-catching. High quality, cinematic. Product showcase.`;
      
      const output = await replicate.run(
        "stability-ai/stable-video-diffusion-img2vid-xt",
        {
          input: {
            prompt,
            num_inference_steps: 25,
            output_format: "mp4"
          }
        }
      );
      
      const videoUrl = Array.isArray(output) ? output[0] : output;
      res.json({ videoUrl, duration, message: "Professional video generated via Replicate" });
    } catch (error: any) {
      console.error("Video Generation Error:", error);
      // Fall back to mock on error
      const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
      res.json({ videoUrl, duration, message: "Using fallback video due to API error", error: error.message });
    }
  });
  app.post("/api/gemini/optimize", async (req, res) => {
    try {
      const { prompt, context } = req.body;
      const model = "gemini-3-flash-preview"; 
      const ai = getGenAI();
      
      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            role: "user",
            parts: [{ text: `System Context: You are a DOOH (Digital Out-of-Home) advertising expert. Provide strategic advice based on the following request.
            
Request: ${prompt}
Context: ${JSON.stringify(context)}` }]
          }
        ],
        config: {
          systemInstruction: "You are an expert in Digital Out-Of-Home (DOOH) advertising. Provide concise, strategic advice for campaign optimization, screen selection, and creative targeting."
        }
      });

      // Directly access .text property as per skill guidelines
      const resultText = response.text || "AI Insight generated but could not be parsed.";
      res.json({ text: resultText });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      
      const isAuthError = error.message.includes("403") || 
                         error.message.includes("400") || 
                         error.message.includes("PERMISSION_DENIED") ||
                         error.message.includes("API_KEY_INVALID");

      if (isAuthError) {
        res.status(403).json({ 
          error: "Gemini API key is invalid or missing. Please ensure it's correctly set in the Settings > Secrets panel of AI Studio." 
        });
      } else if (error.message.includes("429") || error.message.includes("RESOURCE_EXHAUSTED")) {
        res.status(429).json({
          error: "API Quota exceeded. Consider selecting a billing-enabled key in Settings > Secrets."
        });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
