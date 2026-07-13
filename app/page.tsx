// "use client";

// import Navbar from './components/navbar';
// import NotificationTicker from './components/NotificationTicker';
// import PCBBackground from './components/PCBBackground';
// import { ArrowRight } from 'lucide-react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-[#040814] text-white overflow-hidden relative">
      
//       <Navbar />
      
//       {/* 1. The Animated Hardware Traces */}
//       <PCBBackground />

//       {/* 2. Subtle Background Glows */}
//       <div className="absolute top-32 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
//       <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

//       <div className="relative z-10 pt-24 pb-16 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
        
//         {/* Ticker Animation */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="mb-10"
//         >
//           <NotificationTicker />
//         </motion.div>

//         {/* Subtitle Animation */}
//         <motion.h2 
//           initial={{ opacity: 0, scale: 0.9 }} 
//           animate={{ opacity: 0.9, scale: 1 }} 
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="text-sm md:text-base font-semibold tracking-[0.2em] text-cyan-400 uppercase mb-6"
//         >
//           INDIAN SOCIETY FOR TECHNICAL EDUCATION JEC STUDENTS CHAPTER
//         </motion.h2>

//         {/* Main Title Animation */}
//         <motion.h1 
//           initial={{ opacity: 0, y: 30 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
//           className="text-6xl md:text-8xl font-black tracking-tight mb-8"
//         >
//           Build the Future<br />
//           at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">JEC.</span>
//         </motion.h1>
        
//         {/* Paragraph Animation */}
//         <motion.p 
//           initial={{ opacity: 0, y: 20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.8, delay: 0.5 }}
//           className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
//         >
//           The official ISTE Student Chapter. We don't just talk about technology; we
//           build it. Join a community of developers, designers, and innovators.
//         </motion.p>
        
//         {/* Buttons Animation */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.8, delay: 0.7 }}
//           className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
//         >
//           <Link href="/community" className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]">
//             Join the Community <ArrowRight size={18} />
//           </Link>
          
//           <Link href="/projects" className="flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all">
//             Explore Live Projects
//           </Link>
//         </motion.div>

//       </div>
//     </main>
//   );
// }



