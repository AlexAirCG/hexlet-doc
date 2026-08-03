=====================================================
ГЛАВА: JS: ОБЪЕКТНО-ОРИЕНТИРОВАННЫЙ ДИЗАЙН
=====================================================

=========================================================
ТЕОРИЯ: О КУРСЕ
=========================================================
В этом курсе упор делается на использование объектов с примерами реальных библиотек. Построение цепочек вызовов, работа со структурами данных, оперирование датами и строками в объектно-ориентированном стиле — это неполный перечень того, с чем мы столкнемся.

В этом курсе не изучается новый синтаксис, его и так было очень много. ООП — сложная тема, и вводить новые понятия нужно достаточно осторожно, набравшись немного опыта работы с основными концепциями. Отдельной темой, проходящей красной нитью сквозь все дальнейшее обучение являются шаблоны проектирования или паттерны — подходы для решения типовых задач.

- Текучий интерфейс (Fluent Interface)
- Передача сообщений
- Прокси-объекты (Proxy)
- Структуры данных (ООП версии)
- Работа с датами
- Классы конфигураторы

===========================================================
ТЕОРИЯ: ШАБЛОНЫ ПРОЕКТИРОВАНИЯ
===========================================================

"Шаблоны проектирования" (или "паттерны") стали неотъемлемой частью современной разработки.

```text
Шаблон проектирования или паттерн (англ. design pattern) в разработке программного обеспечения — повторяемая архитектурная конструкция, представляющая собой решение проблемы проектирования в рамках некоторого часто возникающего контекста. (Wiki)
```

Простым языком, определение звучит так: типовое решение для типовой задачи. Термин пришел в программирование из архитектуры. В 1970-е годы архитектор Кристофер Александр составил набор шаблонов проектирования, типовых решений для различных архитектурных задач. Спустя полтора десятка лет эта идея была заимствована и адаптирована применительно к разработке графических оболочек языка SmallTalk. Сейчас паттерны встречаются повсеместно, постоянно изобретаются и переизобретаются. Некоторые из них описывают задачи, связанные с небольшим участком кода, другие определяют, например, способы работы в распределенных системах. Причем последние отвязаны от языка программирования. Интересный факт: некоторые шаблоны в языках появились вследствие ограничений самих языков и пытаются обойти их.

Как минимум один паттерн проектирования мы уже знаем по уроку "статические свойства и методы". Его называют Money – объект-значение, описывающий собой деньги.

```js
class Money {
  constructor(amount, currency = 'usd') {
    this.amount = amount
    this.currency = currency
  }
}
```

Возможно, вы удивитесь, что для такой примитивной задачи придуман целый паттерн, и будете правы. Паттерн — не обязательно что-то сложное и доступное только избранным. Паттерном называют любую задачу, которая повторяется безотносительно оценки сложности решения. Поэтому, хотите вы того или нет, в вашем коде уже встречаются шаблоны проектирования, даже если вы об этом не знаете. Правда, до некоторых типовых решений самостоятельно дойти крайне сложно.

Насколько важно изучать шаблоны проектирования? Большинство описаний шаблонов в интернете завязано на конкретную книгу. Далеко не все паттерны, описанные в ней, полезны и встречаются в обычной жизни. Многие из них специфицированы под конкретные языки и не применимы в том же виде в других языках. Еще больше паттернов (на порядки) в этой книге не описано.

Как только появились паттерны, то не могли не появиться и антипаттерны. Антипаттерн — такое же типовое решение (потому что им часто пользуются), но создающее больше проблем, чем приносящее пользы. Обычно такие решения возникают из-за непонимания причинно-следственных связей в коде.

С паттернами и антипаттернами мы будем знакомиться на протяжении всех дальнейших курсов.

===========================================================
ТЕОРИЯ: КОНФИГУРАЦИЯ
===========================================================

https://ru.hexlet.io/courses/js-object-oriented-design/lessons/configuration/theory_unit

==============================================================
Испытание-1: КОНФИГУРАЦИЯ
==============================================================

Валидация - процесс проверки корректности данных. В вебе происходит всегда при отправке форм, например, регистрация на многих сайтах проверяет корректность введённого емейла, его уникальность (что такого пользователя ещё нет).

