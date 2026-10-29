//* //
import { expect, test } from 'vitest'
import getFunction from './trial-2.js'

const buildUser = getFunction()

test('right structure', () => {
  const user = buildUser()
  expect(user).toMatchObject({
    email: expect.any(String),
    firstName: expect.any(String),
    lastName: expect.any(String),
  })
})

test('different data', () => {
  const user1 = buildUser()
  const user2 = buildUser()
  expect(user1).not.toEqual(user2)
})

test('setting parameters', () => {
  const user = buildUser({ firstName: 'Pety' })
  expect(user).toMatchObject({
    email: expect.any(String),
    firstName: 'Pety',
    lastName: expect.any(String),
  })
})

// */

/* // description
Протестируйте в файле __tests__/buildUser.test.js функцию buildUser(), которая генерирует случайного пользователя. Пользователь, в данном случае, это объект с тремя полями:

email
firstName
lastName
Для генерации данных используется библиотека fakerator

```js
console.log(buildUser())
// {
//   email: 'Zion.Reichel12@yahoo.com',
//   firstName: 'Elizabeth',
//   lastName: 'Zulauf',
// }

// Если какой-то из параметров нужно задать точно, то его можно передать в функцию
console.log(buildUser({ firstName: 'Petya' }))
// {
//   email: 'Zion.Reichel12@yahoo.com',
//   firstName: 'Petya',
//   lastName: 'Zulauf',
// }
```

Вам нужно протестировать три ситуации:

Что вызов buildUser() возвращает объект нужной структуры.
Что каждый вызов buildUser() возвращает объект с другими данными.
Что работает установка свойств через параметры.
Тесты запускаются на правильной реализации buildUser() и на неправильных из файла functions.js. На правильной реализации они должны пройти, а на каждой неправильной упасть, иначе решение не засчитывается.

Подсказки

- buildUser() возвращает объект, поэтому её вызов передаётся в expect() напрямую, без обёртки в функцию. Обёртка expect(() => …) нужна только матчеру toThrow()
- Структуру объекта проверяют матчеры toHaveProperty() и toMatchObject(), а вместо конкретного значения поля подходит expect.any(String)
- Разные данные у двух вызовов проверяет not.toEqual()
- Параметры передаются объектом, например buildUser({ firstName: 'Petya' })
// */
