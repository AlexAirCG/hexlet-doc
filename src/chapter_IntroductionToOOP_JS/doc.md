## Испытание-1: Инкапсуляция

src/chapter_IntroductionToOOP_JS/trial-1.js
users.js
Реализуйте и экспортируйте функцию getMutualFriends(), которая принимает на вход двух пользователей и возвращает массив состоящий из общих друзей этих пользователей.

Интерфейс абстракции "Пользователь":

user.id – возвращает идентификатор пользователя, по которому можно его отличить от остальных.
user.getFriends() – возвращает список друзей (то есть пользователей).

```js
const user1 = makeUser({
  friends: [
    makeUser({ id: 1 }),
    makeUser({ id: 2 }), // общий друг
  ],
})
const user2 = makeUser({
  friends: [
    makeUser({ id: 2 }), // общий друг
    makeUser({ id: 3 }),
  ],
})

getMutualFriends(user1, user2) // [ { friends: [], id: 2, getFriends: [Function: getFriends] } ] - массив состоящий из одного пользователя, общего друга
```

Подсказки
Посмотреть, как выглядит функция создания пользователя вы можете в файле user.js.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export const getMutualFriends = (user1, user2) => {
  const friends1 = user1.getFriends()
  const friends2 = user2.getFriends()

  return friends1.filter((friend1) => {
    return friends2.some((friend2) => friend2.id === friend1.id)
  })
}

// teacher solution
export const getMutualFriends = (user1, user2) => {
  const friends1 = user1.getFriends()
  const friends2 = user2.getFriends()
  const friends2Ids = friends2.map(({ id }) => id)
  return friends1.filter(({ id }) => friends2Ids.includes(id))
}
```

</details>

## Испытание-2: Контекст (This)

src/chapter_IntroductionToOOP_JS/trial-2.js
Подобное задание уже было в курсе по абстракциям с помощью данных. Теперь мы делаем то же самое, но используя объекты и методы. Нормализацию дробей делать не нужно.

rational.js
Реализуйте и экспортируйте по умолчанию функцию, которая создает рациональное число. Рациональное число должно быть представлено объектом со следующими методами:

Сеттер setNumer() - устанавливает числитель
Сеттер setDenom() - устанавливает знаменатель
Геттер getNumer() - возвращает числитель
Геттер getDenom() - возвращает знаменатель
Геттер toString() - возвращает строковое представление числа
Метод add() - складывает дробь на которой он был вызван с переданной дробью и возвращает новое рациональное число (не изменяет текущее!)

```js
import make from './rational.js'

const rat1 = make()
rat1.setNumer(3)
rat1.setDenom(8)
rat1.getNumer() // 3
rat1.getDenom() // 8

const rat2 = make(10, 3)

// Формула сложения: a / b + c / d = (a * d + b * c) / (b * d)
const rat3 = rat1.add(rat2)
rat3.toString() // '89/24'
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const make = (numer = 0, denom = 1) => {
  return {
    numer,
    denom,

    getNumer() {
      return this.numer
    },
    getDenom() {
      return this.denom
    },
    setNumer(value) {
      this.numer = value
    },
    setDenom(value) {
      this.denom = value
    },
    toString() {
      return `${this.numer}/${this.denom}`
    },
    add(rat2) {
      const a = this.numer
      const b = this.denom
      const c = rat2.getNumer()
      const d = rat2.getDenom()

      const newNumer = a * d + b * c
      const newDenom = b * d

      return make(newNumer, newDenom)
    },
  }
}

// teacher solution
const make = (numer, denom) => ({
  numer,
  denom,
  setNumer(newNumer) {
    this.numer = newNumer
  },
  setDenom(newDenom) {
    this.denom = newDenom
  },
  getNumer() {
    return this.numer
  },
  getDenom() {
    return this.denom
  },
  toString() {
    return `${this.getNumer()}/${this.getDenom()}`
  },
  add(rational) {
    const newNumer =
      this.getNumer() * rational.getDenom() +
      rational.getNumer() * this.getDenom()
    const newDenom = this.getDenom() * rational.getDenom()
    return make(newNumer, newDenom)
  },
})
```

</details>

## Испытание-3: Связывание (bind)

src/chapter_IntroductionToOOP_JS/trial-3.js
Функции bind(), apply() и call() работают с контекстом и аргументами. В этом упражнении вы научитесь заменять одну функцию другой для получения функциональности, аналогичной bind().

bind.js
Реализуйте и экспортируйте по умолчанию функцию, которая ведет себя аналогично встроенной bind(obj, fn). Аргументы функции:

- obj – объект выступающий в роли контекста
- fn() – функция привязываемая к контексту

```js
const obj = { number: 5 }
const fn = function fn(number) {
  return number + this.number
}
const fnWithContext = bind(obj, fn)

