import React, { createContext, useContext, useState, useEffect } from "react";
import { Screen, Campaign, Booking, User, Voucher } from "./types";
import { mockScreens, mockCampaigns, mockUser, mockOwner } from "./services/mockData";

interface AppContextType {
  user: User;
  screens: Screen[];
  campaigns: Campaign[];
  bookings: Booking[];
  vouchers: Voucher[];
  heroAdUrl?: string | null;
  setHeroAdUrl: (url: string | null) => void;
  heroAdMime?: string | null;
  setHeroAdMime: (mime: string | null) => void;
  role: 'ADVERTISER' | 'OWNER';
  setRole: (role: 'ADVERTISER' | 'OWNER') => void;
  addScreen: (screen: Partial<Screen>) => void;
  addCampaign: (campaign: Partial<Campaign>) => void;
  addBooking: (booking: Partial<Booking>) => void;
  earnVoucher: (campaign: Campaign) => void;
  redeemVoucher: (voucherId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<'ADVERTISER' | 'OWNER'>('ADVERTISER');
  const [screens, setScreens] = useState<Screen[]>(mockScreens);
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [heroAdUrl, setHeroAdUrl] = useState<string | null>(null);
  const [heroAdMime, setHeroAdMime] = useState<string | null>(null);

  const user = role === 'ADVERTISER' ? mockUser : mockOwner;

  const earnVoucher = (campaign: Campaign) => {
    // Check if already earned a voucher for this campaign
    if (vouchers.some(v => v.brandId === campaign.id)) return;

    const newVoucher: Voucher = {
      id: `v-${Date.now()}`,
      brandId: campaign.id,
      brandName: campaign.name,
      title: `${campaign.name} Special Offer`,
      code: `ADGRID-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      discount: "15% OFF",
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: campaign.mediaUrl,
      status: 'UNUSED',
      earnedAt: new Date().toISOString(),
    };
    setVouchers(prev => [newVoucher, ...prev]);
  };

  const redeemVoucher = (voucherId: string) => {
    setVouchers(prev => prev.map(v => v.id === voucherId ? { ...v, status: 'USED' } : v));
  };

  const addScreen = (screen: Partial<Screen>) => {
    const newScreen: Screen = {
      ...screen,
      id: `s-${Date.now()}`,
      ownerId: user.id,
    } as Screen;
    setScreens(prev => [newScreen, ...prev]);
  };

  const addCampaign = (campaign: Partial<Campaign>) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: `c-${Date.now()}`,
      advertiserId: user.id,
    } as Campaign;
    setCampaigns(prev => [newCampaign, ...prev]);
  };

  const addBooking = (booking: Partial<Booking>) => {
    const newBooking: Booking = {
      ...booking,
      id: `b-${Date.now()}`,
    } as Booking;
    setBookings(prev => [newBooking, ...prev]);
  };

  return (
    <AppContext.Provider value={{ 
      user, screens, campaigns, bookings, vouchers, role, setRole,
        heroAdUrl, setHeroAdUrl, heroAdMime, setHeroAdMime,
      addScreen, addCampaign, addBooking, earnVoucher, redeemVoucher
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
