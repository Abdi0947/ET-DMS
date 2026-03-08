"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Users, CheckCircle2, ArrowRight,
  Search, X, AlertCircle, UserCheck, BedDouble
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type BedStatus = "occupied" | "free";

interface Room {
  roomNumber: string;
  bedA: BedStatus;
  bedB: BedStatus;
}

interface Floor {
  level: string;
  label: string;
  roomRange: string;
  rooms: Room[];
}

interface Building {
  id: number;
  name: string;
  type: "Male" | "Female";
  floors: Floor[];
}

interface Trainee {
  id: string;
  name: string;
  dept: string;
  batch: string;
  gender: "Male" | "Female";
  priority: "High" | "Normal";
}

interface Batch {
  id: string;
  label: string;
  trainees: Trainee[];
}

interface AssignmentRecord {
  traineeId: string;
  traineeName: string;
  buildingId: number;
  buildingName: string;
  floorLevel: string;
  roomNumber: string;
  bed: "A" | "B";
}

// ─── Building / Floor / Room Generation ─────────────────────────────────────
// Each building: 5 floors (G, 1-4), 20 rooms per floor, 2 beds per room = 200 beds total

function buildBuilding(
  id: number,
  name: string,
  type: "Male" | "Female",
  preOccupied: { floor: string; room: string; bed: "A" | "B" }[]
): Building {
  const floorDefs = [
    { level: "G", label: "Ground Floor", prefix: "G" },
    { level: "1", label: "Floor 1",      prefix: "1" },
    { level: "2", label: "Floor 2",      prefix: "2" },
    { level: "3", label: "Floor 3",      prefix: "3" },
    { level: "4", label: "Floor 4",      prefix: "4" },
  ];

  const floors: Floor[] = floorDefs.map(d => {
    const rooms: Room[] = Array.from({ length: 20 }, (_, i) => {
      const num = i + 1;
      const roomNumber = `${d.prefix}${String(num).padStart(2, "0")}`;
      const occupied = preOccupied.filter(o => o.floor === d.level && o.room === roomNumber);
      return {
        roomNumber,
        bedA: occupied.some(o => o.bed === "A") ? "occupied" : "free",
        bedB: occupied.some(o => o.bed === "B") ? "occupied" : "free",
      };
    });

    const rangeStart = `${d.prefix}01`;
    const rangeEnd   = `${d.prefix}20`;
    return { level: d.level, label: d.label, roomRange: `${rangeStart} – ${rangeEnd}`, rooms };
  });

  return { id, name, type, floors };
}

// ─── Initial Mock Data (pre-existing occupants before any new assignments) ───

const INITIAL_BUILDINGS: Building[] = [
  buildBuilding(1, "Alpha Block",   "Male", [
    { floor: "G", room: "G01", bed: "A" }, { floor: "G", room: "G01", bed: "B" },
    { floor: "G", room: "G02", bed: "A" }, { floor: "G", room: "G03", bed: "A" },
    { floor: "1", room: "101", bed: "A" }, { floor: "1", room: "101", bed: "B" },
    { floor: "1", room: "102", bed: "A" },
  ]),
  buildBuilding(2, "Beta Complex",  "Male", [
    { floor: "G", room: "G01", bed: "A" }, { floor: "G", room: "G02", bed: "A" },
    { floor: "1", room: "101", bed: "A" }, { floor: "1", room: "101", bed: "B" },
  ]),
  buildBuilding(3, "Gamma Wing",    "Female", [
    { floor: "G", room: "G01", bed: "A" }, { floor: "G", room: "G01", bed: "B" },
    { floor: "G", room: "G02", bed: "A" },
  ]),
  buildBuilding(4, "Delta Station", "Female", [
    { floor: "G", room: "G01", bed: "A" },
  ]),
];

