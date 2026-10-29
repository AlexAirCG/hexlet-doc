==================================================================
Испытание-1: Тестирование ошибок |-|
==================================================================
src/chapter_Advanced_Testing_JS/trial-1
Имеется функция read(), которая принимает в качестве аргумента путь до файла в виде строки и читает содержимое указанного файла. Функция синхронная, как fs.readFileSync(), и при ошибке выбрасывает исключение. Напишите в файле **tests**/read.test.js негативные тесты функции read(), проверяющие ошибочные ситуации. Рассмотрите следующие ситуации:

Файл не найден
В функцию передан путь до существующей директории. Директорию как файл прочитать нельзя, поэтому для read() это тоже ошибка

```js
read('/undefined') // Error: ENOENT: no such file or directory, open '/undefined'
read('/etc') // Error: EISDIR: illegal operation on a directory, read
```

Тесты запускаются на правильной реализации read() и на неправильных из файла functions.js. На правильной реализации они должны пройти, а на каждой неправильной упасть, иначе решение не засчитывается.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import getFunction from '../functions.js'

const read = getFunction()

describe('read() negative test', () => {
  test('should throw error when file does not exist', () => {
    expect(() => {
      read('/undefind')
    }).toThrow('ENOENT')
  })

  test('should throw error when path is a directory', () => {
    expect(() => {
      read('/etc')
    }).toThrow('EISDIR')
  })
})

// teacher solution
import getFunction from '../functions.js'

const read = getFunction()

test('read', () => {
  expect(() => read('/undefined')).toThrow()
  expect(() => read('/etc')).toThrow()
})
```

</details>

==================================================================
Испытание-2: Побочные эффекты |-|
==================================================================
src/chapter_Advanced_Testing_JS/trial-2
Протестируйте в файле **tests**/buildUser.test.js функцию buildUser(), которая генерирует случайного пользователя. Пользователь, в данном случае, это объект с тремя полями:

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

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import getFunction from '../functions.js'

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

test('default data', () => {
  const user = buildUser({ firstName: 'Pety' })
  expect(user).toMatchObject({
    email: expect.any(String),
    firstName: 'Pety',
    lastName: expect.any(String),
  })
})

// teacher solution
import getFunction from '../functions.js'

const buildUser = getFunction()

test('buildUser fields', () => {
  const user1 = buildUser()
  expect(user1).toEqual(
    expect.objectContaining({
      email: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
    }),
  )
})

test('buildUser random', () => {
  const user1 = buildUser()
  const user2 = buildUser()
  expect(user1).not.toEqual(user2)
})

test('buildUser override', () => {
  const newData1 = {
    email: 'test@email.com',
  }
  const user1 = buildUser(newData1)
  expect(user1).toMatchObject(newData1)
})
```

</details>

==================================================================
Испытание-3: Тестирование кода, взаимодействующего с файлами |-|
==================================================================
src/chapter_Advanced_Testing_JS/trial-3
Протестируйте в файле **tests**/prettifyHTMLFile.test.js функцию prettifyHTMLFile(), которая форматирует и изменяет указанный HTML-файл. Функция добавляет перенос строки и отступы, как это продемонстрировано в примере ниже:

```js
// содержимое до форматирования
// <div><p>hello <b>world</b></p></div>
await prettifyHTMLFile('/path/to/file')

// содержимое после форматирования:
// <div>
//     <p>hello <b>world</b></p>
// </div>
```

В функцию передается путь к файлу. Функция асинхронная, ничего не возвращает и перезаписывает переданный файл отформатированным содержимым.

В примере выше изначально файл /path/to/file содержит такой текст:

<div><p>hello <b>world</b></p></div>

После завершения работы функции содержимое файла меняется на:

<div>
    <p>hello <b>world</b></p>
</div>

Тесты запускаются на правильной реализации prettifyHTMLFile() и на неправильных из файла functions.js. На правильной реализации они должны пройти, а на каждой неправильной упасть, иначе решение не засчитывается.

Подсказки

- В директории **fixtures** лежат готовые фикстуры для тестов. В before.html лежит HTML до форматирования, в after.html ожидаемый результат
- Функция перезаписывает файл, который ей передали. Если передать ей саму фикстуру before.html, первый же прогон её отформатирует, и на следующих прогонах тест не отличит работающую реализацию от неработающей. Поэтому перед каждым тестом скопируйте before.html во временную директорию и передайте функции копию
  Модули для работы с файловой системой: fs, path, os

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import { fileURLToPath } from 'url'
import os from 'os'
import path from 'path'
import fs from 'fs/promises'
import getFunction from '../functions.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const prettifyHTMLFile = getFunction()

