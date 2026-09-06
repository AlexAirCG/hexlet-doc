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
Испытание-11: ИТЕРАТИВНЫЙ ПРОЦЕСС |-|-|
==================================================================
Реализуйте тело функции smallestDivisor(), используя итеративный процесс. Функция должна находить наименьший делитель заданного числа. Число, передаваемое в функцию, больше нуля.

Доп. условие: делитель должен быть больше единицы, за исключением случая, когда аргументом является единица (наименьшим делителем которой является также единица).

Например, наименьший делитель числа 15 это 3.

```js
smallestDivisor(15) // 3
smallestDivisor(17) // 17
```

Идея алгоритма:

1. Попробуйте разделить число на 2
2. Если число делится без остатка, то это наименьший делитель
3. Если нет, то попробуйте следующий делитель
4. Если ничего не делит число без остатка, то переданное число является простым, так что его наименьший делитель — оно само (не считая 1)

Подсказки

- Вспомните про оператор % (modulus или остаток от деления). Он вычисляет остаток от деления одного операнда на другой. Например, 11 % 5 = 1, а 10 % 2 = 0. Так что если x % y это 0, то y делит x без остатка

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const smallestDivisor = (n) => {
  if (n <= 1) return n

  const iter = (divisor) => {
    if (divisor ** 2 > n) return n
    if (n % divisor === 0) return divisor
    return iter(divisor + 1)
  }

  return iter(2)
}

// teacher solution
const smallestDivisor = (num) => {
  const iter = (acc) => {
    // We use 'num / 2' in the condition below, and not 'num'.
    // This is a simple optimization: a number cannot be divided
    // by a number larger than its half.
    if (acc > num / 2) {
      return num
    }
    if (num % acc === 0) {
      return acc
    }
    return iter(acc + 1)
  }

  return iter(2)
}
```

</details>

==================================================================
Испытание-12: СЛИЯНИЕ СЛОВАРЕЙ |-|-|
==================================================================
Реализуйте и экспортируйте по умолчанию функцию, которая объединяет несколько словарей (объектов) в один общий словарь. Функция принимает любое количество аргументов и возвращает результат в виде объекта, в котором каждый ключ содержит список уникальных значений в виде массива. Элементы в списке располагаются в том порядке, в котором они появляются во входящих словарях.

```js
merge({}, {}, {})
// {}

merge({ a: 1, b: 2 }, { a: 3 })
// { a: [1, 3], b: [2] }

merge(
  { a: 1, b: 2, c: 3 },
  {},
  { a: 3, b: 2, d: 5 },
  { a: 6 },
  { b: 4, c: 3, d: 2 },
  { e: 9 },
)
// { a: [1, 3, 6], b: [2, 4], c: [3], d: [5, 2], e: [9] }
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const merge = (...objs) => {
  return objs.reduce((acc, obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      acc[key] = acc[key] || []
      if (!acc[key].includes(value)) {
        acc[key].push(value)
      }
    })
    return acc
  }, {})
}

// teacher solution
import _ from 'lodash'

const cons = (list, el) => _.union(list, [el])

export default (...dictionaries) => _.mergeWith({}, ...dictionaries, cons)

