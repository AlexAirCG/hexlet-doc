===============================================================
Испытание-1: ЧИСТЫЕ ФУНКЦИИ |-|-|
===============================================================
Цель этой задачи — научиться отделять чистый код от кода с побочными эффектами.

Для этого выделите процесс определения того, является ли число простым, в отдельную функцию, возвращающую логическое значение. Это функция, с помощью которой мы отделяем чистый код от кода, печатающего на экран результат 'yes' или 'no' в зависимости от логического значения.

Пример такого разделения и хороших абстракций — в решении учителя.

Реализуйте необходимые функции и экспортируйте по умолчанию функцию, которая принимает число на простоту и печатает на экран yes, если число простое или no, если нет.

формула простого числа

Примеры

```js
sayPrimeOrNot(5) // 'yes'
sayPrimeOrNot(4) // 'no'
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const isPrime = (num) => {
  if (num < 2) return false

  for (let i = 2; i <= Math.sqrt(num); i += 1) {
    if (num % i === 0) return false
  }

  return true
}

const sayPrimeOrNot = (num) => {
  const result = isPrime(num) ? 'yes' : 'no'
  console.log(result)
}

export default sayPrimeOrNot

// teacher solution
const isPrime = (num) => {
  if (num < 2) {
    return false
  }

  for (let i = 2; i <= Math.sqrt(num); i += 1) {
    if (num % i === 0) {
      return false
    }
  }

  return true
}

const sayPrimeOrNot = (num) => {
  const text = isPrime(num) ? 'yes' : 'no'
  console.log(text)
}

export default sayPrimeOrNot

```

</details>

===============================================================
Испытание-2: ОПЕРАТОР REST (упаковка аргументов) |+|+|
===============================================================
Реализуйте и экспортируйте по умолчанию функцию, которая возвращает среднее арифметическое всех переданных аргументов. Если функции не передать ни одного аргумента, то она должна вернуть null.

Примеры

```js
average(0) // 0
average(0, 10) // 5
average(-3, 4, 2, 10) // 3.25
average() // null
```

Подсказки

- Используйте функцию sum из библиотеки es-toolkit.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const average = (...numbers) => {
  if (numbers.length === 0) {
    return null
  }

  const n = numbers.length

  const sum = numbers.reduce((acc, number) => acc + number, 0)

  return sum / n
}

export default average

// teacher solution
import _ from 'lodash'

const average = (...numbers) => {
  const count = numbers.length

  if (count === 0) {
    return null
  }

  return _.sum(numbers) / count
}

export default average

```

</details>

==============================================================================
Испытание-3: ОПЕРАТОР SPREAD (распаковка аргументов) |-|-|
==============================================================================
Реализуйте функцию, которая конвертирует даты в массив человеко-читаемых строк на английском языке. Каждая из дат представлена массивом [2001, 10, 18], в котором первый элемент — это год, второй — месяц, и третий — число. Функция на вход должна принимать любое количество параметров. Если в функцию ничего не было передано, она должна вернуть пустой массив. Экспортируйте функцию по умолчанию.

Примеры:

```js
convert()
// []

convert([1993, 4, 24])
// ['Sat Apr 24 1993']

convert([1993, 4, 24], [1997, 9, 12], [2001, 11, 18])
// ['Sat Apr 24 1993', 'Fri Sep 12 1997', 'Sun Nov 18 2001']
```

Подсказки

- Для работы с датами воспользуйтесь объектом new Date() и его методом toDateString()
- Обратите внимание, что по умолчанию значение месяца начинается с 0

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const convert = (...arrs) =>
  arrs.map(([year, month, day]) =>
    new Date(year, month - 1, day).toDateString(),
  )

export default convert

// teacher solution
export default (...coll) => {
  const formattedDates = []

  for (const item of coll) {
    const [year, month, day] = item
    const date = new Date(year, month - 1, day)
    const formattedDate = date.toDateString()
    formattedDates.push(formattedDate)
  }

  return formattedDates
}
```

</details>

==============================================================================
Испытание-4: ОБЪЕКТЫ ПЕРВОГО КЛАССА |+|+|
==============================================================================
Реализуйте внутреннюю функцию takeLast(), которая возвращает последние n символов строки в обратном порядке. Количество символов передаётся в takeLast() вторым параметром. Если передаётся пустая строка или строка меньше необходимой длины, функция должна вернуть null.

Примеры

