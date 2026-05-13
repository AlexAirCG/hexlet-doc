// ГЛАВА: JS: Автоматическое тестирование =========================================

// Теория: Причины тестирования ================
/*
const capitalize = (text) => {
  const firstChar = text[0].toUpperCase()
  const restSubstring = text.slice(1)

  return `${firstChar}${restSubstring}`
}

console.log(capitalize('hello'))
// */

/*
// Дословно: выбросить новую ошибку
// Исключения бросают
throw new Error('описание исключения')
// Код, следующий за этим выражением, не выполнится, а сам скрипт завершится с ошибкой
console.log('nothing')
// */

/*
if (capitalize('hello') !== 'Hello') {
  // Если результат функции не равен ожидаемому значению
  // Выбрасываем исключение и завершаем выполнение теста
  throw new Error('Функция работает неверно!')
}
// */

/*
node tests/capitalize.test.js
# Если все хорошо, код молча выполнится.
# Если есть ошибка, то будет выведено сообщение об ошибке.
// */

/*
const capitalize = (text) => {
  if (text === '') {
    return ''
  }
  const firstChar = text[0].toUpperCase()
  const restSubstring = text.slice(1)
  return `${firstChar}${restSubstring}`
}

export default capitalize
// */

/*
// В этой функции забыли отнять единицу от длины
// Этот код сработает в некоторых ситуациях, когда последний элемент undefined или в массиве нет элементов
// Но в остальных случаях вернёт неверное значение
const last = elements => elements[elements.length]
// */

/*
// В конечном итоге мы получили такую структуру директорий:
// src/ └── capitalize.js tests/ └── capitalize.test.js
// Содержимое теста:

import capitalize from '../src/capitalize.js'

if (capitalize('hello') !== 'Hello') {
  throw new Error('Функция работает неверно!')
}

if (capitalize('') !== '') {
  throw new Error('Функция работает неверно!')
}

console.log('Все тесты пройдены!')
// */

/*
const set = (obj, key, value) => {
  if (key in obj) return obj

  obj[key] = value

  return obj
}

export default set
// */

// Испытание: Причины тестирования
/*
Напишите тесты для функции get(obj, key, defaultValue). Эта функция извлекает значение из объекта при условии, что значение под таким ключом в этом объекте существует. В ином случае возвращается defaultValue.

// Идея функции взята из lodash
// https://lodash.com/docs#get
get({ hello: 'world' }, 'hello'); // world
get({ hello: 'world' }, 'hello', 'kitty'); // 'world'
get({}, 'hello', 'kitty'); // 'kitty'
Тесты должны быть построены по такому же принципу, как это описывалось в теории урока: проверка через if и исключение в случае провала теста.

Для хорошего тестирования этой функции понадобится как минимум три теста:

Проверка, что функция возвращает нужное значение по существующему ключу (прямой тест на работоспособность)
Проверка на то, что возвращается значение по умолчанию, если в объекте ключа нет
Проверка на то, что возвращается значение по существующему ключу, даже если передано значение по умолчанию (пограничный случай)
Ваше решение проверяется на нескольких реализациях функции. Большинство реализаций содержат логические ошибки, из-за чего функция делает не совсем то, что от нее ожидается. Ваши тесты должны выявлять эти ошибки, то есть тесты должны падать на реализациях с ошибками. Все реализации функции вы можете посмотреть в файле functions.js. Большинство практик по тестированию работают по такому же принципу.
// */

// data
/*
import _ from 'lodash'
// */

// functions for tests
/*
const implementations = {
  right1: _.get,
  fail1: (obj = {}, key = null) => obj[key],
  fail2: (obj = {}, key = null, defaultValue = null) =>
    defaultValue || obj[key],
  fail3: (obj = {}, key = null, defaultValue = null) =>
    obj[key] && !defaultValue ? null : _.get(obj, key, defaultValue),
}
// */