"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Target, Lightbulb, Rocket, Users, Cpu, Code, Sparkles, 
  Mail, Calendar, MapPin, Clock, Camera, FolderGit2, Hammer, ArrowUpRight,
  BookOpen, Lock, Trophy
} from 'lucide-react';
import Navbar from './components/navbar';
import NotificationTicker from './components/NotificationTicker';
import PCBBackground from './components/PCBBackground';
import AnnouncementBanner from './components/AnnouncementBanner'; // <-- Added Banner Import
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function Home() {
  // --- STATE FOR EVENTS ---
  const [events, setEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // --- STATE FOR GALLERY (Tap to reveal on mobile) ---
  const [activeGallery, setActiveGallery] = useState<number | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  // --- DATA ARRAYS ---
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
    <main className="min-h-screen bg-[#040814] text-white relative">
      <Navbar />

      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <PCBBackground />
      </div>

      {/* --- ANNOUNCEMENT BANNER --- */}
      <div className="absolute top-[72px] w-full z-40">
        <AnnouncementBanner />
      </div>

      {/* ================= HOME SECTION ================= */}
      <section id="home" className="relative z-10 pt-40 pb-16 px-6 max-w-4xl mx-auto text-center flex flex-col items-center min-h-[90vh] justify-center">
        <div className="absolute top-32 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-[-1]"></div>
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-10">
          <NotificationTicker />
        </motion.div>

        <motion.h2 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 0.9, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-sm md:text-base font-semibold tracking-[0.2em] text-cyan-400 uppercase mb-6">
          INDIAN SOCIETY FOR TECHNICAL EDUCATION JEC STUDENTS CHAPTER
        </motion.h2>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} className="text-6xl md:text-8xl font-black tracking-tight mb-8">
          Build the Future<br /> at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">JEC.</span>
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          The official ISTE Student Chapter. We don't just talk about technology; we build it. Join a community of developers, designers, and innovators.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
          <Link href="#community" className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            Join the Community <ArrowRight size={18} />
          </Link>
          <Link href="#projects" className="flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all">
            Explore Live Projects
          </Link>
        </motion.div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="relative z-10 py-24 px-6 max-w-6xl mx-auto border-t border-slate-800/50">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-20">
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

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="bg-[#0b1021]/80 border border-slate-800 rounded-3xl p-8 md:p-12 mb-16 backdrop-blur-md relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
            <span className="w-10 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></span> Our Legacy & Objective
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

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="group relative p-8 md:p-10 bg-[#0b1021]/80 backdrop-blur-md border border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
              <Target size={32} className="text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed">To cultivate a vibrant ecosystem of technological innovation and skill development...</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="group relative p-8 md:p-10 bg-[#0b1021]/80 backdrop-blur-md border border-slate-800 rounded-3xl hover:border-cyan-500/50 transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20">
              <Lightbulb size={32} className="text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Our Vision</h2>
            <p className="text-slate-400 leading-relaxed">To be the leading catalyst for technical excellence at Jorhat Engineering College...</p>
          </motion.div>
        </div>
      </section>

      {/* ================= EVENTS SECTION ================= */}
      <section id="events" className="relative z-10 py-24 px-6 max-w-5xl mx-auto border-t border-slate-800/50">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Events</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">Join our workshops, hackathons, and tech talks. Connect with industry experts and level up your skills.</p>
        </motion.div>

        {loadingEvents ? (
          <div className="flex justify-center items-center py-20"><div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div></div>
        ) : events.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 bg-slate-900/30 border border-slate-800 rounded-3xl">
            <Rocket size={48} className="mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-300 mb-2">No upcoming events right now</h3>
            <p className="text-slate-500">Check back soon! Our team is planning something awesome.</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {events.map((event, index) => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/20 text-xs font-bold rounded-lg mb-4">{event.type || 'Workshop'}</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{event.title}</h2>
                    <p className="text-slate-400 mb-6 line-clamp-2 md:line-clamp-none">{event.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-300">
                      <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800"><Calendar size={16} className="text-cyan-400" /> {event.date}</div>
                      <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800"><Clock size={16} className="text-blue-400" /> {event.time}</div>
                      <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800"><MapPin size={16} className="text-purple-400" /> {event.location}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ================= RESOURCES SECTION ================= */}
      <section id="resources" className="relative z-10 py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Knowledge</span> Vault.
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Everything you need to survive and thrive at JEC. Curated notes, previous year questions, and ultimate survival guides.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/resources/branches" className="group relative p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-xl hover:shadow-blue-500/10 overflow-hidden flex flex-col items-start text-left">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <BookOpen size={120} className="text-blue-500 transform rotate-12" />
            </div>
            
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
              <BookOpen size={28} className="text-blue-400" />
            </div>
            
            <h2 className="text-2xl font-bold mb-3 text-white">Semester Resources</h2>
            <p className="text-slate-400 mb-8 relative z-10 leading-relaxed">
              The ultimate academic survival kit. Access organized notes, syllabus breakdowns, and Previous Year Questions (PYQs) for all branches.
            </p>
            
            <div className="mt-auto flex items-center gap-2 text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
              Access Vault <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <div className="relative p-8 rounded-3xl bg-slate-900/50 border border-slate-800/50 overflow-hidden flex flex-col items-start text-left opacity-75">
            <div className="absolute top-4 right-4 px-3 py-1 bg-slate-800 rounded-full flex items-center gap-2 text-xs font-medium text-slate-400 border border-slate-700">
              <Lock size={12} /> Coming Soon
            </div>
            
            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 border border-slate-700">
              <Trophy size={28} className="text-slate-500" />
            </div>
            
            <h2 className="text-2xl font-bold mb-3 text-slate-300">Competitive Edge</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Curated roadmaps and interview experiences for GATE, placements, and off-campus tech internships.
            </p>
            
            <div className="mt-auto flex items-center gap-2 text-slate-600 font-medium cursor-not-allowed">
              Currently Locked
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY SECTION ================= */}
      <section id="gallery" className="relative z-10 py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/50">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Gallery</span>
          </h1>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ duration: 0.6, delay: (index % 3) * 0.15 }} 
              className="group relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer"
              onClick={() => setActiveGallery(activeGallery === item.id ? null : item.id)}
            >
              {item.src ? (
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  fill 
                  className={`object-cover transition-transform duration-700 ease-in-out ${activeGallery === item.id ? 'scale-110' : 'group-hover:scale-110'}`} 
                />
              ) : (
                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-colors duration-500 ${activeGallery === item.id ? 'text-blue-500/30' : 'text-slate-700 group-hover:text-blue-500/30'}`}>
                  <Camera size={48} strokeWidth={1.5} className="mb-3" />
                  <span className="text-sm font-medium tracking-widest uppercase opacity-50">Image Missing</span>
                </div>
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/50 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300 ${activeGallery === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <div className={`transition-transform duration-300 ${activeGallery === item.id ? 'translate-y-0' : 'transform translate-y-6 group-hover:translate-y-0'}`}>
                  <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/20 text-xs font-bold rounded-lg mb-3">{item.category}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <div className="flex items-center text-slate-300 text-sm gap-2"><Calendar size={14} className="text-cyan-400" />{item.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section id="projects" className="relative z-10 py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/50">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Projects</span>
          </h1>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-3xl mx-auto">
          <div className="p-10 md:p-16 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20 backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden">
            <FolderGit2 size={200} className="absolute text-slate-800/10 -rotate-12 -right-10 -bottom-10 pointer-events-none" />
            <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 relative z-10">
              <FolderGit2 size={40} className="text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">Building in Stealth Mode</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-10 relative z-10">There are no active projects on display at the moment. Our teams are currently brainstorming, coding, and soldering behind the scenes. Check back soon!</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full relative z-10">
               <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center hover:border-cyan-500/50 transition-colors"><Cpu size={28} className="text-cyan-400 mb-3"/><span className="text-sm text-slate-300 font-semibold tracking-wide uppercase">Hardware & IoT</span></div>
               <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center hover:border-orange-500/50 transition-colors"><Hammer size={28} className="text-orange-400 mb-3"/><span className="text-sm text-slate-300 font-semibold tracking-wide uppercase">Prototyping</span></div>
               <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center hover:border-purple-500/50 transition-colors"><Rocket size={28} className="text-purple-400 mb-3"/><span className="text-sm text-slate-300 font-semibold tracking-wide uppercase">App Dev</span></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= COMMUNITY SECTION ================= */}
      <section id="community" className="relative z-10 py-24 px-6 max-w-4xl mx-auto text-center border-t border-slate-800/50">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
          Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ISTE JEC</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">
          Whether you want to stay updated on the latest tech events, ask questions, or just hang out with fellow developers, our community is the place to be.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <a href="https://chat.whatsapp.com/YOUR_LINK_HERE" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-20 h-20 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg viewBox="0 0 24 24" className="w-10 h-10 fill-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">WhatsApp</h2>
            <div className="mt-auto flex items-center text-emerald-400 font-semibold group-hover:text-emerald-300">Join the Group <ArrowUpRight size={18} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></div>
          </a>
          <a href="https://www.instagram.com/iste_jec?igsh=aXZtNXg3dDNjYjky" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.3)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500 p-[2px] mb-6 group-hover:scale-110 transition-transform duration-300">
              <div className="w-full h-full bg-[#040814] rounded-[14px] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-pink-500 group-hover:text-pink-400 transition-colors"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Instagram</h2>
            <div className="mt-auto flex items-center text-pink-400 font-semibold group-hover:text-pink-300">Follow Us <ArrowUpRight size={18} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></div>
          </a>
        </div>
      </section>

    </main>
  );
}