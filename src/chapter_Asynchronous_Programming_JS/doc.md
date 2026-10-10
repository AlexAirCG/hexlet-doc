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

==================================================================
Испытание-2: ВОЗВРАТ В АСИНХРОННОМ КОДЕ |+|
==================================================================
Реализуйте асинхронную функцию, которая записывает данные по указанному пути и оповещает о завершении работы через переданный колбек. Экспортируйте функцию по умолчанию.

```js
import write from './writer.js'

write('./myfile', 'data', () => {
  console.log('success')
})
```

Подсказки
для записи в файл используйте функцию fs.writeFile().

==================================================================
Испытание-3: УПОРЯДОЧИВАНИЕ АСИНХРОННЫХ ОПЕРАЦИЙ |-|
==================================================================
Реализуйте и экспортируйте асинхронную функцию compareFileSizes(), которая сравнивает размеры двух файлов и передает результат сравнения в переданную callback-функцию. Если первый файл больше второго, то она передает единицу, если размеры равны, то ноль, иначе — -1.

```js
import { compareFileSizes } from './info.js'

compareFileSizes('filepath1', 'filepath2', (_err, result) =>
  console.log(result),
)
```

Подсказка

- Для реализации этого задания, нужно воспользоваться функцией fs.stat, которая использовалась в примерах теории
- Math.sign

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import fs from 'fs'

const compareFileSizes = (filepath1, filepath2, cb) => {
  fs.stat(filepath1, (_error1, stat1) => {
    if (_error1) {
      cb(_error1)
      return
    }
    fs.stat(filepath2, (_error2, stat2) => {
      if (_error2) {
        cb(_error2)
        return
      }
      const result = Math.sign(stat1.size - stat2.size)
      cb(null, result)
    })
  })
}

export { compareFileSizes }

// teacher solution
import fs from 'fs'

export const compareFileSizes = (filepath1, filepath2, cb) => {
  fs.stat(filepath1, (_error1, { size: size1 }) => {
    fs.stat(filepath2, (_error2, { size: size2 }) => {
      cb(null, Math.sign(size1 - size2))
    })
  })
}
```

</details>

==================================================================
Испытание-4: ОБРАБОТКА ОШИБОК |+|
==================================================================
Реализуйте и экспортируйте функцию move, которая асинхронно перемещает файл из одного места в другое. Ее параметры:

1. Путь до файла исходника
2. Путь по которому нужно копировать файл
3. Колбек, у которого единственный аргумент — ошибка.

Алгоритм работы функции следующий:

1. Читаем исходный файл
2. Создаём новый файл и записываем туда данные исходного файла (это важно сделать до попытки удаления исходного файла!)
3. Удаляем исходный файл

Реальная функция move устроена не так. Если исходник и приемник находятся на одном устройстве, то копирования не происходит, меняются лишь указатели в фс

```js
import { move } from './file.js'

move('/opt/myfile', '/tmp/newfile', (error) => {
  if (error) {
    console.log('oops')
    return
  }
  console.log('yes!')
})
```

Другие примеры смотрите в тестах

Подсказки

- fs.unlink - удаление файла
- fs.readFile - чтение файла
- fs.writeFile - запись в файл

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import fs from 'fs'

const move = (readFromFile, writeToFile, cb) => {
  fs.readFile(readFromFile, 'utf-8', (err1, data1) => {
    if (err1) {
      cb(err1)
      return
    }
    fs.writeFile(writeToFile, `${data1}`, (err2) => {
      if (err2) {
        cb(err2)
        return
      }
      fs.unlink(readFromFile, (err3) => {
        if (err3) {
          cb(err3)
          return
        }
        cb(null)
      })
    })
  })
}

export { move }

// teacher solution
import fs from 'fs'

export const move = (from, to, cb) => {
  fs.readFile(from, 'utf-8', (error1, data) => {
    if (error1) {
      cb(error1)
      return
    }
    fs.writeFile(to, data, (error2) => {
      if (error2) {
        cb(error2)
        return
      }
      fs.unlink(from, cb)
    })
  })
}
```

</details>

