"use client";

import Navbar from '../components/navbar';
import { ArrowUpRight, Users, Sparkles } from 'lucide-react';

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#040814] text-white overflow-hidden relative">
      <Navbar />

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto pt-32 pb-20 px-6 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-sm mb-8 text-blue-400">
          <Sparkles size={16} /> Welcome to the Network
        </div>

        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
          Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ISTE JEC</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">
          Whether you want to stay updated on the latest tech events, ask questions, or just hang out with fellow developers, our community is the place to be.
        </p>

        {/* Interactive Social Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          
          {/* WhatsApp Card */}
          <a 
            href="https://chat.whatsapp.com/YOUR_LINK_HERE" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)] overflow-hidden"
          >
            {/* Green gradient glow behind the card on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="w-20 h-20 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {/* Custom WhatsApp SVG */}
              <svg viewBox="0 0 24 24" className="w-10 h-10 fill-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">WhatsApp</h2>
            <p className="text-sm text-slate-400 mb-6 px-4">Join our official group for immediate updates, discussions, and event links.</p>
            
            <div className="mt-auto flex items-center text-emerald-400 font-semibold group-hover:text-emerald-300">
              Join the Group <ArrowUpRight size={18} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </a>

          {/* Instagram Card */}
          <a 
            href="https://www.instagram.com/iste_jec?igsh=aXZtNXg3dDNjYjky" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.3)] overflow-hidden"
          >
            {/* Pink gradient glow behind the card on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500 p-[2px] mb-6 group-hover:scale-110 transition-transform duration-300">
              <div className="w-full h-full bg-[#040814] rounded-[14px] flex items-center justify-center">
                {/* Custom Instagram SVG */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-pink-500 group-hover:text-pink-400 transition-colors">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Instagram</h2>
            <p className="text-sm text-slate-400 mb-6 px-4">Follow us for event photos, behind-the-scenes, and chapter highlights.</p>
            
            <div className="mt-auto flex items-center text-pink-400 font-semibold group-hover:text-pink-300">
              Follow Us <ArrowUpRight size={18} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </a>

        </div>
      </div>
    </main>
  );
}