Каждый тип валидации в таких системах обычно представлен классом-валидатором, который принимает на вход опции и предоставляет интерфейс в виде функции validate(). Эта функция принимает на вход то, что проверяется (валидируется) и возвращает массив или объект с ошибками. Если объект пустой, значит ошибок нет.

Реализуйте и экспортируйте по умолчанию класс PasswordValidator, ориентируясь на тесты.

Этот валидатор поддерживает следующие опции:

- minLength (по умолчанию 8) - минимальная длина пароля
- containNumbers (по умолчанию true) - требование содержать хотя бы одну цифру

Опции передаются одним объектом в конструктор валидатора.

```js
const validator = new PasswordValidator({ containNumbers: false })
validator.validate('qwertyui') // {}
validator.validate('qwerty') // { minLength: 'too small' }
```

Объект ошибок в ключах содержит название опции, а в значениях текст, указывающий на ошибку (тексты можно подсмотреть в тестах).

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class PasswordValidator {
  constructor(customOptions = {}) {
    const defaultOptions = {
      minLength: 8,
      containNumbers: true,
    }
    this.options = { ...defaultOptions, ...customOptions }
  }

  validate(password) {
    const errors = {}

    if (password.length < this.options.minLength) {
      errors.minLength = 'too small'
    }

    if (this.options.containNumbers) {
      const hasNumber = /\d/.test(password)

      if (!hasNumber) {
        errors.containNumbers = 'should contain at least one number'
      }
    }

    return errors
  }
}

// teacher solution
const hasNumber = string => (string.search(/\d/) !== -1)

export default class PasswordValidator {
  constructor(options = {}) {
    const defaultOptions = {
      minLength: 8,
      containNumbers: true,
    }

    this.options = { ...defaultOptions, ...options }
  }

  validate(password) {
    const errors = {}

    if (password.length < this.options.minLength) {
      errors.minLength = 'too small'
    }

    if (this.options.containNumbers) {
      if (!hasNumber(password)) {
        errors.containNumbers = 'should contain at least one number'
      }
    }

    return errors
  }
}

```

</details>

===============================================================
ТЕОРИЯ: ИЗМЕНЯЕМАЯ КОНФИГУРАЦИЯ
===============================================================

https://ru.hexlet.io/courses/js-object-oriented-design/lessons/configuration-setters/theory_unit

===============================================================
Испытание-2: ИЗМЕНЯЕМАЯ КОНФИГУРАЦИЯ
===============================================================

Для работы с текстом в вебе бывает полезна функция truncate(), которая обрезает слишком длинный текст и ставит в конце многоточие:

```js
truncate('long text', { length: 3 }) // lon...
```

Реализуйте в классе Truncater конструктор и метод truncate(). Метод принимает текст и следующие опции:

- separator - символ, заменяющий обрезанную часть строки
- length - максимальная длина исходной строки. Если строка не длиннее, чем эта опция, то возвращается исходная строка.

Конфигурацию по умолчанию можно переопределить через конструктор класса и вторым аргументом метода truncate(). Оба способа можно комбинировать.

```js
const truncater = new Truncater()
truncater.truncate('one two') // 'one two'
truncater.truncate('one two', { length: 6 }) // 'one tw...'

const truncater = new Truncater({ length: 6 })
truncater.truncate('one two', { separator: '.' }) // 'one tw.'
truncater.truncate('one two', { length: 3 }) // 'one...'
```

Подсказки

- Опции по умолчанию заданы, как статическое свойство класса. Обратите на это внимание при объединении исходных опций с пользовательскими.
- При решении можно (не обязательно) использовать методы String.prototype.substring() и String.prototype.concat()

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class Truncater {
  static defaultOptions = {
    separator: '...',
    length: 200,
  }

  constructor(customOptions = {}) {
    this.options = { ...Truncater.defaultOptions, ...customOptions }
  }

  truncate(string, options = {}) {
    const currentOption = { ...this.options, ...options }

    if (string.length > currentOption.length) {
      const strShort = string.slice(0, currentOption.length)
      return `${strShort}${currentOption.separator}`
    }

    return string
  }
}

// teacher solution
export default class Truncater {
  static defaultOptions = {
    separator: '...',
    length: 200,
  }

  constructor(options = {}) {
    this.options = { ...this.constructor.defaultOptions, ...options }
  }

  truncate(text, options = {}) {
    const { length, separator } = { ...this.options, ...options }
    return (text.length <= length) ? text : text.substring(0, length).concat(separator)
  }
}

```

