"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import PCBBackground from "../components/PCBBackground";
import { ShieldCheck, Eye, EyeOff, Lock, Settings, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function LoginPage() {
  // Merged States (Auth + UI toggles)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Your exact Firebase Auth logic
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err: any) {
      setError('Invalid email or password. Access denied.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#040814] flex items-center justify-center relative overflow-hidden p-4">
      
      {/* Background Effects */}
      <PCBBackground />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Login Card Wrapper */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative p-[1.5px] rounded-2xl z-10 w-full max-w-md shadow-[0_0_40px_rgba(37,99,235,0.2)]"
      >
        {/* Glowing Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-600 to-[#040814] rounded-2xl"></div>

        {/* Inner Dark Card */}
        <div className="relative bg-[#0b1021] rounded-[calc(1rem-1.5px)] p-8 md:p-10 flex flex-col items-center text-center">
          
          {/* Top Right Security Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
            <ShieldCheck size={14} className="text-green-400" />
            <span className="text-[10px] font-medium text-green-400 tracking-wide uppercase">Firebase Auth</span>
          </div>

          {/* Logo Area */}
          <div className="w-16 h-16 bg-[#040814] border border-slate-700 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Settings size={32} className="text-white" />
          </div>

          {/* Titles */}
          <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
            ADMIN ACCESS PANEL
          </h1>
          <p className="text-sm text-cyan-400 mb-6">
            Authentication Required for Core Team Management
          </p>

          {/* Firebase Error Message Box */}
          {error && (
            <div className="w-full mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm text-left">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full text-left space-y-5">
            
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 ml-1">Admin Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@istejec.com"
                required
                className="w-full bg-[#040814] border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all [color-scheme:dark]"
              />
            </div>

            {/* Password Input with Toggle */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-medium text-slate-300 ml-1">Access Credentials</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  className="w-full bg-[#040814] border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 rounded-lg pl-4 pr-11 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all [color-scheme:dark]"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                'Authenticating...'
              ) : (
                <>
                  <Lock size={16} />
                  Authorize Secure Login
                </>
              )}
            </button>

          </form>

          {/* Back to Home Link */}
          <Link href="/" className="mt-8 text-xs text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1">
            ← Return to Homepage
          </Link>

        </div>
      </motion.div>
    </main>
  );
}