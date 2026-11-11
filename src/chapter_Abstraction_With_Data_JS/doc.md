## Испытание-1: Точки на координатной плоскости +1 |

src/chapter_Abstraction_With_Data_JS/trial-1.js
Реализуйте и экспортируйте по умолчанию функцию, которая находит расстояние между двумя точками на плоскости:

```js
point1 = [0, 0]
point2 = [3, 4]
calculateDistance(point1, point2) // 5
```

Подсказки
Формула расчета расстояния между двумя точками: Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2)), где x1, y1 — это координаты первой точки, а x2, y2 — координаты второй

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const calculateDistance = (point1, point2) => {
  const [x1, y1] = point1
  const [x2, y2] = point2
  const result = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

  return result
}

// teacher solution
const calculateDistance = (point1, point2) => {
  const deltaX = point2[0] - point1[0]
  const deltaY = point2[1] - point1[1]

  return Math.sqrt(deltaX ** 2 + deltaY ** 2)

  // Альтернативный вариант с использованием Math.hypot
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot
  // return Math.hypot(deltaX, deltaY);
}

// solution 3
const calculateDistance = ([x1, y1], [x2, y2]) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}
```

</details>

## Испытание-2: Семантика массивов

src/chapter_Abstraction_With_Data_JS/trial-2.js
Реализуйте и экспортируйте по умолчанию функцию, которая находит точку посередине между двумя указанными точками.

Примеры

```js
const point1 = { x: 0, y: 0 }
const point2 = { x: 4, y: 4 }
const point3 = getMidpoint(point1, point2)
console.log(point3) // => { x: 2, y: 2 };
```

Подсказки
Средняя точка вычисляется по формуле x = (x1 + x2) / 2 и y = (y1 + y2) / 2.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const getMidPoint = (point1, point2) => ({
  x: (point1.x + point2.x) / 2,
  y: (point1.y + point2.y) / 2,
})

// teacher solution
export default (point1, point2) => {
  const x = (point1.x + point2.x) / 2
  const y = (point1.y + point2.y) / 2

  return { x, y }
}
```

</details>

## Испытание-3: Создание абстракции

src/chapter_Abstraction_With_Data_JS/trial-3.js
Отрезок — еще один графический примитив. В коде описывается парой точек, одна из которых — начало отрезка, другая — конец. Обычный отрезок не имеет направления, поэтому вы сами вольны выбирать то, какую точку считать началом, а какую концом.

В этом задании вам нужно самостоятельно создать абстракции и принять решение о том, как они будут реализованы. Напомню, что сделать это можно разными способами и нет одного правильного.

Реализуйте и экспортируйте указанные ниже функции:

- makeSegment(). Принимает на вход две точки и возвращает отрезок.
- getMidpointOfSegment(). Принимает на вход отрезок и возвращает точку находящуюся на середине отрезка.
- getBeginPoint(). Принимает на вход отрезок и возвращает точку начала отрезка.
- getEndPoint(). Принимает на вход отрезок и возвращает точку конца отрезка.

Пример

```js
const beginPoint = makeDecartPoint(3, 2)
const endPoint = makeDecartPoint(0, 0)
segment = makeSegment(beginPoint, endPoint)

getMidpointOfSegment(segment) // (1.5, 1)
getBeginPoint(segment) // (3, 2)
getEndPoint(segment) // (0, 0)
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const makeDecartPoint = (x, y) => {
  const point = { x, y }
  console.log(point)
  return point
}

const getX = (point) => {
  return point.x
}
const getY = (point) => {
  return point.y
}

const makeSegment = (beginPoint, endPoint) => {
  return { start: beginPoint, end: endPoint }
}

const getBeginPoint = (segment) => {
  console.log(segment)
  return segment.start
}

const getEndPoint = (segment) => {
  return segment.end
}

const getMidpointOfSegment = (segment) => {
  const start = getBeginPoint(segment)
  const end = getEndPoint(segment)

  const midX = (getX(start) + getX(end)) / 2
  const midY = (getY(start) + getY(end)) / 2

  console.log(makeDecartPoint(midX, midY))

  return makeDecartPoint(midX, midY)
}

export {
  makeSegment,
  getBeginPoint,
  getEndPoint,
  getMidpointOfSegment,
  makeDecartPoint,
  getX,
  getY,
}
// teacher solution
```

