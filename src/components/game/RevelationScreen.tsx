"use client";

import { GoldenFrame } from "@/components/ui/GoldenFrame";
import { Heart } from "lucide-react";
import React from 'react';

interface RevelationScreenProps {
  imageUrl: string;
  princessName: string;
}

const FloatingHeart = ({ style, duration, delay }: { style: React.CSSProperties; duration: string, delay: string }) => (
    <div
      className="absolute text-red-400 animate-float-up"
      style={{
        ...style,
        animationDuration: duration,
        animationDelay: delay,
      }}
    >
        <Heart fill="currentColor" className="w-6 h-6 md:w-8 md:h-8" />
    </div>
);


export function RevelationScreen({ imageUrl, princessName }: RevelationScreenProps) {
    const hearts = React.useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
        style: {
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * -10 - 10}%`, // Start from below the screen
        },
        duration: `${Math.random() * 2 + 3}s`,
        delay: `${Math.random() * 2}s`,
    })), []);

  return (
    <div className="relative text-center flex flex-col items-center justify-center gap-4 p-4 md:p-8 w-full min-h-[500px] animate-fade-in-scale-up">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {hearts.map((heart, i) => <FloatingHeart key={i} {...heart} />)}
      </div>

      <GoldenFrame
        imageUrl={imageUrl}
        princessName="Você!"
        className="w-full max-w-[280px] h-[320px] md:max-w-[320px] md:h-[360px] z-10"
      />

       <p className="font-headline text-3xl md:text-4xl text-brand-text mt-6 z-10 text-center max-w-md">
        {princessName}
      </p>

    </div>
  );
}
