import { useEffect, useCallback } from 'react';

const THEME_KEY = 'thapar-atlas-theme';

export function useTheme() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    try {
      localStorage.setItem(THEME_KEY, 'dark');
    } catch {
      // localStorage unavailable
    }
  }, []);

  const toggleTheme = useCallback(() => {}, []);

  return { theme: 'dark', toggleTheme, isDark: true };
}
