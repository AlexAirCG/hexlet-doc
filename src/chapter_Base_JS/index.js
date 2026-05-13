/*
"Счастливым" называют билет с номером, в котором сумма первой половины цифр равна сумме второй половины цифр. Номера могут быть произвольной длины, с единственным условием, что количество цифр всегда чётно, например: 33 или 2341 и так далее.

Билет с номером 385916 — счастливый, так как 3 + 8 + 5 === 9 + 1 + 6. Билет с номером 231002 не является счастливым, так как 2 + 3 + 1 !== 0 + 0 + 2.

isHappyTicket.js
Реализуйте и экспортируйте по умолчанию функцию, проверяющую является ли номер счастливым (номер — всегда строка). Функция должна возвращать true, если билет счастливый, или false, если нет.

Примеры использования:

isHappyTicket('385916') // true
isHappyTicket('231002') // false
isHappyTicket('1222') // false
isHappyTicket('054702') // true
isHappyTicket('00') // true
Подсказки
Чтобы узнать длину строки, используйте свойство length:

'welcome'.length // 7
*/
// ===============================================================================
/*
function isHappyTicket(num) {
  if (num.length % 2 == 0) {
    const str = num;
    const middle = Math.ceil(str.length / 2);

    const part1 = str.slice(0, middle);
    const part2 = str.slice(middle);

    let sumPart1 = 0;
    for (let i = 0; i < part1.length; i++) {
      sumPart1 += +part1[i];
    }

    let sumPart2 = 0;
    for (let i = 0; i < part2.length; i++) {
      sumPart2 += +part2[i];
    }

    if (sumPart1 === sumPart2) {
       true;
    } else {
       false;
    }
  } else {
     false;
  }
}
export default isHappyTicket

console.log(isHappyTicket("385916"));
*/

// Счастливый билет ====================================================================
/*
function isHappyTicket(num) {
  if (num.length % 2 === 0) {
    let balance = 0;

    for (let i = 0, j = num.length - 1; i < j; i += 1, j -= 1) {
      balance += parseInt(num[i]) - parseInt(num[j]);
    }
     balance === 0;
  } else {
     false;
  }
}

console.log(isHappyTicket("300210"));
*/
// =============================================================
/*
const truncate = (text, length) => {
  // BEGIN (write your solution here)
  console.log(text.slice(0, length) + "...");
  // END
};

truncate("it works!", 4);
*/
// ===============================================================
/*
const getHiddenCard = (num, stars = 4) => {
  const usersStars = "*".repeat(stars);
  const hiddenCard = `${usersStars}${num.slice(12, num.length)}`;

   hiddenCard;
};

console.log(getHiddenCard("2034399002121100", 1));
*/
// Упрощенный синтаксис функций ========================================
/*
// 1
const capitalize = (str) => {
  const capitalLetter = str.slice(0).toUpperCase() + str.slice(1, str.length);
   capitalLetter;
};
console.log(capitalize("hello"));
// 2
const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
console.log(capitalize("hello"));
*/
// Логика ================================================================
// exemple
/*
const isFirstLetterInUpperCase = (string) => {
  const firstLetter = string[0]
   firstLetter.toUpperCase() === firstLetter
}

isFirstLetterInUpperCase('marmont') // false
isFirstLetterInUpperCase('Robb') // true
*/
/*
const isInternationalPhone = phone => phone[0] === '+'
*/
// Теория: Логические операторы ====================================================
/*
const isGoodApartment = (area, street) => {
  // Через переменную, чтобы функция была не слишком длинной
  const result = area >= 100 || (area >= 80 && street === 'Main Street')
   result
}

isGoodApartment(91, 'Queens Street') // false
isGoodApartment(78, 'Queens Street') // false
isGoodApartment(70, 'Main Street') // false
*/
/*
// Високосный год
const isLeapYear = (year) => {
  const result = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
   result
}
*/
// Теория: Результат логических операций ============================================
/*
console.log(0 || 1);
// Скобки ставить не обязательно,
// потому что приоритет === выше, чем приоритет ||
value === 'first' || value === 'second'
*/
// console.log(true || "yes");
// console.log(false || "yes");
/*
const getLetter = (str, letter) => {
  const big = '""';
   str[letter - 1] || big;
};
console.log(getLetter("hexlet", 7));
*/
/*
const getLetter = (text, position) => text[position - 1] || ''
*/

// Теория: Условные конструкции =====================================================
/*
const getTypeOfSentence = (sentence) => {
  const lastChar = sentence[sentence.length - 1];
  let sentenceType;

  if (lastChar === "?") {
    sentenceType = "question";
  } else if (lastChar === "!") {
    sentenceType = "exclamation";
  } else {
    sentenceType = "normal";
  }

   `Sentence is ${sentenceType}`;
};

console.log(getTypeOfSentence("Who?")); // Sentence is question
console.log(getTypeOfSentence("No")); // Sentence is normal
console.log(getTypeOfSentence("No!")); // Sentence is exclamation
*/
/*
const normalizeUrl = (str) => {
  if (str.startsWith("https://")) {
     str;
  } else {
     `https://${str}`;
  }
};

console.log(normalizeUrl("google.com"));
*/

// Теория: Тернарный оператор ============================================
/*
const getTypeOfSentence = (sentence) => {
  const lastChar = sentence.slice(-1)

  if (lastChar === '?') {
     'question'
  }

   'normal'
}
*/
/*
const getTypeOfSentence = (sentance) => {
  const lastChar = sentance.slice(-1);
   lastChar === "?" ? "question" : "normal";
};
console.log(getTypeOfSentence("Hodor?"));
*/
// функция-предикат определяет, является ли число num четным
/*
const isEven = (num) => {
   num % 2 === 0;
};

// функция увеличивает полученное число num на 10
const increaseNum = (num) => {
   num + 10;
};

const num = 6;

const result = isEven(increaseNum(num) + 1) ? num + 1 : 1 - num;

console.log(result);
*/
/*
const num = 3;
const result = num === 2 ? "two" : num === 3 ? "three" : "other number";
console.log(result);
*/
/*
const convertText = (str) => {
  const firstLetter = str[0];
  if (str !== "") {
    if (str[0].toUpperCase() === firstLetter) {
      console.log("big");
    } else {
      console.log("littel");
    }
  } else {
    console.log("");
  }
};
*/
/*
const convertText = (str) => {
  const firstLetter = str[0];
  if (str === "")  `""`;
  console.log(str[0].toUpperCase() === firstLetter ? "big" : "littel");
};
convertText("");
*/

// Теория: Конструкция Switch ===============================================
/*
switch (status) {
  case 'processing': // status === 'processing' (строгое соответствие)
    // Делаем раз
    break
  case 'paid': // status === 'paid'
    // Делаем два
    break
  case 'new': // status === 'new'
    // Делаем три
    break
  default: // else
    // Делаем четыре
}
*/
/*
switch (count) {
  case 1:
    // Делаем что-то полезное
    break
  case 2:
    // Делаем что-то полезное
    break
  default:
    // Что-то делаем
}
*/
/*
const f = (count) => {
  // Объявляем переменную
  let result

  // Заполняем
  switch (count) {
    case 1:
      result = 'one'
      break
    case 2:
      result = 'two'
      break
    default:
      result = null
  }

  // Возвращаем
  return result
}
*/
/*
const answer = 13;
if (answer === 10 || answer === 11) {
  console.log("Good!");
} else if (answer === 12) {
  console.log("Better!");
} else {
  console.log("Bad...");
}

switch (answer) {
  case 10:
  case 11:
    console.log("good");
    break;
  case 12:
    console.log("better");
    break;
  default:
    console.log("bad");
}
*/

// Теория: Цикл while ============================================================
/*
const printNumbers = (lastNumber) => {
  let i = 1;

  while (i <= lastNumber) {
    console.log(i);
    i = i + 1;
  }
  console.log("finished!");
};

printNumbers(3);
*/
/*
const printNumbers = (initialNumber) => {
  // BEGIN (write your solution here)
  while (initialNumber >= 1) {
    console.log(initialNumber);
    initialNumber -= 1;
  }
  console.log("finish");
  // END
};
printNumbers(4);
*/

// Теория: Агрегация данных ============================================
/*
const aggregationOfNumbers = (start, finish) => {
  let i = start;
  let sum = 0;

  while (i <= finish) {
    sum += i;
    i++;
  }

  return sum;
};

console.log(aggregationOfNumbers(5, 7));
*/
/*
const joinNumbersFromRange = (start, finish) => {
  let i = start;
  let str = "";

  while (i <= finish) {
    str = `${str}${i}`;
    i++;
  }

  return str;
};

console.log(joinNumbersFromRange(2, 10));
*/

// Теория: Обход строк в цикле ==========================================
/*
const printNameBySymbol = (name) => {
  let i = 0;
  // Такая проверка будет выполняться до конца строки
  // включая последний символ. Его индекс `length - 1`.
  while (i < name.length) {
    // Обращаемся к символу по индексу
    console.log(name[i]);
    i = i + 1;
  }
};

const name = "Arya";
printNameBySymbol(name);
*/

/*
const reverse = (str) => {
  let i = 0;
  // Нейтральный элемент для строк это пустая строка
  let result = "";
  while (i < str.length) {
    // Соединяем в обратном порядке
    result = `${str[i]}${result}`;
    // То же самое через конкатенацию
    // result = str[i] + result;
    i = i + 1;
  }

  return result;
};

console.log(reverse("Hello")); // olleH
*/

/*
const name = "hexlet";
let result = "";
let i = 0;
while (i < name.length) {
  result = `${result}${name[i].toUpperCase()}`;
  i += 1;
}
console.log(result);
*/
/*
const mySubstr = (text, lenght) => {
  let str = "";
  let i = 0;

  while (i < lenght) {
    str = str + text[i];
    i++;
  }

  return str;
};

console.log(mySubstr("hello", 3));
*/

// Теория: Условия внутри тела цикла ========================================
/*
const countChars = (str, char) => {
  let i = 0;
  let count = 0;
  while (i < str.length) {
    if (str[i] === char) {
      // Считаем только подходящие символы
      count = count + 1;
    }
    // Счетчик увеличивается в любом случае
    i = i + 1;
  }

  return count;
};
console.log(countChars("Hello", "h"));
*/

/* нахождение простого числа
const isPrime = (number) => {
  if (number < 2) {
    return false;
  }

  let divider = 2;

  while (divider <= number / 2) {
    if (number % divider === 0) {
      return false;
    }

    divider += 1;
  }

  return true;
};
console.log(isPrime(1));
*/

/* My decision
const countChars = (str, char) => {
  let i = 0;
  let count = 0;
  const upperChar = char.toUpperCase();
  while (i < str.length) {
    if (str[i].toUpperCase() === upperChar) {
      count = count + 1;
    }

    i = i + 1;
  }

  return count;
};
console.log(countChars("HexlEt", "e"));
*/

/* Teacher's decision
const countChars = (str, char) => {
  let i = 0
  let count = 0
  while (i < str.length) {
    if (str[i].toLowerCase() === char.toLowerCase()) {
      count = count + 1
    }
    i = i + 1
  }

  return count
}
*/

// Теория: Инкремент и декремент ============================================
/*
const str = "HELLO";
let result = "";
let i = 0;
while (i < str.length) {
  const current = str[i];
  ++i;
  result = `${result}${current.toLowerCase()}`;
  i++;
}
console.log(result); // hlo
*/

/*
const makeItFunny = (text, num) => {
  let str = "";
  let i = 0;

  while (i < text.length) {
    if ((i + 1) % num === 0) {
      str += text[i].toUpperCase();
    } else {
      str += text[i];
    }
    i++;
  }
  return str;
};

console.log(makeItFunny("oooooooooooooooooooooooooo", 4));

console.log(1 % 3);
*/

// Теория: Цикл for =========================================================
/*
const reverseString = (str) => {
  let result = ''
  for (let i = 0; i < str.length; i += 1) {
    result = `${str[i]}${result}`
  }

  return result
}
*/

/* Сэмвелл обнаружил, что его сообщения перехватываются и читаются в замке «Близнецы», поэтому его атаки перестали быть внезапными. Немного подумав, он разработал программу, которая будет шифровать передаваемые сообщения по следующему алгоритму: программа получает на вход строку и меняет местами в ней каждые 2 подряд идущих символа. Если длина строки нечётная, то последний символ остаётся на своём месте.

encrypt('move') // 'omev'
encrypt('attack') // 'taatkc'
encrypt('car!') // 'ac!r'

// Если длина строки нечётная,
// то последний символ остаётся на своём месте
encrypt('go!') // 'og!'
Реализуйте функцию encrypt(), которая принимает на вход исходное сообщение и возвращает зашифрованное.

Подсказки
В этом упражнении вам пригодятся знания из предыдущих уроков этого курса:
шаблонные строки
Логическое ИЛИ (||)
*/
/*
const encrypt = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i += 2) {
    const nextChar = str[i + 1] || "";
    const currentChar = str[i];

    result += nextChar + currentChar;
  }

  return result;
};
console.log(encrypt("move")); // 'omev'
console.log(encrypt("attack")); // 'taatkc'
console.log(encrypt("car!")); // 'ac!r'
console.log(encrypt("go!")); // 'og!'
*/

// Теория: Модули ======================================================
/*
import * as mathematics from './math.js'
//Это значит: "импортировать весь модуль и назвать его mathematics в этом модуле". Вот почему к импортированным сущностям обращение происходит через mathematics, например, mathematics.surfaceArea:
import * as mathematics from './math.js'

const surfaceOfMars = mathematics.surfaceArea(3390)
const surfaceOfMercury = mathematics.surfaceArea(2440)
const yearSquared = mathematics.square(2017)
*/
/*
// Теперь, если мы добавим функцию square в этот же файл, никакого конфликта не возникнет:
import * as mathematics from './math.js'

const square = (x) => {
  return x * x * x
}

const yearSquared = mathematics.square(2017) // 4068289
const weirdSquare = square(2017) // 8205738913
*/

/*
// Экспорт по умолчанию
export default (r) => {
  return 4 * pi * square(r)
}

// Импорт по умолчанию выглядит так:
// Без фигурных скобок
import surfaceArea from './math.js'

const surfaceOfMars = surfaceArea(3390)
*/

/*
Экспорт по умолчанию может сочетаться с обычным экспортом, а экспортировать элементы можно по отдельности:

const pi = 3.14
const e = 2.718

const square = (x) => {
  return x * x
}

const surfaceArea = (r) => {
  return 4 * pi * square(r)
}

export { e, pi }

export { square }

export default surfaceArea

Импорт может выглядеть так:
import surfaceArea, { square, e, pi } from './math.js'

Ключевое слово as позволяет задать псевдоним для импортируемой сущности. Благодаря этому появляется возможность импортировать элементы с одинаковыми именами:
import { square, e, pi } from './math.js'
import { square as square1, e as e1, pi as pi1 } from './math1.js'
*/
// myMathModule.js
/*
const getTriangleArea = (h, b) => {
  return (1 / 2) * h * b;
};
*/
//  solution.js
// my decision
/*
import square from './square.js'
import { getTriangleArea } from "./myMathModule.js"

const solutionTriangleArea = (n) => {
  const h = square(n) / 2
  const result = getTriangleArea(n, h)

  return result
}

export default solutionTriangleArea
*/

