'use client';

import type { Dispatch, SetStateAction } from 'react';
import type { ShowcaseComponents } from '@/lib/types';
import { Paintbrush } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ColorControls } from '@/components/editor/color-controls';
import { TypographyControls } from '@/components/editor/typography-controls';
import { AiSuggestionForm } from '@/components/editor/ai-suggestion-form';
import { ComponentShowcaseControls } from '@/components/editor/component-showcase-controls';
import { ExportControls } from '@/components/editor/export-controls';
import { ModeToggle } from './mode-toggle';

type EditorSidebarProps = {
  showcase: ShowcaseComponents;
  setShowcase: Dispatch<SetStateAction<ShowcaseComponents>>;
};

export default function EditorSidebar({ showcase, setShowcase }: EditorSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-card text-card-foreground border-r">
        <header className="flex items-center justify-between border-b p-4">
            <div className='flex items-center gap-2'>
              <Paintbrush className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold tracking-tight">Shadcn ThemeForge</h1>
            </div>
            <ModeToggle />
        </header>
        <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
                <ColorControls />
                <Separator />
                <TypographyControls />
                <Separator />
                <AiSuggestionForm />
                <Separator />
                <ComponentShowcaseControls showcase={showcase} setShowcase={setShowcase} />
                <Separator />
                <ExportControls />
            </div>
        </ScrollArea>
    </div>
  );
}
