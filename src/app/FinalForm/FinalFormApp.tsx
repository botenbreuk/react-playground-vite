import { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

const FinalFormPage = lazy(() => import('./FinalFormPage'));

export default function FinalFormApp() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route index element={<FinalFormPage />} />
        <Route path=":id" element={<FinalFormPage />} />
      </Route>
    </Routes>
  );
}

export const FINAL_FORM_APP_URL = '/final-form/*';
