'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { MoreHorizontal } from 'lucide-react';
import { TotalRevenueCard } from '@/components/dashboard/total-revenue-card';
import { SubscriptionsCard } from '@/components/dashboard/subscriptions-card';
import { CalendarCard } from '@/components/dashboard/calendar-card';
import { MoveGoalCard } from '@/components/dashboard/move-goal-card';
import { UpgradeSubscriptionCard } from '@/components/dashboard/upgrade-subscription-card';
import { CreateAccountCard } from '@/components/dashboard/create-account-card';
import { ExerciseMinutesCard } from '@/components/dashboard/exercise-minutes-card';
import { PaymentsCard } from '@/components/dashboard/payments-card';
import { HelpCard } from '@/components/dashboard/help-card';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';
import { CodeDialog } from './code-dialog';
import React from 'react';
import { defaultTheme } from '@/lib/default-theme';

export default function ComponentPreview() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleReset = () => {
    setTheme(defaultTheme);
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
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold invisible">ThemeForge</h1>
            <div className="flex items-center gap-4">
            </div>
          </div>
          <Tabs defaultValue="cards">
            <TabsList>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="mail">Mail</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="color-palette">Color Palette</TabsTrigger>
              <Button variant="ghost" size="icon">
                <MoreHorizontal />
              </Button>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <Tabs defaultValue="cards" className="w-full">
          <TabsContent value="cards">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <TotalRevenueCard />
                <SubscriptionsCard />
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <CalendarCard />
                <MoveGoalCard />
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <UpgradeSubscriptionCard />
                <CreateAccountCard />
              </div>

              <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <ExerciseMinutesCard />
                </div>
                <div className="grid grid-rows-2 gap-6">
                  <HelpCard />
                  <PaymentsCard />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
