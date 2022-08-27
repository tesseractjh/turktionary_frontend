import GlobalStyle from '@styles/GlobalStyle';
import ThemeProvider from '@contexts/ThemeProvider';
import Header from '@components/Header';
import { BrowserRouter } from 'react-router-dom';
import Dictionary from '@pages/Dictionary';
import MenuList from '@components/MenuList';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <MenuList />
          <Dictionary />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
