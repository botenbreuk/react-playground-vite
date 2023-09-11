import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const FinalFormPage = lazy(() => import('./FinalFormPage'));

export default function FinalFormApp() {
  return (
    <Routes>
      <Route index element={<FinalFormPage />} />
    </Routes>
  );
}
