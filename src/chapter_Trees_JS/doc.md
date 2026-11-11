## Испытание-1: Определения

src/chapter_Trees_JS/trial-1.js
В этом задании под деревом понимается любой массив элементов, которые в свою очередь могут быть также деревьями (массивами). Пример:

```bash
[
  3, // лист
  [5, 3], // узел
  [[2]] // узел
]
```

Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход дерево, и возвращает новое, элементами которого являются дети вложенных узлов (см. пример).

Примеры

```js
import removeFirstLevel from '../removeFirstLevel.js'

// Второй уровень тут: 5, 3, 4
const tree1 = [[5], 1, [3, 4]]
removeFirstLevel(tree1) // [5, 3, 4]

const tree2 = [1, 2, [3, 5], [[4, 3], 2]]
removeFirstLevel(tree2)
// [3, 5, [4, 3], 2]
```

Подсказки
flat() - возвращает новый массив, в котором все элементы вложенных подмассивов были рекурсивно "подняты" на указанный уровень. Метод вызывается на массиве, который нужно обработать, например [[1], 2].flat();
Array.isArray() - проверяет, является ли элемент массивом.

<details>
  <summary>Посмотреть решение</summary>

```js
// teacher solution
const removeFirstLevel = (tree) => {
  const nodes = tree.filter(Array.isArray)
  return nodes.flat()
}

export default removeFirstLevel
```

</details>

## Испытание-2: Виртуальная файловая система

src/chapter_Trees_JS/trial-2.js
Реализуйте и экспортируйте по умолчанию функцию, которая создает и возвращает такую файловую систему (порядок элементов важен):

```bash
# Обратите внимание на метаданные

nodejs-package # директория (метаданные: { hidden: true })
├── Makefile # файл
├── README.md # файл
├── dist # пустая директория
├── __tests__ # директория
│   └── half.test.js # файл (метаданные: { type: 'text/javascript' })
├── babel.config.js # файл (метаданные: { type: 'text/javascript' })
└── node_modules # директория (метаданные: { owner: 'root', hidden: false })
    └── @babel # директория
        └── cli # директория
            └── LICENSE # файл
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import { mkfile, mkdir } from '@hexlet/immutable-fs-trees'

const generate = () => {
  const tree = mkdir(
    'nodejs-package',
    [
      mkfile('Makefile'),
      mkfile('README.md'),
      mkdir('dist', []),
      mkdir('__tests__', [mkfile('half.test.js', { type: 'text/javascript' })]),
      mkfile('babel.config.js', { type: 'text/javascript' }),
      mkdir(
        'node_modules',
        [mkdir('@babel', [mkdir('cli', [mkfile('LICENSE')])])],
        { owner: 'root', hidden: false },
      ),
    ],
    { hidden: true },
  )

  return tree
}

export default generate
```

</details>

## Испытание-3: Манипуляции с виртуальной файловой системой

src/chapter_Trees_JS/trial-3.js
Реализуйте и экспортируйте функцию compressImages(), которая принимает на вход директорию, находит внутри нее картинки и "сжимает" их. Под сжиманием понимается уменьшение свойства size в метаданных в два раза. Функция должна вернуть новую директорию со сжатыми картинками и всеми остальными данными, которые были внутри этой директории. Проверять вложенные директории не нужно, то есть функция должна находить только те картинки, которые лежат в текущей, но не во внутренних директориях.

Картинками считаются все файлы заканчивающиеся на .jpg.

Примеры

```js
const tree = fsTrees.mkdir('my documents', [
  fsTrees.mkfile('avatar.jpg', { size: 100 }),
  fsTrees.mkfile('passport.jpg', { size: 200 }),
  fsTrees.mkfile('family.jpg', { size: 150 }),
  fsTrees.mkfile('addresses', { size: 125 }),
  fsTrees.mkdir('presentations'),
])

const newTree = compressImages(tree)
// То же самое, что и tree, но во всех картинках размер уменьшен в два раза
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const compressImages = (tree) => {
  const children = fsTrees.getChildren(tree)
  const newChildren = children.map((child) => {
    const name = fsTrees.getName(child)
    if (fsTrees.isFile(child) && name.endsWith('.jpg')) {
      const meta = fsTrees.getMeta(child)
      // Клонируем старые метаданные и уменьшаем размер в 2 раза
      const newMeta = { ..._.cloneDeep(meta), size: meta.size / 2 }
      return fsTrees.mkfile(name, newMeta)
    }

    return child
  })
  const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
  return fsTrees.mkdir(fsTrees.getName(tree), newChildren, newMeta)
}

// teacher solution
const compressImages = (node) => {
  const children = fsTrees.getChildren(node)
  const newChildren = children.map((child) => {
    const name = fsTrees.getName(child)
    if (!fsTrees.isFile(child) || !name.endsWith('.jpg')) {
      return child
    }
    const meta = fsTrees.getMeta(child)
    const newMeta = cloneDeep(meta)
    newMeta.size /= 2

    return fsTrees.mkfile(name, newMeta)
  })

  const newMeta = cloneDeep(fsTrees.getMeta(node))
  return fsTrees.mkdir(fsTrees.getName(node), newChildren, newMeta)
}
```

