"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Camera, 
  Mail, 
  Lock, 
  Save, 
  User as UserIcon,
  Eye,
  EyeOff,
  CheckCircle2
} from "lucide-react";

export default function EditProfile() {
  const [email, setEmail] = useState("nahom.tesfaye@eau.edu.et");
  const [profileImage, setProfileImage] = useState<string | null>("https://api.dicebear.com/7.x/avataaars/svg?seed=Nahom&backgroundColor=ffdfbf");
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

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
      className="max-w-3xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/trainee" 
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
          <p className="text-slate-500 text-sm">Update your personal information and security settings.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image Section */}
        <motion.div variants={item} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-slate-50 overflow-hidden bg-slate-100 shadow-inner flex items-center justify-center relative">
              {profileImage ? (
                <Image 
                  src={profileImage} 
                  alt="Profile Preview" 
                  fill 
                  className="object-cover"
                />
              ) : (
                <UserIcon className="w-16 h-16 text-slate-300" />
              )}
            </div>
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2.5 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors border-2 border-white group-hover:scale-110 transition-transform"
            >
              <Camera className="w-5 h-5" />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-semibold text-slate-900">Profile Picture</h3>
            <p className="text-xs text-slate-500 mt-1">JPG, GIF or PNG. Max size of 2MB.</p>
          </div>
        </motion.div>

        {/* Basic Information */}
        <motion.div variants={item} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-6">
           <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
             <Mail className="w-5 h-5 text-green-500" />
             Communication
           </h3>
           
           <div className="space-y-2">
             <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
             <div className="relative group">
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-slate-900 font-medium"
                  placeholder="name@example.com"
                />
             </div>
             <p className="text-[11px] text-slate-400 ml-1">We'll use this for dormitory-related notifications.</p>
           </div>
        </motion.div>

        {/* Password Security */}
        <motion.div variants={item} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-6">
           <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
             <Lock className="w-5 h-5 text-green-500" />
             Security
           </h3>
           
           <div className="grid grid-cols-1 gap-6">
             {/* Old Password */}
             <div className="space-y-2">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
               <div className="relative">
                  <input 
                    type={showPassword.old ? "text" : "password"} 
                    value={passwords.old}
                    onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-slate-900"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword({...showPassword, old: !showPassword.old})}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword.old ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                  <div className="relative">
                      <input 
                        type={showPassword.new ? "text" : "password"} 
                        value={passwords.new}
                        onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                        className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-slate-900"
                        placeholder="••••••••"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                  <div className="relative">
                      <input 
                        type={showPassword.confirm ? "text" : "password"} 
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                        className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-slate-900"
                        placeholder="••••••••"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                  </div>
                </div>
             </div>
           </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={item} className="flex items-center justify-between pt-4">
           <Link href="/trainee" className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
              Cancel changes
           </Link>
           
           <button 
            type="submit" 
            disabled={isSaving}
            className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 ${
              saveSuccess 
                ? "bg-green-500 text-white" 
                : "bg-green-600 text-white hover:bg-green-700 shadow-green-100"
            }`}
           >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Saved Changes
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Profiles
                </>
              )}
           </button>
        </motion.div>
      </form>
    </motion.div>
  );
}
