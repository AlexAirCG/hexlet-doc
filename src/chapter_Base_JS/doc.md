## Испытание-1: Счастливый билет |+|

src/chapter_Base_JS/index.js
"Счастливым" называют билет с номером, в котором сумма первой половины цифр равна сумме второй половины цифр. Номера могут быть произвольной длины, с единственным условием, что количество цифр всегда чётно, например: 33 или 2341 и так далее.

Билет с номером 385916 — счастливый, так как 3 + 8 + 5 === 9 + 1 + 6. Билет с номером 231002 не является счастливым, так как 2 + 3 + 1 !== 0 + 0 + 2.

isHappyTicket.js
Реализуйте и экспортируйте по умолчанию функцию, проверяющую является ли номер счастливым (номер — всегда строка). Функция должна возвращать true, если билет счастливый, или false, если нет.

Примеры использования:

```js
isHappyTicket('385916') // true
isHappyTicket('231002') // false
isHappyTicket('1222') // false
isHappyTicket('054702') // true
isHappyTicket('00') // true
```

Подсказки
Чтобы узнать длину строки, используйте свойство length:

```js
'welcome'.length // 7
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
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

// teacher solution
// BEGIN
export default (num) => {
  let balance = 0

  for (let i = 0, j = num.length - 1; i < j; i += 1, j -= 1) {
    balance += parseInt(num[i]) - parseInt(num[j])
  }
  return balance === 0
}
// END
```

</details>

## Испытание-2: Инвертированный регистр |+|

src/chapter_Base_JS/index.js
invertCase.js
Реализуйте и экспортируйте по умолчанию функцию, которая меняет в строке регистр каждой буквы на противоположный. Функция должна возвращать полученный результат

Примеры:

```js
invertCase('Hello, World!') // hELLO, wORLD!
invertCase('I loVe JS') // i LOvE js
```

Подсказки
Чтобы узнать длину строки, используйте свойство length:

```js
'welcome'.length // 7
```

Чтобы получить строку (или отдельный символ) в верхнем регистре, используйте метод toUpperCase():

```js
'foo'.toUpperCase() // 'FOO';
'f'.toUpperCase() // 'F';
```

Чтобы получить строку (или отдельный символ) в нижнем регистре, используйте метод toLowerCase():

```js
'BAR'.toLowerCase() // 'bar';
'b'.toLowerCase() // 'b';
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const invertCase = (str) => {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i].toUpperCase()) {
      result = result + str[i].toLowerCase()
    } else if (str[i] === str[i].toLowerCase()) {
      result = result + str[i].toUpperCase()
    }
  }

  return result
}

console.log(invertCase('HeLLo'))

// teacher solution
const invertCase = (str) => {
  let result = ''
  for (let i = 0; i < str.length; i += 1) {
    const isUpper = str[i] === str[i].toUpperCase()
    result += isUpper ? str[i].toLowerCase() : str[i].toUpperCase()
  }

  return result
}

export default invertCase
```

</details>

## Испытание-3: Счастливые числа |+|

src/chapter_Base_JS/index.js
Назовем счастливыми числами те, которые в результате ряда преобразований вида "сумма квадратов цифр" превратятся в единицу. Например, для числа 7 цепочка преобразований будет выглядеть так:

```txt
7   => 7^2 = 49,
49  => 4^2 + 9^2 = 16 + 81 = 97,
97  => 9^2 + 7^2 = 81 + 49 = 130,
130 => 1^2 + 3^2 + 0^2 = 10,
10  => 1^2 + 0^2 = 1.
```

Вывод: исходное число 7 - счастливое.

isHappyNumber.js
Реализуйте и экспортируйте по умолчанию функцию, которая должна вернуть true, если число счастливое, и false, если нет. Количество итераций процесса поиска необходимо ограничить числом 10.

Подсказки
Воспользуйтесь вспомогательной функцией sumOfSquareDigits(), которая принимает на вход число и возвращает "сумму квадратов цифр" этого числа.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const sumOfSquareDigits = (num) => {
  const numAsStr = String(num)
  let sum = 0
  for (let i = 0; i < numAsStr.length; i += 1) {
    const digit = Number(numAsStr[i])
    sum += digit * digit
  }

  return sum
}

const isHappyNumber = (num) => {
  let current = num
  for (let i = 0; i <= 10; i++) {
    current = sumOfSquareDigits(current) // Обновляем число на каждой итерации
    if (current === 1) {
      return true
    }
  }
  return false // Если за 10 итераций не пришли к 1
}
console.log(isHappyNumber(13))

