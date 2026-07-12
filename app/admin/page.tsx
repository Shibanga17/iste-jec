"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '../../lib/firebase'; 
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Rocket, CheckCircle2, Megaphone, FileText, Trash2, Link as LinkIcon, Edit2, X, ShieldAlert, LogOut } from 'lucide-react';
import Link from 'next/link';

// Import the background component
import PCBBackground from '../components/PCBBackground';

const subjectsMap: Record<string, string[]> = {
  'CSE': [
    'Object Oriented Programming (OOP)', 'Digital Systems', 'Data Structure and Algorithms (DSA)', 
    'Basics of Signals and Systems', 'Computer Organization & Architecture (COA)', 'Operating Systems (OS)', 
    'JAVA Programming', 'Graph Theory', 'Database Management System (DBMS)', 'Design and Analysis of Algorithm (DAA)', 
    'Theory Of Computation (TOC / FLAT)', 'Microcontrollers and Applications', 'Compiler Design', 
    'Computer Network', 'Software Engineering', 'Data Mining', 'Image Processing'
  ],
  'ECE': ['Analog Electronics', 'Digital Logic', 'Signals and Systems', 'Microprocessors'],
  'EE': [
    'Network Theory', 'Analog Electronics', 'Electrical Machines - I', 'Electromagnetic Fields', 'Digital Electronics', 
    'Electrical Machines - II', 'Power Systems - I', 'Electrical & Electronic Measurements', 'Power Systems - II', 
    'Control Systems', 'Microprocessors & Microcontrollers', 'Signals and Systems', 'Power Electronics', 
    'Switchgear and Protection', 'Electric Drives', 'High Voltage Engineering', 'Renewable Energy Sources'
  ],
  'IE': [
    'Analog Electronics', 'Electrical Measurements', 'Network Theory', 'Transducers and Sensors', 'Digital Electronics', 
    'Industrial Instrumentation - I', 'Control Systems', 'Signal & Systems', 'Microprocessors & Microcontrollers', 
    'Industrial Instrumentation - II', 'Analytical Instrumentation', 'Optoelectronics', 'Process Control', 
    'Biomedical Instrumentation', 'Digital Signal Processing', 'Distributed Control Systems (DCS)', 'Virtual Instrumentation'
  ],
  'ME': ['Thermodynamics', 'Fluid Mechanics', 'Machine Design'],
  'Civil': [
    'Surveying & Geomatics', 'Solid Mechanics', 'Building Materials & Construction', 'Engineering Geology', 'Fluid Mechanics', 
    'Structural Analysis - I', 'Geotechnical Engineering - I', 'Environmental Engineering - I', 'Concrete Technology', 
    'Design of RC Structures', 'Structural Analysis - II', 'Geotechnical Engineering - II', 'Transportation Engineering - I', 
    'Hydrology & Water Resources', 'Design of Steel Structures', 'Transportation Engineering - II', 'Environmental Engineering - II', 
    'Estimation, Costing & Valuation', 'Construction Planning & Management', 'Irrigation Engineering'
  ],
  'Economics / Open Elective': ['Microeconomics', 'Public Finance', 'Environmental Economics'],
  'First Year': ['Engineering Physics', 'Engineering Chemistry', 'Engineering Math', 'Basic Electrical']
};

