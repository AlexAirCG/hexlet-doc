//* //
const STATES = {
  pending: 'pending',
  fulfilled: 'fullfilled',
}

export default class CustomPromise {
  constructor(executor) {
    this.PromiseState = STATES.pending
    this.PromiseResult = null
    this.PromiseFulfillReactions = []

    executor(this.resolve.bind(this))
  }

  resolve(result) {
    this.PromiseState = STATES.fulfilled
    this.PromiseResult = result
    this.PromiseFulfillReactions.forEach((onFulfilled) => onFulfilled(result))
  }

  then(onFulfilledHandler) {
    return new CustomPromise((resolve) => {
      const onFulfilledReaction = (result) => {
        resolve(onFulfilledHandler(result))
      }

      if (this.PromiseState === STATES.fulfilled) {
        onFulfilledReaction(this.PromiseResult)
      } else {
        this.PromiseFulfillReactions.push(onFulfilledReaction)
      }
    })
  }
}
// */

/* // description
В данном испытании необходимо создать только класс, без асинхронности, но с цепочкой вызовов. Для этого реализуйте в классе CustomPromise из файла CustomPromise.js конструктор, принимающий колбек executor(resolve), а также метод then(callback). Конструктор сразу вызывает executor и передаёт ему функцию resolve. Метод then(callback) возвращает новый CustomPromise, который выполняется значением, возвращённым callback, поэтому вызовы then() складываются в цепочку.

В решении должны отсутствовать встроенные Promise и ключевое слово async.

Примеры использования

```js
import CustomPromise from './CustomPromise.js'

const promise = new CustomPromise((resolve) => resolve('Hello, world!'))
promise.then((value) => {
  console.log(value) // 'Hello, world!'
})

const result = await promise
  .then((value) => value.replace('Hello', 'Goodbye'))
  .then((value) => value.toUpperCase())
console.log(result) // GOODBYE, WORLD!
```

Подсказки

- Вам понадобится вспомогательный метод, чтобы замыкать значения.
- Задача опирается на возможности промисов, описанные в документации.
- В решении учителя используется связывание через bind(), но в процессе решения можно упростить себе задачу, используя стрелочные функции.
// */
