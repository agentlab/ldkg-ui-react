import globals from "globals";
import eslintJs from "@eslint/js";
import eslintTs from "typescript-eslint";
import { fixupPluginRules } from '@eslint/compat';
//import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintReact from "eslint-plugin-react";
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
//import eslintImport from "eslint-plugin-import";
import eslintStorybook from "eslint-plugin-storybook";
import jest from "eslint-plugin-jest";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: [
      '/.git/*',
      '/.github/*',
      '/.husky/*',
      '/.storybook/*',
      '/.vscode/*',
      '/es/*',
      '/dist/*',
      '/node-modules/*',
      '/stories/*',
    ],
  },
  //eslintImport.configs.recommended,
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  eslintPluginPrettierRecommended,
  //eslintStorybook.configs.recommended,
  {
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
  },
  {
    plugins: {
      'react': eslintReact,
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
      //'storybook': fixupPluginRules(eslintStorybook),
    },
  },
  {
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variableLike',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
      ],
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/prefer-default-export': 'off',
    },
  },
  {
    files: ["tests/**"],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      '@typescript-eslint/no-unused-vars': 'off',
      'jest/valid-expect': 0,
      'jest/valid-expect-in-promise': 0,
    },
  },
];
