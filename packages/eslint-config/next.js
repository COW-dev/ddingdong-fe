/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'import/no-unresolved': 'off',
    'no-redeclare': 'off',
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-tag-spacing': 1,
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'react/destructuring-assignment': [
      'warn',
      'always',
      { destructureInSignature: 'always' },
    ],
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          { pattern: 'next/**', group: 'external', position: 'before' },
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: '@dds/**', group: 'external' },
          { pattern: '@/**', group: 'internal' },
          { pattern: './*', group: 'sibling' },
        ],
        pathGroupsExcludedImportTypes: [
          'react',
          'react-dom',
          'next',
          '@dds/shared',
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
  },
};
