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
