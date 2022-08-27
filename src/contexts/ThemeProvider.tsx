import { createContext, useCallback, useState } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import themeGroup from '@styles/theme';

interface ThemeContextValue {
  mode: ThemeName;
  handleClick: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const getInitialMode = (): ThemeName => {
  try {
    const storedMode = window.localStorage.getItem('themeMode');
    return storedMode === 'LIGHT' || storedMode === 'DARK'
      ? storedMode
      : 'LIGHT';
  } catch {
    return 'LIGHT';
  }
};

const toggle = (
  setMode: React.Dispatch<React.SetStateAction<ThemeName>>,
  mode: ThemeName
) => {
  try {
    setMode(mode);
    window.localStorage.setItem('themeMode', mode);
  } catch {}
};

function ThemeProvider({ children }: Props) {
  const initialMode = getInitialMode();
  const [themeMode, setThemeMode] = useState<ThemeName>(initialMode);
  const toggleTheme = useCallback(() => {
    if (themeMode === 'LIGHT') {
      toggle(setThemeMode, 'DARK');
    } else {
      toggle(setThemeMode, 'LIGHT');
    }
  }, [themeMode]);
  return (
    <ThemeContext.Provider
      value={{ mode: themeMode, handleClick: toggleTheme }}
    >
      <EmotionThemeProvider theme={themeGroup[themeMode]}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
