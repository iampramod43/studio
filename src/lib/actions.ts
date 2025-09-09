'use server';

import { generateThemeSuggestion } from '@/ai/flows/generate-theme-suggestion';
import { fonts } from '@/lib/fonts';

export async function generateThemeAction(prompt: string) {
  try {
    if (!prompt || prompt.trim().length < 10) {
      return { error: 'Please provide a more descriptive prompt (at least 10 characters).' };
    }
    const result = await generateThemeSuggestion({ aestheticPrompt: prompt });

    // Validate the result from the AI
    if (!result.primaryColor || !result.backgroundColor || !result.darkBackgroundColor || !result.accentColor || !result.fontFamily) {
        return { error: 'AI response was incomplete. Please try again.' };
    }
    
    // Ensure the font exists in our list
    const fontName = result.fontFamily.split(',')[0].replace(/'/g, '').trim();
    const fontExists = fonts.some(f => f.name === fontName);

    if (!fontExists) {
        // Fallback to a default font if the suggested one isn't available
        result.fontFamily = 'Inter';
    } else {
        result.fontFamily = fontName;
    }


    return { data: result };
  } catch (error) {
    console.error('Error in generateThemeAction:', error);
    return { error: 'Failed to generate theme due to a server error. Please try again later.' };
  }
}
