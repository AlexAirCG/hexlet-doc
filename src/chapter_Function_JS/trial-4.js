/*
Реализуйте внутреннюю функцию takeLast(), которая возвращает последние n символов строки в обратном порядке. Количество символов передаётся в takeLast() вторым параметром. Если передаётся пустая строка или строка меньше необходимой длины, функция должна вернуть null.

Примеры
run('');       // null
run('cb');     // null
run('power');  // rewo
run('hexlet'); // telx
// */

const takeLast = (str, n = 4) => {
  if (str === '' || str.length < n) return null
  const cut = str.slice(str.length - n)
  return cut.split('').reverse().join('')
}

// teacher
// const run = (text) => {
//   const takeLast = (str, length) => {
//     if (str.length === 0 || str.length < length) {
//       return null
//     }

//     const result = []
//     for (let i = str.length - 1; result.length < length; i -= 1) {
//       result.push(str[i])
//     }
//     return result.join('')
//   }
//   return takeLast(text, 4)
// }

export default takeLast
