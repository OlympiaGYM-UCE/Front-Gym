import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] }, // Ignora la carpeta dist
  {
    files: ['**/*.{js,jsx}'], // Aplica a todos los archivos JS y JSX
    languageOptions: {
      ecmaVersion: 2022, // Usa la última versión de ECMAScript
      globals: {
        ...globals.browser, // Agrega globales del navegador
        ...globals.node, // Agrega globales de Node.js (opcional, si usas Node)
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Habilita soporte para JSX
        },
        sourceType: 'module', // Usa módulos de ES6
      },
    },
    settings: {
      react: {
        version: 'detect', // Detecta automáticamente la versión de React
      },
    },
    plugins: {
      react, // Plugin de React
      'react-hooks': reactHooks, // Plugin de React Hooks
      'react-refresh': reactRefresh, // Plugin de React Refresh
    },
    rules: {
      ...js.configs.recommended.rules, // Reglas recomendadas de ESLint
      ...react.configs.recommended.rules, // Reglas recomendadas de React
      ...reactHooks.configs.recommended.rules, // Reglas recomendadas de React Hooks
      'react/jsx-uses-react': 'error', // Marca React como usado en JSX
      'react/jsx-uses-vars': 'error', // Marca variables JSX como usadas
      'react/react-in-jsx-scope': 'off', // Desactiva la regla que requiere importar React en JSX
      'react/jsx-no-target-blank': 'off', // Desactiva la regla de target="_blank"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ], // Regla de React Refresh
    },
  },
];