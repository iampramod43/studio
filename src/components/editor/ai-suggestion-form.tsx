'use client';

import { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { generateThemeAction } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

export function AiSuggestionForm() {
  const { setTheme } = useTheme();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await generateThemeAction(prompt);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error,
      });
    } else if (result.data) {
      const { primaryColor, backgroundColor, accentColor, fontFamily } = result.data;
      const fontName = fontFamily.split(',')[0].replace(/'/g, '').trim();
      setTheme({
        primary: primaryColor,
        background: backgroundColor,
        accent: accentColor,
        font: fontName,
      });
      toast({
        title: 'Theme generated!',
        description: 'Your new AI-powered theme has been applied.',
      });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-semibold text-lg">AI Theme Suggestion</h3>
      <div className="space-y-2">
        <Label htmlFor="ai-prompt">Aesthetic Prompt</Label>
        <Textarea
          id="ai-prompt"
          placeholder="e.g., 'A cozy, minimalist coffee shop on a rainy day'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          Describe the look and feel you want, and let AI generate a theme for you.
        </p>
      </div>
      <Button type="submit" disabled={isLoading || !prompt} className="w-full">
        <Sparkles className="mr-2 h-4 w-4" />
        {isLoading ? 'Generating...' : 'Generate Theme'}
      </Button>
    </form>
  );
}
