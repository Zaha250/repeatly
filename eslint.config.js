import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
    // Базовые рекомендуемые правила ESLint
    js.configs.recommended,

    // Конфигурация для TypeScript
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
                project: './tsconfig.json'
            },
            globals: {
                node: true,
                es2022: true
            }
        },
        plugins: {
            '@typescript-eslint': typescriptEslint
        },
        rules: {
            ...typescriptEslint.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': ['warn', {
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_",
                "caughtErrorsIgnorePattern": "^_"
            }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-undef': 'off'
        }
    },

    // Конфигурация для JavaScript файлов
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                node: true,
                es2022: true
            }
        }
    },

    // Prettier config должен быть последним
    prettier
];
