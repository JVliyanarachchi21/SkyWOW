"use client";

import { motion } from "framer-motion";
import { 
  Plane, 
  Radio, 
  Shield, 
  Globe, 
  Cpu, 
  ArrowRight, 
  Monitor,
  Navigation2,
  Activity,
  Maximize2,
  Database,
  Lock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 overflow-hidden relative font-sans">
      
      {/* 1. DYNAMIC BACKGROUND ARCHITECTURE */}
      <div className="absolute inset-0 z-0">
         {/* The Hero Image - Subtle & Deep */}
         <Image 
           src="/hero.png" 
           alt="" 
           fill
           className="object-cover opacity-30 scale-105"
           priority
         />
         {/* Multi-stage Gradients for Depth */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,6,23,0.85)_80%,#020617_100%)]" />
         <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/90" />
         
         {/* Moving Tactical Data Streams */}
         <div className="absolute top-1/4 -left-10 w-[120%] h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -rotate-12 animate-scan" />
         <div className="absolute top-3/4 -left-10 w-[120%] h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent rotate-12 animate-scan-reverse" />
      </div>

      {/* 2. TOP HUD (STATUS BAR) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-10 py-8 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto group cursor-pointer">
          <div className="p-2.5 bg-slate-900/50 border border-white/10 rounded-xl backdrop-blur-xl">
            <Plane className="w-6 h-6 text-cyan-400 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
          </div>
          <span className="text-2xl font-black italic tracking-tighter uppercase leading-none">
            SKY<span className="text-cyan-500">WOW</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-12 pointer-events-auto bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl">
          <NavLabel label="COORD" status="40.7128° N" />
          <NavLabel label="SYSTEM" status="NOMINAL" />
          <NavLabel label="ENCRYPTION" status="AES-256" />
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          <Link href="/login" className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
            Direct Uplink
          </Link>
        </div>
      </nav>

      {/* 3. CENTRAL COMMAND INTERFACE */}
      <div className="relative z-10 min-h-screen flex flex-col items-center pt-32 pb-40 px-6">
        
        {/* BRANDING NODE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-xl text-cyan-400 text-[10px] font-black uppercase tracking-[0.5em] mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]" />
            A-CDM Operational Core Alpha
          </div>
          <h1 className="text-[4.5rem] md:text-[7.5rem] font-black tracking-tighter leading-none mb-4 italic uppercase">
            SKY<span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 drop-shadow-2xl">WOW</span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-light italic tracking-[0.3em] opacity-80 max-w-2xl mx-auto uppercase">
            Autonomous Airport Decisions • Global Real-Time Sync
          </p>
        </motion.div>

        {/* TACTICAL MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full max-w-6xl relative">
          
          {/* SATELLITE MODULE 01: PASSENGER */}
          <ModuleCard 
            icon={<Monitor className="w-7 h-7 text-amber-500" />}
            title="Passenger"
            subtitle="PIDS TERMINAL"
            description="Live flight synchronization and terminal schedule visualization for travelers."
            href="/pids"
            color="amber"
            delay={0.2}
          />

          {/* SATELLITE MODULE 02: STAFF (LOGIN) */}
          <ModuleCard 
            icon={<Lock className="w-7 h-7 text-cyan-400" />}
            title="Tactical"
            subtitle="STAFF ENTRY"
            description="Secure uplink for ground crew, operators, and administrative personnel."
            href="/login"
            color="cyan"
            delay={0.4}
            featured
          />

          {/* SATELLITE MODULE 03: RESOURCE */}
          <ModuleCard 
            icon={<Database className="w-7 h-7 text-purple-400" />}
            title="Resource"
            subtitle="DATA CORE"
            description="Integrated telemetry and AI-native asset management modules."
            href="/dashboard"
            color="purple"
            delay={0.6}
          />

        </div>
      </div>

      {/* 4. FOOTER HUD (NON-FIXED) */}
      <footer className="relative w-full p-10 flex flex-col md:flex-row items-center justify-between z-50 border-t border-white/5 backdrop-blur-3xl bg-slate-950/60 mt-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            SKYWOW INTEL &copy; 2026 • ALL SYSTEMS NOMINAL
          </div>
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-none">Global Sync: Active</div>
          </div>
        </div>
        
        <div className="flex items-center gap-8 mt-8 md:mt-0">
          <div className="flex items-center gap-2 text-[10px] font-black text-cyan-500/50 italic uppercase tracking-tighter">
             Verified Node <Shield className="w-3.5 h-3.5" />
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <Globe className="w-4 h-4 text-slate-400" />
            </button>
            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <Maximize2 className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </footer>

      {/* Decorative Overlays */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
    </main>
  );
}

function NavLabel({ label, status }: { label: string, status: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-1">{label}</span>
      <span className="text-[10px] font-black text-white italic tracking-tighter uppercase">{status}</span>
    </div>
  );
}

function ModuleCard({ icon, title, subtitle, description, href, color, delay, featured = false }: any) {
  const colorMap: any = {
    amber: "from-amber-500/20 to-transparent group-hover:from-amber-500/40 border-amber-500/20 group-hover:border-amber-500/40",
    cyan: "from-cyan-500/20 to-transparent group-hover:from-cyan-500/40 border-cyan-500/20 group-hover:border-cyan-500/40",
    purple: "from-purple-500/20 to-transparent group-hover:from-purple-500/40 border-purple-500/20 group-hover:border-purple-500/40"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <Link href={href} className="group block h-full">
        <div className={`relative p-px rounded-[2.5rem] bg-gradient-to-br transition-all duration-500 ${colorMap[color]} ${featured ? 'scale-105 shadow-2xl z-20' : ''}`}>
          <div className="bg-slate-900/90 backdrop-blur-3xl rounded-[2.4rem] p-10 h-full flex flex-col justify-between border border-white/5 group-hover:bg-slate-900/60 transition-colors">
            <div>
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                {icon}
              </div>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">{title}</h3>
              <h4 className="text-3xl font-black italic tracking-tighter uppercase mb-4 leading-tight">{subtitle}</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-light italic">
                {description}
              </p>
            </div>
            
            <div className="mt-12 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Access Node</span>
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-slate-950 transition-all duration-500">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
