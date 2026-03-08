"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { User, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      // alert("Login successful");
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-white text-slate-900 pt-16 pb-16 lg:pt-24 lg:pb-24 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-white">
        <motion.div
           animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-green-300/30 blur-[120px]"
        />
        <motion.div
           animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-green-200/20 blur-[120px]"
        />
        <motion.div
           animate={{
            y: [0, -20, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-[20%] w-[80vw] h-[40vw] rounded-full bg-emerald-300/20 blur-[100px]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwem0yMCAyMGgtdjIwSDIweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-30" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Top Centered Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 max-w-3xl"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Dormitory <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Management</span> System
          </h1>
        </motion.div>

        {/* Bottom Split Layout: Logo (Left) and Form (Right) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch justify-items-center">
          
          {/* Left Side: Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end w-full"
          >
            <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transform hover:scale-[1.02] transition-transform overflow-hidden border border-slate-200/50 relative flex items-center justify-center">
               {/* Internal container to keep logo from stretching weirdly */}
               <div className="relative w-full aspect-square">
                 <Image 
                   src="/EAU-logo.png" 
                   alt="Ethiopian Aviation University Logo" 
                   fill 
                   className="object-contain p-4"
                 />
               </div>
            </div>
          </motion.div>

          {/* Right Side: Login Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="w-full max-w-md flex justify-center lg:justify-start"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative overflow-hidden group w-full flex flex-col justify-center">
              {/* Subtle shiny edge effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

              {/* Form Header */}
              <div className="text-center mb-10 pt-4">
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">Welcome Back</h2>
                <p className="text-sm text-slate-500">Sign in to your EAU DMS account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  {/* ID Input */}
                  <div className="space-y-2 relative">
                    <label htmlFor="id" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                      University ID
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                      </div>
                      <input
                        id="id"
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="e.g. EAU-12345"
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2 relative">
                    <div className="flex justify-between items-center ml-1">
                      <label htmlFor="password" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Password
                      </label>
                      <a href="#" className="text-xs font-medium text-green-600 hover:text-green-700 transition-colors">
                        Forgot?
                      </a>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 shadow-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-600 transition-all duration-300",
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  )}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 -mr-1 w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 text-center text-xs text-slate-500">
                <p>Protected by EAU Secure Login.</p>
                <p className="mt-1">Roles inferred automatically upon sign in.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-slate-700">
      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
      <span>{text}</span>
    </div>
  );
}

