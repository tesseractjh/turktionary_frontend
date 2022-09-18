import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyle from '@styles/GlobalStyle';
import ThemeProvider from '@contexts/ThemeProvider';
import LANG from '@constants/language';

const queryClient = new QueryClient();

function SuspsenseFallback() {
  const Fallback = lazy<React.FC>(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(import('@components/common/Fallback')), 300)
      )
  );
  return (
    <Suspense>
      <Fallback />
    </Suspense>
  );
}

const Main = lazy(() => import('@components/Main'));
const Dictionary = lazy(() => import('@components/Main/Dictionary'));
const Login = lazy(() => import('@components/Login'));
const Join = lazy(() => import('@components/Join'));
const JoinForm = lazy(() => import('@components/Join/JoinForm'));
const JoinSuccess = lazy(() => import('@components/Join/JoinSuccess'));

function App() {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <BrowserRouter>
              <Suspense fallback={<SuspsenseFallback />}>
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
              </Suspense>
            </BrowserRouter>
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
