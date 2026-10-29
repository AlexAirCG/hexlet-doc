//* // Property-based тестирование
import fc from 'fast-check'
import getFunction from './trial-8.js'
import { test, expect } from 'vitest'
import { toBeSorted } from 'jest-sorted/src/sorted.js'

expect.extend({ toBeSorted })

const sort = getFunction()

test('sort', () => {
  const number = [3, 1, 0, 7, 5]
  const sorted = sort(number)
  expect(sorted).toEqual([0, 1, 3, 5, 7])
})

test('sort property-based', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (arr) => {
      const sorted = sort(arr)

      expect(sorted).toBeSorted()
    }),
  )
})

// */

/* // descroption
Протестируйте в файле __tests__/sort.test.js функцию sort(), которая сортирует массив целых чисел по возрастанию. Функция возвращает новый отсортированный массив. При тестировании используйте комбинированный подход, то есть напишите обычный тест на конкретном массиве из примера ниже и property-based тест, который проверяет свойство «результат отсортирован» на сгенерированных массивах.

const numbers = [3, 1, 0, 7, 5]
const sorted = sort(numbers)
console.log(sorted) // => [0, 1, 3, 5, 7]
Тесты запускаются на правильной реализации sort() и на неправильных из файла functions.js. На правильной реализации они должны пройти, а на каждой неправильной упасть, иначе решение не засчитывается.

Подсказки
Для property-based тестирования используйте фреймворк fast-check
Массивы целых чисел генерирует fc.array(fc.integer()). Генератор строк fc.string() из урока здесь не подходит, потому что функция сортирует числа
Чтобы проверить, что массив отсортирован, используйте пакет jest-sorted, который добавляет к expect матчер toBeSorted
expect([1, 2, 3]).toBeSorted()
// */
