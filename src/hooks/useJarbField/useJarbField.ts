import { JarbProps } from '@42.nl/jarb-final-form';
import { FieldValidator } from 'final-form';
import { useField, UseFieldConfig } from 'react-final-form';
import { useComposeValidators, useJarbValidators } from './jarbValidators';

export type JarbFieldInputProps<FieldValue> = JarbFieldOptions<FieldValue> & {
  // Name for the field errors from the backend like Melding.naam.
  fieldName?: string;
};

export type JarbFieldOptions<FieldValue> = Omit<
  UseFieldConfig<FieldValue>,
  'validate'
> & {
  name: string;
  jarb: JarbProps;
  validators?: FieldValidator<FieldValue>[];
  asyncValidators?: FieldValidator<FieldValue>[];
  asyncValidatorsDebounce?: number;
};

export default function useJarbField<FieldValue>(options: JarbFieldOptions<FieldValue>) {
  const {
    name,
    jarb,
    validators = [],
    asyncValidators = [],
    asyncValidatorsDebounce
  } = options;

  const jarbValidators = useJarbValidators<FieldValue>(jarb);
  const validate = useComposeValidators({
    validators: [...jarbValidators, ...validators],
    asyncValidators,
    asyncValidatorsDebounce
  });

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
