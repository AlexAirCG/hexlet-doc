const bind = (obj, fn) => {
  return (...arg) => {
    return fn.apply(obj, arg)
  }
}

// пример
// const obj1 = { number: 5 }
// const fn1 = function fn1(number) {
//   return number + this.number
// }
const obj1 = {
  number: 5,
  fn1(number) {
    return number + this.number
  },
}

const fnWithContext = bind(obj1, obj1.fn1)

// Принимает столько же аргументов сколько и исходная функция
console.log(fnWithContext(4)) // 8

/*
1. СОЗДАТЬ ФАБРИКУ ПРИВЯЗКИ: Объявить базовую функцию, которая принимает объект и целевую функцию.
2. ВЕРНУТЬ НОВУЮ ФУНКЦИЮ-ОБЕРТКУ: Сделать так, чтобы фабрика возвращала наружу другую функцию, готовую принять любые аргументы в будущем.
3. СКЛЕИТЬ КОНТЕКСТ И ЗАПУСТИТЬ ОРИГИНАЛ: Внутри обертки вызвать исходную функцию, принудительно подставив ей сохраненный объект вместо this и передав все полученные аргументы.
// */

export default bind
