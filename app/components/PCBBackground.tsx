"use client";

import { motion } from 'framer-motion';

export default function PCBBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        {/* Glow Filter Definition */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Trace 1 - Top Left to Center */}
        <motion.path
          d="M -100 200 H 300 L 450 350 H 700"
          stroke="#22d3ee" // Cyan
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.1] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
        />
        <circle cx="700" cy="350" r="4" fill="#22d3ee" className="animate-pulse" />

        {/* Trace 2 - Bottom Right */}
        <motion.path
          d="M 2020 800 H 1500 L 1350 650 H 1100 L 1000 750 H 800"
          stroke="#2563eb" // Blue
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.1] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        />
        <circle cx="800" cy="750" r="4" fill="#2563eb" className="animate-pulse" />

        {/* Trace 3 - Top Right coming down */}
        <motion.path
          d="M 1600 -100 V 250 L 1500 350 V 550 L 1400 650"
          stroke="#22d3ee"
          strokeWidth="1.5"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.1] }}
          transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
        />
        <circle cx="1400" cy="650" r="3" fill="#22d3ee" className="animate-pulse" />

        {/* Trace 4 - Bottom Left coming up */}
        <motion.path
          d="M 200 1180 V 900 L 350 750 H 500 V 600"
          stroke="#2563eb"
          strokeWidth="1.5"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.1] }}
          transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
        />
        <circle cx="500" cy="600" r="3" fill="#2563eb" className="animate-pulse" />

        {/* --- NEW LINES ADDED BELOW --- */}

        {/* Trace 5 - Middle Left shooting across and up */}
        <motion.path
          d="M -50 500 H 200 L 350 350 H 600 V 200"
          stroke="#2563eb" 
          strokeWidth="1.5"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.1] }}
          transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.5 }}
        />
        <circle cx="600" cy="200" r="3" fill="#2563eb" className="animate-pulse" />

        {/* Trace 6 - Middle Right shooting down and across */}
        <motion.path
          d="M 1950 400 H 1700 L 1600 500 V 700 L 1500 800 H 1200"
          stroke="#22d3ee" 
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.1] }}
          transition={{ duration: 4.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }}
        />
        <circle cx="1200" cy="800" r="4" fill="#22d3ee" className="animate-pulse" />

        {/* Trace 7 - Top Center coming straight down then hooking */}
        <motion.path
          d="M 900 -50 V 150 L 1050 300 V 450 H 1250"
          stroke="#22d3ee" 
          strokeWidth="1.5"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.1] }}
          transition={{ duration: 3.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.8 }}
        />
        <circle cx="1250" cy="450" r="3" fill="#22d3ee" className="animate-pulse" />
        
      </svg>
    </div>
  );
}