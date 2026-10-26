import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig([
  // Templates are standalone projects with their own (uninstalled) deps.
  globalIgnores(['dist/**', 'node_modules/**', 'templates/**']),
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, tsPlugin.configs['flat/recommended'], prettier],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
    },
  },
]);