// tests
/*
Object.entries(implementations).forEach(([name, get]) => {
  try {
    console.log(`Проверка функции: ${name}...`)

    // solution my
    const obj1 = { key: 'world' }
    if (get(obj1, 'key') !== 'world') {
      throw new Error('не вернула значение по существующему ключу')
    }

    const obj2 = {}
    if (get(obj2, 'key', 'defaultValue') !== 'defaultValue') {
      throw new Error('функция не вернула значение по умолчанию')
    }

    const obj3 = { key: 'world' }
    if (get(obj3, 'key', 'defaultValue') !== 'world') {
      throw new Error(
        'должна возвращать значение по существующему ключу, даже если передано значение по умолчанию ',
      )
    }

    if (get({ key: 0 }, 'key', 'default') !== 0) {
      throw new Error(
        'Функция не вернула 0, посчитав его за отсутствие значения',
      )
    }
    

    // solution teacher
    if (get({ key: 'value' }, 'key') !== 'value') {
      throw new Error(' не возвращает нужное значение по существующему ключу ')
    }
    if (get({}, 'key', 'defaultValue') !== 'defaultValue') {
      throw new Error('не возвращает значение по умолчанию')
    }
    if (get({ key: 'value' }, 'key', 'default value') !== 'value') {
      throw new Error('boom')
    }

    // Если дошли сюда — функция прошла тесты
    const green = '\x1b[32m'
    const reset = '\x1b[0m'
    console.log(`${green}Все тесты для ${name} пройдены!${reset}\n`)
  } catch (e) {
    // Если упали — выводим ошибку красным
    const red = '\x1b[31m'
    const reset = '\x1b[0m'
    console.error(`${red}Ошибка в ${name}: ${e.message}${reset}\n`)
  }
})
// */

// Теория: Утверждения ============================
/*
import capitalize from '../src/capitalize.js'

// Первое утверждение (проверка на пустую строку)
if (capitalize('') !== '') {
  throw new Error('Функция работает неверно!')
}

// Второе утверждение (проверка на слово)
if (capitalize('hello') !== 'Hello') {
  throw new Error('Функция работает неверно!')
}
// */

/*
// Такой необычный импорт связан с тем,
// что assert, экспортируемый по умолчанию, считается устаревшим
// Правильно использовать strict
import { strict as assert } from 'node:assert'
import capitalize from './capitalize.js'

// Проверка сменилась с отрицательной на положительную
assert(capitalize('') === '')
assert(capitalize('hello') === 'Hello')
// */

/*
import { strict as assert } from 'node:assert'
// при использовании strict-режима
// проверка equal равносильна strictEqual

import capitalize from '../src/capitalize.js'

// Проверка сменилась с отрицательной на положительную
assert.equal(capitalize(''), '')
// Первый параметр actual – то, что пришло
// Второй параметр expected – то, что ожидает тест
// Правильный порядок аргументов имеет большое значение при анализе ошибки
assert.equal(capitalize('hello'), 'Hello')
// */

// Испытание: Утверждения
/*
Напишите тесты для функции take(items, n), которая возвращает первые n элементов из массива. По умолчанию n равен 1. Если n отрицательное число, то возвращается пустой массив.

take([], 2); // []
take([1, 2, 3]); // [1]
take([1, 2, 3], 2); // [1, 2]
take([4, 3], 9); // [4, 3]
take([4, 3], -1); // []
Подсказки
_.take
Asserts
Выберите правильный способ сравнения: по ссылке или по значению
// */

// data
/*
import _ from 'lodash'
import { strict as assert } from 'node:assert'
// */

// functions for tests
/*
const implementations = {
  right1: (items, n = 1) => _.take(items, n),
  wrong1: (items, n = 1) => (n > 1 ? items.slice() : items.slice(0, n)),
  wrong2: (items, n = 1) => (n <= items.length ? items.slice(0, n) : []),
  wrong3: (items, n = 5) => items.slice(0, n),
  wrong4: (items, n = 1) => (items.length === 0 ? [0] : items.slice(0, n)),
  wrong5: (items, n = 1) => items.slice(0, n),
  wrong6: () => [],
}
// */

// tests
/*
Object.entries(implementations).forEach(([name, take]) => {
  try {
    console.log(`Проверка функции: ${name}...`)

    // solution my

    // Проверка работы по умолчанию (n = 1)
    assert.deepStrictEqual(take([1, 2, 3]), [1])

    // Проверка с пустым массивом
    assert.deepStrictEqual(take([], 2), [])

    // Проверка конкретного количества элементов
    assert.deepStrictEqual(take([1, 2, 3], 2), [1, 2])

    // Проверка n равного 0
    assert.deepStrictEqual(take([1, 2, 3], 0), [])

    //  Проверка n больше длины массива
    assert.deepStrictEqual(take([4, 3], 9), [4, 3])

    // 5. Проверка отрицательного n
    assert.deepStrictEqual(take([4, 3], -1), [])

    // solution teacher

    // Если дошли сюда — функция прошла тесты
    const green = '\x1b[32m'
    const reset = '\x1b[0m'
    console.log(`${green}Все тесты для ${name} пройдены!${reset}\n`)
  } catch (e) {
    // Если упали — выводим ошибку красным
    const red = '\x1b[31m'
    const reset = '\x1b[0m'
    console.error(`${red}Ошибка в ${name}: ${e.message}${reset}\n`)
  }
})
// */

