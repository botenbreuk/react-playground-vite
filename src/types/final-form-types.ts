import { FieldInputProps, UseFieldConfig } from 'react-final-form';
import { JarbFieldInputProps } from '../hooks/useJarbField/useJarbField';

type InputProps<FieldValue> = Pick<
  FieldInputProps<FieldValue, any>,
  'value' | 'onChange' | 'onBlur' | 'checked' | 'multiple' | 'type'
>;

export type FinalFieldProps<P, FieldValue> = P &
  Omit<InputProps<FieldValue>, 'onBlur'> &
  Partial<Pick<InputProps<FieldValue>, 'onBlur'>>;

export type FieldProps<P, FieldValue> = P &
  UseFieldConfig<FieldValue> &
  Pick<JarbFieldInputProps<FieldValue>, 'fieldName' | 'name'>;
