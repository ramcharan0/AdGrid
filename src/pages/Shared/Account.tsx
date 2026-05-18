import React from "react";
import { useApp } from "../../AppContext";
import { User, Mail, Shield, Building, Calendar, Wallet, Bell, Save, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export function Account() {
  const { user, role } = useApp();

  const handleWithdrawal = () => alert('No withdrawals available yet.');
  const handleUpdate = () => alert('Profile updated (mock).');
  const handleResetKey = () => {
    if (confirm('Reset your API key? This will invalidate existing credentials.')) {
      alert('Key reset (mock).');
    }
  };
  const handleTerminate = () => {
    if (confirm('Terminate session?')) {
      alert('Session terminated.');
    }
  };

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-5xl font-black tracking-tighter">Neural Identity</h1>
        <p className="text-zinc-500 font-medium mt-2">Manage your cryptographic profile and platform credentials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-zinc-200 shadow-xl shadow-black/5 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-32 h-32 rounded-[2.5rem] bg-zinc-900 border-4 border-white shadow-2xl flex items-center justify-center text-white text-5xl font-black mb-6 animate-in zoom-in duration-700">
                {user.name[0]}
              </div>
              <h2 className="text-2xl font-black tracking-tighter mb-1">{user.name}</h2>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-6">{role} PROFILE</p>
              
              <div className="w-full flex flex-col gap-2">
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center gap-3">
                  <Mail size={16} className="text-zinc-400" />
                  <span className="text-sm font-bold text-zinc-600 truncate">{user.email}</span>
                </div>
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3">
                  <Shield size={16} className="text-green-500" />
                  <span className="text-sm font-black text-green-700 tracking-tight">Verified Protocol</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-[2.5rem] text-white shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black tracking-tighter">Wallet Status</h3>
              <Wallet size={20} className="text-orange-500" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1">Available Yield</p>
              <p className="text-4xl font-black tracking-tighter">₹4,25,000</p>
            </div>
            <button onClick={handleWithdrawal} className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-sm transition-all border border-white/5">
              Withdrawal Archive
            </button>
          </div>
        </div>

        {/* Content Tabs/Settings */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-zinc-200 shadow-xl shadow-black/5">
            <h3 className="text-2xl font-black tracking-tighter mb-8">Base Configuration</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4">Full Identity</label>
                  <input 
                    type="text" 
                    defaultValue={user.name}
                    className="w-full bg-zinc-50 border border-zinc-100 p-4 rounded-2xl font-bold focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4">Neural Email</label>
                  <input 
                    type="email" 
                    defaultValue={user.email}
                    className="w-full bg-zinc-50 border border-zinc-100 p-4 rounded-2xl font-bold focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-zinc-400" 
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4">Protocol Role</label>
                <div className="w-full bg-zinc-50 border border-zinc-100 p-4 rounded-2xl font-black flex items-center gap-3">
                  <Building size={18} className="text-zinc-400" />
                   <span className="capitalize">{role.toLowerCase()} Tier-1 Infrastructure</span>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100 grid grid-cols-2 gap-4">
                 <button onClick={handleUpdate} className="py-5 bg-zinc-900 text-white rounded-2xl font-black shadow-xl shadow-black/10 active:scale-95 transition-all flex items-center justify-center gap-3 hover:bg-zinc-800">
                   <Save size={18} /> Update Payload
                 </button>
                 <button onClick={handleResetKey} className="py-5 bg-zinc-100 text-zinc-900 rounded-2xl font-black active:scale-95 transition-all border border-zinc-200">
                   Reset Key
                 </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-zinc-200 shadow-xl shadow-black/5">
            <h3 className="text-2xl font-black tracking-tighter mb-8">Neural Notification Subscriptions</h3>
            <div className="space-y-4">
              <SubscriptionToggle 
                icon={Bell} 
                title="Yield Alerts" 
                desc="Receive instant notifications for high-impact revenue shifts." 
                active={true}
              />
              <SubscriptionToggle 
                icon={Shield} 
                title="Security Protocol" 
                desc="Critical alerts regarding node stability and ledger audits." 
                active={true}
              />
              <SubscriptionToggle 
                icon={Calendar} 
                title="Weekly Synoptic" 
                desc="Aggregated performance reports and neural engine updates." 
                active={false}
              />
            </div>
          </div>

          <div className="flex justify-between items-center p-4">
            <p className="text-[10px] font-bold text-zinc-400">SESSION ID: ADRG-9281-Z921</p>
            <button onClick={handleTerminate} className="flex items-center gap-2 text-red-500 font-black text-xs uppercase tracking-widest hover:text-red-600 transition-colors">
              <LogOut size={16} /> Terminate Connection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubscriptionToggle({ icon: Icon, title, desc, active: initialActive }: { icon: any, title: string, desc: string, active: boolean }) {
  const [active, setActive] = React.useState(initialActive);
  return (
    <div onClick={() => setActive(a => !a)} className="flex items-center justify-between p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 hover:bg-zinc-100 transition-colors cursor-pointer">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-zinc-100">
          <Icon size={24} className="text-zinc-900" />
        </div>
        <div>
          <h4 className="font-black tracking-tight">{title}</h4>
          <p className="text-xs text-zinc-500 font-medium">{desc}</p>
        </div>
      </div>
      <div className={cn(
        "w-14 h-8 rounded-full p-1 transition-all",
        active ? "bg-orange-500" : "bg-zinc-300"
      )}>
        <div className={cn(
          "w-6 h-6 bg-white rounded-full shadow-md transition-all",
          active ? "translate-x-6" : "translate-x-0"
        )} />
      </div>
    </div>
  );
}
