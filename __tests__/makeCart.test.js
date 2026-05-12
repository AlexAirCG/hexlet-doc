import right1 from '../src/makeCart/right1.js'
import wrong1 from '../src/makeCart/wrong1.js'
import wrong2 from '../src/makeCart/wrong2.js'
import wrong3 from '../src/makeCart/wrong3.js'

const implementator = { right1, wrong1, wrong2, wrong3 }

Object.entries(implementator).forEach(([name, makeCart]) => {
  // my test
  /*
    describe(`function ${name}`, () => {
    let cart

    beforeEach(() => {
      cart = makeCart()
    })

    test('empty array', () => {
      expect(cart.getItems()).toEqual([])
    })

    test('added item', () => {
      cart.addItem({ name: 'car', price: 3 }, 5)
      expect(cart.items).toEqual([
        { product: { name: 'car', price: 3 }, count: 5 },
      ])
    })

    test('get items', () => {
      cart.addItem({ name: 'house', price: 10 }, 2)
      cart.addItem({ name: 'car', price: 3 }, 5)
      expect(cart.getItems().length).toBe(2)
    })

    test('get count', () => {
      cart.addItem({ name: 'house', price: 10 }, 2)
      cart.addItem({ name: 'car', price: 3 }, 5)
      expect(cart.getCount()).toBe(7)
    })

    test('get cost', () => {
      cart.addItem({ name: 'house', price: 10 }, 2)
      cart.addItem({ name: 'car', price: 3 }, 5)
      expect(cart.getCost()).toBe(35)
    })

    test('added the same item', () => {
      cart.addItem({ name: 'house', price: 10 }, 1)
      cart.addItem({ name: 'house', price: 10 }, 2)
      expect(cart.getItems()).toHaveLength(1)
      expect(cart.getCost()).toBe(30)
    })
  })
  // */
  // teacher test
  test(`Cart ${name}`, () => {
    const cart = makeCart()
    expect(cart.getItems()).toHaveLength(0)

    const car = { name: 'car', price: 3 }
    cart.addItem(car, 5)
    expect(cart.getItems()).toEqual(
      expect.arrayContaining([{ product: car, count: 5 }]),
    )
    expect(cart.getCost()).toBe(15)
    expect(cart.getCount()).toBe(5)

    const house = { name: 'house', price: 10 }
    cart.addItem(house, 2)
    expect(cart.getItems()).toEqual(
      expect.arrayContaining([
        { product: car, count: 5 },
        { product: house, count: 2 },
      ]),
    )
    expect(cart.getCost()).toBe(35)
    expect(cart.getCount()).toBe(7)
  })
})