// Теория: Библиотека power-assert =======================

/*
import { strict as assert } from 'node:assert'
const user = {
  name: 'Madonna',
  friends: ['Kate', 'Michel'],
  email: 'madonna@example.com',
}

console.log('текущее состояние user:', user)

assert(user.name === 'Michel')

// AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:
//  assert(user.name === 'Michel')
// */

/*
import assert from 'node:assert/strict'

// Весь код остаётся тем же самым
const user = {
  name: 'Madonna',
  friends: ['Kate', 'Michel'],
  email: 'madonna@example.com',
}

// Интерфейс библиотеки power-assert на 100% совместим со встроенным модулем assert.
assert(user.name === 'Michel')
// */

/*
import assert from 'node:assert/strict'

const array = [1, 2, 3]
const zero = 0
const two = 2

assert(array.indexOf(zero) === two)
// */

// Испытание: Библиотека power-assert
/*
Напишите тесты для функции indexOf(items, value, [fromIndex=0]), которая возвращает индекс первого вхождения переданного элемента в массив, начиная поиск с индекса fromIndex, значение которого по умолчанию равно нулю:

indexOf([1, 2, 1, 2], 2); // 1
indexOf([1, 2, 1, 2], 2, 2); // 3
indexOf([2, 'one', 'cat', false], 8); // -1
Подсказки
_.indexOf
Помните о пограничных случаях, например, если массив пустой
// */

// data
/*
import _ from 'lodash'
import assert from 'node:assert/strict'
// import { strict as assert } from 'node:assert'
// */

// functions for tests
/*
const implementations = {
  right1: (items, value, fromIndex = 0) => items.indexOf(value, fromIndex),
  wrong1: (items, value, fromIndex = 1) => items.indexOf(value, fromIndex),
  wrong2: (items, value, fromIndex) => {
    const index = items.indexOf(value, fromIndex)
    return index === -1 ? 0 : index
  },
  wrong3: (items, value) => items.indexOf(value),
  wrong4: (items, value) => _.lastIndexOf(items, value),
}
// */

// tests
/*
Object.entries(implementations).forEach(([name, indexOf]) => {
  try {
    console.log(`Проверка функции: ${name}...`)

    // solution my
    // assert.deepStrictEqual(indexOf([1, 2, 1, 2], 2), 1, 'boom')
    // assert.deepStrictEqual(indexOf([1, 2, 1, 2], 2, 2), 3, 'boom')
    // assert.deepStrictEqual(indexOf([2, 'one', 'cat', false], 8), -1, 'boom')
    // assert.deepStrictEqual(indexOf([1, 2, 3], 1), 0, 'boom')

    // solution teacher
    assert(indexOf([1, 2, 3], 1) === 0)
    assert(indexOf([1, 2, 3, 5, 6, 3], 3) === 2)
    assert(indexOf([1, 2, 3, 1, 2, 3], 3, 3) === 5)
    assert(indexOf([], 1) === -1)

    // Если дошли сюда — функция прошла тесты
    const green = '\x1b[32m'
    const reset = '\x1b[0m'
    console.log(`${green}Все тесты для ${name} пройдены!${reset}\n`)
  } catch (e) {
    // Если упали — выводим ошибку красным
    const red = '\x1b[31m'
    const reset = '\x1b[0m'
    console.error(`${red}Ошибка в ${name}: ${e.message}${reset}\n`)
  }
})
// */

// Теория: Jest ====================================

// NODE_OPTIONS=--experimental-vm-modules npx jest __tests__/stack.test.js

