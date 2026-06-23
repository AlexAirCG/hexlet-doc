ГЛАВА: JS: ДЕРЕВЬЯ ======================================================================

ТЕОРИЯ: ВВЕДЕНИЕ ==============================================

Дерево — одна из самых распространённых структур данных в информатике и естественный способ моделирования некоторых предметных областей. С деревьями (как структурой данных) встречаются так или иначе все люди, даже те, кто далёк не только от программирования, но и от компьютеров в целом. Самым очевидным примером служит генеалогическое древо, а из более специализированного — файловое дерево. HTML (как и JSON, XML и многие другие) также имеет древовидную структуру. Комментарии и каталоги продуктов на сайтах тоже бывают древовидными. Любая иерархия является деревом по определению.

С деревьями связан один очень интересный аспект. Уровень понимания темы деревьев и способность с ними работать невероятно сильно коррелирует с уровнем разработчика. Если разработчику легко работать с деревьями, то, как правило, он довольно хорошо разбирается в коде, в том числе чужом, если нет, то и, в целом, у него больше сложностей с написанием и анализом кода.

В этом курсе нет нового синтаксиса и каких-то элементов программирования, которые не изучались на Хекслете до этого курса. Однако тема деревьев сложнее остальных тем из-за рекурсивной природы самих деревьев. Нужно "повернуть" мозги в правильную сторону и это, пожалуй, самая тяжёлая часть, которую невозможно "прокачать", читая теорию. В этом поможет только практика и эксперименты.

Для упрощения процесса понимания и запоминания рекомендации такие же как и раньше:

- Обязательно повторяйте весь код, который даётся в теории, локально на своём компьютере.
- Используйте отладочную печать настолько, насколько можно. Выводите на экран все изменения данных во время работы кода.
- Повторите уроки из курса «JS: Функции» про рекурсию.

В этом небольшом курсе мы слегка погрузимся в тему деревьев и научимся с ними работать. Чего не будет в этом курсе, так это алгоритмов в том виде, в котором эта тема подаётся в университете. У данного курса совсем другие цели. Он учит работать с рекурсивными структурами данных через древовидную рекурсию.

ТЕОРИЯ: ОПРЕДЕЛЕНИЯ ================================================

Файловая структура – пример дерева, с которым знакомы все, кто пользуется компьютером. Она состоит из директорий и разного вида файлов.

```bash
nodejs-package # корневая директория
├── Makefile # файл
├── README.md # файл
├── __tests__ # директория
│   └── half.test.js # файл
├── babel.config.js # файл
└── node_modules # директория
   └── @babel # директория
       └── cli # директория
           └── LICENSE # файл
```

Деревом она называется из-за своей структуры. Все элементы файловой системы выстраиваются в иерархию. В ней на верхнем уровне находится корневая директория (или диск, если речь идёт про Windows), а далее — файлы и директории, которые сами по себе могут содержать файлы и директории.

Ключевая черта древовидной структуры в том, что она рекурсивна. Другими словами, дерево состоит из поддеревьев состоящих в свою очередь из поддеревьев, которые состоят из поддеревьев... Эта особенность определяет основные способы работы с деревьями в коде, все они, так или иначе, работают рекурсивно.

Дерево состоит из узлов (вершин или нод, так как по-английски узел — это node) и рёбер между ними. Рёбра в реальности не существуют, они нужны лишь для того, чтобы визуализировать связь и, по необходимости, описать её. Узлы делятся на два типа: внутренние (те, у которых есть потомки) и листовые узлы (те, у которых нет потомков). В случае файловой системы листовые узлы представлены файлами, а внутренние — директориями.

У каждой вершины в дереве есть родитель (или предок). Единственным исключением является корневой узел — у него нет родителей, и именно с него начинается дерево. Количество потомков у любой внутренней вершины, в общем случае, может быть любым. Кроме того, в деревьях выделяют понятие глубины (depth), определяющей то, сколько шагов нужно пройти по вершинам от корневой, чтобы достичь текущей (той, на которую смотрим). Вершины, находящиеся на одной глубине и имеющие общего родителя, называют братскими или сестринскими.

РЕАЛИЗАЦИЯ

Количество способов, которыми можно описать деревья, бесконечно. Самый примитивный вариант — это вложенные массивы:

```bash
[['index.html', 'main.js'], 'index.js', ['favicon.ico', 'app.css']];
//                    * корень – сам массив
//         /          |         \
//       *         index.js       *
//  /         |               |        \
// index.html main.js   favicon.ico app.css

// Ещё пара примеров деревьев с произвольными данными:
[]; // пустое дерево
[3, 2, [3, 8], [[8], 3]];
[1, null, [[3]], [5, 'string', [undefined, [3], { key: 'value' }]]]
```

В примерах выше корень — это сам массив, а все его элементы — это дети. Если ребёнок не является массивом, то он рассматривается как листовой узел, иначе — как внутренний узел. Внутренний узел, в свою очередь, состоит из детей.

