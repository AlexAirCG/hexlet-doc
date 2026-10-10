/* // Promise.all
import path from 'path'
import sumBy from 'es-toolkit/compat/sumBy'
import fsp from 'fs/promises'

export { getDirectorySize }
// */

/* // expmple
getDirectorySize('__fixtures__/usr/local/bin').then(console.log)
// 1240

getDirectorySize('__fixtures__/usr/local/lib').then(console.log)
// 0
// */

/* // description
Реализуйте и экспортируйте в файле file.js функцию getDirectorySize(), которая считает размер переданной директории и возвращает промис с этим размером. Размер директории это сумма размеров в байтах (stats.size) файлов, лежащих прямо в ней. Поддиректории в сумму не входят, ни их содержимое, ни их собственный размер из fsp.stat(). Размеры файлов запрашиваются одновременно, их промисы собирает Promise.all(). Если директории нет, промис отклоняется.

Пример
В директории __fixtures__/usr/local/bin шесть файлов общим размером 1240 байт, а в __fixtures__/usr/local/lib лежит только поддиректория.


Подсказка

- fsp.readdir() возвращает промис с именами файлов и поддиректорий без пути к самой директории. Массив имён доступен только в обработчике then(), поэтому промисы fsp.stat() собираются и передаются в Promise.- all() внутри этого обработчика, а промис Promise.all() возвращается из него.
  path.join() собирает из директории и имени полный путь
- fsp.stat() возвращает промис с информацией о файле. Метод stats.isFile() проверяет, является ли элемент файлом
- sumBy() находит сумму в массиве
// */