const getFixturePath = (filename) =>
  path.resolve(__dirname, '../__fixtures__', filename)

const destPath = path.join(os.tmpdir(), 'linesHTML.html')

beforeEach(async () => {
  await fs.copyFile(getFixturePath('before.html'), destPath)
})

test('prettifyHTMLFile', async () => {
  await prettifyHTMLFile(destPath)
  const actual = await fs.readFile(destPath, 'utf-8')
  const expected = await fs.readFile(getFixturePath('after.html'), 'utf-8')
  expect(actual).toBe(expected)
})

// teacher solution
import { fileURLToPath } from 'url'
import os from 'os'
import path from 'path'
import fs from 'fs/promises'
import getFunction from '../functions.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const prettifyHTMLFile = getFunction()

const getFixturePath = (name) =>
  path.join(__dirname, '..', '__fixtures__', name)

const filename = 'before.html'
const dest = path.join(os.tmpdir(), filename)
const src = getFixturePath(filename)

let expected

beforeAll(async () => {
  expected = await fs.readFile(getFixturePath('after.html'), 'utf-8')
})

beforeEach(async () => {
  await fs.copyFile(src, dest)
})

test('prettifyHTMLFile', async () => {
  await prettifyHTMLFile(dest)
  const actual = await fs.readFile(dest, 'utf-8')
  expect(actual).toBe(expected)
})
```

</details>

==================================================================
Испытание-4: Инверсия зависимостей |-|
==================================================================
src/chapter_Advanced_Testing_JS/trial-4
Протестируйте в файле **tests**/getFilesCount.test.js функцию getFilesCount(), которая считает количество всех файлов в указанной директории и всех поддиректориях. Сама функция уже написана, каркас теста получает её вызовом getFunction(), и ваша задача только в тестах.

const filesCount = getFilesCount('/path/to/directory')
У этой функции есть дополнительное поведение. Во время обхода файлов, она записывает информацию об этом (какие файлы были задействованы) в специальный файл, который называется журналом действий или логом.

Запись в файл является нежелательным побочным эффектом. Каждый запуск будет заполнять какой-то файл, который мы никак не используем. От него нужно избавиться. Все что мы хотим — чтобы функция считала количество файлов. Сделать это можно так. Для записи в файл, функция getFilesCount(), использует другую функцию, которую можно подменить:

```js
const getFilesCount = (path, log = writeDataToFile) => {
  // Где-то внутри во время работы
  log(`file ${name} has been processed`)
}
```

Для подмены нужно передать вторым параметром функцию-пустышку, которая не будет ничего делать. В таком случае ее вызов внутри getFilesCount() хоть и отработает, но не породит побочного эффекта. Без пустышки функция пишет в настоящий лог, и прогон тестов завершается ошибкой Cannot send data to log!.

Тесты запускаются на правильной реализации getFilesCount() и на неправильных из файла functions.js. На правильной реализации они должны пройти, а на каждой неправильной упасть, иначе решение не засчитывается.

Подсказки
Передайте этой функции путь до директории внутри **fixtures** и убедитесь в том что она правильно посчитала количество файлов внутри. В фикстурах две директории, и файлы во вложенной директории nested/one/ функция тоже считает.

```txt
__fixtures__
├── flat
│   ├── one
│   ├── three
│   └── two
└── nested
    ├── one
    │   ├── one
    │   └── two
    ├── three
    └── two
```

Неправильная реализация может не заходить в поддиректории. Директория без поддиректорий такую ошибку не покажет

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import { fileURLToPath } from 'url'
import path from 'path'
import getFunction from '../functions.js'

const getFilesCount = getFunction()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = (name) =>
  path.join(__dirname, '..', '__fixtures__', name)

test('getFileCount', () => {
  const flatDirPath = getFixturePath('flat')
  const nestedDirPath = getFixturePath('nested')
  const dummyLoger = () => {}

  const flatResult = getFilesCount(flatDirPath, dummyLoger)
  const nestedResult = getFilesCount(nestedDirPath, dummyLoger)

  expect(flatResult).toBe(3)
  expect(nestedResult).toBe(4)
})

// teacher solution
import { fileURLToPath } from 'url'
import path from 'path'
import getFunction from '../functions.js'

const getFilesCount = getFunction()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = (name) =>
  path.join(__dirname, '..', '__fixtures__', name)

test('getFilesCount', () => {
  // flat можно не тестировать так как nested покрывает и flat тоже
  const directoryPath = getFixturePath('nested')
  const filesCount = getFilesCount(directoryPath, () => {})
  expect(filesCount).toBe(4)
})
```

