'use client';

import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'anima-theme';
const TRANSITION_DURATION = 300; // ms - matches --transition-slow

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // localStorage might not be available
  }
  return 'system';
}

function resolveTheme(theme: Theme): 'light' | 'dark' {
  return theme === 'system' ? getSystemTheme() : theme;
}

/**
 * Aplica transição suave entre temas
 */
function applyThemeWithTransition(newResolved: 'light' | 'dark') {
  const html = document.documentElement;
  
  // Adiciona classe de transição
  html.classList.add('theme-transition');
  
  // Aplica o novo tema
  html.classList.remove('light', 'dark');
  html.classList.add(newResolved);
  
  // Remove classe de transição após a animação
  setTimeout(() => {
    html.classList.remove('theme-transition');
  }, TRANSITION_DURATION);
}

/**
 * Aplica tema sem transição (para carga inicial)
 */
function applyThemeInstant(resolved: 'light' | 'dark') {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(resolved);
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setThemeInternal] = useState<Theme>(defaultTheme);
  const resolvedTheme = useMemo(() => resolveTheme(theme), [theme]);
  const isInitialMount = useRef(true);

  // Sync with localStorage and apply to DOM on mount
  // Using useLayoutEffect to prevent flash
  useLayoutEffect(() => {
    const stored = getInitialTheme();
    if (stored !== theme) {
      setThemeInternal(stored);
    }

    const resolved = resolveTheme(stored);
    applyThemeInstant(resolved);
    
    // Mark initial mount as complete
    isInitialMount.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply theme changes to DOM with transition (after initial mount)
  useLayoutEffect(() => {
    if (isInitialMount.current) return;
    applyThemeWithTransition(resolvedTheme);
  }, [resolvedTheme]);

  // Listen for system theme changes
  useLayoutEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const resolved = getSystemTheme();
      if (isInitialMount.current) {
        applyThemeInstant(resolved);
      } else {
        applyThemeWithTransition(resolved);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeInternal(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // localStorage might not be available
    }
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
