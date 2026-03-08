"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  MapPin, 
  Building2, 
  Globe,
  UserPlus,
  ArrowUpDown
} from "lucide-react";

const students = [
  { id: "EAU/24/0001", name: "Nahom Tesfaye", dept: "Pilot", nationality: "Ethiopia", building: "Alpha Block", room: "204", status: "Assigned" },
  { id: "EAU/24/0042", name: "Abebe Kebede", dept: "AMT", nationality: "Ethiopia", building: "Beta Complex", room: "102", status: "Assigned" },
  { id: "EAU/24/0115", name: "John Doe", dept: "Cabin Crew", nationality: "Kenya", building: "Alpha Block", room: "Pending", status: "Unassigned" },
  { id: "EAU/24/0203", name: "Sarah Smith", dept: "ATC", nationality: "South Africa", building: "Gamma Wing", room: "305", status: "Assigned" },
  { id: "EAU/24/0512", name: "Chen Wei", dept: "Pilot", nationality: "China", building: "Beta Complex", room: "Pending", status: "Unassigned" },
  { id: "EAU/24/0890", name: "Musa Hassan", dept: "AMT", nationality: "Nigeria", building: "Alpha Block", room: "401", status: "Assigned" },
];

export default function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
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
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage trainee housing details and assignments.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 self-start">
          <UserPlus className="w-4 h-4" />
          Add Trainee
        </button>
      </div>

      {/* Filters and Search */}
      <motion.div variants={item} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, ID or nationality..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-100 transition-all">
            <Filter className="w-3.5 h-3.5" />
            Filters
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-100 transition-all">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort
          </button>
        </div>
      </motion.div>

      {/* Student Table */}
      <motion.div variants={item} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trainee</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Dept</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nationality</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight">{student.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200 uppercase tracking-wider">
                      {student.dept}
                    </span>
                  </td>
                  <td className="px-6 py-4 group">
                    <div className="flex items-center gap-1.5 text-slate-600">
                       <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-green-500 transition-colors" />
                       <span className="text-xs font-medium">{student.nationality}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-xs">
                         <Building2 className="w-3.5 h-3.5 text-slate-400" />
                         {student.building}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                         <MapPin className="w-3.5 h-3.5 text-slate-300" />
                         Room {student.room}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      student.status === "Assigned" 
                        ? "bg-green-50 text-green-700 border-green-100" 
                        : "bg-amber-50 text-amber-700 border-amber-100"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-200/50 rounded-lg text-slate-400 hover:text-slate-900 transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Showing 6 of 1,248 Trainees</p>
           <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500 hover:text-green-600 transition-colors">Prev</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500 hover:text-green-600 transition-colors">Next</button>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