</details>

================================================================
ТЕОРИЯ: ОБЪЕКТЫ-СУЩНОСТИ, ОБЪЕКТЫ-ЗНАЧЕНИЯ И ВНЕДРЕННЫЕ ОБЪЕКТЫ
================================================================

https://ru.hexlet.io/courses/js-object-oriented-design/lessons/modeling/theory_unit

=====================================================================
Испытание-3: ОБЪЕКТЫ-СУЩНОСТИ, ОБЪЕКТЫ-ЗНАЧЕНИЯ И ВНЕДРЕННЫЕ ОБЪЕКТЫ
=====================================================================
В данном упражнении нам предстоит реализовать класс-обёртку над стандартным классом URL. Наш класс будет предоставлять другие методы и немного расширять возможности стандартного.

Реализуйте и экспортируйте по умолчанию класс для работы с HTTP-адресом. Класс должен содержать конструктор и методы:

- конструктор — принимает на вход HTTP-адрес в виде строки
- getScheme() — возвращает протокол передачи данных (без двоеточия)
- getHostName() — возвращает имя хоста
- getQueryParams() — возвращает параметры запроса в виде пар ключ-значение объекта
- getQueryParam() — получает значение параметра запроса по имени. Если параметр с переданным именем не существует, метод возвращает значение заданное вторым параметром (по умолчанию равно null)
- equals(url) — принимает объект класса Url и возвращает результат сравнения с текущим объектом — true или false

```js
const url = new Url('http://yandex.ru:80?key=value&key2=value2')
url.getScheme() // 'http'
url.getHostName() // 'yandex.ru'
url.getQueryParams()
// {
//   key: 'value',
//   key2: 'value2',
// };
url.getQueryParam('key') // 'value'
// второй параметр - значение по умолчанию
url.getQueryParam('key2', 'lala') // 'value2'
url.getQueryParam('new', 'ehu') // 'ehu'
url.getQueryParam('new') // null
url.equals(new Url('http://yandex.ru:80?key=value&key2=value2')) // true
url.equals(new Url('http://yandex.ru:80?key=value')) // false
```

Подсказки

- В процессе прохождения испытания нужно будет хорошо поработать с документацией и изучить возможности стандартного класса URL. Это поможет использовать его для парсинга адреса на нужные составляющие.
- Не используйте в решении устаревшие возможности, помеченные как deprecated (parse, format и другие).
- Для работы с query string изучите методы класса URLSearchParams.
- Для преобразования списка пар ключ-значение в объект можно использовать метод Object.fromEntries()
- Что означает двойной знак вопроса "??" в выражении?

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class Url {
  constructor(url) {
    this.internalUrl = new URL(url)
  }

  getScheme() {
    return this.internalUrl.protocol.slice(0, -1)
  }

  getHostName() {
    return this.internalUrl.hostname
  }

  getQueryParams() {
    return Object.fromEntries(this.internalUrl.searchParams)
  }

  getQueryParam(key, defaultValue = null) {
    const value = this.internalUrl.searchParams.get(key)
    return value !== null ? value : defaultValue
  }

  equals(urlInstance) {
    return this.internalUrl.href === urlInstance.internalUrl.href
  }
}

// teacher solution
export default class Url {
  constructor(url) {
    this.url = new URL(url)
    this.url.scheme = this.url.protocol.slice(0, -1)
    this.url.queryParams = Object.fromEntries(this.url.searchParams)
  }

  getScheme() {
    return this.url.scheme
  }

  getHostName() {
    return this.url.hostname
  }

  getQueryParams() {
    return this.url.queryParams
  }

  getQueryParam(key, defaultValue = null) {
    return this.url.searchParams.get(key) ?? defaultValue
  }

  toString() {
    return this.url.toString()
  }

  equals(url) {
    return (this.toString() === url.toString())
  }
}