Любое дерево состоит из двух больших частей:

1. Данных, которые хранятся внутри дерева
2. Структуры дерева, которая отвечает за связи между данными

```bash
[['index.html', 'main.js'], 'index.js', ['favicon.ico', 'app.css']]
```

Что в этом дереве структура, а что данные? Данные здесь – листовые узлы, а вот внутренние массивы – исключительно структура. Они определяют, где какие данные (в данном случае файлы) находятся, но сами не содержат никаких данных. Подобная организация дерева непригодна для хранения файловой структуры. Как минимум это дерево не позволяет задать имя для директории.

Расширим структуру так, чтобы она позволяла добавлять больше информации. Представим каждый элемент дерева массивом, в котором первый элемент — это значение, хранящееся в узле, а второй элемент — массив детей. Если второй элемент отсутствует, то считаем, что текущий узел — листовой.

```bash
['app', [ // Корень
  ['dist', [ // Внутренний узел
    ['index.html'], // Лист
    ['main.js'], // Лист
  ]],
  ['index.js'], // Лист
  ['assets', [ // Внутренний узел
    ['favicon.ico'], // Лист
    ['app.css'], // Лист
  ]],
]]

//                   app
//         /          |         \
//       dist      index.js   assets
//  /         |               |        \
// index.html main.js   favicon.ico app.css
```

Такой вариант многословнее, но позволяет хранить данные в любом узле, даже не листовом. Причём это не обязательно должна быть строка как в примере выше. Изменение данных на объекты позволит добавлять туда все что угодно.

И самый гибкий и удобный способ представления деревьев — это объекты. В таком дереве каждый узел это объект, а массивы используются только для хранения списка детей.

```js
// Обратите внимание на разделение структуры и данных
// Здесь оно значительно более очевидное
{
  value: 5,
  children: [
    { value: 10 },
    { value: 100 },
    { value: 'nested', children: [/* ... */] }
  ]
}
```

По большому счёту, что массив, что объект сами по себе всегда могут рассматриваться как деревья. Это справедливо для любой рекурсивной структуры данных, то есть для такой структуры, элементами которой может быть сама структура. В любом массиве может содержаться массив, как и в любом объекте может содержаться объект.

Испытание-1: ОПРЕДЕЛЕНИЯ ==============================================

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

ТЕОРИЯ: ВИРТУАЛЬНАЯ ФАЙЛОВАЯ СИСТЕМА ================================================

В этом курсе мы создадим виртуальную (не настоящую) файловую систему и реализуем повседневные операции для работы с ней: подсчет свободного места, поиск файлов и директорий и другие. Эта файловая система не имеет практического применения, на ней мы будем обкатывать навыки работы с древовидными структурами данных. Обработка любых деревьев в сущности не отличается. Файловая система, каталоги товаров, адреса, родственные связи и многое другое — все эти данные можно представить в виде дерева. Подход в работе с каждым типом будет один и тот же. Научившись работать с одним деревом, вы сможете применять эти же знания в работе с другими деревьями.

Вот как выглядит создание дерева виртуальной файловой системы:

```js
import * as fsTrees from '@hexlet/immutable-fs-trees'

// mkdir вторым параметром принимает список детей,
// которые могут быть либо директориями, созданными mkdir,
// либо файлами, созданными mkfile
const tree = fsTrees.mkdir('etc', [
  fsTrees.mkfile('bashrc'),
  fsTrees.mkdir('consul', [fsTrees.mkfile('config.json')]),
])
```

Первым параметром в функции mkdir() и mkfile() передается имя создаваемой директории или файла. Вторым параметром функция mkdir() принимает список вложенных в нее файлов и директорий. Последним параметром обе функции принимают метаданные meta, о которых мы поговорим чуть позже.

В результате получается такая структура:

```bash
etc
├── bashrc
└── consul
    └── config.json
```

Вкладывая вызовы mkdir и mkfile в другие mkdir, можно получить любую файловую структуру. Корнем в этой структуре будет директория, а в листьях могут оказаться как файлы, так и пустые директории.

Эта структура виртуальная, то есть реального создания файлов и директорий не происходит. Вся информация о файловой системе находится в переменной tree. Если ее распечатать на экран, то мы увидим следующее содержимое:

```js
{
  name: 'etc',
  type: 'directory',
  meta: {},
  children: [
    {
      name: 'bashrc',
      type: 'file',
      meta: {},
    },
    {
      name: 'consul',
      type: 'directory',
      meta: {},
      children: [
        {
          name: 'config.json',
          type: 'file',
          meta: {},
        }
      ],
    },
  ],
};
```

Это внутренняя реализация файлового дерева. Она состоит из двух типов узлов: директорий и файлов.

Представление директории:

```js
{
  name: /* ... */,
  type: 'directory',
  meta: {}, // Свойства директории
  children: [/* ... */], // Здесь хранятся дети
}
```

Представление файла:

```js
{
  name: /* ... */,
  type: 'file',
  meta: {}, // Свойства файла
}
```

У файлов и директорий есть имена, это общая часть. Свойство type определяет тип узла и с его помощью можно понять, что перед нами во время обработки этого дерева. meta — объект с произвольными данными, например, размером, датой создания и так далее. Свойства задаются во время создания узлов:

```js
fsTrees.mkfile('.bashrc', { size: 75 })
fsTrees.mkdir(
  'hexlet',
  [
    /* дети */
  ],
  { owner: 'nobody' },
)
```

Метаданные понадобятся функциям, которые анализируют дерево, например считают занятое место.

Испытание-2: ВИРТУАЛЬНАЯ ФАЙЛОВАЯ СИСТЕМА

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

ТЕОРИЯ: МАНИПУЛЯЦИИ С ВИРТУАЛЬНОЙ ФАЙЛОВОЙ СИСТЕМОЙ ======================================

Библиотека, которая используется для построения деревьев, рассчитана только на неизменяемые файловые структуры. То есть уже после создания её поменять нельзя. Но можно на основе старой структуры сделать новую, в которой какие-то части будут изменены.

Неизменяемая структура выбрана для этого курса неслучайно. Такую структуру легче отлаживать и меньше шансов допустить ошибки. И она позволяет максимально погрузиться в использование функций высшего порядка.

Пакет @hexlet/immutable-fs-trees позволяет не только создавать, но и извлекать данные из уже созданных файлов и директорий с помощью базовых операций. Они позволяют не лезть во внутреннюю структуру самого дерева:

```js
import * as fsTrees from '@hexlet/immutable-fs-trees'

const tree = fsTrees.mkdir('/', [fsTrees.mkfile('hexlet.log')], {
  hidden: true,
})
fsTrees.getName(tree) // '/'
fsTrees.getMeta(tree).hidden // true

const [file] = fsTrees.getChildren(tree)
fsTrees.getName(file) // 'hexlet.log'

// У файла нет метаданных
fsTrees.getMeta(file).unknown // undefined

// А вот так делать не надо
// У файлов нет детей
fsTrees.getChildren(file)
```

Дополнительно в пакете есть две функции для проверки типа. С их помощью можно выборочно работать с файлами и директориями:

```js
import * as fsTrees from '@hexlet/immutable-fs-trees'

const tree = fsTrees.mkdir('/', [fsTrees.mkfile('hexlet.log')], {
  hidden: true,
})
fsTrees.isDirectory(tree) // true
fsTrees.isFile(tree) // false

const [file] = fsTrees.getChildren(tree)
fsTrees.isFile(file) // true
fsTrees.isDirectory(file) // false
```

Рассмотренных операций хватит для выполнения любых преобразований над файлами и директориями. Начнём с самых простых, которые не требуют рекурсивного обхода.

ОБРАБОТКА -------------------------------------------

Любая обработка в неизменяемом стиле сводится к формированию новых данных на основе старых. Ниже мы реализуем некоторые варианты преобразования, раскрывающие эту идею.

Изменение имени файла

```js
const file = fsTrees.mkfile('one', { size: 35 })

// При переименовании важно сохранить метаданные
// _ – lodash
const newMeta = _.cloneDeep(fsTrees.getMeta(file))
const newFile = fsTrees.mkfile('new name', newMeta)
```

Фактически здесь создается новый файл с метаданными старого. Перед тем как создать новый файл, метаданные клонируются (глубоким клонированием). Почему? Объекты передаются по ссылке, и если не выполнить клонирование, то в метаданных нового файла окажутся метаданные старого. Как только мы захотим изменить что-то, то изменив новое — сломаем старое:

```js
const file = fsTrees.mkfile('one', { size: 35 })

// При переименовании важно сохранить метаданные
const newMeta = fsTrees.getMeta(file)
// Бум! У file тоже поменялись метаданные
newMeta.size = 15
const newFile = fsTrees.mkfile('new name', newMeta)

console.log(fsTrees.getMeta(file)) // { size: 15 }
```

Сортировка содержимого директории

```js
// Сортировка в обратном порядке

const tree = fsTrees.mkdir('/', [
  fsTrees.mkfile('one'),
  fsTrees.mkfile('two'),
  fsTrees.mkdir('three'),
])

const children = fsTrees.getChildren(tree)
const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
// reverse изменяет массив, поэтому клонируем
const newChildren = [...children].reverse()
const tree2 = fsTrees.mkdir(fsTrees.getName(tree), newChildren, newMeta)
console.log(tree2)
// => {
// =>   name: '/',
// =>   children: [
// =>     { name: 'three', children: [], meta: {}, type: 'directory' },
// =>     { name: 'two', meta: {}, type: 'file' },
// =>     { name: 'one', meta: {}, type: 'file' }
// =>   ],
// =>   meta: {},
// =>   type: 'directory'
// => }
```

