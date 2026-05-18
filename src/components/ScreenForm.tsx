import React, { useState } from "react";
import { X, MapPin, Camera, Info, DollarSign } from "lucide-react";
import { Screen } from "../types";
import { motion } from "motion/react";

interface ScreenFormProps {
  onClose: () => void;
  onSave: (screen: Partial<Screen>) => void;
}

export function ScreenForm({ onClose, onSave }: ScreenFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Retail",
    resolution: "1920x1080",
    dailyFootfall: "",
    hourlyPrice: "",
    dailyPrice: "",
    lat: "",
    lng: "",
    address: "",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      name: formData.name,
      description: formData.description,
      category: formData.category,
      resolution: formData.resolution,
      dailyFootfall: Number(formData.dailyFootfall),
      pricing: {
        hourly: Number(formData.hourlyPrice),
        daily: Number(formData.dailyPrice),
      },
      location: {
        latitude: Number(formData.lat) || 28.56,
        longitude: Number(formData.lng) || 77.24,
        address: formData.address,
      },
      imageUrl: formData.imageUrl,
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
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
      >
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
          <h2 className="text-2xl font-black tracking-tighter">Register New Screen</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Screen Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Times Square North"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Category</label>
                <select 
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Retail">Retail / Mall</option>
                  <option value="Transit">Transit / Station</option>
                  <option value="Roadside">Roadside / Billboard</option>
                  <option value="Divider">Road Divider</option>
                  <option value="Education">Education / Campus</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Hourly ($)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.hourlyPrice}
                    onChange={e => setFormData({...formData, hourlyPrice: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Daily ($)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.dailyPrice}
                    onChange={e => setFormData({...formData, dailyPrice: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Resolution</label>
                <input 
                  type="text" 
                  placeholder="3840x2160"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                  value={formData.resolution}
                  onChange={e => setFormData({...formData, resolution: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Physical Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-zinc-400" size={16} />
                  <input 
                    required
                    type="text" 
                    placeholder="Enter full address..."
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Latitude</label>
                  <input 
                    type="text" 
                    placeholder="28.56"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                    value={formData.lat}
                    onChange={e => setFormData({...formData, lat: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Longitude</label>
                  <input 
                    type="text" 
                    placeholder="77.12"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                    value={formData.lng}
                    onChange={e => setFormData({...formData, lng: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Daily Footfall (Est.)</label>
                <input 
                  required
                  type="number" 
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm"
                  value={formData.dailyFootfall}
                  onChange={e => setFormData({...formData, dailyFootfall: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Image URL</label>
                <input 
                  type="url" 
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-xs"
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Description</label>
            <textarea 
              rows={3}
              placeholder="Describe the screen placement, visibility, and audience..."
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none font-medium text-sm resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="pt-4 border-t border-zinc-100 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-500 transition-all shadow-xl shadow-orange-500/20"
            >
              Request Listing
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
