/* // Испытание-8: ПЬЯНИЦА
import cloneDeep from 'es-toolkit/compat/cloneDeep'


// */

/* // example
const generateCards = (length) =>
  Array.from({ length }, () => Math.floor(Math.random() * 9) + 1)

const cards1 = generateCards(5)
console.log(cards1)
const cards2 = generateCards(5)
console.log(cards2)

const game = new Drunkard()

console.log(game.run(cards1, cards2))

// */

/* // description
Реализуйте и экспортируйте по умолчанию класс с методом run(), принимающим на вход два списка чисел, которые представляют собой карты для первого и второго игроков.

- Если выиграл первый игрок, то метод должен вернуть First player. Round: <номер раунда>.
- Если выиграл второй игрок, то метод должен вернуть Second player. Round: <номер раунда>.
- Если у игроков не осталось карт, то метод должен вернуть Botva!
- Если за 100 раундов не удалось выявить победителя то также возвращается Botva!
// */
