## Испытание-1: Глубокое клонирование |-|-|

src/chapter_Object_JS/index.js
Реализуйте и экспортируйте по умолчанию функцию, которая выполняет глубокое копирование объектов.

```js
import cloneDeep from '../objects.js';

const data = {
  key: 'value',
  key2: {
    key: 'innerValue',
    innerKey: {
      anotherKey: 'anotherValue',
    },
  },
};

// result имеет такую же структуру, как и data
const result = cloneDeep(data);
// Но внутри другие объекты
console.log(result.key2 !== data.key2); // true
console.log(result.key2.innerKey !== data.key2.innerKey); // true
```

Для решения этой задачи, нужно последовательно обойти исходный объект и скопировать его данные в другой объект. Если значением какого-то свойства является объект, то нужно рекурсивно запустить реализованную функцию.

Подсказки
Для рекурсивного запуска понадобится имя для функции
_.isObject()
Object.entries()
Рекурсия
Для реализации этой задачи нельзя использовать функцию cloneDeep() библиотеки lodash.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
import _ from 'lodash'

const cloneDeep = (obj) => {
  const result = {}

  const entriers = Object.entries(obj)

  for (const [key, value] of entriers) {
    result[key] = _.isObject(value) ? cloneDeep(value) : value
  }

  return result
}

// teacher solution
const resultLodash = _.cloneDeep(data)

// проверка
// result имеет такую же структуру, как и data
const result = cloneDeep(data)
// Но внутри другие объекты
console.log(result.key2 !== data.key2) // true
console.log(result.key2.innerKey !== data.key2.innerKey) // true
console.log(result)

console.log(resultLodash.key2 === data.key2) // true
console.log(resultLodash.key2.innerKey === data.key2.innerKey) // true
console.log(resultLodash)
```

</details>

## Испытание-2: Сборщик строки запроса |+|

src/chapter_Object_JS/index.js
Query String (строка запроса) - часть адреса страницы в интернете, содержащая константы и их значения. Она начинается после вопросительного знака и идет до конца адреса. Пример:

```txt
# query string: page=5
https://ru.hexlet.io/blog?page=5
```

Если параметров несколько, то они отделяются амперсандом &:

```txt
# query string: page=5&per=10
https://ru.hexlet.io/blog?per=10&page=5
```

buildQueryString.js
Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход список параметров и возвращает сформированный query string из этих параметров:

```js
import bqs from '../buildQueryString.js';

bqs({ per: 10, page: 1 });
// page=1&per=10
bqs({ param: 'all', param1: true });
// param=all&param1=true
```

Имена параметров в выходной строке должны располагаться в алфавитном порядке (то есть их нужно отсортировать).

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const bqs = (obj) => {
  let str = "";
  const entries = Object.entries(obj).sort();
  for (let [key, value] of entries) {
    if (entries.length > 1) {
      str += `${key}=${value}&`;
    } else {
      str += `${key}=${value}`;
    }
  }
  if (str[str.length - 1] === "&") {
    return str.slice(0, -1);
  }

  return str;
};

console.log(bqs({ per: 10, page: 1 })); // page=1&per=10

// teacher solution
const bqs = (obj) => {
  const entries = Object.entries(obj).sort();
  const result = [];
  for (let [key, value] of entries) {
    result.push(`${key}=${value}`);
  }
  return result.join("&");
};
console.log(bqs({ per: 10, page: 1 })); // page=1&per=10
```

</details>

## Испытание-3: Преобразование DNA в RNA |-|

src/chapter_Object_JS/index.js
ДНК и РНК это последовательности нуклеотидов.
Четыре нуклеотида в ДНК это аденин (A), цитозин (C), гуанин (G) и тимин (T).
Четыре нуклеотида в РНК это аденин (A), цитозин (C), гуанин (G) и урацил (U).
Цепь РНК составляется на основе цепи ДНК последовательной заменой каждого нуклеотида:

```txt
G -> C
C -> G
T -> A
A -> U
```

