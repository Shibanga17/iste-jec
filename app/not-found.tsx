"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WifiOff, Home, Terminal } from 'lucide-react';
import Navbar from './components/navbar';
import PCBBackground from './components/PCBBackground';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#040814] text-white overflow-hidden relative flex flex-col">
      
      {/* 1. Navigation */}
      <Navbar />

      {/* 2. Background Effects */}
      <PCBBackground />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 3. Main Content Center */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-[#0b1021]/90 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_40px_rgba(220,38,38,0.05)]"
        >
          {/* Glitchy Icon Area */}
          <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping opacity-50"></div>
            <div className="relative bg-[#040814] border border-red-500/30 w-full h-full rounded-full flex items-center justify-center">
              <WifiOff size={40} className="text-red-400" />
            </div>
          </div>

          {/* 404 Text */}
          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
            404
          </h1>
          
          {/* Tech/Network Theme Text */}
          <div className="flex items-center justify-center gap-2 mb-6 text-red-400 font-mono text-sm uppercase tracking-widest">
            <Terminal size={14} />
            <span>Node Not Found</span>
          </div>

          <p className="text-slate-400 mb-10 leading-relaxed">
            Connection failed. The route you are trying to access has been dropped from the mesh network or does not exist.
          </p>

          {/* Return Button */}
          <Link 
            href="/" 
            className="group flex items-center justify-center gap-2 w-full py-4 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 rounded-xl text-white font-medium transition-all duration-300"
          >
            <Home size={18} className="text-cyan-400 group-hover:scale-110 transition-transform" />
            Re-establish Connection
          </Link>

        </motion.div>
      </div>
    </main>
  );
}