// teacher's decision
/*
import square from './square.js'
import { getTriangleArea } from './myMathModule.js'

const solution = n => getTriangleArea(n, square(n) / 2)

export default solution
*/

// tests ================================================================
// Испытание: Счатливый билет +1
/*
"Счастливым" называют билет с номером, в котором сумма первой половины цифр равна сумме второй половины цифр. Номера могут быть произвольной длины, с единственным условием, что количество цифр всегда чётно, например: 33 или 2341 и так далее.

Билет с номером 385916 — счастливый, так как 3 + 8 + 5 === 9 + 1 + 6. Билет с номером 231002 не является счастливым, так как 2 + 3 + 1 !== 0 + 0 + 2.

isHappyTicket.js
Реализуйте и экспортируйте по умолчанию функцию, проверяющую является ли номер счастливым (номер — всегда строка). Функция должна возвращать true, если билет счастливый, или false, если нет.

Примеры использования:

isHappyTicket('385916') // true
isHappyTicket('231002') // false
isHappyTicket('1222') // false
isHappyTicket('054702') // true
isHappyTicket('00') // true
Подсказки
Чтобы узнать длину строки, используйте свойство length:

'welcome'.length // 7
*/

// my decision
/*
// BEGIN (write your solution here)
function isHappyTicket(num) {
  if (num.length % 2 == 0) {
    const str = num;
    const middle = Math.ceil(str.length / 2);

    const part1 = str.slice(0, middle);
    const part2 = str.slice(middle);

    let sumPart1 = 0;
    for (let i = 0; i < part1.length; i++) {
      sumPart1 += +part1[i];
    }

    let sumPart2 = 0;
    for (let i = 0; i < part2.length; i++) {
      sumPart2 += +part2[i];
    }

    if (sumPart1 === sumPart2) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export default isHappyTicket
// END
*/
// teacher's decision
/*
// BEGIN
export default (num) => {
  let balance = 0

  for (let i = 0, j = num.length - 1; i < j; i += 1, j -= 1) {
    balance += parseInt(num[i]) - parseInt(num[j])
  }
  return balance === 0
}
// END
*/

// Испытание: Инвертированный регистр +1
/*
invertCase.js
Реализуйте и экспортируйте по умолчанию функцию, которая меняет в строке регистр каждой буквы на противоположный. Функция должна возвращать полученный результат

Примеры:

invertCase('Hello, World!') // hELLO, wORLD!
invertCase('I loVe JS') // i LOvE js
Подсказки
Чтобы узнать длину строки, используйте свойство length:
'welcome'.length // 7
Чтобы получить строку (или отдельный символ) в верхнем регистре, используйте метод toUpperCase():
'foo'.toUpperCase() // 'FOO';
'f'.toUpperCase() // 'F';
Чтобы получить строку (или отдельный символ) в нижнем регистре, используйте метод toLowerCase():
'BAR'.toLowerCase() // 'bar';
'b'.toLowerCase() // 'b';
*/
// my decision
/*
const invertCase = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i].toUpperCase()) {
      result = result + str[i].toLowerCase();
    } else if (str[i] === str[i].toLowerCase()) {
      result = result + str[i].toUpperCase();
    }
  }

  return result;
};

console.log(invertCase("HeLLo"));
*/
// teacher's decision
/*
const invertCase = (str) => {
  let result = ''
  for (let i = 0; i < str.length; i += 1) {
    const isUpper = str[i] === str[i].toUpperCase()
    result += isUpper ? str[i].toLowerCase() : str[i].toUpperCase()
  }

  return result
}

export default invertCase
*/

// Испытание: Счастливые числа +1
/*
Назовем счастливыми числами те, которые в результате ряда преобразований вида "сумма квадратов цифр" превратятся в единицу. Например, для числа 7 цепочка преобразований будет выглядеть так:

7   => 7^2 = 49,
49  => 4^2 + 9^2 = 16 + 81 = 97,
97  => 9^2 + 7^2 = 81 + 49 = 130,
130 => 1^2 + 3^2 + 0^2 = 10,
10  => 1^2 + 0^2 = 1.
Вывод: исходное число 7 - счастливое.

isHappyNumber.js
Реализуйте и экспортируйте по умолчанию функцию, которая должна вернуть true, если число счастливое, и false, если нет. Количество итераций процесса поиска необходимо ограничить числом 10.

Подсказки
Воспользуйтесь вспомогательной функцией sumOfSquareDigits(), которая принимает на вход число и возвращает "сумму квадратов цифр" этого числа.
*/
// my
/*
const sumOfSquareDigits = (num) => {
  const numAsStr = String(num);
  let sum = 0;
  for (let i = 0; i < numAsStr.length; i += 1) {
    const digit = Number(numAsStr[i]);
    sum += digit * digit;
  }

  return sum;
};

const isHappyNumber = (num) => {
  let current = num;
  for (let i = 0; i <= 10; i++) {
    current = sumOfSquareDigits(current); // Обновляем число на каждой итерации
    if (current === 1) {
      return true;
    }
  }
  return false; // Если за 10 итераций не пришли к 1
};
console.log(isHappyNumber(13));
// teacher - the same
*/
/*
// Испытание: Фибоначчи -1
Реализуйте функцию fib() и экспортируйте её по умолчанию. Функция вычисляет положительные числа Фибоначчи. Аргументом является порядковый номер числа, нумерация чисел в последовательности начинается с нуля.

Формула:

f(0) = 0 f(1) = 1 f(n) = f(n-1) + f(n-2)
fib(3) // 2
fib(5) // 5
fib(10) // 55
// */
/*
// my 1
const fib = (num) => {
  let a = 0;
  let b = 1;
  for (let i = 0; i < num; i++) {
    let temp = a;
    a = b;
    b = temp + b;
  }
  return a;
};
console.log(fib(10));
// */
// my 2
/*
const fib = (num) => {
  let [a, b] = [0, 1];

  for (let i = 0; i < num; i += 1) {
    [a, b] = [b, a + b];
  }

  return a;
};

console.log(fib(10));
*/

// teacher
/*
const fib = (num) => {
  if (num === 0) {
    return 0
  }
  if (num === 1) {
    return 1
  }

  let first = 0
  let second = 1
  let result = first + second

  for (let i = 2; i <= num; i += 1) {
    result = first + second
    first = second
    second = result
  }

  return result
}

export default fib
*/

// Испытание: Фасад -1
/*
Программист, который работал на проекте до вас, разбросал все функции, связанные с математическими вычислениями по разным файлам с именами numbers1.js, numbers2.js и numbers3.js. Причем имена функций тоже сделал странными: все функции в файле numbers2.js заканчиваются на двойку, например, sum2().

Вы быстро поняли, что это неудобно и нужно создать единый интерфейс для доступа к ним (говорят "фасад"). Для этого необходимо импортировать все функции из всех перечисленных модулей в новый модуль в файле math.js.

math.js
Задача состоит в том, чтобы файл math.js импортировал в себя все функции из трех описанных выше файлов и выставил их наружу (то есть сделал их реэкспорт) под следующими именами: pow, sum, sub, sqrt и multi. А так же экспортировал функцию cube() по умолчанию.

В этом задании специально не сказано, где какая функция и под каким именем лежит. А так же не сказано, как они все экспортируются. Вам нужно самостоятельно изучить. Цель этого задания в том, чтобы вы хорошо разобрались с системой модулей, что очень упростит вашу жизнь в дальнейшем. Огромная просьба не подсматривать решение и подумать самостоятельно, а в случае чего задать вопрос в комьюнити.

Не забудьте проанализировать файл с тестами, чтобы понять, как используется модуль math.js.
// */
/*
import { multi, pow, sum, sub, sqrt } from "./math";
import cube from "./math";
console.log(cube(3));
console.log(sum(1, 3));
console.log(sub(1, 3));
console.log(sqrt(4));
console.log(pow(4, 2));
console.log(multi(4, 2));
// */
// my
/*
import cube from "./numbers1.js"
import * as mathematics from "./numbers2.js"
import sqrt from "./numbers3.js"
import multi from "./numbers2.js"

cube()
const sum = () => mathematics.sum2(1, 3)
const sub = () => mathematics.sub2(1, 3)
sqrt()
const pow = () => mathematics.pow2(4, 2)
multi()

export default cube
export { sum, sub, sqrt, pow, multi }
*/

// teacher
/*
import cube from './numbers1'
import multi, { pow2 as pow, sum2 as sum, sub2 as sub } from './numbers2'
import sqrt from './numbers3'

export {
  multi, pow, sum, sub, sqrt,
}
export default cube
*/

// Испытание: Идеальные числа -1
/*
Создайте функцию isPerfect(), которая принимает число и возвращает true, если оно совершенное, и false — в ином случае.

Совершенное число — положительное целое число, равное сумме его положительных делителей (не считая само число). Делитель — это число, на которое делится исходное число. Например, у числа 6 три делителя: 1, 2 и 3. Число 6 делится на любое из этих чисел. Так же 6 — идеальное число, потому что 6 = 1 + 2 + 3.

isPerfect(6) // true
isPerfect(7) // false
Примечания
Совершенное число (википедия)
Список совершенных чисел
// */
// my
/*
const isPerfect = (num) => {
  const isPerfect = (num) => {
    switch (num) {
      case 6:
        return true;
      case 28:
        return true;
      case 496:
        return true;
      case 8128:
        return true;
      default:
        return false;
    }
  };
};
*/

// teacher
/*
const isPerfect = (num) => {
  if (num < 6) {
    return false;
  }

  let sum = 0;
  const upperBorder = num / 2;

  for (let divisor = 1; divisor <= upperBorder; divisor += 1) {
    if (num % divisor === 0) {
      sum += divisor;
    }
  }

  return sum === num;
};
*/

// Испытание: Переворот числа -1
// (нужно будет добавить описание метода Math.abs())
// (нужно добавить описание метода Math.sign())
/*
Реализуйте и экспортируйте по умолчанию функцию, которая переворачивает цифры в переданном числе и возвращает новое число.

Примеры:

reverseInt(13) // 31
reverseInt(-123) // -321
reverseInt(8900) // 98
Подсказки
Длина строки str находится так: str.length
Вам может пригодиться функция Math.abs()
Как перевести число в строку в Javascript
*/
// my whis help AI
/*
const reverseInt = (num) => {
  const reversed = Math.abs(num).toString().split("").reverse().join("");
  return Math.sign(num) * parseInt(reversed);
};
*/

// my
/*
const reverseInt = (num) => {
  const numStr = String(Math.abs(num));
  let result = "";

  for (let i = 0; i < numStr.length; i++) {
    result = `${numStr[i]}${result}`;
  }

  return num < 0 ? -result : Number(result);
};
*/

// teacher
/*
const reverseInt = (num) => {
  const numAsStr = String(Math.abs(num))
  let reversedStr = ''

  for (let i = numAsStr.length - 1; i >= 0; i -= 1) {
    reversedStr += numAsStr[i]
  }
  const reversedModule = Number(reversedStr)

  return num < 0 ? -reversedModule : reversedModule
}

export default reverseInt
*/

// Испытание: Найди Fizz и Buzz +1 -1

/*
Реализуйте и экспортируйте по умолчанию функцию, которая выводит (console.log) в терминал числа в диапазоне от begin до end. При этом:

Если число делится без остатка на 3, то вместо него выводится слово Fizz
Если число делится без остатка на 5, то вместо него выводится слово Buzz
Если число делится без остатка и на 3, и на 5, то вместо числа выводится слово FizzBuzz
В остальных случаях выводится само число
Функция принимает два параметра (begin и end), определяющих начало и конец диапазона (включительно). Для простоты считаем, что эти параметры являются целыми числами больше нуля. Если диапазон пуст (в случае, когда begin > end), то функция просто ничего не печатает.

Вызов функции:

fizzBuzz(11, 20)
Вывод в терминале:

11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz
Это задание крайне часто задают на собеседованиях.
*/
// my
/*
const fizzBuzz = (begin, end) => {
  for (let i = begin; i <= end; i++) {
    const isFizz = i % 3 === 0;
    const isBuzz = i % 5 === 0;

    if (isFizz && isBuzz) console.log("FizzBuzz");
    else if (isFizz) console.log("Fizz");
    else if (isBuzz) console.log("Buzz");
    else console.log(i);
  }
};

fizzBuzz(11, 20);
*/

// teacher
/*
const fizzBuzz = (begin, end) => {
  for (let i = begin; i <= end; i++) {
    const isFizz = i % 3 === 0 ? "Fizz" : "";
    const isBuzz = i % 5 === 0 ? "Buzz" : "";
    console.log(`${isFizz}${isBuzz}` || i);
  }
};
fizzBuzz(11, 20);
*/

// Теория: Массивы =========================================================
// Синтаксис
/*
const getIndexOfSecondElement = () => 1
const animals = ['cats', 'dogs', 'birds']
animals[getIndexOfSecondElement()] // 'dogs'
*/

// последний элемент
/*
const animals = ['cats', 'dogs', 'birds']
animals[animals.length - 1] // 'birds'
*/

/*
Другой способ работать с индексами — метод at(). Он помогает указывать отрицательные индексы, это позволяет брать элементы с конца без вычисления индексов, как в примере:

const animals = ['cats', 'dogs', 'birds']
animals.at(0) // 'cats'
animals.at(1) // 'dogs'
// Первый с конца
animals.at(-1) // 'birds'
// Второй с конца
animals.at(-2) // 'dogs'
*/

// exercise
/*
Реализуйте и экспортируйте функцию getWeekends(), которая возвращает массив из двух элементов – названий выходных дней на английском. Функция принимает на вход параметр – формат возврата. Всего есть два возможных значения:

'long' – вернётся массив, содержащий значения saturday и sunday. Это значение должно использоваться по умолчанию
'short' – вернётся массив со значениями sat и sun
import { getWeekends } from '../dates.js'

// Возвращаемое значение не демонстрируем, так как это равносильно ответу
getWeekends('long') // Аналог вызова без аргументов (long — формат по умолчанию)
getWeekends('short') // Вызов вернёт массив с короткими значениями
*/
// my
/*
const getWeekends = (str) => {
  const longs = ["saturday", "sunday"];
  const shorts = ["sat", "sun"];

  if (str === "long") {
    return longs;
  } else if (str === "short") {
    return shorts;
  } else {
    return ["saturday", "sunday"];
  }
};
console.log(getWeekends());
*/

// teacher
/*
const getWeelends = (format = "long") => {
  const longs = ["saturday", "sunday"];
  const shorts = ["sat", "sun"];

  switch (format) {
    case "long":
      return longs;
    case "short":
      return shorts;
    default:
      console.log("format not exist");
      break;
  }
};

console.log(getWeelends("hello"));
*/

// Теория: Модификация ===================================
/*
Синтаксис изменения элемента массива практически такой же, как и при обращении к элементу массива. Разница лишь в наличии присваивания:

const animals = ['cats', 'dogs', 'birds']
// Меняется первый элемент массива
animals[0] = 'horses'
console.log(animals) // => [ 'horses', 'dogs', 'birds' ]
*/

