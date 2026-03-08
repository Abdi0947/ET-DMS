"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  BarChart3,
  TrendingUp,
  PieChart,
  Users,
  Calendar,
  Activity,
  ChevronRight
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RePieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';

// --- Mock Data (Moved from Dashboard) ---

const occupancyData = [
  { name: 'Occupied', value: 1248 },
  { name: 'Available', value: 172 },
];
const COLORS = ['#2563eb', '#e2e8f0'];

const deptData = [
  { name: 'Pilot', students: 450 },
  { name: 'Cabin Crew', students: 380 },
  { name: 'ATC', students: 220 },
  { name: 'AMT', students: 370 },
];

const nationalityData = [
  { name: 'Ethiopian', value: 850 },
  { name: 'Kenyan', value: 120 },
  { name: 'Nigerian', value: 90 },
  { name: 'Sudanese', value: 75 },
  { name: 'Other', value: 285 },
];
const NATIONALITY_COLORS = ['#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

const maintenanceTrend = [
  { name: 'Jan', requests: 45 },
  { name: 'Feb', requests: 52 },
  { name: 'Mar', requests: 48 },
  { name: 'Apr', requests: 61 },
  { name: 'May', requests: 55 },
  { name: 'Jun', requests: 67 },
];

const batchTimelineData = [
  { batch: 'B2023-A', start: 100, end: 400 },
  { batch: 'B2023-B', start: 150, end: 450 },
  { batch: 'B2024-A', start: 200, end: 500 },
  { batch: 'B2024-B', start: 250, end: 550 },
];

export default function ProctorAnalysis() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
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
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            System Analytics
          </h1>
          <p className="text-slate-500 font-medium mt-1">Operational trends and distribution metrics for dormancy management.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Occupancy Pie Chart */}
        <motion.div variants={item} className="lg:col-span-4 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm mb-8">Occupancy Status</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Dept Bar Chart */}
        <motion.div variants={item} className="lg:col-span-8 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm mb-8">Department Distribution</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="students" fill="#2563eb" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Nationality Pie Chart */}
        <motion.div variants={item} className="lg:col-span-4 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm mb-8">Nationality Distribution</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={nationalityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent ? percent * 100 : 0).toFixed(0)}%`}
                >
                  {nationalityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={NATIONALITY_COLORS[index % NATIONALITY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Maintenance Line Chart */}
        <motion.div variants={item} className="lg:col-span-8 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm mb-8">Maintenance Trends</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={maintenanceTrend}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#64748b'}} />
                <Tooltip />
                <Area type="monotone" dataKey="requests" stroke="#ef4444" strokeWidth={4} fillOpacity={1} fill="url(#colorRequests)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Batch Timeline Concept */}
        <motion.div variants={item} className="lg:col-span-12 bg-slate-900 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-blue-600/10 blur-3xl rounded-full" />
          <h3 className="text-2xl font-black text-white tracking-tight mb-8 relative z-10">Batch Lifecycle Timeline</h3>
          <div className="space-y-6 relative z-10">
            {batchTimelineData.map((b, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Batch {b.batch}</span>
                  <span className="text-blue-400">Sep 2023 - Jun 2025</span>
                </div>
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(b.end - b.start) / 6}%` }} 
                    transition={{ duration: 1, delay: i * 0.2 }}
                    style={{ marginLeft: `${b.start / 6}%` }}
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
