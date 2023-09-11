import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardBigPage from '../Cards/CardBigPage';
import CardsPage from '../Cards/CardsPage';
import { Dashboard } from '../Dashboard/Dashboard';
import Dnd from '../Dnd/Dnd';
import DndExample from '../DndExample/DndExample';
import FinalFormApp from '../FinalForm/FinalFormApp';
import { FINAL_FORM_PAGE_URL } from '../FinalForm/FinalFormPage';
import SettingsApp from '../Settings/SettingsApp';
import { SETTINGS_PAGE_URL } from '../Settings/SettingsPage';
import ShuffleList from '../Shuffle/ShuffleList';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/cards">
          <Route index element={<CardsPage />} />
          <Route path="big" element={<CardBigPage />} />
        </Route>
        <Route path="/shuffle" element={<ShuffleList />} />
        <Route path="/dnd" element={<Dnd />} />
        <Route path="/dnd-sort" element={<DndExample />} />
        <Route path={FINAL_FORM_PAGE_URL} element={<FinalFormApp />} />
        <Route path={SETTINGS_PAGE_URL} element={<SettingsApp />} />
      </Routes>
    </BrowserRouter>
  );
}
