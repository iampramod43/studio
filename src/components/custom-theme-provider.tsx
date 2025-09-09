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
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  const primaryHsl = hexToHslString(theme.primary);
  const backgroundHsl = hexToHslString(theme.background);
  const accentHsl = hexToHslString(theme.accent);
  
  // We only set the values if they are valid HSL strings.
  // The CSS file will provide the defaults.
  if (primaryHsl) root.style.setProperty('--primary', primaryHsl);
  if (backgroundHsl) root.style.setProperty('--background', backgroundHsl);
  if (accentHsl) root.style.setProperty('--accent', accentHsl);

  // Set ring color based on primary color
  if(primaryHsl) root.style.setProperty('--ring', primaryHsl);

  const body = document.body;
  const font = fonts.find(f => f.name === theme.font);
  if (font) {
    body.style.fontFamily = `'${font.value}', sans-serif`;
    
    // Update google font link
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
    applyTheme(theme);
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