// Принимает столько же аргументов сколько и исходная функция
fnWithContext(3) // 8
```

Примечания
Ограничение: для реализации нельзя пользоваться только встроенной функцией bind()
Для решения можно использовать apply() или call()
Подсказки
Подумайте, в чем основное различие между bind() и apply()/call() и что именно нужно сделать, чтобы реализовать функцию, которая будет работать как bind(), но под капотом использовать apply() или call()
Функция высшего порядка
Каррирование
Задание сложное, поэтому не бойтесь смотреть решение учителя и двигаться дальше, если застряли

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const bind = (obj, fn) => {
  return (...arg) => {
    return fn.apply(obj, arg)
  }
}

// teacher solution
export default (context, fn) =>
  (...args) =>
    fn.apply(context, args)

/*
Если разложить решение учителя на обычные функции, то получится такой код:
const bind = function (context, fn) {
  return function (...args) { // упаковка входных данных в массив
    return fn.apply(context, args);
  };
};

----

Как это работает:

bind обычно вызывается как метод на объекте функции,
поэтому требуется передача аргументом только контекста:
const obj = { number: 5 };
const fn = function fn(number) {
  return number + this.number;
};
const bindedFn1 = fn.bind(obj);
в данной задаче bind является отдельной функцией, а не методом, поэтому fn передаётся аргументом:
const bindedFn2 = bind(obj, fn); // возврат функции из функции

bindedFn1(7); // 12
bindedFn2(7); // 12

----

Альтернативное решение:
const bind = (context, fn) => (...args) => fn.call(context, ...args);
*/
```

</details>

## Испытание-4: Особенности работы this со стрелочными функциями

src/chapter_IntroductionToOOP_JS/trial-4.js
collection.js
Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход коллекцию объектов и колбек функцию. Эта функция должна вызывать колбек для каждого объекта коллекции. Главная особенность этой функции в том, что она передает объекты коллекции не в саму функцию, а устанавливает их как контекст.

Подобная функция существует в библиотеке JQuery

Примеры

```js
import each from './collection.js'

const objects = [{ name: 'Karl' }, { name: 'Mia' }]
each(objects, function callback() {
  this.name = this.name.split('').reverse().join('')
})

console.log(objects)
// [
//   { name: 'lraK' },
//   { name: 'aiM' },
// ];
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const collection = (objColl, fn) => {
  objColl.forEach((obj) => fn.call(obj))
}

// teacher solution
export default (objects, callback) =>
  objects.forEach((object) => callback.call(object))
```

</details>

## Испытание-5: Конструктор

src/chapter_IntroductionToOOP_JS/trial-5.js
Point.js
Реализуйте и экспортируйте по умолчанию функцию-конструктор Point с двумя свойствами, представляющими координаты на плоскости x и y и геттеры для извлечения этих свойств: getX и getY. На основании пройденного материала выберите тот способ организовать работу абстракции, который считаете нужным.

Segment.js
Реализуйте и экспортируйте по умолчанию функцию-конструктор Segment с двумя свойствами beginPoint и endPoint и геттеры для извлечения этих свойств: getBeginPoint и getEndPoint.

solution.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход отрезок и возвращает новый отрезок с точками, добавленными в обратном порядке (begin меняется местами с end).

Точки в результирующем отрезке должны быть копиями (по значению) соответствующих точек исходного отрезка. То есть они не должны быть ссылкой на один и тот же объект, так как это разные объекты (пускай и с одинаковыми координатами). Для создания копий используйте соответствующие конструкторы.

```js
const beginPoint = new Point(1, 10)
const endPoint = new Point(11, -3)

const segment = new Segment(beginPoint, endPoint)
const reversedSegment = reverse(segment)

// прямое обращение к свойствам приведено только в демонстрационных целях
console.log(
  segment.beginPoint.x,
  segment.beginPoint.y,
  segment.endPoint.x,
  segment.endPoint.y,
) // => 1 10 11 -3

console.log(
  reversedSegment.beginPoint.x,
  reversedSegment.beginPoint.y,
  reversedSegment.endPoint.x,
  reversedSegment.endPoint.y,
) // => 11 -3 1 10
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
// ==============================
function getBeginPoint() {
  return this.beginPoint
}
function getEndPoint() {
  return this.endPoint
}

function Segment(beginPoint, endPoint) {
  this.beginPoint = beginPoint
  this.endPoint = endPoint
  this.getBeginPoint = getBeginPoint
  this.getEndPoint = getEndPoint
}

export default Segment
// ==============================
function getX() {
  return this.x
}
function getY() {
  return this.y
}

function Point(x, y) {
  this.x = x
  this.y = y
  this.getX = getX
  this.getY = getY
}

export default Point
// =================================
export default (segment) => {
  const originalBegin = segment.getBeginPoint()
  const originalEnd = segment.getEndPoint()

  const newBeginPoint = new Point(originalEnd.getX(), originalEnd.getY())
  const newEndPoint = new Point(originalBegin.getX(), originalBegin.getY())

  return new Segment(newBeginPoint, newEndPoint)
}

// teacher solution
import Point from './Point.js'
import Segment from './Segment.js'

export default (segment) => {
  const beginPoint = segment.getBeginPoint()
  const endPoint = segment.getEndPoint()
  const newEndPoint = new Point(beginPoint.getX(), beginPoint.getY())
  const newBeginPoint = new Point(endPoint.getX(), endPoint.getY())

  return new Segment(newBeginPoint, newEndPoint)
}

```

