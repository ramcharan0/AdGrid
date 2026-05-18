import React, { useMemo, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  TrendingUp, Users, Target, Activity, MapPin, 
  ArrowUpRight, ArrowDownRight, Zap, RefreshCw
} from "lucide-react";
import { formatCurrency, cn } from "../../lib/utils";
import { useApp } from "../../AppContext";
import { motion, AnimatePresence } from "motion/react";

const performanceData = [
  { name: '08:00', reach: 450, engagement: 24, cost: 12 },
  { name: '10:00', reach: 1200, engagement: 88, cost: 25 },
  { name: '12:00', reach: 900, engagement: 65, cost: 20 },
  { name: '14:00', reach: 1400, engagement: 110, cost: 30 },
  { name: '16:00', reach: 2100, engagement: 185, cost: 45 },
  { name: '18:00', reach: 3500, engagement: 310, cost: 80 },
  { name: '20:00', reach: 2800, engagement: 240, cost: 55 },
  { name: '22:00', reach: 1100, engagement: 95, cost: 22 },
];

const categoryData = [
  { name: 'Retail', value: 45, color: '#f97316' },
  { name: 'Roadside', value: 30, color: '#0ea5e9' },
  { name: 'Transit', value: 15, color: '#8b5cf6' },
  { name: 'Education', value: 10, color: '#10b981' },
];

