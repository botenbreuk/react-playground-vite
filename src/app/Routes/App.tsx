import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Page } from '../../ui';
import CardBigPage from '../Cards/CardBigPage';
import CardsPage from '../Cards/CardsPage';
import { Dashboard } from '../Dashboard/Dashboard';
import Dnd from '../Dnd/Dnd';
import DndExample from '../DndExample/DndExample';
import FinalFormApp, { FINAL_FORM_APP_URL } from '../FinalForm/FinalFormApp';
import SettingsApp from '../Settings/SettingsApp';
import { SETTINGS_PAGE_URL } from '../Settings/SettingsPage';
import ShuffleList from '../Shuffle/ShuffleList';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />

        <Route path="/cards/*">
          <Route index element={<CardsPage />} />
          <Route path="big" element={<CardBigPage />} />
        </Route>
        <Route path="/shuffle" element={<ShuffleList />} />
        <Route path="/dnd" element={<Dnd />} />
        <Route path="/dnd-sort" element={<DndExample />} />
        <Route path={FINAL_FORM_APP_URL} element={<FinalFormApp />} />
        <Route path={SETTINGS_PAGE_URL} element={<SettingsApp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <Page>
      <div className="bg-light rounded p-3">Not found</div>
    </Page>
  );
}