==================================================================
Испытание-5: ПАРАЛЛЕЛЬНОЕ ВЫПОЛНЕНИЕ ОПЕРАЦИЙ |-|
==================================================================
Реализуйте и экспортируйте асинхронную функцию getDirectorySize(), которая считает размер переданной директории, не включая поддиректории. Анализ размера файла должен происходить параллельно, для этого воспользуйтесь библиотекой async

Примеры

```js
import { getDirectorySize } from './info.js'

getDirectorySize('/usr/local/bin', (err, size) => {
  console.log(size)
})

// Ошибка
getDirectorySize('/undefined', (err, size) => {
  console.error(err)
})
```

Подсказки

- fs.readdir() — чтение содержимого директории, возвращает файлы и папки в директории
- path.join() — конструирует пути
- async.map() — специальная функция из библиотеки для асинхронной обработки коллекций
- fs.stat() — информация о файле. В получаемом объекте содержится метод isFile() для проверки является ли элемент файлом
- \_.sumBy() — нахождение суммы в массиве
  колбек должен вызываться и в случае ошибки

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import async from 'async'

const getDirectorySize = (dirpath, callback) => {
  fs.readdir(dirpath, (err, files) => {
    if (err) {
      callback(err)
      return
    }

    async.map(
      files,
      (file, cb) => {
        const filePath = path.join(dirpath, file)
        fs.stat(filePath, (statErr, stats) => {
          if (statErr) {
            cb(statErr)
            return
          }
          cb(null, stats.isFile() ? stats.size : 0)
        })
      },
      (mapErr, sizes) => {
        if (mapErr) {
          callback(mapErr)
          return
        }
        callback(null, _.sumBy(sizes))
      },
    )
  })
}

export { getDirectorySize }

// teacher solution
import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import async from 'async'

export const getDirectorySize = (dirPath, cb) => {
  // читаем содержимое переданной папки dirPath
  // readdir принимает вторым аргументом колбэк с двумя аргументами
  // второй аргумент колбэка, fileNames, - это массив имен файлов и папок
  fs.readdir(dirPath, (error1, fileNames) => {
    // первым делом обрабатываем ошибку - передаем ошибку в колбэк cb,
    // опуская 2-й аргумент, хотя допустимо туда явно передавать null,
    // а из самой функции выходим через return
    if (error1) {
      cb(error1)
      return
    }
    // если ошибки нет - работаем
    // собираем путь к каждому файлу, синхронная функция
    const filePaths = fileNames.map((name) => path.join(dirPath, name))
    // теперь извлекаем информацию о каждом файле/папке
    // при помощи асинхронной функции fs.stat
    // она тоже принимает вторым аргументом колбэк с двумя аргументами
    async.map(filePaths, fs.stat, (error2, stats) => {
      // точно так же обрабатываем ошибку
      if (error2) {
        cb(error2)
        return
      }
      // если ошибок нет, мы работаем с массивом stats -
      // результатом применения fs.stat к каждому элементу массива filePaths
      // в _.sumBy() передаем массив отфильтрованных файлов первым аргументом,
      // ведь поддиректории мы тут не учитываем,
      // а вторым - имя свойства, по которому осуществляем сложение,
      const sum = _.sumBy(
        stats.filter((stat) => stat.isFile()),
        'size',
      )
      // передаем результат во второй параметр колбэка
      cb(null, sum)
    })
  })
}
```

</details>

==================================================================
Испытание-6: ТАЙМЕРЫ |-|
==================================================================
Реализуйте и экспортируйте по умолчанию асинхронную функцию, которая следит за изменением файла с заданной периодичностью. Функция должна возвращать идентификатор таймера, запущенного внутри.

Если файл был изменён со времени предыдущей проверки, то необходимо вызвать колбек. Если во время анализа файла (через fs.stat) произошла ошибка, то нужно остановить таймер и вызвать колбек, передав туда ошибку.

Отслеживание изменений файла должно начинаться с момента вызова функции. Параметры функции:

- Путь до файла, который нужно отслеживать
- Период отслеживания
- Колбек, принимающий аргументом ошибку

```js
import watch from './watcher.js'

const id = watch(filepath, 500, (err) => {
  console.log('Wow!')
})

