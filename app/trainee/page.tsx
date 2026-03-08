"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  BellRing, 
  HeadphonesIcon,
  RefreshCw,
  User as UserIcon,
  ArrowRightLeft
} from "lucide-react";

export default function TraineeProfile() {
  // Mock user data - in a real app this would come from a server/state
  const profileImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=Nahom&backgroundColor=ffdfbf"; 
  const hasTransferNotification = true; // Simulated transfer status

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
      className="space-y-6"
    >
      {/* Transfer Notification Banner */}
      {hasTransferNotification && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-green-600 text-white p-5 rounded-3xl shadow-lg shadow-green-100 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden group"
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <div>
               <h3 className="font-bold text-lg leading-tight">Transfer Verified!</h3>
               <p className="text-white/80 text-xs">Your move from Alpha Block to Beta Complex has been approved.</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-white text-green-600 rounded-xl text-xs font-bold hover:bg-green-50 transition-colors relative z-10 shadow-sm">
            View New Assignment
          </button>
          
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-125 transition-transform duration-700" />
        </motion.div>
      )}

      <div className="mb-6 text-center md:text-left pt-2">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Personal Info Summary</h1>
        <p className="text-slate-500 text-sm">Overview of your academic profile and housing assignments.</p>
      </div>

      {/* Main Profile Card */}
      <motion.div variants={item} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Top Banner Area */}
        <div className="h-32 bg-blue-50 relative" />
        
        {/* Profile Content */}
        <div className="px-8 pb-8">
          {/* Avatar & Header */}
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 mb-8 gap-5 relative z-10">

            <div className="w-28 h-28 rounded-2xl border-4 border-white overflow-hidden bg-slate-100 shrink-0 shadow-sm relative flex items-center justify-center">
              {profileImage ? (
                <Image 
                  src={profileImage} 
                  alt="Nahom Tesfaye" 
                  fill 
                  className="object-cover"
                />
              ) : (
                <UserIcon className="w-12 h-12 text-slate-300" />
              )}
            </div>
            <div className="mb-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800">Nahom Tesfaye</h2>
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-green-600 text-sm font-semibold mt-0.5">
                <span className="w-4 h-4 flex items-center justify-center bg-green-100 rounded-full">
                  <span className="w-2 h-2 bg-green-600 rounded-sm inline-block transform rotate-45" />
                </span>
                Pilot Cadet
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 pb-6 border-b border-slate-100">
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Student ID</p>
                  <p className="text-slate-900 font-semibold text-[15px]">EAU/2024/0001</p>
               </div>
               <div className="mt-6 md:mt-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Program</p>
                  <p className="text-slate-900 font-semibold text-[15px]">Pilot Cadet</p>
               </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 py-6 border-b border-slate-100">
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Current Campus</p>
                  <p className="text-slate-900 font-semibold text-[15px]">Bole Main Campus</p>
               </div>
               <div className="mt-6 md:mt-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Dorm Building</p>
                  <p className="text-slate-900 font-semibold text-[15px]">Alpha Block</p>
               </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 py-6 border-b border-slate-100">
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Dorm Type</p>
                  <p className="text-slate-900 font-semibold text-[15px]">Male</p>
               </div>
               <div className="mt-6 md:mt-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Room Number</p>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-900 font-semibold text-[15px]">204</p>
                    <span className="px-2 py-0.5 rounded bg-green-50 text-green-600 text-[9px] font-bold uppercase tracking-wider">Assigned</span>
                  </div>
               </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 pt-6">
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Capacity</p>
                  <p className="text-slate-900 font-semibold text-[15px]">2 Persons <span className="text-slate-500 font-normal ml-1"> (Bed B assigned)</span></p>
               </div>
               <div className="mt-6 md:mt-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="text-slate-900 font-semibold text-[15px]">Active Student</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <Link href="/trainee/edit-profile" className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm">
              <RefreshCw className="w-4 h-4" />
              Edit Profile
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Room Details Card */}
        <motion.div variants={item} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Room Details</h3>
          </div>
          <p className="text-slate-500 text-[13px] leading-relaxed">
            Currently assigned to Alpha Block, Room 204. Your room keys can be collected at the warden's office.
          </p>
        </motion.div>

        {/* Recent Alert Card */}
        <motion.div variants={item} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <BellRing className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Recent Alert</h3>
          </div>
          <p className="text-slate-500 text-[13px] leading-relaxed">
            Water maintenance scheduled for Alpha Block on Saturday, 10:00 AM. Please store water in advance.
          </p>
        </motion.div>

        {/* Help Desk Card */}
        <motion.div variants={item} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <HeadphonesIcon className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Help Desk</h3>
          </div>
          <p className="text-slate-500 text-[13px] leading-relaxed">
            Encountered an issue with your dorm facilities? Open a maintenance request through the sidebar.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
