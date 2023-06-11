import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FINAL_FORM_PAGE_URL } from './FinalFormPage';

const FinalFormPage = lazy(
  () => import(/* webpackChunkName: "final-form-page" */ './FinalFormPage')
);

export default function FinalFormApp() {
  return (
    <Switch>
      <Route path={FINAL_FORM_PAGE_URL}>
        <FinalFormPage />
      </Route>
    </Switch>
  );
}
