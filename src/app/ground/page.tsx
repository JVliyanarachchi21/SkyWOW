"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Droplet, 
  Wind, 
  CheckCircle2, 
  Clock, 
  PlaneLanding, 
  ShieldCheck,
  ChevronRight,
  RefreshCw
} from "lucide-react";

const GROUND_STATES = [
  { id: "CLEANING", label: "Cleaning", icon: <Wind className="w-5 h-5" />, color: "border-blue-500/50 text-blue-400" },
  { id: "REFUELING", label: "Refueling", icon: <Droplet className="w-5 h-5" />, color: "border-amber-500/50 text-amber-400" },
  { id: "BOARDING", label: "Boarding", icon: <Users className="w-5 h-5" />, color: "border-purple-500/50 text-purple-400" },
  { id: "COMPLETE", label: "Ready", icon: <CheckCircle2 className="w-5 h-5" />, color: "border-emerald-500/50 text-emerald-400" },
];

export default function GroundCrewTerminal() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/flights");
      const data = await res.json();
      // Only show flights that are at a gate and not already departed
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
        body: JSON.stringify({ flightId, state, triggeredBy: "GROUND_CREW_01" }),
      });
      await fetchData();
    } catch (error) {
      console.error("Failed to update milestone:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans">
      {/* Header */}
      <header className="max-w-4xl mx-auto flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Users className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter text-white">Ground Terminal</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-amber-500" /> Secure Node: T1-ALPHA
            </p>
          </div>
        </div>
        <button onClick={fetchData} className="p-2 bg-white/5 rounded-lg border border-white/10 active:scale-95 transition-transform">
          <RefreshCw className={`w-5 h-5 text-slate-400 ${loading ? "animate-spin" : ""}`} />
        </button>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        <AnimatePresence mode="popLayout">
          {flights.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10"
            >
              <PlaneLanding className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No aircraft currently docked for service.</p>
            </motion.div>
          ) : (
            flights.map((f: any) => (
              <motion.section 
                key={f.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-black text-white tracking-tighter">{f.number}</div>
                    <div className="flex flex-col">
                       <span className="text-[10px] text-slate-500 uppercase font-mono">{f.airline}</span>
                       <span className="text-xs font-bold text-cyan-400">GATE {f.gate?.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                     <Clock className="w-4 h-4 text-slate-500" />
                     <span className="text-sm font-mono font-bold text-slate-300">
                        {new Date(f.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </span>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {GROUND_STATES.map((state) => (
                    <button
                      key={state.id}
                      onClick={() => updateMilestone(f.id, state.id)}
                      disabled={updatingId === f.id}
                      className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all active:scale-95 ${
                        f.groundState === state.id 
                          ? `${state.color} bg-white/10 shadow-inner` 
                          : "border-white/5 bg-white/5 text-slate-500 hover:bg-white/[0.08]"
                      }`}
                    >
                      {state.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{state.label}</span>
                      {f.groundState === state.id && (
                        <motion.div 
                          layoutId={`active-${f.id}`}
                          className="absolute inset-0 border-2 border-current rounded-2xl"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="px-6 pb-6 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${f.status === 'READY_PUSHBACK' ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-amber-500 animate-pulse"}`} />
                      <span className="text-[10px] font-mono text-slate-500 uppercase">System Status: {f.status}</span>
                   </div>
                   <div className="text-[10px] font-mono text-slate-700">
                      ID: {f.id.substring(0, 8)}
                   </div>
                </div>
              </motion.section>
            ))
          )}
        </AnimatePresence>
      </main>

      {/* Footer Meta */}
      <footer className="max-w-4xl mx-auto mt-12 pt-8 border-t border-white/5 flex items-center justify-between opacity-30 text-[9px] font-mono uppercase tracking-[0.2em]">
         <span>SkyWOW Ground Ops v2.4</span>
         <span className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" /> Encrypted Payload Active
         </span>
      </footer>
    </div>
  );
}
