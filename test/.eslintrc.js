// eslint-disable-next-line no-undef
module.exports = {
  /*root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    //project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },*/
  plugins: ['jest', 'prettier'],
  extends: ['eslint:recommended', 'plugin:jest/recommended', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    'import/no-extraneous-dependencies': ['off'],
  },
  overrides: [
    {
      files: ['*.spec.*'],
      rules: {
        'jest/valid-expect': 0,
        'jest/valid-expect-in-promise': 0,
      },
    },
  ],
};