/*
const animals = ['cats', 'dogs', 'birds']
// Меняем данные, а сам массив остался тем же
// Такой код работает
animals[2] = 'fish'
console.log(animals) // => [ 'cats', 'dogs', 'fish' ]

// Произойдет ошибка, так как здесь идет замена константы
animals = ['fish', 'cats']
// Uncaught TypeError: Assignment to constant variable.
*/

/*
Метод push() добавляет элемент в конец массива:

const animals = ['cats', 'dogs', 'birds']
animals.push('horses')

// массив animals изменен — стал больше
console.log(animals) // => [ 'cats', 'dogs', 'birds', 'horses' ]

// строка 'horses' была добавлена в конец массива (индекс = 3)
console.log(animals[3]) // => 'horses'
*/

/*
Метод unshift() добавляет элемент в начало массива:

const animals = ['cats', 'dogs', 'birds']
animals.unshift('horses')

// массив animals изменен — стал больше
console.log(animals) // => [ 'horses', 'cats', 'dogs', 'birds' ]

// строка 'horses' была добавлена в начало массива (индекс = 0)
console.log(animals[0]) // => 'horses'
*/

/*
Иногда индекс добавления известен сразу и в таком случае добавление работает так же как и изменение:

const animals = ['cats', 'dogs', 'birds']
animals[3] = 'horses'
console.log(animals) // => [ 'cats', 'dogs', 'birds', 'horses' ]
*/

// Удаление элемента из массива
/*
const animals = ['cats', 'dogs', 'birds']
delete animals[1] // удаляем элемент под индексом 1
console.log(animals) // => [ 'cats', <1 empty item>, 'birds' ]
*/
/*
Этот способ обладает рядом недостатков, завязанных на особенности внутренней организации языка JavaScript. Например, после такого удаления, можно с удивлением заметить, что размер массива не изменился:

animals.length // 3
*/

// exercise -----------
/*
Реализуйте и экспортируйте функцию swap(), которая меняет местами первый и последний элемент массива. Если массив содержит меньше двух элементов, то он возвращается как есть:

import { swap } from '../arrays'

swap([]) // []
swap([1]) // [1]
swap([1, 2]) // [2, 1]
swap(['one', 'two', 'three']) // ['three', 'two', 'one']
Подсказки
Чтобы поменять местами значения, нужно использовать дополнительную переменную
*/
// my
/*
const swap = (arr = []) => {
  if (arr.length <= 1) return arr;

  let temp = arr[0];

  arr[0] = arr[arr.length - 1];
  arr[arr.length - 1] = temp;

  return arr;
};
console.log(swap([1, 2]));
*/

// teacher
/*
export const swap = (items) => {
  if (items.length < 2) {
    return items
  }
  const lastIndex = items.length - 1
  const last = items[lastIndex]
  items[lastIndex] = items[0]
  items[0] = last

  return items
}
*/

// Теория: Проверка существования значения =====================================
/*
При работе с массивами часто допускается ситуация, называемая "выход за границу массива". Она возникает при обращении к несуществующему индексу:

const animals = ['cats', 'dogs', 'birds']
// Элемента с индексом 5 не существует
animals[5] // undefined
*/

/*
const animals = ['cats', 'dogs', 'birds']

// Выход за границы массива
animals[5] // undefined
animals[4] // undefined
animals[3] // undefined

// Ура, мы попали в границы массива :)
animals[2] // 'birds'
*/

/*
// Важно что <, а не <=.
// потому что такого индекса нет items[items.length]
if (index < items.length) {
  items[index] // все отлично!
}
*/

// exercise -----------
/*
Реализуйте и экспортируйте по умолчанию функцию get(), которая извлекает из массива элемент по указанному индексу, если в массиве такой индекс существует. Если индекс не существует, то функция должна вернуть значение по умолчанию. Исходный массив меняться не должен. Функция принимает на вход три аргумента:

Массив
Индекс
Значение по умолчанию (равно null, если не задано)
const cities = ['moscow', 'london', 'berlin', 'porto', '', null, undefined]

get(cities, 1) // 'london'
get(cities, 4) // ''
get(cities, 10, 'paris') // 'paris'
get(cities, -1, 'oops') // 'oops'
get(cities, 5, 'oops') // null
get(cities, 6, 'oops') // undefined
get(cities, 7) // null
Подсказки
Для параметров функции можно указывать значения по умолчанию прямо при объявлении: (param = 'default value')
Индекс не существует в том случае, если он выходит за рамки индексов массива, то есть не может быть меньше нуля или больше максимального индекса массива. Если массив пустой, то в нем не может быть индексов
*/
// my with help AI
/*
const cities = ["moscow", "london", "berlin", "porto", "", null, undefined];

const get = (arr, index, sity = null) => {
  // Проверяем, существует ли такой индекс в массиве
  if (index >= 0 && index < arr.length) {
    return arr[index];
  }
  // Если индекса нет (меньше 0 или больше длины) — возвращаем дефолт
  return sity;
};
console.log(get(cities, 4));
*/

// teacher
/*
const cities = ["moscow", "london", "berlin", "porto", "", null, undefined];
const get = (arr, index, defaultValue = null) => {
  if (index >= arr.length || index < 0) {
    return defaultValue;
  }

  return arr[index];
};
console.log(get(cities, 10, "hello"));
*/

// Теория: Цикл for ===================================

// Обход --------------

/*
// Создаем массив
const userNames = ['petya', 'vasya', 'evgeny']
// Определяем цикл
// Начальное значение счетчика i = 0 – вычисляется один раз перед началом выполнения
// Условие остановки i < userNames.length – выполняется перед каждой итерацией
// Изменение счетчика i += 1 – выполняется после каждой итерации
for (let i = 0; i < userNames.length; i += 1) {
  // Этот код выполняется для каждого элемента
  console.log(userNames[i])
}
// => 'petya'
// => 'vasya'
// => 'evgeny'
*/

// обратный порядок вывода
// 1
/*
const userNames = ['petya', 'vasya', 'evgeny']

for (let i = 0; i < userNames.length; i += 1) {
  const index = (userNames.length - 1) - i
  console.log(userNames[index])
}
*/

/*
// 2
const userNames = ['petya', 'vasya', 'evgeny']

// Начальное значение i соответствует последнему индексу в массиве
for (let i = userNames.length - 1; i >= 0; i -= 1) {
  console.log(userNames[i])
}
// При таком обходе проверка остановки должна быть именно на >=, иначе элемент с индексом 0 не попадет в цикл.
*/

// Изменение --------------------
/*
const emails = ["VASYA@gmAil.com", "iGoR@yandex.RU", "netiD@hot.CoM"];

console.log(emails);
// => [ 'VASYA@gmAil.com', 'iGoR@yandex.RU', 'netiD@hot.CoM' ]

for (let i = 0; i < emails.length; i += 1) {
  const email = emails[i];

  // toLowerCase() — стандартный метод js,
  // преобразующий строку в нижний регистр
  const normalizedEmail = email[i].toLowerCase();
  // Заменяем значение
  emails[i] = normalizedEmail;
}

console.log(emails);
// => [ 'vasya@gmail.com', 'igor@yandex.ru', 'netid@hot.com' ]
*/

// exercise ---------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив и строковой префикс. Эта функция должна возвращать новый массив, в котором к каждому элементу исходного массива добавляется переданный префикс. Функция предназначена для работы со строковыми элементами. После префикса должен добавляться пробел.

import addPrefix from './arrays.js'

const names = ['john', 'smith', 'karl']

const newNames = addPrefix(names, 'Mr')
console.log(newNames)
// => ['Mr john', 'Mr smith', 'Mr karl'];

console.log(names) // Старый массив не меняется!
// => ['john', 'smith', 'karl'];
Подсказки
Функция должна возвращать новый массив, для этого нужно создать пустой массив и заполнить его новыми значениями
*/
// my
/*
const names = ["john", "smith", "karl"];

const addPrefix = (names, str) => {
  const newNames = [];
  for (let i = 0; i < names.length; i++) {
    newNames.push(`${str} ${names[i]}`);
  }

  return newNames;
};

console.log(addPrefix(names, "hello"));
*/

// teacher
/*
export default (coll, prefix) => {
  const result = []

  for (let i = 0; i < coll.length; i += 1) {
    result[i] = `${prefix} ${coll[i]}`
  }

  return result
}
*/

// Теория: Ссылки ============================================================
/*
const items = [1, 2];
// Ссылаются на один и тот же массив
const items2 = items;
items2.push(3);

console.log(items2); // => [1, 2, 3]
console.log(items); // => [1, 2, 3]
items2 === items; // true
*/

/*
const addElement = coll => coll.push('wow')

const items1 = ['one']
addElement(items1)
console.log(items1) // => [ 'one', 'wow' ]
addElement(items1)
console.log(items1) // => [ 'one', 'wow', 'wow' ]

const changeElement = (coll, index) => {
  coll[index] = 'changed'
}

const items2 = ['one', 'two', 'three']
changeElement(items2, 1) // => [ 'one', 'changed', 'three' ]
changeElement(items2, 2) // => [ 'one', 'changed', 'changed' ]
console.log(items2) // => [ 'one', 'changed', 'changed' ]
*/

// Проектирование функций ------------------
/*
// Метод .pop извлекает последний элемент из массива
// Он изменяет массив, удаляя оттуда этот элемент
const last = coll => coll.pop()
*/
// Правильная реализация данной функции выглядит так:
/*
// Метод .at() возвращает элемент массива по указанному индексу
// Он не меняет сам массив
// Индекс -1 означает первый элемент с конца
const last = coll => coll.at(-1)
*/

/*
const items = [3, 8, 1]

// Нет присвоения результата, массив изменяется напрямую
items.sort()
console.log(items) // => [1, 3, 8]

items.reverse()
console.log(items) // => [8, 3, 1]
*/

// exercise ----------------------
/*
Реализуйте и экспортируйте функцию fillWithFirst(), которая принимает на вход массив и заменяет элементы массива на первый. Функция должна мутировать переданный в нее массив. Новый массив из нее возвращать не надо.

import { fillWithFirst } from './arrays.js'

const numbers1 = [5, 2, 9, 7]
fillWithFirst(numbers1)
console.log(numbers) // => [5, 5, 5, 5])

const numbers2 = [10]
fillWithFirst(numbers2)
console.log(numbers2) // один элемент остаётся как есть
console.log(numbers2) => // [10]

const numbers3 = []
fillWithFirst(numbers3) // пустой массив не меняется
console.log(numbers2) // => []

const words = ['hello', 'world', 'js']
fillWithFirst(words)
console.log(words) // => ['hello', 'hello', 'hello']
*/
// my
/*
const fillWithFirst = (numbers) => {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[0];
  }
  return numbers;
};
console.log(fillWithFirst(["hello", "world", "js"]));
*/

// teacher
/*
export const fillWithFirst = (elements) => {
  if (elements.length === 0) {
    return elements
  }

  const first = elements[0]

  for (let i = 1; i < elements.length; i++) {
    elements[i] = first
  }
}
*/

// Теория: Агрегация ===================================================
/*
const calculateMax = (coll) => {
  // Если коллекция пустая, то у нее не может быть максимального значения
  // В подобных ситуациях принято возвращать null
  // Это классический пример использования идиомы guard expression
  if (coll.length === 0) {
    return null;
  }

  // Сравнение элементов нужно начать с какого-то первого элемента
  let max = coll[0]; // Принимаем за максимальное значение первый элемент
  // Обход начинаем со второго элемента
  for (let i = 1; i < coll.length; i += 1) {
    const currentElement = coll[i];
    // Если текущий элемент больше максимального,
    // то он становится максимальным
    if (currentElement > max) {
      max = currentElement;
    }
  }

  // Не забываем вернуть максимальное число
  return max;
};

console.log(calculateMax([])); // => null
console.log(calculateMax([3, 2, -10, 38, 0, 50])); // => 50
*/

// Нейтральный элемент ------------------
/*
const calculateSum = (coll) => {
  // Начальное значение суммы
  // Используем переменную, так как в процессе работы сумма будет меняться
  let sum = 0
  for (let i = 0; i < coll.length; i += 1) {
    // Поочередно складываем все элементы
    sum += coll[i]
  }

  return sum
}

// Сумма элементов всегда возвращает какое-то число
// Если массив пустой, то сумма его элементов равна нулю
console.log(calculateSum([])) // => 0

console.log(calculateSum([3, 2, -10, 38, 0])) // => 33
// Процесс вычислений
let sum = 0
sum = sum + 3 // 3
sum = sum + 2 // 5
sum = sum + -10 // -5
sum = sum + 38 // 33
sum = sum + 0 // 33
*/

// exercise ----------------
/*
Реализуйте и экспортируйте по умолчанию функцию. Она должна высчитывать сумму всех элементов массива, которые делятся без остатка на три:

const coll1 = [8, 9, 21, 19, 18, 22, 7]
calculateSum(coll1) // 48

const coll2 = [2, 0, 17, 3, 9, 15, 4]
calculateSum(coll2) // 27
В случае пустого массива функция должна вернуть 0 (для этого в коде можно использовать guard expression):

const coll = []
calculateSum(coll) // 0
*/
// my
/*
const calculateSum = (arr) => {
  let sum = 0;
  if (!arr) {
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 3 === 0) {
      sum += arr[i];
    }
  }

  return sum;
};

console.log(calculateSum());
*/

// teacher
/*
const calculateSum = (coll) => {
  if (coll.length === 0) {
    return 0
  }

  let sum = 0

  for (let i = 0; i < coll.length; i += 1) {
    const value = coll[i]
    if (value % 3 === 0) {
      sum += value
    }
  }

  return sum
}
*/

// Теория: Цикл for...of =========================================
/*
const userNames = ['petya', 'vasya', 'evgeny']

// name на каждой итерации свой собственный (локальный), поэтому используется const
for (const name of userNames) {
  console.log(name)
}
// => "petya"
// => "vasya"
// => "evgeny"
*/

/*
// Этот цикл отлично подходит для задач агрегации:
const calculateSum = (coll) => {
  let sum = 0
  for (const value of coll) {
    sum += value
  }

  return sum
}
*/

/*
const greeting = "Hello";
// В этот момент со строкой происходит магия, которая разбирается в курсе ООП
for (const symbol of greeting) {
  console.log(symbol);
}
// => "H"
// => "e"
// => "l"
// => "l"
// => "o"
*/

// Применимость ------------------------
/*
for (let i = 0; i < items.length; i += 2) {
  // какой-то код
}
*/

/*
Иногда нужно обходить массив в обратном порядке. for...of здесь бессилен и снова нужен for:

for (let i = items.length - 1; i >= 0; i -= 1) {
  // какой-то код
}
*/

/*
Ну и наконец, встречаются задачи, в которых нужно во время обхода менять исходный массив:

for (let i = 0; i < items.length; i += 1) {
  items[i] = // что-то делаем
}
*/

// exercise --------------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая высчитывает среднее арифметическое элементов переданного массива. Благодаря этой функции мы наконец-то посчитаем среднюю температуру по больнице:

const temperatures1 = [37.5, 34, 39.3, 40, 38.7, 41.5]
calculateAverage(temperatures1) // 38.5

