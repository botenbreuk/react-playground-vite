import { lazy } from 'react';
import { Route, Routes } from 'react-router';

const FinalFormPage = lazy(async () => ({
  default: (await import('./FinalFormPage')).FinalFormPage
}));
const TotpInputPage = lazy(async () => ({
  default: (await import('./TotpInput/TotpInputPage')).TotpInputPage
}));

export function FinalFormApp() {
  return (
    <Routes>
      <Route index element={<FinalFormPage />} />
      <Route path=":id" element={<FinalFormPage />} />
      <Route path="totp-field" element={<TotpInputPage />} />
    </Routes>
  );
}
