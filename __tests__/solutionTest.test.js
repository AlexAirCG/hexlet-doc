// Испытание: Плохие и хорошие практики тестирования
/*
Напишите тесты для корзины интернет-магазина. Интерфейс:

makeCart() – создаёт новую пустую корзину.
addItem(products, count) – добавляет в корзину товары и их количество. Товар – это объект с двумя свойствами: name (имя) и price (стоимость). Считаем, что каждый новый товар уникален, поэтому всегда добавляется в корзину отдельным пунктом
getItems() – возвращает список товаров в формате [{ product, count }, { product, count }, ...]
getCost() – возвращает стоимость корзины. Стоимость корзины высчитывается как сумма всех добавленных товаров с учётом их количества.
getCount() – возвращает количество товаров в корзине.
const cart = makeCart();
cart.addItem({ name: 'car', price: 3 }, 5);
cart.addItem({ name: 'house', price: 10 }, 2);
cart.getItems().length; // 2
cart.getCost(); // 35
cart.getCount(); // 7
cart.addItem({ name: 'house', price: 10 }, 1);
cart.getItems().length; // 3
cart.getCost(); // 45
// */

// test
/*
import _ from 'lodash'

const implementations = {
  right1: _.set,
  wrong1: (obj, path, value) => {
    _.set(obj, path, value)
    obj.key = 'value'
    return obj
  },
  wrong2: (obj, path, value) => {
    obj[path] = value
    return obj
  },
  wrong3: (obj, path, value) => {
    if (_.get(obj, path) !== undefined) {
      _.set(obj, path, value)
    }
    return obj
  },
}

Object.entries(implementations).forEach(([name, set]) => {
  describe(`Проверка функции: ${name}`, () => {
    // solution my ----------------
    // const initState = { a: [{ b: { c: 3 } }] }
    // let obj
    // beforeEach(() => {
    //   obj = _.cloneDeep(initState)
    // })
    // test('set', () => {
    //   set(obj, 'a[0].b.c', 4)
    //   expect(obj.a[0].b.c).toBe(4)
    //   expect(obj).toEqual({ a: [{ b: { c: 4 } }] })
    //   set(obj, ['x', '0', 'y', 'z'], 5)
    //   expect(obj.x[0].y.z).toBe(5)
    //   set(obj, 'a[0].newProp', 'hello')
    //   expect(obj.a[0].newProp).toBe('hello')
    // })
    // solution teacher ----------------------
    let data
    let dataCopy

    beforeEach(() => {
      data = { a: [{ b: { c: 3 } }] }
      dataCopy = _.cloneDeep(data)
    })

    test('plain set', () => {
      set(data, 'a', 'value')
      dataCopy.a = 'value'
      expect(data).toEqual(dataCopy)
    })

    test('nested set', () => {
      set(data, 'a[0].b.c', true)
      dataCopy.a[0].b.c = true
      expect(data).toEqual(dataCopy)
    })

    test('set new property', () => {
      set(data, 'a[0].b.d', false)
      dataCopy.a[0].b.d = false
      expect(data).toEqual(dataCopy)
    })
  })
})
// */
