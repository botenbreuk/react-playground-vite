import { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

const FinalFormPage = lazy(() => import('./FinalFormPage'));
const TotpInputPage = lazy(() => import('./TotpInput/TotpInputPage'));

export default function FinalFormApp() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route index element={<FinalFormPage />} />
        <Route path=":id" element={<FinalFormPage />} />
        <Route path="totp-field" element={<TotpInputPage />} />
      </Route>
    </Routes>
  );
}

export const FINAL_FORM_APP_URL = '/final-form/*';
