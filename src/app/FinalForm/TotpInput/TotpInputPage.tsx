import { useEffect } from 'react';
import { Page } from '../../../ui';

import './_totp-fields.scss';

export default function TotpInputPage() {
  useEffect(() => {
    // script.js
    const inputs = document.getElementById('inputs');

    if (inputs == null) {
      return;
    }

    inputs.addEventListener('input', e => {
      if (e.target instanceof HTMLInputElement) {
        const target = e.target;
        const val = target?.value;

        if (isNaN(parseInt(val))) {
          target.value = '';
          return;
        }

        if (val != '') {
          const next = target.nextElementSibling as HTMLElement;
          if (next) {
            next.focus();
          }
        }
      }
    });

    inputs.addEventListener('keyup', e => {
      if (e.target instanceof HTMLInputElement) {
        const target = e.target;
        const key = e.key.toLowerCase();

        if (key == 'backspace' || key == 'delete') {
          target.value = '';
          const prev = target.previousElementSibling as HTMLElement;
          if (prev) {
            prev.focus();
          }
          return;
        }
      }
    });
  }, []);

  return (
    <Page>
      <div className="bg-light d-flex justify-content-center p-5">
        <div id="inputs" className="inputs">
          <input className="input" type="text" inputMode="numeric" maxLength={1} />
          <input className="input" type="text" inputMode="numeric" maxLength={1} />
          <input className="input" type="text" inputMode="numeric" maxLength={1} />
          <input className="input" type="text" inputMode="numeric" maxLength={1} />
          <input className="input" type="text" inputMode="numeric" maxLength={1} />
          <input className="input" type="text" inputMode="numeric" maxLength={1} />
        </div>
      </div>
    </Page>
  );
}

export const FINAL_FORM_TOTP_FIELD_PAGE_URL = '/final-form/totp-field';
