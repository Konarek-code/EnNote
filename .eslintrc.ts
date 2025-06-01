module.exports = {
  root: true,
  extends: [
    'expo',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  ignorePatterns: ['dist/', 'node_modules/', 'web-build/', 'scripts/*.js'],
  rules: {
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-console': 'off',
    'no-undef': 'off',
  },
  overrides: [
    {
      files: ['*.config.js', 'scripts/**/*.js', 'server.js'], // tutaj pliki Node
      env: {
        node: true,
        es2021: true,
      },
      globals: {
        module: 'readonly',
        process: 'readonly',
        console: 'readonly',
        URLSearchParams: 'readonly',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
