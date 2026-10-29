/* // Моки
import { test, expect, vi } from 'vitest'
import path from 'path'
import { fileURLToPath } from 'url'
import getFunction from './trial-7.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = (filename) =>
  path.resolve(__dirname, '../../../__fixtures__', filename)

const getFilesCount = getFunction()



// */

/* // description
Протестируйте в файле __tests__/getFilesCount.test.js функцию getFilesCount(path, log), которая считает количество всех файлов в указанной директории и всех поддиректориях. Во время обхода функция отправляет сообщение в лог, вызывая функцию log(), переданную вторым параметром. Здесь нас интересует только то, что эта функция выполняет логирование. Мы хотим убедиться, что она один раз отправляет сообщение с текстом 'Go!' в лог. Для этого придётся воспользоваться моком.

В getFilesCount() мок передаётся вторым параметром вместо log(), а первым параметром идёт путь до директории __fixtures__/nested. Каркас теста уже строит такой путь функцией getFixturePath().

Тесты запускаются на правильной реализации getFilesCount() и на неправильных из файла functions.js. На правильной реализации они должны пройти, а на каждой неправильной упасть, иначе решение не засчитывается.

Подсказки
toHaveBeenCalledTimes
toHaveBeenCalledWith
Изучите документацию и обратите внимание, где создается мок
Матчеры toHaveBeenCalledTimes() и toHaveBeenCalledWith() получают сам мок, expect(mock). Массив вызовов .mock.calls для них не подходит
// */
