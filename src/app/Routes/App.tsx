import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider
} from 'react-router';
import { AdvancedTablePage } from '../AdvancedTable/AdvancedTablePage';
import { CardBigPage } from '../Cards/CardBigPage';
import { CardsPage } from '../Cards/CardsPage';
import { Dashboard } from '../Dashboard/Dashboard';
import { Dnd } from '../Dnd/Dnd';
import { DndExample } from '../DndExample/DndExample';
import { FinalFormApp } from '../FinalForm/FinalFormApp';
import { NotFound } from '../NotFound/NotFound';
import { SettingsApp } from '../Settings/SettingsApp';
import { ShuffleList } from '../Shuffle/ShuffleList';

const ContactPage = lazy(() =>
  import('../Contact/ContactPage').then(m => ({ default: m.ContactPage }))
);

export function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route element={<Outlet />}>
              <Route index element={<Dashboard />} />
              <Route path="cards">
                <Route index element={<CardsPage />} />
                <Route path="big" element={<CardBigPage />} />
              </Route>
              <Route path="contact" element={<ContactPage />} />
              <Route path="shuffle" element={<ShuffleList />} />
              <Route path="dnd" element={<Dnd />} />
              <Route path="dnd-sort" element={<DndExample />} />
              <Route path="table" element={<AdvancedTablePage />} />
              <Route path="final-form/*" element={<FinalFormApp />} />
              <Route path="settings" element={<SettingsApp />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </>
        )
      )}
    />
  );
}