// teacher solution
// решение учителя такое же, как моё
```

</details>

## Испытание-4: Фибоначчи |-|

src/chapter_Base_JS/index.js
Реализуйте функцию fib() и экспортируйте её по умолчанию. Функция вычисляет положительные числа Фибоначчи. Аргументом является порядковый номер числа, нумерация чисел в последовательности начинается с нуля.

Формула:

```txt
f(0) = 0 f(1) = 1 f(n) = f(n-1) + f(n-2)
```

```js
fib(3) // 2
fib(5) // 5
fib(10) // 55
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution 1
const fib = (num) => {
  let a = 0
  let b = 1
  for (let i = 0; i < num; i++) {
    let temp = a
    a = b
    b = temp + b
  }
  return a
}
console.log(fib(10))

// my solution 2
const fib = (num) => {
  let [a, b] = [0, 1]

  for (let i = 0; i < num; i += 1) {
    ;[a, b] = [b, a + b]
  }

  return a
}

console.log(fib(10))

// teacher solution
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
```

</details>

## Испытание-5: Фасад |-|

src/chapter_Base_JS/index.js
Программист, который работал на проекте до вас, разбросал все функции, связанные с математическими вычислениями по разным файлам с именами numbers1.js, numbers2.js и numbers3.js. Причем имена функций тоже сделал странными: все функции в файле numbers2.js заканчиваются на двойку, например, sum2().

Вы быстро поняли, что это неудобно и нужно создать единый интерфейс для доступа к ним (говорят "фасад"). Для этого необходимо импортировать все функции из всех перечисленных модулей в новый модуль в файле math.js.

math.js
Задача состоит в том, чтобы файл math.js импортировал в себя все функции из трех описанных выше файлов и выставил их наружу (то есть сделал их реэкспорт) под следующими именами: pow, sum, sub, sqrt и multi. А так же экспортировал функцию cube() по умолчанию.

В этом задании специально не сказано, где какая функция и под каким именем лежит. А так же не сказано, как они все экспортируются. Вам нужно самостоятельно изучить. Цель этого задания в том, чтобы вы хорошо разобрались с системой модулей, что очень упростит вашу жизнь в дальнейшем. Огромная просьба не подсматривать решение и подумать самостоятельно, а в случае чего задать вопрос в комьюнити.

Не забудьте проанализировать файл с тестами, чтобы понять, как используется модуль math.js.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
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

// проверка
import { multi, pow, sum, sub, sqrt } from "./math";
import cube from "./math";
console.log(cube(3));
console.log(sum(1, 3));
console.log(sub(1, 3));
console.log(sqrt(4));
console.log(pow(4, 2));
console.log(multi(4, 2));

// teacher solution
import cube from './numbers1'
import multi, { pow2 as pow, sum2 as sum, sub2 as sub } from './numbers2'
import sqrt from './numbers3'

export {
  multi, pow, sum, sub, sqrt,
}
export default cube
```

</details>

## Испытание-6: Идеальные числа |-|

src/chapter_Base_JS/index.js
Создайте функцию isPerfect(), которая принимает число и возвращает true, если оно совершенное, и false — в ином случае.

Совершенное число — положительное целое число, равное сумме его положительных делителей (не считая само число). Делитель — это число, на которое делится исходное число. Например, у числа 6 три делителя: 1, 2 и 3. Число 6 делится на любое из этих чисел. Так же 6 — идеальное число, потому что 6 = 1 + 2 + 3.

```js
isPerfect(6) // true
isPerfect(7) // false
```

Примечания
Совершенное число (википедия)
Список совершенных чисел

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const isPerfect = (num) => {
  const isPerfect = (num) => {
    switch (num) {
      case 6:
        return true
      case 28:
        return true
      case 496:
        return true
      case 8128:
        return true
      default:
        return false
    }
  }
}

// teacher solution
const isPerfect = (num) => {
  if (num < 6) {
    return false
  }

  let sum = 0
  const upperBorder = num / 2

  for (let divisor = 1; divisor <= upperBorder; divisor += 1) {
    if (num % divisor === 0) {
      sum += divisor
    }
  }

  return sum === num
}
```

</details>

## Испытание-7: Переворот числа |-|

src/chapter_Base_JS/index.js
Реализуйте и экспортируйте по умолчанию функцию, которая переворачивает цифры в переданном числе и возвращает новое число.

Примеры:

```js
reverseInt(13) // 31
reverseInt(-123) // -321
reverseInt(8900) // 98
```

Подсказки
Длина строки str находится так: str.length
Вам может пригодиться функция Math.abs()
Как перевести число в строку в Javascript

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution 1 (with help AI)
const reverseInt = (num) => {
  const reversed = Math.abs(num).toString().split('').reverse().join('')
  return Math.sign(num) * parseInt(reversed)
}

// my solution 2
const reverseInt = (num) => {
  const numStr = String(Math.abs(num))
  let result = ''

  for (let i = 0; i < numStr.length; i++) {
    result = `${numStr[i]}${result}`
  }

  return num < 0 ? -result : Number(result)
}

// teacher solution
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
```

