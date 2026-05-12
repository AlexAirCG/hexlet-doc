// Испытание:
/*

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

    assert(indexOf([1, 2, 3], 1) === 0)
    assert(indexOf([1, 2, 3, 5, 6, 3], 3) === 2)
    assert(indexOf([1, 2, 3, 1, 2, 3], 3, 3) === 5)
    assert(indexOf([], 1) === -1)

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
