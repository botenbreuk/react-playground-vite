/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  rules: {
    'declaration-empty-line-before': 'never',
    'color-function-notation': null,
    'hue-degree-notation': null,
    'selector-class-pattern': null,
    'color-function-alias-notation': null,

    'scss/at-extend-no-missing-placeholder': null,
    'scss/dollar-variable-pattern': null
  }
};
