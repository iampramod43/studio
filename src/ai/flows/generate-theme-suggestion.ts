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


const ColorThemeSchema = z.object({
  background: z.string().describe('The background color in hex format (e.g., #FFFFFF).'),
  foreground: z.string().describe('The foreground color in hex format (e.g., #000000).'),
  card: z.string().describe('The card background color in hex format.'),
  cardForeground: z.string().describe('The card foreground color in hex format.'),
  popover: z.string().describe('The popover background color in hex format.'),
  popoverForeground: z.string().describe('The popover foreground color in hex format.'),
  primary: z.string().describe('The primary color in hex format.'),
  primaryForeground: z.string().describe('The primary foreground color in hex format.'),
  secondary: z.string().describe('The secondary color in hex format.'),
  secondaryForeground: z.string().describe('The secondary foreground color in hex format.'),
  muted: z.string().describe('The muted color in hex format.'),
  mutedForeground: z.string().describe('The muted foreground color in hex format.'),
  accent: z.string().describe('The accent color in hex format.'),
  accentForeground: z.string().describe('The accent foreground color in hex format.'),
  destructive: z.string().describe('The destructive color in hex format.'),
  destructiveForeground: z.string().describe('The destructive foreground color in hex format.'),
  border: z.string().describe('The border color in hex format.'),
  input: z.string().describe('The input background color in hex format.'),
  ring: z.string().describe('The ring color in hex format.'),
  chart1: z.string().describe('Chart color 1 in hex format.'),
  chart2: z.string().describe('Chart color 2 in hex format.'),
  chart3: z.string().describe('Chart color 3 in hex format.'),
  chart4: z.string().describe('Chart color 4 in hex format.'),
  chart5: z.string().describe('Chart color 5 in hex format.'),
});

const GenerateThemeSuggestionOutputSchema = z.object({
  light: ColorThemeSchema.describe('The color palette for the light theme.'),
  dark: ColorThemeSchema.describe('The color palette for the dark theme.'),
  font: z.string().describe('The suggested font family (e.g., Inter, sans-serif).'),
  radius: z.number().describe('The suggested border radius in rem (e.g., 0.5).'),
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
  prompt: `You are an AI theme suggestion bot. You take a text prompt describing a desired aesthetic and return a complete theme suggestion.

  The theme consists of a light mode color palette, a dark mode color palette, a font family, and a border radius.

  Each color palette must define all of the following properties in hex format:
  - background
  - foreground
  - card
  - cardForeground
  - popover
  - popoverForeground
  - primary
  - primaryForeground
  - secondary
  - secondaryForeground
  - muted
  - mutedForeground
  - accent
  - accentForeground
  - destructive
  - destructiveForeground
  - border
  - input
  - ring
  - chart1, chart2, chart3, chart4, chart5

  Ensure that the color palettes are harmonious and provide good contrast for readability.
  The font should be a Google Font.
  The radius should be a value between 0 and 1.

  Here is the desired aesthetic: {{{aestheticPrompt}}}

  Please return a JSON object with the complete theme suggestion.
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
