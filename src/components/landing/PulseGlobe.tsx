import React from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";

export function PulseGlobe() {
  const points = [
    { name: "New York", x: "20%", y: "30%", delay: 0 },
    { name: "London", x: "45%", y: "25%", delay: 0.5 },
    { name: "Mumbai", x: "65%", y: "45%", delay: 1 },
    { name: "Singapore", x: "78%", y: "55%", delay: 1.5 },
    { name: "Tokyo", x: "85%", y: "35%", delay: 2 },
  ];

  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto flex items-center justify-center p-8">
      {/* Background Glows */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent top-1/2 -z-10" />
      <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-orange-500/20 to-transparent left-1/2 -z-10" />
      
      {/* The "Globe" Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-zinc-100 dark:border-zinc-800/50 shadow-[0_0_100px_rgba(249,115,22,0.05)]"
      />
      
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-10 rounded-full border border-dashed border-zinc-200"
      />

      {/* Pulsing Dots */}
      <div className="relative w-full h-full">
        {points.map((point) => (
          <motion.div
            key={point.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: point.delay }}
            style={{ left: point.x, top: point.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
          >
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: point.delay }}
                className="absolute inset-0 w-8 h-8 -left-3 -top-3 bg-orange-500 rounded-full blur-sm"
              />
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full relative z-10 shadow-[0_0_10px_#f97316]" />
              
              <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-zinc-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest z-20">
                {point.name} Node
              </div>
            </div>
          </motion.div>
        ))}

        {/* Abstract "Map" Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <path 
            d="M 20 30 Q 32.5 27.5 45 25 Q 55 35 65 45 Q 71.5 50 78 55"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="vector-path"
            pathLength={1}
            strokeDashoffset={0}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-9xl font-black text-zinc-100/50 select-none tracking-tighter"
            >
                MAP
            </motion.div>
        </div>
      </div>
    </div>
  );
}
