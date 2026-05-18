import { TrendingUp, Plus, ArrowRight, Play, Clock, CheckCircle2 } from "lucide-react";
import { formatCurrency, formatDate } from "../../lib/utils";
import { CampaignForm } from "../../components/CampaignForm";
import { useApp } from "../../AppContext";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

export function AdvertiserDashboard() {
  const { campaigns, addCampaign, heroAdUrl, setHeroAdUrl, heroAdMime, setHeroAdMime } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [showAiGenerator, setShowAiGenerator] = useState(false);

  // AI Generation State
  const [aiFormData, setAiFormData] = useState({
    productName: 'OPPO X9',
    targetAudience: 'Tech enthusiasts, young professionals',
    tone: 'Modern, innovative, premium'
  });
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [generatedPoster, setGeneratedPoster] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const [showLogModal, setShowLogModal] = useState<{ type: 'optimization' | 'payload' | 'node' | 'preview', data: any } | null>(null);

  const handleSave = (campaign: any) => {
    addCampaign(campaign);
    setShowForm(false);
  };

  const generateAdCopy = async () => {
    setAiLoading(true);
    setAiError('');
    try {
      const response = await fetch('/api/ai/generate-ad-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: aiFormData.productName,
          targetAudience: aiFormData.targetAudience,
          tone: aiFormData.tone
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setGeneratedCopy(data.copy);
    } catch (err: any) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const generatePoster = async () => {
    setAiLoading(true);
    setAiError('');
    try {
      const response = await fetch('/api/ai/generate-poster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: aiFormData.productName,
          style: 'premium, modern',
          colors: 'orange, black, white'
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setGeneratedPoster(data.posterUrl);
    } catch (err: any) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const generateVideo = async () => {
    setAiLoading(true);
    setAiError('');
    try {
      const response = await fetch('/api/ai/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: aiFormData.productName,
          duration: '15',
          style: aiFormData.tone
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setGeneratedVideo(data.videoUrl);
    } catch (err: any) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };


  const openLog = (type: 'optimization' | 'payload' | 'node' | 'preview', campaignName?: string, campaignData?: any) => {
    let data;
    if (type === 'optimization') {
      data = [
        { time: '10:00:05', event: 'Bid saturation detected', action: 'Increase weight by 15%', status: 'SUCCESS' },
        { time: '10:15:20', event: 'Audience peak shift', action: 'Redirect traffic to Node A12', status: 'SUCCESS' },
        { time: '10:45:00', event: 'Yield threshold met', action: 'Maintain current payload', status: 'STABLE' },
      ];
    } else if (type === 'payload') {
      data = {
        campaign_id: 'c-9182',
        media_signature: 'sha256-8f3a...',
        render_protocol: 'HLS-V3',
        priority_level: 0.85,
        target_nodes: ['delhi-01', 'mumbai-04']
      };
    } else {
      data = [
        { node: 'DL-01', status: 'SYNCED', last_ping: '2s ago', impressions: 452 },
        { node: 'MB-04', status: 'SYNCED', last_ping: '1s ago', impressions: 1204 },
        { node: 'BN-02', status: 'LATENCY_HIGH', last_ping: '8s ago', impressions: 88 },
      ];
    }
    setShowLogModal({ type, data: campaignData || data });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {showForm && (
        <CampaignForm 
          onClose={() => setShowForm(false)} 
          onSave={handleSave} 
        />
      )}

      {showAiGenerator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl bg-black/40 animate-in fade-in zoom-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-10 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
              <h2 className="text-3xl font-black tracking-tighter">AI Ad Generator</h2>
              <button onClick={() => setShowAiGenerator(false)} className="text-zinc-400 hover:text-zinc-600 font-bold uppercase text-[10px] tracking-widest">Close</button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-black text-zinc-700 mb-2">Product Name</label>
                    <input type="text" value={aiFormData.productName} onChange={(e) => setAiFormData({...aiFormData, productName: e.target.value})} className="w-full px-4 py-3 border border-zinc-200 rounded-2xl font-medium" placeholder="e.g., OPPO X9" />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-zinc-700 mb-2">Target Audience</label>
                    <input type="text" value={aiFormData.targetAudience} onChange={(e) => setAiFormData({...aiFormData, targetAudience: e.target.value})} className="w-full px-4 py-3 border border-zinc-200 rounded-2xl font-medium" placeholder="e.g., Tech enthusiasts" />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-zinc-700 mb-2">Tone</label>
                    <input type="text" value={aiFormData.tone} onChange={(e) => setAiFormData({...aiFormData, tone: e.target.value})} className="w-full px-4 py-3 border border-zinc-200 rounded-2xl font-medium" placeholder="e.g., Modern, premium" />
                  </div>
                  <div className="space-y-3 pt-4">
                    <button onClick={generateAdCopy} disabled={aiLoading} className="w-full bg-orange-500 text-white py-3 rounded-2xl font-black hover:bg-orange-600 disabled:opacity-50">
                      {aiLoading ? 'Generating...' : 'Generate Ad Copy'}
                    </button>
                    <button onClick={generatePoster} disabled={aiLoading} className="w-full bg-blue-500 text-white py-3 rounded-2xl font-black hover:bg-blue-600 disabled:opacity-50">
                      {aiLoading ? 'Generating...' : 'Generate Poster'}
                    </button>
                    <button onClick={generateVideo} disabled={aiLoading} className="w-full bg-purple-500 text-white py-3 rounded-2xl font-black hover:bg-purple-600 disabled:opacity-50">
                      {aiLoading ? 'Generating...' : 'Generate Video'}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {aiError && (
                    <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-2xl text-sm font-medium">{aiError}</div>
                  )}
                  {generatedCopy && (
                    <div className="bg-orange-50 border-2 border-orange-200 p-4 rounded-2xl">
                      <h4 className="font-black text-orange-900 mb-2">Ad Copy</h4>
                      <p className="text-sm text-orange-800">{generatedCopy}</p>
                    </div>
                  )}
                  {generatedPoster && (
                    <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-2xl">
                      <h4 className="font-black text-blue-900 mb-2">Poster</h4>
                      <img src={generatedPoster} className="w-full h-40 object-cover rounded-xl" alt="Generated Poster" />
                    </div>
                  )}
                  {generatedVideo && (
                    <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-2xl">
                      <h4 className="font-black text-purple-900 mb-2">Video</h4>
                      <video src={generatedVideo} className="w-full h-40 object-cover rounded-xl" controls />
                    </div>
                  )}
                </div>
              </div>

              {(generatedCopy || generatedPoster || generatedVideo) && (
                <div className="flex gap-4">
                  <button onClick={() => {
                    if (generatedPoster) setHeroAdUrl(generatedPoster);
                    if (generatedVideo) setHeroAdUrl(generatedVideo);
                  }} className="flex-1 bg-zinc-900 text-white py-3 rounded-2xl font-black">Use Generated Content</button>
                  <button onClick={() => { setGeneratedCopy(''); setGeneratedPoster(''); setGeneratedVideo(''); }} className="flex-1 bg-zinc-200 py-3 rounded-2xl font-black">Clear Results</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl bg-black/40 animate-in fade-in zoom-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-10 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
              <h2 className="text-3xl font-black tracking-tighter capitalize">{showLogModal.type.replace('_', ' ')} Intelligence</h2>
              <button onClick={() => setShowLogModal(null)} className="text-zinc-400 hover:text-zinc-600 font-bold uppercase text-[10px] tracking-widest">Close Overlay</button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 font-mono text-xs">
              {showLogModal.type === 'payload' ? (
                <pre className="bg-zinc-900 text-green-500 p-8 rounded-3xl overflow-x-auto">
                  {JSON.stringify(showLogModal.data, null, 2)}
                </pre>
              ) : showLogModal.type === 'preview' ? (
                <div className="flex flex-col items-center justify-center">
                  {showLogModal.data?.mediaType && showLogModal.data.mediaType.startsWith('video/') ? (
                    <video src={showLogModal.data.mediaUrl} className="w-full max-h-[60vh] object-contain rounded-2xl" controls />
                  ) : (
                    <img src={showLogModal.data.mediaUrl} className="w-full max-h-[60vh] object-contain rounded-2xl" />
                  )}
                  <p className="text-zinc-500 mt-4">Preview of <span className="font-black">{showLogModal.data.name}</span></p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.isArray(showLogModal.data) && showLogModal.data.map((item, i) => (
                    <div key={i} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex justify-between items-center group hover:bg-zinc-100 transition-colors">
                      <div className="flex gap-4">
                        <span className="text-zinc-400 font-bold">{item.time || item.node}</span>
                        <span className="text-zinc-900 font-black">{item.event || item.status}</span>
                      </div>
                      <span className="text-orange-600 font-bold">{item.action || `${item.impressions} Views`}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-10 bg-zinc-50 border-t border-zinc-100">
               <button onClick={() => setShowLogModal(null)} className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-black active:scale-95 transition-all">Dismiss Payload</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">Market Presence</h1>
          <p className="text-zinc-500 font-medium">Coordinate your neural ad placements across the grid</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowAiGenerator(true)}
            className="bg-purple-500 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-purple-600 transition-all shadow-xl shadow-purple-500/20 active:scale-95"
          >
            ✨ AI Generator
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95"
          >
            <Plus size={20} /> Deploy Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="popLayout">
            {campaigns.map(campaign => {
              const isSummer = campaign.name === 'Summer Sale 2024';
              const displayName = isSummer ? 'OPPO X9' : campaign.name;
              const displayMedia = isSummer && heroAdUrl ? heroAdUrl : campaign.mediaUrl;
              const displayMediaType = isSummer && heroAdUrl ? heroAdMime : undefined;
              return (
              <motion.div 
                layout
                key={campaign.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-xl shadow-black/5 flex flex-col md:flex-row gap-8 group hover:border-orange-500/30 transition-all relative overflow-hidden"
              >
                <div className="w-full md:w-56 aspect-square rounded-[1.5rem] overflow-hidden relative shadow-2xl">
                  {displayMediaType && displayMediaType.startsWith('video/') ? (
                    <video src={displayMedia} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" controls />
                  ) : (
                    <img src={displayMedia} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={displayName} />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                      <button
                      onClick={() => openLog('preview', displayName, { ...campaign, mediaUrl: displayMedia, mediaType: displayMediaType })}
                      className="bg-white text-zinc-900 p-4 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform"
                    >
                      <Play size={24} fill="currentColor" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-3xl font-black tracking-tighter mb-1">{displayName}</h3>
                        <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                          <Clock size={12} /> {formatDate(campaign.startDate)} — {formatDate(campaign.endDate)}
                        </p>
                      </div>
                      <span className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                        campaign.status === 'ACTIVE' ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500"
                      )}>
                        {campaign.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-8 mt-8">
                      <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">Full Budget</p>
                        <p className="text-2xl font-black tracking-tighter">{formatCurrency(campaign.budget)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">Live Spend</p>
                        <p className="text-2xl font-black tracking-tighter text-orange-600">{formatCurrency(campaign.status === 'ACTIVE' ? campaign.budget * 0.2 : 0)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">Reach</p>
                        <p className="text-2xl font-black tracking-tighter">{campaign.status === 'ACTIVE' ? '12.4K' : '0'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={() => openLog('optimization')}
                      className="flex-1 bg-zinc-50 border border-zinc-100 py-4 rounded-2xl font-black text-sm hover:bg-zinc-100 transition-all active:scale-95"
                    >
                      Optimization Log
                    </button>
                    <button 
                      onClick={() => openLog('payload')}
                      className="flex-1 bg-zinc-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-zinc-800 transition-all shadow-lg active:scale-95"
                    >
                      Adjust Payload
                    </button>
                  </div>
                </div>
              </motion.div>
              ); })}
          </AnimatePresence>

          {campaigns.length === 0 && (
            <div className="bg-zinc-100 border-4 border-dashed border-zinc-200 p-20 rounded-[3rem] flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-zinc-200 flex items-center justify-center mb-6">
                <Plus size={40} className="text-zinc-400" />
              </div>
              <h4 className="text-2xl font-black tracking-tighter text-zinc-800">No Mission Active</h4>
              <p className="text-zinc-500 font-medium max-w-sm">Deploy your first neural campaign to start reaching hyperlocal audiences at scale.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-xl shadow-black/5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Sponsored Creative</h4>
            {heroAdUrl ? (
              <div className="space-y-3">
                {heroAdMime && heroAdMime.startsWith('video/') ? (
                  <video src={heroAdUrl} className="w-full h-40 object-cover rounded-xl border border-zinc-100 shadow" controls />
                ) : (
                  <img src={heroAdUrl} className="w-full h-40 object-cover rounded-xl border border-zinc-100 shadow" />
                )}
                <div className="flex gap-2">
                  <button onClick={() => openLog('preview', 'OPPO X9', { mediaUrl: heroAdUrl, name: 'OPPO X9', mediaType: heroAdMime })} className="flex-1 bg-zinc-900 text-white py-2 rounded-2xl font-bold">Preview</button>
                  <button onClick={() => { setHeroAdUrl(null); setHeroAdMime(null); }} className="flex-1 bg-zinc-100 py-2 rounded-2xl font-bold">Remove</button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="h-40 w-full rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400">No ad uploaded</div>
                <label className="cursor-pointer inline-block">
                  <input type="file" accept="image/*,video/*" onChange={(e) => {
                    const f = e.target.files?.[0]; if (!f) return; const url = URL.createObjectURL(f); setHeroAdUrl(url); setHeroAdMime(f.type || null);
                  }} className="hidden" />
                  <span className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-2xl font-bold">Upload Ad</span>
                </label>
              </div>
            )}
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-xl shadow-black/5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 px-1">Network Snapshot</h4>
            <div className="space-y-6">
              <QuickStat label="Active Nodes" value={campaigns.length > 0 ? "8" : "0"} />
              <QuickStat label="Peak Saturation" value="92%" />
              <QuickStat label="Total Impact" value={campaigns.length > 0 ? "45.2K" : "0"} />
            </div>
          </div>

          <div className="bg-zinc-900 text-white p-8 rounded-[3rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <CheckCircle2 size={80} />
            </div>
            <h4 className="text-xl font-black tracking-tighter mb-3">Proof of Play</h4>
            <p className="text-sm text-zinc-400 font-medium leading-relaxed mb-6">
              Every millisecond of your ad's execution is verified by our edge hardware and recorded on the immutable ledger.
            </p>
            <button 
              onClick={() => openLog('node')}
              className="text-orange-500 font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              View Node Logs <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center group">
      <span className="text-sm text-zinc-500 font-bold group-hover:text-zinc-900 transition-colors">{label}</span>
      <span className="text-lg font-black tracking-tighter">{value}</span>
    </div>
  );
}

// Helper for class consolidation in this view
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