</details>

## Испытание-4: Обход дерева

src/chapter_Trees_JS/trial-4.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход директорию (объект-дерево), приводит имена всех файлов в этой и во всех вложенных директориях к нижнему регистру. Результат в виде обработанной директории возвращается наружу.

Примеры

```js
import * as fsTrees from '@hexlet/immutable-fs-trees'
import downcaseFileNames from './downcaseFileNames.js'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('eTc', [
    fsTrees.mkdir('NgiNx'),
    fsTrees.mkdir('CONSUL', [fsTrees.mkfile('config.json')]),
  ]),
  fsTrees.mkfile('hOsts'),
])

downcaseFileNames(tree)
// {
//   name: '/',
//   type: 'directory',
//   meta: {},
//   children: [
//     {
//       name: 'eTc',
//       type: 'directory',
//       meta: {},
//       children: [
//         {
//           name: 'NgiNx',
//           type: 'directory',
//           meta: {},
//           children: [],
//         },
//         {
//           name: 'CONSUL',
//           type: 'directory',
//           meta: {},
//           children: [{ name: 'config.json', type: 'file', meta: {} }],
//         },
//       ],
//     },
//     { name: 'hosts', type: 'file', meta: {}, },
//   ],
// }
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const downcaseFileNames = (tree) => {
  const name = fsTrees.getName(tree)
  const newName = name.toLowerCase()
  const newMeta = cloneDeep(fsTrees.getMeta(tree))

  if (fsTrees.isFile(tree)) {
    return fsTrees.mkfile(newName, newMeta)
  }

  const children = fsTrees.getChildren(tree)
  const newChildren = children.map((child) => downcaseFileNames(child))
  const newTree = fsTrees.mkdir(fsTrees.getName(tree), newChildren, newMeta)

  return newTree
}

// teacher solution
const downcaseFileNames = (node) => {
  const newMeta = cloneDeep(fsTrees.getMeta(node))
  const name = fsTrees.getName(node)
  if (fsTrees.isFile(node)) {
    return fsTrees.mkfile(name.toLowerCase(), newMeta)
  }
  const children = fsTrees.getChildren(node)
  const newChildren = children.map(downcaseFileNames)
  return fsTrees.mkdir(name, newChildren, newMeta)
}
```

</details>

## Испытание-5: Агрегация

src/chapter_Trees_JS/trial-5.js
Реализуйте и экспортируйте по умолчанию функцию, которая считает количество скрытых файлов в директории и всех поддиректориях. Скрытым файлом в Linux системах считается файл, название которого начинается с точки.

Пример

```js
import * as fsTrees from '@hexlet/immutable-fs-trees'
import getHiddenFilesCount from '../getHiddenFilesCount.js'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('.nginx.conf', { size: 800 })]),
    fsTrees.mkdir('.consul', [
      fsTrees.mkfile('.config.json', { size: 1200 }),
      fsTrees.mkfile('data', { size: 8200 }),
      fsTrees.mkfile('raft', { size: 80 }),
    ]),
  ]),
  fsTrees.mkfile('.hosts', { size: 3500 }),
  fsTrees.mkfile('resolve', { size: 1000 }),
])

getHiddenFilesCount(tree) // 3
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const getHiddenFilesCount = (node) => {
  const name = fsTrees.getName(node)
  if (fsTrees.isFile(node)) {
    return name.startsWith('.') ? 1 : 0
  }
  const children = fsTrees.getChildren(node)
  const count = children.map(getHiddenFilesCount)
  return _.sum(count)
}

export default getHiddenFilesCount

// teacher solution
const getHiddenFilesCount = (node) => {
  const name = fsTrees.getName(node)
  if (fsTrees.isFile(node)) {
    return name.startsWith('.') ? 1 : 0
  }

  const children = fsTrees.getChildren(node)
  const hiddenFilesCounts = children.map(getHiddenFilesCount)
  return sum(hiddenFilesCounts)
}

export default getHiddenFilesCount
```

</details>

## Испытание-6: Агрегация 2

src/chapter_Trees_JS/trial-6.js
Во многих операционных системах (Linux, MacOS) существует утилита du. Она умеет подсчитывать занимаемое место указанными файлами и директориями. Например, так:

```bash
tmp$ du -sh *
  0B	com.docker.vmnetd.socket
 10M	credo
4.0K	debug.mjs
  0B	filesystemui.socket
4.0K	index.php
 37M	node_modules
 88K	package-lock.json
 22M	taxdome
```

Перед тем, как делать упражнение, обязательно попробуйте поиграть с этой утилитой в терминале, посмотрите её опции через man du. Экспериментировать нужно в локально установленной операционной системе.

