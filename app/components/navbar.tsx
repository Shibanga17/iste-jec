"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Resources', path: '/resources' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Team', path: '/team' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-[#040814] to-[#040814]/80 backdrop-blur-md border-b border-slate-800/50">
      
      {/* Main Navbar Container */}
      <div className="px-6 py-4 flex items-center justify-between relative z-50">
        
        {/* 1. Logo Area */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 ring-2 ring-slate-800">
              <Image 
                src="/iste-logo.jpeg" 
                alt="ISTE Logo" 
                width={40} 
                height={40} 
                className="object-cover w-full h-full" 
              />
            </div>
            <span className="font-bold text-xl tracking-wide text-white hidden sm:block">
              ISTE<span className="text-blue-500">JEC</span>
            </span>
          </Link>
        </div>

        {/* 2. Desktop Navigation (Pill Shape) */}
        <div className="hidden lg:flex flex-none items-center gap-8 px-8 py-3 rounded-full border border-slate-700/80 bg-[#0a0f1e]/90 shadow-lg">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === link.path ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-slate-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. Actions Area (Login Button & Mobile Toggle) */}
        <div className="flex-1 flex justify-end items-center gap-4">
          
          {/* Desktop Login Button */}
          <Link 
            href="/login" 
            className="hidden md:flex items-center justify-center px-6 py-2.5 rounded-full border border-slate-700 bg-slate-900/80 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Member Login
          </Link>
          
          {/* Mobile Hamburger Button */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 4. Mobile Menu Dropdown (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#0a0f1e]/95 backdrop-blur-xl border-b border-slate-800 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors py-2 border-b border-slate-800/50 ${
                    pathname === link.path ? 'text-blue-400' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Login Button */}
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="mt-4 flex items-center justify-center py-3.5 rounded-xl border border-slate-700 bg-blue-600/10 text-base font-semibold text-blue-400 hover:bg-blue-600/20 transition-colors"
              >
                Member Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}