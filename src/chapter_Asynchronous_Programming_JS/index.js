/* //
const data = [16, 64, 4]
const data2 = data.map(Math.sqrt) // [4, 8, 2]
const predicate = (v) => unknown > 2

try {
  const data3 = data2.filter(predicate) // ReferenceError
} catch (e) {
  console.log('Catch it')
  console.log(e.stack)
}
// */

/* //
const formatPrice = (price) => price.toFixed(2)
const buildReceipt = (price) => `Total: ${formatPrice(price)}`
const printReceipt = (price) => console.log(buildReceipt(price))

try {
  printReceipt(150)
  console.log('Printed')
} catch (error) {
  console.log('Failed')
  console.log(error.stack)
}
// */

/* //
import fs from 'fs'

const content = fs.readFileSync('./myfile', 'utf-8')
fs.writeFileSync('./myfile-copy', content)
// */

/* //
import fs from 'fs'
// пустая функция, чуть позже разберём её смысл,
// но асинхронная версия readFile требует передачи функции третьим параметром
const noop = () => {}
const content = fs.readFile('./myfile', 'utf-8', noop)
console.log(content)
// */

/* //
import fs from 'fs'

const callback = (_error, data) => console.log(data)
fs.readFile('./myfile', 'utf-8', callback)
// */

/* //
import fs from 'node:fs'

const callback = (_error, data) => console.log(data)
console.log('before read')
// вызов функции не дожидается конца чтения файла,
// код сразу продолжит выполняться дальше
fs.readFile('./myfile', 'utf-8', callback)
console.log('after read?')
// */

/* //
import fs from 'node:fs'

fs.readFile('./myfile', 'utf-8', (_error, data) => console.log('First!'))
fs.readFile('./myfile', 'utf-8', (_error, data) => console.log('Second!'))
// */

/* //
import fs from 'fs'

console.log('Reading started')

const callback = (_error, data) => console.log(data)

fs.readFile('./note.txt', 'utf-8', callback)

console.log('Reading requested')
// */

/* // 
import fs from "node:fs";

const result = fs.readFile("./myfile", "utf-8", () => {});
console.log(result);
// */
