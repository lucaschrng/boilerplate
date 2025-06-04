import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat();

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  ...compat.config({
    extends: ['next'],
  }),
  perfectionist.configs['recommended-alphabetical'],
  {
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'eol-last': ['error', 'always'],
      'indent': ['error', 2],
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
    },
  },
);
