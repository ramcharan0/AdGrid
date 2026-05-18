import { useState } from "react";
import { Search, Filter, Sparkles, Wand2, Map as MapIcon, LayoutGrid } from "lucide-react";
import { ScreenCard } from "../../components/ScreenCard";
import { DiscoveryMap } from "../../components/DiscoveryMap";
import { BookingForm } from "../../components/BookingForm";
import { useApp } from "../../AppContext";
import { Screen } from "../../types";
import { motion, AnimatePresence } from "motion/react";
import React from "react";

export function AdvertiserDiscovery() {
  const { screens, campaigns, addBooking } = useApp();
  const [search, setSearch] = useState("");
  const [searchCenter, setSearchCenter] = useState<[number, number] | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const filteredScreens = (() => {
    const q = search.trim().toLowerCase();
    // If we have a geocoded center, filter by proximity (10km radius)
    if (searchCenter) {
      const [lat, lon] = searchCenter;
      const distanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // km
        const toRad = (v: number) => (v * Math.PI) / 180;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const aVal = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1-aVal));
        return R * c;
      };
      return screens.filter(s => distanceKm(lat, lon, s.location.latitude, s.location.longitude) <= 10);
    }

    return screens.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.location.address.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  })();
  // If the user explicitly searches for 'lcd', prefer screens whose description mentions LCD or with very high resolution
  const qLower = search.trim().toLowerCase();
  const finalScreens = qLower.includes('lcd') ? filteredScreens.filter(s => s.description.toLowerCase().includes('lcd') || (s.resolution && s.resolution.includes('3840'))) : filteredScreens;

  const geocode = async (q: string) => {
    if (!q || q.trim().length === 0) return null;
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&addressdetails=1`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en-US' } });
      const data = await res.json();
      if (data && data.length > 0) {
        const first = data[0];
        const lat = parseFloat(first.lat);
        const lon = parseFloat(first.lon);
        return [lat, lon] as [number, number];
      }
    } catch (err) {
      console.error('Geocode error', err);
    }
    return null;
  };

  const handleSearch = async () => {
    if (!search || search.trim().length === 0) {
      setSearchCenter(null);
      return;
    }
    const coords = await geocode(search);
    if (coords) {
      setSearchCenter(coords);
      setViewMode('map');
    } else {
      // Fallback: try to match by address substring
      const matched = screens.find(s => s.location.address.toLowerCase().includes(search.toLowerCase()));
      if (matched) {
        setSearchCenter([matched.location.latitude, matched.location.longitude]);
        setViewMode('map');
      } else {
        alert('Location not found. Showing results by name/address match.');
        setSearchCenter(null);
      }
    }
  };

  const handleBooking = (bookingData: any) => {
    addBooking(bookingData);
    alert("Booking successful! Real-time check: Ad will appear on the selected screen at the scheduled time.");
  };

  const getAiInsight = async () => {
    setIsAiLoading(true);
    setAiInsight(null);
    try {
      const response = await fetch("/api/gemini/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Analyze the current network topology (${screens.length} nodes) and suggest a high-impact strategy for a ${screens.some(s => s.category === 'Retail') ? 'Luxury Retail' : 'New Market Entry'} campaign. Focus on audience density and geographical clusters.`,
          context: { 
            screens: screens.map(s => ({ name: s.name, category: s.category, location: s.location.address })),
            campaigns_active: campaigns.length
          }
        }),
      });
      const data = await response.json();
      if (data.error) {
        setAiInsight(data.error);
      } else {
        setAiInsight(data.text);
      }
    } catch (err) {
      console.error(err);
      setAiInsight("Critical system error: Peer-to-peer data relay failed. Check your API configuration in Settings.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {selectedScreen && (
        <BookingForm 
          screen={selectedScreen} 
          campaigns={campaigns} 
          onClose={() => setSelectedScreen(null)} 
          onSave={handleBooking}
        />
      )}

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="Search screens in Singapore, Delhi, Mumbai..." 
            className="w-full pl-14 pr-6 py-5 bg-white border border-zinc-200 rounded-[1.5rem] shadow-xl shadow-black/5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value.trim().length === 0) setSearchCenter(null);
            }}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                await handleSearch();
              }
            }}
          />
        </div>
        <div className="ml-4">
          <button onClick={handleSearch} className="bg-zinc-900 text-white px-4 py-3 rounded-2xl font-black">Search</button>
        </div>
        <div className="flex bg-white border border-zinc-200 p-1.5 rounded-[1.5rem] shadow-xl shadow-black/5">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-3.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-zinc-900 text-white shadow-lg' : 'text-zinc-400 hover:bg-zinc-50'}`}
          >
            <LayoutGrid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`p-3.5 rounded-xl transition-all ${viewMode === 'map' ? 'bg-zinc-900 text-white shadow-lg' : 'text-zinc-400 hover:bg-zinc-50'}`}
          >
            <MapIcon size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {finalScreens.map(screen => (
                  <ScreenCard key={screen.id} screen={screen} onSelect={setSelectedScreen} />
                ))}
                {finalScreens.length === 0 && (
                  <div className="col-span-full py-24 text-center bg-white rounded-[2rem] border border-dashed border-zinc-200">
                    <p className="text-zinc-400 font-bold text-lg">No nodes match your signature.</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="map"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                <DiscoveryMap screens={finalScreens} center={searchCenter} zoom={12} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="bg-zinc-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
            
            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
              Optimizer <Wand2 size={24} className="text-orange-500" />
            </h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed font-medium">
              Our neural engine analyzes traffic patterns and demographics to recommend the highest ROI screen clusters for your brand.
            </p>
            
            <button 
              onClick={getAiInsight}
              disabled={isAiLoading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-zinc-800 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-orange-500/30 active:scale-95"
            >
              {isAiLoading ? "Processing Meta..." : "Get Market Insight"}
            </button>

            {aiInsight && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-white/5 rounded-2xl border border-white/10 text-[11px] leading-relaxed text-zinc-300 font-medium whitespace-pre-wrap"
              >
                {aiInsight}
              </motion.div>
            )}
          </div>

          <div className="bg-orange-50 border border-orange-200 p-8 rounded-[2rem]">
            <h4 className="font-bold text-orange-950 mb-3 flex items-center gap-2">
              <Sparkles size={16} /> Market Alert
            </h4>
            <p className="text-sm text-orange-900/70 font-medium leading-relaxed">
              New screens just onboarded in Lajpat Nagar, Delhi. 120k+ daily impressions at introductory rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
