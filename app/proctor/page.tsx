"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Building2, 
  UserCheck,
  Plus,
  Plane,
  Calendar,
  Download,
  Activity,
  ChevronRight,
  TrendingUp,
  TrendingDown
} from "lucide-react";

// --- Mock Data ---

const totalTrainees = {
  total: 1420,
  male: 880,
  female: 540,
  trend: "+52 this month",
  up: true
};

const departments = [
  { name: "Pilot", total: 450, male: 320, female: 130, icon: Plane, bg: "bg-blue-50", color: "text-blue-600" },
  { name: "ATC", total: 220, male: 140, female: 80, icon: Activity, bg: "bg-amber-50", color: "text-amber-600" },
  { name: "AMT", total: 370, male: 290, female: 80, icon: Building2, bg: "bg-indigo-50", color: "text-indigo-600" },
  { name: "Cabin Crew", total: 380, male: 130, female: 250, icon: Users, bg: "bg-emerald-50", color: "text-emerald-600" },
];

const ethiopianTrainees = {
  total: 850,
  male: 510,
  female: 340,
  percentage: "60% of total"
};

const bedsStatus = {
  occupied: 1248,
  total: 1420,
  percentage: 88
};

const buildingSpace = [
  { name: "Alpha Block", free: 16, total: 200, type: "Male" },
  { name: "Beta Complex", free: 190, total: 400, type: "Male" },
  { name: "Gamma Wing", free: 26, total: 150, type: "Female" },
  { name: "Delta Station", free: 45, total: 300, type: "Female" },
];

export default function ProctorDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10 pb-12"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            Operational Dashboard
          </h1>
          <p className="text-slate-500 font-medium mt-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Friday, March 6, 2026 | <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Main Control Tower</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4 text-blue-600" />
            Export Monthly Summary
          </button>
        </div>
      </div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Total Trainees */}
        <motion.div variants={item} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:scale-110 transition-transform" />
          <div className="relative z-10">
            <div className="p-3 bg-blue-600 text-white rounded-2xl w-fit mb-6 shadow-lg shadow-blue-200">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Trainees</p>
            <h2 className="text-5xl font-black text-slate-900">{totalTrainees.total}</h2>
            <div className="flex items-center gap-4 mt-6">
              <div className="px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[9px] font-bold text-blue-400 uppercase tracking-tighter mb-0.5">Male</p>
                <p className="text-sm font-black text-blue-700">{totalTrainees.male}</p>
              </div>
              <div className="px-4 py-2 bg-pink-50 rounded-2xl border border-pink-100">
                <p className="text-[9px] font-bold text-pink-400 uppercase tracking-tighter mb-0.5">Female</p>
                <p className="text-sm font-black text-pink-700">{totalTrainees.female}</p>
              </div>
            </div>
            <p className="mt-4 text-[10px] font-bold text-emerald-600 flex items-center gap-1 uppercase tracking-widest">
              <TrendingUp className="w-3 h-3" /> {totalTrainees.trend}
            </p>
          </div>
        </motion.div>

        {/* Ethiopian Trainees */}
        <motion.div variants={item} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 group">
          <div className="relative z-10">
            <div className="p-3 bg-slate-900 text-white rounded-2xl w-fit mb-6">
              <Plane className="w-6 h-6" />
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Ethiopian Trainees</p>
            <h2 className="text-5xl font-black text-slate-900">{ethiopianTrainees.total}</h2>
            <div className="flex items-center gap-4 mt-6">
              <div className="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">Male</p>
                <p className="text-sm font-black text-slate-700">{ethiopianTrainees.male}</p>
              </div>
              <div className="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">Female</p>
                <p className="text-sm font-black text-slate-700">{ethiopianTrainees.female}</p>
              </div>
            </div>
            <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {ethiopianTrainees.percentage} of student body
            </p>
          </div>
        </motion.div>

        {/* Occupied Beds */}
        <motion.div variants={item} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Occupied Beds</p>
              <h2 className="text-5xl font-black text-slate-900">{bedsStatus.occupied}</h2>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-blue-600">{bedsStatus.percentage}%</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Utilization</p>
            </div>
          </div>
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${bedsStatus.percentage}%` }}
               transition={{ duration: 1 }}
               className="h-full bg-blue-600 rounded-full"
            />
          </div>
          <p className="mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {bedsStatus.total - bedsStatus.occupied} Total Beds Available System-wide
          </p>
        </motion.div>
      </div>

      {/* Departments Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
          Department Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
            >
              <div className={`w-12 h-12 rounded-2xl ${dept.bg} ${dept.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <dept.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-black text-slate-900 mb-4">{dept.name}</p>
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-3xl font-black text-slate-900">{dept.total}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Trainees</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-slate-50 rounded-2xl text-center">
                  <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">M</p>
                  <p className="text-xs font-black text-slate-700">{dept.male}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl text-center">
                  <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">F</p>
                  <p className="text-xs font-black text-slate-700">{dept.female}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Building Free Space */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <motion.div variants={item} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900">Current Building Capacity</h3>
            <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline px-4 py-2 flex items-center gap-2">
              Management Detail
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {buildingSpace.map((b, i) => (
              <div key={i} className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col gap-4 relative overflow-hidden group/b">
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-sm font-black text-slate-900">{b.name}</p>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${b.type === "Male" ? "text-blue-500" : "text-pink-500"}`}>{b.type} Unit</p>
                  </div>
                  <div className={`p-2 rounded-xl bg-white shadow-sm font-black text-xs ${b.free === 0 ? "text-red-500" : "text-green-600"}`}>
                    {b.free} <span className="text-[8px] opacity-50 uppercase">Free</span>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase mb-1.5 px-0.5">
                    <span>Occupancy</span>
                    <span>{Math.round(((b.total - b.free)/b.total)*100)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((b.total - b.free)/b.total)*100}%` }}
                      className={`h-full ${b.type === "Male" ? "bg-blue-600" : "bg-pink-600"}`}
                    />
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white rounded-full opacity-20 group-hover/b:scale-110 transition-transform" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
