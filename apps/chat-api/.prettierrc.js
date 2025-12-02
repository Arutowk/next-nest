/** @type {import("prettier").Config} */
module.exports = {
  ...require('@repo/eslint-config/prettier-base'),
  singleQuote: true,
  trailingComma: 'all',
};
