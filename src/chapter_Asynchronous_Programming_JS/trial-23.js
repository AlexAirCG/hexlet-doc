//* // Промисификация

// */

/* // description
Реализуйте и экспортируйте по умолчанию в файле promisify.js функцию, которая «промисифицирует» асинхронные функции с колбеками, как util.promisify() из Node.js.

Функция promisify() принимает функцию, которая последним аргументом ждёт колбек по соглашению error-first, то есть (error, data). Она возвращает новую функцию. Новая функция принимает те же аргументы без колбека, сама добавляет колбек последним аргументом, вызывает исходную функцию и возвращает промис. Если колбек получил ошибку, промис отклоняется с ней, иначе промис завершается значением data.

```js
import fs from 'fs'
import promisify from './promisify.js'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const filepath = '/tmp/myfile'

writeFile(filepath, 'content')
  .then(() => readFile(filepath, 'utf-8'))
  .then(console.log)
// content
```

Для отсутствующего файла промис отклоняется ошибкой из колбека.

readFile('/tmp/missing').catch((error) => console.log(error.code))
// ENOENT
Подсказка
Аргументы новой функции собирают остаточные параметры (...args), а передаёт их в исходную функцию spread-оператор.
// */