// Документация по функции union https://lodash.com/docs/#union
// Документация по функции mergeWith: https://lodash.com/docs/#mergeWith
/*
Функция merge в lodash объединяет объекты:
_.merge({ a: 'b', c: 'b' }, { b: 'c', c: 'd' }) // { a: "b", c: "d", b: "c" }
Последний объект считается источником (source) актуальных значений,
поэтому в результате ключ "c" перезаписан значением из объекта справа

mergeWith делает то же самое, но принимает третьим аргументом функцию-обработчик (customizer)
customizer должен вернуть значение для текущего ключа (ключи берутся из правого объекта)
customizer принимает до 6 аргументов, но нас интересуют только два:
* objValue - значение по текущему ключу из левого объекта
* srcValue - значение по текущем ключу из правого объекта
_.mergeWith({ a: 'b', c: 'b' }, { b: 'c', c: 'd' }, (objValue, srcValue) => {
  return srcValue || objValue;
}) // { a: "b", c: "d", b: "c" }

Возвращая из customizer массив, в objValue в следующий раз будет возвращаться массив,
что и делается в решении учителя:
_.mergeWith({ a: 'b', c: 'b' }, { b: 'c', c: 'd' }, (objValue, srcValue) => {
  return _.union(objValue, [srcValue]); // objValue будет массивом для значений из source
}) // { a: "b", c: ["d"], b: ["c"] }

cons выступает функцией-обёрткой для union и как customizer для mergeWith
*/
```

</details>

==================================================================
Испытание-13: ФИЛЬТР АНАГРАММ |-|-|
==================================================================
Анаграммы — это слова, которые состоят из одинаковых букв. Например:

- спаниель — апельсин
- карат — карта — катар
- топор — ропот — отпор

Реализуйте и экспортируйте по умолчанию функцию, которая находит все анаграммы слова. Функция принимает исходное слово и список для проверки (массив), а возвращает массив всех анаграмм. Если в списке слов отсутствуют анаграммы, то возвращается пустой массив.

```js
filterAnagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada'])
// ['aabb', 'bbaa']

filterAnagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer'])
// ['carer', 'racer']

filterAnagrams('laser', ['lazing', 'lazy', 'lacer'])
// []
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const filterAnagrams = (key, arr) => {
  const sortWord = (str) => str.split('').sort().join('')
  const target = sortWord(key)

  return arr.filter((word) => sortWord(word) === target)
}

export default filterAnagrams

// teacher solution
export default (word, words) => {
  const normalize = str => str.split('').sort().join('')
  const normal = normalize(word)

  return words.filter(item => normalize(item) === normal)
}

```

</details>

==================================================================
Испытание-14: ВЕРТИКАЛЬНАЯ ГИСТОГРАММА |-|-|
==================================================================
Реализуйте и экспортируйте по умолчанию функцию, которая выводит на экран вертикальную гистограмму. Функция принимает на вход количество бросков кубика и функцию, которая имитирует бросок игральной кости (её реализовывать не нужно). Вызов этой функции генерирует значение от 1 до 6, что соответствует одной из граней игральной кости.

Гистограмма содержит столбцы, каждому из которых соответствует грань игральной кости и количество выпадений этой грани. Результаты отображаются графически (с помощью символов #) и в виде процентного значения от общего количества бросков, за исключением случаев, когда количество равно 0 (нулю).

Дополнительные условия:

- Процентные значения должны быть прижаты влево относительно столбца.
- Значения сторон игральной кости должны быть посредине столбца.
- Столбцы между собой разделены пробелом
- Количество секций в столбце (высота столбца) должно соответствовать количеству выпадений каждой из сторон игральной кости.

Примеры

```js
import displayHistogram from '../histogram.js'

displayHistogram(32, rollDie)
// =>                 28%
//                    ###
//                    ###
//            19%     ###
//            ### 16% ### 16%
//    13%     ### ### ### ###
//    ### 9%  ### ### ### ###
//    ### ### ### ### ### ###
//    ### ### ### ### ### ###
//    ### ### ### ### ### ###
//    -----------------------
//     1   2   3   4   5   6

