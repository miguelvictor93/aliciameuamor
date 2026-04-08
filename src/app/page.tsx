"use client";

import { useState, useEffect, useCallback } from "react";
import { StartScreen } from "@/components/game/StartScreen";
import { QuizScreen } from "@/components/game/QuizScreen";
import { EndScreen } from "@/components/game/EndScreen";
import { questions as allQuestions } from "@/lib/questions";
import { shuffle } from "@/lib/utils";
import type { QuizQuestion } from "@/types";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

type GameState = "start" | "playing" | "end";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  const startGame = useCallback(() => {
    const specialQuestion = allQuestions.find(q => q.isSpecial);
    const regularQuestions = allQuestions.filter(q => !q.isSpecial);
    const shuffledRegular = shuffle([...regularQuestions]);
    
    const finalQuestions = [...shuffledRegular];
    if (specialQuestion) {
      finalQuestions.push(specialQuestion);
    }

    setShuffledQuestions(finalQuestions);
    setScore(0);
    setGameState("playing");
  }, []);

  const endGame = useCallback((finalScore: number) => {
    setScore(finalScore);
    setGameState("end");
  }, []);

  const restartGame = useCallback(() => {
    setGameState("start");
  }, []);

  useEffect(() => {
    // Preload images for smoother transitions
    allQuestions.forEach((q) => {
      const img = new Image();
      img.src = q.imageUrl;
      if (q.specialImageUrl) {
        const specialImg = new Image();
        specialImg.src = q.specialImageUrl;
      }
    });
  }, []);

  const totalRegularQuestions = allQuestions.filter(q => !q.isSpecial).length;

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatedBackground />
      <div className="z-10 w-full max-w-xl mx-auto">
        {gameState === "start" && <StartScreen onStart={startGame} />}
        {gameState === "playing" && (
          <QuizScreen questions={shuffledQuestions} onQuizEnd={endGame} />
        )}
        {gameState === "end" && (
          <EndScreen
            score={score}
            totalQuestions={totalRegularQuestions}
            onRestart={restartGame}
          />
        )}
      </div>
    </main>
  );
}
