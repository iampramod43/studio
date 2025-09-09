'use client';

import { useTheme } from '@/hooks/use-theme';
import { fonts } from '@/lib/fonts';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TypographyControls() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Typography</h3>
      <div className="space-y-2">
        <Label htmlFor="font-select">Font Family</Label>
        <Select
          value={theme.font}
          onValueChange={(value) => setTheme({ ...theme, font: value })}
        >
          <SelectTrigger id="font-select">
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