</details>

## Испытание-6: Прототипы

src/chapter_IntroductionToOOP_JS/trial-6.js
В программировании иногда приходится иметь дело с деньгами. В отличие от большинства других значений, деньги могут существовать в разных валютах, которые конвертируются друг в друга по определенным ставкам (они меняются со временем!). Из-за этого, часто, недостаточно просто хранить количество денег, нужно хранить и их валюту.

Достаточно давно разработчики заметили, что работа с деньгами происходит во всех проектах примерно одинаково. Это привело к созданию определенного подхода (шаблона проектирования) при работе с деньгами. В этом задании мы частично реализуем его.

Money.js
Реализуйте и экспортируйте по умолчанию абстракцию "Деньги". Она знает о валюте денег, позволяет их конвертировать в другие валюты, выполнять арифметические операции и форматировать вывод. Список методов:

- Money(value, currency = 'usd') – создает объект деньги.
- Money.prototype.getValue() – возвращает стоимость в виде числа
- Money.prototype.getCurrency() – возвращает валюту денег
- Money.prototype.exchangeTo(currency) – возвращает новый объект деньги, где значение конвертировано в указанную валюту
- Money.prototype.add(money) – возвращает новый объект деньги, который представляет собой сумму исходных и переданных денег, в валюте исходных денег (внутри возможна конвертация если валюты не совпадают)
- Money.prototype.format() – возвращает локализованное представление денег удобное для вывода

```js
const money1 = new Money(100)

// Возвращает значение
money1.getValue() // 100
money1.getCurrency() // 'usd'

// Конвертирует в указанную валюту и возвращает новое значение
money1.exchangeTo('eur').getValue() // 70

const money2 = new Money(200, 'eur')
money2.getValue() // 200
const money3 = money2.add(money1)
money3.getValue() // 270
const money4 = money3.add(money1)
money4.getValue() // 340

money1.format() // "$100.00"
money2.format() // "€200.00"

const money5 = new Money(10000)
money5.format() // "$10,000.00"
```

Наша реализация поддерживает только две валюты: usd и eur без возможности расширения. Коэффициенты конверсии:

usd -> eur = 0.7
eur -> usd = 1.2
Подсказки
Number.prototype.toLocaleString() – умеет форматировать вывод денег в нужной локали. Если передать undefined первым параметром, то установится текущая локаль. Пример работы метода с локалью "en-US":
(4000).toLocaleString(undefined, { style: 'currency', currency: 'gbp' });
// => £4,000.00
Пример реализации денег на js

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
function getValue() {
  return this.value
}

function getCurrency() {
  return this.current
}

function exchangeTo(targetCurrency) {
  if (this.current === targetCurrency) {
    return Money(this.value, this.current)
  }

  let newValue = this.value

  if (this.current === 'usd' && targetCurrency === 'eur') {
    newValue = this.value * 0.7
  }

  if (this.current === 'eur' && targetCurrency === 'usd') {
    newValue = this.value * 1.2
  }

  return Money(newValue, targetCurrency)
}

function add(money) {
  if (this.current === money.current) {
    const totalValue = this.value + money.value
    return Money(totalValue, this.current)
  }

  const convertedMoney = money.exchangeTo(this.current)
  const totalValue = this.value + convertedMoney.getValue()

  return Money(totalValue, this.current)
}

function format() {
  return this.value.toLocaleString(undefined, {
    style: 'currency',
    currency: this.current.toUpperCase(),
  })
}

function Money(value, current = 'usd') {
  return {
    value,
    current,
    getValue,
    getCurrency,
    exchangeTo,
    add,
    format,
  }
}

export default Money

// teacher solution
export default function Money(value, currency = 'usd') {
  this.value = value
  this.currency = currency
}

Money.prototype.format = function format() {
  // bad design (pass undefined to the function), but it is js
  return this.getValue().toLocaleString(undefined, { style: 'currency', currency: this.getCurrency() })
}

Money.prototype.getValue = function getValue() {
  return this.value
}

