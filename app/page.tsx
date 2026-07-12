"use client";

import Navbar from './components/navbar';
import NotificationTicker from './components/NotificationTicker';
import PCBBackground from './components/PCBBackground';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#040814] text-white overflow-hidden relative">
      
      <Navbar />
      
      {/* 1. The Animated Hardware Traces */}
      <PCBBackground />

      {/* 2. Subtle Background Glows */}
      <div className="absolute top-32 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 pt-24 pb-16 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Ticker Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <NotificationTicker />
        </motion.div>

        {/* Subtitle Animation */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 0.9, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base font-semibold tracking-[0.2em] text-cyan-400 uppercase mb-6"
        >
          INDIAN SOCIETY FOR TECHNICAL EDUCATION JEC STUDENTS CHAPTER
        </motion.h2>

        {/* Main Title Animation */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black tracking-tight mb-8"
        >
          Build the Future<br />
          at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">JEC.</span>
        </motion.h1>
        
        {/* Paragraph Animation */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          The official ISTE Student Chapter. We don't just talk about technology; we
          build it. Join a community of developers, designers, and innovators.
        </motion.p>
        
        {/* Buttons Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
        >
          <Link href="/community" className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            Join the Community <ArrowRight size={18} />
          </Link>
          
          <Link href="/projects" className="flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all">
            Explore Live Projects
          </Link>
        </motion.div>

      </div>
    </main>
  );
}