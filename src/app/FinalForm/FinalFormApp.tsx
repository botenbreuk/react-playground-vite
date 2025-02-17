import { lazy } from 'react';
import { Route, Routes } from 'react-router';

const FinalFormPage = lazy(() => import('./FinalFormPage'));
const TotpInputPage = lazy(() => import('./TotpInput/TotpInputPage'));

export function FinalFormApp() {
  return (
    <Routes>
      <Route index element={<FinalFormPage />} />
      <Route path=":id" element={<FinalFormPage />} />
      <Route path="totp-field" element={<TotpInputPage />} />
    </Routes>
  );
}

export const FINAL_FORM_APP_URL = 'final-form/*';
