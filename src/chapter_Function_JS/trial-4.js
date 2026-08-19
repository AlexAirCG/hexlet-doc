//* // ОБЪЕКТЫ ПЕРВОГО КЛАССА
const run = (text) => {
  const takeLast = (str, num) => {
    return str.length < num
      ? null
      : str.slice(-num).split('').reverse().join('')
  }

  return takeLast(text, 4)
}

export default run
// */

//* // example
run('') // null
run('cb') // null
run('power') // rewo
run('hexlet') // telx
// */

/* // description
Реализуйте внутреннюю функцию takeLast(), которая возвращает последние n символов строки в обратном порядке. Количество символов передаётся в takeLast() вторым параметром. Если передаётся пустая строка или строка меньше необходимой длины, функция должна вернуть null.
// */
