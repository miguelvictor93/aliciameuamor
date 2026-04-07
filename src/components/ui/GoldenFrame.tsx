import Image from "next/image";
import { cn } from "@/lib/utils";

interface GoldenFrameProps {
  imageUrl: string;
  princessName: string;
  className?: string;
}

const Ornament = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "text-brand-gold-darker absolute w-6 h-6 text-center leading-6 text-2xl",
      className
    )}
  >
    ❧
  </div>
);

export function GoldenFrame({
  imageUrl,
  princessName,
  className,
}: GoldenFrameProps) {
  return (
    <div
      className={cn(
        "relative p-3 bg-gradient-radial from-yellow-50 to-brand-gold-dark rounded-xl shadow-gold-frame",
        className
      )}
    >
      <div className="absolute inset-0 rounded-xl shadow-gold-frame-inset" />
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt={`Imagem da princesa ${princessName}`}
          width={280}
          height={320}
          className="object-cover w-full h-full rounded-lg border-2 border-brand-gold-darker/50"
          priority
        />
      </div>
      <Ornament className="top-0 left-0 -translate-x-1 -translate-y-1" />
      <Ornament className="top-0 right-0 translate-x-1 -translate-y-1 rotate-90" />
      <Ornament className="bottom-0 left-0 -translate-x-1 translate-y-1 -rotate-90" />
      <Ornament className="bottom-0 right-0 translate-x-1 translate-y-1 rotate-180" />
    </div>
  );
}
