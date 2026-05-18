# Replicate API Setup for Real Image & Video Generation

## Overview
The AI Generator now supports **real image and video generation** using **Replicate API**. The system gracefully falls back to mock URLs if no API key is configured.

## Getting Started

### Step 1: Create a Replicate Account
1. Go to [replicate.com](https://replicate.com)
2. Sign up for a free account
3. Navigate to your API token page: https://replicate.com/account/api-tokens

### Step 2: Get Your API Key
1. Copy your API token from the Replicate dashboard
2. Update `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_key_here
REPLICATE_API_KEY=your_replicate_token_here
```

### Step 3: Restart the Dev Server
```bash
npm run dev
```

## How It Works

### Image Generation (Posters)
- **Model**: Stability AI Stable Diffusion 3
- **Input**: Product name, style, colors
- **Output**: 16:9 high-resolution poster image
- **Format**: WebP (optimized for web)
- **Cost**: ~$0.04-0.10 per image (Replicate pay-as-you-go)

### Video Generation (Ads)
- **Model**: Stability AI Stable Video Diffusion
- **Input**: Product name, style, duration
- **Output**: MP4 video ad
- **Duration**: 5-60 seconds
- **Cost**: ~$0.20-0.50 per video (Replicate pay-as-you-go)

## Testing Without API Key

Even without a Replicate API key, the system still works:
- ✅ Ad Copy generation (Gemini - already working)
- ⚠️ Poster generation (mock placeholder image)
- ⚠️ Video generation (mock test video)

The app shows helpful messages indicating which features are using mocks vs. real APIs.

## Alternative Video Services

If you prefer different video generation services:

### Option 1: D-ID (Video from Image)
- Great for avatar-based videos
- Requires: D-ID API key
- Update `/api/ai/generate-video` endpoint

### Option 2: Banana.dev (Custom Models)
- Serverless GPU infrastructure
- Deploy your own models
- Requires: Banana API key + model deployment

### Option 3: Together AI (Open Models)
- Open-source model APIs
- Affordable and fast
- Requires: Together AI API key

## Troubleshooting

### "REPLICATE_API_KEY is missing"
- Add your API key to `.env`
- Restart the dev server
- The app will automatically use mocks if the key is invalid

### "API rate limit exceeded"
- Replicate has rate limits on the free tier
- Wait a few minutes before retrying
- Upgrade to a paid plan for higher limits

### Image/Video generation is slow
- First requests may take 30-60 seconds (model warm-up)
- Subsequent requests are faster
- Check Replicate dashboard for queue status

## Pricing

**Replicate Free Tier**:
- $0 startup (includes free credits)
- ~30-50 free image/video generations
- Then pay-as-you-go ($0.04-0.50 per generation)

**Example Costs**:
- 100 posters/month: ~$4-10
- 50 videos/month: ~$10-25
- Total: ~$15-35/month for modest usage

## Next Steps

1. ✅ Get a Replicate API key
2. ✅ Add it to `.env`
3. ✅ Restart dev server
4. ✅ Test the "Generate Poster" and "Generate Video" buttons
5. ⚙️ (Optional) Switch video provider to D-ID or Banana.dev if preferred

---

**Questions?** Check Replicate docs: https://replicate.com/docs