setTimeout(() => fs.appendFileSync(filepath, 'ehu'), 700)
setTimeout(() => clearInterval(id), 5000) // остановить отслеживание через 5 секунд
```

Функция должна с заданным периодом отслеживать изменения файла и вызывать колбек, если обнаружено изменение файла. После вызова колбека, функция должна продолжать отслеживать изменения. Отслеживание останавливают сами тесты, для этого ваша функция должна возвращать id таймера.

Подсказки

- stats.mtimeMs — время последнего изменения
- Date.now() — текущая дата
- clearInterval
- Для решения используйте setInterval()

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import fs from 'fs'

const watch = (filepath, period, cb) => {
  let lastMtime = null

  const check = () => {
    fs.stat(filepath, (err, stats) => {
      if (err) {
        clearInterval(id)
        cb(new Error(err.message))
        return
      }

      if (lastMtime !== null && stats.mtimeMs !== lastMtime) {
        cb(null)
      }

      lastMtime = stats.mtimeMs
    })
  }

  check()
  const id = setInterval(check, period)

  return id
}

// teacher solution (the best)
import fs from 'fs'

export default (filepath, period, cb) => {
  // фиксируем время последней проверки - момент запуска функции
  let lastCheckTime = Date.now()
  // функция проверки файла
  const check = (timerId) => {
    fs.stat(filepath, (err, stats) => {
      // в случае ошибки отключаем таймер
      // и отдаем в колбэк ошибку
      if (err) {
        clearInterval(timerId)
        cb(err)
        return
      }
      // извлекаем время последней модификации файла
      const { mtimeMs } = stats
      // если файл был модифицирован после запуска функции,
      // вызываем колбэк и меняем время последней проверки
      if (mtimeMs > lastCheckTime) {
        cb(null)
        lastCheckTime = mtimeMs
      }
    })
  }
  // создаем таймер и передаем его id в функцию проверки файла
  const timerId = setInterval(() => check(timerId), period)
  return timerId
}
```

</details>

==================================================================
Испытание-7: ПРОМИСЫ |-|
==================================================================
Реализуйте и экспортируйте асинхронную функцию reverse(), которая изменяет порядок расположения строк в файле на обратный. Функция должна перезаписать файл.

```txt
# file.txt
one
two
```

```js
import { reverse } from './file.js'

reverse('file.txt')
// two
// one
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import fsp from 'fs/promises'

const reverse = (src) => {
  return fsp
    .readFile(src, 'utf-8')
    .then((text) => text.split('\n').reverse().join('\n'))
    .then((text) => fsp.writeFile(src, text))
}

// teacher solution
import fsp from 'fs/promises'

// читаем содержимое файла
export const reverse = (filepath) =>
  fsp
    .readFile(filepath, 'utf-8')
    // работаем с содержимым: переворачиваем строку
    // и записываем результат в тот же файл
    .then((data) => {
      const preparedData = data.split('\n').reverse().join('\n')
      return fsp.writeFile(filepath, preparedData)
    })
```

</details>

==================================================================
Испытание-8: ОБРАБОТКА ОШИБОК В ПРОМИСАХ |-|
==================================================================
Реализуйте и экспортируйте в файле file.js асинхронную функцию touch(), которая создаёт файл, если его не существует. Если файл существует, то функция должна успешно завершиться.

```js
import { touch } from './file.js'

touch('/myfile').then(() => console.log('created!'))

// Повторный вызов успешно завершается
touch('/myfile').then(() => console.log('created!'))
```

Подсказка
fsPromises.access — проверка существования файла

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import fsp from 'fs/promises'

const touch = (filepath) => {
  return fsp.access(filepath).catch((error) => {
    if (error.code === 'ENOENT') {
      return fsp.writeFile(filepath, '')
    }
    throw error
  })
}

export { touch }

// teacher solution
import fsp from 'fs/promises'

export const touch = (filepath) =>
  fsp
    .access(filepath)
    // в случае, если файла не существует, функция выбрасывает ошибку
    // ловим эту ошибку и создаем файл
    .catch(() => fsp.writeFile(filepath, ''))
