"use client";

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function NotificationTicker() {
  const [event, setEvent] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch the latest event from Firebase
  useEffect(() => {
    setIsMounted(true);

    const fetchLatestEvent = async () => {
      try {
        // Query the events collection, sorting by newest created first
        const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          setIsLoading(false);
          return; // No events found, it will remain null
        }

        const now = new Date().getTime();
        let upcomingEvent = null;
        let targetTime = 0;

        // Look through the events to find one that is in the future
        for (const doc of snapshot.docs) {
          const data = doc.data();
          // Combine the Admin date and time inputs into a format JS can read 
          // Example: "Oct 24, 2026" + " " + "2:00 PM"
          const eventDateStr = `${data.date} ${data.time}`;
          const eventDate = new Date(eventDateStr);
          
          if (!isNaN(eventDate.getTime()) && eventDate.getTime() > now) {
            upcomingEvent = data;
            targetTime = eventDate.getTime();
            break; // We found the closest future event!
          }
        }

        // If a future event is found, set it with its target time. 
        // If not, just show the most recently posted event as a fallback.
        if (upcomingEvent) {
          setEvent({ ...upcomingEvent, targetTime });
        } else if (snapshot.docs.length > 0) {
          setEvent(snapshot.docs[0].data());
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching live event:", error);
        setIsLoading(false);
      }
    };

    fetchLatestEvent();
  }, []);

  // 2. Run the Countdown Timer
  useEffect(() => {
    // Stop if there is no event, or if the event doesn't have a future target time
    if (!event || !event.targetTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = event.targetTime - now;

      // If the event has started, clear timer and show LIVE
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("LIVE");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If it's more than a day away, show Days and Hours. Otherwise, show HH:MM:SS
      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`);
      } else {
        const formatted = 
          String(hours).padStart(2, '0') + ':' +
          String(minutes).padStart(2, '0') + ':' +
          String(seconds).padStart(2, '0');
        setTimeLeft(formatted);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  // If component hasn't mounted, is loading, or there are NO events, return null (hides the ticker entirely)
  if (!isMounted || isLoading || !event) return null;

  return (
    <Link 
      href="/events" 
      className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-slate-800 bg-[#0a0f1e] hover:bg-slate-800/80 transition-all cursor-pointer backdrop-blur-sm group"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.8)]"></span>
      
      <span className="text-sm font-medium text-slate-200 truncate max-w-[200px] md:max-w-xs">
        Next: {event.title}
      </span>
      
      <span className="text-slate-700 text-sm">|</span>
      
      <span className="text-sm font-mono text-blue-500 font-medium tracking-wider">
        {timeLeft === "LIVE" ? (
          "LIVE NOW"
        ) : timeLeft ? (
          `T-${timeLeft}`
        ) : (
          event.date // Fallback: If it can't calculate time, just show the date
        )}
      </span>
      
      <ChevronRight size={16} className="text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}