Обновление содержимого директории

```js
// Приведение к нижнему регистру имён директорий и файлов
// внутри конкретной директории

const tree = fsTrees.mkdir('/', [
  fsTrees.mkfile('oNe'),
  fsTrees.mkfile('Two'),
  fsTrees.mkdir('THREE'),
])

const children = fsTrees.getChildren(tree)
const newChildren = children.map((child) => {
  const name = fsTrees.getName(child)
  const newMeta = _.cloneDeep(fsTrees.getMeta(child))
  if (fsTrees.isDirectory(child)) {
    const children = [...fsTrees.getChildren(child)]
    return fsTrees.mkdir(name.toLowerCase(), children, newMeta)
  }
  return fsTrees.mkfile(name.toLowerCase(), newMeta)
})
// Обязательно копируем метаданные
const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
const tree2 = fsTrees.mkdir(fsTrees.getName(tree), newChildren, newMeta)
console.log(tree2)
// => {
// =>   name: '/',
// =>   children: [
// =>     { name: 'one', meta: {}, type: 'file' },
// =>     { name: 'two', meta: {}, type: 'file' },
// =>     { name: 'three', children: [], meta: {}, type: 'directory' }
// =>   ],
// =>   meta: {},
// =>   type: 'directory'
// => }
```

Удаление файлов внутри директории

```js
const tree = fsTrees.mkdir('/', [
  fsTrees.mkfile('one'),
  fsTrees.mkfile('two'),
  fsTrees.mkdir('three'),
])

const children = fsTrees.getChildren(tree)
const newChildren = children.filter(fsTrees.isDirectory)
const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
const tree2 = fsTrees.mkdir(fsTrees.getName(tree), newChildren, newMeta)
console.log(tree2)
// => {
// =>   name: '/',
// =>   children: [ { name: 'three', children: [], meta: {}, type: 'directory' } ],
// =>   meta: {},
// =>   type: 'directory'
// => }
```

Испытание-3: МАНИПУЛЯЦИИ С ВИРТУАЛЬНОЙ ФАЙЛОВОЙ СИСТЕМОЙ
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

ТЕОРИЯ: ОБХОД ДЕРЕВА ================================================

Пошаговый перебор элементов дерева по связям между узлами-предками и узлами-потомками называется обходом дерева. Подразумевается, что в процессе обхода каждый узел будет затронут только один раз. По большому счёту, всё так же, как и в обходе любой коллекции, используя цикл или рекурсию. Только в случае деревьев способов обхода больше, чем просто слева направо и справа налево.

В данном курсе используется один порядок обхода — обход в глубину, так как он естественным образом получается при рекурсивном обходе. Об остальных способах можно прочитать в Википедии либо в рекомендуемых Хекслетом книгах.

ОБХОД В ГЛУБИНУ (depth-first search) ----------------------------------

Один из методов обхода дерева (графа в общем случае). Стратегия этого поиска состоит в том, чтобы идти вглубь одного поддерева настолько, насколько это возможно. Этот алгоритм естественным образом ложится на рекурсивное решение и получается сам собой.

<img src="image.png" alt="alt text" width="500">

Рассмотрим данный алгоритм на примере следующего дерева:

```bash
//     * A
//   / | \
// B * C * D
//  /|   |\
// E F   G J
```

Каждая нелистовая вершина обозначена звёздочкой. Обход начинается с корневого узла.

1.  Проверяем, есть ли у вершины A дети. Если есть, то запускаем обход рекурсивно для каждого ребёнка независимо;
2.  Внутри первого рекурсивного вызова оказывается следующее поддерево:

```bash
// B *
//  /|
// E F
```

Повторяем логику первого шага. Проваливаемся на уровень ниже.

3.  Внутри оказывается листовой элемент E. Функция убеждается, что у узла нет дочерних элементов, выполняет необходимую работу и возвращает результат наверх.
4.  Снова оказываемся в ситуации:

```bash
// B *
//  /|
// E F
```

В этом месте, как мы помним, рекурсивный вызов запускался на каждом из детей. Так как первый ребёнок уже был посещен, второй рекурсивный вызов заходит в узел F и выполняет там свою работу. После этого происходит возврат выше, и всё повторяется до тех пор, пока не дойдёт до корня.

