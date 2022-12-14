module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:react/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    project: ['./tsconfig.node.json'],
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "comma-dangle": 0,
    "no-param-reassign": ["error", { "props": false }],
    "no-underscore-dangle": 0,
    "@typescript-eslint/naming-convention": 0,
    "@typescript-eslint/indent": 0,
    'react/display-name': 0,
    'prefer-arrow-callback': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 1,
    'import/no-extraneous-dependencies': 0,
    'implicit-arrow-linebreak':['error', 'beside'],
    'no-nested-ternary': 2,
    'no-plusplus': 2,
    'linebreak-style': ['error', 'unix'],
    'import/extensions': 0,
    'no-eq-null': 2,
    'no-eval': 2,
    'no-extra-parens': 2,
    'no-extra-semi': 2,
    'no-use-before-define': 2,
    'yoda': 2
  },
  overrides: [
    {
      'files': '**/*.d.ts',
      'rules': {
        'vars-on-top': 'off',
        'no-var': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            'selector': 'variableLike',
            'format': ['UPPER_CASE'],
            'leadingUnderscore': 'allowDouble',
            'trailingUnderscore': 'allowDouble'
          }
        ],
        'no-underscore-dangle': 'off'
      }
    },
  ],
  globals: {},
};
