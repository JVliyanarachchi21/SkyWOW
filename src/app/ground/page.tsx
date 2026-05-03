"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { 
  Users, 
  Droplet, 
  Wind, 
  CheckCircle2, 
  Clock, 
  PlaneLanding, 
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  LogOut
} from "lucide-react";

const GROUND_STATES = [
  { id: "CLEANING", label: "Cleaning", icon: <Wind className="w-5 h-5" />, color: "border-blue-500/50 text-blue-400" },
  { id: "REFUELING", label: "Refueling", icon: <Droplet className="w-5 h-5" />, color: "border-amber-500/50 text-amber-400" },
  { id: "BOARDING", label: "Boarding", icon: <Users className="w-5 h-5" />, color: "border-purple-500/50 text-purple-400" },
  { id: "COMPLETE", label: "Ready", icon: <CheckCircle2 className="w-5 h-5" />, color: "border-emerald-500/50 text-emerald-400" },
];

export default function GroundCrewTerminal() {
  const { data: session } = useSession();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/flights");
      const data = await res.json();
      const groundFlights = data.filter((f: any) => 
        f.gateId && f.status !== "DEPARTED" && f.status !== "IN_FLIGHT"
      );
      setFlights(groundFlights);
    } catch (error) {
      console.error("Failed to fetch ground flights:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateMilestone = async (flightId: string, state: string) => {
    setUpdatingId(flightId);
    try {
      await fetch("/api/flights/milestone", {
        method: "POST",
        body: JSON.stringify({ flightId, state, triggeredBy: session?.user?.name || "GROUND_OPS" }),
      });
      await fetchData();
    } catch (error) {
      console.error("Failed to update milestone:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-amber-500/30">
      {/* Header */}
      <header className="max-w-4xl mx-auto flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 p-2 pr-6 bg-white/5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl"
          >
             <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20">
                {session?.user?.name?.charAt(0) || "A"}
             </div>
             <div>
                <h1 className="text-sm font-black text-white uppercase tracking-tight">
                  {session?.user?.name || "Authorized Personnel"}
                </h1>
                <p className="text-[9px] font-mono text-amber-500 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> {(session?.user as any)?.role || "SECURE_NODE"}
                </p>
             </div>
          </motion.div>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-black uppercase tracking-tighter text-white">Ground Terminal</h1>
            <p className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.2em]">Node: T1-ALPHA</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })} 
            className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 active:scale-95 transition-all group hover:bg-red-500/20"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5 text-red-400 group-hover:rotate-12 transition-transform" />
          </button>
          <button onClick={fetchData} className="p-3 bg-white/5 rounded-xl border border-white/10 active:scale-95 transition-all hover:bg-white/10">
            <RefreshCw className={`w-5 h-5 text-slate-400 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <AnimatePresence mode="popLayout">
          {flights.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white/[0.02] rounded-[2.5rem] border border-dashed border-white/10"
            >
              <PlaneLanding className="w-16 h-16 text-slate-800 mx-auto mb-6" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Standby: No Active Docking</p>
              <p className="text-[10px] text-slate-600 mt-2 font-mono">Awaiting next arrival from ATC...</p>
            </motion.div>
          ) : (
            flights.map((f: any) => {
              const isEmergency = f.isEmergency || f.priority === 'EMERGENCY';
              const depDate = new Date(f.departureTime);
              const isOverdue = depDate < new Date();

              return (
                <motion.section 
                  key={f.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    boxShadow: isEmergency ? "0 0 40px rgba(239,68,68,0.15)" : "none",
                    borderColor: isEmergency ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.1)"
                  }}
                  className={`relative bg-slate-900/50 border rounded-[2.5rem] overflow-hidden transition-colors duration-500`}
                >
                  {isEmergency && (
                    <motion.div 
                      animate={{ opacity: [0.05, 0.15, 0.05] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-red-500 pointer-events-none"
                    />
                  )}

                  <div className="p-8 border-b border-white/5 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl italic tracking-tighter ${
                        isEmergency ? "bg-red-500 text-white shadow-xl shadow-red-500/20" : "bg-white/5 text-slate-300 border border-white/10"
                      }`}>
                        {f.number}
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{f.airline}</span>
                            {isEmergency && <span className="text-[8px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-black animate-pulse">EMERGENCY</span>}
                         </div>
                         <h3 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
                            {f.aircraftType}
                            <ChevronRight className="w-5 h-5 text-slate-700" />
                            <span className="text-cyan-400">GATE {f.gate?.name}</span>
                         </h3>
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col items-end gap-2 text-right">
                       <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs font-mono uppercase tracking-widest">Dep Target</span>
                       </div>
                       <div className={`text-2xl font-black italic tracking-tighter ${isOverdue ? "text-red-500" : "text-white"}`}>
                          {depDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </div>
                    </div>
                  </div>

                  <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                    {GROUND_STATES.map((state) => {
                      const isActive = f.groundState === state.id;
                      return (
                        <button
                          key={state.id}
                          onClick={() => updateMilestone(f.id, state.id)}
                          disabled={updatingId === f.id}
                          className={`relative flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border-2 transition-all active:scale-95 group overflow-hidden ${
                            isActive 
                              ? `${state.color} bg-white/5 border-current` 
                              : "border-white/5 bg-white/[0.02] text-slate-500 hover:border-white/20 hover:bg-white/[0.05]"
                          }`}
                        >
                          <div className={`transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                             {state.icon}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{state.label}</span>
                          
                          {isActive && (
                            <motion.div 
                              layoutId={`active-bg-${f.id}`}
                              className="absolute inset-0 bg-white/[0.03] pointer-events-none"
                              initial={false}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="px-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                     <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                        <div className={`w-2 h-2 rounded-full ${f.status === 'READY_PUSHBACK' ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" : "bg-amber-500 animate-pulse"}`} />
                        <span className="text-[9px] font-black font-mono text-slate-400 uppercase tracking-widest">
                           Ops Status: <span className="text-white">{f.status}</span>
                        </span>
                     </div>
                     
                     <div className="flex items-center gap-6">
                        <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                           Node: {f.id.substring(0, 12)}
                        </div>
                        <div className="px-3 py-1 bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 rounded-lg text-[9px] font-black uppercase italic">
                           Secure Sync
                        </div>
                     </div>
                  </div>
                </motion.section>
              );
            })
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-4xl mx-auto mt-12 pt-8 border-t border-white/5 flex items-center justify-between opacity-30 text-[9px] font-mono uppercase tracking-[0.2em]">
         <span>SkyWOW Ground Ops v2.4</span>
         <span className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" /> Encrypted Payload Active
         </span>
      </footer>
    </div>
  );
}
