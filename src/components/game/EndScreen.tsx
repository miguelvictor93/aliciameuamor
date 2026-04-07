import { Button } from "@/components/ui/button";
import { Confetti } from "../ui/Confetti";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface EndScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const getFeedback = (score: number, total: number) => {
  const percentage = (score / total) * 100;
  if (percentage === 100) {
    return {
      starCount: 5,
      message: "Perfeito! Você é uma verdadeira especialista em princesas!",
    };
  }
  if (percentage >= 80) {
    return {
      starCount: 4,
      message: "Incrível! Quase um membro da realeza!",
    };
  }
  if (percentage >= 50) {
    return {
      starCount: 3,
      message: "Muito bem! Você conhece bem o mundo dos contos de fadas.",
    };
  }
  if (percentage >= 20) {
    return {
      starCount: 2,
      message: "Bom esforço! Continue aprendendo sobre as princesas.",
    };
  }
  return {
    starCount: 1,
    message: "Não desanime! Toda princesa começa sua jornada em algum lugar.",
  };
};

export function EndScreen({ score, totalQuestions, onRestart }: EndScreenProps) {
  const { starCount, message } = getFeedback(score, totalQuestions);

  return (
    <div className="text-center flex flex-col items-center gap-6 animate-fade-in-scale-up p-8 bg-button-bg/70 rounded-2xl border-4 border-brand-gold shadow-lg">
      <Confetti active={true} />
      <h2 className="font-headline text-4xl text-brand-text">Fim da Aventura!</h2>
      <p className="text-xl text-brand-text-secondary">
        Você acertou{" "}
        <span className="font-bold text-brand-text">
          {score} de {totalQuestions}
        </span>{" "}
        perguntas!
      </p>
      <div className="flex text-5xl text-brand-gold" role="img" aria-label={`Avaliação: ${starCount} de 5 estrelas`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={cn("h-12 w-12", i < starCount ? 'fill-current' : 'fill-transparent text-brand-text/20')}/>
        ))}
      </div>
      <p className="text-lg text-brand-text-secondary max-w-sm">{message}</p>
      <Button
        onClick={onRestart}
        className="font-headline text-2xl h-16 px-10 rounded-full bg-button-bg border-4 border-brand-gold text-brand-text hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-brand-gold/30 shadow-lg"
      >
        Jogar Novamente
      </Button>
    </div>
  );
}