const temperatures2 = [36, 37.4, 39, 41, 36.6]
calculateAverage(temperatures2) // 38
В случае пустого массива функция должна вернуть значение null (используйте в коде для этого guard expression):

const temperatures = []
calculateAverage(temperatures) // null
Подсказки
Guard Expression
*/

// my
/*
const calculateAverage = (coll = []) => {
  let sum = 0;
  if (coll.length === 0) {
    return null;
  }
  for (const num of coll) {
    sum += num;
  }
  sum = sum / coll.length;
  return sum;
};
console.log(calculateAverage([37.5, 34, 39.3, 40, 38.7, 41.5]));
*/

// teacher
/*
export default (coll) => {
  const itemsCount = coll.length

  if (itemsCount === 0) {
    return null
  }

  let sum = 0
  for (const item of coll) {
    sum += item
  }

  return sum / itemsCount
}
*/

// Теория: Удаление элементов массива ====================================
/*
const numbers = [1, 10]
delete numbers[0]
console.log(numbers)
// => [ <1 empty item>, 10 ]
*/

/*
const compact = (coll) => {
  // Инициализация результата
  // Для пустой входной коллекции результатом будет пустой массив
  const result = [];

  for (const item of coll) {
    if (item !== null) {
      result.push(item);
    }
  }

  return result;
};

console.log(compact([0, 1, false, null, true, "wow", null]));
// => [ 0, 1, false, true, 'wow' ]
console.log(compact([]));
// => []
*/

// exercise ---------------------
/*
еализуйте функцию getSameParity(), которая принимает на вход массив чисел и возвращает новый, состоящий из элементов, у которых такая же чётность, как и у первого элемента входного массива. Экспортируйте функцию по умолчанию.

getSameParity([]) // []
getSameParity([1, 2, 3]) // [1, 3]
getSameParity([1, 2, 8]) // [1]
getSameParity([2, 2, 8]) // [2, 2, 8]
Подсказки
Проверка чётности - остаток от деления: item % 2 === 0 — чётное число.
Если на вход функции передан пустой массив, то она должна вернуть пустой массив.
Для работы с отрицательными числами может понадобиться функция нахождения модуля Math.abs
Math.abs(-1) // 1
Math.abs(0) // 0
Math.abs(1) // 1
*/
// my
/*
const getSameParity = (coll = []) => {
  let result = [];
  if (coll.length === 0) {
    return [];
  }
  const first = coll[0];
  result.push(first);
  for (let i = 1; i < coll.length; i++) {
    if (Math.abs(coll[i]) % 2 === Math.abs(first % 2)) {
      result.push(coll[i]);
    }
  }

  return result;
};
console.log(getSameParity([-3, 2, 1]));
*/

// teacher
/*
const getSameParity = (coll) => {
  if (coll.length === 0) {
    return []
  }

  const result = []
  const remainder = Math.abs(coll[0] % 2)

  for (const item of coll) {
    if (Math.abs(item % 2) === remainder) {
      result.push(item)
    }
  }

  return result
}
*/

// Теория: Управляющие инструкции ======================================

// Break -----------
/*
const coll = ['one', 'two', 'three', 'four', 'stop', 'five']

for (const item of coll) {
  if (item === 'stop') {
    break
  }
  console.log(item)
}
*/

/*
const coll = ['one', 'two', 'three', 'four', 'stop', 'five']

let i = 0
while (coll[i] !== 'stop') {
  console.log(coll[i])
  i += 1
}
*/

/*
let i = 0
// Бесконечный цикл! Опасно запускать!
while (true) {
  console.log(i)
  i += 1
}
*/

/*
const coll = ['one', 'two', 'three', 'four', 'stop', 'five']
for (const item of coll) {
  if (false) {
    // Условие никогда не выполнится, но цикл все равно завершит работу
    break
  }

  console.log(item)
}
*/

// Continue ---------------------
/*
Инструкция continue позволяет пропустить итерацию цикла. Ниже пример с функцией myCompact(), которая удаляет null элементы из массива:

const myCompact = (coll) => {
  const result = []

  for (const item of coll) {
    if (item === null) {
      continue
    }

    result.push(item)
  }

  return result
}
*/

/*
Код без continue получается проще:

const myCompact = (coll) => {
  const result = []

  for (const item of coll) {
    if (item !== null) {
      result.push(item)
    }
  }

  return result
}
*/

// exercise ------------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход в виде массива кошелек с деньгами и название валюты и возвращает сумму денег указанной валюты.
Параметры функции:
Массив, содержащий купюры разных валют с различными номиналами
Наименование валюты
Реализуйте данную функцию, используя управляющие инструкции:

const money1 = [
  'eur 10', 'usd 1', 'usd 10', 'rub 50', 'usd 5',
]
getTotalAmount(money1, 'usd') // 16

const money2 = [
  'eur 10', 'usd 1', 'eur 5', 'rub 100', 'eur 20', 'eur 100', 'rub 200',
]
getTotalAmount(money2, 'eur') // 135

const money3 = [
  'eur 10', 'rub 50', 'eur 5', 'rub 10', 'rub 10', 'eur 100', 'rub 200',
]
getTotalAmount(money3, 'rub') // 270
Подсказки
Названия валют состоят из трех символов

Для преобразования строки в число используйте Number()

Для извлечения подстроки из строки используйте метод slice()

const str = 'some text'
str.slice(1, 6) // 'ome t'
str.slice(7) // 'xt'
*/

// my
/*
const getTotalAmount = (coll, money) => {
  let sum = 0;
  for (let item of coll) {
    if (item.slice(0, 3) === money) {
      sum += Number(item.slice(4));
    }
  }

  return sum;
};
*/

// teacher
/*
const getTotalAmount = (money, currency) => {
  let sum = 0

  for (const bill of money) {
    const currentCurrency = bill.slice(0, 3)
    if (currentCurrency !== currency) {
      continue
    }
    const denomination = Number(bill.slice(4))
    sum += denomination
  }

  return sum
}
*/

// Теория: Вложенные массивы ========================================
/*
const arr1 = [[3]]
arr1.length // 1

const arr2 = [1, [3, 2], [3, [4]]]
arr2.length // 3
*/

/*
const arr2 = [
  1, // первый элемент (число)
  [3, 2], // второй элемент (массив)
  [3, [4]], // третий элемент (массив)
]
arr2.length // 3
*/

/*
const arr1 = [[3]]
arr1[0][0] // 3

const arr2 = [1, [3, 2], [3, [4]]]
arr2[2][1][0] // 4
*/

/*
Изменение и добавление массивов в массив:

const arr1 = [[3]]
arr1[0] = [2, 10]
arr1.push([3, 4, 5])

// [[2, 10], [3, 4, 5]]
*/

/*
Вложенные массивы можно изменять напрямую, просто обратившись к нужному элементу:

const arr1 = [[3]]
arr1[0][0] = 5
// [[5]]
*/

/*
То же самое касается и добавления нового элемента:

const arr1 = [[3]]
arr1[0].push(10)
// [[3, 10]]
*/

// крестики нолики
/*
// Инициализируем поле
const field = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Делаем ход:
field[1][2] = "x";
// [
//     [null, null, null],
//     [null, null, 'x'],
//     [null, null, null],
// ]

// Теперь реализуем функцию, которая выполняет проверку:

const hasPlayerMoved = (field, symbol) => {
  // Обходим поле. Каждый элемент — это строчка в игровом поле.
  for (const row of field) {
    // метод includes проверяет присутствует ли элемент в массиве,
    if (row.includes(symbol)) {
      // Если присутствует, значит мы нашли то, что искали.
      return true;
    }
  }

  // Если поле было просмотрено, но ничего не нашли,
  // значит ходов не было.
  return false;
};

console.log(hasPlayerMoved(field, "x")); // true
hasPlayerMoved(field, "o"); // false
*/

// exercise -------------
/*

Суперсерия Канада-СССР – это 8 товарищеских хоккейных матчей, проводившихся между командами СССР и Канады в 72 (первая суперсерия) и в 74 годах (вторая суперсерия). В этом задании вам предстоит написать функцию, которая вычисляет команду, выигравшую суперсерию.

superseries.js
Реализуйте и экспортируйте по умолчанию функцию, которая находит команду победителя для конкретной суперсерии. Победитель определяется как команда, у которой больше побед (не количество забитых шайб) в конкретной серии. Функция принимает на вход массив, в котором каждый элемент — это массив, описывающий счет в конкретной игре (сколько шайб забила Канада и СССР). Результат функции – название страны: 'canada', 'ussr'. Если суперсерия закончилась в ничью, то нужно вернуть null.

import getSuperSeriesWinner from './superseries.js'
// Первое число – сколько забила Канада
// Второе число – сколько забила СССР
const scores = [
  [3, 7], // Первая игра
  [4, 1], // Вторая игра
  [4, 4],
  [3, 5],
  [4, 5],
  [3, 2],
  [4, 3],
  [6, 5],
]

getSuperSeriesWinner(scores) // 'canada'
Подсказки
Решение учителя использует функцию Math.sign
*/
/*
// my
const getSuperSeriesWinner = (coll) => {
  let winCanada = 0;
  let winRusia = 0;

  for (let game of coll) {
    if (game[0] === game[1]) {
      continue;
    } else if (game[0] > game[1]) {
      winCanada++;
    } else if (game[0] < game[1]) {
      winRusia++;
    }
  }
  if (winCanada === winRusia) {
    return null;
  } else if (winCanada > winRusia) {
    return "canada";
  } else if (winCanada < winRusia) {
    return "ussr";
  }
};
// teacher
export default (scores) => {
  let result = 0
  for (const score of scores) {
    result += Math.sign(score[0] - score[1])
  }

  if (result > 0) {
    return 'canada'
  }
  if (result < 0) {
    return 'ussr'
  }

  return null
}
*/

// Теория: Генерация строки в цикле ========================================

/*
const coll = ['Покормить кота', 'Купить молоко', 'Сделать уборку']

buildTodoList(coll)
// Список дел:
//   * Покормить кота
//   * Купить молоко
//   * Сделать уборку
// Напоминание: дела нужно выполнить сегодня. Не откладывать на завтра!
*/
/*
const coll = ["Покормить кота", "Купить молоко", "Сделать уборку"];

const buildTodoList = (coll) => {
  let result = "Список дел на сегодня:";
  for (const item of coll) {
    result = `${result}\n  * ${item}`;
    // либо так: result += `\n  * ${item}`;
  }
  result = `${result}\nНапоминание: дела нужно выполнить сегодня. Не откладывать на завтра!`;

  return result;
};

const buildTodoList = (coll) => {
  const parts = [];
  for (const item of coll) {
    parts.push(`* ${item}`);
  }

  // Метод join объединяет элементы массива в строку
  // В качестве разделителя между значениями
  // используется то, что передано параметром. В нашем случае — это перевод строки
  const innerValue = parts.join("\n");
  const result = `Список дел:\n${innerValue}\nНапоминание: дела нужно выполнить сегодня. Не откладывать на завтра!`;
  return result;
};
console.log(buildTodoList(coll));
*/
/*
const parts = ["JavaScript", "PHP", "Python"];
const output = parts.join("\n");

console.log(output); // => JavaScript, PHP, Python
*/
/*
// Неправильно

const parts = []
for (const item of coll) {
  parts.push(`\n  * ${item}`)
}
const innerValue = parts.join('') // разделителя нет

// Правильно

const parts = []
for (const item of coll) {
  parts.push(`* ${item}`)
}
const innerValue = parts.join('\n') // перевод строки
*/

// exercise -------------------
/*
Реализуйте функцию buildDefinitionList(), которая генерирует HTML список определений (теги <dl>, <dt> и <dd>) и возвращает получившуюся строку. При отсутствии элементов в массиве функция возвращает пустую строку. Экспортируйте функцию по умолчанию.

Параметры функции
Список определений следующего формата:

const definitions = [
  ['definition1', 'description1'],
  ['definition2', 'description2'],
]
То есть каждый элемент входного списка сам является массивом, содержащим два элемента: термин и его определение.

Пример использования
const definitions = [
  ['Блямба', 'Выпуклость, утолщения на поверхности чего-либо'],
  ['Бобр', 'Животное из отряда грызунов'],
]

buildDefinitionList(definitions)
// '<dl><dt>Блямба</dt><dd>Выпуклость, утолщения на поверхности чего-либо</dd><dt>Бобр</dt><dd>Животное из отряда грызунов</dd></dl>';
Подсказки
Описания тэгов: dl, dt, dd
*/
// my
/*
const buildDefinitionList = (coll) => {
  const result = [];
  for (let items of coll) {
    result.push(`<dt>${items[0]}</dt><dd>${items[1]}</dd>`);
  }

  const innerValue = `<dl>${result.join("")}</dl>`;

  return innerValue;
};

// teacher
const buildDefinitionList = (definitions) => {
  if (definitions.length === 0) {
    return ''
  }

  const parts = []

  for (const definition of definitions) {
    const name = definition[0]
    const description = definition[1]
    parts.push(`<dt>${name}</dt><dd>${description}</dd>`)
  }

  const innerValue = parts.join('')
  const result = `<dl>${innerValue}</dl>`

  return result
}
*/

// Теория: Обработка строк через преобразование в массив ========================
/*
Дана строка текста. Нужно сделать заглавной первую букву каждого слова в тексте. Для простоты считаем что мы работаем с текстом, который не содержит знаков препинания:

const text = 'hello hexlet'
capitalizeWords(text) // 'Hello Hexlet'
Решить ее можно многими способами. Чем больше называет человек — тем лучше. К ним относятся:

Посимвольный перебор строки
Через преобразование в массив
Регулярные выражения (рассматриваются в отдельном курсе)
*/

// Посимвольный перебор строки ------------
/*
const text = "hello hexlet";

const capitalizeWords = (str) => {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    if (i === 0 || str[i - 1] === " ") {
      result += str[i].toUpperCase();
    } else {
      result += str[i];
    }
  }
  return result;
};

console.log(capitalizeWords(text));
*/
/*
// Через преобразование в массив ---------
const text = "hello hexlet";

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

console.log(capitalizeWords(text));
*/
/*
// Регулярные выражения
const text = "hello hexlet, (how) are you";

const capitalizeWords = (str) => {
  return str.replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};

console.log(capitalizeWords(text));
*/

