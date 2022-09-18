import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyle from '@styles/GlobalStyle';
import ThemeProvider from '@contexts/ThemeProvider';
import LANG from '@constants/language';
import Login from '@components/Login';
import Join from '@components/Join';
import Main from '@components/Main';
import Dictionary from '@components/Main/Dictionary';
import JoinForm from '@components/Join/JoinForm';
import JoinSuccess from '@components/Join/JoinSuccess';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Main />}>
                  {Object.entries(LANG).map(([type, { id }]) => {
                    if (type === 'ALL') {
                      return (
                        <Route
                          key={type}
                          index
                          element={<Dictionary type="ALL" />}
                        />
                      );
                    }
                    return (
                      <Route
                        key={type}
                        path={id}
                        element={<Dictionary type={type as DictionaryType} />}
                      />
                    );
                  })}
                  <Route path="*" element={<div>Not Found</div>} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route element={<Join />}>
                  <Route path="join/form" element={<JoinForm />} />
                  <Route path="join/success" element={<JoinSuccess />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
