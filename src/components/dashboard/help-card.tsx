'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '../ui/button';

export function HelpCard() {
  return (
    <Card>
      <CardContent className='p-4'>
        <p className="font-medium">Hi, how can I help you today?</p>
        <div className="mt-4 flex justify-end">
            <div className='bg-primary text-primary-foreground p-2 rounded-md max-w-xs text-sm'>
                Hey, I'm having trouble with my account.
            </div>
        </div>
         <div className="mt-2 flex justify-end">
            <Button>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
