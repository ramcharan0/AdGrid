import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { DollarSign, Eye, Monitor, TrendingUp, Calendar, ArrowUpRight, Plus } from "lucide-react";
import { formatCurrency, cn } from "../../lib/utils";
import { ScreenForm } from "../../components/ScreenForm";
import { useApp } from "../../AppContext";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

const revenueData = [
  { name: 'Mon', revenue: 400 },
  { name: 'Tue', revenue: 300 },
  { name: 'Wed', revenue: 600 },
  { name: 'Thu', revenue: 800 },
  { name: 'Fri', revenue: 900 },
  { name: 'Sat', revenue: 1100 },
  { name: 'Sun', revenue: 750 },
];

export function OwnerDashboard() {
  const { screens, addScreen, bookings } = useApp();
  const [showForm, setShowForm] = useState(false);

  // Derive stats
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0) + 4850;
  const occupancy = screens.length > 0 ? "78%" : "0%";

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {showForm && (
        <ScreenForm 
          onClose={() => setShowForm(false)} 
          onSave={addScreen} 
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Network Revenue" value={formatCurrency(totalRevenue)} icon={DollarSign} trend="+24%" color="orange" />
        <StatCard title="Active Nodes" value={screens.length.toString()} icon={Monitor} trend="Live" color="zinc" />
        <StatCard title="Grid Occupancy" value={occupancy} icon={Calendar} trend="+5%" color="orange" />
        <StatCard title="Total Impressions" value="1.2M" icon={Eye} trend="+12%" color="zinc" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-zinc-200 shadow-2xl shadow-black/5 relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-3xl font-black tracking-tighter">Yield Analytics</h3>
              <p className="text-sm font-medium text-zinc-500">Node earnings across the global grid</p>
            </div>
            <div className="bg-zinc-100 p-1.5 rounded-2xl flex gap-1 shadow-inner">
              <button className="px-5 py-2 text-xs font-black bg-white rounded-xl shadow-lg transition-all">7D</button>
              <button className="px-5 py-2 text-xs font-black text-zinc-400 hover:text-zinc-600 transition-colors">30D</button>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold', fill: '#a1a1aa' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold', fill: '#a1a1aa' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e4e4e7', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }} 
                  itemStyle={{ color: '#f97316', fontWeight: '900', fontSize: '18px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={5} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-10 rounded-[3rem] border border-zinc-200 shadow-2xl shadow-black/5 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black tracking-tighter">Node Health</h3>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Global OK</span>
          </div>
          
          <div className="space-y-6 flex-1 pr-2 overflow-y-auto max-h-[300px] scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {screens.map((screen, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={screen.id} 
                  className="flex items-center justify-between group cursor-pointer p-4 hover:bg-zinc-50 rounded-2xl transition-all border border-transparent hover:border-zinc-100"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center group-hover:bg-orange-100 group-hover:rotate-6 transition-all duration-300">
                      <Monitor size={24} className="text-zinc-400 group-hover:text-orange-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-black truncate max-w-[140px] tracking-tight">{screen.name}</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mt-1">99.9% Uptime</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={() => setShowForm(true)}
            className="w-full mt-10 py-5 bg-zinc-900 text-white rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all shadow-2xl shadow-black/20 active:scale-95"
          >
            Connect New Node <Plus size={24} />
          </button>
        </div>
      </div>

      <div className="bg-orange-600 text-white p-12 rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-orange-500/30 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
        <div>
          <h2 className="text-4xl font-black tracking-tighter mb-2">Automated Yield Management</h2>
          <p className="text-orange-100 font-medium max-w-xl text-lg">Our AI engine is currently optimizing prices across your 5 high-traffic nodes to maximize Saturday rush-hour revenue.</p>
        </div>
        <button className="bg-white text-orange-600 px-10 py-5 rounded-full font-black hover:bg-orange-50 transition-all shadow-2xl active:scale-95 whitespace-nowrap">
          Enable Autopilot
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-xl shadow-black/5 relative overflow-hidden group hover:border-orange-500/20 transition-all">
      <div className={cn(
        "absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-[0.05] transition-transform duration-700 group-hover:scale-150",
        color === 'orange' ? "bg-orange-500" : "bg-zinc-900"
      )} />
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:rotate-12",
          color === 'orange' ? "bg-orange-500 text-white" : "bg-zinc-900 text-white"
        )}>
          <Icon size={32} />
        </div>
        <span className={cn(
          "text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full",
          trend.startsWith('+') ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500"
        )}>
          {trend}
        </span>
      </div>
      <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-4xl font-black tracking-tighter">{value}</h3>
    </div>
  );
}
