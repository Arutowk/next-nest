import { nextJsConfig } from '@repo/eslint-config/next-js';

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  // Other configurations
  {
    rules: {
      'turbo/no-undeclared-env-vars': 'off',
    },
  },
];