Money.prototype.getCurrency = function getCurrency() {
  return this.currency
}

Money.prototype.exchangeTo = function exchangeTo(newCurrency) {
  const currency = this.getCurrency()
  const currentValue = this.getValue()
  if (currency === newCurrency) {
    return new Money(currentValue, currency)
  }

  const rates = {
    usd: {
      eur: 0.7,
    },
    eur: {
      usd: 1.2,
    },
  }

  const newValue = currentValue * rates[currency][newCurrency]
  return new Money(newValue, newCurrency)
}

Money.prototype.add = function add(money) {
  const currency = this.getCurrency()
  const convertedMoney = money.exchangeTo(currency)
  const additionalValue = convertedMoney.getValue()
  return new Money(this.getValue() + additionalValue, currency)
}

```

</details>

## Испытание-7: Упаковка и распаковка (Boxing)

src/chapter_IntroductionToOOP_JS/trial-7.js
Реализуйте и экспортируйте по умолчанию функцию, которая оборачивает переданное значение в объект. Функция может принимать числа или строки. Возвращаемый объект в выражениях должен формировать строку Value is + переданное значение.

Например:

```js
import solution from '../solution.js'

solution(1) + '' // 'Value is 1'
solution(10) + '' // 'Value is 10'
solution('some value') + '' // 'Value is some value'
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const solution = (value) => {
  return {
    value,
    toString() {
      return `Value is ${this.value}`
    },
  }
}

export default solution

// teacher solution
export default value => ({
  value,
  valueOf() {
    return `Value is ${this.value}`
  },
})
```

</details>

## Испытание-8: Класс

src/chapter_IntroductionToOOP_JS/trial-8.js
Cart.js
Реализуйте и экспортируйте по умолчанию класс Cart, представляющий собой покупательскую корзину. Интерфейс:

addItem(item, count) – добавляет в корзину товары и их количество. Товар это объект у которого два свойства: name – имя и price – стоимость.
getItems – возвращает товары в формате [{ item, count }, { item, count }, ...]
getCost – возвращает стоимость корзины. Общая стоимость корзины высчитывается как стоимость всех добавленных товаров с учетом их количества.
getCount – возвращает количество товаров в корзине
Примеры

```js
const cart = new Cart()
cart.addItem({ name: 'car', price: 3 }, 5)
cart.addItem({ name: 'house', price: 10 }, 2)
cart.getItems().length // 2
cart.getCost() // 35
cart.getItems()
// [
//   { item: { name: 'car', price: 3 }, count: 5 },
//   { item: { name: 'house', price: 10 }, count: 2 },
// ]
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
class Cart {
  constructor() {
    this.items = []
  }

  addItem(item, count) {
    this.items.push({ item, count })
  }

  getItems() {
    return this.items
  }

  getCost() {
    return this.items.reduce(
      (acc, current) => acc + current.item.price * current.count,
      0,
    )
  }

  getCount() {
    return this.items.reduce((acc, current) => acc + current.count, 0)
  }
}

export default Cart

// teacher solution
import { sumBy } from 'es-toolkit/compat'

export default class Cart {
  constructor() {
    this.items = []
  }

  addItem(item, count) {
    const items = this.getItems()
    items.push({ item, count })
  }

  getItems() {
    return this.items
  }

  getCount() {
    return sumBy(this.getItems(), goods => goods.count)
  }

  getCost() {
    return sumBy(this.getItems(), goods => goods.item.price * goods.count)
  }
}

```

</details>

## Испытание-9: Статические свойства и методы

src/chapter_IntroductionToOOP_JS/trial-9.js
Класс Time, предназначен для создания объекта времени. Его конструктор принимает на вход количество часов и минут в виде двух отдельных параметров.

```js
const time = new Time(10, 15)
console.log(`The time is ${time}`) // => 'The time is 10:15'
```

Добавьте в класс Time статический метод fromString(), который позволяет создавать объекты Time на основе времени переданного строкой формата часы:минуты.

```js
const time = Time.fromString('10:23')
// автоматически вызывается метод toString()
console.log(`The time is ${time}`) // 'The time is 10:23'
```

```js
export default class Time {
  // BEGIN (write your solution here)

  // END

  constructor(hours, minutes) {
    this.minutes = minutes
    this.hours = hours
  }

  toString() {
    return `${this.hours}:${this.minutes}`
  }
}
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class Time {
  static fromString(time) {
    const [hours, minutes] = time.split(':')
    return new Time(hours, minutes)
  }

  constructor(hours, minutes) {
    this.minutes = minutes
    this.hours = hours
  }

  toString() {
    return `${this.hours}:${this.minutes}`
  }
}

