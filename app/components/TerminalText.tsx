"use client";

import { useState, useEffect } from 'react';

export default function TerminalText({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const characters = "!<>-_\\/[]{}—=+*^?#________";
    
    // Initial delay before booting
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          // Add a split-second random character glitch before setting the real letter
          setDisplayText(text.substring(0, i) + characters[Math.floor(Math.random() * characters.length)]);
          
          setTimeout(() => {
            setDisplayText(text.substring(0, i + 1));
            i++;
            if (i === text.length) setIsTyping(false);
          }, 30); // Speed of the glitch resolving
        } else {
          clearInterval(interval);
        }
      }, 80); // Speed of the typing
      
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span className="inline-block font-mono font-bold">
      {displayText}
      <span className={`inline-block w-3 h-[1em] ml-1 bg-cyan-400 ${isTyping ? 'opacity-100' : 'animate-pulse'}`}></span>
    </span>
  );
}