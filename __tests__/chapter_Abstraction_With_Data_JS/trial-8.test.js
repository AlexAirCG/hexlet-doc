import {
  addProduct,
  removeProduct,
  getProductById,
  addToCart,
  placeOrder,
} from '../../src/chapter_Abstraction_With_Data_JS/trial-8.js'

describe('store', () => {
  let catalog, cart, orders

  beforeEach(() => {
    catalog = {
      1: { id: 1, name: 'молоко', price: 100 },
      2: { id: 2, name: 'сыр', price: 200 },
    }
    cart = []
    orders = {}
  })

  it('catalog', () => {
    const product = { id: 3, name: 'чипсы', price: 100 }
    const updatedCatalog = addProduct(catalog, product)
    expect(updatedCatalog[3]).toEqual(product)

    const updatedCatalog2 = removeProduct(catalog, 2)
    expect(updatedCatalog2[2]).toBeUndefined()

    const product2 = getProductById(catalog, 2)
    expect(product2).toEqual(catalog[2])
  })

  it('cart', () => {
    cart = addToCart(catalog, cart, 2, 2)
    cart = addToCart(catalog, cart, 1, 1)
    cart = addToCart(catalog, cart, 2, 1)
    expect(cart).toEqual([
      { id: 2, name: 'сыр', price: 200, quantity: 3 },
      { id: 1, name: 'молоко', price: 100, quantity: 1 },
    ])
  })

  it('order', () => {
    cart = addToCart(catalog, cart, 2, 2)
    cart = addToCart(catalog, cart, 1, 1)

    const { newCart, newOrders } = placeOrder(cart, orders)
    expect(newCart).toEqual([])

    expect(Object.keys(newOrders)).toHaveLength(1)

    const orderId = Object.keys(newOrders)[0]
    expect(newOrders[orderId]).toEqual({
      id: orderId,
      items: [
        {
          id: 2,
          name: 'сыр',
          price: 200,
          quantity: 2,
        },
        {
          id: 1,
          name: 'молоко',
          price: 100,
          quantity: 1,
        },
      ],
      totalAmount: 500,
    })
  })
})
