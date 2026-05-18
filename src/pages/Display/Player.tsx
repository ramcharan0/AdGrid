import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../../AppContext";
import { motion, AnimatePresence } from "motion/react";
import { Wifi, Hash, MonitorPlay, Activity, Gift, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";
import React from "react";

export function DisplayPlayer() {
  const { screenId } = useParams();
  const { screens, campaigns, earnVoucher, vouchers } = useApp();
  const screen = screens.find(s => s.id === screenId) || screens[0];
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showRewardNotification, setShowRewardNotification] = useState(false);

  // Filter campaigns that are ACTIVE or scheduled for this screen
  const playlist = campaigns.length > 0 ? campaigns : [];
  const currentAd = playlist[currentAdIndex];
  const activeAd = currentAd || {
    id: "system-idle",
    name: "Awaiting Campaign Payload",
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  };

  const hasEarnedForCurrent = vouchers.some(v => v.brandId === activeAd?.id);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (playlist.length <= 1) return;
    const adTimer = setInterval(() => {
      setCurrentAdIndex(prev => (prev + 1) % playlist.length);
    }, 10000); // Rotate every 10s
    return () => clearInterval(adTimer);
  }, [playlist.length]);

  useEffect(() => {
    if (activeAd.id === "system-idle") return;
    
    // Reset earned state for current view if needed? No, hasEarnedForCurrent handles it
    const rewardTimer = setTimeout(() => {
      if (!hasEarnedForCurrent) {
        earnVoucher(activeAd as any);
        setShowRewardNotification(true);
        setTimeout(() => setShowRewardNotification(false), 3000);
      }
    }, 5000); // Earn after 5s of watching

    return () => clearTimeout(rewardTimer);
  }, [activeAd.id, hasEarnedForCurrent]);

  if (!screen) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white p-12">
        <div className="text-center">
          <MonitorPlay size={64} className="mx-auto mb-6 text-zinc-800" />
          <h1 className="text-4xl font-black mb-2">Node Offline</h1>
          <p className="text-zinc-500 font-medium">This hardware identifier is not registered in the AdGrid cloud.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden cursor-auto select-none">
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeAd.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <img 
            src={activeAd.mediaUrl} 
            className="w-full h-full object-cover"
            alt="Advertisement Content"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

          {/* Reward Interaction Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <AnimatePresence>
              {showRewardNotification && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -20 }}
                  className="bg-white text-zinc-900 p-12 rounded-[3.5rem] shadow-[0_0_100px_rgba(249,115,22,0.4)] border-4 border-orange-500 text-center"
                >
                  <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} className="text-orange-500" />
                  </div>
                  <h2 className="text-5xl font-black tracking-tighter mb-2">Voucher Earned!</h2>
                  <p className="text-zinc-500 font-bold text-xl">Check your Rewards Vault in the AdGrid app.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Header Diagnostic HUD */}
          <div className="absolute top-0 inset-x-0 p-16 flex justify-between items-start pointer-events-none">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl">A</div>
                <h2 className="text-5xl font-black tracking-tighter uppercase">AdGrid <span className="opacity-40">Core</span></h2>
              </div>
              <p className="text-2xl font-black text-orange-500 ml-16 mt-2">
                 Node_{screen.id.slice(-6).toUpperCase()} • {screen.name}
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-3 text-right">
              <div className="text-8xl font-black tracking-tighter tabular-nums drop-shadow-2xl">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
              </div>
              <div className="flex items-center gap-4 px-6 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-300">
                  <Wifi size={14} className="text-green-500 animate-pulse" /> Signal Stable
                </div>
                <div className="w-px h-4 bg-zinc-700" />
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-300">
                  <Activity size={14} /> Synchronized
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info HUD */}
          <div className="absolute bottom-16 left-16 right-16 flex items-end justify-between transition-all duration-500 pointer-events-none">
            <div className="max-w-2xl bg-black/60 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <p className="text-orange-400 text-sm uppercase font-black tracking-widest">Active Ad Signal</p>
              </div>
              <h3 className="text-5xl font-black tracking-tighter mb-4">{activeAd.name}</h3>
              <div className="flex items-center gap-4">
                <p className="text-zinc-400 font-bold text-lg">{screen.location.address}</p>
                {activeAd.id !== "system-idle" && (
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-orange-500/20 border border-orange-500/30 rounded-full">
                    <Gift size={14} className={cn("text-orange-500", !hasEarnedForCurrent && "animate-bounce")} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">
                      {hasEarnedForCurrent ? "Voucher Secured" : "Watching for Voucher..."}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-6">
               <div className="text-right">
                  <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">Payload Hash</p>
                  <p className="text-zinc-300 font-mono text-sm uppercase">{Math.random().toString(36).substring(2, 15).toUpperCase()}</p>
               </div>
               <div className="w-96 h-3 bg-white/5 rounded-full overflow-hidden backdrop-blur-md border border-white/5">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 10, ease: "linear" }}
                    key={currentAdIndex}
                    className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
                  />
               </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