// Испытание: Jest
/*
Напишите тесты для функции without(coll, [values]), которая принимает первым параметром массив и возвращает его копию, из которой исключены значения, переданные вторым и последующими параметрами.

_.without([2, 1, 2, 3], 1, 2); // [3]
Подсказки
_.without
Тесты будут запускаться при помощи фреймворка Jest
// */

// test
/*
import _ from 'lodash'

const implementations = {
  right1: _.without,
  wrong1: (coll = [], ...values) => {
    const [result] = coll.reduce(
      ([prevColl, vals], item) => {
        const newVals = vals.filter((val) => val !== item)
        const nextColl =
          newVals.length === vals.length ? [...prevColl, item] : prevColl
        return [nextColl, newVals]
      },
      [[], values],
    )

    return result
  },
  wrong2: (coll = [], ...values) => {
    const result = coll.filter((val) => !values.includes(val))
    return result.length === 0 ? null : result
  },
}

Object.entries(implementations).forEach(([name, without]) => {
  describe(`Проверка функции: ${name}`, () => {
    // solution my
    // test('base work', () => {
    //   expect(without([2, 1, 2, 3], 1, 2)).toEqual([3])
    // })
    // test('empty array', () => {
    //   expect(without([])).toEqual([])
    // })

    // solution teacher
    test('without', () => {
      expect(without([], 3)).toEqual([])
      expect(without([3, 8, 9, 8, 10], 8, 10)).toEqual([3, 9])
    })
  })
})
// */

// Теория: Матчеры ==============================

// Ниже пример некоторых популярных матчеров, полезных в ежедневном тестировании:
/*
expect(null).toBeNull()

// Проверяет значение на truthy (любое значение, которое приводится к true)
expect(true).toBeTruthy()
// Точное сравнение с true
expect(true).toBe(true)

expect(undefined).toBeUndefined()

// Проверка, что массив содержит элемент
expect([1, 2, 3]).toContain(2)

// Проверка, что строка содержит подстроку
expect('hello, world').toMatch('hello')

// Проверяет, что в объекте есть свойство с определённым значением
expect({ key: 'value' }).toHaveProperty('key', 'value')
// */

// Кроме того, к любому матчеру можно применить модификатор not, который инвертирует поведение матчера:
/*
expect(null).not.toBeNull() // not null
expect(undefined).not.toBeUndefined() // not undefined
expect([1, 2, 3]).not.toContain(2) // not contain 2
expect('hello, world').not.toMatch('hello') // not match hello
// */

// Особняком стоит матчер toMatchObject. Он используется, когда нас в тестах интересует не весь объект, а только какая-то его часть:
/*
const user = {
  firstName: 'tolya',
  lastName: 'petrov',
  age: '33',
}

// Тест пройдёт успешно, так как проверяется только firstName
expect(user).toMatchObject({ firstName: 'tolya' })
// */

// Испытание: Матчеры
/*
Напишите тесты для функции gt(value, other), которая возвращает true в том случае, если value > other, и false в иных случаях.

gt(3, 1); // true

gt(3, 3); // false

gt(1, 3); // false
Подсказки
_.gt
// */

// test
/*
import _ from 'lodash'

const implementations = {
  right: _.gt,
  wrong1: _.gte,
  wrong2: (a, b) => a !== b,
  wrong3: () => false,
}

Object.entries(implementations).forEach(([name, gt]) => {
  describe(`Проверка функции: ${name}`, () => {
    // solution my
    test('gt', () => {
      expect(gt(3, 1)).toBe(true)
      expect(gt(3, 3)).toBe(false)
      expect(gt(3, 6)).toBe(false)
      expect(gt(3)).toBe(false)
    })

    // solution teacher
  })
})
// */

// Теория: Модульные тесты ==================

// import makeStack from './stack.js'

// const stack = makeStack()
// console.log(stack.isEmpty()) // true
// stack.push(1) // (1)
// stack.push(2) // (1, 2)
// stack.push(3) // (1, 2, 3)
// console.log(stack.isEmpty()) // false
// stack.pop() // 3. В стеке (1, 2)
// stack.pop() // 2. В стеке (1)
// stack.pop() // 1. В стеке пусто
// console.log(stack.isEmpty()) // true

/*
import makeValidator from '../src/validator/wrong3.js'

const validator = makeValidator()
console.log(validator.isValid('some value'))
validator.addCheck((v) => v > 5)
console.log(validator.isValid(6))
validator.addCheck((v) => v % 2 === 0)
console.log(validator.isValid(7))

const validator2 = makeValidator()
validator2.addCheck((v) => v < 5)
console.log(validator2.isValid(6))
// */