```

</details>

==================================================================
Испытание-9: ЦЕПОЧКА ПРОМИСОВ |-|
==================================================================
Реализуйте и экспортируйте в файле file.js асинхронную функцию getTypes(), которая анализирует список переданных путей и возвращает массив (в промисе), с описанием того, что находится по каждому из путей в виде строк 'directory' и 'file'.

Эта функция должна отрабатывать успешно в любом случае. Если во время выполнения асинхронной операции возникла ошибка, то значением для этого пути будет null. Для простоты считаем, что в эту функцию всегда передается как минимум один путь для обработки (иначе придется задействовать механизм, который проходится в курсах далее).

```js
getTypes(['/etc', '/etc/hosts', '/undefined']).then(console.log)
// ['directory', 'file', null]
```

Подсказки

- fsPromises.stat - информация о файле или директории. Для проверки на директорию используйте метод isDirectory.
- Методы then и catch не меняют сам промис, а возвращают новый

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import fsp from 'fs/promises'

const getTypes = (filePaths) => {
  const initPromise = Promise.resolve([])

  return filePaths.reduce((acc, path) => {
    return acc.then((content) => {
      return fsp
        .stat(path)
        .then((data) => {
          if (data.isDirectory()) {
            return content.concat('directory')
          } else if (data.isFile()) {
            return content.concat('file')
          }
          return content.concat(null)
        })
        .catch(() => content.concat(null))
    })
  }, initPromise)
}

export { getTypes }

// teacher solution
import fsp from 'fs/promises'

const getTypeName = (stat) => (stat.isDirectory() ? 'directory' : 'file')

export const getTypes = (filesPath) => {
  // функция получает путь и аккумулятор из reduce, выполняет попытку получить stat,
  // добавляет в аккумулятор строку или null и возвращает обновлённый аккумулятор
  const processPath = (filepath, result) =>
    fsp
      .stat(filepath)
      .then((data) => [...result, getTypeName(data)])
      .catch(() => [...result, null])

  const resultPromise = filesPath.reduce(
    // promise - это аккумулятор, обёрнутый в промис, поэтому на нём вызывается then
    // result - предыдущее значение аккумулятора
    (promise, filepath) =>
      promise.then((result) => processPath(filepath, result)),
    Promise.resolve([]),
  )
  return resultPromise
}
```

</details>

==================================================================
Испытание-10: Promise.all |-|
==================================================================
Реализуйте и экспортируйте в файле file.js функцию getDirectorySize(), которая считает размер переданной директории и возвращает промис с этим размером. Размер директории это сумма размеров в байтах (stats.size) файлов, лежащих прямо в ней. Поддиректории в сумму не входят, ни их содержимое, ни их собственный размер из fsp.stat(). Размеры файлов запрашиваются одновременно, их промисы собирает Promise.all(). Если директории нет, промис отклоняется.

Пример
В директории **fixtures**/usr/local/bin шесть файлов общим размером 1240 байт, а в **fixtures**/usr/local/lib лежит только поддиректория.

```js
import { getDirectorySize } from './file.js'

getDirectorySize('__fixtures__/usr/local/bin').then(console.log)
// 1240

getDirectorySize('__fixtures__/usr/local/lib').then(console.log)
// 0
```

Подсказка

- fsp.readdir() возвращает промис с именами файлов и поддиректорий без пути к самой директории. Массив имён доступен только в обработчике then(), поэтому промисы fsp.stat() собираются и передаются в Promise.- all() внутри этого обработчика, а промис Promise.all() возвращается из него.
  path.join() собирает из директории и имени полный путь
- fsp.stat() возвращает промис с информацией о файле. Метод stats.isFile() проверяет, является ли элемент файлом
- sumBy() находит сумму в массиве

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import path from 'path'
import { sumBy } from 'es-toolkit/compat'
import fsp from 'fs/promises'

const getDirectorySize = (dirpath) =>
  fsp
    .readdir(dirpath)
    .then((filenames) => {
      const promises = filenames.map((name) =>
        fsp.stat(path.join(dirpath, name)),
      )
      return Promise.all(promises)
    })
    .then((allStats) => {
      const files = allStats.filter((stats) => stats.isFile())
      return sumBy(files, (stats) => stats.size)
    })

export { getDirectorySize }

// teacher solution
import path from 'path'
import { sumBy } from 'es-toolkit/compat'
import fsp from 'fs/promises'

