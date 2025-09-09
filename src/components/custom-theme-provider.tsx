'use client';

import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { hexToHslString } from '@/lib/utils';
import type { Theme, ColorTheme } from '@/lib/types';
import { fonts } from '@/lib/fonts';
import { defaultTheme } from '@/lib/default-theme';

interface CustomThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomThemeContext = createContext<CustomThemeContextType | undefined>(
  undefined
);

function applyTheme(theme: Theme, resolvedTheme: string | undefined) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  const currentTheme = resolvedTheme === 'dark' ? theme.dark : theme.light;

  for (const [key, value] of Object.entries(currentTheme)) {
    const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    const hslString = hexToHslString(value);
    if (hslString) {
      root.style.setProperty(cssVar, hslString);
    }
  }

  // Handle radius and font
  root.style.setProperty('--radius', `${theme.radius}rem`);
  
  const body = document.body;
  const font = fonts.find(f => f.name === theme.font);
  if (font) {
    body.style.fontFamily = `'${font.value}', sans-serif`;
    
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
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isGenerating, setIsGenerating] = useState(false);
  const { resolvedTheme } = useNextTheme();

  useEffect(() => {
    const url = new URL(window.location.href);
    const themeStr = url.searchParams.get('theme');
    if (themeStr) {
      try {
        const urlTheme = JSON.parse(themeStr);
        setTheme(urlTheme);
      } catch (e) {
        console.error("Could not parse theme from URL", e);
      }
    }
  }, []);

  useEffect(() => {
    applyTheme(theme, resolvedTheme);
  }, [theme, resolvedTheme]);

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
