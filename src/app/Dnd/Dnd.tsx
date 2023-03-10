import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Page } from '../../ui';
import Container from './Container';

export default function Dnd() {
  return (
    <Page title="Drag and Drop page">
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </Page>
  );
}