</details>

==================================================================
Испытание-5: Тестирование HTTP-запросов |-|
==================================================================
src/chapter_Advanced_Testing_JS/trial-5
Протестируйте в файле **tests**/getUserMainLanguage.test.js функцию getUserMainLanguage(username, client), определяющую язык, на котором пользователь создал больше всего репозиториев. Для реализации этой задачи, функция getUserMainLanguage() выполняет запрос через @octokit/rest, который извлекает все репозитории указанного пользователя (по первому параметру username). Каждый репозиторий в этом списке содержит указание основного языка репозитория. Эта информация используется для поиска того языка, который используется чаще. Если список репозиториев пуст, функция возвращает null.

Пример

```js
// Запрос, который выполняет функция getUserMainLanguage
// Именно этот метод нужно будет подменить в фейковом клиенте
const { data } = await client.repos.listForUser({ username })
// data – список репозиториев. У каждого репозитория может быть много полей
// но нас интересует ровно одно – language
// Эти данные нужно подготовить в тестах для фейкового клиента
console.log(data)
// [{ language: 'php', ... }, { language: 'javascript', ... }, ...]
```

Этот код выполняется внутри getUserMainLanguage(), в тест его переносить не нужно. Тест сам придумывает список репозиториев, отдаёт его фейковому клиенту и сравнивает результат функции с языком, который в этом списке встречается чаще других. Фейковый клиент имя пользователя не проверяет, поэтому username может быть любой строкой.

Тесты запускаются на правильной реализации getUserMainLanguage() и на неправильных из файла functions.js. На правильной реализации они должны пройти, а на каждой неправильной упасть, иначе решение не засчитывается. Поэтому проверьте оба случая, список с языками и пустой список.

Фейковый клиент
Реализуйте в файле support/OctokitFake.js фейковый клиент по такому же принципу как это было сделано в теории. Используйте этот клиент в тестах для подмены. Класс экспортируется по умолчанию, в тесте клиент создаётся вызовом new OctokitFake(data), где data это список репозиториев. Метод клиента называется так же, как метод, который вызывает функция, то есть repos.listForUser().

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import OctokitFake from '../support/OctokitFake.js'
import getFunction from '../functions.js'

const getUserMainLanguage = getFunction()

test('getUserMainFanguage', async () => {
  const data = [
    { language: 'php' },
    { language: 'javaScript' },
    { language: 'javaScript' },
  ]

  const client = new OctokitFake(data)
  const userName = 'some-name'
  const mainLanguage = await getUserMainLanguage(userName, client)
  expect(mainLanguage).toBe('javaScript')
})

test('getUserMainLanguage is empty', async () => {
  const data = []

  const client = new OctokitFake(data)
  const username = 'hexlet'

  const mainLanguage = await getUserMainLanguage(username, client)

  expect(mainLanguage).toBeNull()
})

class OktokitFake {
  constructor(data) {
    this.data = data
  }

  repos = {
    listForUser: () => {
      return Promise.resolve({ data: this.data })
    },
  }
}

export default OktokitFake

// teacher solution
import OctokitFake from '../support/OctokitFake.js'
import getFunction from '../functions.js'

const getUserMainLanguage = getFunction()

test('getUserMainLanguage', async () => {
  const data = [
    { language: 'ruby' },
    { language: 'php' },
    { language: 'java' },
    { language: 'php' },
    { language: 'js' },
  ]
  const client = new OctokitFake(data)
  const mainLanguage = await getUserMainLanguage('linus', client)
  expect(mainLanguage).toEqual('php')
})

