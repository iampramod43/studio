'use server';

/**
 * @fileOverview AI-powered theme suggestion flow.
 *
 * - generateThemeSuggestion - A function that takes a text prompt and returns a theme suggestion (color palette and typography).
 * - GenerateThemeSuggestionInput - The input type for the generateThemeSuggestion function.
 * - GenerateThemeSuggestionOutput - The return type for the generateThemeSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateThemeSuggestionInputSchema = z.object({
  aestheticPrompt: z
    .string()
    .describe('A description of the desired aesthetic for the theme.'),
});
export type GenerateThemeSuggestionInput = z.infer<
  typeof GenerateThemeSuggestionInputSchema
>;

const GenerateThemeSuggestionOutputSchema = z.object({
  primaryColor: z
    .string()
    .describe('The suggested primary color in hex format (e.g., #9D4EDD).'),
  backgroundColor: z
    .string()
    .describe(
      'The suggested background color for light mode in hex format (e.g., #F5EEFF).'
    ),
  darkBackgroundColor: z
    .string()
    .describe(
      'The suggested background color for dark mode in hex format (e.g., #1A1A1A).'
    ),
  accentColor: z
    .string()
    .describe('The suggested accent color in hex format (e.g., #577590).'),
  fontFamily: z
    .string()
    .describe(
      'The suggested font family (e.g., Inter, sans-serif). Include fallback fonts if applicable.'
    ),
});
export type GenerateThemeSuggestionOutput = z.infer<
  typeof GenerateThemeSuggestionOutputSchema
>;

export async function generateThemeSuggestion(
  input: GenerateThemeSuggestionInput
): Promise<GenerateThemeSuggestionOutput> {
  return generateThemeSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateThemeSuggestionPrompt',
  input: {schema: GenerateThemeSuggestionInputSchema},
  output: {schema: GenerateThemeSuggestionOutputSchema},
  prompt: `You are an AI theme suggestion bot. You take a text prompt describing a desired aesthetic and return a theme suggestion consisting of a color palette and typography.

  The color palette consists of a primary color, a background color for light mode, a background color for dark mode, and an accent color, all in hex format.
  The typography consists of a font family.

  Here is the desired aesthetic: {{{aestheticPrompt}}}

  Please return a JSON object with the theme suggestion.
  `,
});

const generateThemeSuggestionFlow = ai.defineFlow(
  {
    name: 'generateThemeSuggestionFlow',
    inputSchema: GenerateThemeSuggestionInputSchema,
    outputSchema: GenerateThemeSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