dnaToRna.js
Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход цепь ДНК и возвращает соответствующую цепь РНК (совершает транскрипцию РНК).
Если во входном параметре нет ни одного нуклеотида (т.е. передана пустая строка), то функция должна вернуть пустую строку. Если в переданной цепи ДНК встретится "незнакомый" нуклеотид (не являющийся одним из четырех перечисленных выше), то функция должна вернуть null.

```js
dnaToRna('ACGTGGTCTTAA'); // 'UGCACCAGAAUU'
dnaToRna('CCGTA'); // 'GGCAU'
dnaToRna(''); // ''
dnaToRna('ACNTG'); // null
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const dnaToRna = (str) => {
  const dnkRnk = { G: "C", C: "G", T: "A", A: "U" };
  let result = "";

  for (let char of str) {
    if (!dnkRnk[char]) {
      return null;
    }
    result += dnkRnk[char];
  }
  return result;
};
console.log(dnaToRna("")); //'GGCAU'

// teacher solution
const map = { G: "C", C: "G", T: "A", A: "U" };

const dnaToRna = (dna) => {
  const rna = [];
  for (const nucleotide of dna) {
    if (!Object.hasOwn(map, nucleotide)) {
      return null;
    }
    rna.push(map[nucleotide]);
  }
  return rna.join("");
};

console.log(dnaToRna("CCGTA")); //'GGCAU'
```

</details>

## Испытание-4: Представление массива в виде объекта |-|

src/chapter_Object_JS/index.js
Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход массив, состоящий из массивов-пар и возвращает объект, полученный из этих пар.
Примечания
Если при конструировании объекта попадаются совпадающие ключи, то берётся значение из последнего массива-пары:

```js
fromPairs([['cat', 5], ['dog', 6], ['cat', 11]])
// { 'cat': 11, 'dog': 6 }
```

Примеры

```js
fromPairs([['fred', 30], ['barney', 40]]);
// { 'fred': 30, 'barney': 40 }
```

В решении постарайтесь не использовать встроенные методы преобразования в объект, например, Object.fromEntries().

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const fromPairs = (arr) => {
  const result = {};
  for (const [key, value] of arr) {
    result[key] = value;
  }
  return result;
};
console.log(
  fromPairs([
    ["cat", 5],
    ["dog", 6],
    ["cat", 11],
  ]),
);

// teacher solution
// решение учителя такое же, как моё
```

</details>

## Испытание-5: Римские цифры |-|

src/chapter_Object_JS/index.js
Для записи цифр римляне использовали буквы латинского алфавита: I, V, X, L, C, D, M. Например:
1 обозначалась с помощью буквы I
10 с помощью Х
7 с помощью VII
Число 2020 в римской записи — это MMXX (2000 = MM, 20 = XX).
solution.js
Реализуйте и экспортируйте функцию toRoman(), которая переводит арабские числа в римские. Функция принимает на вход целое число в диапазоне от 1 до 3000, а возвращает строку с римским представлением этого числа.
Реализуйте и экспортируйте функцию toArabic(), которая переводит число в римской записи в число, записанное арабскими цифрами. Если переданное римское число не корректно, то функция должна вернуть значение false.
Примеры

```js
toRoman(1);
// 'I'
toRoman(59);
// 'LIX'
toRoman(3000);
// 'MMM'
toArabic('I');
// 1
toArabic('LIX');
// 59
toArabic('MMM');
// 3000
toArabic('IIII');
// false
toArabic('VX');
// false
```

Подсказки
Подробнее о римской записи — https://ru.wikipedia.org/wiki/Римские_цифры

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const romanData = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const romanValues = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1,
};

const romanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

const toRoman = (num, index = 0) => {
  if (num === 0) return "";
  const [value, symbol] = romanData[index];
  if (num >= value) {
    return symbol + toRoman(num - value, index);
  } else {
    return toRoman(num, index + 1);
  }
};

const toArabic = (roman) => {
  if (!roman || typeof roman != "string" || !romanRegex.test(roman)) {
    return false;
  }
  const convert = (str) => {
    if (str.length === 0) return 0;
    const current = romanValues[str[0]];
    const next = romanValues[str[1]] || 0;
    if (next > current) {
      return next - current + convert(str.slice(2));
    } else {
      return current + convert(str.slice(1));
    }
  };
  return convert(roman);
};

console.log(toRoman(1001));
console.log(toArabic("LIX"));

// teacher solution
const numerals = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

const sortedNumerals = Object.entries(numerals).sort(
  ([, arabic1], [, arabic2]) => Math.sign(arabic2 - arabic1),
);

const toRoman = (number) => {
  let digit = number;
  const result = [];
  for (const [roman, arabic] of sortedNumerals) {
    const repetitionsCount = Math.floor(digit / arabic);
    if (repetitionsCount > 0) {
      digit -= repetitionsCount * arabic;
      result.push(roman.repeat(repetitionsCount));
    }
  }
  return result.join("");
};

const toArabic = (romanNumber) => {
  let result = 0;
  let currentLine = romanNumber;
  for (const [roman, arabic] of sortedNumerals) {
    while (currentLine.indexOf(roman) === 0) {
      result += arabic;
      currentLine = currentLine.slice(roman.length);
    }
  }
  if (toRoman(result) != romanNumber) {
    return false;
  }
  return result;
};

console.log(toRoman(191));
console.log(toArabic("CXCI"));
```