// Испытание: Модульные тесты
/*
Напишите тесты для объекта Validator. Этот валидатор проверяет корректность данных. Принцип его работы следующий:

С помощью метода addCheck(fn) в валидатор добавляются проверки. Каждая проверка представляет из себя функцию-предикат, которая принимает на вход проверяемое значение и возвращает либо true либо false в зависимости от того, соответствует ли значение требованиям проверки или нет. Проверки, добавленные в валидатор, накапливаются. Каждая следующая добавленная проверка дополняет предыдущую.
С помощью метода isValid(value), пользователь Validator проверяет соответствие значения всем добавленным проверкам. Если не было добавлено ни одной проверки, считается, что любое значение верное.
// Создаем объект валидатора
const validator = makeValidator();
// Так как не было добавлено ни одной проверки, любое значение верное
validator.isValid('some value'); // true
// Добавляем в валидатор проверку, что переданное значение больше 5
validator.addCheck((v) => v > 5);
// Добавляем проверку, что переданное значение четное
validator.addCheck((v) => v % 2 === 0);
// Проверяем значения на соответствие всем добавленным проверкам
validator.isValid(3); // false
validator.isValid(4); // false
validator.isValid(7); // false
validator.isValid(8); // true
validator.addCheck( add more checks );
Выше несколько примеров. Правила валидации могут быть любые. Для создания своих правил вы можете в том числе воспользоваться библиотекой lodash.
// */

// test
/*
import _ from 'lodash'

import right1 from '../src/validator/right1.js'
import wrong1 from '../src/validator/wrong1.js'
import wrong2 from '../src/validator/wrong2.js'
import wrong3 from '../src/validator/wrong3.js'

const implementations = {
  right1,
  wrong1,
  wrong2,
  wrong3,
}

Object.entries(implementations).forEach(([name, makeValidator]) => {
  describe(`Проверка функции: ${name}`, () => {
    // solution my ----------------
    // test('Новый валидатор должен пропускать любое значение', () => {
    //   const validator = makeValidator()
    //   expect(validator.isValid('some value')).toBe(true)
    //   expect(validator.isValid(100)).toBe(true)
    // })
    // test('корректно работает с одной проверкой', () => {
    //   const validator = makeValidator()
    //   validator.addCheck((v) => v > 5)
    //   expect(validator.isValid(10)).toBe(true)
    //   expect(validator.isValid(3)).toBe(false)
    // })
    // test('накапливает проверки (логика "И")', () => {
    //   const validator = makeValidator()
    //   validator.addCheck((v) => v > 5)
    //   validator.addCheck((v) => v % 2 === 0)
    //   validator.addCheck((v) => v < 10)
    //   expect(validator.isValid(8)).toBe(true)
    //   expect(validator.isValid(4)).toBe(false)
    //   expect(validator.isValid(7)).toBe(false)
    //   expect(validator.isValid(15)).toBe(false)
    // })
    // solution teacher ----------------------
    test('validator', () => {
      const validator = makeValidator()
      expect(validator.isValid('value')).toBe(true)

      validator.addCheck(_.isNumber)
      expect(validator.isValid('string')).toBe(false)

      validator.addCheck((v) => v > 10)
      expect(validator.isValid(100)).toBe(true)

      validator.addCheck((v) => v % 2 === 0)
      expect(validator.isValid(11)).toBe(false)
      expect(validator.isValid(12)).toBe(true)
      expect(validator.isValid(8)).toBe(false)
    })
  })
})
// */

// Теория: Подготовка данных ======================

/*
import _ from 'lodash'
test('includes', () => {
  // Подготовили коллекцию coll
  const coll = ['One', true, 3, 10, 'cat', {}, '', 10, false]

  // Используем coll для тестирования
  expect(_.includes(coll, 3)).toBe(true)
  expect(_.includes(coll, 11)).toBe(false)
})
// */

/*
import _ from 'lodash'

const coll = ['One', true, 3, 10, 'cat', {}, '', 10, false]

test('includes', () => {
  expect(_.includes(coll, 3)).toBe(true)
  expect(_.includes(coll, 11)).toBe(false)
})
// */

