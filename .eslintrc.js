module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
  },
  globals: {
    module: 'readonly',
    CF_VERSION: 'readonly',
  },
  overrides: [
    {
      files: ['*.spec.js'],
      globals: {
        test: 'readonly',
        snapshot: 'readonly',
        shallow: 'readonly',
        tMock: 'readonly',
      },
    },
  ],
}
