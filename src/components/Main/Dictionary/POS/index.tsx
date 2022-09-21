import { Route, Routes } from 'react-router-dom';
import POSEdit from './POSEdit';
import POSList from './POSList';

function POS() {
  return (
    <Routes>
      <Route index element={<POSList />} />
      <Route path="create" element={<POSEdit isCreate />} />
    </Routes>
  );
}

export default POS;