</details>

## Испытание-4: Интерфейсы

src/chapter_Abstraction_With_Data_JS/trial-4.js
В этой задаче тесты написаны для отрезков, которые, в свою очередь, используют точки. Ваша задача — реализовать интерфейсные функции для работы с точками. Внутреннее представление точек должно быть основано на полярной системе координат, хотя интерфейс предполагает работу с декартовой системой (снаружи). Для обозначения координат используются целые числа.

points.js
Реализуйте интерфейсные функции точек:

getX(point)
getY(point)
makePoint(x, y). Принимает на вход координаты и возвращает точку. Уже реализован.

const x = 4
const y = 8

// point хранит в себе данные в полярной системе координат
const point = makePoint(x, y)

// Здесь происходит преобразование из полярной в декартову
getX(point) // 4
getY(point) // 8
Подсказки
Трансляция декартовых координат в полярные была описана в теории
Получить x можно по формуле radius _ cos(angle)
Получить y можно по формуле radius _ sin(angle)
Результат вычислений необходимо округлить к ближайшему целому (согласно правилам математического округления)

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const makePoint = (x, y) => {
  const point = {
    angle: Math.atan2(y, x),
    radius: Math.sqrt(x ** 2 + y ** 2),
  }

  return point
}

// BEGIN (write your solution here)
const getX = (point) => Math.round(point.radius * Math.cos(point.angle))
const getY = (point) => Math.round(point.radius * Math.sin(point.angle))
// END

const makeSegment = (point1, point2) => {
  const segment = { beginPoint: point1, endPoint: point2 }
  return segment
}

const getBeginPoint = (segment) => segment.beginPoint

const getEndPoint = (segment) => segment.endPoint

const isParallelWithX = (segment) => {
  const beginPoint = getBeginPoint(segment)
  const endPoint = getEndPoint(segment)

  return getY(beginPoint) === getY(endPoint)
}

const isParallelWithY = (segment) => {
  const beginPoint = getBeginPoint(segment)
  const endPoint = getEndPoint(segment)

  return getX(beginPoint) === getX(endPoint)
}

export { makeSegment, isParallelWithX, isParallelWithY, makePoint }
// teacher solution
```

</details>

## Испытание-5: Уровневое проектирование

src/chapter_Abstraction_With_Data_JS/trial-5.js
Реализуйте абстракцию (набор функций) для работы с прямоугольниками, стороны которого всегда параллельны осям. Прямоугольник может располагаться в любом месте координатной плоскости.

При такой постановке, достаточно знать только три параметра для однозначного задания прямоугольника на плоскости: координаты левой верхней точки, ширину и высоту. Зная их, мы всегда можем построить прямоугольник одним единственным способом.

y | 4 | точка ширина | \*------------- 3 | | | | | | высота 2 | | | | -------------- 1 | | ------|--------------------------- x 0 | 1 2 3 4 5 6 7 | | |
Основной интерфейс:

makeRectangle(point, width, height) (конструктор) – создает прямоугольник. Принимает параметры: левую-верхнюю точку, ширину и высоту. Ширина и высота – положительные числа

Селекторы getStartPoint(rectangle), getWidth(rectangle) и getHeight(rectangle)

containsOrigin(rectangle) – проверяет, принадлежит ли центр координат прямоугольнику (не лежит на границе прямоугольника, а находится внутри). Чтобы в этом убедиться, достаточно проверить, что все вершины прямоугольника лежат в разных квадрантах (их можно высчитать в момент проверки).

Экспортируйте функции makeRectangle(point, width, height), containsOrigin(rectangle), getStartPoint(rectangle), getWidth(rectangle) и getHeight(rectangle).

Примеры:

// Создание прямоугольника:
// p - левая верхняя точка
// 4 - ширина
// 5 - высота
//
// p 4
// -----------
// | |
// | | 5
// | |
// -----------

```js
p = makeDecartPoint(0, 1)
rectangle = makeRectangle(p, 4, 5)

containsOrigin(rectangle) // false
getWidth(rectangle) // 4

