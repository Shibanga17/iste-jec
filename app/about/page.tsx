"use client";

import Navbar from '../components/navbar';
import PCBBackground from '../components/PCBBackground'; // <-- Added Import
import { Target, Lightbulb, Rocket, Users, Cpu, Code, Sparkles, Mail } from 'lucide-react';
import { motion } from 'framer-motion'; 

export default function AboutPage() {
  const pillars = [
    {
      icon: <Code size={32} className="text-blue-400" />,
      title: "Technical Workshops",
      description: "Hands-on sessions covering everything from web development and Android app creation to IoT and embedded systems."
    },
    {
      icon: <Rocket size={32} className="text-cyan-400" />,
      title: "Hackathons & Ideathons",
      description: "Intense, collaborative events where students build innovative solutions to real-world problems under a time crunch."
    },
    {
      icon: <Cpu size={32} className="text-blue-400" />,
      title: "Project Building",
      description: "Fostering a culture of learning by doing. We help members transition from theoretical concepts to working prototypes."
    },
    {
      icon: <Users size={32} className="text-cyan-400" />,
      title: "Community Growth",
      description: "A strong network of peers, seniors, and alumni who share knowledge, provide mentorship, and grow together."
    }
  ];

  return (
    <main className="min-h-screen bg-[#040814] text-white overflow-hidden relative">
      <Navbar />

      {/* 1. The Animated Hardware Traces */}
      <PCBBackground />

      {/* 2. Background Glows */}
      <div className="absolute top-32 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 3. Main Content Wrapper (z-10 keeps it above the traces) */}
      <div className="max-w-6xl mx-auto pt-32 pb-20 px-6 relative z-10">
        
        {/* Hero Section - Animates on Load */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-sm mb-6 text-cyan-400">
            <Sparkles size={16} /> Empowering Future Engineers
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ISTE JEC</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            The Indian Society for Technical Education (ISTE) Students' Chapter at Jorhat Engineering College is a premier technical society dedicated to advancing the technical and professional skills of engineering students.
          </p>
        </motion.div>

        {/* History Section - Animates when scrolled into view */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="bg-[#0b1021]/80 border border-slate-800 rounded-3xl p-8 md:p-12 mb-16 backdrop-blur-md relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
            <span className="w-10 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></span>
            Our Legacy & Objective
          </h2>
          <div className="space-y-6 relative z-10">
            <p className="text-slate-300 text-lg leading-relaxed">
              The Indian Society for Technical Education is a national, professional, non-profit making Society registered under the Societies Registration Act of 1860...
            </p>
            <div className="p-6 bg-blue-950/30 border border-blue-900/50 rounded-2xl">
              <p className="text-cyan-50 text-lg leading-relaxed font-medium">
                The major objective of the ISTE student’s chapter is to provide guidance and training to students to develop better learning skills and personality.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Faculty Advisors - Animates on scroll */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-white">Faculty Advisors</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-700 to-transparent"></div>
          </div>
          <div className="bg-[#0b1021]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-8 hover:bg-[#0b1021] hover:border-slate-700 transition-all duration-300 w-full">
            <h3 className="text-2xl font-bold text-white mb-1">Dr. Diganta Hatibaruah</h3>
            <p className="text-blue-400 font-medium mb-3">Professor</p>
            <p className="text-slate-300 mb-6">Mechanical Engineering Department</p>
            <a href="mailto:dhbaruah@jecassam.ac.in" className="inline-flex items-center gap-2 px-4 py-2 bg-[#040814] border border-slate-800 rounded-lg text-sm text-slate-300 hover:text-white hover:border-blue-500/50 transition-all">
              <Mail size={16} className="text-cyan-400" /> Email – dhbaruah@jecassam.ac.in
            </a>
          </div>
        </motion.div>

        {/* Mission and Vision - Staggered Slide Up */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative p-8 md:p-10 bg-[#0b1021]/80 backdrop-blur-md border border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
              <Target size={32} className="text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed">To cultivate a vibrant ecosystem of technological innovation and skill development...</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative p-8 md:p-10 bg-[#0b1021]/80 backdrop-blur-md border border-slate-800 rounded-3xl hover:border-cyan-500/50 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20">
              <Lightbulb size={32} className="text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Our Vision</h2>
            <p className="text-slate-400 leading-relaxed">To be the leading catalyst for technical excellence at Jorhat Engineering College...</p>
          </motion.div>
        </div>

      </div>
    </main>
  );
}