// teacher solution
```

</details>

## Испытание-10: Исключения

src/chapter_IntroductionToOOP_JS/trial-10.js
JSON.JS
Реализуйте и экспортируйте функцию-обёртку parseJson() для функции JSON.parse(), которая работает как встроенная. Но в случае если в функцию была передана некорректная json строка, функция-обёртка должна выбросить исключение ParseError. Класс ParseError реализовывать не нужно, он уже импортирован.

ПРИМЕР:

```js
const json = '{ "key": "value" }'
parseJson(json) // { key: 'value' }

const incorrectJson = '{ key": "value" }'
parseJson(incorrectJson) // => ParseError: Invalid JSON string
```

```js
// ParseError.js
export default class ParseError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ParseError'
  }
}
```

ПОДСКАЗКИ

- [JSON.parse()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import ParseError from './ParseError.js'

export function parseJson(value) {
  try {
    return JSON.parse(value)
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw new ParseError('Invalid JSON string')
  }
}

// teacher solution
```

</details>

## Испытание-11: Круг

src/chapter_IntroductionToOOP_JS/trial-11.js
Circle.js
Реализуйте и экспортируйте по умолчанию класс Circle описывающий круг. У круга есть только одно свойство - его радиус. Реализуйте методы getArea() и getCircumference(), которые вычисляют и возвращают площадь и длину окружности соответственно.

ПРИМЕРЫ

```js
const circle = new Circle(3)
circle.getArea() // 28.274...
```

ПОДСКАЗКИ

- Площадь круга: πr^2
- Длина окружности: 2\*πR

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class Circle {
  static PI = 3.142

  constructor(radius) {
    this.radius = radius
  }

  getArea() {
    return Circle.PI * this.radius ** 2
  }

  getCircumference() {
    return 2 * Circle.PI * this.radius
  }
}

// teacher solution
export default class Circle {
  constructor(radius) {
    this.radius = radius
  }

  getArea() {
    return Math.PI * this.radius ** 2
  }

  getCircumference() {
    return 2 * Math.PI * this.radius
  }
}
```

</details>

## Испытание-12: Генератор квадратов

src/chapter_IntroductionToOOP_JS/trial-12-Square.js, src/chapter_IntroductionToOOP_JS/trial-12-SquaresGenerator.js
Square.js
Реализуйте и экспортируйте по умолчанию класс Square для представления квадрата. У квадрата есть только одно свойство — сторона. Реализуйте метод getSide(), возвращающий значение стороны.

Пример

```js
const square = new Square(10)
square.getSide() // 10
```

SquaresGenerator.js
Реализуйте класс SquaresGenerator со статическим методом generate(), принимающим два параметра: сторону и количество экземпляров квадрата (по умолчанию 5 штук), которые нужно создать. Функция должна вернуть массив из квадратов. Экспортируйте класс по умолчанию.

Пример

```js
const squares = SquaresGenerator.generate(3, 2)
// [new Square(3), new Square(3)]
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class Square {
  constructor(side) {
    this.side = side
  }

  getSide() {
    return this.side
  }
}

export default class SquaresGenerator {
  static generate(side, count = 5) {
    return Array.from({ length: count }, () => new Square(side))
  }
}

// teacher solution
export default class Square {
  constructor(side) {
    this.side = side
  }

  getSide() {
    return this.side
  }
}

export default class SquaresGenerator {
  static generate(side, count = 5) {
    const squares = []
    for (let i = 0; i < count; i += 1) {
      squares[i] = new Square(side)
    }

    return squares
  }
}

```

</details>

## Испытание-13: Построение двоичного дерева

src/chapter_IntroductionToOOP_JS/trial-13.js
Двоичное дерево — иерархическая структура данных, в которой каждый узел имеет не более двух потомков (детей). Как правило, первый называется родительским узлом, а дети называются левым и правым наследниками.

В данном испытании мы будем использовать подвид двоичного дерева — двоичное дерево поиска. Правильное дерево не содержит повторяющихся ключей, и для каждого узла гарантируется, что в левом поддереве все значения меньше текущего, а в правом — больше.

Реализуйте и экспортируйте по умолчанию класс, который реализует представление узла.

Класс должен содержать:

- Геттер getKey() — возвращает ключ.
- Геттеры getLeft(), getRight() — возвращают соответственно левого и правого ребёнка. Если ребёнок в узле отсутствует, геттер возвращает null.
- Метод insert(key) — выполняет добавление узла, формируя правильное двоичное дерево.

Примеры

```js
const tree = new Node()
tree.insert(9)
tree.insert(17)
tree.insert(4)
tree.insert(3)
tree.insert(6)

