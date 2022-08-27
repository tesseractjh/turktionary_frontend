import { useContext } from 'react';
import { ThemeContext } from '@contexts/ThemeProvider';

const useMode = (): [ThemeName, () => void] => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('Invalid Theme Mode');
  }
  const { mode, handleClick } = themeContext;
  return [mode, handleClick];
};

export default useMode;