du.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход директорию и возвращает список вложенных узлов (директорий и файлов) в указанную директорию на один уровень, а так же место, которое они занимают. Размер файла задается в метаданных. Размер директории складывается из сумм всех размеров файлов, находящихся внутри во всех поддиректориях. Сами директории размера не имеют.

Пример

```js
import * as fsTrees from '@hexlet/immutable-fs-trees'
import du from '../du.js'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf', { size: 800 })]),
    fsTrees.mkdir('consul', [
      fsTrees.mkfile('config.json', { size: 1200 }),
      fsTrees.mkfile('data', { size: 8200 }),
      fsTrees.mkfile('raft', { size: 80 }),
    ]),
  ]),
  fsTrees.mkfile('hosts', { size: 3500 }),
  fsTrees.mkfile('resolve', { size: 1000 }),
])

du(tree)
// [
//   ['etc', 10280],
//   ['hosts', 3500],
//   ['resolve', 1000],
// ]
```

Примечания

- Обратите внимание на структуру результирующего массива. Каждый элемент — массив с двумя значениями: именем директории и размером файлов внутри.
- Результат отсортирован по размеру в обратном порядке. То есть сверху самые тяжёлые, внизу самые лёгкие.

Подсказки

- sort

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const getFilesSizeCount = (node) => {
  if (fsTrees.isFile(node)) {
    const meta = fsTrees.getMeta(node)
    return meta.size || 0
  }
  const children = fsTrees.getChildren(node)
  return _.sum(children.map(getFilesSizeCount))
}

const du = (tree) => {
  const children = fsTrees.getChildren(tree)

  const result = children.map((child) => {
    const name = fsTrees.getName(child)
    const size = getFilesSizeCount(child)

    return [name, size]
  })

  return result.sort((a, b) => b[1] - a[1])
}

export default du

// teacher solution
import { sum } from 'es-toolkit'
import * as fsTrees from '@hexlet/immutable-fs-trees'

const calculateFilesSize = (tree) => {
  if (fsTrees.isFile(tree)) {
    const meta = fsTrees.getMeta(tree)
    return meta.size
  }

  const children = fsTrees.getChildren(tree)
  const sizes = children.map(calculateFilesSize)
  return sum(sizes)
}

const du = (tree) => {
  const children = fsTrees.getChildren(tree)
  const result = children.map(child => [fsTrees.getName(child), calculateFilesSize(child)])
  // Destructuring
  result.sort(([, size1], [, size2]) => size2 - size1)
  return result
}

export default du
```

</details>

## Испытание-7: Аккумулятор

src/chapter_Trees_JS/trial-7.js
findFilesByName.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход файловое дерево и подстроку, а возвращает список файлов, имена которых содержат эту подстроку. Функция должна вернуть полные пути до файлов.

Примеры

```js
import * as fsTrees from '@hexlet/immutable-fs-trees'
import findFilesByName from '../findFilesByName.js'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf', { size: 800 })]),
    fsTrees.mkdir('consul', [
      fsTrees.mkfile('config.json', { size: 1200 }),
      fsTrees.mkfile('data', { size: 8200 }),
      fsTrees.mkfile('raft', { size: 80 }),
    ]),
  ]),
  fsTrees.mkfile('hosts', { size: 3500 }),
  fsTrees.mkfile('resolve', { size: 1000 }),
])

findFilesByName(tree, 'co')
// ['/etc/nginx/nginx.conf', '/etc/consul/config.json']
```

Подсказки
Для реализации этой логики вам понадобится аккумулятор, в котором будет храниться путь от корня до текущего узла. При проваливании внутрь директорий к нему добавляется имя текущей директории. В остальном логика работы идентична примеру из теории.
Переменную, содержащую внутри себя путь от корня до текущего узла, можно назвать ancestry.
Для построения путей используйте функцию path.join().
Проверку вхождения строк можно делать с помощью функции str.includes().

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import * as fsTrees from '@hexlet/immutable-fs-trees'

const findFilesByName = (tree, str) => {
  const iter = (node, currentPath) => {
    const name = fsTrees.getName(node)
    const newPath = name === '/' ? '' : `${currentPath}/${name}`

    if (fsTrees.isFile(node)) {
      if (name.includes(str)) {
        return newPath
      }
      return []
    }

    const children = fsTrees.getChildren(node)
    return children.flatMap((child) => iter(child, newPath))
  }

  return iter(tree, '')
}

export default findFilesByName

// teacher solution
import path from 'path'
import * as fsTrees from '@hexlet/immutable-fs-trees'


const findFilesByName = (tree, substr) => {
  const iter = (node, ancestry) => {
    const name = fsTrees.getName(node)
    const newAncestry = path.join(ancestry, name)
    if (fsTrees.isFile(node)) {
      return name.includes(substr) ? newAncestry : []
    }
    const children = fsTrees.getChildren(node)
    return children.flatMap(child => iter(child, newAncestry))
  }

  return iter(tree, '')
}

export default findFilesByName
```

</details>

## Испытание-8: HTML-дерево

