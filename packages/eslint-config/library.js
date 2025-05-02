import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import { config as baseConfig } from './base.js';

/**
 * @type {import("eslint").Linter.Config[]}
 * */
export const libraryJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
