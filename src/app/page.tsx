'use client';

import { useState } from 'react';
import type { ShowcaseComponents } from '@/lib/types';
import { CustomThemeProvider } from '@/components/custom-theme-provider';
import EditorSidebar from '@/components/editor-sidebar';
import ComponentPreview from '@/components/component-preview';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';

export default function Home() {
  const [showcase, setShowcase] = useState<ShowcaseComponents>({
    buttons: true,
    cards: true,
    inputs: true,
    alerts: true,
    avatars: true,
    tabs: true,
  });

  return (
    <CustomThemeProvider>
      <SidebarProvider>
        <Sidebar>
          <EditorSidebar showcase={showcase} setShowcase={setShowcase} />
        </Sidebar>
        <SidebarInset>
          <main className="p-4 sm:p-6 lg:p-8">
            <ComponentPreview showcase={showcase} />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </CustomThemeProvider>
  );
}
