"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Clock, MapPin, Info, ArrowRight } from "lucide-react";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'BOARDING': return 'text-emerald-400';
    case 'DELAYED': return 'text-red-400';
    case 'LANDED': return 'text-blue-400';
    case 'AI_OPTIMIZING': return 'text-purple-400 animate-pulse';
    default: return 'text-amber-400';
  }
};

const getPublicStatus = (status: string) => {
  if (status === 'AI_OPTIMIZING') return 'RE-EVALUATING';
  return status.replace('_', ' ');
};

export default function PidsBoard() {
  const [flights, setFlights] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await fetch("/api/flights");
      const data = await res.json();
      setFlights(data);
    } catch (error) {
      console.error("Failed to fetch flights for PIDS:", error);
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans selection:bg-amber-500/30">
      {/* PIDS Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mb-12 border-b border-white/10 pb-8">
        <div className="flex items-center gap-6 mb-6 md:mb-0">
          <div className="p-4 bg-amber-500 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            <Plane className="w-8 h-8 text-slate-950 rotate-45" />
          </div>
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">SkyWOW Departures</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] mt-1">Terminal 1 • Global Tactical Hub</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8 bg-white/5 px-8 py-4 rounded-[2rem] border border-white/5 shadow-2xl">
           <div className="text-right">
              <div className="text-[10px] font-mono text-amber-500/50 uppercase tracking-widest mb-1">Local Time</div>
              <div className="text-3xl font-black font-mono tracking-tighter italic">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
           </div>
           <div className="w-px h-10 bg-white/10" />
           <div className="text-right">
              <div className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest mb-1">Status</div>
              <div className="text-xs font-black text-white uppercase tracking-widest">System Online</div>
           </div>
        </div>
      </header>

      {/* The Big Board */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-4 px-8 mb-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
          <div className="col-span-2">Flight</div>
          <div className="col-span-3">Destination</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-2 text-right">Gate</div>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {flights.map((f: any) => (
              <motion.div 
                key={f.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-12 gap-4 items-center bg-white/[0.03] hover:bg-white/[0.06] p-8 rounded-3xl border border-white/5 transition-all group"
              >
                {/* Flight ID */}
                <div className="col-span-2 flex items-center gap-4">
                  <div className="text-2xl font-black text-white italic tracking-tighter group-hover:text-amber-400 transition-colors">
                    {f.number}
                  </div>
                </div>

                {/* Destination */}
                <div className="col-span-3 flex items-center gap-3">
                   <MapPin className="w-4 h-4 text-slate-600" />
                   <span className="text-lg font-bold text-slate-300 tracking-tight uppercase">{f.destination}</span>
                </div>

                {/* Time */}
                <div className="col-span-2 flex items-center gap-3">
                   <Clock className="w-4 h-4 text-slate-600" />
                   <span className="text-xl font-mono font-black italic text-slate-200">
                    {new Date(f.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                </div>

                {/* Status */}
                <div className={`col-span-3 font-black text-sm tracking-[0.15em] uppercase italic ${getStatusColor(f.status)}`}>
                  {getPublicStatus(f.status)}
                </div>

                {/* Gate with Flip Effect */}
                <div className="col-span-2 text-right">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={f.gate?.name || '---'}
                      initial={{ rotateX: 90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      exit={{ rotateX: -90, opacity: 0 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="inline-block bg-slate-900 border border-white/10 px-6 py-3 rounded-2xl shadow-xl"
                    >
                      <span className="text-2xl font-black text-amber-500 font-mono tracking-tighter">
                        {f.gate?.name || '---'}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Board Footer */}
        <div className="mt-12 flex items-center justify-between px-8">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                 <div className="w-2 h-2 rounded-full bg-emerald-500" /> Auto-Sync Active
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                 Public Display Node: PIDS-01
              </div>
           </div>
           
           <div className="flex items-center gap-2 text-amber-500/40 text-[10px] font-black italic uppercase tracking-widest">
              Please observe security protocols <ArrowRight className="w-3 h-3" />
           </div>
        </div>
      </main>

      {/* Decorative Board Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[-1]">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>
    </div>
  );
}
