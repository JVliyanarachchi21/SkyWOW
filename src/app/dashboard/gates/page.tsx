"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Map as MapIcon, 
  Info, 
  ShieldAlert, 
  Plane, 
  Users, 
  Zap,
  Navigation,
  Box,
  Compass
} from "lucide-react";

export default function GateMaps() {
  const [gates, setGates] = useState([]);
  const [selectedGate, setSelectedGate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [heatmapMode, setHeatmapMode] = useState(false);

  const fetchGates = async () => {
    try {
      const res = await fetch("/api/gates");
      const data = await res.json();
      setGates(data);
      if (!selectedGate && data.length > 0) {
        const active = data.find((g: any) => g.status === 'EMERGENCY_ONLY') || data.find((g: any) => g.flights.length > 0) || data[0];
        setSelectedGate(active);
      }
    } catch (error) {
      console.error("Failed to fetch gates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGates();
    const interval = setInterval(fetchGates, 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate pressure score for a gate (0-100)
  const getPressureScore = (gate: any) => {
    let score = 0;
    if (gate.flights.length > 0) score += 30;
    if (gate.status === 'EMERGENCY_ONLY') score += 70;
    if (gate.flights.some((f: any) => f.priority === 'EMERGENCY')) score += 50;
    if (gate.flights.some((f: any) => f.priority === 'VIP')) score += 20;
    return Math.min(score, 100);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic flex items-center gap-3">
            <Compass className="w-8 h-8 text-cyan-500" />
            Tactical Terminal Map
          </h1>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.2em] mt-1">Spatial Resource Management • Terminal 1-Alpha</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
           {/* Heatmap Toggle */}
           <button 
            onClick={() => setHeatmapMode(!heatmapMode)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all duration-500 ${
              heatmapMode 
                ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]" 
                : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
            }`}
           >
              <Zap className={`w-4 h-4 ${heatmapMode ? "animate-pulse" : ""}`} />
              <span className="text-[10px] font-black uppercase tracking-widest">Heatmap: {heatmapMode ? "ON" : "OFF"}</span>
           </button>

           <div className="h-10 w-px bg-white/5 hidden md:block" />

           <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono text-slate-400">
                 <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" /> OPEN
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono text-slate-400">
                 <div className="w-2 h-2 rounded-full bg-blue-500" /> OCCUPIED
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono text-slate-400">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> EMERGENCY
              </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 h-[700px]">
        
        {/* Map Area */}
        <div className="xl:col-span-3 glass rounded-[2.5rem] border border-white/5 relative overflow-hidden bg-slate-950/50 flex items-center justify-center">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
           
           {/* Grid Pattern */}
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

           {/* Stylized Terminal SVG */}
           <svg width="100%" height="100%" viewBox="0 0 1000 600" className="relative z-10 p-20">
              {/* Terminal Spine */}
              <motion.path 
                d="M 100,300 L 900,300"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="80"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
              <path 
                d="M 100,300 L 900,300"
                stroke="rgba(34,211,238,0.1)"
                strokeWidth="2"
                strokeDasharray="10 10"
              />

              {/* Gate Nodes */}
              {gates.map((gate: any, i: number) => {
                const x = gate.mapX || 150 + (i % 5) * 175;
                const y = gate.mapY || (i < 5 ? 200 : 400);
                const isEmergency = gate.status === 'EMERGENCY_ONLY';
                const isOccupied = gate.flights.length > 0;
                const isSelected = selectedGate?.id === gate.id;
                const pressure = getPressureScore(gate);

                return (
                  <g key={gate.id} className="cursor-pointer" onClick={() => setSelectedGate(gate)}>
                    {/* Heatmap Aura */}
                    <AnimatePresence>
                      {heatmapMode && (
                        <motion.circle 
                          cx={x} cy={y} 
                          r={pressure > 50 ? "80" : "50"}
                          fill={pressure > 70 ? "rgba(239,68,68,0.2)" : pressure > 30 ? "rgba(245,158,11,0.15)" : "rgba(59,130,246,0.1)"}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 3 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Connection Line */}
                    <motion.line 
                      x1={x} y1={y} x2={x} y2={300}
                      stroke={heatmapMode ? (pressure > 70 ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.1)") : "rgba(255,255,255,0.1)"}
                      strokeWidth={heatmapMode && pressure > 70 ? "3" : "1"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />

                    {/* Node Aura (Standard) */}
                    {!heatmapMode && (
                      <AnimatePresence>
                        {(isEmergency || isSelected) && (
                          <motion.circle 
                            cx={x} cy={y} r="45"
                            fill={isEmergency ? "rgba(239,68,68,0.1)" : "rgba(6,182,212,0.05)"}
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          />
                        )}
                      </AnimatePresence>
                    )}

                    {/* Main Gate Node */}
                    <motion.circle 
                      cx={x} cy={y} r="30"
                      fill={heatmapMode ? (pressure > 70 ? "#ef4444" : pressure > 30 ? "#f59e0b" : "#3b82f6") : (isEmergency ? "#ef4444" : isOccupied ? "#3b82f6" : "#1e293b")}
                      stroke={isSelected ? "#22d3ee" : "rgba(255,255,255,0.1)"}
                      strokeWidth={isSelected ? "3" : "1"}
                      whileHover={{ scale: 1.1 }}
                      className="transition-colors duration-500"
                    />

                    {/* Gate Label */}
                    <text 
                      x={x} y={y + 5}
                      textAnchor="middle"
                      fill={isEmergency || isOccupied ? "#fff" : "#64748b"}
                      className="text-[14px] font-black pointer-events-none font-mono tracking-tighter"
                    >
                      {gate.name}
                    </text>

                    {/* Zone Indicator */}
                    <text 
                      x={x} y={y + 45}
                      textAnchor="middle"
                      fill="#475569"
                      className="text-[8px] font-mono uppercase tracking-widest opacity-50"
                    >
                      {gate.zone}
                    </text>

                    {/* Aircraft Icon if occupied */}
                    {isOccupied && (
                       <motion.g 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                       >
                          <circle cx={x+25} cy={y-25} r="12" fill="#3b82f6" />
                          <text x={x+25} y={y-21} textAnchor="middle" fill="#fff" className="text-[8px] font-black">✈</text>
                       </motion.g>
                    )}
                  </g>
                );
              })}
           </svg>

           {/* Compass Overlay */}
           <div className="absolute bottom-10 left-10 opacity-20 pointer-events-none">
              <Navigation className="w-16 h-16 text-white rotate-45" />
              <div className="text-[10px] font-mono uppercase tracking-[0.4em] mt-2">North Wing / T1-A</div>
           </div>
        </div>

        {/* Info Panel */}
        <aside className="space-y-6">
          <AnimatePresence mode="wait">
            {selectedGate ? (
              <motion.div 
                key={selectedGate.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass rounded-[2rem] p-8 border border-white/5 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                   <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                      <Box className="w-6 h-6 text-cyan-400" />
                   </div>
                   <div className="text-right">
                      <div className="text-3xl font-black text-white italic tracking-tighter">{selectedGate.name}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{selectedGate.terminal}</div>
                   </div>
                </div>

                <div className="space-y-6 flex-1">
                   <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Gate Intelligence</h4>
                      <div className="flex flex-wrap gap-2">
                         <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-slate-300">{selectedGate.type}</span>
                         <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-slate-300">{selectedGate.size} CLASS</span>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                         <Navigation className="w-4 h-4 text-cyan-500/50" />
                         <div>
                            <div className="text-[10px] text-slate-400 font-bold tracking-tight">Est. Taxi Time</div>
                            <div className="text-lg font-black text-white italic tracking-tighter">{selectedGate.taxiTime} MINS</div>
                         </div>
                      </div>
                   </div>

                   {selectedGate.flights.length > 0 ? (
                     <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                           <Plane className="w-12 h-12 text-white rotate-45" />
                        </div>
                        <h4 className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4">Current Aircraft</h4>
                        <div className="text-2xl font-black text-white tracking-tighter mb-1">{selectedGate.flights[0].number}</div>
                        <div className="text-[10px] text-blue-300/60 uppercase tracking-widest font-mono mb-4">{selectedGate.flights[0].airline}</div>
                        
                        <div className="flex items-center gap-2 mt-6">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                           <span className="text-[10px] font-mono text-blue-300 uppercase italic">Status: {selectedGate.flights[0].status}</span>
                        </div>
                     </div>
                   ) : (
                     <div className="p-8 border border-dashed border-white/10 rounded-3xl text-center">
                        <Zap className="w-10 h-10 text-slate-700 mx-auto mb-4 opacity-30" />
                        <p className="text-xs text-slate-500 font-medium">No aircraft currently assigned to this node.</p>
                     </div>
                   )}
                </div>

                <div className="mt-auto pt-8 border-t border-white/5">
                   <button className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 group">
                      <Info className="w-4 h-4 text-cyan-500" />
                      View Full Gate Logs
                   </button>
                </div>
              </motion.div>
            ) : (
              <div className="glass rounded-[2rem] p-8 border border-white/5 h-full flex items-center justify-center text-center">
                 <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Select a node to inspect</p>
              </div>
            )}
          </AnimatePresence>
        </aside>

      </div>
    </div>
  );
}