export function AdvertiserAnalytics() {
  const { campaigns, bookings, screens } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'real-time' | 'historical'>('real-time');

  const stats = useMemo(() => {
    const multiplier = viewMode === 'historical' ? 0.8 : 1;
    const totalSpend = bookings.reduce((sum, b) => sum + b.amount, 0) * multiplier;
    const activeCampaigns = campaigns.filter(c => c.status === 'ACTIVE').length;
    const totalReach = activeCampaigns * 45200 * multiplier;
    
    return {
      totalSpend,
      activeCampaigns,
      totalReach,
    };
  }, [campaigns, bookings, viewMode]);

  const chartData = useMemo(() => {
    if (viewMode === 'historical') {
      return performanceData.map(d => ({
        ...d,
        reach: Math.floor(d.reach * 0.7),
        engagement: Math.floor(d.engagement * 0.6)
      }));
    }
    return performanceData;
  }, [viewMode]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleExport = () => {
    const payload = {
      timestamp: new Date().toISOString(),
      nodes: [
        { id: 'DELHI-01', lat: 28.6139, lng: 77.2090, reach: 45200, category: 'Retail' },
        { id: 'MUMBAI-04', lat: 19.0760, lng: 72.8777, reach: 38900, category: 'Transit' }
      ],
      performance_metrics: chartData
    };
    
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adgrid-geospatial-${viewMode || 'export'}.json`;
    a.click();
    alert("Geospatial payload exported successfully.");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">Campaign Intelligence</h1>
          <p className="text-zinc-500 font-medium mt-2">
            {viewMode === 'real-time' ? "Real-time telemetry and audience conversion metrics" : "Aggregated historical performance archives"}
          </p>
        </div>
        <div className="flex gap-3 text-white">
          <button 
            onClick={handleRefresh}
            className="p-4 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all shadow-sm active:scale-95"
          >
            <RefreshCw size={20} className={cn("text-zinc-400", isRefreshing && "animate-spin text-orange-500")} />
          </button>
          <div className="bg-white border border-zinc-200 p-1.5 rounded-2xl flex gap-1 shadow-sm">
            <button 
              onClick={() => setViewMode('real-time')}
              className={cn(
                "px-5 py-2 text-xs font-black rounded-xl transition-all",
                viewMode === 'real-time' ? "bg-zinc-900 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              Real-time
            </button>
            <button 
              onClick={() => setViewMode('historical')}
              className={cn(
                "px-5 py-2 text-xs font-black rounded-xl transition-all",
                viewMode === 'historical' ? "bg-zinc-900 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              Historical
            </button>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Reach" 
          value={stats.totalReach.toLocaleString()} 
          subValue="+12.4% vs last week"
          icon={Users} 
          trend="up"
          color="orange"
        />
        <MetricCard 
          title="Neural Spend" 
          value={formatCurrency(stats.totalSpend)} 
          subValue="84% of budget utilized"
          icon={Target} 
          trend="up"
          color="zinc"
        />
        <MetricCard 
          title="Engagement Rate" 
          value="4.8%" 
          subValue="System peak: 6.2%"
          icon={Zap} 
          trend="down"
          color="orange"
        />
        <MetricCard 
          title="Node Efficiency" 
          value="98.2%" 
          subValue="Active synchronization"
          icon={Activity} 
          trend="up"
          color="zinc"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Reach Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-zinc-200 shadow-xl shadow-black/5">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-black tracking-tighter">Audience Flux</h3>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Hourly traffic distribution across active nodes</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-200" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Engagement</span>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 'bold', fill: '#a1a1aa' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 'bold', fill: '#a1a1aa' }} 
                />
                <Tooltip 
                  cursor={{ stroke: '#f97316', strokeWidth: 1 }}
                  contentStyle={{ 
                    backgroundColor: '#18181b', 
                    borderRadius: '16px', 
                    border: 'none', 
                    color: '#fff',
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="reach" 
                  stroke="#f97316" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#reachGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#e4e4e7" 
                  strokeWidth={2} 
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-8 rounded-[3rem] border border-zinc-200 shadow-xl shadow-black/5 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black tracking-tighter mb-8">Node Categories</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-6">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm font-bold text-zinc-600">{cat.name}</span>
                  </div>
                  <span className="text-sm font-black">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Geographical Heatmap Mock/List */}
        <div className="bg-zinc-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div>
            <h3 className="text-3xl font-black tracking-tighter mb-8 flex items-center gap-3">
              <MapPin className="text-orange-500" /> Hot Zones
            </h3>
            <div className="space-y-6">
              <ZoneItem name="South Delhi - Ring Road" reach="45.2K" heat="High" />
              <ZoneItem name="Mumbai - WEH Junction" reach="38.9K" heat="High" />
              <ZoneItem name="Bangalore - MG Road" reach="24.5K" heat="Medium" />
              <ZoneItem name="Gurugram - Cyber Hub" reach="31.2K" heat="High" />
            </div>
          </div>
          <button 
            onClick={handleExport}
            className="w-full mt-10 py-5 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-sm transition-all border border-white/10 active:scale-95 shadow-xl"
          >
            Export Geospatial Payload
          </button>
        </div>

        {/* Efficiency Chart */}
        <div className="bg-white p-8 rounded-[3rem] border border-zinc-200 shadow-xl shadow-black/5">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-black tracking-tighter">Budget Burn Rate</h3>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Real-time expenditure vs node performance</p>
            </div>
            <TrendingUp size={24} className="text-orange-500" />
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis 
                  dataKey="name" 
                  hide
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f1f1' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#f97316" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#f97316', strokeWidth: 0 }} 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-5 bg-zinc-50 rounded-2xl border border-zinc-100 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Projected ROI</p>
              <p className="text-2xl font-black tracking-tighter text-orange-600">3.4x</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Efficiency Score</p>
              <p className="text-2xl font-black tracking-tighter text-zinc-900">A+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subValue, icon: Icon, trend, color }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-7 rounded-[2rem] border border-zinc-200 shadow-sm relative overflow-hidden group"
    >
      <div className={cn(
        "absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-[0.03] transition-transform duration-700 group-hover:scale-150",
        color === 'orange' ? "bg-orange-500" : "bg-zinc-900"
      )} />
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6",
          color === 'orange' ? "bg-orange-100 text-orange-600" : "bg-zinc-100 text-zinc-900"
        )}>
          <Icon size={24} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-black leading-none",
          trend === 'up' ? "text-green-600" : "text-red-500"
        )}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend === 'up' ? "GROWTH" : "STABLE"}
        </div>
      </div>
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-black tracking-tighter mb-1">{value}</h3>
      <p className="text-[10px] font-bold text-zinc-500">{subValue}</p>
    </motion.div>
  );
}

function ZoneItem({ name, reach, heat }: { name: string, reach: string, heat: string }) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 group cursor-pointer hover:px-2 transition-all">
      <div>
        <p className="font-black tracking-tight group-hover:text-orange-500 transition-colors">{name}</p>
        <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Global Grid Coords</p>
      </div>
      <div className="text-right">
        <p className="font-black text-lg">{reach}</p>
        <p className={cn(
          "text-[10px] font-black uppercase tracking-widest",
          heat === 'High' ? "text-orange-500" : "text-zinc-500"
        )}>{heat} Demand</p>
      </div>
    </div>
  );
}
