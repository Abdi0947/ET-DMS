"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Search,
  ChevronRight,
  MessageSquare,
  Building2
} from "lucide-react";

const requests = [
  { id: "REQ-001", student: "Nahom Tesfaye", room: "A-204", subject: "Leaking Faucet", category: "Plumbing", urgency: "High", status: "Pending", date: "2024-03-05" },
  { id: "REQ-002", student: "Abebe Kebede", room: "B-102", subject: "Light Flickering", category: "Electrical", urgency: "Normal", status: "In Progress", date: "2024-03-04" },
  { id: "REQ-003", student: "John Doe", room: "A-Pending", subject: "Broken Drawer", category: "Furniture", urgency: "Low", status: "Resolved", date: "2024-03-02" },
];

export default function ProctorMaintenance() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Maintenance Management</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor and update the status of facility repair requests.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg border border-orange-100">
             <AlertTriangle className="w-4 h-4" />
             <span className="text-xs font-bold uppercase tracking-wider">12 Alerts</span>
           </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Pending", count: 8, color: "text-amber-600 bg-amber-50 border-amber-100", icon: Clock },
          { label: "In Progress", count: 12, color: "text-blue-600 bg-blue-50 border-blue-100", icon: Wrench },
          { label: "Resolved Today", count: 4, color: "text-green-600 bg-green-50 border-green-100", icon: CheckCircle2 },
        ].map((s, i) => (
          <motion.div key={i} variants={item} className={`p-6 rounded-3xl border flex items-center justify-between ${s.color}`}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">{s.label} Requests</p>
              <p className="text-3xl font-black">{s.count}</p>
            </div>
            <s.icon className="w-8 h-8 opacity-40 shrink-0" />
          </motion.div>
        ))}
      </div>

      {/* Filter Bar */}
      <motion.div variants={item} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by student or ID..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
           <button className="px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-100 transition-all flex items-center gap-2">
             <Filter className="w-3.5 h-3.5" />
             Categories
           </button>
        </div>
      </motion.div>

      {/* Request List */}
      <div className="space-y-4">
        {requests.map((req, idx) => (
          <motion.div 
            key={idx}
            variants={item}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-green-200 transition-all group relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  req.status === "Pending" ? "bg-amber-50 text-amber-600" :
                  req.status === "In Progress" ? "bg-blue-50 text-blue-600" :
                  "bg-green-50 text-green-600"
                }`}>
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                   <div className="flex items-center gap-2 mb-1">
                     <h3 className="font-bold text-slate-900">{req.subject}</h3>
                     <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                       req.urgency === "High" ? "bg-red-50 text-red-700 border-red-100" :
                       req.urgency === "Normal" ? "bg-slate-100 text-slate-600 border-slate-200" :
                       "bg-blue-50 text-blue-700 border-blue-100"
                     }`}>
                       {req.urgency} Priority
                     </span>
                   </div>
                   <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.date}</span>
                      <span className="flex items-center gap-1 border-l pl-3 border-slate-200"><Building2 className="w-3 h-3" /> {req.room}</span>
                      <span className="hidden sm:inline-block border-l pl-3 border-slate-200 text-green-600">{req.student}</span>
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                 <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">
                   <MessageSquare className="w-5 h-5" />
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-lg">
                   Update Status
                   <ChevronRight className="w-3.5 h-3.5" />
                 </button>
              </div>
            </div>
            
            {/* Status Indicator Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
               req.status === "Pending" ? "bg-amber-500" :
               req.status === "In Progress" ? "bg-blue-500" :
               "bg-green-500"
            }`} />
          </motion.div>
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-center pt-4">
         <button className="px-6 py-2.5 text-xs font-bold text-slate-400 hover:text-green-600 transition-colors">
           Load More Requests
         </button>
      </div>
    </motion.div>
  );
}
