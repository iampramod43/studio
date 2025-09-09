'use client';

import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { hexToHslString } from '@/lib/utils';
import { Clipboard, Download, RotateCcw } from 'lucide-react';

export function ExportControls() {
  const { theme, resetTheme } = useTheme();
  const { toast } = useToast();

  const generateCss = () => {
    const primaryHsl = hexToHslString(theme.primary);
    const backgroundHsl = hexToHslString(theme.background);
    const accentHsl = hexToHslString(theme.accent);

    return `:root {
  --background: ${backgroundHsl};
  --primary: ${primaryHsl};
  --accent: ${accentHsl};
  /* Add other derived colors as needed */

  --font-body: '${theme.font}', sans-serif;
  --font-headline: '${theme.font}', sans-serif;
}`;
  };

  const handleCopy = () => {
    const css = generateCss();
    navigator.clipboard.writeText(css);
    toast({
      title: 'Copied to clipboard!',
      description: 'You can now paste the CSS variables into your project.',
    });
  };

  const handleDownload = () => {
    const css = generateCss();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleReset = () => {
    resetTheme();
    toast({
      title: 'Theme Reset',
      description: 'The theme has been reset to its default state.',
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Export & Reset</h3>
      <div className="flex flex-col space-y-2">
        <Button variant="outline" onClick={handleCopy}>
          <Clipboard className="mr-2 h-4 w-4" />
          Copy CSS
        </Button>
        <Button variant="outline" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download .css
        </Button>
        <Button variant="ghost" onClick={handleReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Default
        </Button>
      </div>
    </div>
  );
}
