import { Screen, Campaign, User } from "../types";

export const mockUser: User = {
  id: "u1",
  name: "John Advertiser",
  email: "john@example.com",
  role: "ADVERTISER",
  createdAt: new Date().toISOString(),
};

export const mockOwner: User = {
  id: "o1",
  name: "Screen Space Corp",
  email: "owner@example.com",
  role: "OWNER",
  createdAt: new Date().toISOString(),
};

export const mockScreens: Screen[] = [
  {
    id: "s1",
    ownerId: "o1",
    name: "Central Square Mall - Main Atrium",
    description: "High-visibility 4K LCD screen in the main mall atrium. Reaches thousands of shoppers daily.",
    location: {
      latitude: 1.290270,
      longitude: 103.851959,
      address: "123 Orchard Road, Singapore"
    },
    category: "Retail",
    status: "ACTIVE",
    resolution: "3840x2160",
    dailyFootfall: 15000,
    pricing: { hourly: 45, daily: 350 },
    imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=800",
    createdAt: new Date().toISOString(),
  },
  {
    id: "s2",
    ownerId: "o1",
    name: "Business Bay Subway Entrance",
    description: "Twin 1080p vertical screens flanking the main subway entrance. Perfect for morning commuters.",
    location: {
      latitude: 1.2847,
      longitude: 103.8438,
      address: "Raffles Place MRT, Singapore"
    },
    category: "Transit",
    status: "ACTIVE",
    resolution: "1080x1920",
    dailyFootfall: 45000,
    pricing: { hourly: 60, daily: 500 },
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    createdAt: new Date().toISOString(),
  },
  {
    id: "s3",
    ownerId: "o1",
    name: "TechHub Co-working Lobby",
    description: "Sleek 65-inch screen targeting tech professionals and digital nomads.",
    location: {
      latitude: 1.2985,
      longitude: 103.7884,
      address: "Fusionopolis One, Singapore"
    },
    category: "Education",
    status: "ACTIVE",
    resolution: "1920x1080",
    dailyFootfall: 2500,
    pricing: { hourly: 20, daily: 150 },
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    createdAt: new Date().toISOString(),
  },
  {
    id: "s4",
    ownerId: "o1",
    name: "Ring Road - Lajpat Nagar Divider",
    description: "High-impact digital divider screen on one of Delhi's busiest arterial roads.",
    location: {
      latitude: 28.5677,
      longitude: 77.2433,
      address: "Inner Ring Road, Lajpat Nagar, New Delhi, India"
    },
    category: "Divider",
    status: "ACTIVE",
    resolution: "1920x480",
    dailyFootfall: 120000,
    pricing: { hourly: 80, daily: 750 },
    imageUrl: "https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?auto=format&fit=crop&q=80&w=800",
    createdAt: new Date().toISOString(),
  },
  {
    id: "s5",
    ownerId: "o1",
    name: "Western Express Highway Banner",
    description: "Massive roadside digital banner targeting traffic heading towards Mumbai Airport.",
    location: {
      latitude: 19.1136,
      longitude: 72.8697,
      address: "WEH, Andheri East, Mumbai, India"
    },
    category: "Roadside",
    status: "ACTIVE",
    resolution: "3840x1080",
    dailyFootfall: 200000,
    pricing: { hourly: 120, daily: 1200 },
    imageUrl: "https://images.unsplash.com/photo-1617135670953-294791040332?auto=format&fit=crop&q=80&w=800",
    createdAt: new Date().toISOString(),
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: "c1",
    advertiserId: "u1",
    name: "Summer Sale 2024",
    budget: 2000,
    status: "ACTIVE",
    startDate: "2024-06-01T00:00:00Z",
    endDate: "2024-06-30T23:59:59Z",
    mediaUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    mediaType: "image",
    createdAt: new Date().toISOString(),
  }
];
