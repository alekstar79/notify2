/**
* @see [new config file](https://eslint.org/blog/2022/08/new-config-system-part-2/#the-new-config-file:-eslint.config.js)
* @see [typescript-eslint](https://typescript-eslint.io/packages/typescript-eslint)
* @see [migration guide](https://github.com/eslint/eslint/issues/17229)
*/

import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
  eslint.configs.recommended,
  // ...tseslint.configs.strictTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  {
    ignores: [
      '!node_modules/', 'node_modules/*', '**/example/**', '**/dist/**', '*.js'
    ]
  },
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-types': 'off'
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...tseslint.configs.eslintRecommended
  },
  {
    files: ['**/*.{js,d.ts}'],
    ...tseslint.configs.disableTypeChecked
  }
)
