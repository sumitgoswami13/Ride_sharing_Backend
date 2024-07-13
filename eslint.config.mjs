import { node } from 'globals';
import pluginNode from '@eslint/node';

export default [
  {
    parserOptions: {
      ecmaVersion: 2021, 
    },
    env: {
      node: true, 
      es2021: true,
    },
    extends: [
      'eslint:recommended', 
      'plugin:node/recommended', 
    ],
    rules: {
      'quotes': ['error', 'single'],
      'prefer-template': 'error',
      'no-useless-concat': 'error',
    },
  },
  pluginNode.configs.recommended,
];
