// ГЛАВА: JS: Функции =========================================
// Теория: Чистые функции ==================

// Испытание: Чистые функции -1 |
/*
Цель этой задачи — научиться отделять чистый код от кода с побочными эффектами.

Для этого выделите процесс определения того, является ли число простым, в отдельную функцию, возвращающую логическое значение. Это функция, с помощью которой мы отделяем чистый код от кода, печатающего на экран результат 'yes' или 'no' в зависимости от логического значения.

Пример такого разделения и хороших абстракций — в решении учителя.

Реализуйте необходимые функции и экспортируйте по умолчанию функцию, которая принимает число на простоту и печатает на экран yes, если число простое или no, если нет.
// */

// data -------------
//*

// */

// */

// solution my --------------
/*
const isPrime = (num) => {
  if (num < 2) return false

  for (let i = 2; i <= Math.sqrt(num); i += 1) {
    if (num % i === 0) return false
  }

  return true
}

const sayPrimeOrNot = (num) => {
  const result = isPrime(num) ? 'yes' : 'no'
  return result
}
// */

// solution teacher ----------------
//*

// */

// test ----------------
/*
console.log(sayPrimeOrNot(97)) // 'yes'
console.log(sayPrimeOrNot(4)) // 'no'
// */

// Теория: Область видимости и замыкания ========================
/*
// Какое значение нужно подставить вместо __, чтобы вызов вернул true?

const isRightNum = (num) => {
  const res = num > 3 && num ** 2 < 26 && num !== 5
  return res
}

console.log(isRightNum(4)) // true
// */

// Теория: Разделение команд и запросов ========================
/*
const users = [
  { name: 'Stan', children: ['John', 'Mary'] },
  { name: 'Donald', children: ['James'] },
  { name: 'Lily', children: [] },
]
// */

/*
// bad
const takeChildren = (arr) => {
  // 1. Сначала собираем всех детей в промежуточный массив
  const children = []
  for (const user of arr) {
    children.push(...user.children)
  }

  // 2. Мутируем исходный массив: удаляем всё и вставляем детей
  arr.splice(0, arr.length, ...children)

  console.log(arr)
}
// */

/*
// good
const takeChildren = (arr) => {
  const result = []
  for (const user of arr) {
    // Важно: мы не меняем user, мы просто берем данные
    result.push(...user.children)
  }
  console.log(result) // Возвращаем новый массив, оригинал остается целым
}

// takeChildren() возвращает массив детей всех пользователей
takeChildren(users) // ['John', 'Mary', 'James']
takeChildren(users) // error
// */

// Теория: Оператор Rest (упаковка аргументов) ===================

/*
const func = (...params) => {
  console.log(params)
}
func()
func(1, 2)
func(1, 2, 3)
func(1, 'hello', [1, 3, 4], 'hexlet')
// */

/*
const sum = (...numbers) => {
  let result = 0
  for (const num of numbers) {
    result += num
  }
  console.log(result)
}
sum(1, 1)
sum(1, 2, 3)
// */

/*
const sum = (a, b, ...params) => {
  console.log(`a -> ${a}`)
  console.log(`b -> ${b}`)
  console.log(params)
}
sum(1, 2, 5, 5, 5)
// */

/*
// Что напечатает функция на экран?
const foo = (...argument) => {
  console.log(argument)
}

const arg = [[], 3, 10]
foo(arg) // [[[], 3, 10]]
// */

// Испытание: Оператор Rest (упаковка аргументов) +1 |
/*
Реализуйте и экспортируйте по умолчанию функцию, которая возвращает среднее арифметическое всех переданных аргументов. Если функции не передать ни одного аргумента, то она должна вернуть null.
Примеры
average(0); // 0
average(0, 10); // 5
average(-3, 4, 2, 10); // 3.25
average(); // null
Подсказки
Используйте функцию sum из библиотеки lodash.
// */

// solution -----------------
/*
import _ from 'lodash'

const average = (...param) => {
  const count = param.length
  if (count === 0) return null
  return _.sum(param) / count
}

console.log(average(0, 10))
// */

// Теория: Оператор Spread (распаковка аргументов) ==================
/*
const sum = (...numbers) => {
  let result = 0
  for (let num of numbers) {
    result += num
  }
  console.log(result)
}

const numbers = [1, 7, 4]
const numbers1 = [1, 7, 4]
const numbers2 = [5, 5]

sum(8, 10, ...numbers) // 30
sum(8, ...numbers, 10) // 30
sum(...numbers, 8, 10) // 30
sum(...numbers1, ...numbers2) // 22
sum(...numbers2, ...numbers1) // 22
sum(8, ...numbers1, 10, ...numbers2) // 40
// */

// Испытание: Оператор Spread (распаковка аргументов) -1 |
/*
Реализуйте функцию, которая конвертирует даты в массив человеко-читаемых строк на английском языке. Каждая из дат представлена массивом [2001, 10, 18], в котором первый элемент — это год, второй — месяц, и третий — число. Функция на вход должна принимать любое количество параметров. Если в функцию ничего не было передано, она должна вернуть пустой массив. Экспортируйте функцию по умолчанию.

Примеры:
convert();
// []

convert([1993, 4, 24]);
// ['Sat Apr 24 1993']

convert([1993, 4, 24], [1997, 9, 12], [2001, 11, 18]);
// ['Sat Apr 24 1993', 'Fri Sep 12 1997', 'Sun Nov 18 2001']
Подсказки
Для работы с датами воспользуйтесь объектом new Date() и его методом toDateString()
Обратите внимание, что по умолчанию значение месяца начинается с 0
// */

// solution my ---------------
/*
const convert = (...param) => {
  if (param.length === 0) return []

  let result = []
  for (let [year, month, day] of param) {
    let data = new Date(year, month - 1, day)
    result.push(data.toDateString())
  }

  return result
}
console.log(convert([1993, 4, 24]))
// */

// solution teacher -------------
/*
const convert = (...coll) => {
  const formattedDates = []

  for (const item of coll) {
    const [year, month, day] = item
    const date = new Date(year, month - 1, day)
    const formattedDate = date.toDateString()
    formattedDates.push(formattedDate)
  }

  return formattedDates
}

console.log(convert([1993, 4, 24], [1997, 9, 12], [2001, 11, 18]))
// */

// Теория: Деструктуризация параметров ==========================
/*
const func = (coll) => {
  console.log(coll[0])
  console.log(coll[1])
}

func([1, 2])
// */
/*
const func = (coll) => {
  const [first, second] = coll
  console.log(first, second)
}

func([1, 2])
// */

/*
const func = ([first, second]) => {
  console.log(first, second)
}
func([1, 2])
// */

/*
const func = ({ nameUser, age }) => {
  console.log(nameUser)
  console.log(age)
}
func({ nameUser: 'Alex', surnameUser: 'Glad', age: '45', job: 'programmer' })
// */

// Теория: Объекты первого класса =======================
/*
(() => console.log('I love Hexlet'))()
// */

// Создание внутри другой функции ------------------
/*
const sum = (a, b) => {
  // определили "внутреннюю" анонимную функцию и
  // сохранили в константе innerSum
  const innerSum = (x, y) => x + y

  // вызвали внутреннюю функцию и
  // вернули результат вызова наружу из sum
  return innerSum(a, b)
}

sum(1, 4) // 5
// */

// Испытание-4: Объекты первого класса +1 |
/*
Реализуйте внутреннюю функцию takeLast(), которая возвращает последние n символов строки в обратном порядке. Количество символов передаётся в takeLast() вторым параметром. Если передаётся пустая строка или строка меньше необходимой длины, функция должна вернуть null.

Примеры
run('');       // null
run('cb');     // null
run('power');  // rewo
run('hexlet'); // telx
// */

// solution my ------------------
/*
const run = (text) => {
  const takeLast = (text, num) => {
    const strLength = text.length
    if (strLength < num) return null
    const result = text.slice(-num).split('').reverse().join('')
    return result
  }
  return takeLast(text, 4)
}
console.log(run('')) // telx)
// */

// solution teacher ------------------
/*
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
console.log(run('hexlet'))
// */

