===============================================================
Испытание-1: ЧИСТЫЕ ФУНКЦИИ -1 | -1 |
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
Испытание: ОПЕРАТОР REST (упаковка аргументов) +1 | +1 |
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

===============================================================
Испытание-17: СТОЛБЧАТАЯ ДИАГРАММА
===============================================================
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
