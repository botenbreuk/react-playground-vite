import { useField } from 'react-final-form';
import { FormGroup } from 'reactstrap';

export function FinalSelect({
  label,
  name,
  options
}: {
  label: string;
  name: string;
  options: { label: string; value: string }[];
}) {
  const {
    input,
    meta: { error, invalid, touched }
  } = useField(name);

  return (
    <FormGroup style={{ display: 'grid' }}>
      <label>{label}</label>
      <select {...input} className="form-select">
        <option value="" disabled>
          -- Select {label.toLocaleLowerCase()} --
        </option>
        {options.map(v => (
          <option key={v.value} value={v.value}>
            {v.label}
          </option>
        ))}
      </select>
      {invalid && touched && error && <div className="text-danger">{error}</div>}
    </FormGroup>
  );
}