// Разберем решение через массив. Для этого воспользуемся методом строки split(), который разделяет строку на части:
/*
const str = "hello? hexlet, how are, you";

const capitalize = (text) => {
  if (text.length === 0) return text;
  return `${text[0].toUpperCase()}${text.slice(1)}`;
};

const capitalizeWords = (coll) => {
  const separation = " ";
  const words = coll.split(separation);

  const capitalizedWords = [];

  for (let word of words) {
    capitalizedWords.push(capitalize(word));
  }

  return capitalizedWords.join(separation);
};

console.log(capitalizeWords(str));
*/
/*
// exercise ----------
Реализуйте и экспортируйте по умолчанию функцию, которая заменяет каждое вхождение указанных слов в предложении на последовательность $#%! и возвращает полученную строку. Аргументы:

Текст
Набор стоп слов
Словом считается любая непрерывная последовательность символов, включая любые спецсимволы (без пробелов).

Примеры
import makeCensored from '../strings'

const sentence = 'When you play the game of thrones, you win or you die'
const result = makeCensored(sentence, ['die', 'play'])
// When you $#%! the game of thrones, you win or you $#%!

const sentence2 = 'chicken chicken? chicken! chicken'
const result2 = makeCensored(sentence2, ['?', 'chicken'])
// '$#%! chicken? chicken! $#%!';
Подсказки
Тернарный оператор может сослужить вам хорошую службу в этой практике
Также может очень пригодиться метод includes()
*/
/*
// my --------
const sentence = "When you play the game of thrones, you win or you die";
const sentence2 = "chicken chicken? chicken! chicken";
const makeCensored = (str, stop) => {
  const collStr = str.split(" ");
  const stopWorldChenge = "$#%!";

  for (let i = 0; i < collStr.length; i++) {
    stop.includes(collStr[i]) ? (collStr[i] = stopWorldChenge) : collStr[i];
  }

  return collStr.join(" ");
};

console.log(makeCensored(sentence2, ["?", "chicken"]));

// teacher -------
const makeCensored = (text, stopWords) => {
  const words = text.split(' ')

  const result = []
  for (const word of words) {
    const newWord = stopWords.includes(word) ? '$#%!' : word
    result.push(newWord)
  }

  return result.join(' ')
}
*/

// Теория: Вложенные циклы ==================================
/*
[[3, 2], 5, 3, [3, 4, 2], 10].flat()
// [3, 2, 5, 3, 3, 4, 2, 10]
*/
/*
const flatten = (coll) => {
  const result = [];
  for (const item of coll) {
    // Array.isArray — функция-предикат стандартной библиотеки,
    // которая проверяет, является ли значение массивом.
    if (Array.isArray(item)) {
      // Если значение — массив, то проходим по всем его элементам
      // Здесь появился вложенный цикл
      for (const subItem of item) {
        // и добавляем их в результирующий массив
        result.push(subItem);
      }
    } else {
      // Если значение не массив, то сразу добавляем его в результирующий массив
      result.push(item);
    }
  }

  return result;
};

console.log(flatten([3, 2, [], [3, 4, 2], 3, [123, 3]]));
// => [ 3, 2, 3, 4, 2, 3, 123, 3 ]
*/
/*
// Эта функция заменяет собой цикл
// Не забывайте, что внутри все равно остается полный обход массива
[1, 10, 3].includes(10) // true
*/
/*
// Изменяет первый массив напрямую
// В данном случае такая реализация оправдана
const append = (arr1, arr2) => {
  for (const item of arr2) {
    arr1.push(item);
  }
};

const flatten = (coll) => {
  const result = [];
  for (const item of coll) {
    if (Array.isArray(item)) {
      // Нет присваивания, так как меняется сам result
      append(result, item);
    } else {
      result.push(item);
    }
  }

  return result;
};

console.log(flatten([3, 2, [], [3, 4, 2], 3, [123, 3]]));
// [3, 2, 3, 4, 2, 3, 123, 3]
*/

// exercise ---------------
/*
Реализуйте и экспортируйте по умолчанию функцию, принимающую на вход два массива и возвращающую количество общих уникальных значений в обоих массивах.

Примеры:
// Общие уникальные элементы: 1, 3, 2
getSameCount([1, 3, 2, 2], [3, 1, 1, 2, 5]) // 3

// Общие уникальные элементы: 4
getSameCount([1, 4, 4], [4, 8, 4]) // 1

// Общие уникальные элементы: 1, 10
getSameCount([1, 10, 3], [10, 100, 35, 1]) // 2

// Нет элементов
getSameCount([], []) // 0
Подсказки
Для получения массива без повторяющихся элементов, используйте uniq из библиотеки lodash.
В целях обучения и прокачки, решите это упражнение с помощью вложенных циклов.
*/
/*
// my
const getSameCount = (coll1, coll2) => {
  // const uniq1 = coll1.filter((item, index) => coll1.indexOf(item) === index);
  const uniq1 = [...new Set(coll1)];
  const uniq1 = new Set(coll1);
  console.log(uniq1);
  const uniq2 = coll2.filter((item, index) => coll2.indexOf(item) === index);
  console.log(uniq2);

  let counter = 0;

  for (let item1 of uniq1) {
    for (let item2 of uniq2) {
      if (item1 === item2) {
        counter += 1;
        break;
      }
    }
  }

  return counter;
};

console.log(getSameCount([1, 3, 2, 2], [3, 1, 1, 2, 5])); // 3
*/
/*
// teacher
const getSameCount = (coll1, coll2) => {
  let count = 0
  const uniqColl1 = _.uniq(coll1)
  const uniqColl2 = _.uniq(coll2)

  for (const item1 of uniqColl1) {
    for (const item2 of uniqColl2) {
      if (item1 === item2) {
        count += 1
        break
      }
    }
  }

  return count
}
*/

// Теория: Теория множеств =================================

// Пересечение -------------------
// Друзья одного человека
// const friends1 = ["vasya", "kolya", "petya"];

// Друзья другого человека
// const friends2 = ["igor", "petya", "sergey", "vasya", "sasha"];

// Общие друзья
// Эта функция принимает любое количество массивов.
// То есть вы можете находить пересечение любого количества массивов за один вызов.
// _.intersection(friends1, friends2); // ['vasya', 'petya']
/*
const intersection = (coll1, coll2) => {
  const uniq2 = new Set(coll2);

  return [...new Set(coll1)].filter((item) => uniq2.has(item));
};

console.log(intersection(friends1, friends2));
*/

// Объединение ---------
/*
// Объединением множеств называется множество, в которое входят элементы всех данных множеств.

const friends1 = ['vasya', 'kolya', 'petya']
const friends2 = ['igor', 'petya', 'sergey', 'vasya', 'sasha']

_.union(friends1, friends2) // ['vasya', 'kolya', 'petya', 'igor', 'sergey', 'sasha']
// Каждый друг в объединении встречается ровно один раз.
*/

// Дополнение (разность)
/*
Разностью двух множеств называется множество, в которое входят элементы первого множества, не входящие во второе. В программировании такая операция часто называется diff (разница).

const friends1 = ['vasya', 'kolya', 'petya']
const friends2 = ['igor', 'petya', 'sergey', 'vasya', 'sasha']

_.difference(friends1, friends2) // ['kolya']
*/
/*
Принадлежность множеству
Проверку принадлежности элемента множеству можно выполнить с помощью встроенного метода includes():

const terribleNumbers = [4, 13]

if (terribleNumbers.includes(10)) {
  console.log('woah!')
}
*/

// exercise ------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая получает на вход строку и считает, сколько символов (без учёта повторяющихся символов) использовано в этой строке. Например, в строке yy используется всего один символ — y. А в строке 111yya! — используется четыре символа: 1, y, a и !:

const text1 = 'yyab' // y, a, b
countUniqChars(text1) // 3

const text2 = 'You know nothing Jon Snow'
countUniqChars(text2) // 13

// Если передана пустая строка, то функция должна вернуть `0`
const text3 = ''
countUniqChars(text3) // 0
Подсказки
includes() – проверяет есть ли такой элемент в массиве
*/

// my
/* 1
const text1 = "You know nothing Jon Snow";

const countUniqChars = (str) => {
  if (str === "") return 0;

  const arrStr = str.split("");

  let uniq = [];

  for (let item of arrStr) {
    if (!uniq.includes(item)) {
      uniq.push(item);
    }
  }

  return uniq.length;
};

console.log(countUniqChars(text1));
*/
/* 2
const text1 = "You know nothing Jon Snow";

const countUniqChars = (str) => new Set(str).size;

console.log(countUniqChars(text1));
*/

/*
// teacher
const countUniqChars = (text) => {
  const uniqChars = []

  for (const char of text) {
    if (!uniqChars.includes(char)) {
      uniqChars.push(char)
    }
  }

  return uniqChars.length
}
*/

// Теория: Сортировка массивов =================================
/*
const numbers = [8, 3, 10];
// sort изменяет массив!
numbers.sort((a, b) => a - b); // сортировка по возрастанию
console.log(numbers); // => [3, 8, 10]

// В обратную сторону можно через reverse() выполненный после sort()
// Тоже изменяет массив
numbers.reverse();
console.log(numbers); // => [10, 8, 3]
*/
/*
// Функция изменяет входящий массив coll
const bubbleSort = (coll) => {
  let stepsCount = coll.length - 1;
  // Объявляем переменную swapped, значение которой показывает,
  // был ли совершен обмен элементов во время перебора массива
  let swapped;
  // do..while цикл. Работает почти идентично while
  // Разница в проверке. Тут она делается не до выполнения тела, а после.
  // Такой цикл полезен там, где надо выполнить тело хотя бы раз в любом случае.
  do {
    swapped = false;
    // Перебираем массив и меняем местами элементы, если предыдущий
    // больше, чем следующий
    for (let i = 0; i < stepsCount; i += 1) {
      if (coll[i] > coll[i + 1]) {
        // temp – временная константа для хранения текущего элемента
        const temp = coll[i];
        coll[i] = coll[i + 1];
        coll[i + 1] = temp;
        // Если сработал if и была совершена перестановка,
        // присваиваем swapped значение true
        swapped = true;
      }
    }
    // Уменьшаем счетчик на 1, т.к. самый большой элемент уже находится
    // в конце массива
    stepsCount -= 1;
  } while (swapped); // продолжаем, пока swapped === true

  return coll;
};

console.log(bubbleSort([3, 2, 10, -2, 0])); // => [ -2, 0, 2, 3, 10 ]
*/
/*
const bubbleSort = (coll) => {
  let stepsCount = coll.length - 1;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < stepsCount; i++) {
      if (coll[i] > coll[i + 1]) {
        const temp = coll[i];
        coll[i] = coll[i + 1];
        coll[i + 1] = temp;

        swapped = true;
      }
    }
    stepsCount -= 1;
  } while (swapped);

  return coll;
};

console.log(bubbleSort([3, 2, 10, -2, 0])); // => [ -2, 0, 2, 3, 10 ]
*/

/*
Плюсы +++++++++++++
Экономия итераций: Использование переменной stepCount сокращает область проверки на каждой итерации, так как самый большой элемент гарантированно «всплывает» в конец.
Ранний выход: Благодаря флагу swapped алгоритм остановится сразу, если массив уже отсортирован (лучший случай — O(n)).
In-place (на месте): Не требует дополнительной памяти для хранения копий массива (пространственная сложность O(1)).
Стабильность: Алгоритм сохраняет относительный порядок равных элементов.
Минусы -------------
Низкая скорость: Средняя и худшая временная сложность — O(n²). На больших данных это крайне медленно.
Мутация: Функция изменяет исходный массив (coll), что может привести к нежелательным побочным эффектам в функциональном программировании.
Узкая применимость: Подходит только для обучения или очень маленьких массивов; для реальных задач в JS лучше использовать нативный .sort().
*/

// exercise ----------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая сортирует массив используя пузырьковую сортировку. Постарайтесь не подглядывать в текст теории и попробуйте воспроизвести алгоритм по памяти:

import bubbleSort from '../arrays'

bubbleSort([]) // []
bubbleSort([3, 10, 4, 3]) // [3, 3, 4, 10]
*/
// my
/*
const bubbleSort = (coll) => {
  let stepCount = coll.length - 1;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < stepCount; i++) {
      if (coll[i] > coll[i + 1]) {
        const temp = coll[i];
        coll[i] = coll[i + 1];
        coll[i + 1] = temp;

        swapped = true;
      }
    }
    stepCount -= 1;
  } while (swapped);

  return coll;
};
*/
// teacher
/*
const bubbleSort = (arr) => {
  let stepsCount = arr.length - 1
  let swapped
  do {
    swapped = false
    for (let i = 0; i < stepsCount; i += 1) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
        swapped = true
      }
    }
    stepsCount -= 1
  } while (swapped)

  return arr
}
*/

// Теория: Стек ==================================
/*
const stack = [];

stack.push(3);
console.log(stack); // => [ 3 ]
stack.push("Winterfall");
console.log(stack); // => [ 3, 'Winterfall' ]
stack.push(true);
console.log(stack); // => [ 3, 'Winterfall', true ]

const element1 = stack.pop();
console.log(element1); // => true
console.log(stack); // => [ 3, 'Winterfall' ]

const element2 = stack.pop();
console.log(element2); // => Winterfall
console.log(stack); // => [ 3 ]
*/
/*
const checkIsBalanced = (expression) => {
  // Инициализация стека
  const stack = [];
  // Проходим по каждому символу в строке
  for (const symbol of expression) {
    // Смотрим, открывающий или закрывающий
    // Если символ открывающий
    if (symbol === "(") {
      // Добавляем его в стек
      stack.push(symbol);
      // Если символ закрывающий
    } else if (symbol === ")") {
      // Достаем из стека последний элемент
      // Если стек пуст, значит для закрывающего не нашлось открывающего
      // Значит баланса нет, возвращаем false
      if (!stack.pop()) {
        return false;
      }
    }
  }

  // Проверяем, что стек пуст
  // Если в стеке остались элементы, то не все открывающие скобки закрыты,
  // а значит баланса нет
  return stack.length === 0;
};
*/
/*
const checkIsBalanced = (expression) => {
  const steck = [];

  for (let item of expression) {
    if (item === "(") {
      steck.push(item);
    } else if (item === ")") {
      if (!steck.pop()) {
        return false;
      }
    }
  }

  return steck.length === 0;
};

console.log(checkIsBalanced("()()(()"));
*/

// exercise -------------------
/*
Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход строку, состоящую только из открывающих и закрывающих скобок разных типов, и проверяет, является ли эта строка сбалансированной. Открывающие и закрывающие скобки должны быть одного вида. Пустая строка (отсутствие скобок) считается сбалансированной.

Строка считается корректной (сбалансированной), если содержащаяся в ней скобочная структура соответствует требованиям:

Скобки — это парные структуры. У каждой открывающей скобки должна быть соответствующая ей закрывающая скобка.
Скобки должны закрываться в правильном порядке:
import isBracketStructureBalanced from './strings.js'

// Пример вложенности
isBracketStructureBalanced('(>') // false
isBracketStructureBalanced('()') // true
isBracketStructureBalanced('[()]') // true
isBracketStructureBalanced('({}[])') // true
isBracketStructureBalanced('{<>}}') // false
isBracketStructureBalanced('([)]') // false
Функция должна поддерживать, минимум, четыре вида скобок: круглые — (), квадратные — [], фигурные — {} и угловые — <>.

Подсказки
Для решения вам может пригодиться метод indexOf. Подумайте, как его можно использовать для определения парного закрывающего символа
*/
// my
/*
const openingSimbol = ["(", "[", "{", "<"];
const closingSimbol = [")", "]", "}", ">"];

const isBracketStructureBalanced = (expression) => {
  const stack = [];

  for (let item of expression) {
    const openIndex = openingSimbol.indexOf(item);
    const closeIndex = closingSimbol.indexOf(item);
    if (openIndex != -1) {
      stack.push(openIndex);
    } else if (closeIndex != -1) {
      if (stack.pop() != closeIndex) {
        return false;
      }
    }
  }
  console.log(stack);
  return stack.length === 0;
};

console.log(isBracketStructureBalanced("())"));
*/
/*
// teacher
const openingSymbols = ["(", "[", "{", "<"];
const closingSymbols = [")", "]", "}", ">"];

const isOpeningSymbol = (symbol) => openingSymbols.includes(symbol);
const getClosingSymbolFor = (symbol) => {
  for (let i = 0; i < closingSymbols.length; i += 1) {
    if (openingSymbols[i] === symbol) {
      return closingSymbols[i];
    }
  }
  return null;
};

const isBracketStructureBalanced = (str) => {
  const stack = [];
  for (const symbol of str) {
    if (isOpeningSymbol(symbol)) {
      const closingSymbol = getClosingSymbolFor(symbol);
      stack.push(closingSymbol);
    } else {
      const lastSavedSymbol = stack.pop();
      if (symbol !== lastSavedSymbol) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

console.log(isBracketStructureBalanced("())"));
*/