export const getDirectorySize = (dirpath) => {
  // читаем список имен файлов в папке
  const promise = fsp.readdir(dirpath).then((filenames) => {
    // строим путь к файлам
    const filepaths = filenames.map((name) => path.join(dirpath, name))
    // извлекаем метаданные о файлах
    const promises = filepaths.map((filePath) => fsp.stat(filePath))
    // превращаем массив промисов (promises) в один-единственный промис,
    // возвращающий массив
    return Promise.all(promises)
  })

  // из промиса получаем массив stats
  // суммируем размеры файлов в директории
  return promise.then((stats) =>
    sumBy(
      stats.filter((stat) => stat.isFile()),
      'size',
    ),
  )
}
```

</details>

==================================================================
Испытание-11: new Promise |-|
==================================================================
Реализуйте в файле timer.js таймер в виде промиса. Функция принимает количество миллисекунд и возвращает промис, который успешно завершается без значения, когда пройдёт это время. Экспортируйте функцию по умолчанию.

```js
import wait from './timer.js'

wait(100).then(() => console.log('time is over!'))
// time is over!
// Сообщение появляется через 100 миллисекунд после вызова
```

Подсказки

- Промис создаётся конструктором new Promise(), и завершает его вызов resolve(). Та ймер setTimeout() принимает колбек так же, как fs.readFile(), и resolve() вызывается из этого колбека.
- Promise.resolve() возвращает уже завершённый промис, поэтому дождаться таймера с его помощью нельзя.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// teacher solution
export default (ms) => new Promise((resolve) => setTimeout(resolve, ms))
```

</details>

==================================================================
Испытание-12: Async и Await |+|
==================================================================
Реализуйте и экспортируйте в файле file.js асинхронную функцию exchange(), которая меняет местами содержимое двух файлов. После вызова в первом файле лежит то, что было во втором, а во втором то, что было в первом. Функция возвращает промис, который завершается после записи обоих файлов. Экспорт именованный, функция импортируется в фигурных скобках, как в примере ниже.

Файл myfile1 содержит текст content1, а файл myfile2 содержит текст content2.

```js
import { exchange } from './file.js'

await exchange('./myfile1', './myfile2')
// Теперь myfile1 содержит content2, а myfile2 содержит content1
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import fsp from 'fs/promises'

const exchange = async (path1, path2) => {
  const data1 = await fsp.readFile(path1, 'utf-8')
  const data2 = await fsp.readFile(path2, 'utf-8')
  await fsp.writeFile(path2, data1)
  await fsp.writeFile(path1, data2)
}

export { exchange }

// teacher solution
import fsp from 'fs/promises'

export const exchange = async (filepath1, filepath2) => {
  // Читаем оба файла
  const reading1 = fsp.readFile(filepath1)
  const reading2 = fsp.readFile(filepath2)
  // Делаем массив из двух промисов, превращаем его в один промис
  // резолвящийся в массив при помощи Promise.all(),
  // и деструктурируем этот зарезолвленный массив
  const [data1, data2] = await Promise.all([reading1, reading2])
  // Меняем содержимое файлов (мутируем их)
  const writing1 = fsp.writeFile(filepath1, data2)
  const writing2 = fsp.writeFile(filepath2, data1)
  await Promise.all([writing1, writing2])
  // Выполняем эти операции параллельно. Но можно
  // сделать это и последовательно:
  // await fsp.writeFile(filepath1, data2);
  // await fsp.writeFile(filepath2, data1);
}
```

</details>

==================================================================
Испытание-13: HTTP-запросы |-|
==================================================================
Реализуйте и экспортируйте по умолчанию в файле checker.js функцию, которая принимает на вход ссылку на страницу какого-то сайта, загружает содержимое этой страницы, извлекает из него ссылки и проверяет их доступность. Функция возвращает промис со списком битых ссылок.

В практике по адресу http://localhost:8080 работает сайт, на котором проверяется функция. На странице /first шесть ссылок, и три из них отвечают кодом 404.

```js
import getBadLinks from './checker.js'

const links = await getBadLinks('http://localhost:8080/first')
console.log(links)
// [
//   'http://localhost:8080/pages/products',
//   'http://localhost:8080/pages/users',
//   'http://localhost:8080/pages/reports',
// ]
```

