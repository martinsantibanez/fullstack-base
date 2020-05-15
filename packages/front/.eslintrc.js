module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    // 'eslint:recommended', // stricter, we can enable it for more rules
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  rules: {
    'no-console': 'off',
    '@typescript-eslint/interface-name-prefix': 1,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
  },
}
