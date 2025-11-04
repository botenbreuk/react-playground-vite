import { useField } from 'react-final-form';
import { FormGroup } from 'reactstrap';

export function FinalTextArea({ label, name }: { label: string; name: string }) {
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