Битыми считаются любые ссылки, возвращающие коды ответа, кроме 2xx (любых двухсотых). Axios по умолчанию считает ошибочными все коды кроме 2xx и отклоняет промис запроса. Если запрос axios.get() завершился успешно, страница отдаёт 2xx код ответа. Если промис запроса отклонён, ответа либо нет, либо это не 2xx код, и такая ссылка считается битой.

Подсказки

- Функция extractLinks(content) уже есть в файле checker.js. Она принимает HTML-код страницы строкой, то есть response.data из ответа axios.get(), и возвращает массив полных ссылок.
- Запросы к ссылкам можно запустить одновременно и дождаться всех через Promise.all(). Чтобы одна битая ссылка не отклонила весь Promise.all(), ошибку каждого запроса перехватывают на его собственном промисе и превращают в значение.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import { URL } from "url";
import axios from "axios";

const extractLinks = (content) => {
  const host = "http://localhost:8080";
  const linkRx = /href="(.+?)"/gi;
  const results = content.matchAll(linkRx);
  return Array.from(results)
    .map((r) => r[1])
    .map((rawLink) => new URL(rawLink, host).toString());
};

const getBadLinks = async (url) => {
  const response = await axios.get(url)
  const links = extractLinks(response.data)

  const checks = links.map((link) => {
    return axios
      .get(link)
      .then(() => null)
      .catch(() => link)
  })

  const results = await Promise.all(checks)
  return results.filter((link) => link !== null)
}

export default getBadLinks

// teacher solution
import { URL } from "url";
import axios from "axios";

const extractLinks = (content) => {
  const host = "http://localhost:8080";
  const linkRx = /href="(.+?)"/gi;
  const results = content.matchAll(linkRx);
  return Array.from(results)
    .map((r) => r[1])
    .map((rawLink) => new URL(rawLink, host).toString());
};

export default async (initialLink) => {
  // запрашиваем страницу по ссылке
  const response = await axios.get(initialLink);
  // извлекаем массив всех ссылок на странице
  const links = extractLinks(response.data);
  // функция, возвращающая ссылку, если запрос по ней оказался неудачным
  // при удачном запросе она возвращает null
  const request = (link) =>
    axios
      .get(link)
      .then(() => null)
      .catch(() => link);
  // Отправляем запросы ко всем ссылкам
  const promises = links.map(request);
  // Получаем массив, состоящий из битых ссылок и значений null
  const results = await Promise.all(promises);
  // отсеиваем null
  return results.filter((result) => result !== null);
};
```

</details>

==================================================================
Испытание-14: Waterfall |-|
==================================================================
В библиотеке async есть функция waterfall(), которая позволяет строить цепочки асинхронных функций без необходимости вкладывать их друг в друга. Решите это упражнение с применением этой функции.

Первым аргументом waterfall() принимает массив шагов, то есть функций, а вторым итоговый колбек. Каждый шаг последним аргументом получает колбек шага, а перед ним результаты предыдущего шага. Шаг вызывает колбек шага с ошибкой первым аргументом и своими результатами следом, и эти результаты получает следующий шаг. Если шаг передал ошибку, остальные шаги не запускаются и ошибка уходит в итоговый колбек. После последнего шага итоговый колбек получает null и результаты последнего шага.

```js
import async from 'async'

const { waterfall } = async

waterfall(
  [
    (callback) => callback(null, 2),
    (n, callback) => callback(null, n, n * 10),
    (n, m, callback) => callback(null, n + m),
  ],
  (err, result) => console.log(err, result),
)
// null 22
```

Реализуйте и экспортируйте в файле file.js функцию unionFiles(), которая асинхронно читает два файла и записывает их содержимое подряд в третий. Итоговый колбек cb функция передаёт в waterfall(), поэтому он получает ошибку любой операции или null после успешной записи. Вот её решение на вложенных колбеках.

```js
import fs from 'fs'