/*
import _ from 'lodash'

const coll = [1, 2, 3, 4]

test('filter', () => {
  // Выбираем только чётные
  expect(_.filter(coll, v => v % 2 === 0)).toEqual([2, 4])
})
// */

// Тест выше сломается, если мы добавим в нашу коллекцию еще одно чётное число. А коллекцию почти наверняка придётся расширять при добавлении новых тестов (для этой же или других функций).

/*
const now = Date.now() // текущий timestamp

test('first example', () => console.log(now))
test('second example', () => console.log(now))

//  console.log __tests__/index.test.js:3
//    1583871515943
//
//  console.log __tests__/index.test.js:4
//    1583871515943
// */

/*
let now

// Запускается перед каждым тестом
beforeEach(() => {
  now = Date.now() // текущий timestamp
})

test('first example', () => console.log(now))
test('second example', () => console.log(now))

//  console.log __tests__/index.test.js:9
//    1583871515943
//
//  console.log __tests__/index.test.js:10
//    1583871515950
// */

/*
const obj = {}

test('Add number', () => {
  add(obj, 'key', 12)
  expect(obj).toEqual({ key: 12 })
})

test('Add string', () => {
  add(obj, 'key', 'value')
  expect(obj).toEqual({ key: 'value' })
})
// */

/*
import fs from 'fs'

let fileData

beforeAll(() => {
  fileData = fs.readFileSync('path/to/file')
})

// Такой вызов на уровне модуля (вне хуков), в общем случае, считается неправильным подходом
// fileData = fs.readFileSync('path/to/file');
// */

// Испытание: Подготовка данных
/*
Напишите тесты для функции set(obj, path, value) возвращающей объект, в котором она изменяет или добавляет значение по указанному пути.

Данная функция мутирует объект, поэтому каждый запуск тестов будет вносить изменения в исходный объект. Постройте тестирование таким образом, чтобы тесты не зависели друг от друга, а каждая проверка выполнялась в сравнении с исходным объектом.

const object = { a: [{ b: { c: 3 } }] };

set(object, 'a[0].b.c', 4);
console.log(object.a[0].b.c); // => 4

set(object, ['x', '0', 'y', 'z'], 5);
console.log(object.x[0].y.z); // => 5
Подсказки
Используйте хуки для подготовки данных перед каждым запуском теста
_.cloneDeep - рекурсивно создает копию объекта
Неверная реализация функции set() возвращает объект с неправильной структурой
_.set - функция из библиотеки lodash, которая позволяет установить значение указанного свойства объекта по заданному пути; обновляет объект вместо создания нового объекта.
// */

// test
/*
import _ from 'lodash'

const implementations = {
  right1: _.set,
  wrong1: (obj, path, value) => {
    _.set(obj, path, value)
    obj.key = 'value'
    return obj
  },
  wrong2: (obj, path, value) => {
    obj[path] = value
    return obj
  },
  wrong3: (obj, path, value) => {
    if (_.get(obj, path) !== undefined) {
      _.set(obj, path, value)
    }
    return obj
  },
}

Object.entries(implementations).forEach(([name, set]) => {
  describe(`Проверка функции: ${name}`, () => {
    // solution my ----------------
    // const initState = { a: [{ b: { c: 3 } }] }
    // let obj
    // beforeEach(() => {
    //   obj = _.cloneDeep(initState)
    // })
    // test('set', () => {
    //   set(obj, 'a[0].b.c', 4)
    //   expect(obj.a[0].b.c).toBe(4)
    //   expect(obj).toEqual({ a: [{ b: { c: 4 } }] })
    //   set(obj, ['x', '0', 'y', 'z'], 5)
    //   expect(obj.x[0].y.z).toBe(5)
    //   set(obj, 'a[0].newProp', 'hello')
    //   expect(obj.a[0].newProp).toBe('hello')
    // })
    // solution teacher ----------------------
    let data
    let dataCopy

    beforeEach(() => {
      data = { a: [{ b: { c: 3 } }] }
      dataCopy = _.cloneDeep(data)
    })

    test('plain set', () => {
      set(data, 'a', 'value')
      dataCopy.a = 'value'
      expect(data).toEqual(dataCopy)
    })

    test('nested set', () => {
      set(data, 'a[0].b.c', true)
      dataCopy.a[0].b.c = true
      expect(data).toEqual(dataCopy)
    })

    test('set new property', () => {
      set(data, 'a[0].b.d', false)
      dataCopy.a[0].b.d = false
      expect(data).toEqual(dataCopy)
    })
  })
})
// */