```js
const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkfile('bashrc'),
    fsTrees.mkfile('consul.cfg'),
  ]),
  fsTrees.mkfile('hexletrc'),
  fsTrees.mkdir('bin', [fsTrees.mkfile('ls'), fsTrees.mkfile('cat')]),
])

const dfs = (tree) => {
  // Распечатываем содержимое узла
  console.log(fsTrees.getName(tree))
  // Если это файл, то возвращаем управление
  if (fsTrees.isFile(tree)) {
    return
  }

  // Получаем детей
  const children = fsTrees.getChildren(tree)

  // Применяем функцию dfs ко всем дочерним элементам
  // Множество рекурсивных вызовов в рамках одного вызова функции
  // называется древовидной рекурсией
  children.forEach(dfs)
}

dfs(tree)
// => /
// => etc
// => bashrc
// => consul.cfg
// => hexletrc
// => bin
// => ls
// => cat
```

Печать на экран в примере выше это лишь демонстрация. В реальности же нас интересует либо изменение дерева, либо агрегация данных по нему. Агрегацию данных рассмотрим позже, а сейчас разберём изменение.

Допустим, мы хотим реализовать функцию, которая меняет владельца для всего дерева, то есть всех директорий и файлов. Для этого нам придётся соединить две вещи: рекурсию, разобранную выше, и код обновления узлов, который изучался в прошлом уроке.

```js
const changeOwner = (tree, owner) => {
  const name = fsTrees.getName(tree)
  const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
  newMeta.owner = owner

  if (fsTrees.isFile(tree)) {
    // Возвращаем обновлённый файл
    return fsTrees.mkfile(name, newMeta)
  }
  // Дальше идет работа, если директория

  const children = fsTrees.getChildren(tree)
  // Ключевая строчка
  // Вызываем рекурсивное обновление каждого ребёнка
  const newChildren = children.map((child) => changeOwner(child, owner))
  const newTree = fsTrees.mkdir(name, newChildren, newMeta)

  // Возвращаем обновлённую директорию
  return newTree
}

// Эту функцию можно обобщить до map (отображения), работающего с деревьями
```

Ключевое отличие от первого примера – вместо печати на экран, формируются новые узлы и возвращаются наружу. В конце концов из них собирается новое дерево.

Всё, что будет дальше делаться по ходу курса, неизменно базируется на этом алгоритме. Попробуйте открыть редактор на своём компьютере и самостоятельно реализовать эту функцию без подглядывания. Так вы убедитесь в том, что поняли происходящее.

Испытание-4: ОБХОД ДЕРЕВА

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

ТЕОРИЯ: АГРЕГАЦИЯ ======================================================

Агрегация данных — это самая важная операция при работе с деревьями. Подсчитать общее число файлов в директории, общий размер всех файлов, получить список всех файлов, найти все файлы по шаблону — всё это примеры агрегирования данных.

Ключевой момент в агрегирующих операциях — это накопление результата. Для этой задачи хорошо подходит обход дерева в глубину с использованием рекурсивного процесса, который подробно рассматривается в предыдущем уроке. С его помощью мы обходим все узлы дерева и собираем результат, начиная с самого нижнего уровня.

Рассмотрим агрегацию с использованием рекурсивного процесса на примере подсчёта общего количества узлов в дереве. То есть мы хотим узнать, сколько всего файлов и директорий содержится в нашем файловом дереве.

```js
const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkfile('bashrc'),
    fsTrees.mkfile('consul.cfg'),
  ]),
  fsTrees.mkfile('hexletrc'),
  fsTrees.mkdir('bin', [fsTrees.mkfile('ls'), fsTrees.mkfile('cat')]),
])

// В реализации используем рекурсивный процесс,
// чтобы добраться до самого дна дерева
const getNodesCount = (tree) => {
  if (fsTrees.isFile(tree)) {
    // Возвращаем `1` для учёта текущего файла
    return 1
  }

  // Если узел — директория, получаем его потомков
  const children = fsTrees.getChildren(tree)
  // Здесь начинается самая сложная часть
  // Считаем количество потомков для каждого из потомков,
  // рекурсивно вызывая нашу функцию `getNodesCount`
  const descendantCounts = children.map(getNodesCount)
  // Возвращаем `1` (текущая директория) + общее количество потомков
  return 1 + _.sum(descendantCounts)
}

getNodesCount(tree) // 8
```

Кода здесь немного, но он довольно хитрый. Есть несколько ключевых моментов:

1.  Функция проверяет тип узла. Если узел — это файл, тогда из функции возвращается единица
2.  В случае, если узел — директория, тогда получаем детей и для каждого ребёнка вновь вызываем нашу функцию. Затем повторяем алгоритм заново
3.  Вызов функции на каждом потомке возвращает свой собственный результат (количество его потомков). Эти результаты образуют массив с числами, которые нужно объединить
4.  В конце считается общее количество всех потомков узла + единица (текущий узел сам по себе)

Перед тем как двигаться дальше, с этим кодом нужно поэкспериментировать. Это единственный способ разобраться с ним.

Испытание-5: АГРЕГАЦИЯ

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

ТЕОРИЯ: АГРЕГАЦИЯ 2 =========================================================

Попрактикуемся еще с одним вариантом агрегации данных на файловых системах. Напишем функцию, которая принимает на вход директорию и возвращает список директорий первого уровня вложенности и количество файлов внутри каждой из них, включая все поддиректории

