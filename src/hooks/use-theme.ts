'use client';

import { useContext } from 'react';
import { CustomThemeContext } from '@/components/custom-theme-provider';

export const useTheme = () => {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a CustomThemeProvider');
  }
  return context;
};