src/chapter_Trees_JS/trial-8.js
changeClass.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход html-дерево и заменяет во всех узлах имя класса, имена классов передаются через параметры. Функция не должна мутировать исходное дерево.

Примеры

```js
import changeClass from '../changeClass.js'

const tree = {
  name: 'div',
  type: 'tag-internal',
  className: 'hexlet-community',
  children: [
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
  ],
}

const result = changeClass(tree, 'old-class', 'new-class')
// Результат:
// {
//   name: 'div',
//   type: 'tag-internal',
//   className: 'hexlet-community',
//   children: [
//     {
//       name: 'div',
//       type: 'tag-internal',
//       className: 'new-class',
//       children: [],
//     },
//     {
//       name: 'div',
//       type: 'tag-internal',
//       className: 'new-class',
//       children: [],
//     },
//   ],
// }
```

Свойство className может содержать только одно имя класса

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const changeClass = (tree, oldClass, newClass) => {
  const currentClass = tree.className === oldClass ? newClass : tree.className

  if (!tree.children) {
    return { ...tree, className: currentClass }
  }

  const updateChildren = tree.children.map((child) => {
    return changeClass(child, oldClass, newClass)
  })

  return {
    ...tree,
    className: currentClass,
    children: updateChildren,
  }
}

export default changeClass

// teacher solution
const changeClass = (tree, classNameFrom, classNameTo) => {
  const innerFunc = (node) => {
    const updatedNode = { ...node }

    if (Object.hasOwn(node, 'className')) {
      const newClassName = classNameFrom === node.className ? classNameTo : node.className
      updatedNode.className = newClassName
    }

    if (node.type === 'tag-internal') {
      const newChildren = node.children.map(innerFunc)
      updatedNode.children = newChildren
    }

    return updatedNode
  }

  return innerFunc(tree)
}

export default changeClass
```

</details>

## Испытание-9: Выравнивание (Массив)

src/chapter_Trees_JS/trial-9.js
flatten.js
Реализуйте и экспортируйте по умолчанию функцию, которая делает плоским вложенный массив.

Для решения задачи нельзя использовать готовые методы для выравнивания массивов.

Примеры

```js
const list = [1, 2, [3, 5], [[4, 3], 2]]

flatten(list) // [1, 2, 3, 5, 4, 3, 2]
```

Подсказки
Array.isArray - проверяет, является ли элемент массивом.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const flatten = (arr) => {
  const result = []
  for (let i = 0; i < arr.length; i += 1) {
    if (Array.isArray(arr[i])) {
      const flatSubArray = flatten(arr[i])
      for (let j = 0; j < flatSubArray.length; j += 1) {
        result.push(flatSubArray[j])
      }
    } else {
      result.push(arr[i])
    }
  }
  return result
}

// teacher solution
const flatten = (list) =>
  list.reduce((acc, element) => {
    const result = Array.isArray(element)
      ? [...acc, ...flatten(element)]
      : [...acc, element]
    return result
  }, [])
```

</details>

## Испытание-10: Отслеживание зависимостей

src/chapter_Trees_JS/trial-10.js
Управление зависимостями - это очень важная задача при разработке программного обеспечения. Обычно в приложениях задействовано множество сторонних компонентов, которые, в свою очередь, тоже могут полагаться на сторонние компоненты. Одной из задач менеджера зависимостей является подключение зависимостей в правильном порядке. Библиотеки, от которых зависят другие, должны подключаться раньше. Определение этой последовательности сводится к задаче сортировки графа.

sortDeps.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список зависимостей и возвращает список (массив) отсортированных узлов.

Примеры

```js
const deps1 = {
  mongo: [],
  tzinfo: ['thread_safe'],
  uglifier: ['execjs'],
  execjs: ['thread_safe', 'json'],
  redis: [],
}

console.log(sortDeps(deps1))
// => ['mongo', 'thread_safe', 'tzinfo', 'json', 'execjs', 'uglifier', 'redis'];
```

Независимые библиотеки и цепочки библиотек должны быть в порядке, соответствующему порядку элементов в графе зависимостей.

Подсказки
Об алгоритме: топологическая сортировка

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const sortDeps = (list) => {
  const visited = new Set()
  const result = []

  const visit = (node) => {
    if (visited.has(node)) return
    visited.add(node)

    if (list[node]) {
      list[node].forEach(visit)
    }
    result.push(node)
  }

  Object.keys(list).forEach(visit)

  return result
}

// teacher solution
export default (deps) => {
  const add = (acc, node) => {
    const subDeps = deps[node] || []
    const subAcc = subDeps.reduce(add, [])
    return { ...acc, ...subAcc, [node]: true }
  }
  const set = Object.keys(deps).reduce(add, {})
  return Object.keys(set)
}
```

</details>

## Испытание-11: JSON stringify

src/chapter_Trees_JS/trial-11.js
JavaScript содержит метод JSON.stringify() для приведения к строке любого значения. Он работает следующим образом:

```js
JSON.stringify('hello') // "hello" - для строковых значений добавляются кавычки
JSON.stringify(true) // true    - значение приведено к строке, но без кавычек
JSON.stringify(5) // 5