// Теория: Функции высшего порядка =====================
/*
const users = [
  { name: 'Igor', age: 19 },
  { name: 'Danil', age: 1 },
  { name: 'Vovan', age: 4 },
  { name: 'Matvey', age: 16 },
]
// */
/*
const compare = (a, b) => {
  if (a.age === b.age) {
    return 0
  }

  return a.age > b.age ? 1 : -1
}

users.sort(compare)
console.log(users)
// */
/*
users.sort((a, b) => {
  if (a.age === b.age) {
    return 0
  }

  return a.age > b.age ? 1 : -1
})

console.log(users)
// */
/*
users.sort((a, b) => Math.sign(a.age - b.age))
console.log(users)
// */

// Испытание: Функции высшего порядка
/*
Реализуйте функцию takeOldest(), которая принимает на вход список пользователей и возвращает самых взрослых. Количество возвращаемых пользователей задается вторым параметром, который по умолчанию равен единице. Экспортируйте данную функцию по умолчанию.

Пример использования
const users = [
    { name: 'Tirion', birthday: 'Nov 19, 1988' },
    { name: 'Sam', birthday: 'Nov 22, 1999' },
    { name: 'Rob', birthday: 'Jan 11, 1975' },
    { name: 'Sansa', birthday: 'Mar 20, 2001' },
    { name: 'Tisha', birthday: 'Feb 27, 1992' },
    { name: 'Chris', birthday: 'Dec 25, 1995' },
];

takeOldest(users);
// [
//   { name: 'Rob', birthday: 'Jan 11, 1975' },
// ];
Другие примеры смотрите в модуле с тестами.

Подсказки
Для преобразования дат в единое представление — unixtimestamp — используйте метод Date.parse()
В рамках данного упражнения, для записи дат используется только формат RFC2822.
sortBy
Подумайте, что из себя представляет данная функция: команду или запрос?
// */

// solution my --------------
/*
const users = [
  { name: 'Tirion', birthday: 'Nov 19, 1988' },
  { name: 'Sam', birthday: 'Nov 22, 1999' },
  { name: 'Rob', birthday: 'Jan 11, 1975' },
  { name: 'Sansa', birthday: 'Mar 20, 2001' },
  { name: 'Tisha', birthday: 'Feb 27, 1992' },
  { name: 'Chris', birthday: 'Dec 25, 1995' },
]
// */
/*
const users = [
  { name: 'Tirion', birthday: 1 },
  { name: 'Sam', birthday: 4 },
  { name: 'Rob', birthday: 8 },
  { name: 'Sansa', birthday: 5 },
  { name: 'Tisha', birthday: 3 },
  { name: 'Chris', birthday: 4 },
]
// */
/*
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
console.log(takeOldest(users, 3))
// */

// solution teacher --------------------
/*
const users = [
  { name: 'Tirion', birthday: 'Nov 19, 1988' },
  { name: 'Sam', birthday: 'Nov 22, 1999' },
  { name: 'Rob', birthday: 'Jan 11, 1975' },
  { name: 'Sansa', birthday: 'Mar 20, 2001' },
  { name: 'Tisha', birthday: 'Feb 27, 1992' },
  { name: 'Chris', birthday: 'Dec 25, 1995' },
]
// */
/*
import _ from 'lodash'

const takeOldest = (obj, num = 1) => {
  const sorted = _.sortBy(obj, ({ birthday }) => Date.parse(birthday))
  return sorted.slice(0, num)
}
console.log(takeOldest(users, 3))
// */

// Теория: Отображение (map) =================
/*
const users = [
  { name: 'Igor', age: 19 },
  { name: 'Danil', age: 1 },
  { name: 'Vovan', age: 4 },
  { name: 'Matvey', age: 16 },
]
// */
/*
const map = (obj) => {
  const result = []
  for (const { name } of obj) {
    result.push(name)
  }
  console.log(result)
}

map(users)
// */

/*
const names = users.map((user) => user.name)
console.log(names)

const ages = users.map((user) => user.age)
console.log(ages)

// Или что тоже самое
const collback = (user) => user.age
console.log(users.map(collback))
// */

/*
const numbers = []
const numSum = numbers.map((num) => num + num)
console.log(numSum)
// */

/*
const myMap = (collection, callback) => {
  const result = []
  for (const item of collection) {
    // Вызов переданного колбека на каждом элементе коллекции
    const newItem = callback(item)
    // Возврат из колбека добавляется в результат массива
    result.push(newItem)
  }
  return result
}
const numbers = [1, 2, 3]
const sumNum = myMap(numbers, (num) => num + num)
console.log(sumNum)
// */

// Испытание: Отображение (map) -1
// description
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список пользователей и возвращает плоский список их детей. Дети каждого пользователя хранятся в виде массива в ключе children.

import getChildren from './users.js';

const users = [
  {
    name: 'Tirion',
    children: [
      { name: 'Mira', birthday: '1983-03-23' },
    ],
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
    children: [
      { name: 'Tisha', birthday: '2012-11-03' },
    ],
  },
];

getChildren(users);
// [
//   { name: 'Mira', birthday: '1983-03-23' },
//   { name: 'Aria', birthday: '2012-11-03' },
//   { name: 'Keit', birthday: '1933-05-14' },
//   { name: 'Tisha', birthday: '2012-11-03' },
// ];
Другие примеры смотрите в модуле с тестами.

Подсказки
flat
// */

// data -------------
/*
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
// */

// solution my --------------------
/*
const getChildren = (obj) => {
  const childName = obj.map((item) => item.children)
  return childName.flat()
}
// */

// solution teacher -------------
/*
const getChildren = (users) => {
  const childrenOfUsers = users.map(({ children }) => children)
  return childrenOfUsers.flat()
}
// */

// test --------------
/*
console.log(getChildren(users))
// */

// Теория: Фильтрация (filter) ==================
/*
const users = [
  { name: 'Igor', age: 19 },
  { name: 'Danil', age: 1 },
  { name: 'Vovan', age: 4 },
  { name: 'Matvey', age: 16 },
]
// */

/*
const filterUser = (users) => {
  const result = []
  for (const item of users) {
    if (item.age > 10) {
      result.push(item)
    }
  }
  console.log(result)
}

filterUser(users)
// */

/*
const filterUsers = users.filter((user) => user.age > 10)
console.log(filterUsers)
// */

/*
const myFilter = (collection, callback) => {
  const result = []
  for (const item of collection) {
    if (callback(item)) {
      result.push(item)
    }
  }
  return result
}

const filterUsers = myFilter(users, (user) => user.age > 10)
console.log(filterUsers)
// */

// Испытание: Фильтрация (filter)
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список пользователей и возвращает плоский список подруг всех пользователей (без сохранения ключей). Друзья каждого пользователя хранятся в виде массива в ключе friends. Пол доступен по ключу gender и может принимать значения male или female.

import getGirlFriends from './users.js';

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
    friends: [
      { name: 'Taywin', gender: 'male' },
    ],
  },
];

getGirlFriends(users);
// [
//   { name: 'Mira', gender: 'female' },
//   { name: 'Aria', gender: 'female' },
//   { name: 'Keit', gender: 'female' },
// ];
Другие примеры смотрите в модуле с тестами.

Подсказки
Так как нам нужны только друзья, то можно применить отображение map() и получить список друзей, который затем будет фильтроваться
Одно из решений задачи предполагает использование метода массива flat()
// */

// solution my ------------------
/*
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
    friends: [
      { name: 'Taywin', gender: 'male' },
    ],
  },
]
// */
/*
const getGirlFriends = (coll) => {
  return coll
    .map((user) => user.friends)
    .flat()
    .filter((friend) => friend.gender === 'female')
}
console.log(getGirlFriends(users))
// [
//   { name: 'Mira', gender: 'female' },
//   { name: 'Aria', gender: 'female' },
//   { name: 'Keit', gender: 'female' },
// ];
// */

// solution teacher ---------------
/*
const getGirlFriends = (users) => {
  const firendsOfUsers = users.map(({ friends }) => friends)
  return firendsOfUsers.flat().filter(({ gender }) => gender === 'female')
}
console.log(getGirlFriends(users))
// */

// Теория: Агрегация (reduce) ===================
/*
const users = [
  { name: 'Igor', amount: 19 },
  { name: 'Danil', amount: 1 },
  { name: 'Ivan', amount: 4 },
  { name: 'Matvey', amount: 16 },
]
// */
/*
const sumAmount = (coll) => {
  let sum = 0
  for (const user of users) {
    sum += user.amount
  }
  return sum
}
console.log(sumAmount(users))
// */

