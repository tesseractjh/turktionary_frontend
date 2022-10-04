import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import License from '@components/common/License';

const POSList = lazy(() => import('@components/Main/Dictionary/POS/POSList'));
const POSEdit = lazy(() => import('@components/Main/Dictionary/POS/POSEdit'));
const POSReport = lazy(
  () => import('@components/Main/Dictionary/POS/POSReport')
);

function POS() {
  return (
    <>
      <Routes>
        <Route index element={<POSList />} />
        <Route path="create" element={<POSEdit isCreate />} />
        <Route path="edit/:posName" element={<POSEdit />} />
        <Route path="report/:posId" element={<POSReport />} />
      </Routes>
      <License />
    </>
  );
}

export default POS;