displayHistogram(13, rollDie)
// =>                 31% 31%
//                    ### ###
//        15%     15% ### ###
//        ### 8%  ### ### ###
//        ### ### ### ### ###
//    -----------------------
//     1   2   3   4   5   6
```

Подсказки:

- Гистограмма.
- Для решения задачи активно используйте функции из библиотеки es-toolkit.
- При получении процентного значения используйте стандартные правила округления числа.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import _ from 'lodash'

const displayHistogram = (count, rollDie) => {
  const rolls = _.times(count, rollDie)
  const stats = _.countBy(rolls)
  const sides = _.range(1, 7)

  const data = sides.map((side) => {
    const occurrance = stats[side] || 0
    const percentage = occurrance > 0 ? Math.round((occurrance / count) * 100) : 0
    return { side, occurrance, percentage }
  })

  const maxHeight = _.max(_.map(data, 'occurrance'))
  const lines = []

  for (let h = maxHeight + 1; h > 0; h -= 1) {
    const line = data.map(({ occurrance, percentage }) => {
      if (occurrance === h - 1 && percentage > 0) {
        return `${percentage}%`.padEnd(3)
      }
      if (occurrance >= h) {
        return '###'
      }
      return '   '
    })
    lines.push(line.join(' ').trimEnd())
  }
  lines.push('-----------------------')
  lines.push(' 1   2   3   4   5   6')

  console.log(lines.join('\n'))
}

export default displayHistogram

// teacher solution
import _ from 'lodash'

export default (roundsCount, rollDie) => {
  const bar = '###'
  const width = 4
  const numbers = _.times(roundsCount, rollDie)
  const sides = _.range(1, 7)
  const counts = _.countBy(numbers)
  const countsPairs = _.toPairs(counts)
  const [, maxCount] = _.maxBy(countsPairs, ([, count]) => count)
  const percentsPairs = countsPairs.map(([side, count]) => {
    const percent = Math.round((count * 100) / roundsCount)
    return [side, percent]
  })
  const percents = _.fromPairs(percentsPairs)

  const lines = []
  for (let i = maxCount; i > -1; i -= 1) {
    const chunks = sides.map((side) => {
      let chunk
      const count = _.get(counts, side, 0)
      if (count > i) {
        chunk = bar.padEnd(width)
      }
      else if (count === i && count !== 0) {
        const percent = percents[side]
        chunk = `${percent}%`.padEnd(width)
      }
      else {
        chunk = ' '.repeat(width)
      }
      return chunk
    })
    const line = _.trimEnd(chunks.join(''))
    lines.push(line)
  }

  lines.push('-'.repeat(width * sides.length).slice(0, -1))
  const lineWithSides = sides.map(side => ` ${side} `.padEnd(width)).join('')
  lines.push(_.trimEnd(lineWithSides))

  const str = lines.join('\n')
  console.log(str)
}

```

</details>

==================================================================
Испытание-15: ОДИНАКОВАЯ ЧЕТНОСТЬ |-|-|
==================================================================
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив и возвращает новый, состоящий из элементов, у которых такая же чётность, как и у первого элемента входного массива.

Примеры

```js
sameParity([-1, 0, 1, -3, 10, -2]) // [-1, 1, -3]
sameParity([2, 0, 1, -3, 10, -2]) // [2, 0, 10, -2]
sameParity([]) // []
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const sameParity = (arr) => {
  if (arr.length === 0) return []

  const first = arr[0]
  const isFirstNum = Math.abs(first % 2) === 0

  return arr.filter((item) => {
    const isItemNum = Math.abs(item % 2) === 0
    return isFirstNum === isItemNum
  })
}

// teacher solution
const isEven = (num) => num % 2 === 0

export default (arr) => {
  const firstItemParity = isEven(arr[0])
  return arr.filter((el) => isEven(el) === firstItemParity)
}
```

</details>

==================================================================
Испытание-16: ТЕОРИЯ ВЕРОЯТНОСТИ |-|-|
==================================================================
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход историю подбрасывания кубика в виде массива и возвращает объект. Ключом этого объекта служит число из списка, а значением – ещё один объект, в котором ключи – это числа, выпавшие сразу после первоначального числа, а значения – вероятность их выпадения.

Например, если передать на вход массив [1, 3, 1, 5, 1], итоговый объект будет выглядеть так:

```js
{
  1: { 3: 0.5, 5: 0.5 },
  3: { 1: 1 },
  5: { 1: 1 },
};
```

После числа 1 выпадали числа 3 и 5 с равной долей вероятности 0.5. А после чисел 3 и 5 всегда выпадала единица, что даёт нам вероятность в 1.

