==================================================================
Испытание-1: АСИНХРОННЫЙ КОД |+|
==================================================================
Реализуйте и экспортируйте по умолчанию асинхронную функцию, которая читает данные файла по указанному пути и выводит их в консоль.

Примеры:

```js
import print from './printer.js'
print('./myfile')
```

Подсказки
В теории был пример асинхронного чтения файла. Нужно сделать по аналогии.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import fs from 'fs'

const print = (path) => {
  return fs.readFile(path, 'utf-8', (_error, data) => console.log(data))
}

// teacher solution
import fs from 'fs'

export default (filepath) =>
  fs.readFile(filepath, 'utf-8', (_error, data) => console.log(data))
```

</details>