</details>

## Испытание-8: Найди Fizz и Buzz |+|-|

src/chapter_Base_JS/index.js
Реализуйте и экспортируйте по умолчанию функцию, которая выводит (console.log) в терминал числа в диапазоне от begin до end. При этом:

Если число делится без остатка на 3, то вместо него выводится слово Fizz
Если число делится без остатка на 5, то вместо него выводится слово Buzz
Если число делится без остатка и на 3, и на 5, то вместо числа выводится слово FizzBuzz
В остальных случаях выводится само число
Функция принимает два параметра (begin и end), определяющих начало и конец диапазона (включительно). Для простоты считаем, что эти параметры являются целыми числами больше нуля. Если диапазон пуст (в случае, когда begin > end), то функция просто ничего не печатает.

Вызов функции:

```js
fizzBuzz(11, 20)
```

Вывод в терминале:

```txt
11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz
```

Это задание крайне часто задают на собеседованиях.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const fizzBuzz = (begin, end) => {
  for (let i = begin; i <= end; i++) {
    const isFizz = i % 3 === 0
    const isBuzz = i % 5 === 0

    if (isFizz && isBuzz) console.log('FizzBuzz')
    else if (isFizz) console.log('Fizz')
    else if (isBuzz) console.log('Buzz')
    else console.log(i)
  }
}

fizzBuzz(11, 20)

// teacher solution
const fizzBuzz = (begin, end) => {
  for (let i = begin; i <= end; i++) {
    const isFizz = i % 3 === 0 ? 'Fizz' : ''
    const isBuzz = i % 5 === 0 ? 'Buzz' : ''
    console.log(`${isFizz}${isBuzz}` || i)
  }
}
fizzBuzz(11, 20)
```

</details>

## Испытание-9: Обратная польская запись |-|

src/chapter_Base_JS/index.js
В данном упражнении необходимо реализовать стековую машину, то есть алгоритм, проводящий вычисления по обратной польской записи.
Обратная польская нотация или постфиксная нотация — форма записи математических и логических выражений, в которой операнды расположены перед знаками операций. Выражение читается слева направо. Когда в выражении встречается знак операции, выполняется соответствующая операция над двумя ближайшими операндами, находящимися слева от знака операции. Результат операции заменяет в выражении последовательность её операндов и знак, после чего выражение вычисляется дальше по тому же правилу. Таким образом, результатом вычисления всего выражения становится результат последней вычисленной операции.
Например, выражение (1 + 2) _ 4 + 3 в постфиксной нотации будет выглядеть так: 1 2 + 4 _ 3 +, а результат вычисления: 15. Другой пример - выражение: 7 - 2 _ 3, в постфиксной нотации: 7 2 3 _ -, результат: 1.
solution.js
Экспортируйте по умолчанию функцию, которая принимает массив, каждый элемент которого содержит число или знак операции (+, -, \*, /). Функция должна вернуть результат вычисления по обратной польской записи. Если в какой-то момент происходит деление на ноль, функция должна вернуть значение null.

```js
calcInPolishNotation([1, 2, '+', 4, '*', 3, '+']) // 15
calcInPolishNotation([7, 2, 3, '*', '-']) // 1
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const calcInPolishNotation = (arr) => {
  const stack = []

  for (let item of arr) {
    if (item === '+' || item === '-' || item === '*' || item === '/') {
      const b = stack.pop()
      const a = stack.pop()

      if (item === '+') stack.push(a + b)
      else if (item === '-') stack.push(a - b)
      else if (item === '*') stack.push(a * b)
      else if (item === '/') {
        if (b === 0) return null
        stack.push(a / b)
      }
    } else {
      stack.push(Number(item))
    }
  }

  return stack[0]
}

console.log(calcInPolishNotation([1, 2, '+', 4, '*', 3, '+'])) // 15

// teacher solution
const calcInPolishNotation = (array) => {
  const stack = []
  const operators = ['*', '/', '+', '-']

  for (const value of array) {
    if (!operators.includes(value)) {
      stack.push(value)
      continue
    }

    const b = stack.pop()
    const a = stack.pop()
    let result

    switch (value) {
      case '*':
        result = a * b
        break
      case '/':
        result = b === 0 ? null : a / b
        break
      case '+':
        result = a + b
        break
      case '-':
        result = a - b
        break
      default:
        break
    }

    if (result === null) {
      return result
    }

    stack.push(result)
  }

  return stack.pop()
}

