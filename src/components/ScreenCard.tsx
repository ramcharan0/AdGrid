import { Monitor, MapPin, Users, DollarSign, ArrowRight, MonitorPlay } from "lucide-react";
import { Link } from "react-router-dom";
import { Screen } from "../types";
import { cn, formatCurrency } from "../lib/utils";
import { motion } from "motion/react";
import React from "react";

export interface ScreenCardProps {
  screen: Screen;
  onSelect?: (screen: Screen) => void;
  key?: any;
}

export function ScreenCard({ screen, onSelect }: ScreenCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={screen.imageUrl} 
          alt={screen.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-900 border border-white/20">
          {screen.category}
        </div>
        <div className="absolute bottom-4 right-4 bg-zinc-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
          {formatCurrency(screen.pricing.daily)}/day
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">{screen.name}</h3>
        <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
          <MapPin size={14} className="text-orange-500" />
          <span className="truncate">{screen.location.address}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Resolution</span>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Monitor size={14} />
              {screen.resolution}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Footfall</span>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Users size={14} />
              {screen.dailyFootfall.toLocaleString()} /day
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button 
            onClick={() => onSelect?.(screen)}
            className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 text-white py-3 rounded-2xl font-bold hover:bg-zinc-800 transition-all duration-300 shadow-lg shadow-black/10"
          >
            Book Slot <ArrowRight size={16} />
          </button>
          <Link 
            to={`/display/${screen.id}`} 
            target="_blank"
            className="w-12 h-12 flex items-center justify-center rounded-2xl border border-zinc-200 hover:bg-zinc-50 transition-colors"
          >
            <MonitorPlay size={20} className="text-zinc-600" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
