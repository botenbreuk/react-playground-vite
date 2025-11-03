import { FieldState, FieldValidator, setIn } from 'final-form';
import * as z from 'zod';

export function simpleMemoize<FieldValue>(
  fn: (
    value: FieldValue,
    allValues: Record<string, any>,
    meta?: FieldState<FieldValue>
  ) => any | Promise<any>
) {
  let lastValue: FieldValue;
  let lastResult: any;

  return async (
    value: FieldValue,
    allValues: Record<string, any>,
    meta?: FieldState<FieldValue>
  ) => {
    if (value !== lastValue) {
      lastValue = value;
      lastResult = await Promise.resolve(fn(value, allValues, meta));
    }
    return lastResult;
  };
}

export const composeValidators =
  <T>(validators: FieldValidator<T>[]) =>
  async (value: T, allValues: Record<string, any>, meta?: FieldState<T>) =>
    await Promise.resolve(validators.map(val => val(value, allValues, meta)));

export function stringRequired(label: string) {
  return z
    .string({
      error: issue => (!issue.input ? `${label} is verplicht` : undefined)
    })
    .min(1, { error: `${label} is verplicht` });
}

export function emailRequired(label: string) {
  return z
    .email({
      error: issue => (!issue.input ? `${label} is verplicht` : undefined)
    })
    .min(1, { error: `${label} is verplicht` });
}

export function required(label: string) {
  return {
    required: { value: true, message: `${label} is verplicht` },
    minLength: { value: 1, message: `${label} is verplicht` }
  };
}

export async function zodValidate<S extends z.ZodSchema, V>(schema: S, value?: V) {
  try {
    await schema.parseAsync(value);
    return true;
  } catch (e) {
    const t = e as z.ZodError;
    return t.issues[0].message;
  }
}

export { z };

export function validateSchema<T>(schema: z.Schema) {
  return (values: T) => validateFormValues(values, schema);
}

async function validateFormValues<T>(values: T, schema: z.ZodSchema) {
  try {
    schema.parse(values);
    return undefined;
  } catch (e) {
    if (e instanceof z.ZodError) {
      return e.issues.reduce((formError: object, issue: z.ZodIssue) => {
        return setIn(formError, issue.path.join('.'), issue.message);
      }, {});
    }
    throw e; // rethrow the error if it's not a ZodError
  }
}