```

</details>

=======================================================================
ТЕОРИЯ: FLUENT INTERFACE
=======================================================================
https://ru.hexlet.io/courses/js-object-oriented-design/lessons/fluent-interface/theory_unit

================================================================
Испытание-4: FLUENT INTERFACE
================================================================

Эту задачу можно решить огромным числом способов. Почти наверняка ваш способ будет не такой, как решение учителя.

Мы не даём никаких подсказок насчет того, какие функции нужно использовать. Как минимум вы знаете главную тройку map, filter и reduce.

Реализуйте и экспортируйте по умолчанию функцию normalize() которая принимает на вход список городов и стран, нормализует их имена, сортирует города и группирует их по стране.

```js
import normalize from './solution.js'

const countries = [
  { name: 'Miami', country: 'usa' },
  { name: 'samarA', country: '  ruSsiA' },
  { name: 'Moscow ', country: ' Russia' },
]

normalize(countries)
// {
//   russia: [
//     'moscow',
//     'samara',
//   ],
//   usa: [
//     'miami',
//   ],
// }
```

Подсказки

- Сигналы
- Получить только уникальные значения можно через специальный объект Set
- Урок Set

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const normalize = (coll) => {
  const uniqueKeys = new Set()

  return coll
    .map((el) => ({
      name: el.name.trim().toLowerCase(),
      country: el.country.trim().toLowerCase(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((el) => {
      const key = `${el.country}-${el.name}`
      if (uniqueKeys.has(key)) {
        return false
      }
      uniqueKeys.add(key)
      return true
    })
    .reduce((acc, el) => {
      if (!acc[el.country]) {
        acc[el.country] = []
      }
      acc[el.country].push(el.name)
      return acc
    }, {})
}

export default normalize

// teacher solution
export default data => data
  .map(({ name, country }) => ({ city: name.toLowerCase(), country: country.toLowerCase() }))
  .map(({ city, country }) => ({ city: city.trim(), country: country.trim() }))
  .map(({ city, country }) => [country, city])
  .sort() // sort countries and cities
  .reduce((acc, [country, city]) => {
    const citiesAcc = acc[country] ?? []
    const cities = citiesAcc.concat(city)
    const uniqueCities = new Set(cities)
    return { ...acc, [country]: [...uniqueCities] }
  }, {})

```

</details>

================================================================
ТЕОРИЯ: СБОРЩИКИ
================================================================
https://ru.hexlet.io/courses/js-object-oriented-design/lessons/builder/theory_unit

===========================================
Испытание-5: СБОРЩИКИ
===========================================
Сотрудники библиотеки решили провести ревизию базы данных своих книг, все ли заполнено правильно. Для этого им понадобится программа, которая находит список книг с неправильно заполненными данными.

Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список книг, находит среди них невалидные и возвращает их наружу.

```js
import getInvalidBooks from './index.js'

const books = [{ name: 'book', author: 'author' }, { author: 'author 2' }]
const invalidBooks = getInvalidBooks(books) // [{ author: 'author 2' }]
```

Описания формата каждой книги:

- name – строка, обязательное
- author – строка, обязательное
- pagesCount – целое положительное число, необязательное
- link – строка url, необязательное, не может быть пустой строкой; ссылка на книгу в интернете
- genre – строка, необязательное; жанр книги. Должен входить в список определенный в файле index.js

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import yup from 'yup'

const genres = [
  'drama', 'horror', 'fantasy', 'classic',
]

const getInvalidBooks = (books) => {
  const bookShema = yup.object().shape({
    name: yup.string().required(),
    author: yup.string().required(),
    pagesCount: yup.number().integer().positive().nullable().optional(),
    link: yup.string().min(1).url().nullable().optional(),
    genre: yup
      .string()
      .trim()
      .transform((value) => (value === '' ? null : value))
      .oneOf(genres)
      .nullable()
      .optional(),
  })
  return books.filter((book) => !bookShema.isValidSync(book))
}

export default getInvalidBooks

// teacher solution
import yup from 'yup'

const genres = [
  'drama', 'horror', 'fantasy', 'classic',
]

export default (books) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    author: yup.string().required(),
    pagesCount: yup.number().integer().positive(),
    link: yup.string().min(1).url(),
    genre: yup.string().oneOf(genres),
  })

  return books.filter(book => !schema.isValidSync(book))
}