const unionFiles = (inputPath1, inputPath2, outputPath, cb) => {
  fs.readFile(inputPath1, 'utf-8', (error1, data1) => {
    if (error1) {
      cb(error1)
      return
    }
    fs.readFile(inputPath2, 'utf-8', (error2, data2) => {
      if (error2) {
        cb(error2)
        return
      }
      fs.writeFile(outputPath, `${data1}${data2}`, (error3) => {
        if (error3) {
          cb(error3)
          return
        }
        cb(null) // не забываем последний успешный вызов
      })
    })
  })
}
```

Подсказки

- Колбек шага и итоговый колбек cb это разные функции. Внутри шага вызывается колбек шага.
- Статья с разбором Waterfall: https://ru.hexlet.io/blog/posts/waterfall-ot-kolbekov-k-promisam

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import fs from 'fs'
import async from 'async'

const { waterfall } = async

const unionFiles = (inputPath1, inputPath2, outputPath, cb) => {
  waterfall(
    [
      (callback) => fs.readFile(inputPath1, 'utf-8', callback),
      (data1, callback) => {
        fs.readFile(inputPath2, 'utf-8', (error, data2) => {
          if (error) {
            callback(error)
            return
          }
          callback(null, data1, data2)
        })
      },
      (data1, data2, callback) =>
        fs.writeFile(outputPath, `${data1}${data2}`, callback),
    ],
    cb,
  )
}

export { unionFiles }

// teacher solution
import fs from 'fs'
import async from 'async'

const { waterfall } = async

export const unionFiles = (inputPath1, inputPath2, outputPath, cb) => {
  waterfall(
    [
      (callback) => fs.readFile(inputPath1, 'utf-8', callback),
      (data1, callback) =>
        fs.readFile(inputPath2, 'utf-8', (err, data2) =>
          callback(err, data1, data2),
        ),
      (data1, data2, callback) =>
        fs.writeFile(outputPath, `${data1}${data2}`, 'utf-8', callback),
    ],
    cb,
  )
}
```

</details>

==================================================================
Испытание-15: Промисы: thenable и static |-|
==================================================================
В данном испытании вы реализуете собственную версию объекта Promise.

Реализуйте в классе CustomPromise из файла CustomPromise.js конструктор, принимающий колбек executor(resolve, reject), методы then(onFulfill, onReject) и catch(onReject), и статические методы resolve(data) и reject(data). Добавьте в конструктор проверку типа параметра. Если конструктор получает не функцию, он выбрасывает TypeError с сообщением из подготовленной константы errorMessage. Обработчики по умолчанию тоже добавьте самостоятельно, чтобы все проверки остались внутри объекта. Вызов then() без аргументов передаёт значение дальше по цепочке, а catch() без аргумента передаёт дальше ошибку.

Алгоритм
Промис завершается один раз, поэтому вызовы resolve() и reject() после первого из них игнорируются. Обработчики из then() вызываются асинхронно, даже если промис уже завершён.

При разрешении промиса добавляется ещё одна проверка, на thenable. Так называют объект с собственным методом then(). Когда resolve() получает такой объект, промис вызывает его then() со своими resolve и reject и завершается тем, что тот передаст. Если then() объекта выбрасывает ошибку до вызова resolve, промис отклоняется этой ошибкой. Объект, у которого поле then не функция, считается обычным значением.

В решении должны отсутствовать встроенные Promise и ключевое слово async. Только таймеры и вызовы функций из функций.

Примеры использования

