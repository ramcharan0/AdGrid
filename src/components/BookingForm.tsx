import React, { useState } from "react";
import { X, Calendar, Clock, CreditCard, ShieldCheck } from "lucide-react";
import { Screen, Campaign, Booking } from "../types";
import { motion } from "motion/react";
import { formatCurrency, formatDate } from "../lib/utils";

interface BookingFormProps {
  screen: Screen;
  campaigns: Campaign[];
  onClose: () => void;
  onSave: (booking: Partial<Booking>) => void;
}

export function BookingForm({ screen, campaigns, onClose, onSave }: BookingFormProps) {
  const [selectedCampaignId, setSelectedCampaignId] = useState(campaigns[0]?.id || "");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("09:00 - 10:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaignId || !date) return;

    onSave({
      screenId: screen.id,
      campaignId: selectedCampaignId,
      scheduledTime: new Date(date).toISOString(),
      amount: screen.pricing.hourly, // Simplified for demo
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
    });
    onClose();
  };

  const slots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="relative h-32 bg-zinc-900 overflow-hidden">
          <img src={screen.imageUrl} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h2 className="text-white text-2xl font-black tracking-tighter">{screen.name}</h2>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{screen.category}</p>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Select Campaign</label>
              <select 
                required
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium"
                value={selectedCampaignId}
                onChange={e => setSelectedCampaignId(e.target.value)}
              >
                <option value="">Choose a campaign...</option>
                {campaigns.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-zinc-400" size={16} />
                  <input 
                    required
                    type="date" 
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Time Slot</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 text-zinc-400" size={16} />
                  <select 
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                    value={timeSlot}
                    onChange={e => setTimeSlot(e.target.value)}
                  >
                    {slots.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-zinc-50 rounded-2xl space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500">Hourly Rate</span>
              <span className="font-bold">{formatCurrency(screen.pricing.hourly)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500">Service Fee (15%)</span>
              <span className="font-bold">{formatCurrency(screen.pricing.hourly * 0.15)}</span>
            </div>
            <div className="pt-3 border-t border-zinc-200 flex justify-between items-center">
              <span className="font-bold text-lg">Total</span>
              <span className="font-black text-2xl text-orange-600">{formatCurrency(screen.pricing.hourly * 1.15)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-zinc-400 font-bold uppercase tracking-widest justify-center">
            <ShieldCheck size={14} className="text-green-500" /> Secure Checkout & Proof-of-Display
          </div>

          <button 
            type="submit"
            className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2"
          >
            <CreditCard size={20} /> Pay & Schedule Ad
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
