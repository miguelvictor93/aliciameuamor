"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { QuizQuestion } from "@/types";
import { shuffle } from "@/lib/utils";
import { GoldenFrame } from "@/components/ui/GoldenFrame";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Confetti } from "@/components/ui/Confetti";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizScreenProps {
  questions: QuizQuestion[];
  onQuizEnd: (finalScore: number) => void;
}

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full h-4 bg-button-bg/50 rounded-full border border-brand-gold/30 overflow-hidden">
    <div
      className="h-full bg-brand-gold rounded-full transition-all duration-500 ease-out"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

export function QuizScreen({ questions, onQuizEnd }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const currentQuestion = useMemo(() => questions[currentIndex], [questions, currentIndex]);
  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return shuffle([...currentQuestion.options]);
  }, [currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    setIsAnimatingOut(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onQuizEnd(score);
    }
  }, [currentIndex, questions.length, onQuizEnd, score]);

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(option);

    if (option === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
        setIsAnimatingOut(true);
    }, 1500);
    setTimeout(() => {
        handleNextQuestion();
    }, 1900); // 1500ms for feedback + 400ms for fade out
  };
  
  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return "bg-button-bg hover:bg-white/80 hover:-translate-y-1";
    }
    if (option === currentQuestion.correct) {
      return "bg-feedback-correct animate-glow-pulse";
    }
    if (option === selectedAnswer && option !== currentQuestion.correct) {
      return "bg-feedback-wrong animate-shake";
    }
    return "bg-button-bg/50 opacity-70";
  };
  
  if (!currentQuestion) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={cn("flex flex-col items-center gap-4 md:gap-6 w-full animate-fade-in-scale-up", isAnimatingOut && "animate-fade-out-scale-down")}>
      <Confetti active={isAnswered && selectedAnswer === currentQuestion.correct} />
      
      <div className="w-full flex flex-col gap-2 text-brand-text">
        <div className="flex justify-between items-center font-semibold">
          <span>Questão {currentIndex + 1}/{questions.length}</span>
          <span>Pontuação: {score}</span>
        </div>
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      </div>
      
      <h2 className="font-headline text-xl md:text-2xl text-center text-brand-text drop-shadow-sm">
        {currentQuestion.question}
      </h2>
      
      <GoldenFrame
        imageUrl={currentQuestion.imageUrl}
        princessName={currentQuestion.princess}
        className="w-full max-w-[280px] h-[320px] md:max-w-[320px] md:h-[360px]"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {shuffledOptions.map((option) => (
          <Button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
            className={cn(
              "h-auto min-h-12 p-3 text-base font-medium text-brand-text border-2 border-brand-gold shadow-md transition-all duration-300",
              getButtonClass(option)
            )}
          >
            {option}
          </Button>
        ))}
      </div>
      
      {isAnswered && (
        <div className="flex items-center gap-2 mt-2 text-lg font-semibold animate-fade-in-scale-up">
          {selectedAnswer === currentQuestion.correct ? (
            <>
              <CheckCircle className="text-green-600" />
              <span className="text-brand-gold-darker">Muito bem! Você acertou!</span>
            </>
          ) : (
            <>
              <XCircle className="text-red-600" />
              <span className="text-brand-text-secondary">Ops! A resposta era {currentQuestion.correct}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
