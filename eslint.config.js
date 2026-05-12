import js from '@eslint/js'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier' // Нужен этот импорт

export default [
  {
    ignores: ['**/*.html'],
  },
  {
    files: ['**/*.js'],
    plugins: {
      '@stylistic': stylistic,
      prettier: prettierPlugin, // Регистрируем плагин
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.browser,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...stylistic.configs['recommended-flat'].rules,

      // Ваши правила
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/indent': ['error', 2],
      'no-console': 'off',
      '@stylistic/arrow-parens': ['error', 'always'],

      // Включаем отображение ошибок Prettier в списке проблем ESLint
      'prettier/prettier': 'error',
    },
  },
  prettierConfig, // Отключает конфликты, оставляя только важные ошибки
]

// ===============================================
// import js from '@eslint/js'
// import globals from 'globals'
// import stylistic from '@stylistic/eslint-plugin'

// export default [
//   js.configs.recommended,
//   stylistic.configs.recommended,
//   {
//     files: ['**/*.js'],
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.jest, // если есть тесты
//       },
//     },
//     rules: {
//       // Хекслет обычно требует Single Quotes и No Semi
//       '@stylistic/quotes': ['error', 'single'],
//       '@stylistic/semi': ['error', 'never'],
//       '@stylistic/indent': ['error', 2],
//       'no-console': 'off', // разрешить console.log для игр
//       '@stylistic/arrow-parens': ['error', 'always'],
//     },
//   },
// ]
