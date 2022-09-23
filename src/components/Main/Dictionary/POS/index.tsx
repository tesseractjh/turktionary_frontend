import { Route, Routes } from 'react-router-dom';
import POSEdit from './POSEdit';
import POSList from './POSList';
import POSReport from './POSReport';

function POS() {
  return (
    <Routes>
      <Route index element={<POSList />} />
      <Route path="create" element={<POSEdit isCreate />} />
      <Route path="edit/:posOrder" element={<POSEdit />} />
      <Route path="report/:posId" element={<POSReport />} />
    </Routes>
  );
}

export default POS;
