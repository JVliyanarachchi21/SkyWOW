"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Clock, 
  MapPin, 
  Heart, 
  TrendingUp, 
  Search,
  Filter,
  MoreVertical,
  Navigation,
  CheckCircle2,
  X
} from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: string;
  assignment: string;
  shiftStart: string;
  efficiency: number;
  fatigue: number;
  heartRate: number;
  skills: string[];
}

export default function StaffCrewHub() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/staff");
      const data = await res.json();
      setStaff(data);
    } catch (error) {
      console.error("Staff fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
    const interval = setInterval(fetchStaff, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRedeploy = async (staffId: string, newAssignment: string) => {
    try {
      await fetch("/api/staff", {
        method: "POST",
        body: JSON.stringify({ staffId, newAssignment }),
      });
      fetchStaff();
      setSelectedStaff(null);
    } catch (error) {
      console.error("Redeploy failed:", error);
    }
  };

  const filteredStaff = staff.filter(s => filter === "ALL" || s.role === filter);

  return (
    <div className="space-y-10 pb-20">
      {/* Tactical Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic flex items-center gap-4">
             <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl">
                <Users className="w-8 h-8 text-cyan-400" />
             </div>
             Crew Deployment <span className="text-cyan-400">Hub</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em] mt-2 ml-1">Bio-Metric Monitoring • Active Personnel: {staff.length}</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden lg:flex gap-8 px-8 py-4 bg-white/[0.02] border border-white/5 rounded-[2rem]">
              <GlobalStat label="AVG Efficiency" val="94%" color="text-emerald-500" />
              <div className="w-px h-10 bg-white/5" />
              <GlobalStat label="Global Fatigue" val="22%" color="text-amber-500" />
              <div className="w-px h-10 bg-white/5" />
              <GlobalStat label="Deployed" val={staff.filter(s => s.status === 'ACTIVE').length} color="text-cyan-500" />
           </div>
        </div>
      </header>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              placeholder="Search by name, role or assignment..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
         </div>
         <div className="flex items-center gap-3">
            <FilterButton active={filter === "ALL"} label="All Personnel" onClick={() => setFilter("ALL")} />
            <FilterButton active={filter === "ADMIN"} label="Command" onClick={() => setFilter("ADMIN")} />
            <FilterButton active={filter === "GROUND_CREW"} label="Ground Ops" onClick={() => setFilter("GROUND_CREW")} />
         </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
         <AnimatePresence mode="popLayout">
            {filteredStaff.map((member) => (
              <StaffCard 
                key={member.id} 
                member={member} 
                onRedeploy={() => setSelectedStaff(member)}
              />
            ))}
         </AnimatePresence>
      </div>

      {/* Re-Deploy Modal */}
      <AnimatePresence>
         {selectedStaff && (
           <ReDeployModal 
             member={selectedStaff} 
             onClose={() => setSelectedStaff(null)} 
             onConfirm={handleRedeploy}
           />
         )}
      </AnimatePresence>
    </div>
  );
}

function ReDeployModal({ member, onClose, onConfirm }: { member: StaffMember, onClose: () => void, onConfirm: (id: string, assignment: string) => void }) {
  const assignments = ["Gate A101", "Gate B202", "Gate C303", "Terminal 1 Main", "Runway Control", "VIP Lounge"];
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         onClick={onClose}
         className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
       />
       <motion.div 
         initial={{ opacity: 0, scale: 0.9, y: 20 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         exit={{ opacity: 0, scale: 0.9, y: 20 }}
         className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl"
       >
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
             <div>
                <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">Re-Deploy Personnel</h2>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Assigning {member.name}</p>
             </div>
             <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-500" />
             </button>
          </div>
          
          <div className="p-8 space-y-4">
             {assignments.map((assignment) => (
               <button 
                 key={assignment}
                 onClick={() => onConfirm(member.id, assignment)}
                 className="w-full p-5 bg-white/[0.02] border border-white/10 rounded-2xl flex items-center justify-between hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all group"
               >
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-white/5 rounded-lg group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <MapPin className="w-4 h-4" />
                     </div>
                     <span className="text-sm font-bold text-slate-300 group-hover:text-white">{assignment}</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
               </button>
             ))}
          </div>
       </motion.div>
    </div>
  );
}

function StaffCard({ member, onRedeploy }: { member: StaffMember, onRedeploy: () => void }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 shadow-2xl"
    >
       <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <Activity className="w-20 h-20 text-white" />
       </div>

       {/* Biometric Header */}
       <div className="flex items-start justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
             <div className="relative">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center overflow-hidden">
                   <span className="text-2xl font-black text-white italic">{member.name.charAt(0)}</span>
                </div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-[#020617] flex items-center justify-center ${
                   member.status === 'ACTIVE' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500'
                }`} />
             </div>
             <div>
                <h3 className="text-lg font-black text-white tracking-tighter uppercase italic">{member.name}</h3>
                <span className="text-[9px] font-mono text-cyan-500 uppercase tracking-[0.2em]">{member.role.replace("_", " ")}</span>
             </div>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
             <MoreVertical className="w-5 h-5 text-slate-500" />
          </button>
       </div>

       {/* Telemetry Grid */}
       <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
             <div className="flex items-center gap-2 mb-2">
                <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Pulse</span>
             </div>
             <div className="text-xl font-black text-white tracking-tighter">{member.heartRate} <span className="text-[10px] text-slate-500">BPM</span></div>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
             <div className="flex items-center gap-2 mb-2">
                <Activity className="w-3.5 h-3.5 text-cyan-500" />
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Efficiency</span>
             </div>
             <div className="text-xl font-black text-white tracking-tighter">{member.efficiency}%</div>
          </div>
       </div>

       {/* Deployment Status */}
       <div className="space-y-4 mb-8 relative z-10">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
             <span>Shift Progress</span>
             <span>{member.fatigue}% Fatigue</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${member.fatigue}%` }}
               className={`h-full rounded-full ${member.fatigue > 35 ? 'bg-amber-500' : 'bg-cyan-500'}`}
             />
          </div>
          <div className="flex items-center gap-3 text-slate-400">
             <MapPin className="w-4 h-4 text-cyan-500/50" />
             <span className="text-[10px] font-bold uppercase tracking-tight">{member.assignment}</span>
          </div>
       </div>

       {/* Tactical Action */}
       <div className="flex gap-3 relative z-10">
          <button 
            onClick={onRedeploy}
            className="flex-1 py-3 bg-white/5 border border-white/10 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-cyan-500/0 hover:shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
             <Navigation className="w-3.5 h-3.5" />
             Re-Deploy
          </button>
       </div>
    </motion.div>
  );
}

function GlobalStat({ label, val, color }: { label: string, val: string | number, color: string }) {
  return (
    <div className="flex flex-col gap-1">
       <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{label}</span>
       <span className={`text-2xl font-black italic tracking-tighter ${color}`}>{val}</span>
    </div>
  );
}

function FilterButton({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
        active 
          ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20" 
          : "bg-white/5 text-slate-500 hover:bg-white/10 border border-white/10"
      }`}
    >
       {label}
    </button>
  );
}
