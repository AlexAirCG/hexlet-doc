/* // Испытание-7: ОСОБЫЙ ОБЪЕКТ


export default createObject
// */

/* // example
const obj = createObject({
  key: 'value',
  key2: {
    key3: 'value3',
  },
})

console.log(obj.key2) // { key3: 'value3' }

// код корректно продолжает работу:
console.log(obj.key2.key1) // {}
console.log(obj.key2.key1.key0) // {}
console.log(obj.obj.obj) // {}
// */

/* // description
Реализуйте и экспортируйте по умолчанию функцию, которая принимает объект и позволяет получать из него свойства по любому имени. При обращении к несуществующему свойству не должно выбрасываться исключений или возвращаться undefined. Функция должна возвращать объект Proxy.

Подсказки
Урок "Прокси" - https://ru.hexlet.io/courses/js-object-oriented-design/lessons/proxy/theory_unit
Документация по Proxy на MDN - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// */