rectangle2 = makeRectangle(makeDecartPoint(-4, 3), 5, 4)
containsOrigin(rectangle2) // true
```

Подсказки
Квадрант плоскости — любая из 4 областей (углов), на которые плоскость делится двумя взаимно перпендикулярными прямыми, принятыми в качестве осей координат.

<details>
  <summary>Посмотреть решение</summary>

```js
// solution
export const makeDecartPoint = (x, y) => ({ x, y })
export const getX = (point) => point.x
export const getY = (point) => point.y

export const getQuadrant = (point) => {
  const x = getX(point)
  const y = getY(point)

  if (x > 0 && y > 0) {
    return 1
  }
  if (x < 0 && y > 0) {
    return 2
  }
  if (x < 0 && y < 0) {
    return 3
  }
  if (x > 0 && y < 0) {
    return 4
  }

  return null
}

export const makeRectangle = (point, width, height) => {
  return { point, width, height }
}

export const getStartPoint = (rectangle) => rectangle.point
export const getWidth = (rectangle) => rectangle.width
export const getHeight = (rectangle) => rectangle.height

export const containsOrigin = (rectangle) => {
  const point1 = getStartPoint(rectangle)
  const point2 = makeDecartPoint(
    getX(point1) + getWidth(rectangle),
    getY(point1) - getHeight(rectangle),
  )

  return getQuadrant(point1) === 2 && getQuadrant(point2) === 4
}
```

</details>

## Испытание-6: Инварианты

src/chapter_Abstraction_With_Data_JS/trial-6.js
Реализуйте абстракцию для работы с рациональными числами, включающую в себя следующие функции:

Конструктор makeRational() - принимает на вход числитель и знаменатель, возвращает дробь в виде объекта.
Селектор getNumer() - возвращает числитель
Селектор getDenom() - возвращает знаменатель
Сложение add() - складывает переданные дроби
Вычитание sub() - находит разность между двумя дробями
Не забудьте реализовать нормализацию дробей удобным для вас способом.

```js
const rat1 = makeRational(3, 9)
getNumer(rat1) // 1
getDenom(rat1) // 3

const rat2 = makeRational(10, 3)

const rat3 = add(rat1, rat2)
ratToString(rat3) // '11/3'

const rat4 = sub(rat1, rat2)
ratToString(rat4) // '-3/1'
```

Подсказки
Действия с дробями
Функция getGcd() находит наибольший общий делитель двух чисел (уже импортирована в модуль)
Функция ratToString() возвращает строковое представление числа (используется для отладки)
В решении исходите из того, что в знаменателе всегда положительное число. Учитывайте знак только в числителе

<details>
  <summary>Посмотреть решение</summary>

```js
// solution
const getGcd = (a, b) => (b === 0 ? Math.abs(a) : getGcd(b, a % b))

export const makeRational = (numer, denom) => {
  const commonDivisor = getGcd(numer, denom)
  let normalizedNumer = numer / commonDivisor
  let normalizedDenom = denom / commonDivisor

  if (normalizedDenom < 0) {
    normalizedNumer = -normalizedNumer
    normalizedDenom = -normalizedDenom
  }

  return { numer: normalizedNumer, denom: normalizedDenom }
}

export const getNumer = (rational) => rational.numer
export const getDenom = (rational) => rational.denom

export const add = (rational1, rational2) => {
  const n1 = getNumer(rational1)
  const d1 = getDenom(rational1)
  const n2 = getNumer(rational2)
  const d2 = getDenom(rational2)

  const resultNumer = n1 * d2 + n2 * d1
  const resultDenom = d1 * d2

  return makeRational(resultNumer, resultDenom)
}

export const sub = (rational1, rational2) => {
  const n1 = getNumer(rational1)
  const d1 = getDenom(rational1)
  const n2 = getNumer(rational2)
  const d2 = getDenom(rational2)

  const resultNumer = n1 * d2 - n2 * d1
  const resultDenom = d1 * d2

  return makeRational(resultNumer, resultDenom)
}

