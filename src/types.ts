export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADVERTISER' | 'OWNER' | 'ADMIN';
  createdAt: string;
}

export interface Screen {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  category: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'OFFLINE';
  resolution: string;
  dailyFootfall: number;
  pricing: {
    hourly: number;
    daily: number;
  };
  imageUrl: string;
  createdAt: string;
}

export interface Campaign {
  id: string;
  advertiserId: string;
  name: string;
  budget: number;
  status: 'DRAFT' | 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'REJECTED';
  startDate: string;
  endDate: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  createdAt: string;
}

export interface Booking {
  id: string;
  campaignId: string;
  screenId: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  amount: number;
  scheduledTime: string;
  createdAt: string;
}

export interface PlaybackLog {
  id: string;
  screenId: string;
  campaignId: string;
  playedAt: string;
  duration: number;
}

export interface Voucher {
  id: string;
  brandId: string;
  brandName: string;
  title: string;
  code: string;
  discount: string;
  expiryDate: string;
  imageUrl: string;
  status: 'UNUSED' | 'USED' | 'EXPIRED';
  earnedAt: string;
}