```js
calculateProbabilities([]) // {}
calculateProbabilities([1, 3, 1, 5, 1, 2, 1, 6])
/*
{
  1: {
      2: 0.25,
      3: 0.25,
      5: 0.25,
      6: 0.25,
    },
  2: { 1: 1 },
  3: { 1: 1 },
  5: { 1: 1 },
  6: {},
};
*/
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import _ from 'lodash'

const calculateProbabilities = (arr) => {
  if (arr.length === 0) return {}

  const result = arr.reduce((acc, current, i) => {
    if (!acc[current]) acc[current] = {}

    const next = arr[i + 1]
    if (next !== undefined) {
      acc[current][next] = (acc[current][next] || 0) + 1
    }

    return acc
  }, {})

  return _.mapValues(result, (followers) => {
    const total = _.sum(_.values(followers))
    if (total === 0) return {}
    return _.mapValues(followers, (count) => count / total)
  })
}

export default calculateProbabilities

// teacher solution
import _ from 'lodash'

const countElements = (elements, element) => elements
  .reduce((acc, current) => (current === element ? acc + 1 : acc), 0)

const findProbabilityForElement = (elements, element) => elements
  .filter((current, index) => elements[index - 1] === element)
  .reduce((acc, currentElement, i, filtered) => {
    const totalElements = filtered.length
    const probability = countElements(filtered, currentElement) / totalElements
    return { ...acc, [currentElement]: probability }
  }, {})

const calculateProbabilities = numbers => _.uniq(numbers)
  .reduce((acc, number) => {
    const probabilities = findProbabilityForElement(numbers, number)
    return { ...acc, [number]: probabilities }
  }, {})

export default calculateProbabilities
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

==================================================================
Испытание-18: ВАЛИДАТОР IPV6 |-|-|
==================================================================
Реализуйте функцию-предикат isValidIPv6(), которая проверяет IPv6-адреса (адреса шестой версии интернет протокола) на корректность. Функция принимает на вход строку с адресом IPv6 и возвращает true, если адрес корректный, а в противном случае false. Экспортируйте функцию по умолчанию.

Дополнительные условия:

- Работа функции не зависит от регистра символов
- Ведущие нули в группах цифр необязательны
- Самая длинная последовательность групп нулей, например, :0:0:0: может быть заменена на два двоеточия ::. Такую замену можно произвести только один раз

Примеры

```js
isValidIPv6('10:d3:2d06:24:400c:5ee0:be:3d') // true
isValidIPv6('0B0:0F09:7f05:e2F3:0D:0:e0:7000') // true
isValidIPv6('000::B36:3C:00F0:7:937') // true
isValidIPv6('::1') // true
isValidIPv6('1001:208:67:4f00:e3::2c6:0') // true

isValidIPv6('2607:G8B0:4010:801::1004') // false
isValidIPv6('2.001::') // false
isValidIPv6('9f8:0:69S0:9:9:d9a:672:f90d') // false
```

Подсказки

- IPv6
- Для проверки пограничных случаев внимательно изучите список IP-адресов в модуле с тестами

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const isValidIPv6 = (str) => {
  const regex =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/
  return regex.test(str)
}

export default isValidIPv6

// teacher solution
import _ from 'lodash'

const isValidGroup = (group) => {
  const number = Number(`0x${group}`)
  return group.length <= 4 && !_.isNaN(number)
}

export default (ip) => {
  if (ip.indexOf('::') !== ip.lastIndexOf('::')) {
    return false
  }

  const isShort = ip.includes('::')
  const groups = ip.split('::')
    .filter(group => group !== '')
    .flatMap(part => part.split(':'))

  const length = isShort ? groups.length + 1 : groups.length

  if ((!isShort && length < 8) || length > 8) {
    return false
  }

  return groups.every(isValidGroup)
}

```

</details>

==================================================================
Испытание-19: NRZI КОДИРОВАНИЕ |-|-|
==================================================================
Реализуйте и экспортируйте по умолчанию функцию, которая принимает строку в виде графического представления линейного сигнала и возвращает строку с бинарным кодом. Внимательно изучите примеры.

Примеры

