"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LayoutDashboard, Users, Building2, Wrench, BarChart3, Bell, Settings, Menu, Search, LogOut, UserCheck } from "lucide-react";
const navItems = [
  { href: "/proctor", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/proctor/students", icon: Users, label: "Trainees" },
  { href: "/proctor/dorms", icon: Building2, label: "Dormitory Management" },
  { href: "/proctor/assignments", icon: UserCheck, label: "Dorm Assignments" },
  { href: "/proctor/maintenance", icon: Wrench, label: "Maintenance Requests" },
  { href: "/proctor/analysis", icon: BarChart3, label: "Analysis" },
  { href: "/proctor/notifications", icon: Bell, label: "Notifications" },
  { href: "/proctor/settings", icon: Settings, label: "Profile / Settings" },
];

export default function ProctorLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      
      {/* Top Header Full Width */}
      <header className="h-20 bg-slate-900 border-b border-slate-800 shrink-0 flex items-center justify-between px-4 sm:px-8 z-30 shadow-2xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 -ml-2 rounded-xl text-slate-400 hover:bg-slate-800 lg:hidden transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 shrink-0 bg-white p-1 rounded-xl shadow-inner">
              <Image 
                src="/EAU-logo.png" 
                alt="EAU Logo" 
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-white text-xl leading-none tracking-tighter">EAU-DMS</span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Proctor Control Center</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center relative mr-2 group">
            <Search className="w-4 h-4 absolute left-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search trainees, buildings, rooms..." 
              className="pl-11 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-80 backdrop-blur-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Button */}
            <button className="p-2.5 rounded-2xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all relative border border-slate-700/50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-slate-900 animate-pulse" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-4 pl-6 border-l border-slate-700/50">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white leading-tight">Capt. Proctor Admin</p>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest leading-tight mt-1">Operations Head</p>
              </div>
              <button className="h-12 w-12 overflow-hidden rounded-2xl border-2 border-slate-700 hover:border-blue-500 transition-all relative shrink-0 shadow-lg group">
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Users className="w-6 h-6 text-slate-400 group-hover:text-blue-400" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area Container */}
      <div className="flex-1 flex overflow-hidden relative z-0">
        
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: isSidebarOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 0 : -280) }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-white border-r border-slate-200 flex flex-col h-full shrink-0 shadow-xl"
        >
          {/* Sidebar Header Space (matching header height minus some padding) */}
          <div className="h-6 shrink-0" />

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-4 space-y-2 scrollbar-none">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/proctor" && pathname.startsWith(`${item.href}/`)) || (item.href === "/proctor" && pathname === "/proctor");
              
              return (
                <Link key={item.label} href={item.href}>
                  <div
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group border ${
                      isActive 
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-200" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600 border-transparent"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                    <span className={`font-semibold text-sm tracking-wide ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer Logout */}
          <div className="p-6 mt-auto border-t border-slate-100">
            <button className="flex items-center justify-center gap-3 px-4 py-4 w-full rounded-2xl bg-slate-50 text-slate-500 font-bold text-sm hover:bg-red-50 hover:text-red-600 hover:border hover:border-red-100 transition-all group">
              <LogOut className="w-5 h-5 shrink-0 transition-transform group-hover:-translate-x-1" />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.aside>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 sm:p-8 lg:p-10 relative">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          
          <div className="max-w-7xl mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
