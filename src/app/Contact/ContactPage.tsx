import { urlBuilder } from '@42.nl/react-url';
import { Form, useField } from 'react-final-form';
import { Card, CardBody, CardHeader, FormGroup } from 'reactstrap';
import { Button, Page } from '../../ui';
import { Prompt } from '../../ui/Prompt/Prompt';
import { emailRequired, stringRequired, validateSchema, z } from '../FinalForm/utils';

const schema = z.object({
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
            initialValues={{ email: 'test@42.nl' }}
            validate={validateSchema(schema)}
            subscription={{ submitting: true, pristine: true, values: true }}
          >
            {({ handleSubmit, submitting, pristine }) => (
              <>
                <Prompt when={!submitting && !pristine} />
                <form onSubmit={handleSubmit}>
                  <FinalInput label="E-mail" name="email" />
                  <FinalInput label="Subject" name="subject" />
                  <FinalTextArea label="Message" name="message" />
                  <Button type="submit">Submit</Button>
                </form>
              </>
            )}
          </Form>
        </CardBody>
      </Card>
    </Page>
  );
}

function FinalInput({ label, name }: { label: string; name: string }) {
  const {
    input,
    meta: { error, invalid, touched }
  } = useField(name);
  return (
    <FormGroup style={{ display: 'grid' }}>
      <label>{label}</label>
      <input {...input} />
      {invalid && touched && error && <div className="text-danger">{error}</div>}
    </FormGroup>
  );
}

function FinalTextArea({ label, name }: { label: string; name: string }) {
  const {
    input,
    meta: { error, invalid, touched }
  } = useField(name);
  return (
    <FormGroup style={{ display: 'grid' }}>
      <label>{label}</label>
      <textarea {...input} rows={8} />
      {invalid && touched && error && <div className="text-danger">{error}</div>}
    </FormGroup>
  );
}

export function toContact() {
  return urlBuilder({ url: '/contact' });
}
