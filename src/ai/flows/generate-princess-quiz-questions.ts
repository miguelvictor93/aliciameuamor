'use server';
/**
 * @fileOverview A Genkit flow for generating new princess quiz questions.
 *
 * - generatePrincessQuizQuestion - A function that handles the generation of a single quiz question.
 * - GeneratePrincessQuizQuestionInput - The input type for the generatePrincessQuizQuestion function.
 * - GeneratePrincessQuizQuestionOutput - The return type for the generatePrincessQuizQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePrincessQuizQuestionInputSchema = z
  .string()
  .optional()
  .describe(
    'An optional hint or theme for the type of princess or quiz question to generate.'
  );
export type GeneratePrincessQuizQuestionInput = z.infer<
  typeof GeneratePrincessQuizQuestionInputSchema
>;

const GeneratePrincessQuizQuestionOutputSchema = z.object({
  princess: z.string().describe('The name of the princess the question is about.'),
  imageUrl: z
    .string()
    .url()
    .describe('A public URL for an image of the princess.'),
  question: z.string().describe('The quiz question text.'),
  options:
    z.array(z.string()).min(4).max(4).describe('An array of 4 answer options.'),
  correct: z
    .string()
    .describe('The correct answer, which must be one of the options.'),
});
export type GeneratePrincessQuizQuestionOutput = z.infer<
  typeof GeneratePrincessQuizQuestionOutputSchema
>;

const generatePrincessQuizQuestionPrompt = ai.definePrompt({
  name: 'generatePrincessQuizQuestionPrompt',
  input: { schema: GeneratePrincessQuizQuestionInputSchema },
  output: { schema: GeneratePrincessQuizQuestionOutputSchema },
  prompt: `You are an expert game content creator for a princess quiz game. Your task is to generate a single new, creative, and engaging quiz question about a princess.\n\nThe generated question should include:\n- The name of the princess.\n- A public URL to an image of the princess. This image should be suitable for a quiz game and ideally from a well-known source or public domain.\n- The question text itself.\n- Exactly four diverse and plausible answer options, one of which must be the correct answer.\n- The correct answer, explicitly stating which of the options is correct.\n\nPlease ensure the question is clear, the options are distinct enough, and the correct answer is unambiguously one of the options. Focus on well-known princesses and their stories.\n\n{{#if input}}\nConsider this hint when generating the question: "{{{input}}}"\n{{/if}}`,
});

const generatePrincessQuizQuestionFlow = ai.defineFlow(
  {
    name: 'generatePrincessQuizQuestionFlow',
    inputSchema: GeneratePrincessQuizQuestionInputSchema,
    outputSchema: GeneratePrincessQuizQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await generatePrincessQuizQuestionPrompt(input);
    if (!output) {
      throw new Error('Failed to generate quiz question.');
    }
    return output;
  }
);

export async function generatePrincessQuizQuestion(
  input?: GeneratePrincessQuizQuestionInput
): Promise<GeneratePrincessQuizQuestionOutput> {
  return generatePrincessQuizQuestionFlow(input);
}
