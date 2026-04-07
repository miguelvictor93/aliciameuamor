"use client";

import { useState, useEffect, useCallback } from "react";
import { StartScreen } from "@/components/game/StartScreen";
import { QuizScreen } from "@/components/game/QuizScreen";
import { EndScreen } from "@/components/game/EndScreen";
import { questions as allQuestions } from "@/lib/questions";
import { shuffle } from "@/lib/utils";
import type { QuizQuestion } from "@/types";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WandSparkles } from "lucide-react";

type GameState = "start" | "playing" | "end";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  const startGame = useCallback(() => {
    setShuffledQuestions(shuffle([...allQuestions]));
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
    });
  }, []);

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
            totalQuestions={shuffledQuestions.length}
            onRestart={restartGame}
          />
        )}
      </div>
      <div className="absolute top-4 right-4 z-20">
        <Button asChild variant="ghost" className="text-brand-text hover:bg-white/30 hover:text-brand-text">
            <Link href="/admin/generate-question">
                <WandSparkles className="mr-2 h-4 w-4" />
                Gerar Pergunta com IA
            </Link>
        </Button>
      </div>
    </main>
  );
}
