module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 'off',
    'arrow-parens': ['off'],
    'prettier/prettier': ['error'],
    'consistent-return': ['off'],
    'no-underscore-dangle': ['off'],
    'func-names': ['off'],
  },
};
