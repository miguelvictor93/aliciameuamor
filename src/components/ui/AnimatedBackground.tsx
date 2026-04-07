"use client";
import React, { useEffect, useState } from "react";

const cloudProps = [
  { width: 200, height: 60, top: "10%", duration: 35 },
  { width: 150, height: 45, top: "25%", duration: 45 },
  { width: 250, height: 70, top: "50%", duration: 30 },
  { width: 180, height: 50, top: "70%", duration: 50 },
  { width: 220, height: 65, top: "85%", duration: 40 },
  { width: 120, height: 40, top: "5%", duration: 60 },
];

const Cloud = ({ style, duration }: { style: React.CSSProperties; duration: string }) => (
  <div
    className="absolute bg-white/40 rounded-full animate-cloud-move"
    style={{ ...style, animationDuration: duration }}
  />
);

const Sparkle = ({ style, duration }: { style: React.CSSProperties; duration: string }) => (
    <div
      className="absolute bg-white/90 rounded-full animate-twinkle"
      style={{
        ...style,
        animationDuration: duration,
      }}
    />
);

const AnimatedBackground = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [clouds, setClouds] = useState<any[]>([]);
    const [sparkles, setSparkles] = useState<any[]>([]);

    useEffect(() => {
        const generatedClouds = cloudProps.map((prop) => {
            return {
                style: {
                    width: `${prop.width}px`,
                    height: `${prop.height}px`,
                    top: prop.top,
                    left: `-${prop.width}px`,
                    animationDelay: `${-Math.random() * prop.duration}s`,
                },
                duration: `${prop.duration}s`
            };
        });
        setClouds(generatedClouds);

        const generatedSparkles = Array.from({ length: 20 }).map(() => ({
            style: {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2.5 + 1}px`,
                height: `${Math.random() * 2.5 + 1}px`,
            },
            duration: `${Math.random() * 3 + 2}s`
        }));
        setSparkles(generatedSparkles);

        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

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
