import { urlBuilder } from '@42.nl/react-url';

import { Form } from 'react-final-form';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { Button, Page } from '../../ui';
import { JsonDebug } from '../../ui/JsonDebug/JsonDebug';
import { Prompt } from '../../ui/Prompt/Prompt';
import {
  emailRequired,
  enumRequired,
  stringRequired,
  validateSchema,
  z
} from '../FinalForm/utils';
import { FinalEditor } from './_parts/FinalEditor';
import { FinalInput } from './_parts/FinalInput';
import { FinalSelect } from './_parts/FinalSelect';

const options = ['VALUE_1', 'VALUE_2'];

const schema = z.object({
  type: enumRequired('Type', options),
  email: emailRequired('E-email'),
  subject: stringRequired('Subject'),
  message: stringRequired('Message')
});

type ContactFormData = z.infer<typeof schema>;

export function ContactPage() {
  function onSubmit(form: ContactFormData) {
    alert(JSON.stringify(form, null, 2));
  }

  return (
    <Page>
      <Card>
        <CardHeader>Test</CardHeader>
        <CardBody>
          <Form
            onSubmit={onSubmit}
            initialValues={{ type: 'VALUE_2', email: 'test@42.nl' }}
            validate={validateSchema(schema)}
            subscription={{ submitting: true, pristine: true, values: true }}
          >
            {({ handleSubmit, submitting, pristine, values }) => (
              <>
                <Prompt when={!submitting && !pristine} />
                <form onSubmit={handleSubmit}>
                  <FinalSelect
                    label="Type"
                    name="type"
                    options={[
                      { label: 'Value 1', value: 'VALUE_1' },
                      { label: 'Value 2', value: 'VALUE_2' }
                    ]}
                  />
                  <FinalInput label="E-mail" name="email" />
                  <FinalInput label="Subject" name="subject" />
                  <FinalEditor label="Message" name="message" />
                  <div className="d-flex gap-2">
                    <Button type="submit">Submit</Button>
                    <JsonDebug value={values} alignment="right" />
                  </div>
                </form>
              </>
            )}
          </Form>
        </CardBody>
      </Card>
    </Page>
  );
}

export function toContact() {
  return urlBuilder({ url: '/contact' });
}
