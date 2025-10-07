import { Page } from '../../ui';
import { CardPanel } from '../Cards/CardPanel';
import { CardIcon } from '../Cards/parts/CardIcon';

export function SettingsPage() {
  return (
    <Page>
      <CardPanel
        title="Settings"
        icon="bi-smartwatch"
        footer={[
          <CardIcon key={1} type="bi-check" color="green" />,
          <span key={2} className="text">
            2022-01-01
          </span>
        ]}
      >
        Settings
      </CardPanel>
    </Page>
  );
}

export const SETTINGS_PAGE_URL = '/settings';
