'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CirclePlus } from 'lucide-react';
import { Button } from '../ui/button';

export function HelpCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://picsum.photos/100" data-ai-hint="person portrait" />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base font-semibold">Sofia Davis</CardTitle>
            <p className="text-sm text-muted-foreground">m@example.com</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
            <CirclePlus />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="font-medium">Hi, how can I help you today?</p>
        <div className="mt-4 flex justify-end">
            <div className='bg-primary text-primary-foreground p-2 rounded-md max-w-xs'>
                Hey, I'm having trouble with my
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
