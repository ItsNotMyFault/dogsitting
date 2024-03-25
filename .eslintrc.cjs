/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  // 'extends': [
  //   "plugin:vue/vue3-recommended",
  //   'eslint:recommended',
  //   // '@vue/eslint-config-prettier/skip-formatting'
  // ],
  // parserOptions: {
  //   ecmaVersion: 'latest'
  // },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    eqeqeq: 'error',
    'no-console': 'warn',
    'prettier/prettier': 'error'
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  ignorePatterns: ['node_modules', 'build', 'dist', 'public']
}