const data = { hello: 'world', is: true, nested: { count: 5 } }
JSON.stringify(data) // {"hello":"world","is":true,"nested":{"count":5}}

JSON.stringify(data, null, 2) // null, 2 - указывают на два пробела перед ключом
// ключам добавляются кавычки
// в конце каждой строчки (линии) добавляется запятая, если имеется значение ниже
// {
//   "hello": "world",
//   "is": true,
//   "nested": {
//     "count": 5
//   }
// }
```

stringify.js
Реализуйте и экспортируйте по умолчанию функцию, похожую на JSON.stringify(), но со следующими отличиями:

ключи и строковые значения должны быть без кавычек
каждая строка заканчивается самим значением, без запятой
Не используйте в своём решении саму функцию JSON.stringify().

Синтаксис:

stringify(value[, replacer[, spacesCount]])
Параметры:

- value
  - Значение, преобразуемое в строку.
- replacer, необязательный
  - Строка - отступ для ключа; Значение по умолчанию - один пробел.
- spacesCount, необязательный
  - Число - количество повторов отступа ключа. Значение по умолчанию - 1.

```js
import stringify from './stringify.js'

stringify('hello') // hello - значение приведено к строке, но не имеет кавычек
stringify(true) // true
stringify(5) // 5

const data = { hello: 'world', is: true, nested: { count: 5 } }
stringify(data) // то же самое что stringify(data, ' ', 1);
// {
// hello: world
// is: true
// nested: {
// count: 5
// }
// }

stringify(data, '|-', 2)
// Символ, переданный вторым аргументом повторяется столько раз, сколько указано третьим аргументом.
// {
// |-|-hello: world
// |-|-is: true
// |-|-nested: {
// |-|-|-|-count: 5
// |-|-}
// }
```

Подсказки

- чтобы лучше понять как работает JSON.stringify(), запускайте его с разными данными и параметрами в консоли браузера.
- проверки в тестах идут от простого к сложному:
  - проверка на примитивных типах;
  - проверка на "плоских" данных;
  - проверка на "вложенных" данных.
    -вы можете импортировать lodash и использовать в решении. Он подключен в упражнениии, но решить задачу можно и без него, поэтому не импортирован
- реализуйте функцию так же пошагово, проверяя, что изменения для сложных кейсов не сломали более простые;
  используйте метод repeat();
  Что такое JSON
  документация по JSON.stringify на MDN.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import _ from 'lodash'

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue) || currentValue === null) {
      return String(currentValue)
    }

    const currentIndent = replacer.repeat(depth * spacesCount)
    const brecketIndent = replacer.repeat((depth - 1) * spacesCount)

    const lines = Object.keys(currentValue).map((key) => {
      const val = currentValue[key]
      return `${currentIndent}${key}: ${iter(val, depth + 1)}`
    })
    return ['{', ...lines, `${brecketIndent}}`].join('\n')
  }

  return iter(value, 1)
}

export default stringify

// teacher solution
import _ from 'lodash'

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    // альтернативный вариант: (typeof currentValue !== 'object' || currentValue === null)
    if (!_.isObject(currentValue)) {
      return `${currentValue}`
    }

    const indentSize = depth * spacesCount
    const currentIndent = replacer.repeat(indentSize)
    const bracketIndent = replacer.repeat(indentSize - spacesCount)
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`)

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n')
  }

  return iter(value, 1)
}

export default stringify
```

</details>

## Испытание-12: Построение маршрута |-|

src/chapter_Trees_JS/trial-12.js
Реализуйте и экспортируйте по умолчанию функцию, которая выстраивает маршрут между городами.

Функция принимает 3 аргумента:

дерево городов
город старта
город окончания маршрута
и возвращает массив городов, выстроенный в том же порядке, в котором они находятся на пути следования по маршруту.

Примеры

```js
const tree = [
  'Moscow',
  [
    ['Smolensk'],
    ['Yaroslavl'],
    [
      'Voronezh',
      [
        ['Liski'],
        ['Boguchar'],
        ['Kursk', [['Belgorod', [['Borisovka']]], ['Kurchatov']]],
      ],
    ],
    ['Ivanovo', [['Kostroma'], ['Kineshma']]],
    ['Vladimir'],
    ['Tver', [['Klin'], ['Dubna'], ['Rzhev']]],
  ],
]

itinerary(tree, 'Dubna', 'Kostroma')
// ['Dubna', 'Tver', 'Moscow', 'Ivanovo', 'Kostroma']