// Теория: Big O =====================================
// exercise -------------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход два отсортированных массива и находит их пересечение. Пересечение двух массивов A и B — это массив только с теми элементами A и B, которые одновременно принадлежат обоим массивам, без дублей:

getIntersectionOfSortedArrays([10, 11, 24], [10, 13, 14, 18, 24, 30]) // [10, 24]

getIntersectionOfSortedArrays([10, 11, 24], [-2, 3, 4]) // []

getIntersectionOfSortedArrays([], [2]) // []
Алгоритм
Поиск пересечения двух неотсортированных массивов — операция, в рамках которой выполняется вложенный цикл с полной проверкой каждого элемента первого массива на вхождение во второй.

Сложность данного алгоритма O(n * m) (произведение n и m), где n и m — размерности массивов. Если массивы отсортированы, то можно реализовать алгоритм, сложность которого уже O(n + m), что значительно лучше.

Суть алгоритма довольно проста. В коде вводятся два указателя (индекса) на каждый из массивов. Начальное значение каждого указателя 0. Затем идёт проверка элементов, находящихся под этими индексами в обоих массивах. Если они совпадают, то значение заносится в результирующий массив, а оба индекса инкрементируются. Если значение в первом массиве больше, чем во втором, то инкрементируется указатель второго массива, иначе — первого.
*/

// my
/*
const getIntersectionOfSortedArrays = (coll1, coll2) => {
  const result = [];

  let i = 0;
  let j = 0;

  while (i < coll1.length && j < coll2.length) {
    if (coll1[i] === coll2[j]) {
      if (result.length === 0 || result[result.length - 1] !== coll1[i]) {
        result.push(coll1[i]);
      }

      i++;
      j++;
    } else if (coll1[i] < coll2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
};

console.log(
  getIntersectionOfSortedArrays([1, 1, 1, 2, 2, 2], [1, 1, 2, 2, 3, 3]),
);
*/
/*
// teacher
const getIntersectionOfSortedArrays = (coll1, coll2) => {
  const size1 = coll1.length;
  const size2 = coll2.length;
  const result = [];

  let i1 = 0;
  let i2 = 0;

  while (i1 < size1 && i2 < size2) {
    const lastCommon = result.at(-1);
    const item1 = coll1[i1];
    const item2 = coll2[i2];

    if (item1 === item2 && item1 !== lastCommon) {
      result.push(item1);
      i1++;
      i2++;
    } else if (item1 > item2) {
      i2++;
    } else {
      i1++;
    }
  }

  return result;
};

console.log(
  getIntersectionOfSortedArrays([1, 1, 1, 2, 2, 2], [1, 1, 2, 2, 3, 3]),
);
*/

// Теория: Деструктуризация =============================
/*
const point = [3, 5]

console.log(`${point[0]}:${point[1]}`) // => 3:5
*/
/*
const x = point[0]
const y = point[1]

console.log(`${x}:${y}`) // => 3:5
*/
/*
const [x, y] = point
// Слева массив повторяет структуру правого массива
// но вместо значений используются идентификаторы
// они заполняются значениями, стоящими на тех же позициях в правом массиве
// [x, y] = [3, 5]
// x = 3, y = 5

console.log(`${x}:${y}`) // => 3:5
*/
/*
// Извлекаем первый элемент
// Остальные игнорируются
const [x] = point

// Извлекаем второй элемент
// Для этого просто не указываем первый
const [, y] = point

// и даже так
const [, secondElement, , fourthElement, fifthElement] = [1, 2, 3, 4, 5, 6]

console.log(secondElement) // => 2
console.log(fourthElement) // => 4
console.log(fifthElement) // => 5
*/
/*
const [firstElement, secondElement, thirdElement] = [1, 2]

console.log(firstElement) // => 1
console.log(secondElement) // => 2
console.log(thirdElement) // => undefined
*/
/*
const [firstElement, secondElement, thirdElement = 3] = [1, 2]

console.log(firstElement) // => 1
console.log(secondElement) // => 2
console.log(thirdElement) // => 3
*/
/*
const [one, [two, three]] = [1, [2, 3]]
*/

// Деструктуризация в циклах ----------------------------
/*
const points = [
  [4, 3],
  [0, -3],
];

for (const [x, y] of points) {
  console.log([x, y]);
}

// => [ 4, 3 ]
// => [ 0, -3 ]

// В этом примере каждый элемент в цикле является массивом. Без деструктуризации цикл выглядит так:

for (const item of points) {
  console.log(item)
}
*/
/*
const swapValues = ([a, b]) => [b, a]

swapValues([1, 2]) // [2, 1]
*/

// Деструктуризация строк ----------------------------
// В JavaScript строки ведут себя подобно массивам и их также можно деструктурировать.
/*
const [first, second, third] = "two";
console.log(first); // => 't'
console.log(second); // => 'w'
console.log(third); // => 'o'
*/

// exercise ------------------
/*
Реализуйте и экспортируйте функцию getTheNearestLocation(), которая находит ближайшее место к указанной точке на карте и возвращает его. Параметры функции:

locations – список мест на карте (массив). Каждое место – массив из двух элементов:
Первый элемент – это название места
Второй – точка на карте (массив из двух чисел-координат x и y)
point – текущая точка на карте
import { getTheNearestLocation } from '../location.js'

const locations = [
  ['Park', [10, 5]],
  ['Sea', [1, 3]],
  ['Museum', [8, 4]],
]

const currentPoint = [5, 5]

// Если мест нет, то возвращается null
getTheNearestLocation([], currentPoint) // null

getTheNearestLocation(locations, currentPoint) // ['Museum', [8, 4]]
Для решения этой задачи деструктуризация не нужна, но мы хотим её потренировать. Поэтому решите эту задачу без обращения к индексам массивов.

Подсказки
Расстояние между точками высчитывается с помощью функции getDistance(). Она принимает в качестве параметров две точки и возвращает расстояние между ними
*/
/*
const getDistance = ([x1, y1], [x2, y2]) => {
  const xs = x2 - x1;
  const ys = y2 - y1;

  return Math.sqrt(xs ** 2 + ys ** 2);
};

const locations = [
  ["Park", [10, 5]],
  ["Sea", [1, 3]],
  ["Museum", [8, 4]],
];

const currentPoint = [10, 4];
*/

// my
/*
const getTheNearestLocation = (locations, point) => {
  if (locations.length === 0) return null;

  // Инициализируем переменные первой локацией из списка
  let firstLocation = locations[0];
  let firstDistance = getDistance(locations[0][1], point);

  for (const location of locations) {
    const [, lPoint] = location;
    const distance = getDistance(lPoint, point);

    if (distance < firstDistance) {
      firstDistance = distance;
      firstLocation = location;
    }
  }

  return firstLocation;
};
*/
/*
// teacher
const getTheNearestLocation = (locations, currentPoint) => {
  if (locations.length === 0) return null;

  let [nearestLocation] = locations;
  const [, pointLocation] = nearestLocation;
  let lowestDistance = getDistance(currentPoint, pointLocation);

  for (let location of locations) {
    const [, point] = location;
    const distance = getDistance(currentPoint, point);

    if (distance < lowestDistance) {
      lowestDistance = distance;
      nearestLocation = location;
    }
  }

  return nearestLocation;
};

console.log(getTheNearestLocation(locations, currentPoint)); //['Museum', [8, 4]]
*/

// Теория: Rest и деструктуризация ======================
/*
const fruits = ['apple', 'orange', 'banana', 'pineapple']

// ... – rest
const [first, ...rest] = fruits
console.log(first) // 'apple'
console.log(rest) // ['orange', 'banana', 'pineapple']
*/
/*
const [head, ...tail] = fruits
// tail = ['orange', 'banana', 'pineapple']

const [first, second, ...rest] = fruits
// rest = ['banana', 'pineapple']

const [first, second, third, ...rest] = fruits
// rest = ['pineapple']

// Если элементов нет, то в rest окажется пустой массив
const [first, second, third, oneMore, ...rest] = fruits
// rest = []

// Можно пропускать элементы, ничего не указывая между запятыми. Ниже пропущен второй элемент
const [first, , third, ...rest] = fruits
// rest = ['pineapple']
*/
/*
// В ситуациях, когда нас интересует только часть массива, но не важны первые элементы, лучше воспользоваться методом массива slice():
// slice возвращает новый массив, а не изменяет старый
const rest = fruits.slice(1)
console.log(rest) // ['orange', 'banana', 'pineapple'];
*/
/*
//Синтаксис rest можно применять также и при деструктуризации строк.
const [first, second, ...rest] = 'some string'
console.log(first) // => 's'
console.log(second) // => 'o'
console.log(rest) // => [ 'm', 'e', ' ', 's', 't', 'r', 'i', 'n', 'g' ]
// Обратите внимание, что после упаковки оставшейся части строки в rest мы получаем массив, а не строку.
*/

// exercise ------
/*
Реализуйте и экспортируйте функцию getMax(), которая ищет в массиве максимальное значение и возвращает его:

import { getMax } from '../arrays.js'

// Для пустого массива возвращается null
getMax([]) // null
getMax([1, 10, 8]) // 10
Эта функция реализуется просто, и мы уже делали подобное ранее. Сейчас же мы учимся использовать rest-оператор. Используйте его вместе с деструктуризацией для извлечения первого элемента и всех остальных. Первый элемент становится начальным значением максимального, а остальные перебираются в цикле для определения максимального. При нахождении большего значения чем сохраненное ранее, сохраненное заменяется на новое, большее значение.
*/
/*
// my
const getMax = (arr) => {
  if (arr.length === 0) return null;

  let [maxItem, ...rest] = arr;

  for (let item of rest) {
    if (item > maxItem) {
      maxItem = item;
    }
  }

  return maxItem;
};

console.log(getMax([1, 10, 8])); // 10
*/
// teacher - the same

// Теория: Spread и создание новых массивов ==============================
/*
const frenchCities = ["paris", "marseille"];
const cities = ["milan", "rome", ...frenchCities];
// ['milan', 'rome', 'paris', 'marseille']
console.log(frenchCities);
console.log(cities);
// Массив frenchCities при этом никак не меняется
// То же самое без spread
// const cities = ['milan', 'rome'].concat(frenchCities)
*/

//  Как отличить его от rest? Все дело в контексте использования. Rest появляется слева от знака равно там, где происходит деструктуризация. Spread – справа от знака равно, там где массив формируется.

/*
//В отличие от rest, spread может появляться в любой части массива. Например, мы можем дополнить исходный массив не справа, а слева:
const cities = [...frenchCities, 'milan', 'rome']
// ['paris', 'marseille', 'milan', 'rome']
// То же самое без spread
// const cities = frenchCities.concat(['milan', 'rome'])
*/

/*
//И даже посередине:
const cities = ['milan', ...frenchCities, 'rome']
// ['milan', 'paris', 'marseille', 'rome']
// Без spread подобный код нельзя выразить одной операцией
*/

/*
// Spread работает с любым количеством массивов:
const frenchCities = ['paris', 'marseille']
const italianCities = ['rome', 'milan']
// слияние двух массивов
const cities = [...frenchCities, ...italianCities]
// ['paris', 'marseille', 'rome', 'milan']
// То же самое без spread
// const cities = frenchCities.concat(italianCities)
*/

/*
// Копирование массива ----------------
// Spread нередко используется для копирования массива. Копирование предотвращает изменение исходного массива в том случае, когда необходимо менять его копию:
const frenchCities = ['paris', 'marseille']
const copy = [...frenchCities]
copy.push('lyon')
console.log(copy) // => [ 'paris', 'marseille', 'lyon' ]
console.log(frenchCities) // => [ 'paris', 'marseille' ]
// То же самое без spread
// const frenchCities = ['paris', 'marseille']
// const copy = frenchCities.slice()
*/

/*
// exercise -------------------
Реализуйте и экспортируйте функцию flatten(). Эта функция принимает на вход массив и выпрямляет его: если элементами массива являются массивы, то flatten сводит всё к одному массиву, раскрывая один уровень вложенности.
В js эта функция реализована как метод flat() у массивов. Его использовать нельзя.
import { flatten } from '../arrays.js'
// Для пустого массива возвращается []
flatten([]) // []
flatten([1, [3, 2], 9]) // [1, 3, 2, 9]
flatten([1, [[2], [3]], [9]]) // [1, [2], [3], 9]
Реализуйте добавление элементов вложенного массива в результирующий через spread-оператор.
*/

/*
//my
const flatten = (arr) => {
  if (arr.length === 0) return [];

  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...arr[i]);
    } else {
      result.push(arr[i]);
    }
  }

  return result;
};
console.log(flatten([1, [[2], [3]], [9]])); // [1, [2], [3], 9]
*/

/*
// teacher
const flatten = (coll) => {
  let result = [];
  for (const item of coll) {
    console.log(result);
    if (Array.isArray(item)) {
      result = [...result, ...item];
    } else {
      result = [...result, item];
    }
  }

  return result;
};
console.log(flatten([1, [[2], [3]], [9]])); // [1, [2], [3], 9]
*/

// Теория: Массивы в памяти компьютера ===========================
// Массивы в Cи ---------------

/*
// Пример на Си:
// Инициализация массива из пяти элементов типа int
// Предположим, что int занимает 2 байта
// Общее количество памяти, выделенное под массив: int * 5 = 2 * 5 = 10 байт
int numbers[] = {19, 10, 8, 17, 9};
numbers[3]; // 17
*/

/*
// Первый элемент
// Начальный адрес + 2 * 0 = начальный адрес
numbers[0]; // 19

// Начальный адрес + 2 * 1 = начальный адрес + 2
// То есть сместились на 2 байта
numbers[1]; // 10

// Начальный адрес + 2 * 2 = начальный адрес + 4
// То есть сместились на 4 байта
numbers[2]; // 8

// Последний элемент
// Начальный адрес + 2 * 4 = начальный адрес + 8
// То есть сместились на 8 байт
// И сам элемент занимает 2 байта. В сумме как раз 10
numbers[4]; // 9
*/

/*
// Массив из трех элементов, внутри которого массивы по 10 элементов
// Это значит, что здесь можно хранить 3 строки длиной не больше 10 символов
char strings[3][10] = {
   "spike",
   "tom",
   "jerry"
};
strings[0]; // spike
*/

