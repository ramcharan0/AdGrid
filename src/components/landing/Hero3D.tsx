import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Monitor, Play, Zap } from "lucide-react";

export function Hero3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 -z-20 opacity-[0.03]" 
        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10 text-center lg:text-left relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl sm:text-8xl xl:text-9xl font-[1000] tracking-tighter leading-[0.85] text-zinc-900"
          >
            Control the <br />
            <span className="text-orange-500">Global Grid.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-500 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            The world's first programmable advertising network. Reach millions of eyes across a decentralized grid of hyper-local screens with millisecond precision.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
          >
            <Link 
              to="/advertiser/discovery" 
              className="group relative bg-zinc-900 text-white px-10 py-6 rounded-full font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Deploy Campaign <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <Link 
              to="/owner/dashboard" 
              className="text-zinc-600 font-black hover:text-zinc-900 transition-colors flex items-center gap-3 px-8 py-6"
            >
              Learn about Nodes <Play size={20} className="fill-zinc-400 group-hover:fill-zinc-900" />
            </Link>
          </motion.div>
        </div>

        <div className="relative h-[600px] hidden lg:block">
          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-80 bg-white p-6 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-zinc-100 z-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-tighter">Live Traffic</h4>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">South Delhi Node</p>
              </div>
            </div>
            <div className="space-y-3">
               <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div animate={{ width: ["10%", "85%", "40%"] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-orange-500" />
               </div>
               <div className="h-2 w-3/4 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div animate={{ width: ["40%", "20%", "60%"] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="h-full bg-zinc-900" />
               </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-0 w-72 bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl z-20 overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-orange-500/20 rounded-full blur-2xl" />
            <h4 className="text-white font-black text-xl mb-2 tracking-tighter">Real-Time Yield</h4>
            <p className="text-4xl font-[1000] text-orange-500 tracking-tighter">₹1,24,050</p>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-4">Across 12 nodes</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-32 bg-orange-500/5 blur-3xl -z-10 rotate-45" 
          />
          
          {/* Main Visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ rotateY: [0, 15, -15, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="w-[450px] aspect-[4/3] bg-zinc-200 rounded-[4rem] relative overflow-hidden shadow-2xl border-4 border-white"
            >
              <img src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <div className="bg-white text-orange-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">OPPO X9</div>
                <h3 className="text-white text-3xl font-black tracking-tighter">OPPO X9 — Capture the Moment</h3>
                <p className="text-sm text-zinc-200 mt-2">Now available across premium nodes</p>
                <Link to="/advertiser/discovery" className="mt-4 inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full font-bold">
                  Explore
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