/*
const users = [
  { name: 'Petr', age: 4 },
  { name: 'Igor', age: 19 },
  { name: 'Ivan', age: 4 },
  { name: 'Matvey', age: 16 },
]

const usersByAge = {}
for (const { age, name } of users) {
  // Проверяем добавлено ли уже свойство age в результирующий объект или нет
  if (!Object.hasOwn(usersByAge, age)) {
    usersByAge[age] = []
  }
  usersByAge[age].push(name)
}
console.log(usersByAge)
// */

/*
const users = [
  { name: 'Igor', amount: 19 },
  { name: 'Danil', amount: 1 },
  { name: 'Ivan', amount: 4 },
  { name: 'Matvey', amount: 16 },
]

const sum = users.reduce((acc, user) => {
  const newAcc = acc + user.amount
  return newAcc
}, 0)

console.log(sum)
// */

// Второй пример с использованием reduce() выглядит так: ------------
/*
const users = [
  { name: 'Petr', age: 4 },
  { name: 'Igor', age: 19 },
  { name: 'Ivan', age: 4 },
  { name: 'Matvey', age: 16 },
]

const cb = (acc, user) => {
  if (!Object.hasOwn(acc, user.age)) {
    acc[user.age] = []
  }
  acc[user.age].push(user.name)
  return acc
}
const userByAge = users.reduce(cb, {})
console.log(userByAge)
// */

/*
// loop
const courses = [
  {
    name: 'Arrays',
    lessons: [{ name: 'One' }, { name: 'Two' }],
  },
  {
    name: 'Objects',
    lessons: [{ name: 'Lala' }, { name: 'One' }, { name: 'Two' }],
  },
]

let result = 0
for (const course of courses) {
  result += course.lessons.length
}
console.log(result)
// */

/*
// reduce
const courses = [
  {
    name: 'Arrays',
    lessons: [{ name: 'One' }, { name: 'Two' }],
  },
  {
    name: 'Objects',
    lessons: [{ name: 'Lala' }, { name: 'One' }, { name: 'Two' }],
  },
]

const result = courses.reduce((acc, course) => acc + course.lessons.length, 0)
console.log(result)
// */

/*

const users = [
  { name: 'Petr', age: 4 },
  { name: 'Igor', age: 19 },
  { name: 'Ivan', age: 4 },
  { name: 'Matvey', age: 16 },
]

// */

// Испытание: Агрегация (reduce)
/*
Реализуйте и экспортируйте по умолчанию функцию для группировки объектов по заданному свойству. Функция принимает аргументами массив объектов и название свойства для группировки. Она должна возвращать объект, где ключ - это значение по заданному свойству, а значение - массив с данными, подходящими для группы.

import groupBy from './groupBy.js';

const students = [
  { name: 'Tirion', class: 'B', mark: 3 },
  { name: 'Keit', class: 'A', mark: 3 },
  { name: 'Ramsey', class: 'A', mark: 4 },
];

groupBy([], ''); // {}
groupBy(students, 'mark');
// {
//   3: [
//     { name: "Tirion", class: "B", mark: 3 },
//     { name: "Keit", class: "A", mark: 3 },
//   ],
//   4: [
//     { name: "Ramsey", class: "A", mark: 4 },
//   ],
// }
Подсказки
Аналогичная функция есть в lodash, но вам её нужно создать самостоятельно
Алгоритм решения задачи с помощью цикла и редьюса одинаковый. Если вам так проще, сделайте сначала через цикл, затем перепишите через reduce
Решение этой задачи аналогично решению задачи usersByAge из теории
// */

// data
/*
const students = [
  { name: 'Tirion', class: 'B', mark: 3 },
  { name: 'Keit', class: 'A', mark: 3 },
  { name: 'Ramsey', class: 'A', mark: 4 },
]
// */

// solution my 1. Императивно
/*
const groupBy = (students, key) => {
  if (!key) return {}
  const result = {}
  for (let i = 0; i < students.length; i += 1) {
    const student = students[i]
    const groupName = student[key]
    if (result[groupName] === undefined) {
      result[groupName] = []
    }
    result[groupName].push(student)
  }
  return result
}
// */

// solution my 2. смешанный стиль
/*
const groupBy = (students, key) => {
  if (!key) return {}
  return students.reduce((acc, student) => {
    if (!Object.hasOwn(acc, student[key])) {
      acc[student[key]] = []
    }
    acc[student[key]].push(student)
    return acc
  }, {})
}
// */

// solution teacher Декларативно
/*
const groupBy = (students, key) => {
  if (!key) return {}
  return students.reduce((acc, student) => {
    const groupName = student[key]
    const group = acc[groupName] ?? []
    return { ...acc, [groupName]: group.concat(student) }
  }, {})
}
// */

// test
/*
console.log(groupBy([], '')) // {}
console.log(groupBy(students, '')) // {}
console.log(groupBy([], 'class')) // {}
console.log(groupBy(students, 'class'))
console.log(groupBy(students, 'mark'))
console.log(groupBy(students, 'name'))
// */

// Теория: Цепочка операций ===========================

// Испытание: Цепочка операций
// description ---------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список емейлов, а возвращает количество емейлов, расположенных на каждом бесплатном домене. Список бесплатных доменов хранится в константе freeEmailDomains.

Примеры
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
];

getFreeDomainsCount(emails);
// {
//   'gmail.com': 3,
//   'yandex.ru': 2,
//   'hotmail.com': 2,
// };
Другие примеры смотрите в модуле с тестами.

Подсказки
При решении вам может понадобится функция get() из библиотеки lodash.
// */

// data ---------------
/*
import get from 'lodash/get.js'

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

const freeEmailDomains = [
  'gmail.com',
  'yandex.ru',
  'hotmail.com',
  'yahoo.com',
]
// */

// solution my ---------------
/*
const getFreeDomainsCount = (emails) => {
  return emails
    .map((email) => email.split('@')[1])
    .filter((domain) => freeEmailDomains.includes(domain))
    .reduce((acc, domain) => {
      acc[domain] = (acc[domain] || 0) + 1
      return acc
    }, {})
}
// */

// solution teacher ------------
/*
const getFreeDomainsCount = (emails) => {
  return emails
    .map((email) => {
      const [, domain] = email.split('@')
      return domain
    })
    .filter((domain) => freeEmailDomains.includes(domain))
    .reduce((acc, domain) => {
      const count = get(acc, domain, 0) + 1
      return { ...acc, [domain]: count }
    }, {})
}
// */

// tests -----------------
/*
console.log(getFreeDomainsCount(emails))
// */

// Теория: Парадигмы программирования ===================
/*
// Поиск максимального числа imperative
const numbers = [10, 20, 52, 105, 56, 89, 96]
let max = numbers[0]
for (const num of numbers) {
  if (num > max) {
    max = num
  }
}
console.log(max)
// */

/*
// Поиск максимального числа declarative
const numbers = [10, 20, 52, 105, 56, 89, 96]
const max = numbers.reduce(
  (acc, number) => number > acc ? number : acc,
  numbers[0],
)
console.log(max)
// */

// Теория: Рекурсия =======================
/*
const f = () => {
  f()
}
// */

/*
const factorial = (n) => {
  return 1 * 2 * 3 * 4
}
// */

/*
const factorial = (n) => {
  if (n === 0) {
    return 1
  }
  else {
    return n * factorial(n - 1)
  }
}
const answer = factorial(3)
console.log(answer)
// */

/*
const factorial = (n) => {
  if (n === 0) return 1
  return n * factorial(n - 1)
}
console.log(factorial(3))
// */

