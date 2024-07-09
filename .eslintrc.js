module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import', 'prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.js', '.tsx', '.ts'] }],
    'react/prop-types': 'off',
    'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
    'import/newline-after-import': 'error',
    'import/no-named-as-default': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-unused-vars': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ['*.js'],
      excludedFiles: ['.eslintrc.js', 'babel.config.js'],
    },
    {
      files: ['build/**'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
