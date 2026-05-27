import { uniqueId } from 'es-toolkit/compat'

export const addProduct = (catalog, product) => {
  const newCatalog = {
    ...catalog,
    [product.id]: product,
  }
  return newCatalog
}

export const removeProduct = (catalog, productId) => {
  return Object.entries(catalog)
    .filter(([key]) => parseInt(key, 10) !== productId)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
}

export const getProductById = (catalog, id) => catalog[id]

export const addToCart = (catalog, cart, productId, quantity) => {
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
    throw new Error('Товара не найден')
  }

  return [...cart, { ...product, quantity }]
}

export const placeOrder = (cart, orders) => {
  if (cart.length === 0) {
    throw new Error('Корзина пуста')
  }

  const orderId = uniqueId('order_')
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const order = {
    id: orderId,
    items: [...cart],
    totalAmount,
  }

  const updateOrders = {
    ...orders,
    [orderId]: order,
  }

  return { newCart: [], newOrders: updateOrders }
}
