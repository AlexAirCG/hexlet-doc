/* // my solution Испытание-10: ИСКЛЮЧЕНИЯ
import ParseError from './ParseError.js'


// */

/* // example
// комментировать при запуску тестов
const json = '{ "key": "value" }'
console.log(parseJson(json)) // { key: 'value' }

const incorrectJson = '{ key": "value" }'
console.log(parseJson(incorrectJson)) // => ParseError: Invalid JSON string

// ParseError.js
// export default class ParseError extends Error {
//   constructor(message) {
//     super(message)
//     this.name = 'ParseError'
//   }
// }

ПОДСКАЗКИ
- [JSON.parse()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
// */

/* // description 
JSON.JS
Реализуйте и экспортируйте функцию-обёртку parseJson() для функции JSON.parse(), которая работает как встроенная. Но в случае если в функцию была передана некорректная json строка, функция-обёртка должна выбросить исключение ParseError. Класс ParseError реализовывать не нужно, он уже импортирован.
// */
