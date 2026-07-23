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

//* // ТЕОРИЯ: ПРОКСИ
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
