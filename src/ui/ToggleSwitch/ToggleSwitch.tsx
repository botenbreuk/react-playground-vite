import { omit } from 'lodash';
import { FinalFieldProps } from '../../types/final-form-types';

type Props = {
  label?: string;
};

export function ToggleSwitch(props: Omit<FinalFieldProps<Props, boolean>, 'value'>) {
  const { label = '' } = props;
  return (
    <label className="toggle-switch">
      <span className="switch">
        <input {...omit(props, 'value')} type="checkbox" />
        <span className="slider round" />
      </span>
      {label}
    </label>
  );
}
