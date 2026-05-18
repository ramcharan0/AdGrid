# AdGrid — Programmable Physical Advertising Network

> **Control the Global Grid.** The world's first programmable DOOH (Digital Out-of-Home) advertising platform. Reach millions of eyes across a decentralized grid of hyper-local screens with millisecond precision.

![AdGrid Banner](https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=1200)

---

## 🌐 Overview

**AdGrid** is a full-stack web application that serves as the operating system for the physical advertising world. It connects **Screen Owners** (who have physical digital screens) with **Advertisers** (who want to run campaigns), delivering a seamless marketplace powered by AI-generated creatives, real-time analytics, and a consumer-facing rewards engine.

The platform is built around three core user roles:

| Role | Description |
|---|---|
| **Advertiser** | Creates and manages ad campaigns, discovers screens via map, views analytics |
| **Screen Owner** | Registers physical screens, monitors their network, tracks revenue |
| **Display** | A dedicated fullscreen player mode that runs on the physical screen hardware |

---

## ✨ Key Features

### 🎯 For Advertisers
- **Campaign Console** — Deploy, manage, and monitor ad campaigns with live spend tracking, reach metrics, and playback node logs
- **Screen Marketplace** — Discover available screens across India via an interactive map with AI-powered hotspot overlays (50+ premium locations catalogued)
- **AI Ad Generator** — Generate ad copy, posters, and videos using **Google Gemini** and **Replicate** (Stable Diffusion)
- **Campaign Intelligence** — Rich analytics dashboard with audience flux charts, budget burn rates, geo-heatmaps, and node efficiency metrics
- **Proof of Play** — Every millisecond of playback is logged and verifiable via the immutable edge ledger

### 🖥️ For Screen Owners
- **Node Dashboard** — Overview of all registered screens with real-time health indicators (uptime, signal, sync status)
- **Yield Analytics** — Revenue charts broken down by day/week, occupancy rates, and total impressions
- **Screen Management** — Register new nodes with full details (location, resolution, pricing, category)
- **Automated Yield Management** — AI-driven price optimization based on local foot traffic and demand

### 📺 Display Player
- **Fullscreen Ad Player** — A dedicated `/display/:screenId` mode meant to run on the physical screen hardware
- **Live Ad Rotation** — Automatically cycles through active campaign creatives every 10 seconds
- **Screen HUD** — Displays node ID, live clock, signal status, payload hash, and ad progress bar
- **Reward Trigger** — Awards vouchers to viewers who watch for 5+ seconds (connects to the Rewards engine)

### 🎁 Consumer Rewards Vault
- Consumers who watch AdGrid screens earn exclusive **brand vouchers** (15% off, etc.)
- Vouchers have unique codes, expiry dates, and can be redeemed directly from the app
- Vouchers are earned automatically when the Display Player detects a 5-second view

### 📡 Live Neural Feeds
- Real-time node monitoring with simulated CCTV-style feeds for each screen
- Live edge telemetry logs (audience hash verification, payload sync, latency checks)
- System protocol status (Optical Flow Engine, Neural Audience Counter, Edge Hash Validator, Proof-of-Play Beacon)
- Full network ping capability

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 with TypeScript |
| **Routing** | React Router DOM v7 |
| **Build Tool** | Vite 6 |
| **Backend** | Express.js (served via `tsx` in dev) |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion (`motion/react`) |
| **Charts** | Recharts |
| **Maps** | React-Leaflet + OpenStreetMap |
| **AI — Copy/Optimize** | Google Gemini API (`@google/genai`) |
| **AI — Images/Video** | Replicate (Stable Diffusion 3 / SVD) |
| **Icons** | Lucide React |
| **Utilities** | `date-fns`, `clsx`, `tailwind-merge` |

---

## 📁 Project Structure

```
adgrid/
├── server.ts                   # Express backend (API routes + Vite dev middleware)
├── index.html                  # App entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
├── .env.example                # Environment variable template
│
└── src/
    ├── main.tsx                # React app mount
    ├── App.tsx                 # Root component: routing, layout, sidebar
    ├── AppContext.tsx          # Global state (screens, campaigns, bookings, vouchers)
    ├── types.ts                # TypeScript interfaces
    ├── index.css               # Global styles
    │
    ├── components/
    │   ├── BookingForm.tsx     # Ad slot booking form
    │   ├── CampaignForm.tsx    # Campaign creation form
    │   ├── DiscoveryMap.tsx    # Interactive Leaflet map with LCD hotspots
    │   ├── ScreenCard.tsx      # Screen listing card
    │   ├── ScreenForm.tsx      # Screen registration form
    │   └── landing/
    │       ├── Hero3D.tsx      # Landing page hero with floating UI panels
    │       ├── FeaturesBento.tsx # Feature highlight grid
    │       └── PulseGlobe.tsx  # Animated globe visual
    │
    ├── pages/
    │   ├── Advertiser/
    │   │   ├── Dashboard.tsx   # Campaign management + AI Generator
    │   │   ├── Discovery.tsx   # Screen marketplace with map
    │   │   └── Analytics.tsx   # Campaign intelligence dashboard
    │   ├── Owner/
    │   │   └── Dashboard.tsx   # Revenue, node health, screen management
    │   ├── Consumer/
    │   │   └── Rewards.tsx     # Voucher vault
    │   ├── Display/
    │   │   └── Player.tsx      # Fullscreen hardware player
    │   └── Shared/
    │       ├── LiveFeeds.tsx   # Real-time node monitoring
    │       ├── Account.tsx     # User account settings
    │       └── InfoPage.tsx    # Static info pages (docs, legal, etc.)
    │
    └── services/
        └── mockData.ts         # Seed data: screens, campaigns, users
```

