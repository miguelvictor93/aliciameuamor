"use client";

import { useState, useEffect } from "react";

const colors = ["#FFD700", "#FF69B4", "#87CEEB", "#98FB98", "#DDA0DD"];

const ConfettiParticle = ({ id, onAnimationEnd }: { id: number, onAnimationEnd: (id: number) => void }) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  
  useEffect(() => {
    const duration = Math.random() * 2 + 2.5; // 2.5s to 4.5s
    setStyle({
      position: 'absolute',
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 20 - 10}%`,
      width: `${Math.random() * 8 + 6}px`,
      height: `${Math.random() * 15 + 10}px`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      transform: 'rotate(0deg)',
      animation: `fall ${duration}s linear forwards`,
      animationDelay: `${Math.random() * 0.5}s`,
    });

    const timer = setTimeout(() => onAnimationEnd(id), duration * 1000 + 500);
    return () => clearTimeout(timer);
  }, [id, onAnimationEnd]);

  return <div style={style} />;
};

export const Confetti = ({ active }: { active: boolean }) => {
  const [particles, setParticles] = useState<number[]>([]);
  let nextId = 0;

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 50 }, () => nextId++);
      setParticles(p => [...p, ...newParticles]);
    }
  }, [active]);

  const handleAnimationEnd = (id: number) => {
    setParticles(prev => prev.filter(pId => pId !== id));
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {particles.map(id => (
        <ConfettiParticle key={id} id={id} onAnimationEnd={handleAnimationEnd} />
      ))}
    </div>
  );
};