// Испытание: Рекурсия
// description
/*
Допишите (с использованием рекурсивного процесса) функцию sequenceSum(), которая находит сумму последовательности целых чисел. Последовательность задается двумя значениями: begin - начало последовательности, end - конец последовательности. Например: begin = 2 и end = 6 дают нам такую последовательность 2, 3, 4, 5, 6. Сумма такой последовательности будет: 20.

import sequenceSum from './sequenceSum';

sequenceSum(1, 5); // 1 + 2 + 3 + 4 + 5 = 15
sequenceSum(4, 10); // 4 + 5 + 6 + 7 + 8 + 9 + 10 = 49
sequenceSum(-3, 2); // (-3) + (-2) + (-1) + 0 + 1 + 2 = -3
Подсказки
Последовательность, в которой begin > end, не содержит ни одного числа, т.е. является "пустой". Вычислить сумму чисел такой последовательности не представляется возможным, в этом случае возвращаем NaN
Сумма чисел последовательности, в которой begin === end, равна begin (или end)
// NaN (т.к. это "пустая" последовательность)
sequenceSum(7, 2);

// 0 (т.к. это единственное число, входящее в последовательность)
sequenceSum(0, 0);
// 6 (т.к. это единственное число, входящее в последовательность)
sequenceSum(6, 6);
В файле sequenceSum.test.js можно посмотреть все варианты параметров, с которыми будет вызвана ваша функция.
// */

// solution my ------------------
/*
const sequenceSum = (begin, end) => {
  if (begin > end) return NaN
  if (begin === end) return begin
  return begin + sequenceSum(begin + 1, end)
}
// */

// sequenceSum(1, 5)
// 1 + sequenceSum(2, 5)
// 1 + 2 + sequenceSum(3, 5)
// 1 + 2 + 3 + sequenceSum(4, 5)
// 1 + 2 + 3 + 4 + sequenceSum(5, 5)
// 1 + 2 + 3 + 4 + 5

// tests ----------------
/*
console.log(sequenceSum(0, 0)) // .toBe(0)
console.log(sequenceSum(1, 1)) // .toBe(1)
console.log(sequenceSum(1, 5)) // .toBe(15)
console.log(sequenceSum(2, 6)) // .toBe(20)
console.log(sequenceSum(-1, -1)) // .toBe(-1)
console.log(sequenceSum(-5, 4)) // .toBe(-5)
console.log(sequenceSum(2, 1)) // .toBe(true)
console.log(sequenceSum(1, -5)) // ).toBe(true)
// */

// Теория: Итеративный процесс =======================
/*
const factorial = (n) => {
  if (n === 0) {
    return 1
  }

  const iter = (counter, acc) => {
    if (counter === 1) {
      return acc
    }

    return iter(counter - 1, counter * acc)
  }

  return iter(n, 1)
}

// iter(3, 1) // iter(3 - 1, 3 * 1);
// iter(2, 3) // iter(2 - 1, 2 * 3);
// iter(1, 6) // counter === 1, return 6
// 6

console.log(factorial(3))
// */

// Испытание: Итеративный процесс
// description -------------
/*
Реализуйте тело функции smallestDivisor(), используя итеративный процесс. Функция должна находить наименьший делитель заданного числа. Число, передаваемое в функцию, больше нуля.

Доп. условие: делитель должен быть больше единицы, за исключением случая, когда аргументом является единица (наименьшим делителем которой является также единица).

Например, наименьший делитель числа 15 это 3.

smallestDivisor(15); // 3
smallestDivisor(17); // 17
Идея алгоритма:

Попробуйте разделить число на 2
Если число делится без остатка, то это наименьший делитель
Если нет, то попробуйте следующий делитель
Если ничего не делит число без остатка, то переданное число является простым, так что его наименьший делитель — оно само (не считая 1)
Подсказки
Вспомните про оператор % (modulus или остаток от деления). Он вычисляет остаток от деления одного операнда на другой. Например, 11 % 5 = 1, а 10 % 2 = 0. Так что если x % y это 0, то y делит x без остатка
// */

// solution my ---------------
/*
const smallestDivisor = (num) => {
  const iter = (divisor) => {
    if (divisor ** 2 > num) {
      return num
    }
    if (num % divisor === 0) {
      return divisor
    }

    return iter(divisor + 1)
  }

  return iter(2)
}
// */

// solution teacher -----------------
/*
const smallestDivisor = (num) => {
  const iter = (acc) => {
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
// */

// tests ----------------
/*
console.log(smallestDivisor(1)) // (1)
console.log(smallestDivisor(3)) // (3)
console.log(smallestDivisor(4)) // (2)
console.log(smallestDivisor(8)) // (2)
console.log(smallestDivisor(9)) // (3)
console.log(smallestDivisor(17)) // (17)
console.log(smallestDivisor(15)) // (3)
console.log(smallestDivisor(121)) // (11)
// */

// Теория: Абстракция с помощью функций =====================

// Испытание: Слияние словарей
// description ------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая объединяет несколько словарей (объектов) в один общий словарь. Функция принимает любое количество аргументов и возвращает результат в виде объекта, в котором каждый ключ содержит список уникальных значений в виде массива. Элементы в списке располагаются в том порядке, в котором они появляются во входящих словарях.

Примеры работы:

merge({}, {}, {});
// {}

merge({ a: 1, b: 2 }, { a: 3 });
// { a: [1, 3], b: [2] }

merge(
    { a: 1, b: 2, c: 3 },
    {},
    { a: 3, b: 2, d: 5 },
    { a: 6 },
    { b: 4, c: 3, d: 2 },
    { e: 9 },
  );
// { a: [1, 3, 6], b: [2, 4], c: [3], d: [5, 2], e: [9] }
// */

// data -------------
/*
import _ from 'lodash'
// */

// solution my -------------
/*
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
// */

// solution teacher -------------------
/*
const cons = (list, el) => _.union(list, [el])

const merge = (...dictionaries) => _.mergeWith({}, ...dictionaries, cons)
// */

// tests -------------
/*
// #1
console.log(merge(
  { a: 1, b: 2 },
  { a: 3 },
)) // { a: [1, 3], b: [2] }
// #2
console.log(
  merge(
    { a: 1, b: 2 },
    { a: 3, c: 0 },
  ),
) //  { a: [1, 3], b: [2], c: [0] }
// #3
console.log(
  merge(
    { a: 1, b: 2, c: 3 },
    { a: 3, b: 4 },
    { a: 7, c: 1, d: 8 },
  ),
) // { a: [1, 3, 7], b: [2, 4], c: [3, 1], d: [8], }
// #4
console.log(merge(
  { a: 1, b: 2, c: 3 },
  { a: 3, b: 4 },
  { a: 3, b: 2, d: 5 },
)) // { a: [1, 3], b: [2, 4], c: [3], d: [5] }
// #5
console.log(
  merge(
    { a: 1, b: 2, c: 3 },
    {},
    { a: 3, b: 2, d: 5 },
    { a: 6 },
    { b: 4, c: 3, d: 2 },
    { e: 9 },
  ),
) // {a: [1, 3, 6], b: [2, 4], c: [3], d: [5, 2], e: [9],}
// #6
console.log(merge({}, {}, {}, {})) // {}
// */

// Испытание: Фильтр анаграмм
// description -----------
/*
Анаграммы — это слова, которые состоят из одинаковых букв. Например:

спаниель — апельсин
карат — карта — катар
топор — ропот — отпор
filterAnagrams.js
Реализуйте и экспортируйте по умолчанию функцию, которая находит все анаграммы слова. Функция принимает исходное слово и список для проверки (массив), а возвращает массив всех анаграмм. Если в списке слов отсутствуют анаграммы, то возвращается пустой массив.

Примеры
filterAnagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']);
// ['aabb', 'bbaa']

filterAnagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']);
// ['carer', 'racer']

filterAnagrams('laser', ['lazing', 'lazy',  'lacer']);
// []
// */

// solution my ---------------
/*
const filterAnagrams = (key, arr) => {
  const sortWord = (str) => str.split('').sort().join('')
  const target = sortWord(key)
  return arr.filter((word) => sortWord(word) === target)
}
// */

// tests -------------
/*
// 1
console.log(filterAnagrams('laser', ['lazing', 'lazy', 'lacer']))
// .toEqual([])
// 2
console.log(filterAnagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']))
// .toEqual(['aabb', 'bbaa'])
// 3
console.log(filterAnagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']))
// .toEqual(['carer', 'racer'])
// */

