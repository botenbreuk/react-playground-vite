import { useState } from 'react';
import { FormGroup } from 'reactstrap';
import { Button, CopyToClipboard, Page } from '../../ui';
import { shuffle } from './utils';

export function ShuffleList() {
  const [value, setValue] = useState<string>('');

  function onShuffle() {
    const split = shuffle(value.split('\n'));
    const join = split.join('\n');
    setValue(join);
  }

  return (
    <Page title="Shuffle page">
      <div>
        <FormGroup>
          <textarea
            value={value}
            className="w-100"
            rows={20}
            onChange={e => setValue(e.target.value)}
          />
        </FormGroup>
        <div className="d-flex gap-2">
          <Button onClick={onShuffle}>Shuffle</Button>
          <CopyToClipboard color="warning" copyValue={value}>
            Copy
          </CopyToClipboard>
        </div>
      </div>
    </Page>
  );
}
