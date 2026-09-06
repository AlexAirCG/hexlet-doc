//* // АСИНХРОННЫЙ КОД
import fs from 'fs'

const print = (path) => {
  return fs.readFile(path, 'utf-8', (_error, data) => console.log(data))
}

export default print
// */

//* // example
// print('./myfile')
// */

/* // description
Реализуйте и экспортируйте по умолчанию асинхронную функцию, которая читает данные файла по указанному пути и выводит их в консоль.
Подсказки
В теории был пример асинхронного чтения файла. Нужно сделать по аналогии.
// */
