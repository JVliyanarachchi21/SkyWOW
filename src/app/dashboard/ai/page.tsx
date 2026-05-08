"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Send, 
  Terminal, 
  Activity, 
  ShieldCheck, 
  Zap, 
  MessageSquare,
  Bot,
  User,
  Sparkles,
  Command,
  ArrowRight
} from "lucide-react";
import { useSession } from "next-auth/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function AiAssistant() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Aero-Mind Intelligence online. Operational authority confirmed for ${session?.user?.name || "Authorized Personnel"}. Standing by for tactical directives.`,
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: data.timestamp,
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Chat failed:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-8 relative">
      {/* Background Neural Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-2xl">
              <Cpu className="w-8 h-8 text-purple-400" />
            </div>
            Aero-Mind <span className="text-purple-400">Tactical</span>
          </h1>
          <div className="flex items-center gap-3 mt-2">
             <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/20">
                <Activity className="w-3 h-3" /> Neural Core Stable
             </div>
             <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Latent Logic Engine v4.2.0-TAC
             </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Identity Hash</span>
              <span className="text-xs font-bold text-white tracking-tighter uppercase opacity-80">{session?.user?.id?.substring(0, 8) || "GUEST-01"}</span>
           </div>
           <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-600 flex items-center justify-center text-xs font-black text-white shadow-lg">
              {session?.user?.name?.charAt(0)}
           </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-0">
        
        {/* Chat Main Window */}
        <section className="lg:col-span-3 glass rounded-[2.5rem] border border-white/5 flex flex-col overflow-hidden relative group/chat">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] to-transparent pointer-events-none" />
           
           {/* Messages Area */}
           <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {messages.map((m) => (
                  <motion.div 
                    key={m.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex items-start gap-6 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                      m.role === 'assistant' 
                        ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400' 
                        : 'bg-white/5 border border-white/10 text-slate-400'
                    }`}>
                      {m.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>
                    
                    <div className={`max-w-[80%] flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : ''}`}>
                       <div className={`p-5 rounded-[2rem] border ${
                         m.role === 'assistant' 
                           ? 'bg-white/5 border-white/10 text-slate-200' 
                           : 'bg-purple-500/10 border-purple-500/20 text-purple-100'
                       } shadow-xl backdrop-blur-md relative overflow-hidden group`}>
                          {m.role === 'assistant' && (
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                               <Sparkles className="w-12 h-12 text-white" />
                            </div>
                          )}
                          <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium tracking-tight">
                            {m.content}
                          </p>
                       </div>
                       <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest px-2">
                          {new Date(m.timestamp).toLocaleTimeString()} • {m.role.toUpperCase()}
                       </span>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 text-purple-400/50"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex items-center justify-center">
                       <Cpu className="w-5 h-5 animate-spin" />
                    </div>
                    <div className="flex gap-1.5">
                       <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                       <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                       <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
           </div>

           {/* Input Area */}
           <div className="p-8 border-t border-white/5 bg-white/[0.01]">
              <form onSubmit={handleSend} className="relative">
                 <input 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   placeholder="Enter tactical command or query system state..."
                   className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-8 pr-32 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm font-medium"
                 />
                 <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                       <Command className="w-3 h-3" /> ENTER
                    </div>
                    <button 
                      type="submit"
                      disabled={!input.trim() || isTyping}
                      className="p-3 bg-purple-500 text-slate-950 rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:grayscale"
                    >
                       <Send className="w-5 h-5" />
                    </button>
                 </div>
              </form>
           </div>
        </section>

        {/* Tactical Suggestions & Side Stats */}
        <aside className="space-y-8">
           <section className="glass rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Terminal className="w-20 h-20 text-white" />
              </div>
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Suggested Directives
              </h3>
              <div className="space-y-3">
                 <TacticalButton icon={Activity} label="Analyze Conflicts" onClick={() => setInput("Identify current emergency conflicts")} />
                 <TacticalButton icon={Activity} label="Gate Summary" onClick={() => setInput("What is the terminal occupancy status?")} />
                 <TacticalButton icon={Activity} label="System Pulse" onClick={() => setInput("Show tactical system summary")} />
              </div>
           </section>

           <section className="glass rounded-[2rem] p-8 border border-purple-500/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
              <h3 className="text-xs font-black text-purple-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                <Zap className="w-4 h-4" />
                Intelligence Pulse
              </h3>
              <div className="space-y-6 relative z-10">
                 <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-mono text-slate-500 uppercase">Context Memory</span>
                       <span className="text-2xl font-black text-white italic tracking-tighter">84.2 GB</span>
                    </div>
                    <div className="w-16 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                       <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                    </div>
                 </div>
                 <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                       <span>Inference Latency</span>
                       <span>12ms</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "15%" }}
                        className="h-full bg-purple-500"
                       />
                    </div>
                 </div>
              </div>
           </section>
        </aside>

      </div>
    </div>
  );
}

function TacticalButton({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 rounded-2xl transition-all group text-left"
    >
       <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 transition-colors">
          <Icon className="w-4 h-4" />
       </div>
       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors flex-1">{label}</span>
       <ArrowRight className="w-4 h-4 text-slate-700 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}
