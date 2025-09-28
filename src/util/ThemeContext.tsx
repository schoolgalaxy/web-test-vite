import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface NavbarColors {
  background: string;
  hover: string;
  text: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  navbarColors: NavbarColors;
  setNavbarColors: (colors: NavbarColors) => void;
  resetNavbarColors: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [navbarColors, setNavbarColorsState] = useState<NavbarColors>(() => {
    const saved = localStorage.getItem('navbarColors');
    return saved ? JSON.parse(saved) : {
      background: '#a7cdf3',
      hover: '#7fd5f1',
      text: '#2c5282'
    };
  });

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply navbar colors to CSS custom properties
  useEffect(() => {
    document.documentElement.style.setProperty('--navbar-bg-custom', navbarColors.background);
    document.documentElement.style.setProperty('--navbar-hover-custom', navbarColors.hover);
    document.documentElement.style.setProperty('--navbar-text-custom', navbarColors.text);
    localStorage.setItem('navbarColors', JSON.stringify(navbarColors));
  }, [navbarColors]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setNavbarColors = (colors: NavbarColors) => {
    setNavbarColorsState(colors);
  };

  const resetNavbarColors = () => {
    const defaultColors = theme === 'light'
      ? { background: '#a7cdf3', hover: '#7fd5f1', text: '#2c5282' }
      : { background: '#2c5282', hover: '#3d6b9d', text: '#ffffff' };
    setNavbarColorsState(defaultColors);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      navbarColors,
      setNavbarColors,
      resetNavbarColors
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