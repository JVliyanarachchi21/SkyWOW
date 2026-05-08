"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plane, 
  Clock, 
  MapPin, 
  Activity, 
  ShieldCheck, 
  Zap, 
  RefreshCw,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Settings,
  MoreVertical,
  Cpu,
  History
} from "lucide-react";

interface Flight {
  id: string;
  number: string;
  airline: string;
  aircraftType: string;
  origin: string;
  destination: string;
  status: string;
  priority: string;
  isEmergency: boolean;
  impactScore: number;
  gate: { name: string, terminal: string } | null;
  milestones: any[];
  auditLogs: any[];
}

export default function FlightBoard() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const fetchFlights = async () => {
    try {
      const res = await fetch("/api/flights");
      const data = await res.json();
      setFlights(data);
    } catch (error) {
      console.error("Flight fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    airborne: flights.filter(f => f.status === "IN_FLIGHT").length,
    gated: flights.filter(f => f.gate).length,
    emergency: flights.filter(f => f.isEmergency).length
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Tactical HUD Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic flex items-center gap-4">
             <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-2xl">
                <Plane className="w-8 h-8 text-blue-400" />
             </div>
             Fleet Management <span className="text-blue-400">HUD</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em] mt-2 ml-1">Live Telemetry • Active Vectors: {flights.length}</p>
        </div>

        <div className="flex items-center gap-6">
           <div className="hidden lg:flex gap-8 px-8 py-4 bg-white/[0.02] border border-white/5 rounded-[2rem]">
              <HUDStat label="Airborne" val={stats.airborne} color="text-cyan-400" />
              <div className="w-px h-10 bg-white/5" />
              <HUDStat label="Docks Active" val={stats.gated} color="text-blue-400" />
              <div className="w-px h-10 bg-white/5" />
              <HUDStat label="Threat Level" val={stats.emergency > 0 ? "HIGH" : "LOW"} color={stats.emergency > 0 ? "text-red-500" : "text-emerald-500"} />
           </div>
           <button 
             onClick={fetchFlights}
             className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
           >
              <RefreshCw className={`w-5 h-5 text-slate-500 group-hover:text-white transition-colors ${loading ? 'animate-spin' : ''}`} />
           </button>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-6">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              placeholder="Search flight vector, airline, or terminal..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
         </div>
         <div className="flex items-center gap-3">
            <FilterButton active={filter === "ALL"} label="All Vectors" onClick={() => setFilter("ALL")} />
            <FilterButton active={filter === "EMERGENCY"} label="Critical" onClick={() => setFilter("EMERGENCY")} />
            <FilterButton active={filter === "AI_OPTIMIZING"} label="AI Active" onClick={() => setFilter("ALL")} />
         </div>
      </div>

      {/* Flight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
         <AnimatePresence mode="popLayout">
            {flights.map((flight) => (
              <FlightHudCard 
                key={flight.id} 
                flight={flight} 
                onInspect={() => setSelectedFlight(flight)}
              />
            ))}
         </AnimatePresence>
      </div>

      {/* Flight Details Modal */}
      <AnimatePresence>
          {selectedFlight && (
            <FlightDetailsModal 
              flight={selectedFlight} 
              onClose={() => setSelectedFlight(null)} 
            />
          )}
       </AnimatePresence>
    </div>
  );
}