```js
const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf')]),
  ]),
  fsTrees.mkdir('consul', [
    fsTrees.mkfile('config.json'),
    fsTrees.mkfile('file.tmp'),
    fsTrees.mkdir('data'),
  ]),
  fsTrees.mkfile('hosts'),
  fsTrees.mkfile('resolve'),
])

console.log(getSubdirectoriesInfo(tree))
// => [['etc', 1], ['consul', 2]]
```

Внутри себя эта задача распадается на две:

- Реализация функции подсчёта файлов внутри директории
- Вызов данной функции для каждой из поддиректорий

Начнём с подсчёта количества файлов. Это классическая задача на агрегацию:

```js
const getFilesCount = (node) => {
  if (fsTrees.isFile(node)) {
    return 1
  }

  const children = fsTrees.getChildren(node)
  const descendantCounts = children.map(getFilesCount)
  return _.sum(descendantCounts)
}
```

Следующий шаг заключается в том, чтобы извлечь всех детей из исходного узла и к каждому из них применить подсчёт:

```js
const getSubdirectoriesInfo = (tree) => {
  const children = fsTrees.getChildren(tree)
  const result = children
    // Нас интересуют только директории
    .filter(fsTrees.isDirectory)
    // Запускаем подсчёт для каждой директории
    .map((child) => [fsTrees.getName(child), getFilesCount(child)])

  return result
}
```

То есть мы обратились к детям напрямую сначала отфильтровав их, а затем выполнили отображение на необходимый массив, содержащий для каждой директории имя и количество файлов в нем.

Испытание-6: АГРЕГАЦИЯ 2

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

ТЕОРИЯ: АККУМУЛЯТОР =========================================

В некоторых ситуациях во время обхода дерева нужна дополнительная информация, которая зависит от расположения узла. Её невозможно получить из описания самого узла, так как узел её не содержит. Эту информацию нужно собирать прямо во время обхода.

К такой информации, например, относится полный путь до файла или глубина текущего узла. Конкретный узел не знает о том, где он находится. Расположение файла в файловой структуре определяется узлами, которые ведут к конкретному файлу.

В этом уроке мы познакомимся с понятием аккумулятор, специальным параметром, который собирает нужные данные во время обхода дерева. Его введение усложняет код, но без него подобные задачи выполнить невозможно.

Возьмём для примера такую задачу: найдём все пустые директории в нашей файловой системе. Сначала реализуем простую версию, затем усложним её и внедрим аккумулятор. Пример файловой системы ниже:

```js
const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf')]),
    fsTrees.mkdir('consul', [
      fsTrees.mkfile('config.json'),
      fsTrees.mkdir('data'),
    ]),
  ]),
  fsTrees.mkdir('logs'),
  fsTrees.mkfile('hosts'),
])
```

В этой структуре три пустых директории: /logs, /etc/apache и /etc/consul/data. Код, решающий эту задачу, выглядит так:

```js
const findEmptyDirPaths = (tree) => {
  const name = fsTrees.getName(tree)
  const children = fsTrees.getChildren(tree)
  // Если детей нет, то добавляем директорию
  if (children.length === 0) {
    return name
  }

  // Фильтруем файлы, они нас не интересуют
  const emptyDirNames = children
    .filter((child) => !fsTrees.isFile(child))
    // Ищем пустые директории внутри текущей
    // flatMap выправляет массив, так что он остаётся плоским
    .flatMap(findEmptyDirPaths)

  return emptyDirNames
}

findEmptyDirPaths(tree) // ['apache', 'data', 'logs']
```

Самое необычное в этой реализации функция flatMap(). Зачем она нужна? Если оставить только map(), то результат может удивить:

```js
findEmptyDirPaths(tree)
// [ [ 'apache', [], [ 'data' ] ], 'logs' ]
```

Такое происходит из-за возврата массива на каждом уровне вложенности. На выходе получается массив массивов, напоминающий по структуре исходное файловое дерево. Чтобы этого не происходило, нужно выправлять массив с помощью flat(), либо сразу использовать flatMap().

Попробуем усложнить задачу. Найдём все пустые директории, но с максимальной глубиной поиска 2 уровня. То есть директории /logs и /etc/apache подходят под это условие, а вот /etc/consul/data — нет.

Для начала нужно понять, откуда брать глубину. В деревьях глубина считается как количество рёбер от корня до нужного узла. Визуально её посчитать легко, а что насчёт кода? Глубину конкретного узла можно представить как глубину предыдущего узла плюс единица.

Следующий шаг – добавить переменную, которая передаётся при каждом рекурсивном вызове (проваливающемся в директорию). Эта переменная, в случае нашей задачи, содержит внутри себя текущую глубину. То есть на каждом уровне (внутри каждой директории) к ней добавляется единица. Такую переменную называют аккумулятором, так как она аккумулирует, то есть накапливает данные.

