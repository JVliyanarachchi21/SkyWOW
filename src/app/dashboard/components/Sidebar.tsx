"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  LayoutDashboard, 
  Plane, 
  Map, 
  Users, 
  Settings, 
  Cpu, 
  Radio
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Flight Board", icon: Plane, href: "/dashboard/flights" },
  { name: "Gate Maps", icon: Map, href: "/dashboard/gates" },
  { name: "Staff & Crew", icon: Users, href: "/dashboard/staff" },
  { name: "AI Assistant", icon: Cpu, href: "/dashboard/ai" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 h-screen glass border-r border-white/5 flex flex-col sticky top-0">
      <div className="p-8 border-b border-white/5 bg-white/[0.01]">
        <Link href="/" className="flex items-center gap-2 group mb-6">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Radio className="w-5 h-5 text-slate-950" />
          </div>
          <span className="text-xl font-bold tracking-tighter">SKY<span className="text-cyan-400">WOW</span></span>
        </Link>

        {/* User Identity Card */}
        {session?.user && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
              {session.user.name?.charAt(0)}
            </div>
            <div className="overflow-hidden">
               <div className="text-[10px] font-black text-white truncate tracking-tight">{session.user.name}</div>
               <div className="text-[8px] font-mono text-cyan-500 uppercase tracking-widest">{(session.user as any).role}</div>
            </div>
          </motion.div>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : "group-hover:text-cyan-400"} transition-colors`} />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <motion.div 
                  layoutId="active"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">System Config</span>
        </button>
        <button 
          onClick={() => {
             import('next-auth/react').then(m => m.signOut({ callbackUrl: '/login' }));
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-white hover:bg-red-500/10 rounded-xl transition-all group"
        >
          <Radio className="w-5 h-5 group-hover:animate-pulse" />
          <span className="font-medium">Terminate Session</span>
        </button>
      </div>
    </aside>
  );
}
