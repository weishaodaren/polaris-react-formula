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
    'prefer-arrow-callback': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    // 'import/no-extraneous-dependencies': ["error", {"packageDir": ['./packages/launcher', './packages/react', './']}],
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'linebreak-style': ['error', 'unix'],
    'import/extensions': 0
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
