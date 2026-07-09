/*
ПЛАН НАПИСАНИЯ ГИСТОГРАММЫ БРОСКОВ КУБИКА

Шаг 1: Настройка внешнего вида (Переменные)
- Определить, как визуально выглядит один кирпичик столбика (например, ###).
- Задать фиксированную ширину для одной колонки (длина кирпичика + 1 пробел для отступа).
- Сделать список всех возможных граней кубика (числа от 1 до 6).

Шаг 2: Сбор статистики бросков
- Создать список результатов: бросить кубик столько раз, сколько указано в настройках, и записать каждое выпавшее число.
- Посчитать, сколько раз выпала каждая грань. На выходе должен получиться набор пар: Грань -> Сколько раз выпала.

Шаг 3: Математика для графика
- Найти самую «удачливую» грань, которая выпала больше всего раз. Количество её выпадений — это максимальная высота нашего будущего графика.
- Перевести количество выпадений каждой грани в проценты от общего числа бросков и сохранить эти значения (они пригодятся для подписей над столбиками).

Шаг 4: Построчное рисование (Сверху вниз)
- Запустить главный цикл по высоте графика: начинаем с максимального количества выпадений и спускаемся вниз до нуля (этаж за этажом).
- Внутри каждого «этажа» по очереди проверить все 6 граней кубика:
  * Если грань набрала больше очков, чем текущий этаж — рисуем на этом месте тело столбика.
  * Если количество очков грани в точности равно текущему этажу — рисуем текст с процентами (так он окажется ровно над столбиком).
  * Во всех остальных случаях — просто оставляем пустое место (пробелы).
- Склеить кусочки всех шести граней в одну строку, стереть лишние пробелы в самом конце строки и отложить её в общую стопку.

Шаг 5: Оформление подвала и вывод
- Сделать горизонтальную черту-разделитель из минусов (длиной во весь график).
- Сделать строчку с подписями колонок (числа от 1 до 6), выровняв их ровно по центру будущих столбиков.
- Собрать все строки вместе (этажи, линию, подписи), разделив их переносом строки, и напечатать финальный результат.
// */

//*
// teacher solution
import _ from 'lodash'

const rollDie = () => Math.floor(Math.random() * 6) + 1

const displayHistogram = (roundsCount, rollDie) => {
  const bar = '###'
  const width = 4
  const sides = _.range(1, 7)

  const numbers = _.times(roundsCount, rollDie)
  // const numbers = Array.from({ length: roundsCount }, rollDie)
  // const numbers = []
  // for (let i = 0; i < roundsCount; i += 1) {
  //   numbers.push(rollDie(i))
  // }
  // console.log(numbers)

  const counts = _.countBy(numbers)
  // const counts = numbers.reduce((acc, num) => {
  //   acc[num] = (acc[num] || 0) + 1
  //   return acc
  // }, {})
  // const counts = {}
  // for (let num of numbers) {
  //   counts[num] = (counts[num] || 0) + 1
  // }
  // console.log(counts)

  const countsPairs = _.toPairs(counts)
  // const countsPairs = Object.entries(counts || {})
  // const countsPairs = []
  // for (let key in counts) {
  //   countsPairs.push([key, counts[key]])
  // }
  // console.log(countsPairs)

  const [, maxCount] = _.maxBy(countsPairs, ([, count]) => count)
  // const [, maxCount] = countsPairs.reduce((max, current) =>
  //   current[1] > max[1] ? current : max,
  // )
  // const COUNT_INDEX = 1
  // let maxPair = countsPairs[0]
  // for (const pair of countsPairs) {
  //   if (pair[COUNT_INDEX] > maxPair[COUNT_INDEX]) {
  //     maxPair = pair
  //   }
  // }
  // const maxCount = maxPair[COUNT_INDEX]
  // const maxCount = Math.max(...countsPairs.map(([, count]) => count))
  // console.log(maxCount)

  const percentsPairs = countsPairs.map(([side, count]) => {
    const percent = Math.round((count * 100) / roundsCount)
    return [side, percent]
  })
  // console.log(percentsPairs)

  const percents = _.fromPairs(percentsPairs)
  // const percents = {}
  // for (const [side, count] of percentsPairs) {
  //   percents[side] = count
  // }
  // console.log(percents)

  const lines = []

  for (let i = maxCount; i > -1; i -= 1) {
    const chunks = sides.map((side) => {
      let chunk
      const count = _.get(counts, side, 0)
      if (count > i) {
        chunk = bar.padEnd(width)
      } else if (count === i && count !== 0) {
        const percent = percents[side]
        chunk = `${percent}%`.padEnd(width)
      } else {
        chunk = ' '.repeat(width)
      }
      return chunk
    })

    const line = _.trimEnd(chunks.join(''))
    // const line = chunks.join('').replace(/\s+$/, '')
    // const combinedString = chunks.join('')
    // let endIndex = combinedString.length
    // while (endIndex > 0 && combinedString[endIndex - 1] === ' ') {
    //   endIndex -= 1
    // }
    // const line = combinedString.slice(0, endIndex)
    // console.log(line)
    lines.push(line)
  }

  lines.push('-'.repeat(width * sides.length).slice(0, -1))
  // console.log(lines)

  const linesWithSades = sides.map((side) => ` ${side} `.padEnd(width)).join('')
  // console.log(linesWithSades)
  lines.push(_.trimEnd(linesWithSades))

  const str = lines.join('\n')
  console.log(str)
}

export default displayHistogram
// */

//*
// test ----------------
displayHistogram(10, rollDie)
// */

/*
// План
1. Сбор статистики: Бросить кубик нужное количество раз и посчитать, сколько раз выпала каждая из сторон (от 1 до 6).
2. Расчет математики: Узнать, какая сторона выпадала чаще всего (это задаст максимальную высоту графика), и перевести количество выпадений в проценты.
3. Построчный вывод (Отрисовка): Нарисовать график в консоли сверху вниз — строчка за строчкой, проверяя для каждого кубика, что именно сейчас нужно напечатать: процент, решетку ### или просто пробел.
// */
