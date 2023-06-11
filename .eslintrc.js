module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    indent: 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': ['off'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true // Allow destructuring while not consuming all variables
      }
    ],
    'eslint-disable-next-line': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/no-unused-expressions': ['error'],
    '@typescript-eslint/indent': ['off'],
    'react/jsx-curly-brace-presence': [1, 'never'],
    'react/prop-types': ['off'], // Disable propTypes warning @see https://stackoverflow.com/questions/41746028/proptypes-in-a-typescript-react-application
    '@typescript-eslint/no-angle-bracket-type-assertion': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/explicit-member-accessibility': ['off'],
    '@typescript-eslint/no-empty-interface': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
};