tree.getKey() // 9
tree.getLeft().getKey() // 4
tree.getRight().getKey() // 17
tree.getLeft().getLeft().getKey() // 3
tree.getLeft().getRight().getKey() // 6
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class Node {
  constructor(key = null) {
    this.key = key
    this.left = null
    this.right = null
  }

  insert(key) {
    if (this.key === null) {
      this.key = key
      return
    }

    if (key < this.key) {
      if (this.left === null) {
        this.left = new Node(key)
      } else {
        this.left.insert(key)
      }
    } else if (key > this.key) {
      if (this.right === null) {
        this.right = new Node(key)
      } else {
        this.right.insert(key)
      }
    }
  }

  getKey() {
    return this.key
  }

  getLeft() {
    return this.left
  }

  getRight() {
    return this.right
  }
}

// teacher solution
export default class Node {
  constructor() {
    this.key = null
    this.left = null
    this.right = null
  }

  getLeft() {
    return this.left
  }

  getRight() {
    return this.right
  }

  getKey() {
    return this.key
  }

  insert(key) {
    if (this.key === null) {
      this.key = key
    }
    if (key < this.key) {
      if (this.left === null) {
        this.left = new Node()
      }
      this.left.insert(key)
    }
    if (key > this.key) {
      if (this.right === null) {
        this.right = new Node()
      }
      this.right.insert(key)
    }
  }
}
```

</details>

## Испытание-14: Генератор случайных чисел

src/chapter_IntroductionToOOP_JS/trial-14.js
Реализуйте генератор случайных чисел, представленный классом Random. Интерфейс объекта включает в себя три функции:

- Конструктор. Принимает на вход seed, начальное число генератора псевдослучайных чисел.
- getNext() — метод, возвращающий новое случайное число.
- reset() — метод, сбрасывающий генератор на начальное значение.

Экспортируйте класс по умолчанию.

Примеры

```js
const seq = new Random(100)
const result1 = seq.getNext()
const result2 = seq.getNext()

result1 !== result2 // true

seq.reset()

const result21 = seq.getNext()
const result22 = seq.getNext()

result1 === result21 // true
result2 === result22 // true
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class Random {
  constructor(seed) {
    this.initialSeed = seed
    this.currentSeed = seed
  }

  getNext() {
    this.currentSeed = (1103515245 * this.currentSeed + 12345) % 2147483648
    return this.currentSeed
  }

  reset() {
    this.currentSeed = this.initialSeed
  }
}

// teacher solution
export default class Random {
  constructor(seed) {
    this.seed = seed
    this.init = seed
  }

  reset() {
    this.seed = this.init
  }

  getNext() {
    const a = 45 + this.init
    const c = 21 + this.init
    const m = 67 + this.init

    this.seed = (a * this.seed + c) % m

    return this.seed
  }
}

```

</details>

## Испытание-15: Агрегация в двоичном дереве

src/chapter_IntroductionToOOP_JS/trial-15.js
В данном испытании мы будем использовать двоичное дерево, и выполнять агрегацию данных.

Node.js
Реализуйте следующие методы в классе:

- getCount() — возвращает количество узлов в дереве.
- getSum() — возвращает сумму всех ключей дерева.
- toArray() — возвращает одномерный массив содержащий все ключи.
- toString() — возвращает строковое представление дерева.
- every(fn) — проверяет, удовлетворяют ли все ключи дерева условию, заданному в передаваемой функции.
- some(fn) - проверяет, удовлетворяет ли какой-либо ключ дерева условию, заданному в передаваемой функции.

При обходе дерева нужно использовать порядок слева направо. То есть вначале обрабатываем ключ узла, затем ключ левого ребёнка, после чего ключ правого ребёнка.

Примеры

```js
const tree = new Node(
  9,
  new Node(4, new Node(8), new Node(6, new Node(3), new Node(7))),
  new Node(17, null, new Node(22, null, new Node(20))),
)

tree.getCount() // 9
tree.getSum() // 96
tree.toArray() // [9, 4, 8, 6, 3, 7, 17, 22, 20]
tree.toString() // '(9, 4, 8, 6, 3, 7, 17, 22, 20)'