```js
run('') // null
run('cb') // null
run('power') // rewo
run('hexlet') // telx
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution (the best solution according to AI)
const run = (text) => {
  const takeLast = (text, num) => {
    const strLength = text.length
    if (strLength < num) return null
    const result = text.slice(-num).split('').reverse().join('')
    return result
  }

  return takeLast(text, 4)
}

export default run

// teacher solution
const run = (text) => {
  const takeLast = (str, length) => {
    if (str.length === 0 || str.length < length) {
      return null
    }

    const result = []
    for (let i = str.length - 1; result.length < length; i -= 1) {
      result.push(str[i])
    }

    return result.join('')
  }

  return takeLast(text, 4)
}

export default run
```

</details>

===============================================================
Испытание-5: ФУНКЦИИ ВЫСШЕГО ПОРЯДКА |-|-|
===============================================================
Реализуйте функцию takeOldest(), которая принимает на вход список пользователей и возвращает самых взрослых. Количество возвращаемых пользователей задается вторым параметром, который по умолчанию равен единице. Экспортируйте данную функцию по умолчанию.

Пример использования

```js
const users = [
  { name: 'Tirion', birthday: 'Nov 19, 1988' },
  { name: 'Sam', birthday: 'Nov 22, 1999' },
  { name: 'Rob', birthday: 'Jan 11, 1975' },
  { name: 'Sansa', birthday: 'Mar 20, 2001' },
  { name: 'Tisha', birthday: 'Feb 27, 1992' },
  { name: 'Chris', birthday: 'Dec 25, 1995' },
]

takeOldest(users)
// [
//   { name: 'Rob', birthday: 'Jan 11, 1975' },
// ];
```

Другие примеры смотрите в модуле с тестами.

Подсказки

- Для преобразования дат в единое представление — unixtimestamp — используйте метод Date.parse()
- В рамках данного упражнения, для записи дат используется только формат RFC2822.
- sortBy
- Подумайте, что из себя представляет данная функция: команду или запрос?

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const takeOldest = (obj, num = 1) => {
  return obj
    .slice()
    .sort((a, b) => {
      const dataA = Date.parse(a.birthday)
      const dataB = Date.parse(b.birthday)
      return dataA - dataB
    })
    .slice(0, num)
}

export default takeOldest

// teacher solution (the best solution according to AI)
import _ from 'lodash'

const takeOldest = (users, count = 1) => {
  const sorted = _.sortBy(users, ({ birthday }) => Date.parse(birthday))
  return sorted.slice(0, count)
}

export default takeOldest
```

 </details>

==================================================================
Испытание-6: ОТОБРАЖЕНИЕ (map) |-|-|
==================================================================
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список пользователей и возвращает плоский список их детей. Дети каждого пользователя хранятся в виде массива в ключе children.

```js
import getChildren from './users.js'

const users = [
  {
    name: 'Tirion',
    children: [{ name: 'Mira', birthday: '1983-03-23' }],
  },
  { name: 'Bronn', children: [] },
  {
    name: 'Sam',
    children: [
      { name: 'Aria', birthday: '2012-11-03' },
      { name: 'Keit', birthday: '1933-05-14' },
    ],
  },
  {
    name: 'Rob',
    children: [{ name: 'Tisha', birthday: '2012-11-03' }],
  },
]

getChildren(users)
// [
//   { name: 'Mira', birthday: '1983-03-23' },
//   { name: 'Aria', birthday: '2012-11-03' },
//   { name: 'Keit', birthday: '1933-05-14' },
//   { name: 'Tisha', birthday: '2012-11-03' },
// ];
```

Другие примеры смотрите в модуле с тестами.

Подсказки

- flat

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const getChildren = (obj) => {
  const childName = obj.map((item) => item.children)
  return childName.flat()
}

export default getChildren

// teacher solution
const getChildren = (users) => {
  const childrenOfUsers = users.map(({ children }) => children)
  return childrenOfUsers.flat()
}

export default getChildren

```

</details>

==================================================================
Испытание-7: ФИЛЬТРАЦИЯ (filter) |-|-|
==================================================================
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список пользователей и возвращает плоский список подруг всех пользователей (без сохранения ключей). Друзья каждого пользователя хранятся в виде массива в ключе friends. Пол доступен по ключу gender и может принимать значения male или female.

```js
import getGirlFriends from './users.js'

const users = [
  {
    name: 'Tirion',
    friends: [
      { name: 'Mira', gender: 'female' },
      { name: 'Ramsey', gender: 'male' },
    ],
  },
  { name: 'Bronn', friends: [] },
  {
    name: 'Sam',
    friends: [
      { name: 'Aria', gender: 'female' },
      { name: 'Keit', gender: 'female' },
    ],
  },
  {
    name: 'Rob',
    friends: [{ name: 'Taywin', gender: 'male' }],
  },
]

getGirlFriends(users)
// [
//   { name: 'Mira', gender: 'female' },
//   { name: 'Aria', gender: 'female' },
//   { name: 'Keit', gender: 'female' },
// ];
```