console.log(calcInPolishNotation([1, 2, '+', 4, '*', 3, '+'])) // 15
```

</details>

## Испытание-10: Сравнение версий |+|

src/chapter_Base_JS/index.js
Реализуйте и экспортируйте по умолчанию функцию, которая сравнивает переданные версии version1 и version2. Если version1 > version2, то функция должна вернуть 1, если version1 < version2, то - -1, если же version1 === version2, то - 0.
Версия - это строка, в которой два числа (мажорная и минорные версии) разделены точкой, например: 12.11. Важно понимать, что версия - это не число с плавающей точкой, а несколько чисел не связанных между собой. Проверка на больше/меньше производится сравнением каждого числа независимо. Поэтому версия 0.12 больше версии 0.2.
Пример порядка версий:

```txt
0.1 < 1.1 < 1.2 < 1.11 < 13.37
```

Примеры

```js
compareVersion('0.1', '0.2') // -1
compareVersion('0.2', '0.1') // 1
compareVersion('4.2', '4.2') // 0
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const compareVersion = (ver1, ver2) => {
  const arrVer1 = ver1.split('.')
  const arrVer2 = ver2.split('.')

  if (Number(arrVer1[0]) === Number(arrVer2[0])) {
    if (Number(arrVer1[1]) === Number(arrVer2[1])) return 0
    else if (Number(arrVer1[1]) > Number(arrVer2[1])) return 1
    else if (Number(arrVer1[1]) < Number(arrVer2[1])) return -1
  } else if (Number(arrVer1[0]) > Number(arrVer2[0])) return 1
  else if (Number(arrVer1[0]) < Number(arrVer2[0])) return -1
}

console.log(compareVersion('0.2', '0.12')) // -1

// teacher solution
const compareVersion = (first, second) => {
  const [a1, b1] = first.split('.')
  const [a2, b2] = second.split('.')

  const major = Math.sign(a1 - a2)
  const minor = Math.sign(b1 - b2)

  return major === 0 ? minor : major
}

console.log(compareVersion('1.2', '0.12')) // -1
```

</details>

## Испытание-11: Чанкование |-|

src/chapter_Base_JS/index.js
Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход массив и число, которое задает размер чанка (куска). Функция должна вернуть массив, состоящий из чанков указанной размерности.

Примеры

```js
chunk(['a', 'b', 'c', 'd'], 2)
// [['a', 'b'], ['c', 'd']]

chunk(['a', 'b', 'c', 'd'], 3)
// [['a', 'b', 'c'], ['d']]
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const chunk = (arr, num) => {
  const result = []

  for (let i = 0; i < arr.length; i += num) {
    const pice = arr.slice(i, i + num)
    result.push(pice)
  }

  return result
}

console.log(chunk(['a', 'b', 'c', 'd'], 2)) // [['a']]

// teacher solution
export default (arr, size) => {
  const nArr = []
  for (let i = 0; i < arr.length; i += size) {
    nArr.push(arr.slice(i, i + size))
  }
  return nArr
}
```

</details>

## Испытание-12: Треугольник Паскаля |-|

src/chapter_Base_JS/index.js
Треугольник Паскаля — бесконечная таблица биномиальных коэффициентов, имеющая треугольную форму. В этом треугольнике на вершине и по бокам стоят единицы. Каждое число равно сумме двух расположенных над ним чисел. Строки треугольника симметричны относительно вертикальной оси.

```txt
0:      1
1:     1 1
2:    1 2 1
3:   1 3 3 1
4:  1 4 6 4 1
```

solution.js
Напишите функцию generate, которая возвращает указанную строку треугольника паскаля в виде массива. Экспортируйте функцию по умолчанию.

Пример:

```js
generate(1) // [1, 1]
generate(4) // [1, 4, 6, 4, 1]
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const generate = (n) => {
  let row = [1]
  for (let k = 1; k <= n; k++) {
    row.push((row[row.length - 1] * (n - k + 1)) / k)
  }
  return row
}

console.log(generate(4)) // [1, 4, 6, 4, 1]

// teacher solution
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

// alternative solution 1
const generate = (row) => {
  const line = [1]

  for (let i = 0; i < row; i += 1) {
    const element = Math.round(line[i] * ((row - i) / (i + 1)))
    line.push(element)
  }

  return line
}

console.log(generate(4)) // [1, 4, 6, 4, 1]

// alternative solution 2
const generateNextRow = (previousRow) => {
  // В nextRow будем добавлять числа очередной строки
  const nextRow = []
  // Вычисляем все числа строки
  for (let i = 0; i <= previousRow.length; i += 1) {
    // Вычисляем каждое число как сумму двух расположенных над ним чисел из предыдущей строки
    const first = previousRow[i - 1] || 0
    const second = previousRow[i] || 0
    // Добавляем число в строку
    nextRow[i] = first + second
  }

  return nextRow
}

