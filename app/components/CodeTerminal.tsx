"use client";
import { useState, useEffect } from 'react';

export default function CodeTerminal() {
  const [displayedText, setDisplayedText] = useState("");
  
  const codeString = `class ISTE_JEC {
    val status = "Online"
    val domains = listOf("Hardware", "App Dev", "Prototyping")
    
    fun bootSystem() {
        println("Connecting to mesh network...")
        Hardware.initialize()
        buildFuture()
    }
}`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(codeString.slice(0, index));
      index++;
      if (index > codeString.length) {
        clearInterval(interval);
      }
    }, 40);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0d1117] rounded-xl border border-slate-800 overflow-hidden shadow-2xl my-8">
      {/* Header Bar */}
      <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-[#161b22]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs text-slate-500 font-mono">system_init.kt</div>
      </div>

      {/* Code Canvas */}
      <div className="p-6 text-sm md:text-base font-mono text-slate-300 overflow-x-auto">
        <pre className="whitespace-pre-wrap text-left">
          <code>{displayedText}</code>
          <span className="animate-pulse bg-cyan-400 w-2 h-4 inline-block ml-1 align-middle"></span>
        </pre>
      </div>
    </div>
  );
}