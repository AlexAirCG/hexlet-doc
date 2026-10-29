//* // Function Mock
// NODE_OPTIONS=--experimental-vm-modules FUNCTION_VERSION=right npx jest --env=node src/chapter_Advanced_Testing_JS/trial-9/trial-9.test.js
import { jest } from '@jest/globals'
import getImpelementation from './implamitations/trial-9.js'
import utils from './utils.js'

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

// */

/* // description
В тестировании часто нужно использовать моки для некоторых действий, например: запросы в сеть, работу с файловой системой или базой данных. В этом задании вам нужно реализовать мок для функции чтения файлов.

В этом задании вам нужно написать тест для функции loadConfig(). Функция уже определена в тесте.

Функция принимает путь к файлу с JSON и возвращает объект из этого файла используя JSON.parse() для конвертации данных.

Для чтения файлов, функция использует модуль utils.js. В нем определена функция readFile(). Вам нужно написать тесты так, чтобы функция loadConfig() не выполняла реального чтения файлов.

// example.json
// {"key":"value"}

loadConfig('example.json'); // { key: 'value' }

Задание
Напишите в файле __tests__/solution.test.js тесты, чтобы при вызове функции loadConfig() не происходило реального чтения файла. Для этого вам нужно настроить мок для функции readFile() из модуля utils.js.

Подсказки
jest.mockImplementation()
// */
