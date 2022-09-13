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
    'react/display-name': 0,
    'prefer-arrow-callback': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 1,
    // 不用嵌套三元 可读性差
    'no-nested-ternary': 2,
    'no-plusplus': 2,
    'linebreak-style': ['error', 'unix'],
    'import/extensions': 0,
    'no-emprt': 2,
    'no-eq-null': 2,
    'no-eval': 2,
    'no-extra-parens': 2,
    'no-extra-semi': 2,
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
  globals: {
  },
};