Единственная проблема заключается в том, что у исходной функции findEmptyDirPaths() ровно один параметр – узел. С её помощью невозможно передавать глубину всем вложенным директориям и файлам. Поэтому придётся ввести внутреннюю функцию, которая сможет "пробрасывать" аккумулятор дальше по дереву:

```js
const findEmptyDirPaths = (tree) => {
  // Внутренняя функция, которая может передавать аккумулятор
  // В качестве аккумулятора выступает depth, переменная, содержащая текущую глубину
  const iter = (node, depth) => {
    const name = fsTrees.getName(node)
    const children = fsTrees.getChildren(node)

    // Если директория пустая, то добавляем ее в список
    if (children.length === 0) {
      return name
    }

    // Если это второй уровень вложенности, и директория не пустая
    // то не имеет смысла смотреть дальше
    if (depth === 2) {
      // Почему возвращается именно пустой массив?
      // Потому что снаружи выполняется flat
      // Он раскрывает пустые массивы
      return []
    }

    // Оставляем только директории
    return (
      children
        .filter(fsTrees.isDirectory)
        // Не забываем увеличивать глубину
        .flatMap((child) => iter(child, depth + 1))
    )
  }

  // Начинаем с глубины 0
  return iter(tree, 0)
}

findEmptyDirPaths(tree) // ['apache', 'logs']
```

Можно пойти еще дальше и позволить указывать максимальную глубину снаружи:

```js
const findEmptyDirPaths = (tree, maxDepth = 2) => {
  // ...
}
```

Но возникает вопрос, а как сделать так, чтобы по умолчанию просматривалось всё дерево? Например, можно взять заведомо большое число и сделать его значением по умолчанию. Такой подход сработает, но это хак. Правильный способ сделать это – использовать в качестве значения по умолчанию бесконечность Infinity:

```js
const findEmptyDirPaths = (tree, maxDepth = Infinity) => {
  // ...
}
```

Испытание-7: АККУМУЛЯТОР

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

ТЕОРИЯ: HTML-ДЕРЕВО ==============================================

Древовидные структуры встречаются в разных областях: генеалогическое древо, файловая система и т.д. В этом уроке мы познакомимся с деревом разметки HTML, которое постоянно встречается в веб-разработке.

```html
<html>
  <body>
    <h1>Сообщество</h1>
    <p>Общение между пользователями Хекслета</p>
    <hr />
    <input />
    <div class="hexlet-community">
      <div class="text-xs-center"></div>
      <div class="fa fa-spinner"></div>
    </div>
  </body>
</html>
```

Корнем является тег html. Важно отметить, что некоторые теги не могут иметь вложенные теги внутри себя, например, hr и input.

Попробуем описать это дерево в такой структуре, с которой было бы удобно работать. Первым шагом необходимо описать для каждого тега свойства, которыми он обладает. Как минимум можно выделить такие свойства: имя, тип, класс, дети. В реальности таких свойств бывает гораздо больше, но сейчас нам достаточно этих. Теперь опишем дерево html в этой структуре:

```js
const htmlTree = {
  name: 'html',
  type: 'tag-internal',
  children: [
    {
      name: 'body',
      type: 'tag-internal',
      children: [
        {
          name: 'h1',
          type: 'tag-internal',
          children: [
            {
              type: 'text',
              content: 'Сообщество',
            },
          ],
        },
        {
          name: 'p',
          type: 'tag-internal',
          children: [
            {
              type: 'text',
              content: 'Общение между пользователями Хекслета',
            },
          ],
        },
        {
          name: 'hr',
          type: 'tag-leaf',
        },
        {
          name: 'input',
          type: 'tag-leaf',
        },
        {
          name: 'div',
          type: 'tag-internal',
          className: 'hexlet-community',
          children: [
            {
              name: 'div',
              type: 'tag-internal',
              className: 'text-xs-center',
              children: [],
            },
            {
              name: 'div',
              type: 'tag-internal',
              className: 'fa fa-spinner',
              children: [],
            },
          ],
        },
      ],
    },
  ],
}
```

Главным свойством в каждом узле является тип узла. В нашем дереве есть теги и текст. Текст может быть вложен в тег, то есть может быть потомком. Поэтому текст является листовым узлом. Также у нас есть некоторые теги, которые являются листовыми узлами. Поэтому для тегов выделено два типа: tag-internal — внутренние узлы, это теги, которые могут иметь детей; tag-leaf — листовые узлы, это теги, которые не могут иметь детей. Итак, для описания нашего дерева html достаточно определить три типа узлов:

- tag-internal - теги, которые могут иметь детей, внутренний узел
- tag-leaf - теги, которые не могут иметь детей, листовой узел
- text - простой текст, листовой узел

