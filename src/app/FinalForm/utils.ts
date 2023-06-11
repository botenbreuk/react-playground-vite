import { FieldState, FieldValidator } from 'final-form';

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
      console.log(
        'Last',
        lastResult,
        await Promise.resolve(fn(value, allValues, meta))
      );
    }
    return lastResult;
  };
}

export const composeValidators =
  <T>(validators: FieldValidator<T>[]) =>
  async (value: T, allValues: Record<string, any>, meta?: FieldState<T>) =>
    await Promise.resolve(validators.map(val => val(value, allValues, meta)));
