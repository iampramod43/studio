'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, XAxis } from 'recharts';
import type { ChartData } from '@/lib/types';


const chartData: ChartData[] = [
  { month: 'January', subscriptions: 86 },
  { month: 'February', subscriptions: 105 },
  { month: 'March', subscriptions: 137 },
  { month: 'April', subscriptions: 73 },
  { month: 'May', subscriptions: 109 },
  { month: 'June', subscriptions: 114 },
];

export function SubscriptionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscriptions</CardTitle>
        <CardDescription>+180.1% from last month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+2,350</div>
        <div className="h-[120px]">
          <ChartContainer config={{}} className="w-full h-full">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
               <defs>
                <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area dataKey="subscriptions" stroke="hsl(var(--primary))" fill="url(#colorSubs)" />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
