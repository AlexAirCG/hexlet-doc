/*
Протестируйте функцию, которая преобразует различные входные форматы в выходной HTML.

// Поддерживаются yml/json/csv
const html1 = toHtmlList('/path/to/yaml/file');
const html2 = toHtmlList('/path/to/json/file');
const html3 = toHtmlList('/path/to/csv/file');
Функция принимает путь к файлу и возвращает HTML в виде строки.

Каждый из входных файлов для этой функции содержит список элементов из которых формируется элемент <ul>. Входные данные и выходной HTML можно подсмотреть в фикстурах.

Ваша задача, пропустить через эту функцию входные файлы и сравнить результат работы функции с ожидаемым значением находящимся в файле __fixtures__/result.html.

Подсказки
test.each
.trim – позволяет удалять концевые пробелы
// */

//*
// my test
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import getFunction from '../../src/toHtmlList/toHtmlList.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const toHtmlList = getFunction()

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '..', '__fixtures__', filename)
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

test.each([['list.csv'], ['list.json'], ['list.yml']])(
  'toHtmlList with %s',
  (filename) => {
    const filePath = getFixturePath(filename)
    const expected = readFile('result.html')

    expect(toHtmlList(filePath)).toBe(expected)
  },
)
// */

/*
// teacher test
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import getFunction from '../../src/toHtmlList/toHtmlList.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const toHtmlList = getFunction()

const formats = ['csv', 'json', 'yml']
const getFixturePath = (name) =>
  path.join(__dirname, '..', '..', '__fixtures__', name)

let expected

beforeAll(() => {
  expected = fs.readFileSync(getFixturePath('result.html'), 'utf-8')
})

test.each(formats)('%s', (format) => {
  const filePath = getFixturePath(`list.${format}`)
  const actual = toHtmlList(filePath)
  expect(actual).toEqual(expected.trim())
})
// */
