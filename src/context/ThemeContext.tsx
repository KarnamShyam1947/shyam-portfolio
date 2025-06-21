import React, { createContext, useState, useEffect, useContext } from 'react';

type Theme = 'light' | 'dark';
type ColorScheme = 'teal' | 'purple' | 'blue' | 'rose';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
  isThemeControlOpen: boolean;
  toggleThemeControl: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorSchemes = {
  teal: {
    primary: 'from-teal-500 to-teal-600',
    accent: 'text-teal-500 dark:text-teal-400',
    accentHover: 'hover:text-teal-500 dark:hover:text-teal-400',
    button: 'bg-teal-500 hover:bg-teal-600',
    border: 'border-teal-500',
    ring: 'ring-teal-500',
  },
  purple: {
    primary: 'from-purple-500 to-purple-600',
    accent: 'text-purple-500 dark:text-purple-400',
    accentHover: 'hover:text-purple-500 dark:hover:text-purple-400',
    button: 'bg-purple-500 hover:bg-purple-600',
    border: 'border-purple-500',
    ring: 'ring-purple-500',
  },
  blue: {
    primary: 'from-blue-500 to-blue-600',
    accent: 'text-blue-500 dark:text-blue-400',
    accentHover: 'hover:text-blue-500 dark:hover:text-blue-400',
    button: 'bg-blue-500 hover:bg-blue-600',
    border: 'border-blue-500',
    ring: 'ring-blue-500',
  },
  rose: {
    primary: 'from-rose-500 to-rose-600',
    accent: 'text-rose-500 dark:text-rose-400',
    accentHover: 'hover:text-rose-500 dark:hover:text-rose-400',
    button: 'bg-rose-500 hover:bg-rose-600',
    border: 'border-rose-500',
    ring: 'ring-rose-500',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    return (localStorage.getItem('colorScheme') as ColorScheme) || 'teal';
  });

  const [isThemeControlOpen, setIsThemeControlOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleThemeControl = () => {
    setIsThemeControlOpen(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      colorScheme, 
      toggleTheme, 
      setColorScheme,
      isThemeControlOpen,
      toggleThemeControl
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const getColorScheme = (scheme: ColorScheme) => colorSchemes[scheme];