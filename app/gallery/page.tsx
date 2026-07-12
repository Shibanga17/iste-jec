"use client";

import Navbar from '../components/navbar';
import Image from 'next/image';
import { Camera, Sparkles, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GalleryPage() {
  const galleryItems = [
    { id: 1, title: "BOT MAKING WORKSHOP", category: "workshop", date: "March 2026", src: "/btmaking8.jpeg" },
    { id: 2, title: "BOT MAKING WORKSHOP", category: "workshop", date: "February 2026", src: "/btmaking4.jpeg" },
    { id: 3, title: "BOT MAKING WORKSHOP", category: "workshop", date: "January 2026", src: "/btmaking2.jpeg" },
    { id: 4, title: "BOT MAKING WORKSHOP", category: "workshop", date: "December 2025", src: "/bot_making1.jpeg" },
    { id: 5, title: "BOT MAKING WORKSHOP", category: "workshop", date: "November 2025", src: "/btmaking5.jpeg" },
    { id: 6, title: "BOT MAKING WORKSHOP", category: "workshop", date: "October 2025", src: "/btmaking6.jpeg" },
    { id: 7, title: "BOT MAKING WORKSHOP", category: "workshop", date: "October 2025", src: "/btmaking7.jpeg" },
    { id: 8, title: "BOT MAKING WORKSHOP", category: "workshop", date: "October 2025", src: "/btmakin3.jpeg" },
    { id: 9, title: "BOT MAKING WORKSHOP", category: "workshop", date: "October 2025", src: "/result.jpeg" },
    { id: 10, title: "QUIZ COMPETITION", category: "Events", date: "October 2025", src: "/quiz1.jpeg" },
    { id: 11, title: "QUIZ COMPETITION", category: "Events", date: "October 2025", src: "/quiz2.jpeg" }
  ];

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
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-sm mb-6 text-cyan-400">
            <Sparkles size={16} /> Capturing the Moments
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Gallery</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Take a look at the events, workshops, and behind-the-scenes moments that make the ISTE JEC community so special.
          </p>
        </motion.div>

        {/* Masonry-Style Image Grid with Staggered Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.15 }} // Creates a staggered 1-2-3 left-to-right effect
              className="group relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer"
            >
              {item.src ? (
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 group-hover:text-blue-500/30 transition-colors duration-500">
                  <Camera size={48} strokeWidth={1.5} className="mb-3" />
                  <span className="text-sm font-medium tracking-widest uppercase opacity-50">Image Missing</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/20 text-xs font-bold rounded-lg mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <div className="flex items-center text-slate-300 text-sm gap-2">
                    <Calendar size={14} className="text-cyan-400" />
                    {item.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}