```js
const signal1 = '_|¯|____|¯|__|¯¯¯'
nrzi(signal1) // '011000110100'

const signal2 = '|¯|___|¯¯¯¯¯|___|¯|_|¯'
nrzi(signal2) // '110010000100111'

const signal3 = '¯|___|¯¯¯¯¯|___|¯|_|¯'
nrzi(signal3) // '010010000100111'

const signal4 = ''
nrzi(signal4) // ''

const signal5 = '|'
nrzi(signal5) // ''
```

Подсказки
Символ | в строке указывает на переключение сигнала и означает, что уровень сигнала в следующем такте будет изменён на противоположный по сравнению с предыдущим.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const nrzi = (signal) => {
  const chars = signal.split('')
  let result = ''

  for (let i = 0; i < chars.length; i++) {
    const current = chars[i]
    const prev = chars[i - 1]
    const next = chars[i + 1]

    if (current === '|') {
      if (next !== undefined) {
        result += '1'
      }
    } else if (current === '_' || current === '¯') {
      if (prev !== '|') {
        result += '0'
      }
    }
  }
  return result
}

// teacher solution
export default (str) =>
  str
    .split('')
    .map((e, i, arr) => {
      if (e === '|') return ''
      return arr[i - 1] === '|' ? 1 : 0
    })
    .join('')
```

</details>

==================================================================
Испытание-20: ПАРСИНГ КОНФИГУРАЦИИ |-|-|
==================================================================
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход содержимое конфигурационного файла в виде строки, находит в нём переменные окружения, которые нужно передать и возвращает их в виде строки формата "имя1=значение1,имя2=значение2,имя3=значение3,...".

Переменные окружения в конфигурационном файле устанавливаются командой environment, после которой в кавычках указан список переменных через запятую.

```txt
environment='X_FORWARDED_MAIL=tirion@google.com,X_FORWARDED_HOME=/home/tirion,language=en'
```

Те переменные, которые нужно пробросить, начинаются с префикса X*FORWARDED*. В итоговую строку имена переменных должны попадать без этого префикса. Например, если в конфигурационном файле переменная устанавливается так: X_FORWARDED_HOME=/home/tirion, то в итоговой строке она должна выглядеть так: "HOME=/home/tirion".

```txt
[program:prepare]
command=sudo -HEu tirion /bin/bash -c 'cd /usr/src/app && make prepare'
autorestart=false
environment="X_FORWARDED_MAIL=tirion@google.com,X_FORWARDED_HOME=/home/tirion,language=en"

[program:http_server]
command=sudo -HEu tirion /bin/bash -c 'cd /usr/src/app && make environment'
environment="key5=value5,X_FORWARDED_var3=value,key6=value6"
```

```js
// Читаем содержимое файла и записываем его в константу content. Реализовывать это в домашней работе не нужно.
const content = fs.readFileSync('s.conf', 'utf-8')

// Передаем содержимое файла в функцию
const result = getForwardedVariables(content)
console.log(result) // => "MAIL=tirion@google.com,HOME=/home/tirion,var3=value"
```

Подсказки
Примеры конфигурационных файлов можно посмотреть в директории **fixtures**

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const getForwardedVariables = (content) => {
  const matches = content.matchAll(/environment="([^"]+)"/g)

  const result = []

  for (const match of matches) {
    const envVars = match[1].split(',')

    envVars.forEach((item) => {
      if (item.startsWith('X_FORWARDED_')) {
        result.push(item.replace('X_FORWARDED_', ''))
      }
    })
  }

  return result.join(',')
}

// teacher solution
export default (config) => {
  const lines = config.split('\n')
  return lines
    .filter((line) => line.startsWith('environment='))
    .map((line) => line.replaceAll('environment=', ''))
    .map((line) => line.replaceAll('"', ''))
    .flatMap((line) => line.split(','))
    .filter((kv) => kv.startsWith('X_FORWARDED_'))
    .map((kv) => kv.replace('X_FORWARDED_', ''))
    .join(',')
}
```

</details>

==================================================================
Испытание-20: ПАРСИНГ КОНФИГУРАЦИИ |-|-|
==================================================================
