import pluginPrettier from 'eslint-config-prettier';
import pluginCheckFile from 'eslint-plugin-check-file';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const reactHooks = { ...pluginReactHooks.configs.recommended };
const importRecommended = { ...pluginImport.configs.recommended };
const importTypescript = { ...pluginImport.configs.typescript };
const jsxRuntime = { ...pluginReact.configs['jsx-runtime'] };
const reactRecommended = { ...pluginReact.configs.recommended };

delete reactRecommended.plugins;
delete reactRecommended.parserOptions;
delete reactHooks.plugins;
delete importRecommended.plugins;
delete importRecommended.parserOptions;
delete importTypescript.plugins;
delete jsxRuntime.plugins;
delete jsxRuntime.parserOptions;

/** @type {import('eslint').Linter.Config[]} */

export default tseslint.config(
  ...tseslint.configs.recommended,
  reactRecommended,
  importRecommended,
  importTypescript,
  reactHooks,
  jsxRuntime,
  pluginPrettier,
  {
    plugins: {
      'react-hooks': pluginReactHooks,
      react: pluginReact,
      import: pluginImport,
      'check-file': pluginCheckFile
    },
    languageOptions: {
      parserOptions: {
        parser: tseslint,
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        project: ['./tsconfig.json']
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
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
      'check-file/folder-naming-convention': [
        'warn',
        { 'src/app/**/*.tsx': 'PASCAL_CASE' }
      ]
    }
  }
);

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
