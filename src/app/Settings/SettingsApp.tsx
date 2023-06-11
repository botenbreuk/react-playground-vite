import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SETTINGS_PAGE_URL } from './SettingsPage';

const SettingsPage = lazy(
  () => import(/* webpackChunkName: "final-form-page" */ './SettingsPage')
);

export default function SettingsApp() {
  return (
    <Switch>
      <Route path={SETTINGS_PAGE_URL}>
        <SettingsPage />
      </Route>
    </Switch>
  );
}
