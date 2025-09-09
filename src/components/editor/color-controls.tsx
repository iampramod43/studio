'use client';

import { useTheme } from '@/hooks/use-theme';
import { ColorPicker } from './color-picker';

export function ColorControls() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Colors</h3>
      <div className="space-y-3">
        <ColorPicker
          label="Primary"
          value={theme.primary}
          onChange={(e) => setTheme({ ...theme, primary: e.target.value })}
        />
        <ColorPicker
          label="Background"
          value={theme.background}
          onChange={(e) => setTheme({ ...theme, background: e.target.value })}
        />
        <ColorPicker
          label="Accent"
          value={theme.accent}
          onChange={(e) => setTheme({ ...theme, accent: e.target.value })}
        />
      </div>
    </div>
  );
}
