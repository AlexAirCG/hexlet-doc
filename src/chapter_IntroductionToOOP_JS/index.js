/*
const makeDegree = (x) => (n) => n ** x
const getSecondDegree = makeDegree(2)

console.log(getSecondDegree(3)) // => 9
console.log(makeDegree(2)(3))
// */

/*
const makeD = (x) => {
  const getS = (n) => {
    return n ** x
  }

  return getS
}
const sq = makeD(2)

console.log(sq(3))
// */

/*
const getSquare = (x) => x ** 2

const getSumOfCallback = (f) => (x) => f(x) + f(x)

const getSumOfSquares = getSumOfCallback(getSquare)

console.log(getSumOfSquares(3)) // ?
// */

/*
const company = { name: 'Hexlet' }

company.getName = function () {
  return company.name
}
company.name = 'Hexlet good'
console.log(company.getName())
// */

/*
const company = { name: 'Hexlet', employees: [] }
company.getName = function () {
  return this.name
}

company.setName = function setName(name) {
  this.name = name
}

company.addEmployee = function addEmployee(user) {
  this.employees.push(user)
}

const user = { name: 'Pety' }

company.addEmployee(user)
console.log(company.employees)

company.getEmployee = function () {
  return this.employees
}

console.log(company.getName())
company.setName('Hello')
console.log(company.getName())
console.log(company.getEmployee)
// */

/*
const company1 = {
  name: 'Hexlet',
  getName: function getName() {
    return this.name
  },
}

const company2 = { name: 'Hexlet Plus' }

company2.getName = company1.getName

console.log(company1.getName())
console.log(company2.getName())
// */

/*
const sayHi = () => 'Hi!'
console.log(sayHi.call()) // "Hi!"
// */

/*
const company = {
  name: 'Hexlet',
  country: {
    name: 'Finland',
    getName: function getName() {
      return this.name
    },
  },
}

console.log(company.country.getName())
// */

/*
const company = {
  name: 'Hexlet',
  getName() {
    return this.name
  },
}
const result = {}
result.getName = company.getName()
console.log(result)
// */

/*
const obj = { data: '123' }
const append = function (text) {
  return `${this.data}${text}`
}
obj.append = append
console.log(obj.append('45'))
// */

/*
const printer = {
  name: 'Hexlet',
  print(greeting = 'hello') {
    console.log(`${greeting}, ${this.name}`)
  },
}

// Прямой запуск
printer.print() // => "hello, Hexlet"
setTimeout(printer.print, 1000)
setTimeout(() => printer.print(), 2000)

const fn = () => printer.print()
fn()

const value = 'hi'
setTimeout(() => printer.print(value), 3000)
// */

/*
const printer = {
  name: 'Hexlet',
  print(greeting = 'hello') {
    console.log(`${greeting}, ${this.name}`)
  },
}

const boundPrint = printer.print.bind(printer)
boundPrint()
setTimeout(printer.print.bind(printer), 1000)
setTimeout(printer.print.bind(printer, 'hi'), 2000)
// */

/*
const printer = {
  name: 'Hexlet',
  print(greeting = 'hello') {
    console.log(`${greeting}, ${this.name}`)
  },
}

const print = printer.print
print.bind(printer)('hi')
print.apply(printer, ['hi'])
print.call(printer, 'hello')
// */

/*
const robot = {
  name: 'R25',
  sayHi() {
    return `Hello, my name is ${this.name}`
  },
}

const box = {
  name: 'box',
}
console.log(robot.sayHi.call(box))
// */

/*
const user = {
  name: 'Alex',
  sayHi() {
    console.log(`Hello, my name is ${this.name}`)
  },
}

const boundedSayHi = user.sayHi.bind(user)

setTimeout(boundedSayHi, 1000)
// */

/*
const sum = (a, b) => a + b
console.log(sum.bind(null, 8)(3))
// */

/*
const calculatePrice = (percent, fullPrace) => {
  return fullPrace - fullPrace * (percent / 100)
}

const vipDiscont = calculatePrice.bind(null, 15)
const summerSale = calculatePrice.bind(null, 50)

console.log(vipDiscont(1000))
console.log(summerSale(1000))
// */

/*
const numbers = [4, 10, 0, 2]
console.log(Math.min.call(null, ...numbers))
// */

/*
const calculatePrice = (percent, fullPrice) => {
  return fullPrice - fullPrice * (percent / 100)
}

const vipDiscont = calculatePrice.bind(null, 15)
const summerSale = calculatePrice.bind(null, 50)

console.log(vipDiscont(1000))
console.log(summerSale(1000))
// */