Теперь мы можем работать с нашим деревом. Например, отфильтруем все пустые теги. Для этого прежде всего надо определить, как фильтровать каждый тип. Каждый тип фильтруется по-своему:

- tag-internal - если нет детей или все дети пустые, значит и родитель пустой
- tag-leaf - не может иметь детей, такой тег всегда выводится
- text - текстовый узел не может содержать детей, вместо этого он может содержать текстовый контент, поэтому фильтруем по пустому контенту

Функция фильтрации будет выглядеть следующим образом:

```js
const filterEmpty = (tree) => {
  const filtered = tree.children
    .map((node) => {
      // Перед фильтрацией отфильтровываем всех потомков
      if (node.type === 'tag-internal') {
        // Тут самый важный момент. Рекурсивно вызываем функцию фильтрации.
        // Дальнейшая работа не завершится, пока функция фильтрации не отфильтрует вложенные пустые узлы.
        return filterEmpty(node)
      }
      return node
    })
    .filter((node) => {
      const { type } = node
      // Каждый тип фильтруется по-своему, удобно для этого использовать switch
      switch (type) {
        case 'tag-internal': {
          // К этому моменту в текущем узле отфильтрованы потомки (остались только те, которые имеют своих детей)
          const { children } = node
          // Проверяем текущий узел, если он не пустой, возвращаем true (узел остается)
          return children.length > 0
        }
        case 'tag-leaf':
          // Листовые узлы всегда выводятся
          return true
        case 'text': {
          const { content } = node
          // Для текстовых узлов просто проверяем существование контента,
          return !!content // Для однозначности приводим значение к булевому типу
        }
      }
    })
  return { ...tree, children: filtered }
}
```

Фильтр в качестве параметра принимает узел с типом tag-internal и обрабатывает вложенные в него элементы. Вначале проходимся по всем потомкам и у всех, с типом tag-internal, фильтруем также вложенные элементы с помощью нашей же функции (рекурсия). Далее вызывается метод filter(), в нём каждый тип уже фильтруется по той логике, которую мы определили.

После фильтрации получим такое дерево:

```js
{
  name: 'html',
  type: 'tag-internal',
  children: [
    {
      name: 'body',
      type: 'tag-internal',
      children: [
        {
          name: 'h1',
          type: 'tag-internal',
          children: [
            {
              name: '',
              type: 'text',
              content: 'Сообщество',
            },
          ],
        },
        {
          name: 'p',
          type: 'tag-internal',
          children: [
            {
              name: '',
              type: 'text',
              content: 'Общение между пользователями Хекслета',
            },
          ],
        },
        {
          name: 'hr',
          type: 'tag-leaf',
        },
        {
          name: 'input',
          type: 'tag-leaf',
        },
      ],
    },
  ],
};
```

Это дерево не содержит элемент div с классом hexlet-community, даже несмотря на то, что оно содержало другие элементы. Это произошло потому, что перед фильтрацией родителя были отфильтрованы его пустые потомки. Теперь можно собрать дерево в строку:

```js
// Для удобства определим отдельную функцию для формирования вывода класса
const buildClass = (node) => (node.className ? ` class=${node.className}` : '')

// Основная функция для сборки страницы
const buildHtml = (node) => {
  const { type, name } = node
  // Каждый тип формируется по-своему, как и в фильтрации используем switch
  switch (type) {
    case 'tag-internal': {
      // Этот тип может иметь детей, формируем вывод детей
      const childrenView = node.children.map(buildHtml).join('')
      // Собираем всё, вместе с родительским узлом
      return `<${name}${buildClass(node)}>${childrenView}</${name}>`
    }
    case 'tag-leaf':
      // Листовые узлы формируются просто
      return `<${name}${buildClass(node)}>`
    case 'text':
      // В текстовых узлах выводится сам контент
      return node.content
  }
}

// Получаем отфильтрованное дерево
const filteredTree = filterEmpty(htmlTree)

// Формируем результат
const html = buildHtml(filteredTree)
console.log(html) // => <html><body><h1>Сообщество</h1><p>Общение между пользователями Хекслета</p><hr><input></body></html>
```

Испытание-8: HTML-ДЕРЕВО

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

Испытание-9: ВЫРАВНИВАНИЕ (Массив)

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

Испытание-10: ОТСЛЕЖИВАНИЕ ЗАВИСИМОСТЕЙ

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

Испытание-11: JSON stringify

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

========================================================================
Испытание-12: ПОСТРОЕНИЕ МАРШРУТА
========================================================================

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

Испытание-13: ТРАНСФОРМЕР

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

Испытание-14: ПАЗЛ

Перед прохождением данного испытания рекомендуется пройти испытание "Трансформер".

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

Испытание-15: МАССИВ КАК ОБЪЕКТ

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

Испытание-16: ОТОБРАЖЕНИЕ, ФИЛЬТРАЦИЯ, СВЁРТКА

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
