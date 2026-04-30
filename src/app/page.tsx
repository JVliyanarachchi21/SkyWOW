"use client";

import { motion } from "framer-motion";
import { Plane, Radio, Shield, Zap, LayoutDashboard, Cpu } from "lucide-react";
import Link from "next/link";

const flights = [
  { id: "SW102", destination: "LONDON", status: "ON TIME", time: "10:45" },
  { id: "SW245", destination: "TOKYO", status: "BOARDING", time: "11:20" },
  { id: "SW981", destination: "NEW YORK", status: "DELAYED", time: "12:05" },
  { id: "SW552", destination: "SINGAPORE", status: "ON TIME", time: "13:30" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30">
      {/* Top Ticker */}
      <div className="w-full bg-card/50 border-b border-white/5 py-2 overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12"
        >
          {[...flights, ...flights, ...flights].map((f, i) => (
            <div key={i} className="flex items-center gap-4 text-xs font-mono tracking-widest text-cyan-400">
              <Plane className="w-3 h-3 rotate-90" />
              <span>{f.id}</span>
              <span className="text-white/40">{f.destination}</span>
              <span className={f.status === "DELAYED" ? "text-amber-500" : "text-emerald-400"}>
                {f.status}
              </span>
              <span className="text-white/40">{f.time}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-medium mb-6">
              <Radio className="w-3 h-3 animate-pulse" />
              SYSTEM STATUS: OPERATIONAL
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              SKY<span className="text-cyan-400">WOW</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed mb-10">
              The next generation of intelligent airport management. 
              Real-time synchronization, AI-powered scheduling, and enterprise control.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="group relative px-8 py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl transition-all hover:scale-105 active:scale-95 animate-pulse-cyan"
              >
                ENTER CONTROL ROOM
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl backdrop-blur-md transition-all hover:bg-white/10">
                VIEW DOCUMENTATION
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Cpu className="w-6 h-6 text-cyan-400" />}
            title="AI Optimization"
            description="Intelligent gate assignment and flow optimization using Gemini Pro."
          />
          <FeatureCard 
            icon={<LayoutDashboard className="w-6 h-6 text-blue-400" />}
            title="Real-time Ops"
            description="Live synchronization of flight status, baggage, and ground crew."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-emerald-400" />}
            title="Enterprise Security"
            description="Role-based access control and encrypted data streams."
          />
        </div>
      </section>

      <footer className="py-10 text-center border-t border-white/5 text-slate-500 text-sm">
        &copy; 2026 SkyWOW Intelligence Systems. Built for the Future.
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass p-8 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-colors group"
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-cyan-500/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