Другие примеры смотрите в модуле с тестами.

Подсказки

- Так как нам нужны только друзья, то можно применить отображение map() и получить список друзей, который затем будет фильтроваться
- Одно из решений задачи предполагает использование метода массива flat()

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const getGirlFriends = (coll) => {
  return coll
    .map((user) => user.friends)
    .flat()
    .filter((friend) => friend.gender === 'female')
}

export default getGirlFriends

// teacher solution
export default (users) => {
  const friendsOfUsers = users.map(({ friends }) => friends)
  return friendsOfUsers.flat().filter(({ gender }) => gender === 'female')
}
```

</details>

==================================================================
Испытание-8: АГРЕГАЦИЯ (reduce) |-|-|
==================================================================

Реализуйте и экспортируйте по умолчанию функцию для группировки объектов по заданному свойству. Функция принимает аргументами массив объектов и название свойства для группировки. Она должна возвращать объект, где ключ - это значение по заданному свойству, а значение - массив с данными, подходящими для группы.

```js
import groupBy from './groupBy.js'

const students = [
  { name: 'Tirion', class: 'B', mark: 3 },
  { name: 'Keit', class: 'A', mark: 3 },
  { name: 'Ramsey', class: 'A', mark: 4 },
]

groupBy([], '') // {}
groupBy(students, 'mark')
// {
//   3: [
//     { name: "Tirion", class: "B", mark: 3 },
//     { name: "Keit", class: "A", mark: 3 },
//   ],
//   4: [
//     { name: "Ramsey", class: "A", mark: 4 },
//   ],
// }
```

Подсказки

- Аналогичная функция есть в lodash, но вам её нужно создать самостоятельно
- Алгоритм решения задачи с помощью цикла и редьюса одинаковый. Если вам так проще, сделайте сначала через цикл, затем перепишите через reduce
- Решение этой задачи аналогично решению задачи usersByAge из теории

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const groupBy = (colls, group) => {
  return colls.reduce((acc, coll) => {
    if (!Object.hasOwn(acc, coll[group])) {
      acc[coll[group]] = []
    }
    acc[coll[group]].push(coll)
    return acc
  }, {})
}

export default groupBy

// teacher solution
const groupBy = (objects, key) => {
  if (!key) {
    return {}
  }

  return objects.reduce((acc, object) => {
    // из каждого объекта берётся значение по ключу
    const groupName = object[key]
    // контейнером группы выступает массив
    // Оператор нулевого слияния возвращает пустой массив, если в аккумуляторе ничего нет
    const group = acc[groupName] ?? []
    // возвращается новый объект аккумулятора
    // старый аккумулятор деструктурируется, для текущей группы записывается новый массив с данными
    // квадратные скобки нужны, чтобы указать имя группы в качестве ключа
    return { ...acc, [groupName]: group.concat(object) }
  }, {})
}

export default groupBy
```

</details>

==================================================================
Испытание-9: ЦЕПОЧКА ОПЕРАЦИЙ |-|-|
==================================================================
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список емейлов, а возвращает количество емейлов, расположенных на каждом бесплатном домене. Список бесплатных доменов хранится в константе freeEmailDomains.

```js
const emails = [
  'info@gmail.com',
  'info@yandex.ru',
  'info@hotmail.com',
  'mk@host.com',
  'support@hexlet.io',
  'key@yandex.ru',
  'sergey@gmail.com',
  'vovan@gmail.com',
  'vovan@hotmail.com',
]

getFreeDomainsCount(emails)
// {
//   'gmail.com': 3,
//   'yandex.ru': 2,
//   'hotmail.com': 2,
// };
```

Другие примеры смотрите в модуле с тестами.

Подсказки

- При решении вам может понадобится функция get() из библиотеки es-toolkit.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution 1
const getFreeDomainsCount = (emails) => {
  return emails
    .map((email) => email.split('@')[1])
    .filter((domain) => freeEmailDomains.includes(domain))
    .reduce((acc, domain) => {
      acc[domain] = (acc[domain] || 0) + 1
      return acc
    }, {})
}

export default getFreeDomainsCount

// my solution 2 (the best according AI)
const getFreeDomainsCount = (emails) => {
  return emails.reduce((acc, email) => {
    const domain = email.slice(email.indexOf('@') + 1)
    if (freeEmailDomains.includes(domain)) {
      acc[domain] = (acc[domain] || 0) + 1
    }
    return acc
  }, {})
}

export default getFreeDomainsCount

// teacher solution
import { get } from 'es-toolkit/compat'

