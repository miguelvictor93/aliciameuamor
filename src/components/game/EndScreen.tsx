import { Button } from "@/components/ui/button";

interface EndScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const getFeedback = (score: number, total: number) => {
  const percentage = (score / total) * 100;
  if (percentage === 100) {
    return {
      message: "Perfeito! Você é uma verdadeira especialista em princesas!",
    };
  }
  if (percentage >= 80) {
    return {
      message: "Incrível! Quase um membro da realeza!",
    };
  }
  if (percentage >= 50) {
    return {
      message: "Muito bem! Você conhece bem o mundo dos contos de fadas.",
    };
  }
  if (percentage >= 20) {
    return {
      message: "Bom esforço! Continue aprendendo sobre as princesas.",
    };
  }
  return {
    message: "Não desanime! Toda princesa começa sua jornada em algum lugar.",
  };
};

export function EndScreen({ score, totalQuestions, onRestart }: EndScreenProps) {
  const { message } = getFeedback(score, totalQuestions);

  return (
    <div className="text-center flex flex-col items-center gap-6 animate-fade-in-scale-up p-8 bg-button-bg/70 rounded-2xl border-4 border-brand-gold shadow-lg">
      <h2 className="font-headline text-4xl text-brand-text">Fim da Aventura!</h2>
      <p className="text-xl text-brand-text-secondary">
        Você acertou{" "}
        <span className="font-bold text-brand-text">
          {score} de {totalQuestions}
        </span>{" "}
        perguntas!
      </p>
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
