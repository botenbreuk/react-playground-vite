import { Page } from '../../ui';
import CardPanel from '../Cards/CardPanel';
import CardIcon from '../Cards/parts/CardIcon';

export default function FinalFormPage() {
  return (
    <Page>
      <CardPanel
        title="Settings"
        icon="bi-smartwatch"
        footer={[
          <CardIcon type="bi-check" color="green" />,
          <span className="text">2022-01-01</span>
        ]}
      >
        Settings
      </CardPanel>
    </Page>
  );
}

export const SETTINGS_PAGE_URL = '/settings';
