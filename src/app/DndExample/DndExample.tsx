import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container as BContainer } from 'reactstrap';
import { Page } from '../../ui';
import { Container } from './Container';

export default function DndExample() {
  return (
    <Page title="Drag and Drop page">
      <DndProvider backend={HTML5Backend}>
        <BContainer className="p-3 bg-light" fluid>
          <Container />
        </BContainer>
      </DndProvider>
    </Page>
  );
}