export const ratToString = (rat) => `${getNumer(rat)}/${getDenom(rat)}`
```

</details>

## Испытание-7: Обработка ссылок

src/chapter_Abstraction_With_Data_JS/trial-7.js
Реализуйте абстракцию для работы с урлами. Она должна извлекать и менять части адреса. Интерфейс:

- make(url) - Конструктор. Создает урл.
- setProtocol(data, protocol) - Сеттер. Меняет схему.
- getProtocol(data) - Селектор (геттер). Извлекает схему.
- setHost(data, host) - Сеттер. Меняет хост.
- getHost(data) - Геттер. Извлекает хост.
- setPath(data, path) - Сеттер. Меняет строку запроса.
- getPath(data) - Геттер. Извлекает строку запроса.
- setQueryParam(data, key, value) - Сеттер. Устанавливает значение для параметра запроса.
- getQueryParam(data, paramName, defaultValue = null) - Геттер. Извлекает значение для параметра запроса. Третьим параметром функция принимает значение по умолчанию, которое возвращается тогда, когда в запросе не было такого параметра
- toString(data) - Геттер. Преобразует урл в строковой вид.

```js
const url = make('https://hexlet.io/community?q=low')

setProtocol(url, 'http:')
toString(url) // 'http://hexlet.io/community?q=low'

setPath(url, '/404')
toString(url) // 'http://hexlet.io/404?q=low'

setQueryParam(url, 'page', 5)
toString(url) // 'http://hexlet.io/404?q=low&page=5'

setQueryParam(url, 'q', 'high')
toString(url) // 'http://hexlet.io/404?q=high&page=5'
```

Подсказки
Используйте стандартный объект URL для работы с адресами: URL
Методы set() и get()

<details>
  <summary>Посмотреть решение</summary>

```js
// solution
const make = (urlAddress) => {
  const data = new URL(urlAddress)

  return data
}

const getProtocol = (data) => data.protocol
const getHost = (data) => data.host
const getPath = (data) => data.pathname

const getQueryParam = (data, paramName, defaultValue = null) =>
  data.searchParams.get(paramName) || defaultValue

const setHost = (data, host) => {
  data.host = host
}

const setPath = (data, path) => {
  data.pathname = path
}

const setProtocol = (data, protocol) => {
  data.protocol = protocol
}

const setQueryParam = (data, key, value) => {
  data.searchParams.set(key, value)
}

const toString = (data) => data.toString()

export {
  make,
  getProtocol,
  getHost,
  getPath,
  setProtocol,
  setHost,
  setPath,
  getQueryParam,
  setQueryParam,
  toString,
}
```

</details>

## Испытание-8: Онлайн-магазин

src/chapter_Abstraction_With_Data_JS/trial-8.js
Реализуйте абстракцию для работы c каталогом товаров онлайн-магазина. Она содержит следующие сущности:

- Каталог товаров
- Товар: id, название, цена
- Корзина
- Заказы

Необходимо реализовать следующую функциональность:

- addProduct(catalog, product) — добавление и удаление товара из каталога
  - catalog — каталог товаров
  - product — товар

- getProductById(catalog, id) — получение товара по id
  - catalog — каталог товаров
  - id — идентификатор товара

- addToCart(catalog, cart, id, quantity) — добавление товара в корзину
  - catalog — каталог товаров
  - cart — корзина
  - id — идентификатор товара
  - quantity — количество товара

- placeOrder(cart, orders) — оформление заказа, после оформления заказа корзина обнуляется
  - cart — корзина
  - orders — заказы

```js
const catalog = {
  1: { id: 1, name: 'молоко', price: 100 },
  2: { id: 2, name: 'сыр', price: 200 },
}

// Добавляем товар в каталог
const product = { id: 3, name: 'чипсы', price: 100 }
const updatedCatalog = addProduct(catalog, product) // =>
// {
//   '1': { id: 1, name: 'молоко', price: 100 },
//   '2': { id: 2, name: 'сыр', price: 200 },
//   '3': { id: 3, name: 'чипсы', price: 100 }
// }

// Удаляем товар из каталога
const updatedCatalog = removeProduct(catalog, 3) // =>
// {
//   '1': { id: 1, name: 'молоко', price: 100 },
//   '2': { id: 2, name: 'сыр', price: 200 }
// }

// Добавляем товары в корзину
let cart = []
cart = addToCart(catalog, cart, 2, 2)
cart = addToCart(catalog, cart, 1, 1)
console.log(cart) // =>
// [
//   { id: 2, name: 'сыр', price: 200, quantity: 2 },
//   { id: 1, name: 'молоко', price: 100, quantity: 1 }
// ]

