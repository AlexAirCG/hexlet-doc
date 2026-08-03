/* // my solution Испытание-8: КЛАСС
import { sumBy } from 'es-toolkit'

// */

/* // example
const cart = new Cart()
cart.addItem({ name: 'car', price: 3 }, 5)
cart.addItem({ name: 'house', price: 10 }, 2)
console.log(cart.getItems()) // 2
console.log(cart.getCost())
console.log(cart.getCount())
// */

/* // description
Реализуйте и экспортируйте по умолчанию класс Cart, представляющий собой покупательскую корзину. Интерфейс:

getItems – возвращает товары в формате [{ item, count }, { item, count }, ...]
addItem(item, count) – добавляет в корзину товары и их количество. Товар это объект у которого два свойства: name – имя и price – стоимость.
getCost – возвращает стоимость корзины. Общая стоимость корзины высчитывается как стоимость всех добавленных товаров с учетом их количества.
getCount – возвращает количество товаров в корзине
// */
