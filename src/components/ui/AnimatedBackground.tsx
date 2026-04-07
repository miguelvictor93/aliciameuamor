"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Cloud = ({ style, duration }: { style: React.CSSProperties; duration: string }) => (
  <div
    className="absolute bg-white/40 rounded-full animate-cloud-move"
    style={{ ...style, animationDuration: duration }}
  />
);

const Sparkle = ({ style, duration }: { style: React.CSSProperties; duration: string }) => (
    <div
      className="absolute text-brand-gold-light animate-twinkle text-2xl"
      style={{ ...style, animationDuration: duration }}
    >
      ✨
    </div>
);

const AnimatedBackground = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

  const clouds = [
    { style: { width: "200px", height: "60px", top: "10%", left: "-200px" }, duration: "35s" },
    { style: { width: "150px", height: "45px", top: "25%", left: "-200px", animationDelay: "5s" }, duration: "45s" },
    { style: { width: "250px", height: "70px", top: "50%", left: "-250px", animationDelay: "2s" }, duration: "30s" },
    { style: { width: "180px", height: "50px", top: "70%", left: "-180px", animationDelay: "8s" }, duration: "50s" },
    { style: { width: "220px", height: "65px", top: "85%", left: "-220px", animationDelay: "12s" }, duration: "40s" },
    { style: { width: "120px", height: "40px", top: "5%", left: "-120px", animationDelay: "15s" }, duration: "60s" },
  ];
  
  const sparkles = Array.from({ length: 15 }).map((_, i) => ({
      style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `scale(${Math.random() * 0.5 + 0.5})`,
      },
      duration: `${Math.random() * 2 + 3}s`
  }));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <div
        className="absolute top-[-25%] left-[50%] translate-x-[-50%] w-[150vw] h-[150vw] max-w-[1000px] max-h-[1000px] bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-full animate-pulsate opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,182,193,0.4) 30%, rgba(216,191,216,0.3) 60%, rgba(173,216,230,0) 70%)'}}
      />
      {clouds.map((cloud, i) => <Cloud key={i} {...cloud} />)}
      {sparkles.map((sparkle, i) => <Sparkle key={i} {...sparkle} />)}
    </div>
  );
};

export default AnimatedBackground;
