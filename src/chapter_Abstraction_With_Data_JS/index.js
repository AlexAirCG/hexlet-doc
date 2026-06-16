/*
const makePoint = (x, y) => ({ x, y })

const getX = (point) => point.x
const getY = (point) => point.y

const point = makePoint(3, 4) // мы не знаем как устроена точка
console.log(getY(point))
// */

/*
const makePoint = (x, y) => {
  // конвертация
  return {
    angle: Math.atan2(y, x),
    radius: Math.sqrt(x ** 2 + y ** 2),
  }
}

const getAngle = (point) => point.angle
const getRadius = (point) => point.radius

const point = makePoint(3, 4)
console.log(getAngle(point), getRadius(point))
// */

/*
const user = { name: 'Alex', birthYear: 1979 }

const getAge = (person) => {
  const currentYear = new Date().getFullYear()
  return currentYear - person.birthYear
}

console.log(user.name, getAge(user))
// */

/*
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b))

const makeRational = (numer, denom) => {
  const commonDivisor = gcd(numer, denom)
  let normalizedNumer = numer / commonDivisor
  let normalizedDenom = denom / commonDivisor

  if (normalizedDenom < 0) {
    normalizedNumer = -normalizedNumer
    normalizedDenom = -normalizedDenom
  }

  return `${normalizedNumer}/${normalizedDenom}`
}

const getNumer = (rational) => rational.split('/')[0]
const getDenom = (rational) => rational.split('/')[1]

const num = makeRational(1, 2)
const numer = getNumer(num)
const denom = getDenom(num)
console.log(num)
console.log(numer)
console.log(denom)

const mul = (rational1, rational2) => {
  return makeRational(
    getNumer(rational1) * getNumer(rational2),
    getDenom(rational1) * getDenom(rational2),
  )
}

console.log(mul('1/2', '2/3'))

const sum = (rational1, rational2) => {
  const n1 = getNumer(rational1)
  const d1 = getDenom(rational1)
  const n2 = getNumer(rational2)
  const d2 = getDenom(rational2)

  const resultNumer = n1 * d2 + n2 * d1
  const resultDenom = d1 * d2

  return makeRational(resultNumer, resultDenom)
}

console.log(sum('1/2', '2/3'))

const f = (rational1, rational2) => {
  const rational3 = sum(rational1, rational2)
  const denom = getDenom(rational3)
  const numer = getNumer(rational3)
  console.log(`Numer: ${numer}`)
  console.log(`Denom: ${denom}`)
}

f('1/2', '2/3')

const num1 = makeRational(2, 4)
const num2 = makeRational(8, 16)

console.log(num1 === num2) // false
// */

/*
import { make, toString } from './trial-7.js'

const url = make('https://myday24.ru')
console.log(url)
console.log(toString(url))
const url1 = make('https://hexlet.io/community?q=low')
console.log(url1.pathname)
console.log(toString(url1))
// */

/*
import { uniqueId } from 'es-toolkit/compat'

const catalog = {
  1: { id: 1, name: 'молоко', price: 100 },
  2: { id: 2, name: 'сыр', price: 200 },
}

const addProduct = (catalog, product) => {
  const newCatalog = {
    ...catalog,
    [product.id]: product,
  }

  return newCatalog
}

const removeProduct = (catalog, productId) =>
  Object.entries(catalog)
    .filter(([key]) => parseInt(key, 10) !== productId)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

const getProductById = (catalog, id) => catalog[id]

const addToCart = (catalog, cart, productId, quantity) => {
  const existingCartIndex = cart.findIndex((item) => item.id === productId)

  if (existingCartIndex !== -1) {
    return [
      ...cart.slice(0, existingCartIndex),
      {
        ...cart[existingCartIndex],
        quantity: cart[existingCartIndex].quantity + quantity,
      },
      ...cart.slice(existingCartIndex + 1),
    ]
  }

  const product = getProductById(catalog, productId)

  if (!product) {
    throw new Error('Товар не найден')
  }

  return [...cart, { ...product, quantity }]
}

const placeOrder = (cart, orders) => {
  if (cart.letngth === 0) {
    throw new Error('Корзина пуста')
  }

  const orderId = uniqueId('order_')
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.prace * item.quantity,
  )

  const order = {
    id: orderId,
    items: [...cart],
    totalAmount,
  }

  const updatedOrders = {
    ...orders,
    [orderId]: order,
  }

  return { newCart: [], newOrders: updatedOrders }
}

const product = { id: 3, name: 'чипсы', price: 100 }
const updatedCatalog = addProduct(catalog, product)
const removeCatalog = removeProduct(updatedCatalog, 3)
console.log(updatedCatalog)
console.log(getProductById(updatedCatalog, 2))
console.log(removeCatalog)

let cart = []
cart = addToCart(catalog, cart, 2, 4)
cart = addToCart(catalog, cart, 1, 1)
// cart = addToCart(catalog, cart, 3, 1)
console.log(cart)

const orders = {}
const { newCart, newOrders } = placeOrder(cart, orders)
console.log(newCart) // [];
console.log(newOrders)
// */

/*
import { addProduct, removeProduct } from './trial-8.js'

const catalog = {
  1: { id: 1, name: 'молоко', price: 100 },
  2: { id: 2, name: 'сыр', price: 200 },
}

const product = { id: 3, name: 'чипсы', price: 100 }
const updatedCatalog = addProduct(catalog, product)
console.log(updatedCatalog)
const updateProduct = removeProduct(updatedCatalog, 3)
console.log(updateProduct)
// */