// Испытание: Вертикальная гистограмма
// description --------------
/*
Игральная кость — шестигранный кубик, который бросается несколько раз. Гистограмма — это графическое представление данных в виде столбцов или колонок.

histogram.js
Реализуйте и экспортируйте по умолчанию функцию, которая выводит на экран вертикальную гистограмму. Функция принимает на вход количество бросков кубика и функцию, которая имитирует бросок игральной кости (её реализовывать не нужно). Вызов этой функции генерирует значение от 1 до 6, что соответствует одной из граней игральной кости.

Гистограмма содержит столбцы, каждому из которых соответствует грань игральной кости и количество выпадений этой грани. Результаты отображаются графически (с помощью символов #) и в виде процентного значения от общего количества бросков, за исключением случаев, когда количество равно 0 (нулю).

Дополнительные условия:

Процентные значения должны быть прижаты влево относительно столбца.
Значения сторон игральной кости должны быть посредине столбца.
Столбцы между собой разделены пробелом
Количество секций в столбце (высота столбца) должно соответствовать количеству выпадений каждой из сторон игральной кости.
Примеры
import displayHistogram from '../histogram.js';

displayHistogram(32, rollDie);
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

displayHistogram(13, rollDie);
// =>                 31% 31%
//                    ### ###
//        15%     15% ### ###
//        ### 8%  ### ### ###
//        ### ### ### ### ###
//    -----------------------
//     1   2   3   4   5   6
Подсказки:
Гистограмма.
Для решения задачи активно используйте функции из библиотеки lodash.
При получении процентного значения используйте стандартные правила округления числа.
// */

// data -------------
/*
import _ from 'lodash'
const rollDie = () => Math.floor(Math.random() * 6) + 1
// */

// solution my -----------------
/*
const displayHistogram = (count, rollDie) => {
  const rolls = _.times(count, rollDie)
  const stats = _.countBy(rolls)
  const sides = _.range(1, 7)

  const data = sides.map((side) => {
    const occurrences = stats[side] || 0
    const percentage = Math.round((occurrences / count) * 100)
    return { side, occurrences, percentage }
  })

  const maxHeight = _.max(_.map(data, 'occurrences'))
  const lines = []

  for (let h = maxHeight + 1; h > 0; h -= 1) {
    const line = data.map(({ occurrences, percentage }) => {
      if (occurrences === h - 1 && percentage > 0) {
        return `${percentage}%`.padEnd(3)
      }
      if (occurrences >= h) {
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
// */

// solution my2 ------------
/*
const displayHistogram = (roundsCount, rollDie) => {
  const bar = '###'
  const width = 4
  const numbers = _.times(roundsCount, rollDie)
  const sides = _.range(1, 7)
  const counts = _.countBy(numbers)

  const data = sides.map((side) => {
    const occurrance = _.get(counts, side, 0)
    const percentage = Math.round((occurrance / roundsCount) * 100)
    return { side, occurrance, percentage }
  })

  const maxHeight = _.max(_.map(data, 'occurrance'))

  const chartLines = _.range(maxHeight, -1, -1).map((i) => {
    const line = data.map(({ occurrance, percentage }) => {
      if (occurrance === i && percentage > 0) return `${percentage}%`.padEnd(width)
      if (occurrance > i) return bar.padEnd(width)
      return ' '.repeat(width)
    })
    return _.trimEnd(line.join(''))
  })

  const separator = '-'.repeat(width * sides.length).slice(0, -1)
  const footer = _.trimEnd(sides.map((side) => ` ${side} `.padEnd(width)).join(''))

  console.log([...chartLines, separator, footer].join('\n'))
}
// */

// solution teacher ----------------
/*
const displayHistogram = (roundsCount, rollDie) => {
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
  const lineWithSides = sides.map((side) => ` ${side} `.padEnd(width)).join('')
  lines.push(_.trimEnd(lineWithSides))

  const str = lines.join('\n')
  console.log(str)
}
// */

// test ----------------
/*
displayHistogram(10, rollDie)
// */

// Испытание: Одинаковая четность
// description --------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив и возвращает новый, состоящий из элементов, у которых такая же чётность, как и у первого элемента входного массива.

Примеры
sameParity([-1, 0, 1, -3, 10, -2]); // [-1, 1, -3]
sameParity([2, 0, 1, -3, 10, -2]); // [2, 0, 10, -2]
sameParity([]); // []
// */

// data
//*

// */

// solution my
/*
const sameParity = (arr) => {
  const first = arr[0]
  const isFirstNum = Math.abs(first % 2) === 0
  return arr.filter((item) => {
    const isItemNum = Math.abs(item % 2) === 0
    return isFirstNum === isItemNum
  })
}
// */

// solution teacher
/*
const isEven = (num) => num % 2 === 0
const sameParity = (arr) => {
  const firstEvenParity = isEven(arr[0])
  return arr.filter((el) => isEven(el) === firstEvenParity)
}
// */

// test ----------------
/*
console.log(sameParity([5, 0, 1, -3, 10])) // [5, 1, -3]
console.log(sameParity([2, 0, 1, -3, 10, -2])) // [2, 0, 10, -2]
console.log(sameParity([-1, 0, 1, -3, 10, -2])) // [-1, 1, -3]
console.log(sameParity([10, -1.5, 1.3, -3, 25, -2])) // [10, -2]
console.log(sameParity([])) // []
// */

// Испытание: Теория вероятности
// description --------------
/*
Игральная кость – шестигранный кубик, который бросается несколько раз.

probabilities.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход историю подбрасывания кубика в виде массива и возвращает объект. Ключом этого объекта служит число из списка, а значением – ещё один объект, в котором ключи – это числа, выпавшие сразу после первоначального числа, а значения – вероятность их выпадения.

Например, если передать на вход массив [1, 3, 1, 5, 1], итоговый объект будет выглядеть так:

{
  1: { 3: 0.5, 5: 0.5 },
  3: { 1: 1 },
  5: { 1: 1 },
};
После числа 1 выпадали числа 3 и 5 с равной долей вероятности 0.5. А после чисел 3 и 5 всегда выпадала единица, что даёт нам вероятность в 1.

calculateProbabilities([]); // {}
calculateProbabilities([1, 3, 1, 5, 1, 2, 1, 6]);
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
// */

// data
/*
import _ from 'lodash'
// */

// solution my
/*
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
    return _.mapValues(followers, (count) => count / total)
  })
}
// */

// solution teacher
/*
const countElements = (elements, element) => elements
  .reduce((acc, current) => (current === element ? acc + 1 : acc), 0)

const findProbabilityForElement = (elements, element) => elements
  .filter((current, index) => elements[index - 1] === element)
  .reduce((acc, currentElements, i, filtered) => {
    const totalElements = filtered.length
    const probability = countElements(filtered, currentElements) / totalElements
    return ({ ...acc, [currentElements]: probability })
  }, {})

const calculateProbabilities = (numbers) => _.uniq(numbers)
  .reduce((acc, number) => {
    const probabilities = findProbabilityForElement(numbers, number)
    return { ...acc, [number]: probabilities }
  }, {})

// */

// test ----------------
/*
console.log(calculateProbabilities([]))
// {}

console.log(calculateProbabilities([1, 3, 1, 5, 1]))
//   {
//     1: { 3: 0.5, 5: 0.5 },
//     3: { 1: 1.0 },
//     5: { 1: 1.0 },
//   }

console.log(calculateProbabilities([1, 3, 1, 5, 1, 2, 1, 6]))
//   {
//     1: {
//       2: 0.25,
//       3: 0.25,
//       5: 0.25,
//       6: 0.25,
//     },
//     2: { 1: 1 },
//     3: { 1: 1 },
//     5: { 1: 1 },
//     6: {},
//   }

console.log(calculateProbabilities([2, 3, 2, 5, 2, 2, 1, 3]))
//   {
//     1: { 3: 1 },
//     2: {
//       1: 0.25,
//       2: 0.25,
//       3: 0.25,
//       5: 0.25,
//     },
//     3: { 2: 1 },
//     5: { 2: 1 },
//   }

console.log(calculateProbabilities([1, 3, 1, 5, 1, 2, 1, 6, 1, 3]))
//   {
//     1: {
//       2: 0.2,
//       3: 0.4,
//       5: 0.2,
//       6: 0.2,
//     },
//     2: { 1: 1 },
//     3: { 1: 1 },
//     5: { 1: 1 },
//     6: { 1: 1 },
//   }
// */

// Испытание: Столбчатая диаграмма
// description --------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая выводит на экран столбчатую диаграмму. Функция принимает в качестве параметра последовательность чисел, длина которой равна количеству столбцов диаграммы. Размер диаграммы по вертикали должен определяться входными данными.

Примеры
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
Подсказки:
Для решения задачи вы можете использовать функции из библиотеки lodash
// */

