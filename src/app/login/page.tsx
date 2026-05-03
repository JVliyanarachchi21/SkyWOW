"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plane, ShieldCheck, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        setError("Invalid credentials. Access denied.");
        setLoading(false);
      } else {
        // Success! Force a refresh to ensure middleware picks up the new session
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 selection:bg-cyan-500/30">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass rounded-[2.5rem] border border-white/5 p-10 shadow-2xl backdrop-blur-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-20 h-20 bg-cyan-500 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)] mb-6">
              <Plane className="w-10 h-10 text-slate-950 rotate-45" />
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase">SkyWOW Portal</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] mt-2">Secure Tactical Node • V2.4</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">Identity (Email)</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-mono text-sm"
                placeholder="janithi@skywow.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">Encryption Key (Password)</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-mono text-sm"
                placeholder="••••••••••••"
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center gap-3"
              >
                <ShieldCheck className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center gap-3 group"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Engage Uplink
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
             <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                Authorized Personnel Only • IP Logged
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