test('getUserMainLanguage when empty', async () => {
  const client = new OctokitFake([])
  const mainLanguage = await getUserMainLanguage('user-without-repos', client)
  expect(mainLanguage).toBeNull()
})
```

</details>

==================================================================
Испытание-6: Манкипатчинг |-|
==================================================================
src/chapter_Advanced_Testing_JS/trial-6
В этом задании нужно протестировать в файле **tests**/getUserMainLanguage.js функцию getUserMainLanguage(username) манки патчингом через библиотеку nock.

Функция определяет язык, на котором пользователь создал больше всего репозиториев. Она запрашивает через @octokit/rest список репозиториев пользователя username, берёт у каждого репозитория поле language и возвращает тот язык, который встречается чаще. Если список репозиториев пуст, функция возвращает null. Второй параметр client в этом задании не передаётся. Тогда функция создаёт настоящий клиент @octokit/rest, и его HTTP-запрос перехватывает nock.

// GitHub отвечает списком [{ language: 'php' }, { language: 'js' }, { language: 'php' }]
await getUserMainLanguage('linus') // 'php'

// GitHub отвечает пустым списком []
await getUserMainLanguage('linus') // null
Тесты запускаются на правильной реализации getUserMainLanguage() и на неправильных из файла functions.js. На правильной реализации они должны пройти, а на каждой неправильной упасть, иначе решение не засчитывается. Поэтому проверьте оба случая, список с языками и пустой список.

Подсказки
В тестах выключены реальные запросы. Это значит, что если запустить тесты, в которых выполняется реальный запрос, nock его перехватит и выведет на экран. Так можно узнать адреса по которым @octokit/rest выполняет свои запросы. Например, вызов getUserMainLanguage('linus') без подмены завершается такой ошибкой.

Request to https://api.github.com/users/linus/repos failed, reason: Nock: Disallowed net connect for "api.github.com:443/users/linus/repos"
Подмена срабатывает на один запрос, поэтому каждый тест описывает свой ответ вызовом nock()

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import nock from 'nock'
import getFunction from '../functions.js'

const getUserMainLanguage = getFunction()

nock.disableNetConnect()

test('getgetUserMainLanguage', async () => {
  const data = [{ language: 'php' }, { language: 'js' }, { language: 'php' }]
  const userName = 'hexlet'

  nock('https://api.github.com')
    .get(`/users/${userName}/repos`)
    .reply(200, data)

  const mainLanguage = await getUserMainLanguage(userName)

  expect(mainLanguage).toBe('php')
})

test('getgetUserMainLanguage is empty', async () => {
  const data = []
  const userName = 'hexlet'

  nock('https://api.github.com')
    .get(`/users/${userName}/repos`)
    .reply(200, data)

  const mainLanguage = await getUserMainLanguage(userName)

  expect(mainLanguage).toBeNull()
})

// teacher solution
import nock from 'nock'
import getFunction from '../functions.js'

const getUserMainLanguage = getFunction()

nock.disableNetConnect()

test('getUserMainLanguage', async () => {
  const data = [
    { language: 'ruby' },
    { language: 'php' },
    { language: 'java' },
    { language: 'php' },
    { language: 'js' },
  ]
  nock(/api\.github\.com/)
    .get('/users/linus/repos')
    .reply(200, data)

  const mainLanguage = await getUserMainLanguage('linus')
  expect(mainLanguage).toEqual('php')
})

test('getUserMainLanguage when empty', async () => {
  nock(/api\.github\.com/)
    .get('/users/user-without-repos/repos')
    .reply(200, [])

  const mainLanguage = await getUserMainLanguage('user-without-repos')
  expect(mainLanguage).toBeNull()
})
```

</details>

==================================================================
Испытание-7: Моки |-|
==================================================================
src/chapter_Advanced_Testing_JS/trial-7
Протестируйте в файле **tests**/getFilesCount.test.js функцию getFilesCount(path, log), которая считает количество всех файлов в указанной директории и всех поддиректориях. Во время обхода функция отправляет сообщение в лог, вызывая функцию log(), переданную вторым параметром. Здесь нас интересует только то, что эта функция выполняет логирование. Мы хотим убедиться, что она один раз отправляет сообщение с текстом 'Go!' в лог. Для этого придётся воспользоваться моком.

В getFilesCount() мок передаётся вторым параметром вместо log(), а первым параметром идёт путь до директории **fixtures**/nested. Каркас теста уже строит такой путь функцией getFixturePath().

Тесты запускаются на правильной реализации getFilesCount() и на неправильных из файла functions.js. На правильной реализации они должны пройти, а на каждой неправильной упасть, иначе решение не засчитывается.

Подсказки
toHaveBeenCalledTimes
toHaveBeenCalledWith
Изучите документацию и обратите внимание, где создается мок
Матчеры toHaveBeenCalledTimes() и toHaveBeenCalledWith() получают сам мок, expect(mock). Массив вызовов .mock.calls для них не подходит

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import { fileURLToPath } from 'url'
import path from 'path'
import { vi } from 'vitest'
import getFunction from '../functions.js'

const getFilesCount = getFunction()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = (name) =>
  path.join(__dirname, '..', '__fixtures__', name)

test('getFilesCount', () => {
  const logMock = vi.fn()
  const fixturePath = getFixturePath('nested')

  getFilesCount(fixturePath, logMock)

  expect(logMock).toHaveBeenCalledTimes(1)
  expect(logMock).toHaveBeenCalledWith('Go!')
})