---

## 🗺️ Data Models

```typescript
// Core entities managed in global state (AppContext)

User       → id, name, email, role (ADVERTISER | OWNER | ADMIN)
Screen     → id, ownerId, name, location {lat/lng/address}, category,
             status, resolution, dailyFootfall, pricing {hourly/daily}
Campaign   → id, advertiserId, name, budget, status, startDate, endDate,
             mediaUrl, mediaType (image | video)
Booking    → id, campaignId, screenId, status, amount, scheduledTime
PlaybackLog → id, screenId, campaignId, playedAt, duration
Voucher    → id, brandId, brandName, title, code, discount, expiryDate,
             status (UNUSED | USED | EXPIRED)
```

---

## 🔌 API Endpoints

All API routes are served by the Express backend at `server.ts`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/ai/generate-ad-copy` | Generate DOOH ad copy using Google Gemini |
| `POST` | `/api/ai/generate-poster` | Generate ad poster via Replicate (Stable Diffusion 3) |
| `POST` | `/api/ai/generate-video` | Generate ad video via Replicate (SVD) |
| `POST` | `/api/gemini/optimize` | General DOOH strategy advice using Gemini |

> **Fallback**: If `REPLICATE_API_KEY` is not set, poster and video generation return placeholder content automatically.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/ramcharan0/AdGrid.git
cd AdGrid
npm install
```

### Environment Setup

Copy the example env file and fill in your keys:

```bash
cp .env.example .env
```

```env
# Required for AI ad copy generation and campaign optimization
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Required for real image/video generation via Replicate
# Without this, placeholder media is returned as fallback
REPLICATE_API_KEY=your_replicate_api_key_here

# Your app's base URL (auto-injected in production environments)
APP_URL="http://localhost:3000"
```

**Getting API Keys:**
- **Gemini API Key** → [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Replicate API Key** → [Replicate.com](https://replicate.com/account/api-tokens)

### Running the App

```bash
# Development (starts Express + Vite dev server together)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build   # Builds frontend + bundles server
npm start       # Runs the production server
```

---

## 🖥️ Application Routes

| Route | Description |
|---|---|
| `/` | Landing page (Hero, Features, Footer) |
| `/advertiser/dashboard` | Campaign management console |
| `/advertiser/discovery` | Screen marketplace with Leaflet map |
| `/advertiser/analytics` | Campaign intelligence and charts |
| `/owner/dashboard` | Screen owner revenue and node health |
| `/owner/screens` | Screen management grid |
| `/feeds` | Live neural feed monitoring |
| `/rewards` | Consumer voucher vault |
| `/settings` | Account settings |
| `/display/:screenId` | **Fullscreen player** (meant for physical hardware) |
| `/info/:slug` | Static info pages (docs, legal, etc.) |

---

## 🤖 AI Features In Depth

### Ad Copy Generation (Gemini)
Takes `productName`, `targetAudience`, and `tone` → returns a punchy 50-word DOOH billboard copy.

### Poster Generation (Replicate / Stable Diffusion 3)
Generates a high-resolution visual ad poster based on product and style parameters. Falls back to a placeholder if API key is absent.

### Video Generation (Replicate / Stable Video Diffusion)
Creates a short MP4 product showcase video optimized for DOOH screens.

### Campaign Optimization (Gemini)
Provides strategic DOOH advice — screen selection, targeting, yield optimization — based on campaign context.

---

## 🗺️ Screen Marketplace — Hotspot Coverage

The Discovery Map (`DiscoveryMap.tsx`) includes **50+ pre-mapped LCD hotspots** across major Indian cities, visualized as confidence-weighted circle markers:

| City | Locations |
|---|---|
| **Delhi NCR** | Connaught Place, Rajiv Chowk Metro, Select CITYWALK, DLF Avenue, Noida Sector 18 |
| **Mumbai** | Phoenix Marketcity, Andheri Metro, Bandra Station, High Street Phoenix, WEH |
| **Bengaluru** | Majestic Metro, Forum Mall Koramangala, Bangalore Central |
| **Hyderabad** | Ameerpet Metro, HITEC City, GVK One Mall, Secunderabad Junction |
| **Chennai** | Chennai Central, Phoenix Marketcity, Vadapalani Metro |
| **Pune, Kolkata, Ahmedabad, Jaipur, Lucknow, Surat, Nagpur, Indore, Bhopal, Warangal, Visakhapatnam, Coimbatore** | Key malls, rail hubs, transit zones |

---

## 🧩 Role Switching

AdGrid supports a **single-user demo mode** where you can toggle between Advertiser and Owner roles using the **"Switch to Owner/Advertiser Mode"** button in the top navigation bar. This swaps the sidebar navigation, user profile, and all context-sensitive data accordingly.

---

## 📊 Mock Data

The app ships with seed data in `src/services/mockData.ts`:

- **5 screens** across Singapore and India (Mall, Transit, Roadside, Divider, Co-working categories)
- **1 active campaign** — "Summer Sale 2024" / OPPO X9 (with live spend simulation)
- **2 mock users** — John Advertiser & Screen Space Corp (Owner)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is for demonstration and educational purposes.

---

<div align="center">
  <strong>AdGrid.</strong> — Revolutionizing the physical advertising layer.<br/>
  Built with ❤️ using React, Express, Gemini AI & Replicate.
</div>
