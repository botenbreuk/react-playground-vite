import { FieldType, getConstraints, JarbProps } from '@42.nl/jarb-final-form';
import {
  getFieldConstraintsFor,
  mostSpecificInputTypeFor
} from '@42.nl/jarb-final-form/lib/utils';
import * as Validators from '@42.nl/jarb-final-form/lib/validators';
import { FieldState, FieldValidator } from 'final-form';
import { useMemo } from 'react';

interface ValidatorConfig<FieldValue> {
  name: string;

  jarb: JarbProps;

  /**
   * An array of custom validators to run whenever the field changes.
   *
   * @type {FieldValidator<FieldValue>[]}
   * @memberof JarbFieldProps
   */
  validators?: FieldValidator<FieldValue>[];

  /**
   * An array of custom async validators to run whenever the field changes
   * and the synchronous validators have declared the field valid.
   *
   * @type {FieldValidator<FieldValue>[]}
   * @memberof JarbFieldProps
   */
  asyncValidators?: FieldValidator<FieldValue>[];

  /**
   * The time after which the async validators are ran to prevent
   * to many validators from running at once.
   *
   * Defaults to 200 milliseconds.
   *
   * @type {number}
   * @memberof JarbFieldProps
   */
  asyncValidatorsDebounce?: number;
}

export function useEnhancedValidate<FieldValue>(
  config: ValidatorConfig<FieldValue>
) {
  const {
    jarb,
    validators,
    asyncValidators,
    asyncValidatorsDebounce = 200
  } = config;

  const jarbValidatorFunctions = useMemo(() => {
    const { label, validator } = jarb;

    const constraints = getConstraints();
    const validatorFunctions: FieldValidator<FieldValue>[] = [];

    if (constraints !== undefined) {
      const fieldConstraints = getFieldConstraintsFor(validator, constraints);

      if (fieldConstraints !== false) {
        const field: FieldType = mostSpecificInputTypeFor(
          fieldConstraints.types
        );

        if (fieldConstraints.required) {
          if (field === 'boolean') {
            const requiredValidator = Validators.makeBooleanRequired(label);
            validatorFunctions.push(requiredValidator);
          } else {
            const requiredValidator = Validators.makeRequired(label);
            validatorFunctions.push(requiredValidator);
          }
        }

        if (field === 'text') {
          if (fieldConstraints.minimumLength) {
            const minimumLengthValidator = Validators.makeMinimumLength(
              label,
              fieldConstraints.minimumLength
            );

            validatorFunctions.push(minimumLengthValidator);
          }

          if (fieldConstraints.maximumLength) {
            const maximumLengthValidator = Validators.makeMaximumLength(
              label,
              fieldConstraints.maximumLength
            );

            validatorFunctions.push(maximumLengthValidator);
          }
        }

        if (fieldConstraints.min) {
          const minValueValidator = Validators.makeMinValue(
            label,
            fieldConstraints.min
          );

          validatorFunctions.push(minValueValidator);
        }

        if (fieldConstraints.max) {
          const maxValueValidator = Validators.makeMaxValue(
            label,
            fieldConstraints.max
          );

          validatorFunctions.push(maxValueValidator);
        }

        if (
          field === 'number' &&
          fieldConstraints.fractionLength &&
          fieldConstraints.fractionLength > 0
        ) {
          const patternValidator = Validators.makeNumberFraction(
            label,
            fieldConstraints.fractionLength
          );

          validatorFunctions.push(patternValidator);
        } else if (field === 'number') {
          const patternValidator = Validators.makeNumber(label);

          validatorFunctions.push(patternValidator);
        }
      } else {
        console.warn(
          `@42.nl/jarb-final-form: constraints for "${validator}" not found, but a JarbField was rendered, this should not occur, check your validator.`
        );
      }
    } else {
      console.warn(
        '@42.nl/jarb-final-form: constraints are empty, but a JarbField was rendered, this should not occur, make sure the constraints are loaded before the form is displayed.'
      );
    }

    return validatorFunctions;
  }, [jarb]);

  const passedValidators =
    Array.isArray(validators) && validators ? [...validators] : [];

  const asyncValidatorFunctions =
    Array.isArray(asyncValidators) && asyncValidators
      ? [...asyncValidators]
      : [];

  const validatorFunctions = [...jarbValidatorFunctions, ...passedValidators];

  if (validatorFunctions.length === 0) {
    return undefined;
  }

  async function enhancedValidate(
    value: FieldValue,
    allValues: Record<string, any>,
    meta?: FieldState<FieldValue>
  ) {
    // Generate a new async id for this train of async validations.
    const validationId = Math.random();

    // Store the id locally to this closure.
    const id = validationId;

    // Perform synchronous validation
    const results = await Promise.all(
      validatorFunctions.map(validator => validator(value, allValues, meta))
    );

    const errors = results.filter(v => v !== undefined);

    // If there are no synchronous errors, perform the asynchronous validation
    if (errors.length > 0) {
      return errors;
    }

    if (asyncValidatorFunctions.length === 0) {
      return undefined;
    }

    // We will only perform the asynchronous validation after 200 milliseconds
    // to prevent repeatedly calling the back-end
    const debouncePromise = new Promise<boolean>(resolve => {
      // After a debounce resolve with true.
      window.setTimeout(() => {
        resolve(true);
      }, asyncValidatorsDebounce);
    });

    const shouldPerformAsyncValidation = await debouncePromise;

    if (!shouldPerformAsyncValidation) {
      return undefined;
    }

    const asyncResults = await Promise.all(
      asyncValidatorFunctions.map(validator =>
        validator(value, allValues, meta)
      )
    );

    // Only use the errors when they are still relevant.
    if (validationId !== id) {
      return undefined;
    }

    // If there are no errors return undefined to indicate
    // that everything is a-ok.
    const asyncErrors = asyncResults.filter(v => v !== undefined);

    return asyncErrors.length === 0 ? undefined : asyncErrors;
  }

  return enhancedValidate;
}
