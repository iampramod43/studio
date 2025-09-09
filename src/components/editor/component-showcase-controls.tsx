'use client';

import type { Dispatch, SetStateAction } from 'react';
import type { ShowcaseComponents } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

type ComponentShowcaseControlsProps = {
  showcase: ShowcaseComponents;
  setShowcase: Dispatch<SetStateAction<ShowcaseComponents>>;
};

export function ComponentShowcaseControls({
  showcase,
  setShowcase,
}: ComponentShowcaseControlsProps) {
  const handleCheckedChange = (key: keyof ShowcaseComponents) => (checked: boolean) => {
    setShowcase((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Showcase Components</h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.keys(showcase).map((key) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              id={key}
              checked={showcase[key as keyof ShowcaseComponents]}
              onCheckedChange={handleCheckedChange(key as keyof ShowcaseComponents)}
            />
            <Label htmlFor={key} className="capitalize font-normal">
              {key}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