const generate = (rowNumber) => {
  // currentRow содержит текущую строку.
  // Начальное значение — вершина треугольника.

  let currentRow = [1]

  // Последовательно формируем строку за строкой.
  // Обработку начинаем со второй строки (счётчик начинается с единицы),
  // так как начальная строка нам уже известна.
  // Цикл закончит работу, когда дойдёт до нужной строки.

  for (let row = 1; row <= rowNumber; row += 1) {
    // Формирование следующей строки вынесем в отдельную функцию.
    // Обновляем текущую строку.
    // Теперь текущей становится только, что вычисленная строка.

    currentRow = generateNextRow(currentRow)
  }
  // После окончания работы цикла в currentRow окажется искомая строка.

  return currentRow
}
console.log(generate(4)) // [1, 4, 6, 4, 1]
```

</details>

## Испытание-13: Вращение матрицы |-|

src/chapter_Base_JS/index.js
Реализуйте и экспортируйте функции rotateLeft() и rotateRight(), которые поворачивают матрицу влево (против часовой стрелки) и соответственно вправо (по часовой стрелке).

Матрица реализована на массивах.
Функции должны возвращать новую матрицу не изменяя исходную.
Примеры:

```js
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
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const matrix = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 0, 1, 2],
  [3, 4, 5, 6, 7, 8],
  [9, 0, 1, 2, 3, 4],
]

const rotateLeft = (matrix) => {
  const row = matrix.length
  const cols = matrix[0].length
  const result = []

  for (let j = cols - 1; j >= 0; j--) {
    const newRow = []
    for (let i = 0; i < row; i++) {
      newRow.push(matrix[i][j])
    }
    result.push(newRow)
  }

  return result
}

const rotateRight = (matrix) => {
  const row = matrix.length
  const cols = matrix[0].length
  const result = []

  for (let j = 0; j < cols; j++) {
    const newRow = []
    for (let i = 0; i < row; i++) {
      newRow.push(matrix[i][j])
    }
    result.push(newRow.reverse())
  }

  return result
}

console.log(rotateLeft(matrix))
console.log(rotateRight(matrix))

// teacher solution
const matrix = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 0, 1, 2],
  [3, 4, 5, 6, 7, 8],
  [9, 0, 1, 2, 3, 4],
]

const rotate = (matrix, direction) => {
  const rowsCount = matrix.length
  const [firstRow] = matrix
  const columnsCount = firstRow.length
  const rotated = []

  for (let row = 0; row < columnsCount; row += 1) {
    rotated[row] = []
    for (let column = 0; column < rowsCount; column += 1) {
      rotated[row][column] =
        direction === 'left'
          ? matrix[column][columnsCount - row - 1]
          : matrix[rowsCount - column - 1][row]
    }
  }

  return rotated
}

const rotateLeft = (matrix) => rotate(matrix, 'left')
const rotateRight = (matrix) => rotate(matrix, 'right')

console.log(rotateLeft(matrix))
console.log(rotateRight(matrix))
```

</details>

## Испытание-14: Улитка |-|-|

src/chapter_Base_JS/index.js
Матрицу можно представить в виде двумерного списка. Например, список [[1, 2, 3], [4, 5, 6], [7, 8, 9]] — это отображение матрицы:

```txt
1 2 3 4 5 6 7 8 9
```

snail.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход матрицу и возвращает список элементов матрицы по порядку следования от левого верхнего элемента по часовой стрелке к внутреннему. Движение по матрице напоминает улитку:
Примеры:

```js
buildSnailPath([
  [1, 2],
  [3, 4],
]) // [1, 2, 4, 3]

buildSnailPath([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]) // [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution 1
const buildSnailPath = (matrix) => {
  const result = []
  if (!matrix.length || !matrix[0].length) return result

  let top = 0,
    bottom = matrix.length - 1,
    left = 0,
    right = matrix[0].length - 1

  while (top <= bottom && left <= right) {
    // Вправо
    for (let i = left; i <= right; i++) result.push(matrix[top][i])
    top++

    // Вниз
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right])
    right--

    // Влево (только если остались строки)
    if (top <= bottom) {
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i])
      bottom--
    }

    // Вверх (только если остались колонки)
    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left])
      left++
    }
  }

  return result
}

// my solution 2
const buildSnailPath = (matrix) => {
  const result = []
  if (!matrix.length || !matrix[0].length) return result

  let top = 0,
    bottom = matrix.length - 1,
    left = 0,
    right = matrix[0].length - 1

  while (top <= bottom && left <= right) {
    // Вправо
    for (let i = left; i <= right; i++) result.push(matrix[top][i])
    top++
    // Вниз
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right])
    right--
    // Вправо (если еще есть ряды)
    if (top <= bottom) {
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i])
      bottom--
    }
    // Вверх (если еще есть колонки)
    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left])
      left++
    }
  }

  return result
}

