'use client';

import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { hexToHslString } from '@/lib/utils';
import type { Theme } from '@/lib/types';
import { fonts } from '@/lib/fonts';

interface CustomThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomThemeContext = createContext<CustomThemeContextType | undefined>(
  undefined
);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const primaryHsl = hexToHslString(theme.primary);
  const backgroundHsl = hexToHslString(theme.background);
  const accentHsl = hexToHslString(theme.accent);

  if (primaryHsl) root.style.setProperty('--primary', primaryHsl);
  if (backgroundHsl) root.style.setProperty('--background', backgroundHsl);
  if (accentHsl) root.style.setProperty('--accent', accentHsl);

  root.style.setProperty('--font-body', theme.font);

  // Update google font link
  const font = fonts.find(f => f.name === theme.font);
  if (font) {
      const linkId = 'google-font-body';
      let link = document.getElementById(linkId) as HTMLLinkElement;
      if (!link) {
          link = document.createElement('link');
          link.id = linkId;
          link.rel = 'stylesheet';
          document.head.appendChild(link);
      }
      const fontUrl = `https://fonts.googleapis.com/css2?family=${font.value.replace(/ /g, '+')}:wght@400;500;600;700&display=swap`;
      if(link.href !== fontUrl) {
        link.href = fontUrl;
      }
  }
}

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>({
    primary: '#6B46C1',
    background: '#F7FAFC',
    accent: '#3182CE',
    font: 'Inter',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const { resolvedTheme } = useNextTheme();

  useEffect(() => {
    // This will run on initial load and whenever the theme state changes.
    applyTheme(theme);
  }, [theme]);

  // When the dark/light mode changes, re-apply colors to possibly update HSL values if they depend on it.
  useEffect(() => {
    if (resolvedTheme) {
      applyTheme(theme);
    }
  }, [resolvedTheme, theme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    isGenerating,
    setIsGenerating,
  }), [theme, isGenerating]);

  return (
    <CustomThemeContext.Provider value={value}>
      {children}
    </CustomThemeContext.Provider>
  );
}

// Wrapper to include both theme providers
export function AppThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <CustomThemeProvider>{children}</CustomThemeProvider>
        </NextThemesProvider>
    );
}
