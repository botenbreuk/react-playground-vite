import { Page } from '../../ui';
import './_not-found.scss';

export function NotFound() {
  return (
    <Page>
      <div className="not-found">
        <div className="content">Not found</div>
      </div>
    </Page>
  );
}
