'use client';
import type { ShowcaseComponents } from '@/lib/types';
import Image from 'next/image';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Terminal } from 'lucide-react';

type ComponentPreviewProps = {
  showcase: ShowcaseComponents;
};

export default function ComponentPreview({ showcase }: ComponentPreviewProps) {
  return (
    <div className="space-y-8">
      {showcase.buttons && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>
      )}

      {showcase.cards && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Card</h2>
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>The Enchanted Forest</CardTitle>
              <CardDescription>A journey into the unknown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image 
                src="https://picsum.photos/400/250"
                alt="Enchanted forest" 
                data-ai-hint="enchanted forest"
                width={400}
                height={250}
                className="rounded-md"
              />
              <p>Discover ancient secrets and mystical creatures as you venture through the vibrant, glowing flora of a forest untouched by time.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Explore</Button>
            </CardFooter>
          </Card>
        </section>
      )}
      
      {showcase.alerts && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Alerts</h2>
          <div className="space-y-4 max-w-lg">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the CLI.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          </div>
        </section>
      )}

      {showcase.inputs && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Input</h2>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
        </section>
      )}

      {showcase.avatars && (
         <section>
          <h2 className="text-2xl font-bold mb-4">Avatar</h2>
          <Avatar>
            <AvatarImage src="https://picsum.photos/100/100" data-ai-hint="person portrait" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </section>
      )}

      {showcase.tabs && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Tabs</h2>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader><CardTitle>Account</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Son Gohan" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@gohan" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader><CardTitle>Password</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      )}
    </div>
  );
}