</details>

## Испытание-6: Вычислитель отличий |-|

src/chapter_Object_JS/index.js
Иногда в программировании возникает задача поиска разницы между двумя наборами данных, такими как объекты. Например, при поиске различий в json файлах. Для этого даже существуют специальные сервисы, например, http://www.jsondiff.com/ (попробуйте нажать на ссылку sample data и затем кнопку Compare).

solution.js
Реализуйте и экспортируйте по умолчанию функцию, которая сравнивает два объекта и возвращает результат сравнения в виде объекта. Ключами результирующего объекта будут все ключи из двух входящих объектов, а значением строка с описанием отличий: added, deleted, changed или unchanged.

Возможные значения:

added — ключ отсутствовал в первом объекте, но был добавлен во второй
deleted — ключ был в первом объекте, но отсутствует во втором
changed — ключ присутствовал и в первом и во втором объектах, но значения отличаются
unchanged — ключ присутствовал и в первом и во втором объектах с одинаковыми значениями

```js
import genDiff from './diffGenerator.js';
```

Подсказки
Фрагмент этой задачи разбирается в докладе "Ментальное программирование"

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const genDiff = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 })

  return keys.reduce((acc, key) => {
    if (!(key in obj1)) {
      acc[key] = 'added'
    } else if (!(key in obj2)) {
      acc[key] = 'deleted'
    } else if (obj1[key] === obj2[key]) {
      acc[key] = 'unchenged'
    } else {
      acc[key] = 'chenged'
    }
    return acc
  }, {})
}

// teacher solution (better)
import _ from 'lodash'

const genDiff = (obj1, obj2) => {
  const key1 = Object.keys(obj1)
  const key2 = Object.keys(obj2)
  const keys = _.union(key1, key2)
  const result = {}
  for (const key of keys) {
    if (!Object.hasOwn(obj1, key)) {
      result[key] = 'added'
    } else if (!Object.hasOwn(obj2, key)) {
      result[key] = 'deleted'
    } else if (obj1[key] === obj2[key]) {
      result[key] = 'unchanged'
    } else {
      result[key] = 'chenged'
    }
  }

  return result
}