// teacher solution
import _ from 'lodash'
// BEGIN
// Поворачиваем матрицу против часовой стрелки
const rotate = (matrix) => _.reverse(_.zip(...matrix))

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

// solution 3 (с рекурсией)
// Поворачиваем матрицу против часовой стрелки
const rotateLeft = (matrix) => {
  const row = matrix.length
  const cols = matrix[0].length
  const result = []

  for (let j = cols - 1; j >= 0; j--) {
    const newRow = []
    for (let i = 0; i < row; i++) {
      newRow.push(matrix[i][j])
    }
    result.push(newRow)
  }

  return result
}

// Решение с рекурсией
const buildSnailPath = (matrix) => {
  // Базовый случай: если матрица пуста или содержит пустой массив
  if (!matrix.length || !matrix[0].length) {
    return []
  }

  const [head, ...tail] = matrix

  // Если хвоста нет, просто возвращаем голову
  if (tail.length === 0) return head

  return [...head, ...buildSnailPath(rotateLeft(tail))]
}

console.log(
  buildSnailPath([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ]),
) // [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
```

</details>

## Испытание-15: Вес Хэмминга |-|

src/chapter_Base_JS/index.js
Вес Хэмминга — это количество единиц в двоичном представлении числа.
solution.js
Реализуйте и экспортируйте по умолчанию функцию, которая считает вес Хэмминга.
Примеры

```js
hammingWeight(0) // 0
hammingWeight(4) // 1
hammingWeight(101) // 4
```

Подсказки
Метод toString() может помочь перевести число в двоичную систему

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const hammingWeight = (num) => {
  let countOne = 0
  const numTwo = num.toString(2).split('')

  for (let item of numTwo) {
    if (item === '1') {
      countOne += 1
    }
  }

  return countOne
}

console.log(hammingWeight(101))

// teacher solution
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
```

</details>

## Испытание-16: Длина последнего слова |+|

src/chapter_Base_JS/index.js
Реализуйте и экспортируйте по умолчанию функцию, которая возвращает длину последнего слова переданной на вход строки. Словом считается любая последовательность, не содержащая пробелов.

```js
import getLastWordLength from './solution.js'

getLastWordLength('') // 0

getLastWordLength('man in BlacK') // 5

getLastWordLength('hello, world!  ') // 6
```

Подсказки
Убрать лишние пробелы поможет метод trim

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution 1
const getLastWordLength = (str) => {
  const arrStr = str.trim().split(' ')
  // const lastWord = arrStr.slice(arrStr.length - 1); // 1
  // const { length, [length - 1]: last } = arrStr; // 2
  const lastWord = arrStr.at(-1) // 3
  // return lastWord.join("").length; // 1
  // return last.length; // 2
  return lastWord.length // 3
}
console.log(getLastWordLength('hello, world!  '))

// my solution 2
const getLastWordLength = (str) => {
  const words = str.trim().split(' ')
  const lastWord = words.at(-1)
  return lastWord.length
}
console.log(getLastWordLength('man in BlacK'))
```

</details>

## Испытание-17: Самая длинная подстрока |-|

src/chapter_Base_JS/index.js
Реализуйте функцию getLongestLength(), принимающую на вход строку и возвращающую длину максимальной последовательности из неповторяющихся символов. Подстрока может состоять из одного символа. Например в строке qweqrty, можно выделить следующие подстроки: qwe, weqrty. Самой длинной будет weqrty.

Экспортируйте функцию по умолчанию.

Пример

```js
getLongestLength('abcdeef') // 5
getLongestLength('jabjcdel') // 7
getLongestLength('') // 0
```

Подсказки
чтобы получить индекс элемента в массиве, используйте метод .indexOf()

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const getLongestLength = (str) => {
  let currentString = ''
  let maxLength = 0

  for (const char of str) {
    const index = currentString.indexOf(char)

    console.log(currentString)

    if (index !== -1) {
      currentString = currentString.substring(index + 1)
    }

    currentString += char
    maxLength = Math.max(maxLength, currentString.length)
  }

  return maxLength
}

// teacher solution
const getLongestLength = (str) => {
  let sequence = []
  let maxLength = 0

  // Проходимся по всем символам переданной строки.
  for (const char of str) {
    // Ищем в сформированной последовательности
    // позицию первого вхождения текущего символа.
    const index = sequence.indexOf(char)
    // Добавляем в последовательность текущий символ.
    sequence.push(char)
    if (index !== -1) {
      // Если символ в последовательности был найден,
      // значит в неё был добавлен повторяющийся символ.
      // Отсекаем все символы включая найденный.
      sequence = sequence.slice(index + 1)
    }
    // Получаем длину последовательности.
    const sequenceLength = sequence.length
    if (sequenceLength > maxLength) {
      // Если длина последовательности больше чем максимальная,
      // устанавливаем новую максимальную длину.
      maxLength = sequenceLength
    }
  }

  return maxLength
}
```