// data
/*
import _ from 'lodash'
// */

// solution my
/*
const barChart = (arr) => {
  if (arr.length === 0) return

  const barPositive = '*'
  const barNegative = '#'

  const maxVal = _.max(arr)
  const minVal = _.min(arr)

  const max = maxVal > 0 ? maxVal : 0
  const min = minVal < 0 ? minVal : 0

  const result = []

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
// */

// solution teacher
/*
const barChart = (numbers) => {
  const bottom = Math.min(0, ...numbers)
  const top = Math.max(0, ...numbers)

  const lines = numbers.map((number) => {
    const bar = number > 0 ? '*'.repeat(number) : '#'.repeat(Math.abs(number))
    const bottomSpace = ' '.repeat(Math.min(0, number) - bottom)
    const topSpace = ' '.repeat(top - Math.max(0, number))

    return [...topSpace, ...bar, ...bottomSpace]
  })

  const chart = _.zip(...lines)
    .map((line) => line.join(''))
    .join('\n')

  console.log(chart)
}
// */

// test ----------------
/*
barChart([5, 10, -5, -3, 7])
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
// */

// Испытание: Валидатор IPv6
// description --------------
/*
Реализуйте функцию-предикат isValidIPv6(), которая проверяет IPv6-адреса (адреса шестой версии интернет протокола) на корректность. Функция принимает на вход строку с адресом IPv6 и возвращает true, если адрес корректный, а в противном случае false. Экспортируйте функцию по умолчанию.

Дополнительные условия:

Работа функции не зависит от регистра символов
Ведущие нули в группах цифр необязательны
Самая длинная последовательность групп нулей, например, :0:0:0: может быть заменена на два двоеточия ::. Такую замену можно произвести только один раз
Примеры
isValidIPv6('10:d3:2d06:24:400c:5ee0:be:3d'); // true
isValidIPv6('0B0:0F09:7f05:e2F3:0D:0:e0:7000'); // true
isValidIPv6('000::B36:3C:00F0:7:937'); // true
isValidIPv6('::1'); // true
isValidIPv6('1001:208:67:4f00:e3::2c6:0'); // true

isValidIPv6('2607:G8B0:4010:801::1004'); // false
isValidIPv6('2.001::'); // false
isValidIPv6('9f8:0:69S0:9:9:d9a:672:f90d'); // false
Подсказки
IPv6
Для проверки пограничных случаев внимательно изучите список IP-адресов в модуле с тестами
// */

// data
/*
import _ from 'lodash'
// */

// solution my
/*
const isValidIPv6 = (str) => {
  const regex =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/
  return regex.test(str)
}
// */

// solution teacher
/*
const isValidatorGroup = (group) => {
  const number = Number(`0x${group}`)
  return group.length <= 4 && !_.isNaN(number)
}

const isValidIPv6 = (ip) => {
  if (ip.indexOf('::') !== ip.lastIndexOf('::')) {
    return false
  }

  const isSort = ip.includes('::')
  const groups = ip
    .split('::')
    .filter((group) => group !== '')
    .flatMap((part) => part.split(':'))
  const length = isSort ? groups.length + 1 : groups.length

  if ((!isSort && length < 8) || length > 8) {
    return false
  }

  return groups.every(isValidatorGroup)
}
// */

// test ----------------
/*
// true
console.log(isValidIPv6('2a03:2880:2130:cf05:face:b00c:0:1'))
console.log(isValidIPv6('::b36:3c:f0:7:937'))
console.log(isValidIPv6('000::B36:3C:00F0:7:937'))
console.log(isValidIPv6('0B0:0F09:7f05:e2F3:0D:0:e0:7000'))
console.log(isValidIPv6('10:d3:2d06:24:400c:5ee0:be:3d'))
console.log(isValidIPv6('::'))
console.log(isValidIPv6('::1'))
console.log(isValidIPv6('1::1'))
console.log(isValidIPv6('2a02:cb41:0:0:0:0:0:7'))
console.log(isValidIPv6('e:6c::647:50:0:7'))
console.log(isValidIPv6('04:07A1:1404:0A0:A:080F:080:0'))
console.log(isValidIPv6('1001:208:67:4f00:e3::2c6:0'))

// false
console.log(isValidIPv6('2607:G8B0:4010:801::1004'))
console.log(isValidIPv6('2001::0:64::2'))
console.log(isValidIPv6('2001'))
console.log(isValidIPv6('2001:::'))
console.log(isValidIPv6('2.001::'))
console.log(isValidIPv6('9f8:0:69S0:9:9:d9a:672:f90d'))
console.log(isValidIPv6('e1b6:1daf9:6:0:c50:8c4:90e:e'))
console.log(isValidIPv6('C00D::a2195:2EA9:096'))
console.log(isValidIPv6('d:0:4:a004:3b96:10b0:10:800:15'))
console.log(isValidIPv6('5c03:0:a::b825:d690:4ce0:2831:acf0'))
console.log(isValidIPv6(':1::1'))
console.log(isValidIPv6('1::1:'))
console.log(isValidIPv6('2a02:0cb41:0:0:0:0:0:7'))
// */

// Испытание: NRZI кодирование
// description --------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает строку в виде графического представления линейного сигнала и возвращает строку с бинарным кодом. Внимательно изучите примеры.

Примеры:
const signal1 = '_|¯|____|¯|__|¯¯¯';
nrzi(signal1); // '011000110100'

const signal2 = '|¯|___|¯¯¯¯¯|___|¯|_|¯';
nrzi(signal2); // '110010000100111'

const signal3 = '¯|___|¯¯¯¯¯|___|¯|_|¯';
nrzi(signal3); // '010010000100111'

const signal4 = '';
nrzi(signal4); // ''

const signal5 = '|';
nrzi(signal5); // ''
Подсказки
Символ | в строке указывает на переключение сигнала и означает, что уровень сигнала в следующем такте будет изменён на противоположный по сравнению с предыдущим.
// */

// data -------------
//*

// */

// solution my --------------

// */

// solution teacher ---------------
/*
const nrzi = (str) => {
  return str
    .split('')
    .map((e, i, arr) => {
      if (e === '|') return ''
      return arr[i - 1] === '|' ? 1 : 0
    })
    .join('')
}
// test ----------------
//*
console.log(nrzi('')) // ''
console.log(nrzi('|')) // ''
console.log(nrzi('¯|__|¯|___|¯¯')) // '010110010'
console.log(nrzi('_|¯¯¯|_|¯¯¯¯|_|¯¯')) // '010011000110'
console.log(nrzi('¯|___|¯¯¯¯¯|___|¯|_|¯')) // '010010000100111'
console.log(nrzi('|¯|___|¯¯¯¯¯|___|¯|_|¯')) // '110010000100111'
// */

// Испытание: Парсинг конфигурации
// description --------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход содержимое конфигурационного файла в виде строки, находит в нём переменные окружения, которые нужно передать и возвращает их в виде строки формата "имя1=значение1,имя2=значение2,имя3=значение3,...".

Переменные окружения в конфигурационном файле устанавливаются командой environment, после которой в кавычках указан список переменных через запятую.

environment="X_FORWARDED_MAIL=tirion@google.com,X_FORWARDED_HOME=/home/tirion,language=en"
Те переменные, которые нужно пробросить, начинаются с префикса X_FORWARDED_. В итоговую строку имена переменных должны попадать без этого префикса. Например, если в конфигурационном файле переменная устанавливается так: X_FORWARDED_HOME=/home/tirion, то в итоговой строке она должна выглядеть так: "HOME=/home/tirion".

[program:prepare]
command=sudo -HEu tirion /bin/bash -c 'cd /usr/src/app && make prepare'
autorestart=false
environment="X_FORWARDED_MAIL=tirion@google.com,X_FORWARDED_HOME=/home/tirion,language=en"

[program:http_server]
command=sudo -HEu tirion /bin/bash -c 'cd /usr/src/app && make environment'
environment="key5=value5,X_FORWARDED_var3=value,key6=value6"
// Читаем содержимое файла и записываем его в константу content. Реализовывать это в домашней работе не нужно.
const content = fs.readFileSync("s.conf", 'utf-8');

// Передаем содержимое файла в функцию
const result = getForwardedVariables(content);
console.log(result); // => "MAIL=tirion@google.com,HOME=/home/tirion,var3=value"
// */

