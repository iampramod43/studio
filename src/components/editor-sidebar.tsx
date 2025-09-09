'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Wand2, Code, Download, Share2, Palette, Type, Component, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateThemeAction } from '@/lib/actions';
import { fonts } from '@/lib/fonts';
import type { ShowcaseComponents, Theme } from '@/lib/types';
import { ModeToggle } from './mode-toggle';
import { useTheme } from '@/hooks/use-theme';
import { CodeDialog } from './code-dialog';

interface EditorSidebarProps {
  showcase: ShowcaseComponents;
  setShowcase: React.Dispatch<React.SetStateAction<ShowcaseComponents>>;
}

export default function EditorSidebar({
  showcase,
  setShowcase,
}: EditorSidebarProps) {
  const { theme, setTheme, isGenerating, setIsGenerating } = useTheme();
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleGenerateTheme = async () => {
    setIsGenerating(true);
    const result = await generateThemeAction(prompt);
    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } else if (result.data) {
      setTheme({
        primary: result.data.primaryColor,
        background: result.data.backgroundColor,
        darkBackground: result.data.darkBackgroundColor,
        accent: result.data.accentColor,
        font: result.data.fontFamily,
      });
      toast({
        title: 'Theme Generated',
        description: 'Your new theme has been applied.',
      });
    }
    setIsGenerating(false);
  };
  
  const handleColorChange = (name: 'primary' | 'background' | 'darkBackground' | 'accent', value: string) => {
    setTheme(prev => ({...prev, [name]: value}));
  }

  const handleFontChange = (value: string) => {
    setTheme(prev => ({...prev, font: value}));
  }
  
  const handleReset = () => {
    setTheme({
      primary: '#6B46C1',
      background: '#F7FAFC',
      darkBackground: '#1A202C',
      accent: '#3182CE',
      font: 'Inter',
    });
    toast({
      title: 'Theme Reset',
      description: 'The theme has been reset to its default values.',
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTheme = JSON.parse(e.target?.result as string);
          setTheme(importedTheme);
          toast({
            title: 'Theme Imported',
            description: 'Your theme has been successfully imported.',
          });
        } catch (error) {
          toast({
            title: 'Import Error',
            description: 'Failed to parse the theme file.',
            variant: 'destructive',
          });
        }
      };
      reader.readAsText(file);
    }
    event.target.value = ''; // Reset file input
  };
  
  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('theme', JSON.stringify(theme));
    navigator.clipboard.writeText(url.toString());
    toast({
      title: 'Link Copied',
      description: 'A shareable link has been copied to your clipboard.',
    });
  };

  const handleSave = () => {
    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: 'Theme Saved',
      description: 'Your theme has been saved as theme.json.',
    });
  };

  return (
    <div className="h-full flex flex-col border-r bg-card text-card-foreground">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">ThemeForge</h2>
        <ModeToggle />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Accordion type="multiple" defaultValue={['style', 'components']} className="w-full">
          <AccordionItem value="ai-generator">
            <AccordionTrigger className="px-4">
              <div className='flex items-center gap-2'>
                <Wand2 />
                <span>AI Generator</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Describe the aesthetic you want, and let AI do the rest.
              </p>
              <Input
                placeholder="e.g., a dark, cyberpunk-inspired theme"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button onClick={handleGenerateTheme} disabled={isGenerating} className="w-full">
                {isGenerating ? 'Generating...' : 'Generate Theme'}
              </Button>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="style">
            <AccordionTrigger className="px-4">
              <div className='flex items-center gap-2'>
                <Palette />
                <span>Style</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 space-y-4">
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    type="color" 
                    value={theme.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="p-1 h-8 w-8"
                  />
                  <Input 
                    value={theme.primary} 
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="h-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Background Color</Label>
                 <div className="flex items-center gap-2">
                  <Input 
                    type="color" 
                    value={theme.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="p-1 h-8 w-8"
                  />
                  <Input 
                    value={theme.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="h-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Dark Background Color</Label>
                 <div className="flex items-center gap-2">
                  <Input 
                    type="color" 
                    value={theme.darkBackground}
                    onChange={(e) => handleColorChange('darkBackground', e.target.value)}
                    className="p-1 h-8 w-8"
                  />
                  <Input 
                    value={theme.darkBackground}
                    onChange={(e) => handleColorChange('darkBackground', e.target.value)}
                    className="h-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Accent Color</Label>
                 <div className="flex items-center gap-2">
                  <Input 
                    type="color" 
                    value={theme.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="p-1 h-8 w-8"
                  />
                  <Input 
                    value={theme.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="h-8"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="typography">
            <AccordionTrigger className="px-4">
              <div className='flex items-center gap-2'>
                <Type />
                <span>Typography</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 space-y-4">
              <div className="space-y-2">
                <Label>Font Family</Label>
                <Select value={theme.font} onValueChange={handleFontChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map(font => (
                      <SelectItem key={font.name} value={font.name}>{font.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="components">
            <AccordionTrigger className="px-4">
              <div className="flex items-center gap-2">
                <Component />
                <span>Components</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Toggle visibility of component groups in the preview.
              </p>
              <div className="space-y-2">
                {Object.keys(showcase).map((key) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={`show-${key}`} className="capitalize">{key}</Label>
                    <Switch
                      id={`show-${key}`}
                      checked={showcase[key as keyof ShowcaseComponents]}
                      onCheckedChange={(checked) =>
                        setShowcase((prev) => ({ ...prev, [key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="p-4 border-t space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" onClick={handleReset}><RotateCcw /> Reset</Button>
          <Button variant="outline" onClick={handleImportClick}><Download /> Import</Button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".json" />
          <Button variant="outline" onClick={handleShare}><Share2 /> Share</Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleSave} className="w-full"><Download /> Save</Button>
          <CodeDialog />
        </div>
      </div>
    </div>
  );
}
