"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Wrench, 
  Send, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  ClipboardList
} from "lucide-react";

export default function MaintenancePage() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "Plumbing",
    description: "",
    urgency: "Normal"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ subject: "", category: "Plumbing", description: "", urgency: "Normal" });
      setTimeout(() => setShowSuccess(false), 5000);
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
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Maintenance Request</h1>
          <p className="text-slate-500 text-sm mt-1">Submit a new request for room repairs or facility issues.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100 self-start">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Avg. Response: 24h</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Request Form */}
        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                {/* Subject Field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Issue Subject</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Briefly describe the problem (e.g. Leaking faucet)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-slate-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-slate-900 font-medium appearance-none"
                    >
                      <option>Plumbing</option>
                      <option>Electrical</option>
                      <option>Furniture</option>
                      <option>Internet/Network</option>
                      <option>Health & Safety</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Urgency Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Urgency Level</label>
                    <select 
                      value={formData.urgency}
                      onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-slate-900 font-medium appearance-none"
                    >
                      <option>Low</option>
                      <option>Normal</option>
                      <option>High</option>
                      <option>Urgent (Emergency)</option>
                    </select>
                  </div>
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Detailed Description</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Provide more details about the issue..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-slate-900 font-medium resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50/50 p-6 flex items-center justify-between border-t border-slate-100">
               <div className="flex items-center gap-2 text-slate-400">
                 <AlertTriangle className="w-4 h-4" />
                 <span className="text-[11px] font-medium">Please report emergencies directly to the warden office.</span>
               </div>
               <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200 active:scale-95 disabled:opacity-70"
               >
                 {isSubmitting ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                   <>
                    <Send className="w-4 h-4" />
                    Submit Request
                   </>
                 )}
               </button>
            </div>
          </form>

          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500 text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg"
            >
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <div>
                <p className="font-bold">Request Submitted Successfully!</p>
                <p className="text-xs opacity-90">A technician will be assigned to your case shortly.</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <motion.div variants={item} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                 <ClipboardList className="w-5 h-5" />
               </div>
               <h3 className="font-bold text-slate-900">Your History</h3>
            </div>
            <div className="space-y-4 pt-2">
               <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                 <div className="flex justify-between items-start mb-1">
                   <p className="text-xs font-bold text-slate-800">Broken Chair</p>
                   <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700 uppercase">Fixed</span>
                 </div>
                 <p className="text-[10px] text-slate-500">Submitted 3 days ago</p>
               </div>
               <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                 <div className="flex justify-between items-start mb-1">
                   <p className="text-xs font-bold text-slate-800">Light Flickering</p>
                   <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-700 uppercase">Pending</span>
                 </div>
                 <p className="text-[10px] text-slate-500">Submitted yesterday</p>
               </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-6 text-white shadow-lg shadow-green-100">
            <h3 className="font-bold mb-2">Need Help?</h3>
            <p className="text-xs opacity-80 leading-relaxed mb-4">
              If your request hasn't been addressed within 48 hours, please visit the Maintenance Office at Building B, Ground Floor.
            </p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors">
              View Office Hours
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