itinerary(tree, 'Borisovka', 'Kurchatov')
// ['Borisovka', 'Belgorod', 'Kursk', 'Kurchatov']
```

Подсказки
Используйте функции из библиотеки es-toolkit

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const itinerary = (maps, startCity, endCity) => {
  const findePath = (node, target, currentPath = []) => {
    const [cityName, children] = node
    const newPath = [...currentPath, cityName]

    if (cityName === target) {
      return newPath
    }

    if (children) {
      for (let child of children) {
        const path = findePath(child, target, newPath)
        if (path) return path
      }
    }

    return null
  }

  const path1 = findePath(maps, startCity)
  const path2 = findePath(maps, endCity)

  let commonIndex = 0

  while (
    commonIndex < path1.length &&
    commonIndex < path2.length &&
    path1[commonIndex] === path2[commonIndex]
  ) {
    commonIndex += 1
  }

  const upPath = path1.slice(commonIndex).reverse()
  const commonAncestor = [path1[commonIndex - 1]]
  const downPath = path2.slice(commonIndex)

  return [...upPath, ...commonAncestor, ...downPath]
}

export default itinerary

// teacher solution
const makeJoints = (tree, parent) => {
  const [leaf, children] = tree

  if (!children) {
    return { [leaf]: [parent] }
  }

  const flatChildren = children.flat()
  const neighbors = [...flatChildren, parent]
    .filter(neighbor => neighbor && !Array.isArray(neighbor))
  const joints = children
    .reduce((acc, child) => ({ ...acc, ...makeJoints(child, leaf) }), {})

  return { [leaf]: neighbors, ...joints }
}

const findRoute = (start, finish, joints) => {
  const iter = (current, route) => {
    const routeToCurrent = [...route, current]

    if (current === finish) {
      return routeToCurrent
    }

    const neighbors = joints[current]
    const filtered = neighbors
      .filter(neighbor => !routeToCurrent.includes(neighbor))

    return filtered
      .reduce((acc, neighbor) => acc.concat(iter(neighbor, routeToCurrent)), [])
  }

  return iter(start, [])
}

export default (tree, start, finish) => {
  const joints = makeJoints(tree)
  return findRoute(start, finish, joints)
}
```

</details>

## Испытание-13: Трансформер

src/chapter_Trees_JS/trial-13.js
Перед прохождением данного испытания рекомендуется пройти и проанализировать решение учителя в испытании "Построение маршрута".

transformer.js
Реализуйте и экспортируйте по умолчанию функцию, которая строит дерево относительно заданного корневого узла.

Функция принимает 2 аргумента:

исходное дерево
узел, от которого будет построено новое дерево.
Функция должна возвращать новое дерево с сохранёнными связями между узлами, в котором переданный узел является корневым.

Примеры

```js
const tree = [
  'A',
  [
    //     A
    [
      'B',
      [
        //    / \
        ['D'], //   B   C
      ],
    ], //  /   / \
    [
      'C',
      [
        // D   E   F
        ['E'],
        ['F'],
      ],
    ],
  ],
]

transform(tree, 'B')

// ['B', [           //   B
//   ['D'],          //  / \
//   ['A', [         // D   A
//     ['C', [       //      \
//       ['E'],      //       C
//       ['F'],      //      / \
//     ]],           //     E   F
//   ]],
// ]];
```

Подсказки
Другие примеры можно посмотреть в файле с тестами
Используйте функции из библиотеки es-toolkit
Работа с иерархическими структурами данных

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const makeJoints = (tree, parent) => {
  const [leaf, children] = tree

  if (!children) {
    return { [leaf]: [parent] }
  }

  const flatChildren = children.flat()
  const neighbors = [...flatChildren, parent].filter(
    (neighbor) => neighbor && !Array.isArray(neighbor),
  )

  const joints = children.reduce(
    (acc, child) => ({ ...acc, ...makeJoints(child, leaf) }),
    {},
  )

  return { [leaf]: neighbors, ...joints }
}

const transformer = (tree, node) => {
  const joints = makeJoints(tree)

  const buildTree = (current, parent) => {
    const neighbors = joints[current]

    const childrenNames = neighbors.filter((neighbor) => neighbor !== parent)

    if (childrenNames.length === 0) {
      return [current]
    }

    const childrenTree = childrenNames.map((child) => buildTree(child, current))

    return [current, childrenTree]
  }

  return buildTree(node)
}

export default transformer

// teacher solution
const makeJoints = (tree, parent) => {
  const [leaf, children] = tree

  if (!children) {
    return { [leaf]: [parent] }
  }

  const flatChildren = children.flat()
  const neighbors = [...flatChildren, parent]
    .filter(n => n && !Array.isArray(n))

  return {
    [leaf]: neighbors,
    ...children.reduce((acc, c) => ({ ...acc, ...makeJoints(c, leaf) }), {}),
  }
}

const buildTreeFromLeaf = (joints, leaf) => {
  const iter = (current, acc) => {
    const checked = [...acc, current]
    const neighbors = joints[current]
      .filter(n => !checked.includes(n))
      .map(n => iter(n, checked))
    return neighbors.length === 0 ? [current] : [current, neighbors]
  }

  return iter(leaf, [])
}

