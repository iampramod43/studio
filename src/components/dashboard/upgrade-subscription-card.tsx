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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export function UpgradeSubscriptionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upgrade your subscription</CardTitle>
        <CardDescription>
          You are currently on the free plan. Upgrade to the pro plan to get
          access to all features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Evil Rabbit" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@acme.com" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <div className="flex gap-2">
            <Input id="card-number" placeholder="1234 1234 1234 1234" />
            <Input placeholder="MM/YY" className="w-24" />
            <Input placeholder="CVC" className="w-16" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Plan</Label>
          <RadioGroup defaultValue="starter" className="grid grid-cols-2 gap-4">
            <div>
              <RadioGroupItem value="starter" id="starter" className="peer sr-only" />
              <Label
                htmlFor="starter"
                className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="font-semibold">Starter Plan</span>
                <span className="text-sm">Perfect for small businesses.</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="pro" id="pro" className="peer sr-only" />
              <Label
                htmlFor="pro"
                className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="font-semibold">Pro Plan</span>
                <span className="text-sm">More features and storage.</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder='Enter notes' />
        </div>
        <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">I agree to the terms and conditions</Label>
        </div>
        <div className="flex items-center space-x-2">
            <Checkbox id="send-emails" checked />
            <Label htmlFor="send-emails">Allow us to send you emails</Label>
        </div>
      </CardContent>
    </Card>
  );
}
