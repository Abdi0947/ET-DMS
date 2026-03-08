"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Users, 
  MapPin, 
  Plus,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Search,
  Layers,
  ArrowRight
} from "lucide-react";

// Mock data for buildings with floor and room-level details
const buildingsData = [
  { 
    id: 1,
    name: "Alpha Block", 
    type: "Male", 
    capacity: 200, // Assuming 2 beds per dorm
    dorms: 100,
    occupancy: 184, 
    floors: 4, 
    status: "Near Capacity",
    floorData: [
      { floor: "G", totalDorms: 20, occupiedDorms: 18, freeDorms: 2 },
      { floor: 1, totalDorms: 20, occupiedDorms: 15, freeDorms: 5 },
      { floor: 2, totalDorms: 20, occupiedDorms: 20, freeDorms: 0 },
      { floor: 3, totalDorms: 20, occupiedDorms: 19, freeDorms: 1 },
      { floor: 4, totalDorms: 20, occupiedDorms: 12, freeDorms: 8 },
    ],
    rooms: [
      { id: "G01", floor: "G", status: "Occupied", occupants: [{ name: "Nahom Tesfaye", dept: "Pilot" }, { name: "Abebe Kebede", dept: "AMT" }] },
      { id: "G02", floor: "G", status: "Partial", occupants: [{ name: "John Doe", dept: "Cabin Crew" }], free: 1 },
      { id: "101", floor: 1, status: "Occupied", occupants: [{ name: "Samuel L.", dept: "ATC" }, { name: "Musa H.", dept: "Pilot" }] },
      { id: "201", floor: 2, status: "Occupied", occupants: [{ name: "Dawit K.", dept: "AMT" }, { name: "Yared T.", dept: "Pilot" }] },
      { id: "301", floor: 3, status: "Partial", occupants: [{ name: "Elias B.", dept: "ATC" }], free: 1 },
      { id: "401", floor: 4, status: "Empty", occupants: [], free: 2 },
    ]
  },
  { 
    id: 2,
    name: "Beta Complex", 
    type: "Male", 
    capacity: 400, 
    dorms: 200,
    occupancy: 210, 
    floors: 6, 
    status: "Available",
    floorData: [
      { floor: "G", totalDorms: 30, occupiedDorms: 15, freeDorms: 15 },
      { floor: 1, totalDorms: 30, occupiedDorms: 20, freeDorms: 10 },
      { floor: 2, totalDorms: 30, occupiedDorms: 10, freeDorms: 20 },
    ],
    rooms: [
      { id: "G01", floor: "G", status: "Empty", occupants: [], free: 2 },
      { id: "101", floor: 1, status: "Occupied", occupants: [{ name: "Li Wei", dept: "Pilot" }, { name: "Chen G.", dept: "AMT" }] },
    ]
  },
  { 
    id: 3,
    name: "Gamma Wing", 
    type: "Female", 
    capacity: 150, 
    dorms: 75,
    occupancy: 124, 
    floors: 3, 
    status: "Available",
    floorData: [
      { floor: "G", totalDorms: 25, occupiedDorms: 20, freeDorms: 5 },
      { floor: 1, totalDorms: 25, occupiedDorms: 22, freeDorms: 3 },
    ],
    rooms: [
      { id: "G01", floor: "G", status: "Occupied", occupants: [{ name: "Sarah Smith", dept: "ATC" }, { name: "Elena R.", dept: "Cabin Crew" }] },
    ]
  },
];

