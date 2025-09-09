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

export default function ComponentPreview() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold">Clean Slate</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost">Reset</Button>
              <Button variant="ghost">Import</Button>
              <Button variant="ghost">Share</Button>
              <Button variant="default">Save</Button>
              <Button variant="outline">Code</Button>
            </div>
          </div>
          <Tabs defaultValue="dashboard">
            <TabsList>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
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
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsContent value="dashboard">
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
