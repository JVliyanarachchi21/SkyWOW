"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  Zap, 
  ShieldAlert, 
  CloudRain, 
  Sun, 
  CloudLightning, 
  Wind,
  FastForward,
  Cpu,
  RefreshCw,
  Database,
  Lock,
  Unlock,
  AlertTriangle
} from "lucide-react";
import { useSession } from "next-auth/react";

interface SystemConfig {
  id: string;
  simulationSpeed: number;
  isAiAutonomous: boolean;
  weatherStatus: string;
  lastPulseAt: string;
  updatedAt: string;
}

export default function SystemConfig() {
  const { data: session } = useSession();
  const [config, setConfig] = useState<SystemConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastPulse, setLastPulse] = useState<string | null>(null);

  const fetchConfig = async () => {
    const res = await fetch("/api/system/config");
    const data = await res.json();
    setConfig(data);
    setLastPulse(data.lastPulseAt);
    setLoading(false);
  };

  const triggerPulse = async () => {
    try {
      const res = await fetch("/api/system/pulse", { method: "POST" });
      const data = await res.json();
      if (data.status === "PULSE_SUCCESS") {
        setLastPulse(data.timestamp);
      }
    } catch (error) {
      console.error("Pulse trigger failed");
    }
  };

  useEffect(() => {
    fetchConfig();
    // System Heartbeat: Trigger pulse every 4 seconds while in Config mode
    const interval = setInterval(triggerPulse, 4000);
    return () => clearInterval(interval);
  }, []);

  const updateConfig = async (updates: Partial<SystemConfig>) => {
    const userRole = (session?.user as any)?.role;
    if (userRole !== "ADMIN") return;
    setSaving(true);
    try {
      const res = await fetch("/api/system/config", {
        method: "POST",
        body: JSON.stringify({ ...(config || {}), ...updates }),
      });
      const data = await res.json();
      setConfig(data);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !config) return null;

  return (
    <div className="space-y-10 pb-20">
      {/* God Mode Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic flex items-center gap-4">
             <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                <Settings className="w-8 h-8 text-amber-400" />
             </div>
             System Core <span className="text-amber-400">Configuration</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em] mt-2 ml-1 italic">Authorized Personnel Only • Root Access Confirmed</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden lg:flex items-center gap-6 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex flex-col items-end">
                 <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Last Backend Pulse</span>
                 <span className="text-[10px] font-black text-cyan-400 font-mono">
                    {lastPulse ? new Date(lastPulse).toLocaleTimeString() : "PENDING..."}
                 </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
           </div>
           <div className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-500 ${
             saving ? "bg-amber-500/20 border-amber-500/50 text-amber-400 animate-pulse" : "bg-white/5 border-white/10 text-slate-500"
           }`}>
              <Database className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">{saving ? "SYNCHRONIZING..." : "CORE STABLE"}</span>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* AI Autonomy Controller */}
        <section className="glass rounded-[3rem] p-10 border border-white/5 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Cpu className="w-24 h-24 text-white" />
           </div>
           <div className="relative z-10">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <Zap className="w-4 h-4 text-purple-500" />
                AI Dispatch Autonomy
              </h3>
              
              <div className="space-y-8">
                 <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-[2rem]">
                    <div>
                       <div className="text-lg font-black text-white italic tracking-tighter">{config.isAiAutonomous ? "FULL AUTONOMY" : "MANUAL APPROVAL"}</div>
                       <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Autonomous Decision Execution</div>
                    </div>
                    <button 
                      onClick={() => updateConfig({ isAiAutonomous: !config.isAiAutonomous })}
                      className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                        config.isAiAutonomous ? "bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20" : "bg-white/5 border border-white/10 text-slate-600"
                      }`}
                    >
                       {config.isAiAutonomous ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                    </button>
                 </div>
                 
                 <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
                    <p className="text-[11px] text-purple-200/50 leading-relaxed italic">
                       "Enabling autonomy allows the Aero-Mind Dispatcher to auto-apply gate cascades without Admin intervention. Exercise caution during peak hours."
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* Simulation Speed & Weather */}
        <section className="xl:col-span-2 glass rounded-[3rem] p-10 border border-white/5 relative overflow-hidden">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Simulation Speed */}
              <div>
                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                   <FastForward className="w-4 h-4 text-cyan-500" />
                   Temporal Velocity
                 </h3>
                 <div className="grid grid-cols-3 gap-4">
                    {[1, 5, 10].map((speed) => (
                      <button 
                        key={speed}
                        onClick={() => updateConfig({ simulationSpeed: speed })}
                        className={`py-6 rounded-3xl border flex flex-col items-center gap-2 transition-all duration-500 ${
                          config.simulationSpeed === speed 
                            ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/10" 
                            : "bg-white/5 border-white/10 text-slate-600 hover:border-white/20"
                        }`}
                      >
                         <span className="text-2xl font-black italic tracking-tighter">{speed}x</span>
                         <span className="text-[8px] font-mono uppercase tracking-widest opacity-60">PULSE SPEED</span>
                      </button>
                    ))}
                 </div>
              </div>

              {/* Weather Injector */}
              <div>
                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                   <CloudRain className="w-4 h-4 text-blue-500" />
                   Environmental Context
                 </h3>
                 <div className="grid grid-cols-2 gap-4">
                    <WeatherButton 
                      active={config.weatherStatus === "CLEAR"} 
                      icon={Sun} label="Clear Skies" 
                      onClick={() => updateConfig({ weatherStatus: "CLEAR" })} 
                    />
                    <WeatherButton 
                      active={config.weatherStatus === "RAIN"} 
                      icon={CloudRain} label="Heavy Rain" 
                      onClick={() => updateConfig({ weatherStatus: "RAIN" })} 
                    />
                    <WeatherButton 
                      active={config.weatherStatus === "STORM"} 
                      icon={CloudLightning} label="Winter Storm" 
                      onClick={() => updateConfig({ weatherStatus: "STORM" })} 
                    />
                    <WeatherButton 
                      active={config.weatherStatus === "FOG"} 
                      icon={Wind} label="Visibility Low" 
                      onClick={() => updateConfig({ weatherStatus: "FOG" })} 
                    />
                 </div>
              </div>

           </div>

           {/* Threat Awareness Panel */}
           <div className="mt-12 p-8 bg-red-500/5 border border-red-500/10 rounded-[2rem] flex items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                 <AlertTriangle className="w-8 h-8 animate-pulse" />
              </div>
              <div className="flex-1">
                 <div className="text-sm font-black text-white uppercase italic tracking-tighter mb-1">Critical Resource Warning</div>
                 <p className="text-xs text-red-200/50 leading-relaxed font-medium">
                   Extreme weather conditions (STORM/FOG) will automatically increase taxi-times by 300% and trigger forced AI optimization for all incoming vectors.
                 </p>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}

function WeatherButton({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 ${
        active 
          ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/10" 
          : "bg-white/5 border-white/10 text-slate-600 hover:border-white/20"
      }`}
    >
       <Icon className="w-5 h-5" />
       <span className="text-[10px] font-black uppercase tracking-widest text-left">{label}</span>
    </button>
  );
}
