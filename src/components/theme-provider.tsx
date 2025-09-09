'use client';

import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Theme } from '@/lib/types';
import { fonts } from '@/lib/fonts';
import { hexToHslString, hslStringToHex } from '@/lib/utils';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
  initialTheme: Theme;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const initialTheme: Theme = {
  primary: '#6415ff',
  background: '#f0e6ff',
  accent: '#0077cc',
  font: 'Inter',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // On mount, read the computed styles from CSS and set the initial theme
    // This ensures our state matches the default CSS variables
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryHsl = `hsl(${computedStyle.getPropertyValue('--primary').trim()})`;
      const backgroundHsl = `hsl(${computedStyle.getPropertyValue('--background').trim()})`;
      const accentHsl = `hsl(${computedStyle.getPropertyValue('--accent').trim()})`;
      
      const newInitialTheme = {
        primary: hslStringToHex(primaryHsl),
        background: hslStringToHex(backgroundHsl),
        accent: hslStringToHex(accentHsl),
        font: 'Inter'
      };
      setTheme(newInitialTheme);
    }
  }, []);

  const applyTheme = useCallback((currentTheme: Theme) => {
    if (typeof window === 'undefined') return;

    // Apply colors
    const root = document.documentElement;
    const primaryHsl = hexToHslString(currentTheme.primary);
    const backgroundHsl = hexToHslString(currentTheme.background);
    const accentHsl = hexToHslString(currentTheme.accent);

    if (primaryHsl) root.style.setProperty('--primary', primaryHsl);
    if (backgroundHsl) root.style.setProperty('--background', backgroundHsl);
    if (accentHsl) root.style.setProperty('--accent', accentHsl);

    // Apply font
    root.style.setProperty('--font-body', currentTheme.font);
    root.style.setProperty('--font-headline', currentTheme.font);
    document.body.style.fontFamily = `var(--font-body), sans-serif`;

    // Load font from Google Fonts
    const fontId = 'dynamic-google-font';
    let link = document.getElementById(fontId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    const font = fonts.find(f => f.value === currentTheme.font);
    if (font) {
      link.href = `https://fonts.googleapis.com/css2?family=${font.value.replace(/ /g, '+')}:wght@400;700&display=swap`;
    }
  }, []);

  useEffect(() => {
    if(isMounted) {
      applyTheme(theme);
    }
  }, [theme, isMounted, applyTheme]);
  
  const resetTheme = useCallback(() => {
    // Remove inline styles to revert to stylesheet
     if (typeof window !== 'undefined') {
        const root = document.documentElement;
        root.style.removeProperty('--primary');
        root.style.removeProperty('--background');
        root.style.removeProperty('--accent');
        root.style.removeProperty('--font-body');
        root.style.removeProperty('--font-headline');
        document.body.style.fontFamily = '';

        const computedStyle = getComputedStyle(document.documentElement);
        const primaryHsl = `hsl(${computedStyle.getPropertyValue('--primary').trim()})`;
        const backgroundHsl = `hsl(${computedStyle.getPropertyValue('--background').trim()})`;
        const accentHsl = `hsl(${computedStyle.getPropertyValue('--accent').trim()})`;
        
        const defaultTheme = {
          primary: hslStringToHex(primaryHsl),
          background: hslStringToHex(backgroundHsl),
          accent: hslStringToHex(accentHsl),
          font: 'Inter'
        };
        setTheme(defaultTheme);
     }
  }, []);

  const value = useMemo(() => ({
    theme,
    setTheme,
    resetTheme,
    initialTheme: isMounted ? theme : initialTheme,
  }), [theme, resetTheme, isMounted]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
