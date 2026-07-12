"use client";

import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import PCBBackground from '../components/PCBBackground'; // <-- Added Import
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Calendar, MapPin, Clock, Sparkles, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-[#040814] text-white overflow-hidden relative pb-20">
      
      {/* Navigation */}
      <Navbar />

      {/* 1. The Animated Hardware Traces */}
      <PCBBackground />

      {/* 2. Background glow effects */}
      <div className="absolute top-32 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 3. Main Content Wrapper (z-10 keeps it above the traces) */}
      <div className="max-w-5xl mx-auto pt-32 px-6 relative z-10">
        
        {/* Header Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-sm mb-6 text-cyan-400">
            <Sparkles size={16} /> Learn & Grow
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Events</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Join our workshops, hackathons, and tech talks. Connect with industry experts and level up your skills.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-slate-900/30 border border-slate-800 rounded-3xl"
          >
            <Rocket size={48} className="mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-300 mb-2">No upcoming events right now</h3>
            <p className="text-slate-500">Check back soon! Our team is planning something awesome.</p>
          </motion.div>
        )}

        {/* Event List with Scroll Animations */}
        <div className="space-y-6">
          {!loading && events.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/20 text-xs font-bold rounded-lg mb-4">
                    {event.type || 'Workshop'}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{event.title}</h2>
                  <p className="text-slate-400 mb-6 line-clamp-2 md:line-clamp-none">{event.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-300">
                    <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                      <Calendar size={16} className="text-cyan-400" /> {event.date}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                      <Clock size={16} className="text-blue-400" /> {event.time}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                      <MapPin size={16} className="text-purple-400" /> {event.location}
                    </div>
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