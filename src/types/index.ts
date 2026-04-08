export type QuizQuestion = {
  princess: string;
  imageUrl: string;
  question: string;
  options: string[];
  correct: string;
  isSpecial?: boolean;
  specialImageUrl?: string;
  specialPrincessName?: string;
};
