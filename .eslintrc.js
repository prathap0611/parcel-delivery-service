module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'standard',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {},
};
