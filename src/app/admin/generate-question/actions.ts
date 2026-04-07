"use server";

import {
  generatePrincessQuizQuestion,
  type GeneratePrincessQuizQuestionOutput,
} from "@/ai/flows/generate-princess-quiz-questions";

interface FormState {
  data: GeneratePrincessQuizQuestionOutput | null;
  error: string | null;
}

export async function generateQuestionAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const hint = formData.get("hint") as string;
  try {
    const question = await generatePrincessQuizQuestion(hint);
    return { data: question, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { data: null, error: `Failed to generate question: ${errorMessage}` };
  }
}