```

</details>

===========================================================
ТЕОРИЯ: ПРОКСИ
===========================================================
https://ru.hexlet.io/courses/js-object-oriented-design/lessons/proxy/theory_unit

=======================================================
Испытание-6: ПРОКСИ
=======================================================
Реализуйте и экспортируйте по умолчанию функцию, которая принимает объект и список полей объекта, к которым она будет ограничивать доступ. При попытке прочитать или перезаписать поле, включенное в список защищенных, должно выбрасываться исключение.

```js
import protect from '../protect.js'

const user = {
  name: 'John',
  age: 25,
  password: 'secret',
}

const protectedProps = ['password']

const protectedUser = protect(user, protectedProps)
protectedUser.name // John
protectedUser.age // 25
protectedUser.password // Error: Access to 'password' is restricted

protectedUser.name = 'Jane' // установит значение 'Jane' в свойство 'name'
protectedUser.password = 'newPassword' // Error: Access to 'password' is restricted
```

В реализации используйте Proxy.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const protect = (targetObj, protectedProps) => {
  return new Proxy(targetObj, {
    get(target, prop) {
      if (protectedProps.includes(prop)) {
        throw new Error(`Access to '${prop}' is restricted`)
      }
      return target[prop]
    },
    set(target, prop, value) {
      if (protectedProps.includes(prop)) {
        throw new Error(`Access to '${prop}' is restricted`)
      }
      target[prop] = value
      return true
    },
  })
}

export default protect

// teacher solution
const validateProperty = (prop, protectedProps) => {
  if (protectedProps.includes(prop)) {
    throw new Error(`Access to '${prop}' is restricted`)
  }
}

const protect = (obj, protectedProps) => new Proxy(obj, {
  get(target, prop) {
    validateProperty(prop, protectedProps)
    return target[prop]
  },

  set(target, prop, value) {
    validateProperty(prop, protectedProps)
    target[prop] = value
    return true
  },
})

export default protect

```

</details>

===========================================================
ТЕОРИЯ: ПИШЕМ КОД ПРАВИЛЬНО
===========================================================

https://ru.hexlet.io/courses/js-object-oriented-design/lessons/right-way-to-write-code/theory_unit

=======================================================
Испытание-7: ОСОБЫЙ ОБЪЕКТ
=======================================================
Объекты JavaScript позволяют обращаться к собственным свойствам. При обращении к свойству, которое не было установлено, возвращается undefined:

```js
const obj = {
  key: 'value',
  key2: {
    key3: 'value3',
  },
}

obj.key2 // { key3: 'value3' }
obj.key2.key1 // undefined
obj.key2.key1.key0 // Uncaught TypeError: Cannot read property 'key0' of undefined
```

В этом испытании мы реализуем особый объект, позволяющий обращаться к несуществующим свойствам, не получая ошибки.

Реализуйте и экспортируйте по умолчанию функцию, которая принимает объект и позволяет получать из него свойства по любому имени. При обращении к несуществующему свойству не должно выбрасываться исключений или возвращаться undefined. Функция должна возвращать объект Proxy.

```js
import createObject from './object.js'

const obj = createObject({
  key: 'value',
  key2: {
    key3: 'value3',
  },
})

obj.key2 // { key3: 'value3' }

// код корректно продолжает работу:
obj.key2.key1 // {}
obj.key2.key1.key0 // {}
obj.obj.obj // {}
```

Подсказки
Урок "Прокси" - https://ru.hexlet.io/courses/js-object-oriented-design/lessons/proxy/theory_unit
Документация по Proxy на MDN - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Proxy

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const createObject = (coll) => {
  return new Proxy(coll, {
    get(target, key) {
      if (key in target) {
        const value = target[key]
        if (typeof value === 'object' && value !== null) {
          return createObject(value)
        }
        return value
      }

      return createObject({})
    },
  })
}

// teacher solution
const createObject = (object) =>
  new Proxy(object, {
    get: (target, name) => {
      if (!(name in target)) {
        return createObject({})
      }
      const value = target[name]
      return value !== null && typeof value === 'object'
        ? createObject(value)
        : value
    },
  })

