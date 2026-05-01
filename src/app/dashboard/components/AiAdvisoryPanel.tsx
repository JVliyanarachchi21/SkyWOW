"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, CheckCircle2, AlertCircle, ArrowRight, Clock, Zap, History, ShieldCheck } from "lucide-react";

interface Suggestion {
  id: string;
  flightId: string;
  flight: {
    number: string;
    gate: { name: string, terminal: string } | null;
  };
  oldGateId: string | null;
  newGateId: string;
  newGateName: string;
  newGate: {
    name: string;
    terminal: string;
    size: string;
  };
  reason: string;
  expiresAt: string;
}

export default function AiAdvisoryPanel() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [lastScan, setLastScan] = useState<string>("Initializing...");

  const fetchSuggestions = async () => {
    try {
      const res = await fetch("/api/ai/suggestions");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSuggestions(data);
        setLastScan(new Date().toLocaleTimeString());
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    }
  };

  const triggerOptimize = async () => {
    setIsEvaluating(true);
    try {
      await fetch("/api/ai/optimize", { method: "POST" });
      await fetchSuggestions();
    } catch (error) {
      console.error("Optimization failed:", error);
    } finally {
      setIsEvaluating(false);
    }
  };

  const approveSuggestion = async (id: string) => {
    try {
      await fetch("/api/ai/suggestions", {
        method: "POST",
        body: JSON.stringify({ suggestionId: id, action: "APPROVE" }),
      });
      fetchSuggestions();
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
    const interval = setInterval(fetchSuggestions, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="glass rounded-[2rem] p-8 border border-purple-500/10 shadow-2xl shadow-purple-500/5 relative overflow-hidden group">
      {/* Background Neural Animation */}
      <AnimatePresence>
        {isEvaluating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent animate-pulse pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <header className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black flex items-center gap-2 text-purple-400 uppercase tracking-tighter">
              <Cpu className={`w-5 h-5 ${isEvaluating ? "animate-spin" : ""}`} />
              AI Dispatcher
            </h2>
            <div className={`text-[9px] px-3 py-1 rounded-full font-mono uppercase tracking-widest transition-all duration-500 ${
              suggestions.length > 0 ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            }`}>
              {isEvaluating ? "SCANNING..." : suggestions.length > 0 ? "ACTION REQUIRED" : "STABLE"}
            </div>
          </div>
          <div className="flex items-center gap-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
             <div className="flex items-center gap-1.5">
                <History className="w-3 h-3" />
                Last Scan: <span className="text-slate-300">{lastScan}</span>
             </div>
          </div>
        </header>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {suggestions.length === 0 ? (
              <motion.div 
                key="stable"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-center group-hover:bg-white/[0.04] transition-colors"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-500/30 mx-auto mb-4" />
                <p className="text-xs text-slate-400 font-medium leading-relaxed px-4">
                   System optimization current. All resources aligned with flight hierarchy.
                </p>
                <div className="flex flex-col gap-3 mt-8">
                  <button 
                    onClick={triggerOptimize}
                    className="w-full py-3 bg-white/5 border border-white/10 text-[10px] text-purple-400 hover:text-purple-300 font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-purple-500/10 rounded-xl"
                  >
                    <Zap className="w-3.5 h-3.5" /> Re-Scan Brain
                  </button>
                  <div className="relative group/crisis">
                    <button 
                      onClick={async () => {
                        if (confirm("WARNING: This will simulate a critical system failure. Continue?")) {
                          await fetch("/api/ai/simulate-conflict", { method: "POST" });
                          await triggerOptimize();
                        }
                      }}
                      className="w-full py-3 bg-red-500/5 border border-red-500/10 text-[10px] text-red-500/60 hover:text-red-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-red-500/10 rounded-xl"
                    >
                      <AlertCircle className="w-3.5 h-3.5" /> Inject Crisis
                    </button>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-red-950 border border-red-500/30 text-red-400 text-[8px] rounded-lg opacity-0 group-hover/crisis:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest font-mono whitespace-nowrap z-50 shadow-xl">
                       Simulation: Escalates SW911 to Emergency
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              suggestions.map((s) => (
                <SuggestionCard 
                  key={s.id} 
                  suggestion={s} 
                  onApprove={() => approveSuggestion(s.id)} 
                />
              ))
            )}
          </AnimatePresence>
        </div>

        {suggestions.length > 0 && (
          <div className="mt-8 pt-8 border-t border-white/10 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 border border-white/10 rounded-full text-[8px] font-mono text-slate-500 uppercase tracking-[0.2em]">
               System Recommendation
            </div>
            <button 
              disabled={loading}
              onClick={() => suggestions.forEach(s => approveSuggestion(s.id))}
              className="w-full py-5 bg-purple-500 text-slate-950 font-black rounded-2xl hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-purple-500/20 uppercase tracking-tight flex items-center justify-center gap-3 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]" />
              Commit AI Decisions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function SuggestionCard({ suggestion, onApprove }: { suggestion: Suggestion, onApprove: () => void }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const expires = new Date(suggestion.expiresAt).getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, Math.floor((expires - now) / 1000));
      setTimeLeft(diff);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [suggestion.expiresAt]);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group relative overflow-hidden shadow-xl"
    >
      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
         <ShieldCheck className="w-4 h-4 text-purple-400" />
      </div>

      {/* Timer Progress Bar */}
      <motion.div 
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: timeLeft, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
      />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-black text-xl text-purple-400 italic">
            {suggestion.flight.number}
          </div>
          <div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-1">Causality: Impact Displacment</p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-400 line-through decoration-red-500/50">
                {suggestion.flight.gate?.name || "UNASSIGNED"}
              </span>
              <ArrowRight className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-black text-white px-2 py-1 bg-purple-500/10 rounded-lg">
                {suggestion.newGate.name}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/[0.02] rounded-xl p-3 border border-white/5">
           <p className="text-[10px] text-slate-400 leading-relaxed italic">
              "{suggestion.reason}"
           </p>
        </div>

        <div className="flex items-center justify-between gap-4 mt-2">
           <div className={`flex items-center gap-2 text-xs font-mono font-bold ${timeLeft <= 3 ? "text-red-500 animate-pulse" : "text-purple-400"}`}>
             <Clock className="w-4 h-4" />
             00:{timeLeft.toString().padStart(2, '0')}
           </div>
           <button 
             onClick={onApprove}
             className="flex-1 py-3 bg-white/5 border border-white/10 hover:bg-purple-500 hover:text-slate-950 text-white text-[10px] font-black rounded-xl transition-all uppercase tracking-widest shadow-lg"
           >
             Execute Dispatch
           </button>
        </div>
      </div>
    </motion.div>
  );
}
