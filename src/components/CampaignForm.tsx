import React, { useState } from "react";
import { X, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { Campaign } from "../types";
import { motion } from "motion/react";

interface CampaignFormProps {
  onClose: () => void;
  onSave: (campaign: Partial<Campaign>) => void;
}

export function CampaignForm({ onClose, onSave }: CampaignFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    startDate: "",
    endDate: "",
    mediaUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=800",
    mediaType: "image" as "image" | "video",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.budget) return;
    
    onSave({
      name: formData.name,
      budget: Number(formData.budget),
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      mediaUrl: formData.mediaUrl,
      mediaType: formData.mediaType,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
          <h2 className="text-2xl font-black tracking-tighter">Create Campaign</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Campaign Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Summer Sale 2024"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Total Budget ($)</label>
                <input 
                  required
                  type="number" 
                  placeholder="500"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                  value={formData.budget}
                  onChange={e => setFormData({...formData, budget: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Media Type</label>
                <select 
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                  value={formData.mediaType}
                  onChange={e => setFormData({...formData, mediaType: e.target.value as any})}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Start Date</label>
                <input 
                  required
                  type="date" 
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                  value={formData.startDate}
                  onChange={e => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">End Date</label>
                <input 
                  required
                  type="date" 
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                  value={formData.endDate}
                  onChange={e => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Ad Creative (URL)</label>
              <div className="flex gap-2">
                <input 
                  type="url" 
                  placeholder="https://..."
                  className="flex-1 px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium"
                  value={formData.mediaUrl}
                  onChange={e => setFormData({...formData, mediaUrl: e.target.value})}
                />
                <button type="button" className="p-3 bg-zinc-100 rounded-xl text-zinc-500 hover:bg-zinc-200 transition-colors">
                  <Upload size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl shadow-black/10"
            >
              Initialize Campaign
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
