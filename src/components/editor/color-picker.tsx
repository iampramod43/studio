'use client';

import type { ChangeEvent } from 'react';
import { Label } from '@/components/ui/label';

type ColorPickerProps = {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center justify-between">
      <Label>{label}</Label>
      <div className="relative h-8 w-14 rounded-md border border-input overflow-hidden">
        <input
          type="color"
          value={value}
          onChange={onChange}
          className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
        />
        <div
          className="w-full h-full"
          style={{ backgroundColor: value }}
        />
      </div>
    </div>
  );
}
