import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App/App';
import CardBigPage from '../Cards/CardBigPage';
import CardsPage from '../Cards/CardsPage';
import Dnd from '../Dnd/Dnd';
import DndExample from '../DndExample/DndExample';
import FinalFormApp from '../FinalForm/FinalFormApp';
import { FINAL_FORM_PAGE_URL } from '../FinalForm/FinalFormPage';
import SettingsApp from '../Settings/SettingsApp';
import { SETTINGS_PAGE_URL } from '../Settings/SettingsPage';
import ShuffleList from '../Shuffle/ShuffleList';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/cards">
          <CardsPage />
        </Route>
        <Route exact path="/cards/big">
          <CardBigPage />
        </Route>
        <Route exact path="/shuffle">
          <ShuffleList />
        </Route>
        <Route exact path="/dnd">
          <Dnd />
        </Route>
        <Route exact path="/dnd-sort">
          <DndExample />
        </Route>
        <Route exact path={FINAL_FORM_PAGE_URL}>
          <FinalFormApp />
        </Route>
        <Route exact path={SETTINGS_PAGE_URL}>
          <SettingsApp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