tree.every((key) => key <= 22) // true
tree.every((key) => key < 22) // false
tree.some((key) => key < 4) // true
tree.some((key) => key > 22) // false
```

Подсказки

- Двоичное дерево
- Для реализации каждого из методов потребуется выполнить обход всех узлов дерева.
- Вспомните принцип работы метода reduce для массивов.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class Node {
  constructor(key = null, left = null, right = null) {
    this.key = key
    this.left = left
    this.right = right
  }

  getCount() {
    if (this.key === null) {
      return 0
    }

    const leftCount = this.left ? this.left.getCount() : 0
    const rightCount = this.right ? this.right.getCount() : 0

    return 1 + leftCount + rightCount
  }

  getSum() {
    if (this.key === null) {
      return 0
    }

    const leftSum = this.left ? this.left.getSum() : 0
    const rightSum = this.right ? this.right.getSum() : 0

    return this.key + leftSum + rightSum
  }

  toArray() {
    if (this.key === null) {
      return []
    }

    const result = [this.key]

    if (this.left) {
      result.push(...this.left.toArray())
    }

    if (this.right) {
      result.push(...this.right.toArray())
    }

    return result
  }

  toString() {
    if (this.key === null) {
      return '()'
    }

    return `(${this.toArray().join(', ')})`
  }

  every(callback) {
    if (this.key === null) {
      return true
    }

    if (!callback(this.key)) {
      return false
    }

    if (this.left && !this.left.every(callback)) {
      return false
    }

    if (this.right && !this.right.every(callback)) {
      return false
    }

    return true
  }

  some(callback) {
    if (this.key === null) {
      return false
    }

    if (callback(this.key)) {
      return true
    }

    if (this.left && this.left.some(callback)) {
      return true
    }

    if (this.right && this.right.some(callback)) {
      return true
    }

    return false
  }
}

// teacher solution
export default class Node {
  constructor(key = null, left = null, right = null) {
    this.key = key
    this.left = left
    this.right = right
  }

  reduce(fn, initialValue) {
    let acc = fn(initialValue, this.key)

    if (this.left !== null) {
      acc = this.left.reduce(fn, acc)
    }
    if (this.right !== null) {
      acc = this.right.reduce(fn, acc)
    }

    return acc
  }

  getCount() {
    return this.reduce(acc => acc + 1, 0)
  }

  getSum() {
    return this.reduce((acc, key) => acc + key, 0)
  }

  toArray() {
    return this.reduce((acc, key) => [...acc, key], [])
  }

  toString() {
    return `(${this.toArray().join(', ')})`
  }

  some(fn) {
    return this.reduce((acc, key) => acc || fn(key), false)
  }

  every(fn) {
    return this.reduce((acc, key) => acc && fn(key), true)
  }

}
```

</details>

## Испытание-16: Поиск в двоичном дереве

src/chapter_IntroductionToOOP_JS/trial-16.js
Двоичное дерево поиска состоит из узлов, каждый из которых содержит значение ключа и два поддерева (левое и правое), которые в свою очередь также являются двоичными деревьями. Правильное дерево не содержит повторяющихся ключей, и для каждого узла гарантируется, что в левом поддереве все значения меньше текущего, а в правом — больше.

Реализуйте и экспортируйте по умолчанию класс, который реализует представление узла. Конструктор класса принимает на вход значение ключа (число), и двух детей, которые в свою очередь также являются узлами. Дерево может быть создано пустым.

Класс должен содержать методы:

- Геттер getKey() — возвращает ключ. Если дерево пустое, возвращает null.
- Геттеры getLeft(), getRight() — возвращают соответственно левого и правого ребёнка. Если ребёнок в узле отсутствует, геттер возвращает null.
- search(key) — выполняет поиск узла в правильном двоичном дереве по ключу и возвращает узел. Если узел не найден, возвращается null.

Примеры

```js
const tree = new Node(
  9,
  new Node(4, new Node(3), new Node(6, new Node(5), new Node(7))),
  new Node(17, null, new Node(22, new Node(20), null)),
)

const node = tree.search(6)
node.getKey() // 6
node.getLeft().getKey() // 5
node.getRight().getKey() // 7

tree.search(35) // null
tree.search(3).getLeft() // null
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class Node {
  constructor(key = null, left = null, right = null) {
    this.key = key
    this.left = left
    this.right = right
  }

  getKey() {
    return this.key
  }

  getLeft() {
    return this.left
  }

  getRight() {
    return this.right
  }

  search(key) {
    if (this.key === key) {
      return this
    }

    if (key < this.key && this.left !== null) {
      return this.left.search(key)
    }

    if (key > this.key && this.right !== null) {
      return this.right.search(key)
    }

    return null
  }
}

// teacher solution
export default class Node {
  constructor(key = null, left = null, right = null) {
    this.key = key
    this.left = left
    this.right = right
  }

  getLeft() {
    return this.left
  }

  getRight() {
    return this.right
  }

  getKey() {
    return this.key
  }

  search(key) {
    const nodeKey = this.getKey()
    const right = this.getRight()
    const left = this.getLeft()

    if (key === nodeKey) {
      return this
    }
    if (key < nodeKey && left) {
      return left.search(key)
    }
    if (key > nodeKey && right) {
      return right.search(key)
    }

    return null
  }
}

```

</details>

## Испытание-17: Сбалансированное двоичное дерево

