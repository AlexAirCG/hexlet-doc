/* // ВОЗВРАТ В АСИНХРОННОМ КОДЕ
import fs from 'fs'

export default write
// */

/* // example
import write from './writer.js'

write('./myfile', 'data', () => {
  console.log('success')
})
// */

/* // description
Реализуйте асинхронную функцию, которая записывает данные по указанному пути и оповещает о завершении работы через переданный колбек. Экспортируйте функцию по умолчанию.

Подсказки
для записи в файл используйте функцию fs.writeFile().
// */
