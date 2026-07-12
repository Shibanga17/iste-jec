import { BookOpen, Trophy, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ResourcesHub() {
  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30 pt-32 pb-20 px-6">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Knowledge</span> Vault.
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Everything you need to survive and thrive at JEC. Curated notes, previous year questions, and ultimate survival guides.
        </p>
      </div>

      {/* Resource Categories Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Active Card: Semester Resources - LINK FIXED HERE */}
        <Link href="/resources/branches" className="group relative p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-xl hover:shadow-blue-500/10 overflow-hidden flex flex-col items-start text-left">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <BookOpen size={120} className="text-blue-500 transform rotate-12" />
          </div>
          
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
            <BookOpen size={28} className="text-blue-400" />
          </div>
          
          <h2 className="text-2xl font-bold mb-3">Semester Resources</h2>
          <p className="text-slate-400 mb-8 relative z-10 leading-relaxed">
            The ultimate academic survival kit. Access organized notes, syllabus breakdowns, and Previous Year Questions (PYQs) for all branches.
          </p>
          
          <div className="mt-auto flex items-center gap-2 text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
            Access Vault <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Locked Card: Competitive Exams (Coming Soon) */}
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
    </main>
  );
}