export default function DormOccupancy() {
  const [expandedBuilding, setExpandedBuilding] = useState<number | null>(null);

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
      className="space-y-8 pb-20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dorm Occupancy</h1>
          <p className="text-slate-500 text-sm mt-1">Check floor-level free space (Ground + 4 Floors layout).</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 text-xs font-bold flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500" /> Male Units
           </div>
           <div className="px-4 py-2 bg-pink-50 text-pink-700 rounded-xl border border-pink-100 text-xs font-bold flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-pink-500" /> Female Units
           </div>
        </div>
      </div>

      {/* Building List */}
      <div className="space-y-6">
        {buildingsData.map((b) => {
          const percentage = Math.round((b.occupancy / b.capacity) * 100);
          const isExpanded = expandedBuilding === b.id;

          return (
            <motion.div 
              key={b.id}
              variants={item}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <div 
                onClick={() => setExpandedBuilding(isExpanded ? null : b.id)}
                className="p-8 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                      b.type === "Male" ? "bg-blue-600 text-white" : "bg-pink-600 text-white"
                    }`}>
                      <Building2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        {b.name}
                        {isExpanded ? <ChevronUp className="w-6 h-6 text-slate-400" /> : <ChevronDown className="w-6 h-6 text-slate-400" />}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          b.type === "Male" ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-pink-50 text-pink-700 border-pink-100"
                        }`}>
                          {b.dorms} Dorms Total
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                          <Layers className="w-4 h-4 text-slate-300" />
                          G + {b.floors} Floors
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 max-w-sm">
                    <div className="flex justify-between items-end mb-2">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Occupancy</span>
                       <span className="text-sm font-black text-slate-900">{percentage}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div 
                        style={{ width: `${percentage}%` }}
                        className={`h-full transition-all duration-1000 ${
                          b.type === "Male" ? "bg-blue-600" : "bg-pink-600"
                        }`}
                       />
                    </div>
                    <div className="flex justify-between mt-2 text-[11px] font-bold text-slate-500">
                       <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5" /> {b.occupancy} Taken</span>
                       <span className="flex items-center gap-1 text-green-600"><Plus className="w-3.5 h-3.5" /> {b.capacity - b.occupancy} Beds Free</span>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-100 bg-slate-50/50"
                  >
                    <div className="p-8 space-y-8">
                       {/* Floor Analysis Section */}
                       <div>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                               <Layers className="w-4 h-4 text-green-600" />
                               Floor-Level Capacity (20 Dorms/Floor)
                            </h4>
                            <span className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 uppercase tracking-widest">
                               G + {b.floors} Layout
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                             {b.floorData.map((floor) => (
                               <div key={floor.floor} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-3 relative overflow-hidden group/floor">
                                  <div className="flex justify-between items-start z-10">
                                     <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{floor.floor === "G" ? "Ground" : `Floor ${floor.floor}`}</p>
                                        <p className="text-xl font-black text-slate-900">{floor.freeDorms} <span className="text-[10px] text-slate-400 uppercase">Free Dorms</span></p>
                                     </div>
                                     <div className="p-2 bg-slate-50 rounded-lg group-hover/floor:bg-green-50 transition-colors">
                                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover/floor:text-green-600" />
                                     </div>
                                  </div>
                                  <div className="space-y-1 z-10">
                                     <div className="flex justify-between text-[9px] font-bold uppercase tracking-tight">
                                        <span className="text-slate-400">{floor.occupiedDorms}/{floor.totalDorms} Dorms</span>
                                        <span className="text-slate-900">{Math.round((floor.occupiedDorms/floor.totalDorms)*100)}%</span>
                                     </div>
                                     <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                          style={{ width: `${(floor.occupiedDorms/floor.totalDorms)*100}%` }}
                                          className={`h-full ${floor.freeDorms === 0 ? "bg-red-500" : "bg-green-600"}`}
                                        />
                                     </div>
                                  </div>
                                  <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-slate-50 rounded-full opacity-50 group-hover/floor:scale-110 transition-transform" />
                               </div>
                             ))}
                          </div>
                       </div>

                       {/* Room Detail Section */}
                       <div className="pt-8 border-t border-slate-200/60">
                          <div className="flex items-center justify-between mb-6">
                             <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-green-600" />
                                Specific Room Occupancy (G, 1-4)
                             </h4>
                             <div className="flex gap-2">
                                <Search className="w-4 h-4 text-slate-400 mr-2" />
                                <input type="text" placeholder="Search Room ID..." className="bg-white border text-xs px-3 py-1.5 rounded-lg outline-none focus:border-green-500 w-48" />
                             </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                             {b.rooms.map((room) => (
                               <div key={room.id} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-green-400 hover:shadow-xl hover:shadow-green-500/5 transition-all group/room relative overflow-hidden">
                                  <div className="flex justify-between items-start mb-4 relative z-10">
                                     <div>
                                        <span className="text-lg font-black text-slate-900">Dorm {room.id}</span>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{room.floor === "G" ? "Ground Floor" : `Floor ${room.floor}`}</p>
                                     </div>
                                     <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border transition-colors ${
                                       room.status === "Occupied" ? "bg-slate-50 text-slate-500 border-slate-200" : 
                                       room.status === "Partial" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                       "bg-green-50 text-green-600 border-green-100"
                                     }`}>
                                       {room.status}
                                     </div>
                                  </div>
                                  
                                  <div className="space-y-3 relative z-10">
                                     {room.occupants.map((occ, idx) => (
                                       <div key={idx} className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50/50 group-hover/room:bg-white border border-slate-100 transition-colors">
                                          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200 shadow-sm group-hover/room:border-green-200">
                                             {occ.name.charAt(0)}
                                          </div>
                                          <div className="truncate">
                                             <p className="text-xs font-bold text-slate-900 truncate tracking-tight">{occ.name}</p>
                                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{occ.dept} Dept</p>
                                          </div>
                                       </div>
                                     ))}
                                     
                                     {room.free && Array.from({ length: room.free }).map((_, idx) => (
                                       <button key={idx} className="w-full py-3 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-extrabold text-slate-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all flex items-center justify-center gap-2 group/bed">
                                          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                          ASSIGN FREE BED
                                       </button>
                                     ))}
                                  </div>
                                  {/* Decor */}
                                  <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50/50 rounded-full translate-x-1/2 -translate-y-1/2 group-hover/room:bg-green-50 transition-colors" />
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Summary Tooltip */}
      <div className="fixed bottom-6 right-6 z-50">
         <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-2xl shadow-slate-900/20 border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="flex -space-x-2">
               <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-blue-500 flex items-center justify-center text-[10px] font-black">M</div>
               <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-pink-500 flex items-center justify-center text-[10px] font-black">F</div>
            </div>
            <div className="border-l border-white/20 pl-4">
               <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">Total Free Spaces</p>
               <p className="text-lg font-black leading-none">84 <span className="text-green-400 text-xs">+3 Today</span></p>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