```js
import CustomPromise from './CustomPromise.js'

// Статические методы
const resolvedPromise = CustomPromise.resolve('Hello, world!')
resolvedPromise.then(console.log) // 'Hello, world!'

const rejectedPromise = CustomPromise.reject('Goodbye, world!')
rejectedPromise
  .then(console.log) // обработчик пропускается
  .catch(console.error) // 'Goodbye, world!'

// Thenable-объект
const thenable = { then: (onFulfill) => onFulfill('Hello, thenable!') }
CustomPromise.resolve(thenable).then(console.log) // 'Hello, thenable!'

// Методы экземпляра класса
const promise = new CustomPromise((resolve) => resolve('Hello, world!'))
promise
  .then((value) => {
    console.log(value) // 'Hello, world!'
    throw new Error('Goodbye, world!')
  })
  .catch((err) => console.error(err)) // 'Error: Goodbye, world!'
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const errorMessage = 'Executor must be a function'

export default class CustomPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError(errorMessage)
    }

    this.state = 'pending'
    this.value = undefined
    this.handlers = []

    // после первого вызова resolve/reject остальные игнорируются
    let called = false

    const resolve = (data) => {
      if (called) return
      called = true
      this.resolveWith(data)
    }

    const reject = (reason) => {
      if (called) return
      called = true
      this.finish('rejected', reason)
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  // завершаем промис и запускаем обработчики асинхронно
  finish(state, value) {
    this.state = state
    this.value = value
    this.handlers.forEach(handler => setTimeout(handler, 0))
  }

  // проверка на thenable
  resolveWith(data) {
    let used = false
    try {
      const then = data && data.then
      if (typeof then === 'function') {
        then.call(
          data,
          (value) => {
            if (used) return
            used = true
            this.resolveWith(value)
          },
          (reason) => {
            if (used) return
            used = true
            this.finish('rejected', reason)
          },
        )
        return
      }
    } catch (err) {
      if (!used) this.finish('rejected', err)
      return
    }
    this.finish('fulfilled', data)
  }

  then(onFulfill = value => value, onReject = (reason) => { throw reason }) {
    return new CustomPromise((resolve, reject) => {
      const handler = () => {
        const callback = this.state === 'fulfilled' ? onFulfill : onReject
        try {
          resolve(callback(this.value))
        } catch (err) {
          reject(err)
        }
      }

      if (this.state === 'pending') {
        this.handlers.push(handler)
      } else {
        setTimeout(handler, 0)
      }
    })
  }

  catch(onReject) {
    return this.then(undefined, onReject)
  }

  static resolve(data) {
    return new CustomPromise(resolve => resolve(data))
  }

  static reject(data) {
    return new CustomPromise((resolve, reject) => reject(data))
  }
}

// teacher solution
const errorMessage = 'Executor must be a function'

class CustomPromise {

  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError(errorMessage)
    }

    this.states = {
      pending: 'pending',
      fulfilled: 'fulfilled',
      rejected: 'rejected',
    }
    this.PromiseState = this.states.pending
    this.PromiseFulfillReactions = []
    this.PromiseRejectReactions = []
    this.PromiseResult = null

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    }
    catch (err) {
      this.reject(err)
    }
  }

  static reject(value) {
    return new CustomPromise((_, reject) => reject(value))
  }

  static resolve(value) {
    return new CustomPromise(resolve => resolve(value))
  }

  isThenable(value) {
    return value
      && Object.hasOwn(value, 'then')
      && typeof value.then === 'function'
  }

  reject(error) {
    if (this.PromiseState !== this.states.pending) {
      return
    }
    this.PromiseState = this.states.rejected
    this.PromiseResult = error
    this.PromiseRejectReactions.forEach(onRejected => onRejected(error))
  }

  resolve(result) {
    if (this.PromiseState !== this.states.pending) {
      return
    }

    if (this.isThenable(result)) {
      result.then(this.resolve.bind(this), this.reject.bind(this))
      return
    }

    this.PromiseState = this.states.fulfilled
    this.PromiseResult = result
    this.PromiseFulfillReactions.forEach(onFulfilled => onFulfilled(result))
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      let onFulfilledHandler = onFulfilled
      let onRejectedHandler = onRejected
      if (typeof onFulfilledHandler !== 'function') {
        onFulfilledHandler = arg => arg
      }
      if (typeof onRejectedHandler !== 'function') {
        onRejectedHandler = (arg) => {
          throw arg
        }
      }

      const onFulfilledReaction = (result) => {
        try {
          resolve(onFulfilledHandler(result))
        }
        catch (e) {
          reject(e)
        }
      }

      const onRejectedReaction = (error) => {
        try {
          resolve(onRejectedHandler(error))
        }
        catch (e) {
          reject(e)
        }
      }

      if (this.PromiseState === this.states.fulfilled) {
        setTimeout(() => onFulfilledReaction(this.PromiseResult), 0)
        return
      }

      if (this.PromiseState === this.states.rejected) {
        setTimeout(() => onRejectedReaction(this.PromiseResult), 0)
        return
      }

      this.PromiseFulfillReactions.push(onFulfilledReaction)
      this.PromiseRejectReactions.push(onRejectedReaction)
    })
  }
}

export default CustomPromise

```

</details>
