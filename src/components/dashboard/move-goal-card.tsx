'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const chartData = [
  { day: 'Mon', calories: 200 },
  { day: 'Tue', calories: 250 },
  { day: 'Wed', calories: 300 },
  { day: 'Thu', calories: 280 },
  { day: 'Fri', calories: 320 },
  { day: 'Sat', calories: 150 },
  { day: 'Sun', calories: 180 },
];

export function MoveGoalCard() {
  const [goal, setGoal] = useState(350);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Move Goal</CardTitle>
        <CardDescription>Set your daily activity goal.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => setGoal(g => Math.max(0, g - 10))}>
            <Minus className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <div className="text-5xl font-bold">{goal}</div>
            <div className="text-sm text-muted-foreground">CALORIES/DAY</div>
          </div>
          <Button variant="outline" size="icon" onClick={() => setGoal(g => g + 10)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="h-[100px] w-full">
          <ChartContainer config={{}} className="h-full w-full">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="calories" fill="hsl(var(--primary))" radius={5} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Set Goal</Button>
      </CardFooter>
    </Card>
  );
}