</details>

## Испытание-18: Умножение матриц |-|

src/chapter_Base_JS/index.js
Операция умножения двух матриц А и В представляет собой вычисление результирующей матрицы С, где каждый элемент C(ij) равен сумме произведений элементов в соответствующей строке первой матрицы A(ik) и элементов в столбце второй матрицы B(kj).

Краткая суть: идем по строке левой матрицы и одновременно по столбцу правой, перемножаем пары чисел и складываем результаты.

Две матрицы можно перемножать только в том случае, если количество столбцов в первой матрице совпадает с количеством строк во второй матрице. Это значит, что первая матрица обязательно должна быть согласованной со второй матрицей. В результате операции умножения матрицы размера M×N на матрицу размером N×K является матрица размером M×K.

matrix.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает две матрицы и возвращает новую матрицу — результат их произведения.

Примеры

```js
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
```

Подсказки
Описание алгоритма перемножения матриц.
Демонстрация операции перемножения матриц.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const matrixC = [
  [2, 5],
  [6, 7],
  [1, 8],
]
const matrixD = [
  [1, 2, 1],
  [0, 1, 0],
]
const multiply = (mat1, mat2) => {
  const result = []
  // бежим по рядам mat1
  for (let i = 0; i < mat1.length; i++) {
    const row = []
    // бежим по колонкам mat2
    for (let j = 0; j < mat2[0].length; j++) {
      let sum = 0
      // скалярное произведение
      for (let k = 0; k < mat1[0].length; k++) {
        sum += mat1[i][k] * mat2[k][j]
      }
      row.push(sum)
    }
    result.push(row)
  }
  return result
}
console.log(multiply(matrixC, matrixD))
// [
//   [2, 9, 2],
//   [6, 19, 6],
//   [1, 10, 1],
// ];

// teacher solution
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
```

</details>

## Испытание-19: Возрастающая последовательность |-|

src/chapter_Base_JS/index.js
Реализуйте и экспортируйте по умолчанию функцию, которая проверяет, является ли переданная последовательность целых чисел возрастающей непрерывно (не имеющей пропусков чисел). Например, последовательность [4, 5, 6, 7] — непрерывная, а [0, 1, 3] — нет. Последовательность может начинаться с любого числа, главное условие — отсутствие пропусков чисел. Шаг последовательности равен 1. Последовательность из одного числа не может считаться возрастающей.

Примеры

```js
isContinuousSequence([10, 11, 12, 13]) // true
isContinuousSequence([-5, -4, -3]) // true

isContinuousSequence([10, 11, 12, 14, 15]) // false
isContinuousSequence([1, 2, 2, 3]) // false
isContinuousSequence([7]) // false
isContinuousSequence([]) // false
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const isContinuousSequence = (arr) => {
  if (arr.length < 2) return false

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] !== arr[i] + 1) return false
  }

  return true
}

// teacher solution
const isContinuousSequence = (coll) => {
  const size = coll.length
  if (size <= 1) {
    return false
  }

  const start = coll[0]
  for (let index = 1; index < size; index += 1) {
    if (start + index !== coll[index]) {
      return false
    }
  }

  return true
}

console.log(isContinuousSequence([10, 11, 12, 13])) // true
```

</details>

## Испытание-20: Список диапазонов |-|

src/chapter_Base_JS/index.js
Реализуйте и экспортируйте по умолчанию функцию, которая находит в массиве непрерывные возрастающие на единицу последовательности чисел и возвращает массив с их перечислением.

Примеры

```js
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
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const summaryRanges = (arr) => {
  const result = []

  for (let i = 0; i < arr.length; i++) {
    let start = arr[i]
    let isSequence = false

    while (i + 1 < arr.length && arr[i + 1] === arr[i] + 1) {
      i++
      isSequence = true
    }

    if (isSequence) {
      result.push(`${start}->${arr[i]}`)
    }
  }

  return result
}

console.log(summaryRanges([110, 111, 112, 111, -5, -4, -2, -3, -4, -5]))

// teacher solution
const getRangeOfSequence = (sequence) => {
  const first = sequence[0]
  const last = sequence[sequence.length - 1]
  return `${first}->${last}`
}