// Теория: Плохие и хорошие практики тестирования ==================================

// Взаимное влияние тестов ----------------
/*
let user

test('first', () => {
  user = { name: 'Vasya' }
  // ...
})

test('second', () => {
  // Используется пользователь, которого создал другой тест!
  // Этот тест зависит от того, как работает предыдущий тест,
  // и не может работать без последовательного запуска обоих тестов.
  user.name = 'Petya'
})
// */

// Условные конструкции в тесте --------------------
/*
test('something', () => {
  if (/ что-нибудь /) {
    // Выполняем код одним способом
    // Проверка может быть тут
  } else {
    // Выполняем код другим способом
    // Проверка может быть тут
  }
  // Проверка может быть тут
});
// */
// Любое ветвление внутри тестов это фактически несколько тестов в рамках одного теста. От этого надо избавляться и никогда так не писать.

// Тест вне тестов -------------------
/*
let result

beforeEach(() => {
  // Вызывается тестируемый код. Это противоречит идее beforeEach.
  result = sum(5, 9)
})

test('result', () => {
  // Здесь только проверка
  expect(result).toEqual(14)
})
// */
// В этом примере тестируемый код вызывается в beforeEach. Такой подход усложняет анализ тестов, так как переворачивает всё с ног на голову.

// Слишком сильная детализация ------------------------
/*
test('create user', () => {
  const user = { name: 'Mark', age: 28 }

  // Тут код, добавляющий пользователя в базу данных

  expect(user.age).toEqual(28)
})
// */
/*
test('create user 2', () => {
  const user = { name: 'Mark', age: 28 }

  // Тут код, добавляющий пользователя в базу данных

  expect(user.name).toEqual('Mark')
})
// */

// Глубокая вложенность ---------------------
/*
describe('User', () => {
  test('should be valid', () => { / ... / })
})
// */
/*
describe('', () => {
  describe('...', () => {
    describe('...', () => {
      test('should be valid', () => { / ... / })
    })
  })
})
// */

// Код с тестами писать дольше, чем код без тестов ---------------
// Тесты влияют на дизайн кода. Они помогают выявить неудачные решения намного раньше.
// Подготовка входных данных может занимать значительное время. С тестами это нужно сделать один раз.
// Проверка результата работы кода может быть сложной и разнообразной. Тесты позволяют об этом не думать, они сами проверяют, что всё хорошо, включая пограничные случаи.
// Если в проекте тесты пишутся регулярно, то проще и быстрее делать рефакторинг, так как не придётся проверять вручную другие части кода.
// Тесты снижают уровень стресса.

// Теория: Покрытие кода тестами ==============================
/*
npx jest --coverage

PASS  __tests__/half.test.js
 ✓ half (3ms)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |    71.43 |      100 |    66.67 |    71.43 |                   |
 half.js  |       60 |      100 |       50 |       60 |             12,13 |
 index.js |      100 |      100 |      100 |      100 |                   |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.236s
Ran all test suites.
// */

// Теория: Разработка через тестирование =========================

// Тесты пишутся после кода
// Тесты пишутся вместе с кодом
// Тесты пишутся до кода

// Теория: Фикстуры ==========================

