import type { Config } from 'stylelint';

export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'declaration-empty-line-before': 'never',
    'color-function-notation': null,
    'hue-degree-notation': null,
    'selector-class-pattern': null,
    'color-function-alias-notation': null,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else', 'include', 'mixin', 'use', 'forward', 'import']
      }
    ],

    'scss/at-extend-no-missing-placeholder': null,
    'scss/dollar-variable-pattern': null,
    'scss/operator-no-newline-after': null,
    'scss/operator-no-newline-before': null
  }
} satisfies Config;
