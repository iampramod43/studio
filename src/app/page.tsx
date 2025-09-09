'use client';

import { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import EditorSidebar from '@/components/editor-sidebar';
import ComponentPreview from '@/components/component-preview';
import type { ShowcaseComponents } from '@/lib/types';
import { CustomThemeProvider } from '@/components/custom-theme-provider';

export default function Home() {
  const [showcase, setShowcase] = useState<ShowcaseComponents>({
    buttons: true,
    cards: true,
    alerts: true,
    inputs: true,
    avatars: true,
    tabs: true,
  });

  return (
    <CustomThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Sidebar>
            <EditorSidebar
              showcase={showcase}
              setShowcase={setShowcase}
            />
          </Sidebar>
          <SidebarInset>
            <ComponentPreview />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </CustomThemeProvider>
  );
}