const BATCHES: Batch[] = [
  {
    id: "B2023-A", label: "Batch 2023-A",
    trainees: [
      { id: "T-001", name: "Amanuel Hailu",   dept: "Pilot",      batch: "B2023-A", gender: "Male",   priority: "High"   },
      { id: "T-002", name: "Dagmawi Soloman",  dept: "AMT",        batch: "B2023-A", gender: "Male",   priority: "Normal" },
      { id: "T-003", name: "Elias Tesfaye",    dept: "ATC",        batch: "B2023-A", gender: "Male",   priority: "High"   },
      { id: "T-004", name: "Betelehem Girma",  dept: "Cabin Crew", batch: "B2023-A", gender: "Female", priority: "Normal" },
      { id: "T-005", name: "Firehiwot Alemu",  dept: "Cabin Crew", batch: "B2023-A", gender: "Female", priority: "Normal" },
    ],
  },
  {
    id: "B2024-A", label: "Batch 2024-A",
    trainees: [
      { id: "T-101", name: "Yohannes Mesfin",  dept: "Pilot",      batch: "B2024-A", gender: "Male",   priority: "High"   },
      { id: "T-102", name: "Nahom Tesfaye",     dept: "Pilot",      batch: "B2024-A", gender: "Male",   priority: "Normal" },
      { id: "T-103", name: "Selamawit Kebede",  dept: "ATC",        batch: "B2024-A", gender: "Female", priority: "High"   },
      { id: "T-104", name: "Hiwot Tadesse",     dept: "AMT",        batch: "B2024-A", gender: "Female", priority: "Normal" },
    ],
  },
  {
    id: "B2025-A", label: "Batch 2025-A",
    trainees: [
      { id: "T-201", name: "Biruk Getachew",   dept: "Pilot",      batch: "B2025-A", gender: "Male",   priority: "High"   },
      { id: "T-202", name: "Kidus Abrha",      dept: "AMT",        batch: "B2025-A", gender: "Male",   priority: "Normal" },
      { id: "T-203", name: "Meron Solomon",    dept: "Cabin Crew", batch: "B2025-A", gender: "Female", priority: "High"   },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function countFreeBeds(floor: Floor) {
  return floor.rooms.reduce((s, r) =>
    s + (r.bedA === "free" ? 1 : 0) + (r.bedB === "free" ? 1 : 0), 0);
}

const DEPT_COLORS: Record<string, string> = {
  Pilot:        "bg-blue-100 text-blue-700 border-blue-200",
  ATC:          "bg-amber-100 text-amber-700 border-amber-200",
  AMT:          "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Cabin Crew": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function DormAssignment() {
  // ── Reactive building state (so we can mutate beds after assignment) ────────
  const [buildings, setBuildings] = useState<Building[]>(INITIAL_BUILDINGS);

  const [activeBatch, setActiveBatch]         = useState<Batch>(BATCHES[0]);
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
  const [search, setSearch]                   = useState("");

  const [selectedBuildingId, setSelectedBuildingId] = useState<number>(1);
  const [selectedFloorLevel, setSelectedFloorLevel] = useState<string>("G");
  const [selectedRoomNumber, setSelectedRoomNumber] = useState<string | null>(null);
  const [selectedBed, setSelectedBed]               = useState<"A" | "B" | null>(null);

  const [allAssignments, setAllAssignments] = useState<AssignmentRecord[]>([]);
  const [successMsg, setSuccessMsg]         = useState<string | null>(null);

  // ── Derived data ────────────────────────────────────────────────────────────
  const assignedIds = useMemo(() =>
    new Set(allAssignments.map(a => a.traineeId)),
    [allAssignments]
  );

  const filteredTrainees = useMemo(() =>
    activeBatch.trainees.filter(t =>
      !assignedIds.has(t.id) &&
      (t.name.toLowerCase().includes(search.toLowerCase()) ||
       t.dept.toLowerCase().includes(search.toLowerCase()))
    ),
    [activeBatch, assignedIds, search]
  );

  const assignedInBatch = useMemo(() =>
    activeBatch.trainees.filter(t => assignedIds.has(t.id)),
    [activeBatch, assignedIds]
  );

  // Gender-compatible buildings
  const compatibleBuildings = useMemo(() => {
    if (!selectedTrainee) return buildings;
    return buildings.filter(b => b.type === selectedTrainee.gender);
  }, [selectedTrainee, buildings]);

  // Always resolve selected building from state
  const selectedBuilding = useMemo(() =>
    buildings.find(b => b.id === selectedBuildingId) ?? buildings[0],
    [buildings, selectedBuildingId]
  );

  const selectedFloor = useMemo(() =>
    selectedBuilding.floors.find(f => f.level === selectedFloorLevel) ?? selectedBuilding.floors[0],
    [selectedBuilding, selectedFloorLevel]
  );

  const selectedRoom = useMemo(() =>
    selectedFloor.rooms.find(r => r.roomNumber === selectedRoomNumber) ?? null,
    [selectedFloor, selectedRoomNumber]
  );

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handleTraineeSelect = useCallback((t: Trainee) => {
    setSelectedTrainee(t);
    setSelectedRoomNumber(null);
    setSelectedBed(null);
    // Auto-switch to a compatible building if needed
    const currentBuilding = buildings.find(b => b.id === selectedBuildingId);
    if (currentBuilding && currentBuilding.type !== t.gender) {
      const firstCompatible = buildings.find(b => b.type === t.gender);
      if (firstCompatible) {
        setSelectedBuildingId(firstCompatible.id);
        setSelectedFloorLevel("G");
      }
    }
  }, [buildings, selectedBuildingId]);

  const handleBuildingSelect = useCallback((b: Building) => {
    setSelectedBuildingId(b.id);
    setSelectedFloorLevel("G");
    setSelectedRoomNumber(null);
    setSelectedBed(null);
  }, []);

  const handleFloorSelect = useCallback((level: string) => {
    setSelectedFloorLevel(level);
    setSelectedRoomNumber(null);
    setSelectedBed(null);
  }, []);

  const handleRoomSelect = useCallback((roomNumber: string, freeCount: number) => {
    if (freeCount === 0) return;
    setSelectedRoomNumber(roomNumber);
    setSelectedBed(null);
  }, []);

  const handleFinalize = useCallback(() => {
    if (!selectedTrainee || !selectedRoom || !selectedBed) return;
    const bedStatus = selectedBed === "A" ? selectedRoom.bedA : selectedRoom.bedB;
    if (bedStatus !== "free") return; // safety guard

    // 1. Record the assignment
    const record: AssignmentRecord = {
      traineeId:    selectedTrainee.id,
      traineeName:  selectedTrainee.name,
      buildingId:   selectedBuilding.id,
      buildingName: selectedBuilding.name,
      floorLevel:   selectedFloorLevel,
      roomNumber:   selectedRoom.roomNumber,
      bed:          selectedBed,
    };
    setAllAssignments(prev => [...prev, record]);

    // 2. Update the room's bed status in building state (reactive update)
    setBuildings(prev =>
      prev.map(bld => {
        if (bld.id !== selectedBuilding.id) return bld;
        return {
          ...bld,
          floors: bld.floors.map(fl => {
            if (fl.level !== selectedFloorLevel) return fl;
            return {
              ...fl,
              rooms: fl.rooms.map(r => {
                if (r.roomNumber !== selectedRoom.roomNumber) return r;
                return {
                  ...r,
                  bedA: selectedBed === "A" ? "occupied" : r.bedA,
                  bedB: selectedBed === "B" ? "occupied" : r.bedB,
                };
              }),
            };
          }),
        };
      })
    );

    // 3. Show success + reset
    setSuccessMsg(
      `${selectedTrainee.name} → ${selectedBuilding.name}, ${selectedFloor.label}, Room ${selectedRoom.roomNumber}, Bed ${selectedBed}`
    );
    setSelectedTrainee(null);
    setSelectedRoomNumber(null);
    setSelectedBed(null);
    setTimeout(() => setSuccessMsg(null), 5000);
  }, [selectedTrainee, selectedRoom, selectedBed, selectedBuilding, selectedFloor, selectedFloorLevel]);

  const canFinalize = !!(
    selectedTrainee &&
    selectedRoom &&
    selectedBed &&
    (selectedBed === "A" ? selectedRoom.bedA === "free" : selectedRoom.bedB === "free")
  );

  // Total free beds across all buildings
  const totalFreeBeds = buildings.reduce((s, b) =>
    s + b.floors.reduce((s2, f) => s2 + countFreeBeds(f), 0), 0);

  const anim = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const rowAnim = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="flex flex-col gap-6 pb-10">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dormitory Assignment</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
            Batch-Based Bed Allocation · Gender-Separated Buildings
          </p>
        </div>

        {/* Batch Dropdown */}
        <div className="relative">
          <select
            value={activeBatch.id}
            onChange={e => {
              const found = BATCHES.find(b => b.id === e.target.value);
              if (found) { setActiveBatch(found); setSelectedTrainee(null); }
            }}
            className="appearance-none bg-white border border-slate-200 text-slate-800 font-black text-xs uppercase tracking-widest px-5 py-3.5 pr-10 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:border-blue-300 transition-all"
          >
            {BATCHES.map(b => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Success Toast ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="flex items-center gap-3 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-xl"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="font-bold text-sm">✓ Assigned: {successMsg}</span>
            <button onClick={() => setSuccessMsg(null)} className="ml-auto opacity-70 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Layout ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* LEFT: Trainee Waitlist */}
        <motion.div
          variants={anim} initial="hidden" animate="show"
          className="xl:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col overflow-hidden"
          style={{ maxHeight: "80vh" }}
        >
          <div className="p-5 border-b border-slate-50 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> {activeBatch.label}
              </h3>
              <span className="bg-blue-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full">
                {filteredTrainees.length} PENDING
              </span>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search trainee..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 rounded-2xl text-xs focus:ring-2 focus:ring-blue-500/20 border-none outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredTrainees.length === 0 && assignedInBatch.length === activeBatch.trainees.length && (
              <div className="text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-widest">
                All trainees assigned ✓
              </div>
            )}

            {/* Unassigned */}
            {filteredTrainees.map(t => (
              <motion.button
                key={t.id}
                variants={rowAnim}
                onClick={() => handleTraineeSelect(t)}
                className={`w-full text-left p-4 rounded-3xl border transition-all ${
                  selectedTrainee?.id === t.id
                    ? "bg-slate-900 border-slate-900 text-white shadow-2xl scale-[1.02]"
                    : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-md text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                    selectedTrainee?.id === t.id ? "bg-white/15 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm truncate">{t.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${
                        selectedTrainee?.id === t.id
                          ? "bg-white/10 text-blue-300 border-white/10"
                          : (DEPT_COLORS[t.dept] ?? "bg-slate-100 text-slate-500 border-slate-200")
                      }`}>
                        {t.dept}
                      </span>
                      <span className={`text-[9px] font-bold ${
                        t.gender === "Female" ? "text-pink-400" : "text-blue-400"
                      }`}>
                        {t.gender}
                      </span>
                    </div>
                  </div>
                  {t.priority === "High" && (
                    <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" title="High priority" />
                  )}
                </div>
              </motion.button>
            ))}

            {/* Assigned section */}
            {assignedInBatch.length > 0 && (
              <div className="pt-3">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2">Assigned</p>
                {assignedInBatch.map(t => {
                  const rec = allAssignments.find(a => a.traineeId === t.id);
                  return (
                    <div key={t.id} className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-emerald-50 border border-emerald-100 mb-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-emerald-800 truncate flex-1">{t.name}</span>
                      {rec && (
                        <span className="text-[9px] text-emerald-600 font-black shrink-0">
                          {rec.buildingName.split(" ")[0]} · {rec.roomNumber}-{rec.bed}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>

        {/* RIGHT: Building + Floor + Room + Assignment Panel */}
        <div className="xl:col-span-9 flex flex-col gap-5">

          {/* Building Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {compatibleBuildings.map(b => (
              <button
                key={b.id}
                onClick={() => handleBuildingSelect(b)}
                className={`flex items-center gap-2 px-5 py-3 rounded-3xl border text-xs font-black uppercase tracking-widest transition-all shrink-0 ${
                  selectedBuilding.id === b.id
                    ? "bg-white border-blue-600 text-blue-700 shadow-xl"
                    : "bg-white border-slate-100 text-slate-400 hover:border-blue-200"
                }`}
              >
                <Building2 className={`w-4 h-4 ${selectedBuilding.id === b.id ? "text-blue-600" : "text-slate-300"}`} />
                {b.name}
                <span className={`text-[9px] px-2 py-0.5 rounded-lg font-black ${
                  b.type === "Male" ? "bg-blue-50 text-blue-500" : "bg-pink-50 text-pink-500"
                }`}>{b.type}</span>
              </button>
            ))}
            {!selectedTrainee && (
              <span className="text-[10px] text-slate-400 font-bold self-center ml-2 italic">
                Select a trainee to filter by gender
              </span>
            )}
          </div>

          {/* Floor Cards + Room Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* Floor Cards */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {selectedBuilding.floors.map(floor => {
                const free  = countFreeBeds(floor);
                const total = floor.rooms.length * 2;
                const pct   = Math.round(((total - free) / total) * 100);
                const isActive = selectedFloorLevel === floor.level;

                return (
                  <button
                    key={floor.level}
                    onClick={() => handleFloorSelect(floor.level)}
                    className={`w-full text-left p-5 rounded-3xl border transition-all ${
                      isActive
                        ? "bg-slate-900 border-slate-900 shadow-2xl"
                        : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className={`font-black text-sm ${isActive ? "text-white" : "text-slate-900"}`}>
                          {floor.label}
                        </p>
                        <p className={`text-[10px] font-bold mt-0.5 ${isActive ? "text-slate-400" : "text-slate-400"}`}>
                          Rooms {floor.roomRange}
                        </p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <p className={`text-xl font-black leading-none ${
                          free === 0 ? "text-red-400" : isActive ? "text-blue-400" : "text-emerald-600"
                        }`}>{free}</p>
                        <p className={`text-[9px] font-bold uppercase ${isActive ? "text-slate-500" : "text-slate-400"}`}>
                          free beds
                        </p>
                      </div>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${isActive ? "bg-slate-800" : "bg-slate-100"}`}>
                      <div
                        className={`h-full transition-all ${pct > 85 ? "bg-red-500" : pct > 60 ? "bg-amber-400" : "bg-emerald-500"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className={`text-[9px] font-bold mt-1.5 ${isActive ? "text-slate-500" : "text-slate-400"}`}>
                      {pct}% occupied · {total} total beds ({floor.rooms.length} rooms)
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Room Grid + Bed Selector + Assignment Summary */}
            <div className="lg:col-span-7 flex flex-col gap-4">

              {/* Dark mission panel: room grid */}
              <div className="bg-slate-900 rounded-[2.5rem] p-6 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

                {/* Legend */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div>
                    <h3 className="text-white font-black text-sm">{selectedBuilding.name} · {selectedFloor.label}</h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                      Rooms {selectedFloor.roomRange} · 2 Beds/Room (A & B)
                    </p>
                  </div>
                  <div className="flex gap-3 text-[9px] font-black uppercase">
                    <div className="flex items-center gap-1 text-slate-600"><div className="w-2.5 h-2.5 rounded-sm bg-slate-800 border border-slate-700" /> Full</div>
                    <div className="flex items-center gap-1 text-amber-400"><div className="w-2.5 h-2.5 rounded-sm bg-amber-500/30 border border-amber-500/40" /> 1 free</div>
                    <div className="flex items-center gap-1 text-emerald-400"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-600/30 border border-emerald-500/40" /> 2 free</div>
                  </div>
                </div>

                {/* Room Cells */}
                <div className="grid grid-cols-5 gap-2 relative z-10 max-h-[300px] overflow-y-auto pr-1">
                  {selectedFloor.rooms.map(room => {
                    const freeCount = (room.bedA === "free" ? 1 : 0) + (room.bedB === "free" ? 1 : 0);
                    const isSelected = selectedRoomNumber === room.roomNumber;

                    let style = "bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed";
                    if (freeCount === 1) style = "bg-amber-800/20 border-amber-500/30 text-amber-400 cursor-pointer hover:bg-amber-700/30";
                    if (freeCount === 2) style = "bg-emerald-800/30 border-emerald-500/30 text-emerald-400 cursor-pointer hover:bg-emerald-700/40";

                    return (
                      <button
                        key={room.roomNumber}
                        disabled={freeCount === 0}
                        onClick={() => handleRoomSelect(room.roomNumber, freeCount)}
                        className={`aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all text-[10px] font-black ${style} ${
                          isSelected ? "ring-2 ring-blue-500 scale-105 shadow-lg shadow-blue-500/25" : ""
                        }`}
                      >
                        {room.roomNumber}
                        <div className="flex gap-0.5 mt-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${room.bedA === "free" ? "bg-emerald-400" : "bg-slate-600"}`} />
                          <div className={`w-1.5 h-1.5 rounded-full ${room.bedB === "free" ? "bg-emerald-400" : "bg-slate-600"}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Bed Selector (only when a room is selected) */}
                <AnimatePresence>
                  {selectedRoom && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-slate-800 relative z-10"
                    >
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3">
                        Room {selectedRoom.roomNumber} — Choose a Bed
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {(["A", "B"] as const).map(bed => {
                          const status  = bed === "A" ? selectedRoom.bedA : selectedRoom.bedB;
                          const isFree  = status === "free";
                          const chosen  = selectedBed === bed;

                          if (!isFree) {
                            return (
                              <div key={bed} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-700 bg-slate-800 text-slate-500">
                                <BedDouble className="w-4 h-4 shrink-0" />
                                <span className="font-black text-sm">Bed {bed}</span>
                                <span className="ml-auto text-[9px] font-black uppercase px-2 py-0.5 bg-red-900/30 text-red-400 border border-red-800/40 rounded-lg">
                                  Reserved
                                </span>
                              </div>
                            );
                          }

                          return (
                            <button
                              key={bed}
                              onClick={() => setSelectedBed(chosen ? null : bed)}
                              className={`flex items-center gap-3 p-4 rounded-2xl border font-black text-sm transition-all ${
                                chosen
                                  ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30"
                                  : "bg-slate-800 border-emerald-500/40 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-900/20"
                              }`}
                            >
                              <BedDouble className="w-4 h-4 shrink-0" />
                              Bed {bed}
                              {chosen
                                ? <CheckCircle2 className="ml-auto w-4 h-4" />
                                : <span className="ml-auto text-[9px] font-black uppercase">Available</span>
                              }
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Assignment Summary + Confirm */}
              <div className={`bg-white rounded-[2rem] border p-6 transition-all ${
                canFinalize ? "border-blue-200 shadow-xl shadow-blue-900/5" : "border-slate-100"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest">Assignment Summary</h4>
                  {selectedTrainee && (
                    <button onClick={() => { setSelectedTrainee(null); setSelectedRoomNumber(null); setSelectedBed(null); }}
                      className="text-slate-400 hover:text-slate-700 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {!selectedTrainee ? (
                  <p className="text-slate-400 text-xs font-medium">← Select a trainee from the waitlist to begin assignment</p>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: "Trainee",  value: selectedTrainee.name },
                        { label: "Dept",     value: selectedTrainee.dept },
                        { label: "Building", value: selectedBuilding.name },
                        { label: "Room · Bed", value: selectedRoom && selectedBed
                          ? `${selectedRoom.roomNumber} · Bed ${selectedBed}`
                          : "Not selected" },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                          <p className="text-xs font-black text-slate-900 truncate">{value}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      disabled={!canFinalize}
                      onClick={handleFinalize}
                      className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                        canFinalize
                          ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg active:scale-95 cursor-pointer"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      {canFinalize ? "Confirm Assignment" : "Select a room and bed above"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Stats ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
        {[
          { icon: Users,       label: "Batch Size",       value: activeBatch.trainees.length,    color: "text-blue-600 bg-blue-50" },
          { icon: UserCheck,   label: "Assigned Today",   value: allAssignments.length,           color: "text-emerald-600 bg-emerald-50" },
          { icon: AlertCircle, label: "Still Pending",    value: filteredTrainees.length,         color: "text-amber-600 bg-amber-50" },
          { icon: BedDouble,   label: "Total Free Beds",  value: totalFreeBeds,                   color: "text-indigo-600 bg-indigo-50" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-3xl p-5 border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
