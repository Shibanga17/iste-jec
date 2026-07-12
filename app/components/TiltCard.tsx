"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (max tilt is 15 degrees)
    const rX = ((mouseY / height) - 0.5) * -15;
    const rY = ((mouseX / width) - 0.5) * 15;
    
    setRotateX(rX);
    setRotateY(rY);
    
    // Calculate glare position
    setGlare({ x: (mouseX / width) * 100, y: (mouseY / height) * 100, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="relative w-full h-full"
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        {/* The dynamic glare effect */}
        <div 
          className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`
          }}
        />
        {/* The actual content of the card */}
        <div style={{ transform: "translateZ(30px)" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}