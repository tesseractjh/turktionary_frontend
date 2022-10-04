import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import License from '@components/common/License';

const Voca = lazy(() => import('@components/Main/Dictionary/Vocabulary/Voca'));

function Vocabulary() {
  return (
    <>
      <Routes>
        <Route index element={<Voca />} />
      </Routes>
      <License />
    </>
  );
}

export default Vocabulary;
