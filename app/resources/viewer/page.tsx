"use client";

import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Maximize, Minimize } from 'lucide-react';

export default function DocumentViewer({ 
  searchParams 
}: { 
  searchParams: Promise<{ file?: string, title?: string }> 
}) {
  
  const resolvedParams = use(searchParams);
  const fileUrl = resolvedParams.file || '/pdfs/sample.pdf';
  const docTitle = resolvedParams.title || 'Study Material';

  // 1. We create a 'ref' to target ONLY the PDF container
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // 2. We trigger fullscreen ONLY on the container, not the whole page!
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      pdfContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans pt-28 pb-8 px-6 flex flex-col h-screen">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Viewer Header (This gets hidden during fullscreen) */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          
          <div className="flex items-center gap-4">
            <Link 
              href="javascript:history.back()" 
              className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <FileText size={24} className="text-blue-400" />
                {docTitle}
              </h1>
              <p className="text-slate-500 text-sm">ISTE JEC Knowledge Vault</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Standard Fullscreen Button */}
            <button 
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all shadow-sm"
            >
              <Maximize size={18} className="text-blue-400" />
              <span className="text-sm font-medium hidden sm:block">
                Full Screen
              </span>
            </button>
            <div className="hidden sm:block px-3 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-xl uppercase tracking-wider">
              View Only
            </div>
          </div>

        </div>

        {/* 3. The PDF Container (This is what goes fullscreen!) */}
        <div 
          ref={pdfContainerRef} 
          className="flex-1 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative"
        >
          <iframe 
            src={`${fileUrl}#toolbar=0`} 
            className="w-full h-full absolute inset-0 bg-white"
            title={docTitle}
          />
          
          {/* Floating Exit Button: Only shows up when they are IN fullscreen mode */}
          {isFullscreen && (
            <button 
              onClick={toggleFullscreen}
              className="absolute top-4 right-6 flex items-center gap-2 px-4 py-2 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl text-white hover:bg-slate-800 hover:border-slate-600 transition-all shadow-xl z-50"
            >
              <Minimize size={18} className="text-blue-400" />
              <span className="text-sm font-medium">Exit</span>
            </button>
          )}
        </div>

      </div>
    </main>
  );
}