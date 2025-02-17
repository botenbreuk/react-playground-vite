import { useState } from 'react';
import { Form, useField } from 'react-final-form';
import { Button, Page } from '../../ui';
import CardPanel from '../../ui/Card/CardPanel';
import { CopyToClipboard } from '../../ui/CopyToClipboard/CopyToClipboard';

function shuffle(array: string[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

export default function ShuffleList() {
  const [shuffled, setShuffled] = useState<string>('');

  function onSubmit(values: { item: string }) {
    const items = values.item.split('\n');
    shuffle(items);
    setShuffled(items.join('\n'));
  }

  return (
    <Page title="Shuffle page">
      <CardPanel title="Shuffle content">
        <div className="d-flex gap-2 align-items-start">
          <Form onSubmit={onSubmit} initialValues={{ item: shuffled }}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="d-grid gap-2 align-content-start">
                <FinalTextarea name="item" />
                <div className="d-flex gap-2" style={{ justifyContent: 'stretch' }}>
                  <Button block>Shuffle</Button>
                  <CopyToClipboard copyValue={shuffled} color="warning" block>
                    Copy shuffled
                  </CopyToClipboard>
                </div>
              </form>
            )}
          </Form>
        </div>
      </CardPanel>
    </Page>
  );
}

function FinalTextarea({ name }: { name: string }) {
  const { input } = useField(name);

  return <textarea {...input} style={{ width: '40rem', height: '20rem' }} autoFocus />;
}