export default createObject
```

</details>

=======================================================
Испытание-8: ПЬЯНИЦА
=======================================================
Пьяница — карточная игра, в которой побеждает тот игрок, который собирает все карты. В нашей задаче используется модификация игры с двумя игроками. Игрокам раздаётся равное количество карт. Игроки не смотрят в свои карты, а кладут их в стопку рядом с собой. Затем каждый игрок снимает верхнюю карту и показывает её сопернику. Тот игрок, чья карта оказалась большего номинала, берёт обе карты и кладёт их к себе в колоду снизу (так что своя карта идёт первой). Если карты имеют одинаковый номинал, то они выкидываются из игры. В игре возможны три исхода:

- У обоих игроков не осталось карт
- Игра не может закончиться
- Победил один из игроков

Реализуйте и экспортируйте по умолчанию класс с методом run(), принимающим на вход два списка чисел, которые представляют собой карты для первого и второго игроков.

- Если выиграл первый игрок, то метод должен вернуть First player. Round: <номер раунда>.
- Если выиграл второй игрок, то метод должен вернуть Second player. Round: <номер раунда>.
- Если у игроков не осталось карт, то метод должен вернуть Botva!
- Если за 100 раундов не удалось выявить победителя то также возвращается Botva!

Реальные примеры смотрите в тестах.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class Drunkard {
  run(cards1, cards2) {
    const deck1 = [...cards1]
    const deck2 = [...cards2]

    let round = 0

    while (deck1.length > 0 && deck2.length > 0 && round < 100) {
      round += 1

      const card1 = deck1.shift()
      const card2 = deck2.shift()

      if (card1 > card2) {
        deck1.push(card1, card2)
      } else if (card2 > card1) {
        deck2.push(card2, card1)
      }

      if (deck1.length > 0 && deck2.length === 0) {
        return `First player. Round: ${round}`
      }

      if (deck2.length > 0 && deck1.length === 0) {
        return `Second player. Round: ${round}`
      }
    }
    return 'Botva!'
  }
}

// teacher solution (the best solution according to AI)
import { cloneDeep } from 'es-toolkit'

export default class Drunkard {
  run(cards1, cards2) {
    const deck1 = cloneDeep(cards1)
    const deck2 = cloneDeep(cards2)

    for (let round = 0; round < 100; round += 1) {
      const deck1IsEmpty = deck1.length === 0
      const deck2IsEmpty = deck2.length === 0

      if (deck1IsEmpty && deck2IsEmpty) {
        return 'Botva!'
      }
      if (deck1IsEmpty) {
        return `Second player. Round: ${round}`
      }
      if (deck2IsEmpty) {
        return `First player. Round: ${round}`
      }

      const card1 = deck1.shift()
      const card2 = deck2.shift()

      if (card1 > card2) {
        deck1.push(card1, card2)
      }
      else if (card2 > card1) {
        deck2.push(card2, card1)
      }
    }

    return 'Botva!'
  }
}
```

</details>

=============================================================
Испытание-9: ДИАПАЗОН ДАТ
=============================================================
Реализуйте и экспортируйте по умолчанию функцию, которая переводит входные данные в удобный для построения графика формат.

На вход эта функция принимает три аргумента: массив данных; дата начала периода; дата конца периода. Данные представлены в формате объекта вида { value: 14, date: '02.08.2018' }, а даты диапазона в формате 'yyyy-MM-dd'.

Диапазон дат задаёт размер выходного массива, который должна сгенерить реализуемая функция. Правила формирования итогового массива:

- он заполняется записями по всем дням из диапазона begin - end.
- если во входном массиве нет данных для какого-то дня из диапазона, то в свойство value записи этого дня установить значение 0.

```js
import buildRange from './dates.js'

const dates = [
  { value: 14, date: '02.08.2018' },
  { value: 43, date: '03.08.2018' },
]
const beginDate = '2018-08-01'
const endDate = '2018-08-04'

buildRange(dates, beginDate, endDate)
// [
//   { value: 0, date: '01.08.2018' },
//   { value: 14, date: '02.08.2018' },
//   { value: 43, date: '03.08.2018' },
//   { value: 0, date: '04.08.2018' },
// ]
```

Подсказки
Документация по функциям для работы с датами:

https://date-fns.org/v2.16.1/docs/eachDayOfInterval
https://date-fns.org/v2.16.1/docs/format

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const buildRange = (dates, start, end) => {
  const valuesByDate = {}

  for (const item of dates) {
    valuesByDate[item.date] = item.value
  }

  const [sYear, sMonth, sDay] = start.split('-').map(Number)
  const [eYear, eMonth, eDay] = end.split('-').map(Number)

  const currentDate = new Date(sYear, sMonth - 1, sDay)
  const endDate = new Date(eYear, eMonth - 1, eDay)

  const result = []

  while (currentDate <= endDate) {
    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = currentDate.getFullYear()

    const formattedDate = `${day}.${month}.${year}`

    const value =
      formattedDate in valuesByDate ? valuesByDate[formattedDate] : 0

    result.push({ value, date: formattedDate })

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return result
}

export default buildRange

// teacher solution
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import format from 'date-fns/format'
import has from 'lodash/has'

const buildRange = (dates, start, end) => {
  const valuesByDate = dates.reduce((acc, { value, date }) => ({ ...acc, [date]: value }), {})
  const period = eachDayOfInterval({ start: new Date(start), end: new Date(end) })
  return period.map((date) => {
    const formattedDate = format(date, 'dd.MM.yyyy')
    const value = has(valuesByDate, formattedDate) ? valuesByDate[formattedDate] : 0
    return { value, date: formattedDate }
  })
}

export default buildRange
```

</details>

=============================================================
Испытание-10: ЛЕНИВЫЕ КОЛЛЕКЦИИ
=============================================================
В этой задаче необходимо реализовать ленивую коллекцию.https://ru.wikipedia.org/wiki/%D0%9E%D1%82%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F_%D0%B8%D0%BD%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F

Реализуйте и экспортируйте по умолчанию класс, который предназначен для обработки коллекций объектов. Основная особенность работы данного класса заключается в том, что он использует lazy вариант обработки.

```js
import Enumerable from './enumerable.js'

const elements = [{ key: 'value' }, { key: '' }]
const coll = Enumerable.wrap(elements)
const result = coll.where('key', 'value')

result.all() // [{ key: 'value' }]
```

Подсказки

- Подробнее способы использования описаны в тестах
- Усложнённый вариант: добавьте метод allWithMemoization() с мемоизацией и протестируйте его, запуская командой make test-memo в терминале упражнения
- Ленивые коллекции

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
export default class Enumerable {
  constructor(collection, operations = []) {
    this.collection = collection
    this.operations = operations
    this.memoResult = null
  }

  static wrap(collection) {
    return new Enumerable(collection)
  }

  where(...args) {
    let predicate
    if (typeof args[0] === 'function') {
      predicate = args[0]
    } else if (typeof args[0] === 'object' && args[0] !== null) {
      const obj = args[0]
      predicate = (item) =>
        Object.keys(obj).every((key) => item[key] === obj[key])
    } else {
      const [key, value] = args
      predicate = (item) => item[key] === value
    }

    const newOps = [...this.operations, (coll) => coll.filter(predicate)]
    return new Enumerable(this.collection, newOps)
  }

  select(fn) {
    const newOps = [...this.operations, (coll) => coll.map(fn)]
    return new Enumerable(this.collection, newOps)
  }

  all() {
    return this.operations.reduce((acc, op) => op(acc), [...this.collection])
  }

  allWithMemoization() {
    if (this.memoResult === null) {
      this.memoResult = this.all()
    }
    return this.memoResult
  }
}

// teacher solution
import { cloneDeep } from 'es-toolkit'

export default class Enumerable {
  static wrap(elements) {
    return new Enumerable(elements)
  }

  constructor(elements, whereParts = []) {
    this.elements = elements
    this.whereParts = whereParts
    this.memo = {
      saved: false,
      data: [],
    }
  }

  where(key, value) {
    this.memo.saved = false
    const whereParts = [...this.whereParts, [key, value]]
    return new Enumerable(this.elements, whereParts)
  }

  all() {
    const filtered = (this.whereParts.length === 0)
      ? this.elements
      : this.elements.filter(element => this.whereParts
          .every(([key, value]) => Object.hasOwn(element, key) && (element[key] === value)))

    return cloneDeep(filtered)
  }

  // метод с мемоизацией
  allWithMemoization() {
    if (!this.memo.saved) {
      const filtered = (this.whereParts.length === 0)
        ? this.elements
        : this.elements.filter(element => this.whereParts
            .every(([key, value]) => Object.hasOwn(element, key) && (element[key] === value)))

      this.memo.data = cloneDeep(filtered)
      this.memo.saved = true
    }

    return this.memo.data
  }
}

// the best solution according to AI
import cloneDeep from 'es-toolkit/compat/cloneDeep'

export default class Enumerable {
  static wrap(coll) {
    return new Enumerable(coll)
  }

  constructor(collection, operations = []) {
    this.collection = collection
    this.operations = operations
    this.memoResult = null
  }

  where(...args) {
    let predicate
    if (typeof args[0] === 'function') {
      predicate = args[0]
    } else if (typeof args[0] === 'object' && args[0] !== null) {
      const obj = args[0]
      predicate = (item) =>
        Object.keys(obj).every(
          (key) => Object.hasOwn(item, key) && item[key] === obj[key],
        )
    } else {
      const [key, value] = args
      predicate = (item) => Object.hasOwn(item, key) && item[key] === value
    }

    const newOps = [...this.operations, (coll) => coll.filter(predicate)]
    return new Enumerable(this.collection, newOps)
  }

  select(fn) {
    const newOps = [...this.operations, (coll) => coll.map(fn)]
    return new Enumerable(this.collection, newOps)
  }

  all() {
    const result = this.operations.reduce(
      (acc, op) => op(acc),
      cloneDeep(this.collection),
    )
    return cloneDeep(result)
  }

  allWithMemoization() {
    if (this.memoResult === null) {
      this.memoResult = this.all()
    }
    return this.memoResult
  }
}

```

</details>

=============================================================
Испытание-11: ПОД ЗАМКОМ
=============================================================

JavaScript долгое время не поддерживал приватных свойств и методов. Для них появилось соглашение об именовании с нижнего подчёркивания \_, чтобы предотвратить доступ ко внутренностям объекта в обход интерфейса. Но сама возможность прямого доступа остаётся. Нам предстоит разработать обёртку над объектом, защищающую его приватные свойства от прямого доступа.

Реализуйте и экспортируйте по умолчанию функцию, которая принимает объект и позволяет обращаться только к "публичным" свойствам и методам. При попытке прочитать или перезаписать приватное, или несуществующее свойство должно выбрасываться исключение.

```js
import protect from '../protect.js'

class Course {
  constructor(name) {
    this._name = name
  }

  getName() {
    return this._name
  }
}

const course = new Course('Object-oriented design')
const protectedCourse = protect(course)

course.getName() // "Object-oriented design"
protectedCourse.getName() // "Object-oriented design"
course._name // "Object-oriented design"
course._nonExists // undefined

protectedCourse._name // Error
protectedCourse._name = 'OOD' // Error
protectedCourse._nonExists // Error
```

В реализации используйте Proxy.

Подсказки

- Чтобы избежать потери контекста для методов, используйте связывание через bind.
- Определить, что по ключу возвращается метод можно через оператор typeof.
- Документация обработчика set

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const validateValue = (prop, target) => {
  if (!(prop in target)) {
    throw new Error(`Property "${String(prop)}" does not exist`)
  }
  if (typeof prop === 'string' && prop.startsWith('_')) {
    throw new Error(`Property ${prop} is private`)
  }
}

const protect = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      validateValue(prop, target)
      const value = target[prop]

      if (typeof value === 'function') {
        return value.bind(target)
      }

      return value
    },

    set(target, prop, value) {
      validateValue(prop, target)
      target[prop] = value
      return true
    },
  })
}

export default protect

// teacher solution
const validateProperty = (target, name) => {
  if (!(name in target)) {
    throw new Error(`Property "${name}" doesn't exist`)
  }
  if (name.startsWith('_')) {
    throw new Error(`Property "${name}" is protected`)
  }
}

const protect = obj => new Proxy(obj, {
  get: (target, name) => {
    validateProperty(target, name)
    const property = target[name]

    return (typeof property === 'function') // если свойство - это метод, то необходимо привязать его
      ? property.bind(obj) // к контексту оригинального объекта, иначе метод вызовется на прокси
      : property
  },
  set: (target, name, value) => {
    validateProperty(target, name)
    target[name] = value

    return true
  },
})

export default protect

```

</details>