// Испытание: Анализ покрытия кода тестами
/*
В проекте имеются три функции по работе с массивами: get(), indexOf() и slice(). Программист, работавший на этом проекте до вас, недостаточно ответственно отнесся к написанию тестов. Вам нужно исправить этот недочет и дописать недостающие тесты. Тут вам поможет отчет по покрытию тестами. Работу в этом упражнении можно выстроить следующим образом:

Выполните в терминале команду make test-coverage, и сгенерируйте отчет по покрытию кода тестами. Отчет по покрытию поможет выявить в коде места, не покрытые тестами
Изучите получившуюся статистику. Посмотрите, какие функции недостаточно покрыты тестами. Обратите внимание на столбец Uncovered Line. Здесь показано, какие именно строки в файлах с функциями не покрыты тестами
Изучите эти файлы в директории implementations/right. Разберитесь, что происходит в непокрытых строках. Это поможет понять, какие еще случаи нужно проверить
Допишите тесты на те функции, которые не достаточно покрыты тестами, опираясь на описание их работы и отчет по покрытию
tests/functions.test.js
Допишите необходимые тесты на функции get(), indexOf() и slice(). Функции работают следующим образом:

Функция get(coll, index, defaultValue = null) извлекает из массива значение по указанному индексу, если индекс существует. Если индекс не существует, возвращает значение по умолчанию.

Пример работы функции:

const numbers = [1, 2, 3, 4];
get(numbers, 1) // 2
get(numbers, 5, 'nothing') // 'nothing'
get(numbers, 5) // null
Функция indexOf(coll, value, fromIndex) возвращает первый индекс, по которому переданное значение может быть найдено в массиве или -1, если такого значения нет. Аргументы:

coll - массив, в котором ведется поиск.
value - значение, поиск которого ведется в массиве .
fromIndex - индекс, с которого начинается поиск элемента, по умолчанию равен нулю. Если значение fromIndex отрицательное, то оно используется, как смещение с конца массива.
Пример работы функции:

const numbers = [1, 2, 3, 2, 5];
indexOf(numbers, 2) // 1
indexOf(numbers, 7) // -1
indexOf(numbers, 2, -3) // 3
indexOf(numbers, 2, -10) // 1
Функция slice(coll, begin, end) возвращает новый массив, содержащий копию части исходного массива. Аргументы:

coll - исходный массив.
begin - индекс, по которому начинается извлечение. Если индекс отрицательный, begin указывает смещение от конца последовательности. По умолчанию равен нулю.
end - индекс, по которому заканчивается извлечение (не включая элемент с индексом end). Если индекс отрицательный, end указывает смещение от конца последовательности. По умолчанию равен длине исходного массива.
Пример работы функции:

const numbers = [1, 2, 3, 4, 5];
slice(numbers); // [1, 2, 3, 4, 5]
slice(numbers, 1, 4); // [2, 3, 4]
slice(numbers, -4, -2) // [2, 3]
slice(numbers, 7); // []
slice(numbers, -8, 8); // [1, 2, 3, 4, 5]
Подсказки
Тестирование будет считаться успешным, если на неправильных вариантах функций "упадут" все три теста. Если хотя бы один из трех тестов пройдет, это означает что покрытие функции соответствующим тестом недостаточное. В таком случае решение засчитано не будет.
// */

// Испытание: Мемоизация Фибоначчи
/*
В этом задании вам нужно протестировать мемоизированную версию функции fibonacci(), которая принимает положительное целое число n и возвращает n-ое число Фибоначчи. Числа Фибоначчи определяются как последовательность, где каждое следующее число является суммой двух предыдущих:

F(0) = 0
F(1) = 1
F(n) = F(n-1) + F(n-2) для n > 1
Реализация этой функции находится в файле utils.js. Обратите внимание, что реализация основывается на рекурсии, то есть функция вызывает саму себя. Это будет важно в написании тестов.

Для повышения производительности создана мемоизированная версия функции, которая запоминает результат. Если функция вызывается повторно с тем же значением параметра, то функция fibonacci() из модуля utils.js не вызывается. Вместо этого возвращается сохраненный результат. В тестах мемоизированная версия функции находится в переменной memoFibonacci.

Пример:

memoFibonacci(3); // Функция fibonacci() вызывается 5 раз из-за рекурсивной логики
memoFibonacci(3); // Функция fibonacci() уже не вызывается, так как функция memoFibonacci() сохранила значение и повторно его вернула
tests/fibonacci.test.js
Допишите тесты, которые будут проверять мемоизированную версию функции. Используйте в тестах повторный вызов memoFibonacci() с тем же параметром и проверьте, что функция fibonacci() из модуля utils.js не вызывается повторно при втором вызове.

Подсказки
jest.spyOn()
// */

// Испытание: Генерация тестовых данных
/*
В тестировании часто встречается работа с большими объемами повторяющихся данных. Для их генерации существуют различные библиотеки. В этом задании вам предстоит попрактиковаться с одной из них.

tests/solution.test.js
Добавьте в тесты генерацию данных пользователей. Заполните массив users данными пользователей. Каждый элемент в массиве должен быть объектом вида:

{
  firstName,
  lastName,
  email,
}
Для генерации данных используйте библиотеку @faker-js/faker, она уже импортирована в тесты.

Подсказки
Документация Faker
// */