// Оформляем заказ
const orders = {}
const { newCart, newOrders } = placeOrder(cart, orders)
console.log(newCart) // [];
console.log(newOrders) // =>
// {
//   order_1: {
//     id: 'order_1',
//     items: [
//       {
//         id: 2,
//         name: сыр,
//         price: 200,
//         quantity: 2
//       },
//       {
//         id: 1,
//         name: молоко,
//         price: 100,
//         quantity: 1
//       }
//     ],
//     totalAmount: 500
//   }
// }
```

Подсказки
Для создания id можно воспользоваться функцией uniqueId из библиотеки es-toolkit

<details>
  <summary>Посмотреть решение</summary>

```js
// solution my
import { uniqueId } from 'es-toolkit/compat'

export const addProduct = (catalog, product) => {
  const id = product.id || Number(uniqueId())
  return {
    ...catalog,
    [id]: { ...product, id },
  }
}

export const removeProduct = (catalog, product) => {
  const newCatalog = { ...catalog }
  delete newCatalog[product.id]
  return newCatalog
}

export const getProductById = (catalog, id) => {
  return catalog[id]
}

export const addToCart = (catalog, cart, id, quantity) => {
  const product = catalog[id]

  if (!product) return cart

  const itemIndex = cart.findIndex((item) => item.id === id)

  if (itemIndex > -1) {
    return cart.map((item, index) =>
      index === itemIndex
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    )
  }

  return [...cart, { ...product, quantity }]
}

export const placeOrder = (cart, orders) => {
  if (cart.length === 0) {
    return { newCart: cart, newOrders: orders }
  }

  const orderId = uniqueId()

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const newOrders = {
    id: orderId,
    items: cart,
    totalAmount,
  }

  return {
    newCart: [],
    newOrders: {
      ...orders,
      [orderId]: newOrders,
    },
  }
}

// solution teacher
import { uniqueId } from 'es-toolkit/compat'

export const addProduct = (catalog, product) => {
  const newCatalog = {
    ...catalog,
    [product.id]: product,
  }
  return newCatalog
}

export const removeProduct = (catalog, productId) =>
  Object.entries(catalog)
    .filter(([key]) => parseInt(key, 10) !== productId)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

export const getProductById = (catalog, id) => {
  return catalog[id]
}

export const addToCart = (catalog, cart, productId, quantity) => {
  const existingCartIndex = cart.findIndex((item) => item.id === productId)

  if (existingCartIndex !== -1) {
    return [
      ...cart.slice(0, existingCartIndex),
      {
        ...cart[existingCartIndex],
        quantity: cart[existingCartIndex].quantity + quantity,
      },
      ...cart.slice(existingCartIndex + 1),
    ]
  }

  const product = getProductById(catalog, productId)

  if (!product) {
    throw new Error('Товар не найден')
  }

  return [...cart, { ...product, quantity }]
}

export const placeOrder = (cart, orders) => {
  if (cart.length === 0) {
    throw new Error('Корзина пуста')
  }

  const orderId = uniqueId('order_')

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const order = {
    id: orderId,
    items: [...cart],
    totalAmount,
  }

  const updatedOrders = {
    ...orders,
    [orderId]: order,
  }

  return { newCart: [], newOrders: updatedOrders }
}
```

</details>

## Испытание-9: Список дел

src/chapter_Abstraction_With_Data_JS/trial-9.js
Реализуйте абстракцию для работы со списком дел с тегами.

Cущность Задача (task) должна быть представлена объектом со следующими свойствами:

- Описание задачи - строка
- Статус задачи - выполнена или нет, булево значение
- Теги - массив строк, связанных с этой задачей

Необходимо реализовать следующую функциональность:

- createTask(description, tags) - создаёт и возвращает новый объект задачи с заданными описанием и тегами. Убедитесь, что в созданной задаче в поле tags нет дубликатов.
- addTask(tasks, task) - добавляет задачу в глобальный список tasks и возвращает новый список.
- addTagToTask(tasks, taskId, tag) - добавляет тег к задаче, если его там ещё нет.
- removeTagFromTask(tasks, taskId, tag) - удаляет тег у задачи.
- markTaskCompleted(tasks, taskId) - помечает задачу как выполненную.
- filterTasksByTags(tasks, filterTags) - получает массив тегов и возвращает новый массив, содержащий только задачи, у которых есть все указанные теги. Если filterTags не указан, то возвращается массив всех задач

```js
// Создаем задачу
const task1 = createTask('Task 1', ['tag1', 'tag2', 'tag2'])
// => {
// id: 1,
// description: 'Task 1',
// completed: false,
// tags: ['tag1', 'tag2']
// }

