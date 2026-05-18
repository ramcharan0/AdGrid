import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { LayoutDashboard, Monitor, Search, BarChart3, Settings, PlusCircle, Activity, MonitorPlay, Gift, Radio } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./lib/utils";
import { User } from "./types";
import { AppProvider, useApp } from "./AppContext";

import { AdvertiserDashboard } from "./pages/Advertiser/Dashboard";
import { AdvertiserDiscovery } from "./pages/Advertiser/Discovery";
import { AdvertiserAnalytics } from "./pages/Advertiser/Analytics";
import { ConsumerRewards } from "./pages/Consumer/Rewards";
import { OwnerDashboard } from "./pages/Owner/Dashboard";
import { DisplayPlayer } from "./pages/Display/Player";
import { LiveFeeds } from "./pages/Shared/LiveFeeds";
import { Account } from "./pages/Shared/Account";
import { InfoPage } from "./pages/Shared/InfoPage";

import { Hero3D } from "./components/landing/Hero3D";
import { FeaturesBento } from "./components/landing/FeaturesBento";

const Home = () => (
  <div className="flex flex-col bg-white">
      <header className="fixed top-0 inset-x-0 z-50 p-6 flex justify-center items-center max-w-7xl mx-auto w-full">
      <div className="w-full flex justify-between items-center px-6 py-4 rounded-full border border-orange-200/60 bg-orange-50/65 backdrop-blur-xl shadow-xl shadow-orange-500/10">
        <Link to="/" className="text-3xl font-black tracking-tighter text-zinc-900">
          AdGrid<span className="text-orange-500">.</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/advertiser/discovery" className="text-xs font-black uppercase tracking-widest text-zinc-900 hover:text-orange-500 transition-colors">Marketplace</Link>
          <Link to="/owner/dashboard" className="text-xs font-black uppercase tracking-widest text-zinc-900 hover:text-orange-500 transition-colors">Start Hosting</Link>
          <Link to="/advertiser/dashboard" className="bg-zinc-900 text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">Launch Console</Link>
        </div>
      </div>
    </header>

    <Hero3D />
    <FeaturesBento />

    <footer className="bg-white py-32 px-4 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
        <div className="space-y-8 max-w-sm">
          <Link to="/" className="text-4xl font-black tracking-tighter">
            AdGrid<span className="text-orange-500">.</span>
          </Link>
          <p className="text-zinc-500 font-medium leading-relaxed">
            Revolutionizing the physical advertising layer. We provide the infrastructure for a world where every screen is programmable.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
              <a key={social} href="#" className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">{social}</a>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-20">
          <FooterColumn title="Platform" links={['Marketplace', 'Neural Engine', 'Edge API', 'Hardware']} />
          <FooterColumn title="Resources" links={['Documentation', 'Proof of Play', 'Security', 'Audit Logs']} />
          <FooterColumn title="Company" links={['Founders', 'Careers', 'Contact', 'Press Kit']} className="hidden lg:block" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-zinc-100 flex justify-between items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest">
        <span>© 2024 AdGrid Laboratories Inc.</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-zinc-900">Privacy Protocol</a>
          <a href="#" className="hover:text-zinc-900">Service Agreement</a>
        </div>
      </div>
    </footer>
  </div>
);

function FooterColumn({ title, links, className }: { title: string, links: string[], className?: string }) {
  return (
    <div className={className}>
      <h4 className="text-[10px] font-black text-zinc-900 uppercase tracking-widest mb-6">{title}</h4>
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link}>
            <Link to={`/info/${link.replace(/\s+/g, '-').toLowerCase()}`} className="text-sm font-bold text-zinc-500 hover:text-orange-500 transition-colors">{link}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const NavLink = ({ to, icon: Icon, children, current }: { to: string, icon: any, children: React.ReactNode, current: boolean, key?: any }) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300",
      current ? "bg-zinc-900 text-white shadow-xl shadow-black/10 translate-x-1" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
    )}
  >
    <Icon size={20} />
    <span className="font-bold">{children}</span>
  </Link>
);

