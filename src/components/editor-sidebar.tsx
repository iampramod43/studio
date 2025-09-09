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
import { Wand2, Code, Download, Share2, Palette, Type, Check, Shield, Component } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateThemeAction } from '@/lib/actions';
import { fonts } from '@/lib/fonts';
import type { ShowcaseComponents } from '@/lib/types';
import { ModeToggle } from './mode-toggle';
import { useTheme } from '@/hooks/use-theme';
import { CodeDialog } from './code-dialog';
import { Avatar, AvatarFallback } from './ui/avatar';

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
  
  const handleColorChange = (name: 'primary' | 'background' | 'accent', value: string) => {
    setTheme(prev => ({...prev, [name]: value}));
  }

  const handleFontChange = (value: string) => {
    setTheme(prev => ({...prev, font: value}));
  }

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
          <div className="flex items-center gap-2">
            <Avatar>
                <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
                <Input placeholder='Name' />
            </div>
             <div className='flex-1'>
                <Input placeholder='Email' />
            </div>
        </div>
      </div>
    </div>
  );
}
