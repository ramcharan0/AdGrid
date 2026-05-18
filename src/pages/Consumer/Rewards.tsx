import React from "react";
import { useApp } from "../../AppContext";
import { Link } from "react-router-dom";
import { Gift, Calendar, Ticket, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { formatDate } from "../../lib/utils";

export function ConsumerRewards() {
  const { vouchers, redeemVoucher } = useApp();

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">My Rewards Vault</h1>
          <p className="text-zinc-500 font-medium">Exclusive vouchers earned from the AdGrid network</p>
        </div>
        <div className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-orange-500/20">
          <Gift size={24} /> {vouchers.length} Vouchers
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {vouchers.map((voucher, idx) => (
            <motion.div
              layout
              key={voucher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] border border-zinc-200 overflow-hidden shadow-xl shadow-black/5 group hover:border-orange-500/30 transition-all flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={voucher.imageUrl} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={voucher.brandName} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-zinc-900 font-black shadow-lg">
                    {voucher.brandName[0]}
                  </div>
                  <span className="text-white font-black tracking-tight text-xl">{voucher.brandName}</span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black tracking-tighter leading-tight">{voucher.title}</h3>
                    <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                       {voucher.earnedAt.split('T')[0]}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-4 px-6 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 mb-6 group-hover:bg-orange-50 group-hover:border-orange-200 transition-colors">
                    <Ticket className="text-zinc-400 group-hover:text-orange-500" size={24} />
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Voucher Code</p>
                      <p className="font-mono font-black text-lg text-zinc-900 tracking-wider">
                        {voucher.code}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-50 p-4 rounded-xl">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Value</p>
                      <p className="font-black text-xl text-orange-600">{voucher.discount}</p>
                    </div>
                    <div className="bg-zinc-50 p-4 rounded-xl">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Calendar size={10} /> Valid Until
                      </p>
                      <p className="font-black text-sm text-zinc-700">{formatDate(voucher.expiryDate)}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    redeemVoucher(voucher.id);
                    alert(`Voucher ${voucher.code} redeemed.`);
                  }}
                  className="w-full mt-8 py-4 bg-zinc-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-95 shadow-lg group-hover:bg-orange-600 group-hover:shadow-orange-500/20"
                >
                  Redeem Rewards <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {vouchers.length === 0 && (
          <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-4 border-dashed border-zinc-100 flex flex-col items-center justify-center">
             <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-8">
               <Sparkles size={48} className="text-zinc-200" />
             </div>
             <h3 className="text-3xl font-black tracking-tighter text-zinc-800 mb-2">Vault is Clear</h3>
             <p className="text-zinc-500 font-medium max-w-sm">Watch ads at any AdGrid node to unlock exclusive brand rewards and high-value vouchers.</p>
             <Link to="/advertiser/discovery" className="mt-8 text-orange-600 font-black flex items-center gap-2 hover:gap-3 transition-all">
               Find Nearby Nodes <ArrowRight size={18} />
             </Link>
          </div>
        )}
      </div>
    </div>
  );
}
