import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from '@styles/GlobalStyle';
import ThemeProvider from '@contexts/ThemeProvider';
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
                  <Route index element={<Dictionary type="ALL" />} />
                  <Route path="turkish" element={<Dictionary type="TR" />} />
                  <Route
                    path="azerbaijani"
                    element={<Dictionary type="AZ" />}
                  />
                  <Route path="uzbek" element={<Dictionary type="UZ" />} />
                  <Route path="kazakh" element={<Dictionary type="KZ" />} />
                  <Route path="turkmen" element={<Dictionary type="TM" />} />
                  <Route path="kyrgyz" element={<Dictionary type="KG" />} />
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
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