const Sidebar = () => {
  const { role, user } = useApp();
  const location = useLocation();
  
  const advertiserLinks = [
    { to: "/advertiser/dashboard", icon: LayoutDashboard, label: "Campaigns" },
    { to: "/advertiser/discovery", icon: Search, label: "Marketplace" },
    { to: "/advertiser/analytics", icon: BarChart3, label: "Analytics" },
    { to: "/feeds", icon: Radio, label: "Live Feeds" },
    { to: "/rewards", icon: Gift, label: "My Rewards" },
    { to: "/settings", icon: Settings, label: "Account" },
  ];

  const ownerLinks = [
    { to: "/owner/dashboard", icon: LayoutDashboard, label: "Overview" },
    { to: "/owner/screens", icon: Monitor, label: "Management" },
    { to: "/feeds", icon: Radio, label: "Live Feeds" },
    { to: "/rewards", icon: Gift, label: "My Rewards" },
    { to: "/settings", icon: Settings, label: "Account" },
  ];

  const links = role === 'ADVERTISER' ? advertiserLinks : ownerLinks;

  return (
    <div className="w-72 h-screen border-r border-zinc-200 p-8 flex flex-col fixed left-0 top-0 bg-white z-10">
      <Link to="/" className="text-3xl font-black tracking-tighter mb-12 block px-2">
        AdGrid<span className="text-orange-500">.</span>
      </Link>
      
      <div className="space-y-1.5 flex-1">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-4 mb-5">
          Console
        </p>
        {links.map(link => (
          <NavLink key={link.to} to={link.to} icon={link.icon} current={location.pathname === link.to}>
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="pt-8 border-t border-zinc-100">
        <div className="flex items-center gap-4 px-4 py-4 bg-zinc-50 rounded-[1.5rem] border border-zinc-100">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-500/20">
            {user.name[0]}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-black truncate">{user.name}</span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{role.toLowerCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OwnerScreens = () => {
  const { screens } = useApp();
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">My Screens</h1>
          <p className="text-zinc-500">Manage your connected hardware and availability</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {screens.map(screen => (
          <div key={screen.id} className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm flex flex-col gap-4">
             <div className="relative aspect-video rounded-2xl overflow-hidden">
                <img src={screen.imageUrl} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-green-500 w-3 h-3 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)] border-2 border-white" />
             </div>
             <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{screen.name}</h3>
                <p className="text-xs text-zinc-500 mb-4">{screen.location.address}</p>
                <div className="flex gap-2">
                   <div className="bg-zinc-100 px-3 py-1 rounded-lg text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                      {screen.status}
                   </div>
                   <div className="bg-zinc-100 px-3 py-1 rounded-lg text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                      {screen.resolution}
                   </div>
                </div>
             </div>
             <Link 
               to={`/display/${screen.id}`} 
               target="_blank"
               className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all"
             >
               Launch Player <MonitorPlay size={18} />
             </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function MainLayout() {
  const { role, setRole } = useApp();
  
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-72 p-10 min-h-screen bg-[#fafafa]">
        <header className="flex justify-between items-center mb-10 bg-white/80 backdrop-blur-xl p-5 rounded-[2rem] border border-white shadow-xl shadow-black/5 sticky top-6 z-[20]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center text-white">
              <Activity size={20} />
            </div>
            <h2 className="text-xl font-black tracking-tighter capitalize">{role.toLowerCase()} Neural Console</h2>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setRole(role === 'ADVERTISER' ? 'OWNER' : 'ADVERTISER')}
              className="text-[10px] font-black uppercase tracking-widest bg-zinc-100 px-6 py-3 rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-inner active:scale-95"
            >
              Switch to {role === 'ADVERTISER' ? 'Owner' : 'Advertiser'} Mode
            </button>
          </div>
        </header>
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/advertiser/dashboard" element={<AdvertiserDashboard />} />
            <Route path="/advertiser/discovery" element={<AdvertiserDiscovery />} />
            <Route path="/advertiser/analytics" element={<AdvertiserAnalytics />} />
            <Route path="/info/:slug" element={<InfoPage />} />
            <Route path="/rewards" element={<ConsumerRewards />} />
            <Route path="/feeds" element={<LiveFeeds />} />
            <Route path="/settings" element={<Account />} />
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path="/owner/screens" element={<OwnerScreens />} />
            <Route path="*" element={<Navigate to={role === 'ADVERTISER' ? "/advertiser/dashboard" : "/owner/dashboard"} />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-orange-500 selection:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/display/:screenId" element={<DisplayPlayer />} />
            <Route path="/*" element={<MainLayout />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