const getFreeDomainsCount = emails => emails
  .map((email) => {
    const [, domain] = email.split('@')
    return domain
  })
  .filter(domain => freeEmailDomains.includes(domain))
  .reduce((acc, domain) => {
    const count = get(acc, domain, 0) + 1
    return { ...acc, [domain]: count }
  }, {})

export default getFreeDomainsCount

```

</details>

==================================================================
Испытание-10: РЕКУРСИЯ |-|-|
==================================================================
Допишите (с использованием рекурсивного процесса) функцию sequenceSum(), которая находит сумму последовательности целых чисел. Последовательность задается двумя значениями: begin - начало последовательности, end - конец последовательности. Например: begin = 2 и end = 6 дают нам такую последовательность 2, 3, 4, 5, 6. Сумма такой последовательности будет: 20.

```js
import sequenceSum from './sequenceSum'

sequenceSum(1, 5) // 1 + 2 + 3 + 4 + 5 = 15
sequenceSum(4, 10) // 4 + 5 + 6 + 7 + 8 + 9 + 10 = 49
sequenceSum(-3, 2) // (-3) + (-2) + (-1) + 0 + 1 + 2 = -3

// NaN (т.к. это "пустая" последовательность)
sequenceSum(7, 2)

// 0 (т.к. это единственное число, входящее в последовательность)
sequenceSum(0, 0)
// 6 (т.к. это единственное число, входящее в последовательность)
sequenceSum(6, 6)
```

Подсказки

- Последовательность, в которой begin > end, не содержит ни одного числа, т.е. является "пустой". Вычислить сумму чисел такой последовательности не представляется возможным, в этом случае возвращаем NaN
- Сумма чисел последовательности, в которой begin === end, равна begin (или end)

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const sequenceSum = (begin, end) => {
  if (begin > end) return NaN
  if (begin === end) return begin
  return begin + sequenceSum(begin + 1, end)
}

// teacher solution
const sequenceSum = (begin, end) => {
  if (begin > end) {
    return NaN
  }
  if (begin === end) {
    return begin
  }
  return begin + sequenceSum(begin + 1, end)
}
```

</details>

==================================================================
Испытание-17: СТОЛБЧАТАЯ ДИАГРАММА |-|-|
==================================================================

solution.js
Реализуйте и экспортируйте по умолчанию функцию, которая выводит на экран столбчатую диаграмму. Функция принимает в качестве параметра последовательность чисел, длина которой равна количеству столбцов диаграммы. Размер диаграммы по вертикали должен определяться входными данными.

Примеры

```bash
import barChart from '../solution.js';

barChart([5, 10, -5, -3, 7]);
// =>  *
//     *
//     *
//     *  *
//     *  *
//    **  *
//    **  *
//    **  *
//    **  *
//    **  *
//      ##
//      ##
//      ##
//      #
//      #

barChart([5, -2, 10, 6, 1, 2, 6, 4, 8, 1, -1, 7, 3, -5, 5]);
// =>   *
//      *
//      *     *
//      *     *  *
//      **  * *  *
//    * **  * *  *  *
//    * **  ***  *  *
//    * **  ***  ** *
//    * ** ****  ** *
//    * ******** ** *
//     #        #  #
//     #           #
//                 #
//                 #
//                 #
```

Подсказки:
Для решения задачи вы можете использовать функции из библиотеки lodash

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import _ from 'lodash'

const barChart = (arr) => {
  if (arr.length === 0) return

  const barPositive = '*'
  const barNegative = '#'

  const max = _.max(arr) > 0 ? _.max(arr) : 0
  const min = _.min(arr) < 0 ? _.min(arr) : 0

  let result = []

  for (let i = max; i > 0; i -= 1) {
    const row = arr.map((val) => (val >= i ? barPositive : ' ')).join('')
    result.push(row)
  }

  for (let i = -1; i >= min; i -= 1) {
    const row = arr.map((val) => (val <= i ? barNegative : ' ')).join('')
    result.push(row)
  }

  console.log(result.join('\n'))
}

export default barChart

// teacher solution
import _ from 'lodash'

export default (numbers) => {
  const bottom = Math.min(0, ...numbers)
  const top = Math.max(0, ...numbers)

  const lines = numbers.map((number) => {
    const bar = number > 0 ? '*'.repeat(number) : '#'.repeat(Math.abs(number))
    const bottomSpace = ' '.repeat(Math.min(0, number) - bottom)
    const topSpace = ' '.repeat(top - Math.max(0, number))

    return [...topSpace, ...bar, ...bottomSpace]
  })

  const chart = _.zip(...lines)
    .map(line => line.join(''))
    .join('\n')

  console.log(chart)
}

```

</details>