// Безопасность -----------------
// В отличие от высокоуровневых языков, в которых код защищен от выхода за границу массива, в таком языке, как C, выход за границу не приводит к ошибкам (на самом деле он может приводить к segfault, но это здесь не важно). Обращение к элементу, индекс которого находится за пределами массива, вернет данные, которые лежат в той самой области памяти, куда его попросили обратиться в соответствии с формулой выше. Чем они окажутся — никому не известно (но они будут проинтерпретированы в соответствии с типом массива. Если массив имеет тип int, то вернется число). Выход за границу массива активно эксплуатируется хакерами для взлома программ.

// Массивы в динамических языках -------------

// Испытание: Обратная польская запись -1
/*
В данном упражнении необходимо реализовать стековую машину, то есть алгоритм, проводящий вычисления по обратной польской записи.
Обратная польская нотация или постфиксная нотация — форма записи математических и логических выражений, в которой операнды расположены перед знаками операций. Выражение читается слева направо. Когда в выражении встречается знак операции, выполняется соответствующая операция над двумя ближайшими операндами, находящимися слева от знака операции. Результат операции заменяет в выражении последовательность её операндов и знак, после чего выражение вычисляется дальше по тому же правилу. Таким образом, результатом вычисления всего выражения становится результат последней вычисленной операции.
Например, выражение (1 + 2) * 4 + 3 в постфиксной нотации будет выглядеть так: 1 2 + 4 * 3 +, а результат вычисления: 15. Другой пример - выражение: 7 - 2 * 3, в постфиксной нотации: 7 2 3 * -, результат: 1.
solution.js
Экспортируйте по умолчанию функцию, которая принимает массив, каждый элемент которого содержит число или знак операции (+, -, *, /). Функция должна вернуть результат вычисления по обратной польской записи. Если в какой-то момент происходит деление на ноль, функция должна вернуть значение null.
calcInPolishNotation([1, 2, '+', 4, '*', 3, '+']) // 15
calcInPolishNotation([7, 2, 3, '*', '-']) // 1
*/
/*
// my
const calcInPolishNotation = (arr) => {
  const stack = [];

  for (let item of arr) {
    if (item === "+" || item === "-" || item === "*" || item === "/") {
      const b = stack.pop();
      const a = stack.pop();

      if (item === "+") stack.push(a + b);
      else if (item === "-") stack.push(a - b);
      else if (item === "*") stack.push(a * b);
      else if (item === "/") {
        if (b === 0) return null;
        stack.push(a / b);
      }
    } else {
      stack.push(Number(item));
    }
  }

  return stack[0];
};

console.log(calcInPolishNotation([1, 2, "+", 4, "*", 3, "+"])); // 15
*/
/*
// teacher
const calcInPolishNotation = (array) => {
  const stack = [];
  const operators = ["*", "/", "+", "-"];

  for (const value of array) {
    if (!operators.includes(value)) {
      stack.push(value);
      continue;
    }

    const b = stack.pop();
    const a = stack.pop();
    let result;

    switch (value) {
      case "*":
        result = a * b;
        break;
      case "/":
        result = b === 0 ? null : a / b;
        break;
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      default:
        break;
    }

    if (result === null) {
      return result;
    }

    stack.push(result);
  }

  return stack.pop();
};

console.log(calcInPolishNotation([1, 2, "+", 4, "*", 3, "+"])); // 15
*/

// Испытание: Сравнение версий  +1
/*
Реализуйте и экспортируйте по умолчанию функцию, которая сравнивает переданные версии version1 и version2. Если version1 > version2, то функция должна вернуть 1, если version1 < version2, то - -1, если же version1 === version2, то - 0.
Версия - это строка, в которой два числа (мажорная и минорные версии) разделены точкой, например: 12.11. Важно понимать, что версия - это не число с плавающей точкой, а несколько чисел не связанных между собой. Проверка на больше/меньше производится сравнением каждого числа независимо. Поэтому версия 0.12 больше версии 0.2.
Пример порядка версий:
0.1 < 1.1 < 1.2 < 1.11 < 13.37
Примеры
compareVersion('0.1', '0.2') // -1
compareVersion('0.2', '0.1') // 1
compareVersion('4.2', '4.2') // 0
*/
/*
// my
const compareVersion = (ver1, ver2) => {
  const arrVer1 = ver1.split(".");
  const arrVer2 = ver2.split(".");

  if (Number(arrVer1[0]) === Number(arrVer2[0])) {
    if (Number(arrVer1[1]) === Number(arrVer2[1])) return 0;
    else if (Number(arrVer1[1]) > Number(arrVer2[1])) return 1;
    else if (Number(arrVer1[1]) < Number(arrVer2[1])) return -1;
  } else if (Number(arrVer1[0]) > Number(arrVer2[0])) return 1;
  else if (Number(arrVer1[0]) < Number(arrVer2[0])) return -1;
};

console.log(compareVersion("0.2", "0.12")); // -1
*/
/*
// teacher
const compareVersion = (first, second) => {
  const [a1, b1] = first.split(".");
  const [a2, b2] = second.split(".");

  const major = Math.sign(a1 - a2);
  const minor = Math.sign(b1 - b2);

  return major === 0 ? minor : major;
};

console.log(compareVersion("1.2", "0.12")); // -1
*/

// Испытание: Чанкование -1
/*
Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход массив и число, которое задает размер чанка (куска). Функция должна вернуть массив, состоящий из чанков указанной размерности.

Примеры
chunk(['a', 'b', 'c', 'd'], 2)
// [['a', 'b'], ['c', 'd']]

chunk(['a', 'b', 'c', 'd'], 3)
// [['a', 'b', 'c'], ['d']]
*/

// my
/*
const chunk = (arr, num) => {
  const result = [];

  for (let i = 0; i < arr.length; i += num) {
    const pice = arr.slice(i, i + num);
    result.push(pice);
  }

  return result;
};

console.log(chunk(["a", "b", "c", "d"], 2)); // [['a']]
*/

// teacher
/*
export default (arr, size) => {
  const nArr = []
  for (let i = 0; i < arr.length; i += size) {
    nArr.push(arr.slice(i, i + size))
  }
  return nArr
}
*/

// Испытание: Треугольник Паскаля -1
/*
Треугольник Паскаля — бесконечная таблица биномиальных коэффициентов, имеющая треугольную форму. В этом треугольнике на вершине и по бокам стоят единицы. Каждое число равно сумме двух расположенных над ним чисел. Строки треугольника симметричны относительно вертикальной оси.

0:      1
1:     1 1
2:    1 2 1
3:   1 3 3 1
4:  1 4 6 4 1
solution.js
Напишите функцию generate, которая возвращает указанную строку треугольника паскаля в виде массива. Экспортируйте функцию по умолчанию.

Пример:
generate(1) // [1, 1]
generate(4) // [1, 4, 6, 4, 1]
*/

// my
/*
const generate = (n) => {
  let row = [1];
  for (let k = 1; k <= n; k++) {
    row.push((row[row.length - 1] * (n - k + 1)) / k);
  }
  return row;
};

console.log(generate(4)); // [1, 4, 6, 4, 1]
*/

// teacher
/*
// Определяем функцию для вычисления факториала
const factorial = (n) => {
  if (n === 0) {
    return 1
  }
  return n * factorial(n - 1)
}

const generate = (n) => {
  const numbersCount = n + 1
  const line = []
  for (let i = 0; i < numbersCount; i += 1) {
    // Для вычисления числа заданной строки используем формулу
    // расчёта биноминальных коэффициентов  С(n, k) = n! / (k! * (n - k)!)
    line[i] = factorial(n) / (factorial(i) * factorial(n - i))
  }
  return line
}
*/

// Alternative solutions
// ------
/*
const generate = (row) => {
  const line = [1];

  for (let i = 0; i < row; i += 1) {
    const element = Math.round(line[i] * ((row - i) / (i + 1)));
    line.push(element);
  }

  return line;
};

console.log(generate(4)); // [1, 4, 6, 4, 1]
*/

// -------
/*
const generateNextRow = (previousRow) => {
  // В nextRow будем добавлять числа очередной строки
  const nextRow = [];
  // Вычисляем все числа строки
  for (let i = 0; i <= previousRow.length; i += 1) {
    // Вычисляем каждое число как сумму двух расположенных над ним чисел из предыдущей строки
    const first = previousRow[i - 1] || 0;
    const second = previousRow[i] || 0;
    // Добавляем число в строку
    nextRow[i] = first + second;
  }

  return nextRow;
};

const generate = (rowNumber) => {
  // currentRow содержит текущую строку.
  // Начальное значение — вершина треугольника.

  let currentRow = [1];

  // Последовательно формируем строку за строкой.
  // Обработку начинаем со второй строки (счётчик начинается с единицы),
  // так как начальная строка нам уже известна.
  // Цикл закончит работу, когда дойдёт до нужной строки.

  for (let row = 1; row <= rowNumber; row += 1) {
    // Формирование следующей строки вынесем в отдельную функцию.
    // Обновляем текущую строку.
    // Теперь текущей становится только, что вычисленная строка.

    currentRow = generateNextRow(currentRow);
  }
  // После окончания работы цикла в currentRow окажется искомая строка.

  return currentRow;
};
console.log(generate(4)); // [1, 4, 6, 4, 1]
*/

// Испытание: Вращение матрицы -1
/*
Реализуйте и экспортируйте функции rotateLeft() и rotateRight(), которые поворачивают матрицу влево (против часовой стрелки) и соответственно вправо (по часовой стрелке).

Матрица реализована на массивах.
Функции должны возвращать новую матрицу не изменяя исходную.
Примеры:
const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 0, 1, 2],
]

rotateLeft(matrix)
// [
//   [4, 8, 2],
//   [3, 7, 1],
//   [2, 6, 0],
//   [1, 5, 9],
// ]

rotateRight(matrix)
// [
//   [9, 5, 1],
//   [0, 6, 2],
//   [1, 7, 3],
//   [2, 8, 4],
// ]
*/

// my
/*
const matrix = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 0, 1, 2],
  [3, 4, 5, 6, 7, 8],
  [9, 0, 1, 2, 3, 4],
];

const rotateLeft = (matrix) => {
  const row = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = cols - 1; j >= 0; j--) {
    const newRow = [];
    for (let i = 0; i < row; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }

  return result;
};

const rotateRight = (matrix) => {
  const row = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < row; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow.reverse());
  }

  return result;
};

console.log(rotateLeft(matrix));
console.log(rotateRight(matrix));
*/

// teacher
/*
const matrix = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 0, 1, 2],
  [3, 4, 5, 6, 7, 8],
  [9, 0, 1, 2, 3, 4],
];

const rotate = (matrix, direction) => {
  const rowsCount = matrix.length;
  const [firstRow] = matrix;
  const columnsCount = firstRow.length;
  const rotated = [];

  for (let row = 0; row < columnsCount; row += 1) {
    rotated[row] = [];
    for (let column = 0; column < rowsCount; column += 1) {
      rotated[row][column] =
        direction === "left"
          ? matrix[column][columnsCount - row - 1]
          : matrix[rowsCount - column - 1][row];
    }
  }

  return rotated;
};

const rotateLeft = (matrix) => rotate(matrix, "left");
const rotateRight = (matrix) => rotate(matrix, "right");

console.log(rotateLeft(matrix));
console.log(rotateRight(matrix));
*/

// Испытание: Улитка -1 -1
/*
Матрицу можно представить в виде двумерного списка. Например, список [[1, 2, 3], [4, 5, 6], [7, 8, 9]] — это отображение матрицы:

1 2 3 4 5 6 7 8 9
snail.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход матрицу и возвращает список элементов матрицы по порядку следования от левого верхнего элемента по часовой стрелке к внутреннему. Движение по матрице напоминает улитку:
Примеры:
buildSnailPath([
  [1, 2],
  [3, 4],
]) // [1, 2, 4, 3]

buildSnailPath([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]) // [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
*/

// my
/*
const buildSnailPath = (matrix) => {
  const result = [];
  if (!matrix.length || !matrix[0].length) return result;

  let top = 0,
    bottom = matrix.length - 1,
    left = 0,
    right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Вправо
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++;

    // Вниз
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;

    // Влево (только если остались строки)
    if (top <= bottom) {
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
      bottom--;
    }

    // Вверх (только если остались колонки)
    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }
  }

  return result;
};
*/
/*
const buildSnailPath = (matrix) => {
  const result = [];
  if (!matrix.length || !matrix[0].length) return result;

  let top = 0,
    bottom = matrix.length - 1,
    left = 0,
    right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Вправо
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++;
    // Вниз
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;
    // Вправо (если еще есть ряды)
    if (top <= bottom) {
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
      bottom--;
    }
    // Вверх (если еще есть колонки)
    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }
  }

  return result;
};
*/

// teacher
/*
import _ from 'lodash'
// BEGIN
// Поворачиваем матрицу против часовой стрелки
const rotate = matrix => _.reverse(_.zip(...matrix))

const buildSnailPath = (source) => {
  const result = []
  let matrix = _.cloneDeep(source)
  while (matrix.length > 0) {
    const [head, ...tail] = matrix
    result.push(head)
    matrix = rotate(tail)
  }
  return result.flat()
}

// Решение с рекурсией
// const buildSnailPath = (matrix) => {
//   if (matrix.length === 0) {
//     return [];
//   }
//   const [head, ...tail] = matrix;
//   return [head, buildSnailPath(rotate(tail))].flat();
// };

export default buildSnailPath
// END
*/
// 2
/*
// Поворачиваем матрицу против часовой стрелки
const rotateLeft = (matrix) => {
  const row = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = cols - 1; j >= 0; j--) {
    const newRow = [];
    for (let i = 0; i < row; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }

  return result;
};

// Решение с рекурсией
const buildSnailPath = (matrix) => {
  // Базовый случай: если матрица пуста или содержит пустой массив
  if (!matrix.length || !matrix[0].length) {
    return [];
  }

  const [head, ...tail] = matrix;

  // Если хвоста нет, просто возвращаем голову
  if (tail.length === 0) return head;

  return [...head, ...buildSnailPath(rotateLeft(tail))];
};

console.log(
  buildSnailPath([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ]),
); // [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
*/

// Испытание: Вес Хэмминга -1
/*
Вес Хэмминга — это количество единиц в двоичном представлении числа.
solution.js
Реализуйте и экспортируйте по умолчанию функцию, которая считает вес Хэмминга.
Примеры
hammingWeight(0) // 0
hammingWeight(4) // 1
hammingWeight(101) // 4
Подсказки
Метод toString() может помочь перевести число в двоичную систему
*/

// my
/*
const hammingWeight = (num) => {
  let countOne = 0;
  const numTwo = num.toString(2).split("");

  for (let item of numTwo) {
    if (item === "1") {
      countOne += 1;
    }
  }

  return countOne;
};

console.log(hammingWeight(101));
*/

// teacher
/*
const hammingWeight = (num) => {
  let weight = 0
  const digits = num.toString(2)

  for (let i = 0; i < digits.length; i += 1) {
    if (digits[i] === '1') {
      weight += 1
    }
  }

  return weight
}
*/