function FlightDetailsModal({ flight, onClose }: { flight: Flight, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         onClick={onClose}
         className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
       />
       <motion.div 
         initial={{ opacity: 0, scale: 0.9, y: 20 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         exit={{ opacity: 0, scale: 0.9, y: 20 }}
         className="w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden relative z-10 shadow-2xl flex flex-col max-h-[90vh]"
       >
          <header className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
             <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center font-black text-3xl italic tracking-tighter ${
                   flight.isEmergency ? "bg-red-500/20 border-red-500/30 text-red-500" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                }`}>
                   {flight.number}
                </div>
                <div>
                   <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">{flight.airline} <span className="text-slate-500 text-lg not-italic font-medium ml-2">/ {flight.aircraftType}</span></h2>
                   <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                         <MapPin className="w-3.5 h-3.5" /> {flight.origin} ⮕ {flight.destination}
                      </span>
                   </div>
                </div>
             </div>
             <button onClick={onClose} className="p-4 hover:bg-white/5 rounded-2xl transition-colors text-slate-500 hover:text-white">
                <Settings className="w-6 h-6 rotate-45" />
             </button>
          </header>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DetailStat label="Current Status" val={flight.status} color="text-blue-400" icon={Activity} />
                <DetailStat label="Assigned Gate" val={flight.gate?.name || "STANDBY"} color="text-cyan-400" icon={MapPin} />
                <DetailStat label="AI Confidence" val="98.4%" color="text-purple-400" icon={Cpu} />
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Audit Logs */}
                <div className="space-y-6">
                   <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                      <History className="w-4 h-4" /> AI Dispatch Logs
                   </h3>
                   <div className="space-y-4">
                      {flight.auditLogs?.length > 0 ? flight.auditLogs.map((log: any, i: number) => (
                        <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                           <div className="flex items-center justify-between mb-2">
                              <span className="text-[8px] font-mono text-purple-400 uppercase tracking-widest">{log.action}</span>
                              <span className="text-[8px] font-mono text-slate-600">CONF: {log.confidenceScore * 100}%</span>
                           </div>
                           <p className="text-xs text-slate-300 italic">"{log.message}"</p>
                        </div>
                      )) : (
                        <p className="text-[10px] text-slate-600 uppercase font-mono italic">No automated dispatches recorded.</p>
                      )}
                   </div>
                </div>

                {/* Milestones */}
                <div className="space-y-6">
                   <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" /> Ground Milestones
                   </h3>
                   <div className="space-y-4">
                      {['REFUELING', 'CLEANING', 'BOARDING', 'READY_PUSHBACK'].map((m, i) => (
                        <div key={m} className={`p-4 rounded-2xl border flex items-center justify-between ${
                           i === 0 ? "bg-emerald-500/10 border-emerald-500/20" : "bg-white/[0.01] border-white/5 opacity-40"
                        }`}>
                           <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-emerald-500 animate-pulse" : "bg-slate-700"}`} />
                              <span className={`text-[10px] font-black uppercase tracking-widest ${i === 0 ? "text-emerald-400" : "text-slate-500"}`}>{m}</span>
                           </div>
                           <span className="text-[8px] font-mono text-slate-600">{i === 0 ? "IN PROGRESS" : "PENDING"}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
       </motion.div>
    </div>
  );
}

function DetailStat({ label, val, color, icon: Icon }: any) {
  return (
     <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
        <div className="flex items-center gap-2 mb-2 text-slate-500">
           <Icon className="w-4 h-4" />
           <span className="text-[9px] font-mono uppercase tracking-widest">{label}</span>
        </div>
        <div className={`text-2xl font-black italic tracking-tighter uppercase ${color}`}>{val}</div>
     </div>
  );
}

function FlightHudCard({ flight, onInspect }: { flight: Flight, onInspect: () => void }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500 shadow-2xl"
    >
       <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Plane className="w-24 h-24 text-white -rotate-45" />
       </div>

       {/* Card Header */}
       <div className="flex items-start justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
             <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-black text-2xl italic tracking-tighter shadow-lg transition-all duration-700 ${
                flight.isEmergency 
                  ? "bg-red-500/20 border-red-500/30 text-red-500 shadow-red-500/10" 
                  : "bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-blue-500/10"
             }`}>
                {flight.number}
             </div>
             <div>
                <h3 className="text-sm font-black text-white uppercase italic tracking-tight">{flight.airline}</h3>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{flight.aircraftType}</span>
             </div>
          </div>
          <div className="flex flex-col items-end">
             <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-tighter ${
                flight.status === 'EMERGENCY' ? 'bg-red-500 text-slate-950' : 'bg-white/5 text-slate-400'
             }`}>
                {flight.status.replace("_", " ")}
             </span>
             <div className="flex items-center gap-1.5 mt-2 text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                <History className="w-3 h-3" /> Last sync: 2s ago
             </div>
          </div>
       </div>

       {/* Telemetry Grid */}
       <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
             <div className="flex items-center gap-2 mb-2 text-cyan-400/60">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span className="text-[8px] font-mono uppercase tracking-widest">Route Origin</span>
             </div>
             <div className="text-xl font-black text-white tracking-tighter uppercase">{flight.origin}</div>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
             <div className="flex items-center gap-2 mb-2 text-purple-400/60">
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span className="text-[8px] font-mono uppercase tracking-widest">Target Dest</span>
             </div>
             <div className="text-xl font-black text-white tracking-tighter uppercase">{flight.destination}</div>
          </div>
       </div>

       {/* Progress HUD */}
       <div className="space-y-6 mb-8 relative z-10">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                   flight.gate ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-white/5 border-white/10 text-slate-700"
                }`}>
                   <MapPin className="w-5 h-5" />
                </div>
                <div>
                   <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Assigned Resource</div>
                   <div className="text-sm font-black text-white italic tracking-tight">{flight.gate?.name || "VECTOR-SCANNING"}</div>
                </div>
             </div>
             <div className="text-right">
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">AI Confidence</div>
                <div className="text-lg font-black text-purple-400 italic tracking-tighter">98.4%</div>
             </div>
          </div>

          <div className="space-y-2">
             <div className="flex justify-between text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                <span>Flight Lifecycle Index</span>
                <span>Impact: {flight.impactScore}/100</span>
             </div>
             <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[2px]">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${flight.impactScore}%` }}
                   className={`h-full rounded-full ${
                      flight.isEmergency ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                   }`}
                />
             </div>
          </div>
       </div>

       {/* Audit Link */}
       {flight.auditLogs?.[0] && (
         <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl flex items-center gap-4 group/audit hover:bg-purple-500/10 transition-all cursor-pointer relative z-10 mb-6">
            <Cpu className="w-5 h-5 text-purple-400" />
            <div className="flex-1 overflow-hidden">
               <div className="text-[8px] font-mono text-purple-500 uppercase tracking-widest mb-1">Latest AI Dispatch</div>
               <p className="text-[10px] text-slate-400 truncate italic">{flight.auditLogs[0].message}</p>
            </div>
         </div>
       )}

       {/* Tactical Actions */}
       <div className="flex gap-3 relative z-10">
          <button 
            onClick={onInspect}
            className="flex-1 py-3 bg-white/5 border border-white/10 hover:bg-blue-500 hover:text-slate-950 hover:border-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
          >
             <Activity className="w-3.5 h-3.5 text-blue-400 group-hover/btn:text-slate-950" />
             Inspect Vector
          </button>
          <button className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all">
             <MoreVertical className="w-4 h-4 text-slate-500" />
          </button>
       </div>
    </motion.div>
  );
}

function HUDStat({ label, val, color }: { label: string, val: string | number, color: string }) {
  return (
    <div className="flex flex-col gap-1">
       <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{label}</span>
       <span className={`text-2xl font-black italic tracking-tighter ${color}`}>{val}</span>
    </div>
  );
}

function FilterButton({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
        active 
          ? "bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/20" 
          : "bg-white/5 text-slate-500 hover:bg-white/10 border border-white/10"
      }`}
    >
       {label}
    </button>
  );
}
