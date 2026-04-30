"use client";

import { useState, useEffect } from "react";
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
  Zap
} from "lucide-react";

export default function DashboardOverview() {
  const [flights, setFlights] = useState([]);
  const [gates, setGates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [flightsRes, gatesRes] = await Promise.all([
        fetch("/api/flights"),
        fetch("/api/gates")
      ]);
      const flightsData = await flightsRes.json();
      const gatesData = await gatesRes.json();
      setFlights(flightsData);
      setGates(gatesData);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Faster refresh for "Alive" feel
    return () => clearInterval(interval);
  }, []);

  const activeFlights = flights.length;
  const emergencies = flights.filter((f: any) => f.isEmergency).length;
  const openGates = gates.filter((g: any) => g.status === "OPEN").length;
  const occupancyRate = gates.length > 0 ? Math.round(((gates.length - openGates) / gates.length) * 100) : 0;

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            Mission Control
            <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full font-mono uppercase">v2.0 Alive</span>
          </h1>
          <p className="text-slate-400">Collaborative Decision Making System (A-CDM) active.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchData}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <RefreshCw className={`w-5 h-5 text-slate-400 ${loading ? "animate-spin" : ""}`} />
          </button>
          <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-xl border border-white/5">
            <div className={`w-2 h-2 rounded-full ${emergencies > 0 ? "bg-red-500 animate-ping" : "bg-emerald-500 animate-pulse"}`} />
            <span className={`text-sm font-mono uppercase ${emergencies > 0 ? "text-red-500" : "text-emerald-500"}`}>
              {emergencies > 0 ? `${emergencies} EMERGENCY ACTIVE` : "System: Optimized"}
            </span>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Live Flights" 
          value={activeFlights.toString()} 
          trend="Real-time Radar"
          icon={<Plane className="w-5 h-5 text-cyan-400" />}
        />
        <StatsCard 
          label="Resource Load" 
          value={`${occupancyRate}%`} 
          trend={`${openGates} Gates Open`}
          icon={<Zap className="w-5 h-5 text-blue-400" />}
        />
        <StatsCard 
          label="Ground Sync" 
          value="100%" 
          trend="Source of Truth Active"
          icon={<Users className="w-5 h-5 text-emerald-400" />}
        />
        <StatsCard 
          label="AI dispatcher" 
          value="AUTO" 
          trend="Continuous Evaluation"
          icon={<Cpu className="w-5 h-5 text-purple-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Flight Board Area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass rounded-3xl border border-white/5 p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Dynamic Flight Lifecycle
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-mono text-slate-500 uppercase tracking-widest border-b border-white/5">
                    <th className="pb-4">Flight / Origin</th>
                    <th className="pb-4">Priority</th>
                    <th className="pb-4">Current Phase</th>
                    <th className="pb-4">Gate</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <AnimatePresence>
                    {flights.map((f: any) => (
                      <motion.tr 
                        key={f.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors ${
                          f.isEmergency ? "bg-red-500/5" : ""
                        }`}
                      >
                        <td className="py-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-base">{f.number}</span>
                            <span className="text-xs text-slate-500">{f.origin}</span>
                          </div>
                        </td>
                        <td className="py-6">
                          {f.isEmergency ? (
                            <span className="flex items-center gap-1 text-red-500 font-bold text-xs uppercase animate-pulse">
                              <ShieldAlert className="w-4 h-4" /> EMERGENCY
                            </span>
                          ) : f.priority === "VIP" ? (
                            <span className="flex items-center gap-1 text-amber-500 font-bold text-xs uppercase">
                              <Crown className="w-4 h-4" /> VIP
                            </span>
                          ) : (
                            <span className="text-slate-500 text-xs uppercase font-mono">Normal</span>
                          )}
                        </td>
                        <td className="py-6">
                          <div className="flex flex-col gap-1">
                            <span className={`text-xs font-bold px-2 py-1 rounded-md w-fit ${
                              getStatusStyle(f.status)
                            }`}>
                              {f.status.replace("_", " ")}
                            </span>
                            {f.groundState && (
                              <span className="text-[10px] text-slate-400 flex items-center gap-1 italic">
                                <Users className="w-3 h-3" /> Ground: {f.groundState}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-6">
                          <span className={`px-3 py-1.5 rounded-lg font-mono text-xs border ${
                            f.gate ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" : "bg-white/5 text-slate-500 border-white/10 italic"
                          }`}>
                            {f.gate?.name || "RE-EVALUATING..."}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* AI Advisory Panel */}
        <aside className="space-y-6">
          <section className="glass-accent rounded-3xl p-8 border border-cyan-500/20">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-cyan-400">
              <Cpu className="w-5 h-5" />
              AI Dispatcher
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                <p className="text-xs text-slate-400 mb-2 uppercase font-mono">Current Logic</p>
                <p className="text-sm text-white font-medium italic">"Predicting 15 minute delay for SW911. Redirecting Gate E999 for emergency priority."</p>
              </div>
              
              <AIInsight 
                type="optimization"
                message="Gate A101 turnaround complete. Releasing for SW001."
              />
              
              <button className="w-full py-4 bg-cyan-500 text-slate-950 font-black rounded-xl mt-4 hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-cyan-500/20 uppercase tracking-tighter">
                Approve AI Dispatch
              </button>
              <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono">
                Manual Override Enabled
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function getStatusStyle(status: string) {
  switch (status) {
    case "EMERGENCY": return "bg-red-500 text-white";
    case "AI_OPTIMIZING": return "bg-purple-500/20 text-purple-400 border border-purple-500/30 animate-pulse";
    case "BOARDING": return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
    case "IN_FLIGHT": return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30";
    case "LANDED": return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
    default: return "bg-slate-500/20 text-slate-400 border border-slate-500/30";
  }
}

function StatsCard({ label, value, trend, icon }: { label: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-xs text-slate-400 flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
        {trend}
      </div>
    </motion.div>
  );
}

function AIInsight({ type, message }: { type: 'optimization' | 'warning', message: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
      <div className="flex items-center gap-2">
        {type === 'optimization' ? (
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
        ) : (
          <AlertCircle className="w-4 h-4 text-amber-500" />
        )}
        <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
          {type}
        </span>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">
        {message}
      </p>
    </div>
  );
}
