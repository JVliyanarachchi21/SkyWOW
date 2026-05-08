"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2, ArrowRight, Lock, Key } from "lucide-react";

export default function HomeLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("UPLINK DENIED");
        setLoading(false);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("SYSTEM TIMEOUT");
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[340px] bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] shadow-2xl group relative overflow-hidden"
    >
      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-scanline opacity-[0.03] z-0" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.4em]">Node Access</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="IDENTITY"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-[11px] focus:outline-none focus:border-cyan-500/40 transition-all font-mono placeholder:text-slate-600 uppercase tracking-widest"
            />
          </div>

          <div className="relative">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="ENCRYPTION"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-[11px] focus:outline-none focus:border-cyan-500/40 transition-all font-mono placeholder:text-slate-600 uppercase tracking-widest"
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[8px] font-black text-red-400 uppercase tracking-widest flex items-center gap-2 px-1 py-1"
            >
              <ShieldCheck className="w-3 h-3" />
              {error}
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white/5 border border-white/10 hover:bg-cyan-500 hover:border-cyan-400 hover:text-slate-950 text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-3 group/btn mt-4"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
              <>
                Engage Uplink
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-[7px] font-mono text-slate-700 text-center uppercase tracking-[0.3em]">
          End-to-End Encrypted Terminal
        </p>
      </div>
    </motion.div>
  );
}
