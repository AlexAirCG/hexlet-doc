/* // Промисы: состояние
const STATES = {
  pending: 'pending',
}



export default CustomPromise
// */

/* // description
В этом испытании вы познакомитесь с автоматным программированием.

Реализуйте в классе CustomPromise из файла CustomPromise.js метод then(callback) и вызов обработчиков на основе состояния объекта. Состояния запишите в объект STATES и используйте его вместо текстовых значений.

Алгоритм
Для решения данной задачи вам уже понадобится "подглядывать" в стандарт, чтобы разобраться с неймингом и общим алгоритмом. В нём указаны состояния, между которыми совершаются переходы, начальное состояние объекта и "реакции" (функции) на изменение состояния.

Чтобы не усложнять реализацию, достаточно одного состояния pending. Промис хранит его в поле экземпляра с момента создания и очищает при вызове resolve(). После этого слово pending не встречается ни в одном поле экземпляра. На изменение состояния должна происходить реакция, а если объект находится в начальном состоянии, то реакции должны накапливаться и вызываться после resolve().

В решении должны отсутствовать встроенные Promise и ключевое слово async. Только вызовы функций из функций.

Примеры использования

import CustomPromise from './CustomPromise.js'

const promise = new CustomPromise((resolve) => resolve('Hello, world!'))
promise.then((value) => {
  console.log(value) // 'Hello, world!'
})

const result = await promise
  .then((value) => value.replace('Hello', 'Goodbye'))
  .then((value) => value.toUpperCase())
console.log(result) // GOODBYE, WORLD!

const delayedPromise = new CustomPromise((resolve) => {
  setTimeout(() => resolve('Resolved'), 100)
})

const delayedResult = await delayedPromise.then(
  (message) => `Another ${message}`,
)
console.log(delayedResult) // Another Resolved


Подсказки
Задача опирается на возможности промисов, описанные в документации.

Если почувствуете, что нужны дополнительные материалы:

описание стандарта, который имплементируется в упражнении
курс "Синхронная асинхронность", чуть глубже погружающий в тему
курс "Автоматное программирование" о конечных автоматах, чем является промис
// */
