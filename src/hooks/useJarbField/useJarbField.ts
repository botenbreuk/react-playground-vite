import { JarbProps } from '@42.nl/jarb-final-form';
import { FieldValidator } from 'final-form';
import { useField, UseFieldConfig } from 'react-final-form';
import { useEnhancedValidate } from './jarbValidators';

export type JarbFieldInputProps<FieldValue> = JarbFieldOptions<FieldValue> & {
  // Name for the field errors from the backend like Melding.naam.
  fieldName?: string;
};
export interface JarbFieldOptions<FieldValue>
  extends Omit<UseFieldConfig<FieldValue>, 'validate'> {
  name: string;
  jarb: JarbProps;
  validators?: FieldValidator<FieldValue>[];
}

export default function useJarbField<FieldValue>(
  options: JarbFieldOptions<FieldValue>
) {
  const { name } = options;
  const validate = useEnhancedValidate(options);
  const fieldProps = useField<FieldValue>(name, {
    ...options,
    validate
  });

  const onChange = fieldProps.input.onChange;
  fieldProps.input.onChange = (value: FieldValue) => {
    onChange(value);
  };
  return fieldProps;
}
