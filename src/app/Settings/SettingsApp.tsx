import { lazy } from 'react';
import { Route, Routes } from 'react-router';

const SettingsPage = lazy(async () => ({
  default: (await import('./SettingsPage')).SettingsPage
}));

export function SettingsApp() {
  return (
    <Routes>
      <Route index element={<SettingsPage />} />
    </Routes>
  );
}
