/* eslint-disable */

module.exports = {
    root: true,
    plugins: [
        '@typescript-eslint',
        'jest',
        'import',
    ],
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parserOptions: {
        sourceType: 'module',
        project: [
            './tsconfig.json',
        ],
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
    },
    ignorePatterns: [
        'node_modules/*',
        'dist/*',
        'lib/*',
    ],
    overrides: [
        {
            files: [`**/*.ts`, `**/*.tsx`],
        },
    ],
    rules: {
        semi: [2, 'always'],
        quotes: [2, 'single']
    }
};