export default (tree, leaf) => {
  const joints = makeJoints(tree)
  return buildTreeFromLeaf(joints, leaf)
}
```

</details>

## Испытание-14: Пазл

src/chapter_Trees_JS/trial-14.js
Перед прохождением данного испытания рекомендуется пройти задание "Трансформер".

puzzle.js
Реализуйте и экспортируйте по умолчанию функцию, которая объединяет отдельные ветки в одно дерево. Каждая из веток в свою очередь является также деревом.

Функция может принимать на вход неограниченное количество веток и соединяет их. Корневым узлом объединённого дерева является корневой узел первой переданной ветки.

Примеры

```bash
const branch1 = ['A', [ //   A
  ['B', [               //   |
    ['C'],              //   B
    ['D'],              //  / \
  ]],                   // C   D
]];

const branch2 = ['B', [ //   B
  ['D', [               //   |
    ['E'],              //   D
    ['F'],              //  / \
  ]],                   // E   F
]];

const branch3 = ['I', [ //   I
  ['A', [               //   |
    ['B', [             //   A
      ['C'],            //   |
      ['H'],            //   B
    ]],                 //  / \
  ]],                   // C   H
]];

combine(branch1, branch2, branch3);

// ['A', [      //     A
//   ['B', [    //    / \
//     ['C'],   //   B   I
//     ['D', [  //  /|\
//       ['E'], // C D H
//       ['F'], //  / \
//     ]],      // E   F
//     ['H'],
//   ]],
//   ['I'],
// ]];
```

Подсказки
Другие примеры можно посмотреть в файле с тестами
Используйте функции из библиотеки es-toolkit
Работа с иерархическими структурами данных

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const makeJoint = (tree, parent) => {
  const [leaf, children] = tree

  if (!children) {
    return { [leaf]: [parent] }
  }

  const flatChildren = children.flat()
  const neighbors = [...flatChildren, parent].filter(
    (neighbor) => neighbor && !Array.isArray(neighbor),
  )

  return {
    [leaf]: neighbors,
    ...children.reduce((acc, c) => ({ ...acc, ...makeJoint(c, leaf) }), {}),
  }
}

const buildTree = (joints, current, parent = null) => {
  const neighbors = joints[current] || []
  const childrenNames = neighbors.filter((n) => n !== parent)

  if (childrenNames.length === 0) {
    return [current]
  }

  const childrenTree = childrenNames.map((child) =>
    buildTree(joints, child, current),
  )

  return [current, childrenTree]
}

const puzzle = (...branches) => {
  const [firstBranch] = branches
  const [rootName] = firstBranch

  const allGraph = branches.map((branch) => makeJoint(branch))

  const commonGraph = {}

  for (const graph of allGraph) {
    for (const [node, neighbors] of Object.entries(graph)) {
      if (!commonGraph[node]) {
        commonGraph[node] = []
      }

      const uniqueNeighbors = new Set([...commonGraph[node], ...neighbors])
      commonGraph[node] = Array.from(uniqueNeighbors)
    }
  }

  return buildTree(commonGraph, rootName)
}

export default puzzle

// teacher solution
import { union } from 'es-toolkit'
import { mergeWith } from 'es-toolkit/compat'

// BEGIN
const makeJoints = (tree, parent) => {
  const [leaf, children] = tree

  if (!children) {
    return { [leaf]: [parent] }
  }

  const flatChildren = children.flat()
  const neighbors = [...flatChildren, parent]
    .filter(n => n && !Array.isArray(n))

  return {
    [leaf]: neighbors,
    ...children.reduce((acc, c) => ({ ...acc, ...makeJoints(c, leaf) }), {}),
  }
}

const buildTreeFromLeaf = (joints, leaf) => {
  const iter = (current, acc) => {
    const checked = [...acc, current]
    const neighbors = joints[current]
      .filter(n => !checked.includes(n))
      .map(n => iter(n, checked))
    return neighbors.length === 0 ? [current] : [current, neighbors]
  }

  return iter(leaf, [])
}

export default (...branches) => {
  const [first] = branches
  const [root] = first

  const joints = branches.reduce((acc, branch) => {
    const jointsFromBranch = makeJoints(branch)
    return mergeWith(acc, jointsFromBranch, (a, b) => union(a ?? [], b ?? []))
  }, {})

  return buildTreeFromLeaf(joints, root)
}
```

</details>

## Испытание-15: Массив как объект

src/chapter_Trees_JS/trial-15.js
convert.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив определённой структуры и возвращает объект, полученный из этого массива.

Массив устроен таким образом, что с помощью него можно представлять ассоциативные массивы. Каждое значение внутри него — это массив из двух элементов, где первый элемент — ключ, а второй — значение. В свою очередь, если значение тоже является массивом, то считается, что это вложенное представление ассоциативного массива. Другими словами, любой массив внутри исходного массива всегда рассматривается как данные, которые нужно конвертировать в объект.