// Добавляем в список дел
addTask(tasks, task)
// => [
// { id: 1, description: 'Task 1', completed: false, tags: ['tag1', 'tag2'] },
// ]

// Добавляем новый тег к задаче
addTagToTask(tasks, 1, 'tag3')
// => {
// id: 1,
// description: 'Task 1',
// completed: false,
// tags: ['tag1', 'tag2', 'tag3']
// }

// Удаляем тег
removeTagFromTask(tasks, 1, 'tag1')
// => {
// id: 1,
// description: 'Task 1',
// completed: false,
// tags: ['tag2', 'tag3']
// }

// Фильтрация по тегу
filterTasksByTags(tasks, 'tag5') // [];
Каждая функция должна возвращать список с обновленными данными.

Подсказки
Используйте функции для работы с массивами: filter, map, every
Для создания id можно воспользоваться функцией uniqueId из библиотеки es-toolkit
```

<details>
  <summary>Посмотреть решение</summary>

```js
// solution my
import { uniqueId } from 'es-toolkit/compat'

// создаёт и возвращает новый объект задачи с заданными описанием и тегами
export const createTask = (description, tags) => {
  const taskId = Number(uniqueId())
  const uniqTags = [...new Set(tags)]

  const newTask = {
    id: taskId,
    description,
    completed: false,
    tags: uniqTags,
  }
  return newTask
}

// добавляет задачу в глобальный список tasks и возвращает новый список
export const addTask = (tasks, task) => {
  const newTasks = [...tasks, task]
  return newTasks
}

// добавляет тег к задаче, если его там ещё нет
export const addTagToTask = (tasks, taskId, tag) => {
  return tasks.map((task) => {
    if (task.id !== taskId) {
      return task
    }

    return {
      ...task,
      tags: [...new Set([...task.tags, tag])],
    }
  })
}

// удаляет тег у задачи
export const removeTagFromTask = (tasks, taskId, tag) => {
  return tasks.map((task) => {
    if (task.id !== taskId) {
      return task
    }

    return {
      ...task,
      tags: task.tags.filter((t) => t !== tag),
    }
  })
}

// помечает задачу как выполненную
export const markTaskCompleted = (tasks, taskId) => {
  return tasks.map((task) => {
    if (task.id !== taskId) {
      return task
    }

    return {
      ...task,
      completed: true,
    }
  })
}

// получает массив тегов и возвращает новый массив, содержащий только задачи, у которых есть все указанные теги. Если filterTags не указан, то возвращается массив всех задач
export const filterTasksByTags = (tasks, filterTags) => {
  if (!filterTags || filterTags.length === 0) {
    return tasks
  }

  return tasks.filter((task) =>
    filterTags.every((tag) => task.tags.includes(tag)),
  )
}
// solution teacher
import { uniqueId } from 'es-toolkit/compat'

export const createTask = (description, tags = []) => {
  const uniqTags = new Set(tags)
  const newTask = {
    id: uniqueId(),
    description,
    completed: false,
    tags: [...uniqTags],
  }
  return newTask
}

export const addTask = (tasks, task) => [...tasks, task]

export const addTagToTask = (tasks, taskId, tag) => {
  return tasks.map((t) => {
    if (t.id === taskId) {
      if (!t.tags.includes(tag)) {
        return {
          ...t,
          tags: [...t.tags, tag],
        }
      }
    }
    return t
  })
}

export const removeTagFromTask = (tasks, taskId, tag) => {
  return tasks.map((t) => {
    if (t.id === taskId) {
      return {
        ...t,
        tags: t.tags.filter((currTag) => currTag !== tag),
      }
    }
    return t
  })
}

export const markTaskCompleted = (tasks, taskId) => {
  return tasks.map((t) => {
    if (t.id === taskId) {
      return {
        ...t,
        completed: true,
      }
    }
    return t
  })
}

export const filterTasksByTags = (tasks, filterTags = []) => {
  if (filterTags.length === 0) {
    return tasks
  }

  return tasks.filter((task) =>
    filterTags.every((tag) => task.tags.includes(tag)),
  )
}
```

</details>
