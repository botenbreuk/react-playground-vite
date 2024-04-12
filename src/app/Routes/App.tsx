import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import CardBigPage from '../Cards/CardBigPage';
import CardsPage from '../Cards/CardsPage';
import { Dashboard } from '../Dashboard/Dashboard';
import Dnd from '../Dnd/Dnd';
import DndExample from '../DndExample/DndExample';
import FinalFormApp, { FINAL_FORM_APP_URL } from '../FinalForm/FinalFormApp';
import NotFound from '../NotFound/NotFound';
import SettingsApp from '../Settings/SettingsApp';
import { SETTINGS_PAGE_URL } from '../Settings/SettingsPage';
import ShuffleList from '../Shuffle/ShuffleList';

export function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route element={<Outlet />}>
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
            </Route>
            <Route path="*" element={<NotFound />} />
          </>
        )
      )}
    />
  );
}
