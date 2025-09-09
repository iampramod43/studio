'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/hooks/use-theme';
import { hexToHslString } from '@/lib/utils';
import { Code, Check, Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CodeDialog() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const cssVariables = `
@layer base {
  :root {
    --background: ${hexToHslString(theme.background)};
    --foreground: 240 6% 10%;
    --card: 0 0% 100%;
    --card-foreground: 240 6% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 6% 10%;
    --primary: ${hexToHslString(theme.primary)};
    --primary-foreground: 0 0% 100%;
    --secondary: 240 5% 96%;
    --secondary-foreground: 240 6% 10%;
    --muted: 240 5% 96%;
    --muted-foreground: 240 4% 46%;
    --accent: ${hexToHslString(theme.accent)};
    --accent-foreground: 240 6% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 6% 90%;
    --input: 240 6% 90%;
    --ring: ${hexToHslString(theme.primary)};
    --radius: 0.5rem;
  }
}
  `;

  const tailwindConfigCode = `
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  // ...
  theme: {
    extend: {
      fontFamily: {
        body: ['${theme.font}', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        background: 'hsl(var(--background))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        // ...other colors
      },
    },
  },
  // ...
} satisfies Config
  `;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({ title: 'Copied to clipboard!' });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Code</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Get the Code</DialogTitle>
          <DialogDescription>
            Copy and paste the following code into your project.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="css">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="css">CSS Variables</TabsTrigger>
            <TabsTrigger value="tailwind">tailwind.config.ts</TabsTrigger>
          </TabsList>
          <TabsContent value="css">
            <div className="relative">
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={() => copyToClipboard(cssVariables)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              </Button>
              <pre className="bg-muted rounded-md p-4 overflow-x-auto text-sm">
                <code>{cssVariables}</code>
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="tailwind">
            <div className="relative">
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={() => copyToClipboard(tailwindConfigCode)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              </Button>
              <pre className="bg-muted rounded-md p-4 overflow-x-auto text-sm">
                <code>{tailwindConfigCode}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