export default function AdminDashboard() {
  const router = useRouter();

  // --- AUTHENTICATION STATE ---
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [activeTab, setActiveTab] = useState('events');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Events State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('Workshop');
  const [existingEvents, setExistingEvents] = useState<any[]>([]);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Announcements State
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annLink, setAnnLink] = useState('');
  const [existingAnnouncements, setExistingAnnouncements] = useState<any[]>([]);
  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);

  // Resources State
  const [resTitle, setResTitle] = useState('');
  const [resBranch, setResBranch] = useState('CSE');
  const [resSubject, setResSubject] = useState(subjectsMap['CSE'][0]);
  const [resType, setResType] = useState('Notes'); 
  const [resLink, setResLink] = useState(''); 
  const [existingResources, setExistingResources] = useState<any[]>([]);

  useEffect(() => {
    setResSubject(subjectsMap[resBranch]?.[0] || '');
  }, [resBranch]);

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // --- SECURITY LOCK EFFECT ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // INTRUDER ALERT: Not logged in. Kick them to the login page.
        router.push('/login');
      } else {
        // AUTHORIZED: Allow access and stop the loading screen.
        setUser(currentUser);
        setIsCheckingAuth(false);
      }
    });
    
    return () => unsubscribe();
  }, [router]);

  // --- LOGOUT FUNCTION ---
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  // --- EVENTS ---
  const fetchEvents = async () => {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setExistingEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingEventId) {
        await updateDoc(doc(db, 'events', editingEventId), {
          title, date, time, location, description, type: eventType
        });
        triggerSuccess('Event updated successfully!');
        setEditingEventId(null);
      } else {
        await addDoc(collection(db, 'events'), {
          title, date, time, location, description, type: eventType, createdAt: new Date()
        });
        triggerSuccess('Event published to timeline!');
      }
      setTitle(''); setDate(''); setTime(''); setLocation(''); setDescription('');
      fetchEvents();
    } catch (error) {
      alert("Failed to save event.");
    } finally { setIsSubmitting(false); }
  };

  const handleEditEvent = (evt: any) => {
    setEditingEventId(evt.id);
    setTitle(evt.title); setDate(evt.date); setTime(evt.time);
    setLocation(evt.location); setDescription(evt.description); setEventType(evt.type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEventEdit = () => {
    setEditingEventId(null);
    setTitle(''); setDate(''); setTime(''); setLocation(''); setDescription('');
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await deleteDoc(doc(db, 'events', id));
      fetchEvents();
    }
  };

  // --- ANNOUNCEMENTS ---
  const fetchAnnouncements = async () => {
    const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setExistingAnnouncements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingAnnId) {
        await updateDoc(doc(db, 'announcements', editingAnnId), {
          title: annTitle, content: annContent, link: annLink
        });
        triggerSuccess('Announcement updated!');
        setEditingAnnId(null);
      } else {
        await addDoc(collection(db, 'announcements'), {
          title: annTitle, content: annContent, link: annLink, createdAt: new Date()
        });
        triggerSuccess('Announcement blasted to homepage!');
      }
      setAnnTitle(''); setAnnContent(''); setAnnLink('');
      fetchAnnouncements();
    } catch (error) {
      alert("Failed to save announcement.");
    } finally { setIsSubmitting(false); }
  };

  const handleEditAnnouncement = (ann: any) => {
    setEditingAnnId(ann.id);
    setAnnTitle(ann.title); setAnnContent(ann.content); setAnnLink(ann.link || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelAnnEdit = () => {
    setEditingAnnId(null);
    setAnnTitle(''); setAnnContent(''); setAnnLink('');
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      await deleteDoc(doc(db, 'announcements', id));
      fetchAnnouncements();
    }
  };

  // --- RESOURCES ---
  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'resources'), {
        title: resTitle, subjectName: resSubject, branch: resBranch, type: resType, fileLink: resLink, createdAt: new Date()
      });
      triggerSuccess('Resource linked to the Knowledge Vault!');
      setResTitle(''); setResLink(''); 
      fetchResources();
    } catch (error) {
      alert("Failed to save resource link.");
    } finally { setIsSubmitting(false); }
  };

  const fetchResources = async () => {
    const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setExistingResources(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDeleteResource = async (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      await deleteDoc(doc(db, 'resources', id));
      fetchResources();
    }
  };

  // Load appropriate data when tabs change
  useEffect(() => {
    if (activeTab === 'events') fetchEvents();
    if (activeTab === 'resources') fetchResources();
    if (activeTab === 'announcements') fetchAnnouncements();
  }, [activeTab]);

  // --- INTERCEPTOR SCREEN ---
  // Renders while verifying authentication state to prevent UI flashes
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#040814] flex flex-col items-center justify-center text-cyan-400 font-mono text-sm relative overflow-hidden">
        <PCBBackground />
        <div className="relative z-10 flex flex-col items-center bg-[#0b1021]/80 backdrop-blur-md p-8 rounded-2xl border border-blue-500/20 shadow-[0_0_40px_rgba(37,99,235,0.1)]">
          <ShieldAlert size={48} className="mb-4 animate-pulse text-blue-500" />
          <p className="tracking-widest">VERIFYING SECURE CONNECTION...</p>
        </div>
      </div>
    );
  }

  // --- AUTHORIZED RENDER ---
  return (
    <main className="min-h-screen bg-[#040814] text-white relative overflow-hidden p-6 md:p-12">
      
      {/* Backgrounds */}
      <PCBBackground />
      <div className="absolute top-32 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto pt-20 relative z-10">
        
        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Command Center</h1>
            <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><CheckCircle2 size={12}/> Secure Auth Active</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm hover:bg-slate-800 transition-colors flex items-center">
              View Live Site
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-hide">
          <button onClick={() => setActiveTab('events')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'events' ? 'bg-blue-600' : 'text-slate-400'}`}><Rocket size={16} /> Events</button>
          <button onClick={() => setActiveTab('announcements')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'announcements' ? 'bg-blue-600' : 'text-slate-400'}`}><Megaphone size={16} /> Announcements</button>
          <button onClick={() => setActiveTab('resources')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'resources' ? 'bg-blue-600' : 'text-slate-400'}`}><FileText size={16} /> Resources</button>
        </div>

        {successMsg && <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl flex items-center gap-3"><CheckCircle2 size={20} />{successMsg}</div>}

        {/* --- EVENTS TAB --- */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            <div className={`bg-[#0b1021]/90 backdrop-blur-sm border ${editingEventId ? 'border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]' : 'border-slate-800'} rounded-2xl p-6 shadow-xl transition-all`}>
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-semibold">{editingEventId ? 'Edit Event' : 'Publish New Event'}</h2>
                 {editingEventId && <button onClick={cancelEventEdit} className="text-slate-400 hover:text-white flex items-center gap-1 text-sm"><X size={16}/> Cancel Edit</button>}
               </div>
               <form onSubmit={handleEventSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-slate-400">Event Title</label>
                    <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Date</label>
                    <input type="date" required value={date} onChange={(e) => setDate(e.target.value)}  className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none focus:border-blue-500 [color-scheme:dark]"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Time</label>
                    <input type="time" required value={time} onChange={(e) => setTime(e.target.value)}  className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none focus:border-blue-500 [color-scheme:dark]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Location</label>
                    <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Type</label>
                    <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none focus:border-blue-500">
                      <option>Workshop</option><option>Tech Talk</option><option>Hackathon</option><option>Build Session</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Description</label>
                  <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none resize-none focus:border-blue-500" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : (editingEventId ? 'Update Event' : 'Publish Event')}
                </button>
              </form>
            </div>

            <div className="bg-[#0b1021]/90 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-6">Manage Events</h2>
              <div className="space-y-3">
                {existingEvents.length === 0 ? (
                  <p className="text-slate-500 text-sm">No events published yet.</p>
                ) : (
                  existingEvents.map((evt) => (
                    <div key={evt.id} className="flex justify-between items-center bg-[#040814] border border-slate-800 p-4 rounded-xl hover:border-slate-700">
                      <div>
                        <h3 className="font-semibold text-white">{evt.title} <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded ml-2">{evt.type}</span></h3>
                        <p className="text-sm text-slate-400">{evt.date} | {evt.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditEvent(evt)} className="p-2 text-slate-500 hover:text-blue-400 transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDeleteEvent(evt.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- ANNOUNCEMENTS TAB --- */}
        {activeTab === 'announcements' && (
          <div className="space-y-8">
            <div className={`bg-[#0b1021]/90 backdrop-blur-sm border ${editingAnnId ? 'border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]' : 'border-slate-800'} rounded-2xl p-6 shadow-xl transition-all`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">{editingAnnId ? 'Edit Announcement' : 'Blast an Announcement'}</h2>
                {editingAnnId && <button onClick={cancelAnnEdit} className="text-slate-400 hover:text-white flex items-center gap-1 text-sm"><X size={16}/> Cancel Edit</button>}
              </div>
              <form onSubmit={handleAnnouncementSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Announcement Title</label>
                    <input type="text" required value={annTitle} onChange={(e) => setAnnTitle(e.target.value)} className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Short Description</label>
                    <textarea required value={annContent} onChange={(e) => setAnnContent(e.target.value)} rows={2} className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none resize-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 flex items-center gap-2"><LinkIcon size={14}/> Document or Website Link (Optional)</label>
                    <input type="url" value={annLink} onChange={(e) => setAnnLink(e.target.value)} placeholder="https://..." className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none focus:border-blue-500" />
                  </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : (editingAnnId ? 'Update Announcement' : 'Post Announcement')}
                </button>
              </form>
            </div>

            <div className="bg-[#0b1021]/90 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-6">Manage Announcements</h2>
              <div className="space-y-3">
                {existingAnnouncements.length === 0 ? (
                  <p className="text-slate-500 text-sm">No announcements posted yet.</p>
                ) : (
                  existingAnnouncements.map((ann) => (
                    <div key={ann.id} className="flex justify-between items-center bg-[#040814] border border-slate-800 p-4 rounded-xl hover:border-slate-700">
                      <div>
                        <h3 className="font-semibold text-white">{ann.title}</h3>
                        <p className="text-sm text-slate-400 line-clamp-1">{ann.content}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditAnnouncement(ann)} className="p-2 text-slate-500 hover:text-blue-400 transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDeleteAnnouncement(ann.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- RESOURCES TAB --- */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="bg-[#0b1021]/90 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-6">Add to Knowledge Vault</h2>
              <form onSubmit={handleResourceSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm text-slate-400">Document/Playlist Title</label>
                      <input type="text" required value={resTitle} onChange={(e) => setResTitle(e.target.value)} placeholder="e.g. 2025 Mid-Sem Solutions" className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none focus:border-blue-500" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-slate-400">Branch</label>
                      <select value={resBranch} onChange={(e) => setResBranch(e.target.value)} className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none focus:border-blue-500">
                        {Object.keys(subjectsMap).map(branch => (
                          <option key={branch} value={branch}>{branch}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-slate-400">Subject Name</label>
                      <select value={resSubject} onChange={(e) => setResSubject(e.target.value)} className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none focus:border-blue-500">
                        {subjectsMap[resBranch]?.map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm text-slate-400">Type</label>
                      <select value={resType} onChange={(e) => setResType(e.target.value)} className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none focus:border-blue-500">
                        <option>Notes</option><option>PYQ</option><option>Playlist</option>
                      </select>
                    </div>

                    <div className="space-y-2 md:col-span-2 border border-slate-800 p-4 rounded-xl bg-[#040814]/50">
                      <label className="text-sm text-slate-400 flex items-center gap-2"><LinkIcon size={14}/> URL Link</label>
                      <input type="url" required value={resLink} onChange={(e) => setResLink(e.target.value)} placeholder={resType === 'Playlist' ? "https://youtube.com/playlist?..." : "https://drive.google.com/..."} className="w-full bg-[#040814] border border-slate-800 rounded-xl p-3 outline-none mt-2 focus:border-blue-500" />
                    </div>

                  </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50">
                  {isSubmitting ? 'Linking to Secure Vault...' : 'Add Resource'}
                </button>
              </form>
            </div>

            <div className="bg-[#0b1021]/90 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-6">Manage Resources</h2>
              <div className="space-y-3">
                {existingResources.length === 0 ? (
                  <p className="text-slate-500 text-sm">No resources linked yet.</p>
                ) : (
                  existingResources.map((res) => (
                     <div key={res.id} className="flex justify-between items-center bg-[#040814] border border-slate-800 p-4 rounded-xl hover:border-slate-700">
                      <div>
                        <h3 className="font-semibold text-white">{res.title} <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded ml-2">{res.type}</span></h3>
                        <p className="text-sm text-slate-400">{res.branch} - {res.subjectName}</p>
                      </div>
                      <button onClick={() => handleDeleteResource(res.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}