const summaryRanges = (numbers) => {
  const ranges = []
  let sequence = []

  for (let index = 0; index < numbers.length; index += 1) {
    const current = numbers[index]
    const next = numbers[index + 1]
    sequence.push(current)
    if (current + 1 !== next) {
      if (sequence.length > 1) {
        const range = getRangeOfSequence(sequence)
        ranges.push(range)
      }
      sequence = []
    }
  }

  return ranges
}

console.log(summaryRanges([110, 111, 112, 111, -5, -4, -2, -3, -4, -5]))
```

</details>

## Испытание-21: Сумма интервалов |-|

src/chapter_Base_JS/index.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив интервалов и возвращает сумму всех длин интервалов. В данной задаче используются только интервалы целых чисел от -100 до 100 , которые представлены в виде массива. Первое значение интервала всегда будет меньше, чем второе значение. Например, длина интервала [-100, 0] равна 100, а длина интервала [5, 5] равна 0. Пересекающиеся интервалы должны учитываться только один раз.

Примеры

```js
sumIntervals([[5, 5]]) // 0

sumIntervals([[-100, 0]]) // 100

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
```

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution 1
const sumIntervals = (matrix) => {
  // копия входного массива
  let items = []
  for (let i = 0; i < matrix.length; i++) {
    items[i] = [matrix[i][0], matrix[i][1]]
  }

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      // кешируем гарницы интервалов для удобства расчетов
      let start1 = items[i][0]
      let end1 = items[i][1]
      let start2 = items[j][0]
      let end2 = items[j][1]
      // проверка на пересечение массивов
      if (start1 < end2 && start2 < end1) {
        // вычесляем новые границы
        let newStart = start1 < start2 ? start1 : start2
        let newEnd = end1 > end2 ? end1 : end2
        // обновляем текущий интервал
        items[i][0] = newStart
        items[i][1] = newEnd
        // удаляем поглощенный интервал из массива
        items.splice(j, 1)
        // проверяем еще раз
        j = i
      }
    }
  }
  // считаем итоговую сумму длин
  let totalSum = 0
  for (let k = 0; k < items.length; k++) {
    totalSum += items[k][1] - items[k][0]
  }

  return totalSum
}

console.log(
  sumIntervals([
    [1, 9],
    [7, 12],
    [3, 4],
  ]),
)

// my solution 2 (the best)
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

// teacher solution
const sumIntervals = (intervals) => {
  const values = []
  for (const [start, end] of intervals) {
    for (let i = start; i < end; i += 1) {
      if (!values.includes(i)) {
        values.push(i)
      }
    }
  }
  return values.length
}

console.log(
  sumIntervals([
    [1, 5],
    [-30, 19],
    [1, 7],
    [16, 19],
    [5, 100],
  ]),
)
```

</details>

## Испытание-22: Зеркалирование матрицы |-|

src/chapter_Base_JS/index.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает двумерный массив (матрицу) и возвращает новый массив, основанный на переданном и измененный таким образом, что правая половина матрицы становится зеркальной копией левой половины, симметричной относительно вертикальной оси матрицы. Для простоты условимся, что матрица всегда имеет чётное количество столбцов и количество столбцов всегда равно количеству строк.

Примеры

```js
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
```

Подсказки
Постарайтесь решить данное задание без использования встроенных методов массива. Ограничение не касается метода push(), который добавляет элементы в массив.

<details>
  <summary>Посмотреть решение</summary>

```js
// my solution
const getMirrorMatrix = (matrix) => {
  let mirror = []

  for (let i = 0; i < matrix.length; i++) {
    let row = matrix[i]
    let newRow = []
    let halfIdx = Math.floor(row.length / 2)

    for (let j = 0; j < halfIdx; j++) {
      newRow.push(row[j])
    }

    for (let j = halfIdx - 1; j >= 0; j--) {
      newRow.push(row[j])
    }

    mirror.push(newRow)
  }
  return mirror
}

console.log(
  getMirrorMatrix([
    [11, 12, 13, 14],
    [21, 22, 23, 24],
    [31, 32, 33, 34],
    [41, 42, 43, 44],
  ]),
)

// teacher solution
const getMirrorArray = (array) => {
  const size = array.length
  const mirrored = []

  for (let i = 0; i < size / 2; i++) {
    mirrored[i] = array[i]
    mirrored[size - i - 1] = array[i]
  }

  return mirrored
}

const getMirrorMatrix = (matrix) => {
  const mirrorMatrix = []

  for (const row of matrix) {
    const mirrorRow = getMirrorArray(row)
    mirrorMatrix.push(mirrorRow)
  }

  return mirrorMatrix
}

console.log(
  getMirrorMatrix([
    [11, 12, 13, 14],
    [21, 22, 23, 24],
    [31, 32, 33, 34],
    [41, 42, 43, 44],
  ]),
)
```

</details>