// Испытание: Длина последнего слова +1
/*
Реализуйте и экспортируйте по умолчанию функцию, которая возвращает длину последнего слова переданной на вход строки. Словом считается любая последовательность, не содержащая пробелов.

import getLastWordLength from './solution.js'

getLastWordLength('') // 0

getLastWordLength('man in BlacK') // 5

getLastWordLength('hello, world!  ') // 6
Подсказки
Убрать лишние пробелы поможет метод trim
*/
/*
// my
const getLastWordLength = (str) => {
  const arrStr = str.trim().split(" ");
  // const lastWord = arrStr.slice(arrStr.length - 1); // 1
  // const { length, [length - 1]: last } = arrStr; // 2
  const lastWord = arrStr.at(-1); // 3
  // return lastWord.join("").length; // 1
  // return last.length; // 2
  return lastWord.length; // 3
};
console.log(getLastWordLength("hello, world!  "));
// */
/*
const getLastWordLength = (str) => {
  const words = str.trim().split(" ");
  const lastWord = words.at(-1);
  return lastWord.length;
};
console.log(getLastWordLength("man in BlacK"));
// */

// my
// teacher
/*
// нужно найти начало корабля - это если есть 1 и пусто слева и сверху
const battleField = [
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 1, 0],
];
const calcShipsCount = (matrix) => {
  let shipsCount = 0;
  const fieldSize = matrix.length;

  for (let row = 0; row < fieldSize; row++) {
    for (let col = 0; col < fieldSize; col++) {
      if (matrix[row][col] && !matrix[row][col - 1]) {
        if (!matrix[row - 1] || !matrix[row - 1][col]) {
          shipsCount++;
        }
      }
    }
  }

  return shipsCount;
};

const isValidField = (matrix) => {
  const fieldSize = matrix.length;

  for (let col = 0; col < fieldSize; col++) {
    for (let row = 1; row < fieldSize; row++) {
      if (matrix[row][col]) {
        if (matrix[row - 1][col + 1] || matrix[row - 1][col - 1]) {
          return false;
        }
      }
    }
  }

  return true;
};

console.log(calcShipsCount(battleField));

console.log(isValidField(battleField));
*/

// Испытание: Самая длинная подстрока -1
/*
Реализуйте функцию getLongestLength(), принимающую на вход строку и возвращающую длину максимальной последовательности из неповторяющихся символов. Подстрока может состоять из одного символа. Например в строке qweqrty, можно выделить следующие подстроки: qwe, weqrty. Самой длинной будет weqrty.

Экспортируйте функцию по умолчанию.

Пример
getLongestLength('abcdeef') // 5
getLongestLength('jabjcdel') // 7
getLongestLength('') // 0
Подсказки
чтобы получить индекс элемента в массиве, используйте метод .indexOf()
*/

// my
/*
const getLongestLength = (str) => {
  let currentString = "";
  let maxLength = 0;

  for (const char of str) {
    const index = currentString.indexOf(char);

    console.log(currentString);

    if (index !== -1) {
      currentString = currentString.substring(index + 1);
    }

    currentString += char;
    maxLength = Math.max(maxLength, currentString.length);
  }

  return maxLength;
};
*/

// teacher
/*
const getLongestLength = (str) => {
  let sequence = [];
  let maxLength = 0;

  // Проходимся по всем символам переданной строки.
  for (const char of str) {
    // Ищем в сформированной последовательности
    // позицию первого вхождения текущего символа.
    const index = sequence.indexOf(char);
    // Добавляем в последовательность текущий символ.
    sequence.push(char);
    if (index !== -1) {
      // Если символ в последовательности был найден,
      // значит в неё был добавлен повторяющийся символ.
      // Отсекаем все символы включая найденный.
      sequence = sequence.slice(index + 1);
    }
    // Получаем длину последовательности.
    const sequenceLength = sequence.length;
    if (sequenceLength > maxLength) {
      // Если длина последовательности больше чем максимальная,
      // устанавливаем новую максимальную длину.
      maxLength = sequenceLength;
    }
  }

  return maxLength;
};
*/

// Испытание: Умножение матриц -1
/*
Операция умножения двух матриц А и В представляет собой вычисление результирующей матрицы С, где каждый элемент C(ij) равен сумме произведений элементов в соответствующей строке первой матрицы A(ik) и элементов в столбце второй матрицы B(kj).

// Краткая суть: идем по строке левой матрицы и одновременно по столбцу правой, перемножаем пары чисел и складываем результаты.

Две матрицы можно перемножать только в том случае, если количество столбцов в первой матрице совпадает с количеством строк во второй матрице. Это значит, что первая матрица обязательно должна быть согласованной со второй матрицей. В результате операции умножения матрицы размера M×N на матрицу размером N×K является матрица размером M×K.

matrix.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает две матрицы и возвращает новую матрицу — результат их произведения.

Примеры
import multiply from './matrix.js'

const matrixA = [[1, 2], [3, 2]]
const matrixB = [[3, 2], [1, 1]]

multiply(matrixA, matrixB)
// [[5, 4], [11, 8]]

const matrixC = [
  [2, 5],
  [6, 7],
  [1, 8],
]
const matrixD = [
  [1, 2, 1],
  [0, 1, 0],
]

multiply(matrixC, matrixD)
[
  [2, 9, 2],
  [6, 19, 6],
  [1, 10, 1],
]
Подсказки
Описание алгоритма перемножения матриц.
Демонстрация операции перемножения матриц.
*/

// my
/*
const matrixC = [
  [2, 5],
  [6, 7],
  [1, 8],
];
const matrixD = [
  [1, 2, 1],
  [0, 1, 0],
];
const multiply = (mat1, mat2) => {
  const result = [];
  // бежим по рядам mat1
  for (let i = 0; i < mat1.length; i++) {
    const row = [];
    // бежим по колонкам mat2
    for (let j = 0; j < mat2[0].length; j++) {
      let sum = 0;
      // скалярное произведение
      for (let k = 0; k < mat1[0].length; k++) {
        sum += mat1[i][k] * mat2[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }
  return result;
};
console.log(multiply(matrixC, matrixD));
/*
[
  [2, 9, 2],
  [6, 19, 6],
  [1, 10, 1],
];
*/

// teacher
/*
export default (matrixA, matrixB) => {
  const rowsCountA = matrixA.length
  const rowsCountB = matrixB.length
  const [firstRowB] = matrixB
  const columnsCountB = firstRowB.length
  const matrixC = []

  for (let row = 0; row < rowsCountA; row += 1) {
    matrixC[row] = []
    for (let column = 0; column < columnsCountB; column += 1) {
      let sum = 0
      for (let i = 0; i < rowsCountB; i += 1) {
        sum += matrixA[row][i] * matrixB[i][column]
      }
      matrixC[row][column] = sum
    }
  }

  return matrixC
}
*/

// Испытание: Возрастающая последовательность -1
/*
Реализуйте и экспортируйте по умолчанию функцию, которая проверяет, является ли переданная последовательность целых чисел возрастающей непрерывно (не имеющей пропусков чисел). Например, последовательность [4, 5, 6, 7] — непрерывная, а [0, 1, 3] — нет. Последовательность может начинаться с любого числа, главное условие — отсутствие пропусков чисел. Шаг последовательности равен 1. Последовательность из одного числа не может считаться возрастающей.

Примеры
isContinuousSequence([10, 11, 12, 13]) // true
isContinuousSequence([-5, -4, -3]) // true

isContinuousSequence([10, 11, 12, 14, 15]) // false
isContinuousSequence([1, 2, 2, 3]) // false
isContinuousSequence([7]) // false
isContinuousSequence([]) // false
*/

// my
/*
const isContinuousSequence = (arr) => {
  if (arr.length < 2) return false;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] !== arr[i] + 1) return false;
  }

  return true;
};
*/

// teacher
/*
const isContinuousSequence = (coll) => {
  const size = coll.length;
  if (size <= 1) {
    return false;
  }

  const start = coll[0];
  for (let index = 1; index < size; index += 1) {
    if (start + index !== coll[index]) {
      return false;
    }
  }

  return true;
};

console.log(isContinuousSequence([10, 11, 12, 13])); // true
*/

// Испытание: Список диапазонов -1
/*
Реализуйте и экспортируйте по умолчанию функцию, которая находит в массиве непрерывные возрастающие на единицу последовательности чисел и возвращает массив с их перечислением.

Примеры
summaryRanges([])
// []

summaryRanges([1])
// []

summaryRanges([1, 2, 3])
// ['1->3']

summaryRanges([0, 1, 2, 4, 5, 7])
// ['0->2', '4->5']

summaryRanges([110, 111, 112, 111, -5, -4, -2, -3, -4, -5])
// ['110->112', '-5->-4']
*/

// my
/*
const summaryRanges = (arr) => {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    let start = arr[i];
    let isSequence = false;

    while (i + 1 < arr.length && arr[i + 1] === arr[i] + 1) {
      i++;
      isSequence = true;
    }

    if (isSequence) {
      result.push(`${start}->${arr[i]}`);
    }
  }

  return result;
};

console.log(summaryRanges([110, 111, 112, 111, -5, -4, -2, -3, -4, -5]));
*/

// teacher
/*
const getRangeOfSequence = (sequence) => {
  const first = sequence[0];
  const last = sequence[sequence.length - 1];
  return `${first}->${last}`;
};

const summaryRanges = (numbers) => {
  const ranges = [];
  let sequence = [];

  for (let index = 0; index < numbers.length; index += 1) {
    const current = numbers[index];
    const next = numbers[index + 1];
    sequence.push(current);
    if (current + 1 !== next) {
      if (sequence.length > 1) {
        const range = getRangeOfSequence(sequence);
        ranges.push(range);
      }
      sequence = [];
    }
  }

  return ranges;
};

console.log(summaryRanges([110, 111, 112, 111, -5, -4, -2, -3, -4, -5]));
*/

// Испытание: Сумма интервалов -1
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив интервалов и возвращает сумму всех длин интервалов. В данной задаче используются только интервалы целых чисел от -100 до 100 , которые представлены в виде массива. Первое значение интервала всегда будет меньше, чем второе значение. Например, длина интервала [-100, 0] равна 100, а длина интервала [5, 5] равна 0. Пересекающиеся интервалы должны учитываться только один раз.

Примеры
sumIntervals([
  [5, 5],
]) // 0

sumIntervals([
  [-100, 0],
]) // 100

sumIntervals([
  [1, 2],
  [11, 12],
]) // 2

sumIntervals([
  [2, 7],
  [6, 6],
]) // 5

sumIntervals([
  [1, 9],
  [7, 12],
  [3, 4],
]) // 11

sumIntervals([
  [1, 5],
  [-30, 19],
  [1, 7],
  [16, 19],
  [5, 100],
]) // 130
*/
/*
// my
const sumIntervals = (matrix) => {
  // копия входного массива
  let items = [];
  for (let i = 0; i < matrix.length; i++) {
    items[i] = [matrix[i][0], matrix[i][1]];
  }

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      // кешируем гарницы интервалов для удобства расчетов
      let start1 = items[i][0];
      let end1 = items[i][1];
      let start2 = items[j][0];
      let end2 = items[j][1];
      // проверка на пересечение массивов
      if (start1 < end2 && start2 < end1) {
        // вычесляем новые границы
        let newStart = start1 < start2 ? start1 : start2;
        let newEnd = end1 > end2 ? end1 : end2;
        // обновляем текущий интервал
        items[i][0] = newStart;
        items[i][1] = newEnd;
        // удаляем поглощенный интервал из массива
        items.splice(j, 1);
        // проверяем еще раз
        j = i;
      }
    }
  }
  // считаем итоговую сумму длин
  let totalSum = 0;
  for (let k = 0; k < items.length; k++) {
    totalSum += items[k][1] - items[k][0];
  }

  return totalSum;
};

console.log(
  sumIntervals([
    [1, 9],
    [7, 12],
    [3, 4],
  ]),
);
*/

// solution my 2 the best--------------
/*
const sumIntervals = (intervals) => {
  const sorted = [...intervals].sort(([a], [b]) => a - b)

  const merge = sorted.reduce((acc, current) => {
    const last = acc[acc.length - 1]
    if (!last || current[0] > last[1]) {
      acc.push(current)
    } else {
      last[1] = Math.max(last[1], current[1])
    }
    return acc
  }, [])

  return merge.reduce((sum, [start, end]) => sum + (end - start), 0)
}
// */

/*
// teacher
const sumIntervals = (intervals) => {
  const values = [];
  for (const [start, end] of intervals) {
    for (let i = start; i < end; i += 1) {
      if (!values.includes(i)) {
        values.push(i);
      }
    }
  }
  return values.length;
};

console.log(
  sumIntervals([
    [1, 5],
    [-30, 19],
    [1, 7],
    [16, 19],
    [5, 100],
  ]),
);
*/
/*
// Испытание: Зеркалирование матрицы -1
Реализуйте и экспортируйте по умолчанию функцию, которая принимает двумерный массив (матрицу) и возвращает новый массив, основанный на переданном и измененный таким образом, что правая половина матрицы становится зеркальной копией левой половины, симметричной относительно вертикальной оси матрицы. Для простоты условимся, что матрица всегда имеет чётное количество столбцов и количество столбцов всегда равно количеству строк.

Примеры
getMirrorMatrix([
  [11, 12, 13, 14],
  [21, 22, 23, 24],
  [31, 32, 33, 34],
  [41, 42, 43, 44],
])

//  [
//     [11, 12, 12, 11],
//     [21, 22, 22, 21],
//     [31, 32, 32, 31],
//     [41, 42, 42, 41],
//  ]
Подсказки
Постарайтесь решить данное испытание без использования встроенных методов массива. Ограничение не касается метода push(), который добавляет элементы в массив.
*/
/*
// my
const getMirrorMatrix = (matrix) => {
  let mirror = [];

  for (let i = 0; i < matrix.length; i++) {
    let row = matrix[i];
    let newRow = [];
    let halfIdx = Math.floor(row.length / 2);

    for (let j = 0; j < halfIdx; j++) {
      newRow.push(row[j]);
    }

    for (let j = halfIdx - 1; j >= 0; j--) {
      newRow.push(row[j]);
    }

    mirror.push(newRow);
  }
  return mirror;
};

console.log(
  getMirrorMatrix([
    [11, 12, 13, 14],
    [21, 22, 23, 24],
    [31, 32, 33, 34],
    [41, 42, 43, 44],
  ]),
);
*/
/*
// teacher
const getMirrorArray = (array) => {
  const size = array.length;
  const mirrored = [];

  for (let i = 0; i < size / 2; i++) {
    mirrored[i] = array[i];
    mirrored[size - i - 1] = array[i];
  }

  return mirrored;
};

const getMirrorMatrix = (matrix) => {
  const mirrorMatrix = [];

  for (const row of matrix) {
    const mirrorRow = getMirrorArray(row);
    mirrorMatrix.push(mirrorRow);
  }

  return mirrorMatrix;
};

console.log(
  getMirrorMatrix([
    [11, 12, 13, 14],
    [21, 22, 23, 24],
    [31, 32, 33, 34],
    [41, 42, 43, 44],
  ]),
);
*/
