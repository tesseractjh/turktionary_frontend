import { Route, Routes } from 'react-router-dom';
import Login from '@pages/Login';
import Join from '@pages/Join';
import Main from '@pages/Main';
import Dictionary from '@pages/Main/Dictionary';
import JoinForm from '@pages/Join/JoinForm';
import JoinSuccess from '@pages/Join/JoinSuccess';

function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route index element={<Dictionary type="ALL" />} />
        <Route path="turkish" element={<Dictionary type="TR" />} />
        <Route path="azerbaijani" element={<Dictionary type="AZ" />} />
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
  );
}

export default App;
