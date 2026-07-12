"use client";

import Navbar from '../components/navbar';
import { Sparkles, FolderGit2, Rocket, Hammer, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#040814] text-white overflow-hidden relative pb-20">
      <Navbar />

      <div className="absolute top-32 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto pt-32 px-6 relative z-10">
        
        {/* Header Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-sm mb-6 text-cyan-400">
            <Sparkles size={16} /> Innovation Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Projects</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Discover the hardware, software, and research initiatives built by the talented minds of ISTE JEC.
          </p>
        </motion.div>

        {/* The Stealth Mode Box Pop-in Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="p-10 md:p-16 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20 backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden">
            <FolderGit2 size={200} className="absolute text-slate-800/10 -rotate-12 -right-10 -bottom-10 pointer-events-none" />
            <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 relative z-10">
              <FolderGit2 size={40} className="text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
              Building in Stealth Mode
            </h2>
            <p className="text-slate-400 max-w-md mx-auto mb-10 relative z-10">
              There are no active projects on display at the moment. Our teams are currently brainstorming, coding, and soldering behind the scenes. Check back soon!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full relative z-10">
               <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center hover:border-cyan-500/50 transition-colors">
                 <Cpu size={28} className="text-cyan-400 mb-3"/>
                 <span className="text-sm text-slate-300 font-semibold tracking-wide uppercase">Hardware & IoT</span>
               </div>
               <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center hover:border-orange-500/50 transition-colors">
                 <Hammer size={28} className="text-orange-400 mb-3"/>
                 <span className="text-sm text-slate-300 font-semibold tracking-wide uppercase">Prototyping</span>
               </div>
               <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center hover:border-purple-500/50 transition-colors">
                 <Rocket size={28} className="text-purple-400 mb-3"/>
                 <span className="text-sm text-slate-300 font-semibold tracking-wide uppercase">App Dev</span>
               </div>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}