```js
convert([]) // {}
convert([['key', 'value']]) // { key: 'value' }
convert([
  ['key', 'value'],
  ['key2', 'value2'],
]) // { key: 'value', key2: 'value2' }

convert([
  ['key', [['key2', 'anotherValue']]],
  ['key2', 'value2'],
])
// { key: { key2: 'anotherValue' }, key2: 'value2' }
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const convert = (coll) => {
  if (!Array.isArray(coll)) {
    return coll
  }

  return coll.reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? convert(value) : value
    return acc
  }, {})
}

export default convert

// teacher solution
const convert = tree => tree.reduce((acc, node) => {
  const [key, value] = node
  const newValue = Array.isArray(value) ? convert(value) : value
  return { ...acc, [key]: newValue }
}, {})

export default convert
```

</details>

## Испытание-16: Отображение, фильтрация, свёртка

src/chapter_Trees_JS/trial-16.js
В курсе JS: Функции мы проходили три основные функции высшего порядка по работе с коллекциями: map, filter и reduce. С помощью них можно решать практически любые задачи.

solution.js
В этом испытании вам предстоит написать собственную реализацию этих функций, только работать они будут с файловыми деревьями.

map принимает на вход функцию-обработчик и дерево, а возвращает отображенное дерево.

filter принимает в качестве параметров предикат и дерево, а возвращает отфильтрованное дерево по предикату.

reduce кроме основных параметров (функция-обработчик и дерево) принимает также начальное значение аккумулятора.

Все функции необходимо экспортировать.

Примеры

```js
import * as fsTrees from '@hexlet/immutable-fs-trees';

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('eTc', [
    fsTrees.mkfile('config.json')
  ]),
]);

Приводим имена всех директорий и файлов к верхнему регистру:

const result = map(n => ({ ...n, name: fsTrees.getName(n).toUpperCase() }), tree);
// {
//   name: '/',
//   type: 'directory',
//   meta: {},
//   children: [
//     {
//       name: 'ETC',
//       type: 'directory',
//       meta: {},
//       children: [{ name: 'CONFIG.JSON', type: 'file', meta: {} }],
//     },
//   ],
// }

Отфильтровываем директории:

const filtered = filter((n) => fsTrees.isDirectory(n), tree);
// {
//   name: '/',
//   type: 'directory',
//   meta: {},
//   children: [
//     {
//       name: 'etc',
//       type: 'directory',
//       meta: {},
//       children: [],
//     },
//   ],
// }

Подсчитываем количество узлов в дереве:

const result = reduce((acc, n) => acc + 1, tree, 0); // 3
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import * as fsTrees from '@hexlet/immutable-fs-trees'

export const map = (f, tree) => {
  const updateNode = f(tree)

  if (updateNode.type === 'file') {
    return updateNode
  }

  const { children } = updateNode

  const updateChildren = []

  for (const child of children) {
    const updateChild = map(f, child)
    updateChildren.push(updateChild)
  }

  return { ...updateNode, children: updateChildren }
}

export const filter = (f, tree) => {
  if (!f(tree)) {
    return null
  }

  if (tree.type === 'file') {
    return tree
  }

  const { children } = tree

  const filteredChildren = []

  for (const child of children) {
    const filteredChild = filter(f, child)

    if (filteredChild !== null) {
      filteredChildren.push(filteredChild)
    }
  }

  return { ...tree, children: filteredChildren }
}

export const reduce = (f, tree, acc) => {
  let newAcc = f(acc, tree)

  if (tree.type === 'file') {
    return newAcc
  }

  const { children } = tree

  for (const child of children) {
    newAcc = reduce(f, child, newAcc)
  }

  return newAcc
}

// teacher solution
import * as fsTrees from '@hexlet/immutable-fs-trees'
import { cloneDeep } from 'es-toolkit'

export const map = (f, node) => {
  const nodeClone = cloneDeep(node)
  const updatedNode = f(nodeClone)
  if (!fsTrees.isDirectory(nodeClone)) {
    return updatedNode
  }

  const name = fsTrees.getName(updatedNode)
  const children = fsTrees.getChildren(updatedNode)
  const processedChildren = children.map((child) => map(f, child))

  return fsTrees.mkdir(name, processedChildren)
}

export const filter = (f, node) => {
  const nodeClone = cloneDeep(node)
  if (!f(node)) {
    return null
  }
  if (!fsTrees.isDirectory(node)) {
    return nodeClone
  }

  const name = fsTrees.getName(nodeClone)
  const children = fsTrees.getChildren(nodeClone)
  const processedChildren = children.map((n) => filter(f, n)).filter((v) => v)

  return fsTrees.mkdir(name, processedChildren)
}

export const reduce = (f, node, acc) => {
  const nodeClone = cloneDeep(node)
  const newAcc = f(acc, nodeClone)
  if (fsTrees.isFile(node)) {
    return newAcc
  }

  const children = fsTrees.getChildren(nodeClone)
  return children.reduce((iAcc, child) => reduce(f, child, iAcc), newAcc)
}
```

</details>
