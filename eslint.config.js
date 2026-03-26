import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: 'error'
    }
  }
]
