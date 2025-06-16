import { FieldValidator } from 'final-form';
import {
  UseFieldConfig as FFUseFieldConfig,
  FieldInputProps,
  FieldRenderProps
} from 'react-final-form';
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

export type UseFieldConfig<FieldValue> = Omit<
  FFUseFieldConfig,
  'defaultValue' | 'format' | 'initialValue' | 'validate' | 'value'
> & {
  defaultValue?: FieldValue;
  format?: (value: FieldValue, name: string) => any;
  initialValue?: FieldValue;
  validate?: FieldValidator<FieldValue>;
  value?: FieldValue;
};

export type FieldMetaState<FieldValue> = FieldRenderProps<FieldValue>['meta'];
