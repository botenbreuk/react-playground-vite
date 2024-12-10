import { lazy } from 'react';
import { Route, Routes } from 'react-router';

const SettingsPage = lazy(() => import('./SettingsPage'));

export default function SettingsApp() {
  return (
    <Routes>
      <Route index element={<SettingsPage />} />
    </Routes>
  );
}