// teacher solution
import { fileURLToPath } from 'url'
import path from 'path'
import { vi } from 'vitest'
import getFunction from '../functions.js'

const getFilesCount = getFunction()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = (name) =>
  path.join(__dirname, '..', '__fixtures__', name)

test('getFilesCount', () => {
  const directoryPath = getFixturePath('nested')
  const mock = vi.fn()
  getFilesCount(directoryPath, mock)
  expect(mock).toHaveBeenCalledTimes(1)
  expect(mock).toHaveBeenCalledWith('Go!')
})
```

</details>

==================================================================
Испытание-8: Property-based тестирование |-|
==================================================================
src/chapter_Advanced_Testing_JS/trial-8
Протестируйте в файле **tests**/sort.test.js функцию sort(), которая сортирует массив целых чисел по возрастанию. Функция возвращает новый отсортированный массив. При тестировании используйте комбинированный подход, то есть напишите обычный тест на конкретном массиве из примера ниже и property-based тест, который проверяет свойство «результат отсортирован» на сгенерированных массивах.

const numbers = [3, 1, 0, 7, 5]
const sorted = sort(numbers)
console.log(sorted) // => [0, 1, 3, 5, 7]
Тесты запускаются на правильной реализации sort() и на неправильных из файла functions.js. На правильной реализации они должны пройти, а на каждой неправильной упасть, иначе решение не засчитывается.

Подсказки
Для property-based тестирования используйте фреймворк fast-check
Массивы целых чисел генерирует fc.array(fc.integer()). Генератор строк fc.string() из урока здесь не подходит, потому что функция сортирует числа
Чтобы проверить, что массив отсортирован, используйте пакет jest-sorted, который добавляет к expect матчер toBeSorted
expect([1, 2, 3]).toBeSorted()

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import fc from 'fast-check'
import getFunction from '../functions.js'

const sort = getFunction()

// BEGIN (write your solution here)
test('sort', () => {
  const numbers = [3, 1, 0, 7, 5]
  const sorted = sort(numbers)
  expect(sorted).toEqual([0, 1, 3, 5, 7])
})

test('sort property-based', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (arr) => {
      const sorted = sort(arr)
      const isSorted = sorted.every((val, i) => i === 0 || sorted[i - 1] <= val)
      expect(isSorted).toBe(true)
    }),
  )
})

// teacher solution
import fc from 'fast-check'
import getFunction from '../functions.js'

const sort = getFunction()

test('should be sorted', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (data) => {
      const result = sort(data)
      expect(result).toBeSorted()
    }),
  )
})
```

</details>

==================================================================
Испытание-9: Function Mock |-|
==================================================================
src/chapter_Advanced_Testing_JS/trial-9
В тестировании часто нужно использовать моки для некоторых действий, например: запросы в сеть, работу с файловой системой или базой данных. В этом задании вам нужно реализовать мок для функции чтения файлов.

В этом задании вам нужно написать тест для функции loadConfig(). Функция уже определена в тесте.

Функция принимает путь к файлу с JSON и возвращает объект из этого файла используя JSON.parse() для конвертации данных.

Для чтения файлов, функция использует модуль utils.js. В нем определена функция readFile(). Вам нужно написать тесты так, чтобы функция loadConfig() не выполняла реального чтения файлов.

// example.json
// {"key":"value"}

loadConfig('example.json'); // { key: 'value' }
Задание
Напишите в файле **tests**/solution.test.js тесты, чтобы при вызове функции loadConfig() не происходило реального чтения файла. Для этого вам нужно настроить мок для функции readFile() из модуля utils.js.

Подсказки
jest.mockImplementation()

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import { jest } from '@jest/globals'
import getImpelementation from '../implementations/index.js'
import utils from '../utils.js'

const loadConfig = getImpelementation()

test('loadConfig', () => {
  utils.readFile = jest.fn().mockImplementation(() => '{"key":"value"}')
  expect(loadConfig('example.json')).toEqual({ key: 'value' })
})

// teacher solution
import { jest } from '@jest/globals'
import getImpelementation from '../implementations/index.js'
import utils from '../utils.js'

const loadConfig = getImpelementation()

test('loadConfig', () => {
  const contents = {
    testFile: '{"key":"value"}',
    otherFile: '{"key1":"value1"}',
  }

  utils.readFile = jest.fn((filePath) => contents[filePath])

  expect(loadConfig('testFile')).toEqual(JSON.parse(contents['testFile']))
  expect(loadConfig('otherFile')).toEqual(JSON.parse(contents['otherFile']))
})
```

</details>