// data -------------
/*
const content =
  'environment="X_FORWARDED_MAIL=tirion@google.com,X_FORWARDED_HOME=/home/tirion,language=en"'
// */

// solution my --------------
/*
const getForwardedVariables = (str) => {
  const matches = str.matchAll(/environment="([^"]+)"/g)

  const result = []

  for (const match of matches) {
    const envVar = match[1].split(',')

    envVar.forEach((item) => {
      if (item.startsWith('X_FORWARDED_')) {
        result.push(item.replace('X_FORWARDED_', ''))
      }
    })
  }

  return result.join(',')
}
// */

// solution teacher ---------------
/*
const getForwardedVariables = (config) => {
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
// */

// test ----------------
/*
console.log(getForwardedVariables(content)) // MAIL=tirion@google.com,HOME=/home/tirion
// */

// Испытание: Морской бой 2
// description --------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход поле боя в виде квадратного двумерного массива из нулей и единиц. Ноль — пустая ячейка, единица — часть корабля. Функция должна вернуть количество кораблей на поле боя.

В отличие от классической игры "Морской бой", в данном варианте корабли могут изгибаться буквой "г" и "змейкой".

calcShipsCount([]); // 0
calcShipsCount([
  [1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [1, 1, 1, 0, 0, 1],
  [0, 0, 0, 0, 1, 1],
  [0, 1, 0, 0, 1, 0],
]); // 5
Подсказки
При необходимости используйте функции из библиотеки lodash
// */

// data -------------
/*
import _ from 'lodash'
// */

// solution my the best --------------
/*
const calcShipsCount = (field) => {
  if (field.length === 0 || field[0].length === 0) return 0

  let count = 0

  const rows = field.length
  const cols = field[0].length
  const visited = new Set()

  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      const key = `${i},${j}`

      if (field[i][j] === 1 && !visited.has(key)) {
        count += 1
        console.log(
          `--- Нашли новый корабль №${count} в точке [${i}, ${j}] ---`,
        )

        const queue = [[i, j]]
        visited.add(key)
        let head = 0

        while (head < queue.length) {
          const currentPos = queue[head]
          console.log(
            `  Сканируем соседей клетки: [${currentPos}] (head: ${head})`,
          )
          const [r, c] = currentPos
          head += 1

          const direction = [
            [r - 1, c],
            [r + 1, c],
            [r, c - 1],
            [r, c + 1],
          ]

          for (const [nr, nc] of direction) {
            const neighborKey = `${nr},${nc}`
            if (
              nr >= 0 &&
              nr < rows &&
              nc >= 0 &&
              nc < cols &&
              field[nr][nc] === 1 &&
              !visited.has(neighborKey)
            ) {
              visited.add(neighborKey)
              queue.push([nr, nc])
              console.log(
                `    Найдена соседняя палуба: [${nr}, ${nc}]. Добавляем в очередь.`,
              )
            }
          }
        }
        console.log(`--- Корабль №${count} полностью обработан ---\n`)
      }
    }
  }

  return count
}
// */

// solution teacher ---------------
/*
const getShipsDecks = (battleField) =>
  battleField.reduce(
    (acc, line) => acc + line.filter((item) => item === 1).length,
    0,
  )

const calcShipsCount = (battleField) => {
  let battleshipsCount = 0
  let battleshipsDecks = 0

  ;[battleField, _.zip(...battleField)].forEach((field) =>
    field.forEach((line) => {
      const battleships = line
        .join('')
        .split(0)
        .filter((ship) => ship.length > 1)
      battleshipsCount += battleships.length
      battleshipsDecks += battleships.reduce(
        (acc, ship) => acc + ship.length,
        0,
      )
    }),
  )

  const correctionCount = getShipsDecks(battleField) - battleshipsDecks
  return battleshipsCount + correctionCount
}
// */

// solution teacher 2 // ищет по хвостам корабля
/*
const calcShipsCount = (battleField) => {
  return battleField.reduce((shipsCount, row, i) => {
    let bendedShip
    console.log(`\n=== Строка ${i} ===`)

    return row.reduce((count, cell, j) => {
      const shipHasLowerDeck = battleField[i + 1] && battleField[i + 1][j]
      const shipHasRightDeck = battleField[i][j + 1]

      if (cell !== 0) {
        console.log(`Клетка [${i}, ${j}]: Вижу палубу.`)
        if (shipHasLowerDeck) {
          bendedShip = true
          console.log(
            `  └─ Есть палуба снизу. Помечаем корабль как "вертикальный" (bendedShip = true).`,
          )
        }
        if (!shipHasRightDeck && !bendedShip) {
          console.log(
            `  └─ Соседей справа и снизу нет. Это конец корабля! +1 к счетчику.`,
          )
          return count + 1
        }
      } else {
        console.log(`Клетка [${i}, ${j}]: Вода. Сбрасываем флаг bendedShip.`)
        bendedShip = false
      }
      return count
    }, shipsCount)
  }, 0)
}
// */

// test ----------------
/*
console.log(calcShipsCount([])) // 0
console.log(
  calcShipsCount([
    [1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 1, 0, 0, 1, 0],
  ]),
) // 5
console.log(
  calcShipsCount([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]),
) // 1
// */

// Испытание: Переворот строки
// description --------------
/*
Реализуйте и экспортируйте функцию по умолчанию, которая переворачивает строку задом наперед, используя рекурсию.

Например:

import reverse from './reverse'

reverse('str') // rts
reverse('hexlet') // telxeh
Попробуйте решить эту задачу, используя рекурсивный процесс. Для этого вам понадобится метод slice().

Подсказки
Чтобы узнать длину строки, используйте свойство length:

'welcome'.length // 7
Чтобы получить подстроку из строки, используйте метод slice():

'welcome'.slice(1, 4) // 'elc';
// */

// data -------------
//*

// */

// solution my--------------
/*
const reverse = (str) => {
  if (str.length === 0) {
    return str
  }
  return str.slice(-1) + reverse(str.slice(0, -1))
}
// */

// solution teacher
/*
const reverse = (str) =>
  str.length === 0 ? str : `${str.slice(-1)}${reverse(str.slice(0, -1))}`
// */

// test ----------------
/*
console.log(reverse('str')) // rts
console.log(reverse('hexlet')) // telxeh
console.log(reverse('')) // ''
// */

// Испытание: Счётчик одногодок
// description --------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает список пользователей и возвращает объект, где ключ - это год рождения, а значение - это количество мужчин, родившихся в этот год.

Подсказки
Для извлечения года из даты используйте метод slice
// */

// data -------------
/*
import _ from 'lodash'
const users = [
  { name: 'Bronn', gender: 'male', birthday: '1973-03-23' },
  { name: 'Reigar', gender: 'male', birthday: '1973-11-03' },
  { name: 'Eiegon', gender: 'male', birthday: '1963-11-03' },
  { name: 'Sansa', gender: 'female', birthday: '2012-11-03' },
  { name: 'Jon', gender: 'male', birthday: '1980-11-03' },
  { name: 'Robb', gender: 'male', birthday: '1980-05-14' },
  { name: 'Tisha', gender: 'female', birthday: '2012-11-03' },
  { name: 'Rick', gender: 'male', birthday: '2012-11-03' },
  { name: 'Joffrey', gender: 'male', birthday: '1999-11-03' },
  { name: 'Edd', gender: 'male', birthday: '1973-11-03' },
]
// */

// solution my 1--------------
/*
const getMenCountByYear = (str) => {
  return str
    .filter((item) => item.gender === 'male')
    .reduce((acc, user) => {
      const year = new Date(user.birthday).getFullYear()
      acc[year] = (acc[year] || 0) + 1
      return acc
    }, {})
}
// */

// solution my 2 --------------
/*
const getMenCountByYear = (coll) => {
  const man = coll.filter(({ gender }) => gender === 'male')
  return _.countBy(man, ({ birthday }) => birthday.slice(0, 4))
}
// */

// solution teacher
/*
const getMenCountByYear = (users) => {
  const man = users.filter(({ gender }) => gender === 'male')
  const years = man.map(({ birthday }) => birthday.slice(0, 4))

  return years.reduce((acc, year) => {
    const count = _.get(acc, year, 0) + 1

    return { ...acc, [year]: count }
  }, {})
}
// */

// test ----------------
/*
console.log(getMenCountByYear(users))
// {
//   1973: 3,
//   1963: 1,
//   1980: 2,
//   2012: 1,
//   1999: 1,
// };
// */

// Испытание: Поиск ближайшего соседа
// description --------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив чисел и искомое число. Задача функции — найти в массиве ближайшее число к искомому и вернуть его индекс в массиве.

Если в массиве содержится несколько чисел, одновременно являющихся ближайшими к искомому числу, то возвращается наименьший из индексов ближайших чисел.
// */

// data -------------
//*

// */

// solution my --------------
/*
const findIndexOfNearest = (arr, target) => {
  if (arr.length === 0) return null

  return arr.reduce((closestElement, currentElement, currentIndex) => {
    const currentDiff = Math.abs(currentElement - target)
    const closestDiff = Math.abs(arr[closestElement] - target)

    return currentDiff < closestDiff ? currentIndex : closestElement
  }, 0)
}
// */

// solution teacher ----------------
/*
const findIndexOfNearest = (numbers, num) => {
  if (numbers.length === 0) return null

  const diffs = numbers.map((item) => Math.abs(num - item))

  return diffs.reduce(
    (index, diff, currentIndex) => (diff < diffs[index] ? currentIndex : index),
    0,
  )
}
// */

// test ----------------
/*
console.log(findIndexOfNearest([], 2)) // null
console.log(findIndexOfNearest([15, 10, 3, 4], 0)) // 2
console.log(findIndexOfNearest([7, 5, 3, 2], 4)) // 1
console.log(findIndexOfNearest([7, 5, 4, 4, 3], 4)) // 2
// */

// Испытание: Конвертер цветов
/*
Для задания цветов в HTML и CSS используются числа в шестнадцатеричной системе счисления. Чтобы не возникало путаницы в определении системы счисления, перед шестнадцатеричным числом ставят символ решетки #, например, #135278. Обозначение цвета (rrggbb) разбивается на три составляющие, где первые два символа обозначают красную компоненту цвета, два средних — зеленую, а два последних — синюю. Таким образом каждый из трех цветов — красный, зеленый и синий — может принимать значения от 00 до FF в шестнадцатеричной системе исчисления.

solution.js
При работе с цветами часто нужно получить отдельные значения красного, зеленого и синего (RGB) компонентов цвета в десятичной системе исчисления и наоборот. Реализуйте и экспортируйте функции rgbToHex() и hexToRgb(), которые возвращают соответствующие представление цвета.

Подсказки
Вам может понадобится функция chunk из библиотеки lodash.
Используйте функцию parseInt() для перевода строки в необходимую систему счисления
Изучите возможности метода toString() для числа, рассмотрите примеры
Дополнительно можно использовать метод padStart()
// */

// data -------------
/*
import _ from 'lodash'
// */

// solution my --------------
/*
const hexToRgb = (hex) => {
  const clearStr = hex.replace('#', '')

  const r = parseInt(clearStr.substring(0, 2), 16)
  const g = parseInt(clearStr.substring(2, 4), 16)
  const b = parseInt(clearStr.substring(4, 6), 16)

  return { r, g, b }
}

const rgbToHex = (r, g, b) => {
  const toHex = (num) => num.toString(16).padStart(2, '0')

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
// */

// solution teacher ----------------
/*
const rgbToHex = (r, g, b) => {
  const hex = [r, g, b]
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')

  return `#${hex}`
}

const hexToRgb = (hex) => {
  const [r, g, b] = _.chunk(hex.slice(1), 2)
    .map((channel) => channel.join(''))
    .map((channel) => parseInt(channel, 16))

  return { r, g, b }
}
// */

// test ----------------
/*
console.log(rgbToHex(36, 171, 0)) // '#24ab00'
console.log(hexToRgb('#24ab00')) // { r: 36, g: 171, b: 0 }
// */

// Испытание: IP конвертер
/*
Реализуйте и экспортируйте функции ipToInt() и intToIp(), которые преобразовывают представление IP-адреса из десятичного формата с точками в 32-битное число в десятичной форме и обратно.

Функция ipToInt() принимает на вход строку и должна возвращать число. А функция intToIp() наоборот: принимает на вход число, а возвращает строку.

Подсказки
IPv4
Используйте функцию parseInt() для перевода строки в десятичную систему счисления
Изучите возможности метода toString() для числа, рассмотрите примеры
Дополнительно можно использовать метод padStart()
// */

// data -------------
/*
import _ from 'lodash'
// */

// solution my --------------
/*
const ipToInt = (ip) => {
  return (
    ip.split('.').reduce((acc, octet) => {
      return ((acc << 8) >>> 0) | parseInt(octet, 10)
    }, 0) >>> 0
  )
}

const intToIp = (num) => {
  return [
    (num >>> 24) & 0xff,
    (num >>> 16) & 0xff,
    (num >>> 8) & 0xff,
    num & 0xff,
  ].join('.')
}
// */

// solution teacher ----------------
/*
const ipToInt = (ip) => {
  const ipInHex = ip
    .split('.')
    .map((octet) => Number(octet).toString(16).padStart(2, 0))
    .join('')

  return parseInt(ipInHex, 16)
}

const intToIp = (int) => {
  const ipInHex = int.toString(16).padStart(8, 0)

  return _.chunk(ipInHex, 2)
    .map((octet) => parseInt(octet.join(''), 16))
    .join('.')
}
// */

// test ----------------
/*
console.log(ipToInt('128.32.10.1')) // 2149583361
console.log(ipToInt('0.0.0.0')) // 0
console.log(ipToInt('255.255.255.255')) // 4294967295

console.log(intToIp(2149583361)) // '128.32.10.1'
console.log(intToIp(0)) // '0.0.0.0'
console.log(intToIp(4294967295)) // '255.255.255.255'
// */

// Испытание: Горизонтальная гистограмма
/*
Реализуйте и экспортируйте по умолчанию функцию, которая выводит на экран горизонтальную гистограмму. Функция принимает на вход количество бросков кубика и функцию, которая имитирует бросок игральной кости (её реализовывать не нужно). Вызов этой функции генерирует значение от 1 до 6, что соответствует одной из граней игральной кости.

Гистограмма содержит строки, каждой из которых соответствует грань игральной кости и количество выпадений этой грани. Результаты отображаются графически (с помощью символов #) и в виде числового значения, за исключением случаев, когда количество равно 0 (нулю).

Примеры
import play from '../histogram.js';


Подсказки:
Гистограмма
Для решения задачи используйте функции из библиотеки lodash
// */

// data -------------
/*
import _ from 'lodash'
const rollDie = () => Math.floor(Math.random() * 6) + 1
// */

// solution my --------------
/*
const play = (round, rollDie) => {
  const bar = '#'
  const numbers = _.times(round, rollDie)
  const sides = _.range(1, 7)
  const counts = _.countBy(numbers)
  // var counts2
  // const counts = {}
  // for (const num of numbers) {
  //   counts[num] = (counts[num] || 0) + 1
  // }
  // var counts3
  // const counts = numbers.reduce((acc, num) => {
  //   acc[num] = (acc[num] || 0) + 1
  //   return acc
  // }, {})

  const result = sides
    .map((side) => {
      const count = counts[side] || 0
      const visualization = bar.repeat(count)
      const label = count > 0 ? ` ${count}` : ''

      return `${side}|${visualization}${label}`
    })
    .join('\n')

  console.log(result)
}
// */

// solution teacher ----------------
/*
const play = (roundCount, rollDie) => {
  const bar = '#'
  const numbers = _.times(roundCount, rollDie)
  const sides = _.range(1, 7)

  const lines = sides.map((side) => {
    const count = numbers.filter((number) => number === side).length
    const displayCount = count !== 0 ? ` ${count}` : ''
    return `${side}|${bar.repeat(count)}${displayCount}`
  })
  const str = lines.join('\n')

  console.log(str)
}
// */

// test ----------------
/*
console.log(play(100, rollDie))
// => 1|####################### 23
//    2|################## 18
//    3|############# 13
//    4|#################### 20
//    5|############ 12
//    6|############## 14

console.log(play(13, rollDie))
// => 1|
//    2|## 2
//    3|# 1
//    4|## 2
//    5|#### 4
//    6|#### 4
// */
