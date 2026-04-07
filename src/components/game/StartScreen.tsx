import { Button } from "@/components/ui/button";

interface StartScreenProps {
  onStart: () => void;
}

const ShimmeringTitle = ({ text }: { text: string }) => (
  <h1 className="font-headline text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold bg-[200%_auto] animate-shimmer drop-shadow-lg">
    {text}
  </h1>
);

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="text-center flex flex-col items-center gap-8 animate-fade-in-scale-up">
      <div className="flex flex-col gap-2">
        <ShimmeringTitle text="Qual Princesa" />
        <ShimmeringTitle text="É Essa?" />
      </div>
      <p className="text-brand-text-secondary text-lg max-w-md">
        Teste seus conhecimentos sobre o mundo encantado das princesas e veja
        quantas você consegue adivinhar!
      </p>
      <Button
        onClick={onStart}
        className="font-headline text-2xl h-16 px-10 rounded-full bg-button-bg border-4 border-brand-gold text-brand-text hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-brand-gold/30 shadow-lg"
      >
        Começar Aventura
      </Button>
    </div>
  );
}
