module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: ['./tsconfig.json']
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'check-file'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'import/no-unresolved': ['off'],
    'react/jsx-curly-brace-presence': ['warn', 'never'], // Removes curly braces from react properties if its not needed
    'react/no-children-prop': 'off', // Is used to ignore error of react-popover in src/ui/InfoPopup/InfoPopup.tsx
    '@typescript-eslint/no-explicit-any': 'off', // Allows any typing, mostly used for Record<string, any>
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true // Allow destructuring while not consuming all variables
      }
    ],
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/naming-convention': namingConventions(),
    'check-file/filename-naming-convention': [
      'error',
      { 'src/{core,app}/**/*.{jsx,tsx}': 'PASCAL_CASE' }
    ],
    'check-file/folder-naming-convention': ['warn', { 'src/app/**/*.tsx': 'PASCAL_CASE' }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};

function namingConventions() {
  return [
    'error',
    {
      selector: 'default',
      format: ['camelCase'],
      filter: {
        regex: '[-\\.]|(Context$)',
        match: false
      }
    },
    {
      selector: 'import',
      format: ['camelCase', 'PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'variable',
      modifiers: ['destructured'],
      format: ['camelCase', 'PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'variable',
      types: ['function'],
      format: ['camelCase', 'PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'variable',
      types: ['boolean', 'number', 'string', 'array'],
      format: ['camelCase', 'UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'typeProperty',
      modifiers: ['readonly'],
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'enumMember',
      format: ['UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'parameter',
      modifiers: ['unused'],
      format: null
    },
    {
      selector: ['property', 'method'],
      format: ['camelCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
      filter: {
        regex: '[-\\.]',
        match: false
      }
    },
    {
      selector: 'objectLiteralProperty',
      format: null
    },
    {
      selector: 'function',
      format: ['camelCase', 'PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    }
  ];
}
