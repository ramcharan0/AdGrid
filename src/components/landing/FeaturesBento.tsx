import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, BarChart3, Database, Globe, Cpu, Target } from "lucide-react";
import { PulseGlobe } from "./PulseGlobe";

export function FeaturesBento() {
  return (
    <section className="py-32 px-4 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-6xl font-black tracking-tighter text-zinc-900">Built for the <br /><span className="text-orange-500">Physical Web.</span></h2>
          <p className="text-zinc-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            We've engineered the layer between digital precision and physical impact. Every pixel is validated, every impression is verified.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 auto-rows-[280px]">
          {/* Card 1: Map Globe */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="md:col-span-3 lg:col-span-6 row-span-2 bg-white rounded-[3.5rem] border border-zinc-200 shadow-xl shadow-black/5 p-12 relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="absolute inset-0 -z-10 group-hover:scale-110 transition-transform duration-1000">
               <PulseGlobe />
            </div>
            <div className="relative z-10 z-20 pointer-events-none">
              <div className="w-16 h-16 bg-zinc-900 text-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                <Globe size={32} />
              </div>
              <h3 className="text-4xl font-black tracking-tighter mb-4 text-zinc-900">Hyper-Local <br /> Discovery</h3>
              <p className="text-zinc-500 font-medium max-w-xs leading-relaxed">
                Source high-impact inventory across the globe with millimetre precision and demographic layering.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Security */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="md:col-span-3 lg:col-span-6 bg-zinc-900 text-white rounded-[3rem] p-12 relative overflow-hidden flex flex-col justify-center group"
          >
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/30 transition-colors" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                 <ShieldCheck size={40} className="text-orange-500" />
                 <h3 className="text-3xl font-black tracking-tighter">Proof-of-Display</h3>
              </div>
              <p className="text-zinc-400 font-medium text-lg leading-relaxed">
                Immutable ledger verification for every single millisecond of playback. No more vanity metrics.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Neural Optimization */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="md:col-span-2 lg:col-span-4 bg-white rounded-[3rem] border border-zinc-200 p-10 flex flex-col justify-between group"
          >
             <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                <Cpu size={24} />
             </div>
             <div>
                <h4 className="text-2xl font-black tracking-tighter mb-2">Neural Engine</h4>
                <p className="text-zinc-500 font-medium text-sm">Dynamic yield optimization that adjust prices in real-time based on local foot traffic.</p>
             </div>
          </motion.div>

          {/* Card 4: Analytics */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="md:col-span-2 lg:col-span-4 bg-white rounded-[3rem] border border-zinc-200 p-10 flex flex-col justify-between group"
          >
             <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-2xl flex items-center justify-center">
                <BarChart3 size={24} />
             </div>
             <div>
                <h4 className="text-2xl font-black tracking-tighter mb-2">Edge Telemetry</h4>
                <p className="text-zinc-500 font-medium text-sm">Real-time data streams from every node, aggregate per-second stats on reach and visibility.</p>
             </div>
          </motion.div>

          {/* Card 5: Inventory */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="md:col-span-2 lg:col-span-4 bg-orange-500 text-white rounded-[3rem] p-10 flex flex-col justify-between group"
          >
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Database size={24} />
             </div>
             <div>
                <h4 className="text-2xl font-black tracking-tighter mb-2">Global Inventory</h4>
                <p className="text-orange-100 font-medium text-sm">Access 100k+ screens with a single API call. Scaling from one city to global dominance in minutes.</p>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