// проверка
console.log(
  genDiff(
    { one: 'eon', two: 'two', four: true },
    { two: 'own', zero: 4, four: true },
  ),
)
// {
//   one: 'deleted',
//   two: 'changed',
//   four: 'unchanged',
//   zero: 'added',
// }
```

</details>

## Испытание-7: Детектирование |-|

src/chapter_Object_JS/index.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив (элементы которого — это объекты) и пары ключ-значение (тоже в виде объекта), а возвращает первый элемент исходного массива, значения которого соответствуют переданным парам (всем переданным). Если совпадений не было, то функция должна вернуть null.

Примеры

```js
findWhere(
  [
    { title: 'Book of Fooos', author: 'FooBar', year: 1111 },
    { title: 'Cymbeline', author: 'Shakespeare', year: 1611 },
    { title: 'The Tempest', author: 'Shakespeare', year: 1611 },
    { title: 'Book of Foos Barrrs', author: 'FooBar', year: 2222 },
    { title: 'Still foooing', author: 'FooBar', year: 3333 },
    { title: 'Happy Foo', author: 'FooBar', year: 4444 },
  ],
  { author: 'Shakespeare', year: 1611 }
); // { title: 'Cymbeline', author: 'Shakespeare', year: 1611 }
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const findWhere = (data, query) => {
  for (const item of data) {
    let isFlag = true;
    for (const [key, value] of Object.entries(query)) {
      if (item[key] !== value) {
        isFlag = false;
        break;
      }
    }
    if (isFlag) {
      return item;
    }
  }
  return null;
};

console.log(
  findWhere(
    [
      { title: "Book of Fooos", author: "FooBar", year: 1111 },
      { title: "Cymbeline", author: "Shakespeare", year: 1611 },
      { title: "The Tempest", author: "Shakespeare", year: 1611 },
      { title: "Book of Foos Barrrs", author: "FooBar", year: 2222 },
      { title: "Still foooing", author: "FooBar", year: 3333 },
      { title: "Happy Foo", author: "FooBar", year: 4444 },
    ],
    { author: "Shakespeare", year: 1611 },
  ),
);

// teacher solution
const findWhere = (data, query) => {
  const entries = Object.entries(query);
  for (const item of data) {
    let find = true;
    for (const [key, value] of entries) {
      if (item[key] !== value) {
        find = false;
        break;
      }
    }
    if (find) {
      return item;
    }
  }
  return null;
};

console.log(
  findWhere(
    [
      { title: "Book of Fooos", author: "FooBar", year: 1111 },
      { title: "Cymbeline", author: "Shakespeare", year: 1611 },
      { title: "The Tempest", author: "Shakespeare", year: 1611 },
      { title: "Book of Foos Barrrs", author: "FooBar", year: 2222 },
      { title: "Still foooing", author: "FooBar", year: 3333 },
      { title: "Happy Foo", author: "FooBar", year: 4444 },
    ],
    { author: "Shakespeare", year: 1611 },
  ),
);
```

</details>

## Испытание-8: Скрэббл |-|

src/chapter_Object_JS/index.js
Реализуйте и экспортируйте по умолчанию функцию-предикат, которая принимает на вход два параметра: набор символов в нижнем регистре (строку) и слово, и проверяет, можно ли из переданного набора составить это слово. В результате вызова функция возвращает true или false.

При проверке учитывается количество символов, нужных для составления слова, и не учитывается их регистр.

Примеры

```js
scrabble('rkqodlw', 'world'); // true
scrabble('avj', 'java'); // false
scrabble('avjafff', 'java'); // true
scrabble('', 'hexlet'); // false
scrabble('scriptingjava', 'JavaScript'); // true
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const scrabble = (symbols, word) => {
  const symbolsCount = {};
  for (const symbol of symbols) {
    symbolsCount[symbol] = (symbolsCount[symbol] || 0) + 1;
  }
  for (const symbol of word.toLowerCase()) {
    if (!symbolsCount[symbol]) {
      return false;
    }
    symbolsCount[symbol] -= 1;
  }
  return true;
};

console.log(scrabble("rkqodlw", "world"));

// teacher solution
import _ from "lodash";

const countByChars = (str) => {
  const chars = {};

  for (const char of str) {
    const count = _.get(chars, char, 0);
    chars[char] = count + 1;
  }

  return chars;
};

const scrabble = (str, word) => {
  const countsChars = countByChars(str);

  for (const char of word.toLowerCase()) {
    const count = _.get(countsChars, char, 0);
    if (count === 0) {
      return false;
    }
    countsChars[char] -= 1;
  }

  return true;
};

console.log(scrabble("rkqodlw", "world"));
```

</details>