/*
const f1 = () => {
  // стрелочная функция
  console.log(this)
}

f1() // undefined

function f2() {
  // обычная функция
  console.log(this)
}

f2() // undefined

const obj = {
  f1,
  f2,
}
obj.f1()
obj.f2()
// */

/*
const user = {
  age: 45,
  getAge: () => {
    return this.age
  },
}

console.log(user.getAge())
// */

/*
const group = {
  names: ['Ivan'],
  newName: 'Andrey',
  changeNames() {
    return this.names.map(() => this.newName)
  },
}

console.log(group.changeNames())
// */

/*
const make = (name, website) => {
  return { name, website }
}

const getName = (company) => company.name
const getWebsite = (company) => company.website

const company = make('Hexlet', 'hexlet.ru')

console.log(getName(company))
console.log(getWebsite(company))
// */

/*
const make = (name, website) => {
  return {
    name,
    website,
    getName() {
      return this.name
    },
    getWebsite() {
      return this.website
    },
  }
}
const company = make('Alex', 'myday24.ru')
console.log(company.getName())
console.log(company.getWebsite())
// */

/*
function getName() {
  return this.name
}
function getWebsite() {
  return this.website
}

const make = (name, website) => {
  return {
    name,
    website,
    getName,
    getWebsite,
  }
}

const company = make('AlexAir', 'myday24.ru')

console.log(company.getName())
// */

/*
function getName() {
  return this.name
}
function getWebsite() {
  return this.website
}

function Company(name, website) {
  this.name = name
  this.website = website
  this.getName = getName
  this.getWebsite = getWebsite
}

const company = new Company('Alex', 'myday24.ru')

console.log(company.getName())
// */

/*
function getResult() {
  return this.result
}

function Exp(a, b = 2) {
  this.result = a ** b
  this.getResult = getResult
}

const exp = new Exp(2)

console.log(exp.getResult()) // 4
// */

/*
const number = [1, 3]
Array.prototype.last = function last() {
  return this[this.length - 1]
}
console.log(number)
// */

/*
String.toUpperCase = () => {}
console.log('hexlet'.toUpperCase())
// */

/*
const obj = {
  sayHello: () => console.log('hello!'),
}

obj.sayHello()
// */

/*
const lang = 'Haskell'
console.log(typeof lang) // 'string'
lang.toUpperCase()
console.log(typeof lang) // => ?
const newLang = lang.toUpperCase()
console.log(typeof newLang)
// */

/*
const iphone = {
  name: 'iPhone 17',
  price: 1000,
  toString() {
    return `${this.name} (${this.price.toLocaleString(undefined, { style: 'currency', currency: 'usd' })})`
  },
  valueOf() {
    return this.price
  },
}

const macbook = {
  name: 'MakBook 5',
  price: 5000,
  toString() {
    return `${this.name} (${this.price.toLocaleString(undefined, { style: 'currency', currency: 'usd' })})`
  },
  valueOf() {
    return this.price
  },
}

const total = `${iphone}\n${macbook}`

console.log(`Вы купили ${total}`)
// */

/*
function Company(name) {
  this.name = name
}

Company.prototype.toString = function toString() {
  return this.name
}

const company = new Company('Hexlet')
// JSON – это строка!
console.log(company)
console.log(JSON.stringify(company)) // => '{"name":"Hexlet"}'
// */

/*
class Company {
  constructor(name, email) {
    this.name = name
    this.email = email
  }

  getName() {
    return this.name
  }

  getEmail() {
    return this.email
  }

  setEmail(email) {
    this.email = email
  }
}
const company = new Company('Alex', 'myday24@.yandex.ru')
console.log(company.getEmail())
// */

/*
class User {
  constructor(name) {
    this.name = name
  }

  name() {
    return this.name
  }
}

const user = new User('Tirion')
console.log(user.name()) // => ?
// */

/*
class Money {
  static rates = {
    usd: {
      eur: 0.7,
    },
    eur: {
      usd: 1.2,
    },
  }

  static setRate(from, to, value) {
    this.rates[from][to] = value
  }

  constructor(value, currency = 'usd') {
    this.value = value
    this.currency = currency
  }

  exchangeTo(newCurrency) {
    if (this.currency === newCurrency) {
      return new Money(this.value, this.currency)
    }

    const newValue =
      this.value * this.constructor.rates[this.currency][newCurrency]
    return new Money(newValue, newCurrency)
  }

  getValue() {
    return this.value
  }
}

const money1 = new Money(100)
console.log(money1.getValue()) // => 100
// Не меняет сам money1
console.log(money1.exchangeTo('eur').getValue()) // 70
console.log(money1.getValue()) // => 100
// */

/* // Что будет напечатано на экран?
let result = ''
try {
  result += 'one'
} catch (e) {
  result += 'two'
}
result += ' three'
console.log(result)

// */
