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
