import React, { useState, useEffect } from "react";
import { useApp } from "../../AppContext";
import { Activity, Radio, Signal, Eye, Clock, MapPin, MonitorPlay, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

const FEED_SYSTEMS = [
  "Optical Flow Engine",
  "Neural Audience Counter",
  "Edge Hash Validator",
  "Proof-of-Play Beacon"
];

export function LiveFeeds() {
  const { screens, campaigns, role } = useApp();
  const [activeFeeds, setActiveFeeds] = useState<string[]>([]);
  const [systemLogs, setSystemLogs] = useState<{ id: number, msg: string, type: 'info' | 'success' | 'warn' }[]>([]);

  useEffect(() => {
    // Simulate feed connectivity
    setActiveFeeds(screens.slice(0, 4).map(s => s.id));

    const logInterval = setInterval(() => {
      const msgs = [
        "Audience hash verified on edge node",
        "Neural payload sync successful",
        "Latency check: 14ms (Optimal)",
        "Rotation logic updated for local cluster",
        "Pixel-density audit completed"
      ];
      const types: ('info' | 'success' | 'warn')[] = ['info', 'success', 'info', 'success', 'info'];
      const idx = Math.floor(Math.random() * msgs.length);
      
      setSystemLogs(prev => [
        { id: Date.now(), msg: msgs[idx], type: types[idx] },
        ...prev.slice(0, 5)
      ]);
    }, 4000);

    return () => clearInterval(logInterval);
  }, [screens]);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">Live Neural Feeds</h1>
          <p className="text-zinc-500 font-medium">Real-time edge telemetry and visual verification node stream</p>
        </div>
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 px-6 py-3 rounded-2xl">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
          <span className="text-xs font-black text-green-600 uppercase tracking-widest">Network Synchronized</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed Monitor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {screens.slice(0, 4).map((screen, idx) => (
              <motion.div
                key={screen.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-video bg-black rounded-[2rem] overflow-hidden border-2 border-zinc-200 hover:border-orange-500 transition-all shadow-2xl"
              >
                <img 
                  src={screen.imageUrl} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity grayscale group-hover:grayscale-0 duration-700" 
                  alt={screen.name} 
                />
                
                {/* Overlay HUD */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-start bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Node-0{idx + 1}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-300">RSSI: -64dBm</span>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="bg-black/60 backdrop-blur-xl p-4 rounded-xl border border-white/5 max-w-[70%]">
                      <h4 className="text-xs font-black text-white truncate mb-1">{screen.name}</h4>
                      <div className="flex items-center gap-2">
                        <MapPin size={10} className="text-zinc-500" />
                        <span className="text-[10px] text-zinc-400 font-bold truncate">{screen.location.address}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-xl shadow-orange-500/40">
                      <Zap size={18} />
                    </div>
                  </div>
                </div>

                {/* Scanning Line Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-20 w-full animate-scan pointer-events-none" />
              </motion.div>
            ))}
          </div>

          <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Radio size={120} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/20">
                  <MonitorPlay size={40} />
                </div>
                <div>
                  <h3 className="text-3xl font-black tracking-tighter">Diagnostic HUB</h3>
                  <p className="text-zinc-400 font-bold">Cross-protocol signal validation active</p>
                </div>
              </div>
              <button
                onClick={() => alert('Full network ping initiated. All nodes responding.')}
                className="px-10 py-5 bg-white text-zinc-900 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
              >
                Full Network Ping
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Intelligence */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-xl shadow-black/5">
            <h3 className="text-xl font-black tracking-tighter mb-6 flex items-center gap-2">
              <Activity size={20} className="text-orange-500" /> System Protocols
            </h3>
            <div className="space-y-4">
              {FEED_SYSTEMS.map(sys => (
                <div key={sys} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-zinc-600">{sys}</span>
                  <div className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-[10px] font-black uppercase">Active</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black tracking-tighter">Edge Logs</h3>
              <div className="p-2 border border-white/10 rounded-lg text-[10px] font-mono text-zinc-500">REAL-TIME</div>
            </div>
            <div className="space-y-4 font-mono">
              <AnimatePresence>
                {systemLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="text-[10px] flex items-start gap-3 border-l-2 border-orange-500/30 pl-4 py-1"
                  >
                    <span className="text-zinc-600">[{new Date(log.id).toLocaleTimeString()}]</span>
                    <span className={cn(
                      log.type === 'success' ? "text-green-400" : log.type === 'warn' ? "text-orange-400" : "text-zinc-300"
                    )}>
                      {log.msg}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-orange-500/20">
             <div className="flex items-center gap-3 mb-6">
               <Signal size={24} />
               <h3 className="text-xl font-black tracking-tighter capitalize">{role.toLowerCase()} Signals</h3>
             </div>
             <p className="text-sm font-bold text-orange-100 leading-tight mb-8">
               {role === 'ADVERTISER' 
                 ? "You are currently monitoring your active creative flight across 5 premium clusters."
                 : "Your hardware cluster is projecting an 18.4% yield increase over the next 2 hours."}
             </p>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
                   <p className="text-[10px] font-black uppercase opacity-60 mb-1">Active Nodes</p>
                   <p className="text-2xl font-black">12/12</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
                   <p className="text-[10px] font-black uppercase opacity-60 mb-1">Stability</p>
                   <p className="text-2xl font-black">99.8%</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
