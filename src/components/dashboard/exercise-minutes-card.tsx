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
import { Area, AreaChart, CartesianGrid, XAxis, Legend, Line, ComposedChart } from 'recharts';
import type { ChartData } from '@/lib/types';


const chartData: ChartData[] = [
    { month: "Mon", yourMinutes: 30, normalMinutes: 20 },
    { month: "Tue", yourMinutes: 45, normalMinutes: 35 },
    { month: "Wed", yourMinutes: 70, normalMinutes: 50 },
    { month: "Thu", yourMinutes: 50, normalMinutes: 40 },
    { month: "Fri", yourMinutes: 60, normalMinutes: 55 },
    { month: "Sat", yourMinutes: 55, normalMinutes: 60 },
    { month: "Sun", yourMinutes: 65, normalMinutes: 60 },
];

export function ExerciseMinutesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exercise Minutes</CardTitle>
        <CardDescription>
          Your exercise minutes are ahead of where you normally are.
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[250px]'>
        <ChartContainer config={{}} className="w-full h-full">
            <ComposedChart data={chartData}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }}/>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Legend />
                <Line type="monotone" dataKey="yourMinutes" stroke="hsl(var(--primary))" strokeWidth={2} name="You" />
                <Line type="monotone" dataKey="normalMinutes" stroke="hsl(var(--muted-foreground))" strokeWidth={2} name="Normal" />
            </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
