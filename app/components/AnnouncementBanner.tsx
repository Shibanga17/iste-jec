"use client";

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Megaphone, ExternalLink } from 'lucide-react';

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setAnnouncements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  // If there are no announcements, the banner hides itself completely
  if (announcements.length === 0) return null;

  return (
    <div className="w-full bg-blue-600 border-b border-blue-500 overflow-hidden flex items-center relative z-40">
      
      {/* Custom Styles for the Infinite Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 25s linear infinite;
          will-change: transform;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Static "Latest Updates" Badge on the left */}
      <div className="absolute left-0 top-0 bottom-0 bg-blue-800 px-4 md:px-6 flex items-center gap-2 z-10 shadow-[10px_0_20px_rgba(30,64,175,1)]">
        <Megaphone size={18} className="text-white animate-pulse shrink-0" />
        <span className="font-bold text-white text-xs md:text-sm tracking-wider uppercase whitespace-nowrap">
          Latest Updates
        </span>
      </div>

      {/* Scrolling Content */}
      <div className="flex-1 overflow-hidden py-2.5 ml-[140px] md:ml-[180px]">
        <div className="animate-marquee whitespace-nowrap flex items-center cursor-default">
          {announcements.map((ann, index) => (
            <div key={ann.id} className="flex items-center text-white text-sm">
              <span className="font-semibold text-cyan-200">{ann.title}:</span>
              <span className="ml-2">{ann.content}</span>
              
              {/* Only render the link if the admin actually provided one */}
              {ann.link && (
                <a href={ann.link} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center text-cyan-300 hover:text-white transition-colors underline underline-offset-2">
                  Link <ExternalLink size={12} className="ml-1" />
                </a>
              )}
              
              {/* Divider dot between announcements */}
              {index !== announcements.length - 1 && (
                <span className="mx-8 text-blue-400">●</span>
              )}
            </div>
          ))}
          {/* Invisible padding at the end so it doesn't jump instantly */}
          <div className="pr-[100vw]"></div>
        </div>
      </div>
    </div>
  );
}