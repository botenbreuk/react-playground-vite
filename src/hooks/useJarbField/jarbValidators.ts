import { FieldType, getConstraints, JarbProps } from '@42.nl/jarb-final-form';
import {
  getFieldConstraintsFor,
  mostSpecificInputTypeFor
} from '@42.nl/jarb-final-form/lib/utils';
import * as Validators from '@42.nl/jarb-final-form/lib/validators';
import { FieldState, FieldValidator } from 'final-form';

type ValidatorConfig<FieldValue> = {
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
};

export function useComposeValidators<FieldValue>(
  options: ValidatorConfig<FieldValue>
) {
  const {
    validators = [],
    asyncValidators = [],
    asyncValidatorsDebounce = 350
  } = options;

  return async (
    value: FieldValue,
    allValues: Record<string, any>,
    meta?: FieldState<FieldValue>
  ) => {
    if (validators.length > 0) {
      // Perform synchronous validation
      const results = await Promise.all(
        validators.map(validator => validator(value, allValues, meta))
      );

      const errors = results.filter(v => v !== undefined);

      // If there are no synchronous errors, asynchronous validation will be prepared
      if (errors.length > 0) {
        return errors;
      }
    }

    if (asyncValidators.length !== 0) {
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
        asyncValidators.map(validator => validator(value, allValues, meta))
      );

      const asyncErrors = asyncResults.filter(
        v => v !== undefined || v !== null
      );

      // If there are no errors, return undefined to indicate that everything is a-ok.
      return asyncErrors.length === 0 ? undefined : asyncErrors;
    }

    return undefined;
  };
}

export function useJarbValidators<FieldValue>(jarb: JarbProps) {
  const { label, validator } = jarb;
  const constraints = getConstraints();
  const validatorFunctions: FieldValidator<FieldValue>[] = [];

  if (constraints) {
    const fieldConstraints = getFieldConstraintsFor(validator, constraints);

    if (fieldConstraints !== false) {
      const field: FieldType = mostSpecificInputTypeFor(fieldConstraints.types);

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
          fieldConstraints.fractionLength,
          jarb.fractionalNumberRegex || defaultFractionNumberRegex
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
}

/**
 * Returns a regex that checks if the it is a valid number
 * which can have fractions. Which are the numbers behind
 * the decimal. So if the fractionLength is 5 you accept:
 * #.#####, which means 5 numbers after the decimals.
 *
 * The number can be negative or positive.
 *
 * @param  {number} fractionLength The length of the fraction which is considered valid.
 * @return {regex}                 A regex which checks for fraction numbers.
 */
function defaultFractionNumberRegex(fractionLength: number): RegExp {
  return new RegExp('^-?\\d+(\\.\\d{1,' + fractionLength + '})?$');
}
