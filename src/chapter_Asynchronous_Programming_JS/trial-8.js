/* // ОБРАБОТКА ОШИБОК В ПРОМИСАХ
import fsp from 'fs/promises'


export { touch }
// */

/* // example
import { touch } from './file.js'

touch('/myfile').then(() => console.log('created!'))

// Повторный вызов успешно завершается
touch('/myfile').then(() => console.log('created!'))
// */

/* // description
Реализуйте и экспортируйте в файле file.js асинхронную функцию touch(), которая создаёт файл, если его не существует. Если файл существует, то функция должна успешно завершиться.

Подсказка
fsPromises.access — проверка существования файла
// */
