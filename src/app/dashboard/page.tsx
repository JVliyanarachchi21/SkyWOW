"use client";

import { motion } from "framer-motion";
import { 
  Plane, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Cpu
} from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Control Room Overview</h1>
          <p className="text-slate-400">Monitoring sky activity and airport resources in real-time.</p>
        </div>
        <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-xl border border-white/5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-mono text-emerald-500">SYSTEM: OPTIMIZED</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Flights Today" 
          value="142" 
          trend="+12% from yesterday"
          icon={<Plane className="w-5 h-5 text-cyan-400" />}
        />
        <StatsCard 
          label="Gate Occupancy" 
          value="84%" 
          trend="Peak performance"
          icon={<Clock className="w-5 h-5 text-blue-400" />}
        />
        <StatsCard 
          label="Active Staff" 
          value="312" 
          trend="Full coverage"
          icon={<Users className="w-5 h-5 text-emerald-400" />}
        />
        <StatsCard 
          label="AI Efficiency" 
          value="98.2%" 
          trend="Optimal routing"
          icon={<Cpu className="w-5 h-5 text-purple-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Activity Area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass rounded-3xl border border-white/5 p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Real-time Traffic Status
            </h2>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl bg-white/2">
              <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">
                [ Chart Module: Real-time Visualization ]
              </p>
            </div>
          </section>
        </div>

        {/* AI Advisory Panel */}
        <aside className="space-y-6">
          <section className="glass-accent rounded-3xl p-8 border border-cyan-500/20">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-cyan-400">
              <Cpu className="w-5 h-5" />
              AI Advisor
            </h2>
            <div className="space-y-4">
              <AIInsight 
                type="optimization"
                message="Suggesting Gate B12 for SW-245 to reduce taxi time by 4 minutes."
              />
              <AIInsight 
                type="warning"
                message="Potential congestion in Terminal 2 at 14:00. Recommend staff relocation."
              />
              <button className="w-full py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl mt-4 hover:scale-[1.02] transition-transform active:scale-95">
                EXECUTE ALL RECOMMENDATIONS
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
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
