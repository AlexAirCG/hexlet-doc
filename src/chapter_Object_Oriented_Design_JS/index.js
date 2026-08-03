/* //
class Collection {
  constructor(coll) {
    this.coll = coll
  }

  map(fn) {
    const newColl = this.coll.map((el) => fn(el))
    return new Collection(newColl)
  }

  filter(fn) {
    const newColl = this.coll.filter((el) => fn(el))
    return new Collection(newColl)
  }

  all() {
    return this.coll
  }
}

const cars = new Collection([
  { model: 'rapid', year: 2016 },
  { model: 'rio', year: 2013 },
  { model: 'mondeo', year: 2011 },
  { model: 'octavia', year: 2014 },
])

const filteredCars = cars
  .filter((car) => car.year > 2011)
  .map((car) => car.model)
  .all()

console.log(filteredCars)
console.log(cars.all())
// */

/* // ТЕОРИЯ: СБОРЩИКИ
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(() => new Date()),
})

const data = {
  name: 'Alex',
  age: 24,
}

console.log(schema.validateSync(data))
// */

/* // ТЕОРИЯ: ПРОКСИ
// Количество пользователей в разных странах
const usersCountByCountry = {}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop]
    }
    return 0
  },
}

const obj = new Proxy(usersCountByCountry, handler)

console.log(obj)
console.log((obj.russia += 1))
console.log(obj)
// */

// ТЕОРИЯ: ПИШЕМ КОД ПРАВИЛЬНО
/* // example 1
// Возвращает день недели через указанное количество дней от заданной даты
// @param {string} dateString - Дата в формате "YYYY-MM-DD"
// @param {number} daysToAdd - Количество добавляемых дней
// @returns {string} Название дня недели на английском

function getFutureDayOfWeek(dateString, daysToAdd) {
  const date = new Date(dateString)
  date.setDate(date.getDate() + daysToAdd)
  const option = { weekday: 'long' }
  return date.toLocaleDateString('en-US', option)
}

const date = '2026-07-23'
const result = getFutureDayOfWeek(date, 10)

console.log(result) // Выведет: Sunday
// */

/* // example2
const isWeekend = (dataString) => {
  const data = new Date(dataString)
  const day = data.getDay()

  return day === 0 || day === 6
}

console.log(isWeekend('2026-07-26')) // Выведет: true (воскресенье)
console.log(isWeekend('2026-07-23')) // Выведет: false (четверг)
// */

/* // example3
const getSumPrice = (arr) => arr.reduce((acc, price) => acc + price, 0)

const priceCart = [100, 200, 500]
const total = getSumPrice(priceCart)
console.log(total)
// */

// ОСОБЫЙ ОБЪЕКТ
/* // 1
const obj = {
  key: 'value',
  key2: {
    key3: 'value3',
  },
}

console.log(obj.key2) // { key3: 'value3' }
console.log(obj.key2.key1) // undefined
console.log(obj.key2.key1.key0) // Uncaught TypeError: Cannot read property 'key0' of undefined
// */

/* //
import { eachDayOfInterval, format } from 'date-fns'

const result = eachDayOfInterval({
  start: new Date(2026, 6, 20), // 20 июля 2026
  end: new Date(2026, 6, 24), // 24 июля 2026
})

const formatted = result.map((day) => format(day, 'yyyy-MM-dd'))

console.log(formatted)
// */
