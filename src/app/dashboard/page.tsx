"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plane, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Cpu,
  RefreshCw,
  ShieldAlert,
  Crown,
  Zap,
  Activity,
  ArrowRight,
  Database,
  Terminal
} from "lucide-react";
import AiAdvisoryPanel from "./components/AiAdvisoryPanel";

export default function DashboardOverview() {
  const [flights, setFlights] = useState<any[]>([]);
  const [gates, setGates] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [flightsRes, gatesRes, eventsRes] = await Promise.all([
        fetch("/api/flights"),
        fetch("/api/gates"),
        fetch("/api/system/events")
      ]);
      const flightsData = await flightsRes.json();
      const gatesData = await gatesRes.json();
      const eventsData = await eventsRes.json();
      
      setFlights(flightsData);
      setGates(gatesData);
      setEvents(Array.isArray(eventsData) ? eventsData : []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEventClick = (flightId: string) => {
    setSelectedFlightId(flightId);
    // Clear highlight after 4 seconds
    setTimeout(() => setSelectedFlightId(null), 4000);
    
    // Smooth scroll to the flight if it's off-screen
    const element = document.getElementById(`flight-${flightId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 4000); 
    return () => clearInterval(interval);
  }, [fetchData]);

  const emergencies = flights.filter((f: any) => f.isEmergency).length;
  const openGates = gates.filter((g: any) => g.status === "OPEN").length;

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
              Mission Control
            </h1>
            <span className="text-[10px] px-2 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-md font-mono uppercase tracking-[0.3em] animate-pulse">
              System Active
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase font-mono tracking-widest ml-1">
             <Database className="w-3 h-3 text-emerald-500" />
             Data Source: <span className="text-slate-300">Ground Terminal Node-01</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchData}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-110 active:scale-95 group"
          >
            <RefreshCw className={`w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors ${loading ? "animate-spin" : ""}`} />
          </button>
          
          <AnimatePresence>
            {emergencies > 0 && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-3 bg-red-500/20 backdrop-blur-xl px-6 py-3 rounded-2xl border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-black uppercase tracking-widest text-red-500">
                  {emergencies} CRITICAL EMERGENCY
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Board & Events */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Flight Board */}
          <section className="glass rounded-[2rem] border border-white/5 p-8 relative overflow-hidden group/board">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-transparent pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h2 className="text-xl font-black flex items-center gap-2 uppercase tracking-tight">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Nerve Center Board
              </h2>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{openGates} Gates Available</span>
                 </div>
              </div>
            </div>
            
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">
                    <th className="pb-6">Flight Authority</th>
                    <th className="pb-6 text-center">Threat / Impact</th>
                    <th className="pb-6">Current Protocol</th>
                    <th className="pb-6">Assigned Resource</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <AnimatePresence mode="popLayout">
                    {flights.map((f: any) => (
                      <motion.tr 
                        key={f.id}
                        id={`flight-${f.id}`}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          backgroundColor: selectedFlightId === f.id ? "rgba(34, 211, 238, 0.1)" : "transparent",
                          scale: selectedFlightId === f.id ? 1.01 : 1,
                        }}
                        exit={{ opacity: 0, x: 10 }}
                        className={`border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-all duration-500 group relative ${
                          f.isEmergency ? "bg-red-500/[0.04] shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]" : ""
                        } ${selectedFlightId === f.id ? "z-20 ring-1 ring-cyan-500/50" : ""}`}
                      >
                        <td className="py-6 pr-4">
                          <div className="flex items-center gap-4">
                             <div className={`w-1 h-12 rounded-full transition-all duration-700 ${
                               f.isEmergency ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] scale-y-110" : 
                               selectedFlightId === f.id ? "bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]" : "bg-cyan-500/20"
                             }`} />
                             <div className="flex flex-col">
                              <span className="font-black text-white text-xl tracking-tighter group-hover:text-cyan-400 transition-colors uppercase italic">
                                {f.number}
                              </span>
                              <span className="text-[9px] text-slate-500 uppercase font-mono tracking-widest opacity-60">
                                {f.airline} • {f.aircraftType}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-6 px-4">
                          <div className="flex flex-col items-center gap-2">
                            {f.isEmergency ? (
                              <motion.span 
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="flex items-center gap-1.5 text-red-500 font-black text-[9px] bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30 uppercase tracking-tighter"
                              >
                                <ShieldAlert className="w-3.5 h-3.5" /> CRITICAL EVAC
                              </motion.span>
                            ) : f.priority === "VIP" ? (
                              <span className="flex items-center gap-1.5 text-amber-500 font-bold text-[9px] bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-tighter">
                                <Crown className="w-3.5 h-3.5" /> ROYAL/VIP
                              </span>
                            ) : (
                              <span className="text-slate-600 text-[8px] uppercase font-mono border border-white/5 px-2 py-0.5 rounded-full">Standard</span>
                            )}
                            <div className="flex flex-col items-center gap-1">
                               <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${f.impactScore}%` }}
                                    className={`h-full transition-all duration-1000 ${
                                      f.impactScore > 80 ? "bg-red-500" : f.impactScore > 50 ? "bg-amber-500" : "bg-cyan-500"
                                    }`} 
                                  />
                               </div>
                               <span className={`text-[8px] font-mono uppercase tracking-widest ${
                                  f.impactScore > 80 ? "text-red-500 font-bold" : "text-slate-500"
                               }`}>
                                 {f.impactScore > 80 ? "HIGH IMPACT" : f.impactScore > 50 ? "MEDIUM RISK" : "STABLE"}
                               </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-6 px-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                               <span className={`text-[10px] font-black px-3 py-1 rounded-lg w-fit tracking-tighter uppercase ${
                                 getStatusStyle(f.status)
                               }`}>
                                 {f.status === "AI_OPTIMIZING" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-ping mr-2" />}
                                 {f.status.replace("_", " ")}
                                 {f.status === "AI_OPTIMIZING" && <span className="ml-1 opacity-50 animate-pulse text-[8px]">...</span>}
                               </span>
                            </div>
                            {f.groundState && (
                              <span className={`text-[9px] flex items-center gap-1.5 font-bold uppercase tracking-widest ${
                                f.groundState === "COMPLETE" ? "text-emerald-500/80" : "text-slate-500"
                              }`}>
                                <Users className="w-3.5 h-3.5 opacity-50" /> 👷 Ground Ops: {f.groundState}
                                {f.groundState === "COMPLETE" && <CheckCircle2 className="w-3 h-3" />}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-6 pl-4">
                          <div className="flex items-center gap-3">
                            <span className={`px-5 py-2.5 rounded-2xl font-mono text-base font-bold border transition-all duration-700 ${
                              f.gate ? "bg-cyan-500/5 text-cyan-400 border-cyan-500/20 shadow-[0_0_20px_-10px_rgba(34,211,238,0.5)]" : "bg-white/5 text-slate-600 border-white/5 italic animate-pulse"
                            }`}>
                              {f.gate?.name || "RE-CALCULATING"}
                            </span>
                            {f.gate && (
                              <div className="flex flex-col">
                                <span className="text-[9px] text-slate-500 font-mono uppercase opacity-50">{f.gate.terminal}</span>
                                <span className="text-[8px] text-slate-600 font-mono uppercase tracking-tighter">{f.gate.size}</span>
                              </div>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </section>

          {/* System Event Feed (The Nerve Center) */}
          <section className="glass rounded-[2rem] p-8 border border-white/5">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
               <Terminal className="w-4 h-4 text-cyan-500" />
               Real-Time Causality Log
             </h3>
             <div className="space-y-3 font-mono">
                <AnimatePresence initial={false}>
                   {events.map((e: any) => (
                     <motion.div 
                        key={e.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => handleEventClick(e.flightId)}
                        className={`flex items-start gap-4 text-[10px] py-2 border-b border-white/[0.02] last:border-0 cursor-pointer hover:bg-white/[0.03] px-2 -mx-2 rounded-lg transition-all ${
                          selectedFlightId === e.flightId ? "bg-cyan-500/5 border-l-2 border-l-cyan-500" : ""
                        }`}
                     >
                        <span className="text-slate-600 shrink-0">[{new Date(e.createdAt).toLocaleTimeString()}]</span>
                        <span className={`shrink-0 font-bold ${
                          e.action.includes('AI') || e.action.includes('OPTIMIZE') ? "text-purple-400" : "text-emerald-400"
                        }`}>
                          [{e.action.replace("_", " ")}]
                        </span>
                        <span className="text-slate-300">
                           <span className="text-white font-bold">{e.flight?.number}:</span> {e.message}
                        </span>
                     </motion.div>
                   ))}
                </AnimatePresence>
             </div>
          </section>

        </div>

        {/* Right Column: AI & Stats */}
        <aside className="space-y-8">
          <AiAdvisoryPanel />
          
          <section className="glass rounded-[2rem] p-8 border border-white/5 overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity className="w-20 h-20 text-white" />
             </div>
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
               <Activity className="w-4 h-4 text-cyan-400" /> Resource Stability
             </h3>
             <div className="space-y-6 relative z-10">
                <MetricProgress label="Network Latency" val="12ms" percent={15} color="bg-cyan-500" />
                <MetricProgress label="AI Prediction Accuracy" val="99.2%" percent={99} color="bg-emerald-500" />
                <MetricProgress label="Gate Utilization" val={`${Math.round(((gates.length - openGates) / gates.length) * 100)}%`} percent={Math.round(((gates.length - openGates) / gates.length) * 100)} color="bg-blue-500" />
             </div>
          </section>
        </aside>

      </div>
    </div>
  );
}

function getStatusStyle(status: string) {
  switch (status) {
    case "EMERGENCY": return "bg-red-500 text-slate-950 shadow-[0_0_15px_rgba(239,68,68,0.4)]";
    case "AI_OPTIMIZING": return "bg-purple-500/20 text-purple-400 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.1)]";
    case "BOARDING": return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
    case "READY_PUSHBACK": return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse font-black";
    case "IN_FLIGHT": return "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
    case "LANDED": return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    case "DOCKING": return "bg-blue-600/10 text-blue-300 border border-blue-600/20";
    case "DEPARTED": return "bg-slate-800/20 text-slate-500 border border-slate-700/30 opacity-40";
    default: return "bg-slate-500/10 text-slate-400 border border-white/5";
  }
}

function MetricProgress({ label, val, percent, color }: { label: string, val: string, percent: number, color: string }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase tracking-tighter">
        <span>{label}</span>
        <span className="text-white font-bold">{val}</span>
      </div>
      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}
