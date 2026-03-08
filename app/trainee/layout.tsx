"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BedDouble, 
  Wrench, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Megaphone,
  ArrowRightLeft
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { href: "/trainee", icon: User, label: "Profile" },
  { href: "/trainee/maintenance", icon: Wrench, label: "Maintenance" },
];

export default function TraineeLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-200">
      
      {/* Top Header Full Width */}
      <header className="h-16 bg-white border-b border-slate-200 shrink-0 flex items-center justify-between px-4 sm:px-6 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSidebar}
            className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 shrink-0">
              <Image 
                src="/EAU-logo.png" 
                alt="EAU Logo" 
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-slate-900 text-lg hidden sm:block tracking-tight">EAU-DMS</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification Button */}
          <div className="relative group">
            <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-green-600 transition-all relative">
              <Megaphone className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            
            {/* Simple Hover Dropdown for Announcements */}
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-4 translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm">Announcements</h3>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">New</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                  <p className="text-xs font-bold text-slate-800 mb-1">Water Supply Maintenance</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Alpha Block water will be shut off on Saturday from 10 AM to 2 PM.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                  <p className="text-xs font-bold text-slate-800 mb-1">New Canteen Hours</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">The main canteen will now remain open until 10 PM daily.</p>
                </div>
              </div>
              <button className="w-full mt-4 py-2 text-[11px] font-bold text-slate-400 hover:text-green-600 transition-colors text-center border-t border-slate-50 pt-3">
                View All Notifications
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-100">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 leading-tight">Nahom Tesfaye</p>
              <p className="text-xs text-slate-500 leading-tight">EAU/2024/0001</p>
            </div>
            <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-200 relative shrink-0">
              <div className="absolute inset-0 bg-orange-100">
                <Image 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nahom&backgroundColor=ffdfbf" 
                  alt="Avatar" 
                  fill 
                  className="object-cover"
                />
              </div>
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
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
          initial={{ x: -260 }}
          animate={{ x: isSidebarOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 0 : -260) }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed lg:static inset-y-0 left-0 z-40 w-[240px] bg-white border-r border-slate-100 flex flex-col h-full shrink-0 pt-6"
        >
          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-4 space-y-1.5 scrollbar-hide">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/trainee" && pathname.startsWith(`${item.href}/`)) || (item.href === "/trainee" && pathname === "/trainee");
              
              return (
                <Link key={item.label} href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                      isActive 
                        ? "bg-green-600 text-white" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* User Footer Logout */}
          <div className="p-4 mt-auto">
            <button className="flex items-center justify-center gap-2 px-3 py-2.5 w-full rounded-lg bg-slate-50 text-slate-700 font-medium text-sm hover:bg-slate-100 transition-colors">
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Log Out</span>
            </button>
          </div>
        </motion.aside>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50/30 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
