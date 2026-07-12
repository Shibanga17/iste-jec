"use client";

import { motion } from 'framer-motion';

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#02040a]">
      {/* Container wrapper that forces screen blending for all child light leaks */}
      <div className="absolute inset-0 mix-blend-screen isolate">
        
        {/* --- AURORA BAND 1: EMERALD GLOW --- */}
        {/* Outer Soft Bloom */}
        <motion.div
          animate={{
            x: ["0%", "10%", "-5%", "0%"],
            y: ["0%", "5%", "-8%", "0%"],
            scale: [1, 1.15, 1.05, 1],
            rotate: [0, 5, -3, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[60%] bg-emerald-500/25 rounded-full blur-[160px]"
        />
        {/* Intense Saturated Core */}
        <motion.div
          animate={{
            x: ["0%", "8%", "-4%", "0%"],
            y: ["0%", "4%", "-6%", "0%"],
            scale: [1, 1.1, 1.02, 1],
            rotate: [0, 5, -3, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[5%] w-[50%] h-[35%] bg-emerald-400/40 rounded-full blur-[90px]"
        />


        {/* --- AURORA BAND 2: NEON CYAN/TEAL --- */}
        {/* Outer Soft Bloom */}
        <motion.div
          animate={{
            x: ["0%", "-12%", "8%", "0%"],
            y: ["0%", "-8%", "4%", "0%"],
            scale: [1, 1.2, 0.95, 1],
            rotate: [0, -6, 8, 0],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[-10%] w-[75%] h-[65%] bg-cyan-500/20 rounded-full blur-[160px]"
        />
        {/* Intense Saturated Core */}
        <motion.div
          animate={{
            x: ["0%", "-10%", "6%", "0%"],
            y: ["0%", "-6%", "3%", "0%"],
            scale: [1, 1.15, 0.98, 1],
            rotate: [0, -6, 8, 0],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[5%] w-[45%] h-[40%] bg-cyan-300/45 rounded-full blur-[80px]"
        />


        {/* --- AURORA BAND 3: DEEP COBALT/PURPLE BASE --- */}
        <motion.div
          animate={{
            x: ["0%", "6%", "-8%", "0%"],
            y: ["0%", "-5%", "7%", "0%"],
            scale: [1, 1.08, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] left-[15%] w-[85%] h-[50%] bg-blue-600/30 rounded-full blur-[140px]"
        />

      </div>

      {/* Atmospheric digital grain overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none"></div>
    </div>
  );
}