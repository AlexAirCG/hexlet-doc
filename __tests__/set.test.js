import set from '../src/set.js'
// import { strict as assert } from 'node:assert'

// ======================================
// const obj = {}
// set(obj, 'key1', 'value1')
// if (obj.key1 !== 'value1') {
//   throw new Error('Функция работает неверно!')
// }

// set(obj, 'key1', 'next value')
// if (obj.key1 === 'next value') {
//   throw new Error('Функция работает неверно!')
// }
// =======================================

// const obj = {}

// set(obj, 'key', 'value')
// assert.strictEqual(obj.key, 'value', 'Значение должно быть "value')

// set(obj, 'key', 'next value')
// assert.notStrictEqual(
//   obj.key,
//   'next value',
//   'Значение НЕ должно было обновиться',
// )
// assert.strictEqual(obj.key, 'value', 'Значение должно остаться старым')

// assert.deepEqual(obj, { key: 'value' })

// console.log('Все тесты пройдены!')

// =============================================

test('set', () => {
  const obj = {}

  set(obj, 'key', 'value')
  expect(obj.key).toBe('value')

  set(obj, 'key', 'next value')
  expect(obj.key).not.toBe('next value')
  expect(obj.key).toBe('value')
  expect(obj).toEqual({ key: 'value' })
})
