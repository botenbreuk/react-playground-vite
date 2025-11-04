import { useField } from 'react-final-form';
import { FormGroup } from 'reactstrap';

export function FinalInput({ label, name }: { label: string; name: string }) {
  const {
    input,
    meta: { error, invalid, touched }
  } = useField(name);

  return (
    <FormGroup style={{ display: 'grid' }}>
      <label>{label}</label>
      <input {...input} className="form-control" />
      {invalid && touched && error && <div className="text-danger">{error}</div>}
    </FormGroup>
  );
}