src/chapter_IntroductionToOOP_JS/trial-17.js
Особенность структуры двоичного дерева даёт хороший прирост к эффективности при поиске нужного значения. Для этого нужно, чтобы двоичное дерево было сбалансированным. То есть необходимо построить дерево так, чтобы общее количество узлов в левом и правом поддеревьях было примерно одинаковым для любого узла дерева.

Реализуйте метод isBalanced(), который проверяет дерево на сбалансированность. Он возвращает true, если количество узлов в левом и правом поддеревьях каждого узла отличается не более, чем на 2. В ином случае метод должен вернуть false.

Примеры

```js
const tree1 = new Node(4, new Node(3, new Node(2)))

tree1.isBalanced() // true

const tree2 = new Node(4, new Node(3, new Node(2, new Node(1))))

tree2.isBalanced() // false
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class Node {
  constructor(key = null, left = null, right = null) {
    this.key = key
    this.left = left
    this.right = right
  }

    reduce(fn, initialValue) {
    let acc = fn(initialValue, this.key)

    if (this.left !== null) {
      acc = this.left.reduce(fn, acc)
    }

    if (this.right !== null) {
      acc = this.right.reduce(fn, acc)
    }

    return acc
  }

  getCount() {
    return this.reduce((acc) => acc + 1, 0)
  }

  isBalanced() {
    const leftHeight = this.left ? this.left.getCount() : 0
    const rightHeight = this.right ? this.right.getCount() : 0

    if (Math.abs(leftHeight - rightHeight) > 2) {
      return false
    }

    const leftBalanced = this.left ? this.left.isBalanced() : true
    const rightBalanced = this.right ? this.right.isBalanced() : true

    return leftBalanced && rightBalanced
  }
}

// teacher solution
export default class Node {
  constructor(key = null, left = null, right = null) {
    this.key = key
    this.left = left
    this.right = right
  }

  measure(threshold = 2) {
    const delegateTo = node => (
      node ? node.measure(threshold) : { balanced: true, count: 0 }
    )

    const { balanced: balanceLeft, count: countLeft } = delegateTo(this.left)
    const { balanced: balanceRight, count: countRight } = delegateTo(this.right)

    const balanced = balanceLeft && balanceRight && Math.abs(countLeft - countRight) <= threshold
    const count = countLeft + countRight + 1

    return { balanced, count }
  }

  isBalanced() {
    const { balanced } = this.measure()
    return balanced
  }
}

```

</details>

## Испытание-18: Бесконечные функции

src/chapter_IntroductionToOOP_JS/trial-18.js
Это задание хоть и небольшое, но хитрое, его иногда задают на собеседованиях. Если не получится его решить сразу – не сдавайтесь. Оно стоит того, чтобы разобраться. Посмотрите обсуждения, там будет множество подсказок в других формулировках.

Реализуйте и экспортируйте по умолчанию функцию, которая работает следующим образом:

- Принимает на вход любое количество аргументов и возвращает функцию, которая, в свою очередь, принимает на вход любое количество аргументов и так до бесконечности (привет, рекурсия ;)).
- Аргументами могут быть только числа.
- Результат вызова этой функции при проверке на равенство должен быть равен сумме всех аргументов всех подфункций.

```js
import magic from './magic.js'

magic() == 0 // true
magic(5, 2, -8) == -1 // true
magic(1, 2)(3, 4, 5)(6)(7, 10) == 38 // true
magic(4, 8, 1, -1, -8)(3)(-3)(7, 2) == 13 // true
```

Подсказки
Объекты в JS по умолчанию имеют метод valueOf(), который вызывается автоматически в тех местах, где требуется преобразование к числовому значению (контекст арифметических операций и операций нестрогого сравнения). В ситуации выше, во время сравнения, JS вызовет valueOf() для нашей функции. Этим можно воспользоваться для того, чтобы возвращать сумму через valueOf().

```js
const obj = {}
obj + 3 // '[object Object]3'
obj.valueOf = () => 3
obj + 7 // 10
```

Алгоритм

- Для решения задачи вам понадобится создать внутри ещё одну функцию.
- Возврат функции из функции позволит сохранять результат предыдущих вычислений.
- Функции — это объекты, используйте данную особенность. Она позволит отдавать результат вычислений только в нужный момент.
- Внимательно изучите теорию и примените подходы из неё для этой практики.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
function magic(...args) {
  const currentSum = args.reduce((acc, x) => acc + x, 0)

  const inner = (...nextArgs) => {
    const nextSum = nextArgs.reduce((acc, x) => acc + x, 0)

    return magic(currentSum + nextSum)
  }

  inner.valueOf = () => currentSum

  return inner
}

export default magic

// teacher solution
const f = (...numbers) => {
  const sum = numbers.reduce((acc, x) => (x + acc), 0)
  const inner = (...rest) => f(sum, ...rest)
  inner.valueOf = () => sum

  return inner
}

export default f

```

</details>
