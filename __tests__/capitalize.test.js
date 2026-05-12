import capitalize from '../src/capitalize.js'
// import { strict as assert } from 'node:assert'

// try {
//   if (capitalize('hello') !== 'Hello') {
//     // Если результат функции не равен ожидаемому значению
//     // Выбрасываем исключение и завершаем выполнение теста
//     throw new Error('Функция работает неверно!')
//   }

//   if (capitalize('') !== '') {
//     throw new Error('Функция работает неверно!')
//   }
// } catch (e) {
//   console.log('Ошибка при тестировании:', e.massage || e)
//   process.exit(1)
// }

// // Проверка сменилась с отрицательной на положительную
// assert(capitalize('') === '')
// assert(capitalize('hello') === 'Hello')

// Проверка сменилась с отрицательной на положительную
// assert.equal(
//   capitalize(''),
//   '',
//   'Функция должна возвращать пустую строку для пустого входа',
// )
// Первый параметр actual – то, что пришло
// Второй параметр expected – то, что ожидает тест
// Правильный порядок аргументов имеет большое значение при анализе ошибки
// assert.equal(capitalize('hello'), 'Hello', 'Первая буква должна быть заглавной')

test('capitalize', () => {
  expect(capitalize('')).toEqual('')
  expect(capitalize('hello')).toEqual('Hello')
})
