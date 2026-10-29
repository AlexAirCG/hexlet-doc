//* // Промисы: reject
const errorMessage = 'must be Function'
const defaultFulfilledHandler = (arg) => arg
const defaultRejectedHandler = (arg) => arg

export default class CustomPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError(errorMessage)
    }

    this.states = {
      pending: 'pending',
      fulfilled: 'fulfilled',
      rejected: 'rejected',
    }

    this.PromiseState = this.states.pending
    this.PromiseResult = null
    this.PromiseFulfillReactions = []
    this.PromiseRejectReactions = []

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }

  isThenable(value) {
    return (
      value && Object.hasOwn(value, 'then') && typeof value.then === 'function'
    )
  }

  resolve(result) {
    if (this.PromiseState !== this.states.pending) {
      return
    }

    if (this.isThenable(result)) {
      return result.then(this.resolve.bind(this), this.reject.bind(this))
    }

    this.PromiseState = this.states.fulfilled
    this.PromiseResult = result
    this.PromiseFulfillReactions.forEach((onFulfilled) => {
      setTimeout(() => onFulfilled(result), 0)
    })
  }

  reject(error) {
    if (this.PromiseState !== this.states.pending) {
      return
    }

    this.PromiseState = this.states.rejected
    this.PromiseResult = error
    this.PromiseRejectReactions.forEach((onRejected) => {
      setTimeout(() => onRejected(error), 0)
    })
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      const onFulfilledHandler =
        typeof onFulfilled === 'function'
          ? onFulfilled
          : defaultFulfilledHandler

      const onRejectedHandler =
        typeof onRejected === 'function' ? onRejected : defaultRejectedHandler

      const onFulfilledReaction = (result) => {
        try {
          resolve(onFulfilledHandler(result))
        } catch (e) {
          reject(e)
        }
      }

      const onRejectedReaction = (error) => {
        try {
          resolve(onRejectedHandler(error))
        } catch (e) {
          reject(e)
        }
      }

      if (this.PromiseState === this.states.fulfilled) {
        setTimeout(() => onFulfilledReaction(this.PromiseResult), 0)
        return
      }

      if (this.PromiseState === this.states.rejected) {
        setTimeout(() => onRejectedReaction(this.PromiseResult), 0)
        return
      }

      this.PromiseFulfillReactions.push(onFulfilledReaction)
      this.PromiseRejectReactions.push(onRejectedReaction)
    })
  }

  catch(onRejected) {
    return this.then(defaultFulfilledHandler, onRejected)
  }
}
// */

/* // description
В данном испытании вы реализуете собственную версию объекта Promise.

Реализуйте в классе CustomPromise из файла CustomPromise.js конструктор, принимающий колбек executor(resolve, reject) и метод then(onFulfill, onReject). Промис завершается один раз, поэтому вызовы resolve() и reject() после первого из них игнорируются. Обработчики из then() вызываются асинхронно, даже если промис уже завершён.

Алгоритм
Чтобы запускать реакции, накопленные по соответствующему состоянию промиса, сам объект с состояниями можно реализовать внутри конструктора.

В решении должны отсутствовать встроенные Promise и ключевое слово async. Только таймеры и вызовы функций из функций.

Метод catch() в этом испытании реализовывать не нужно, пусть всё попадает в then(). Если у then() нет обработчика onReject, новый промис выполняется тем значением, с которым был отклонён исходный, и следующий then() получает его как обычное значение.

Примеры использования

```js
import CustomPromise from './CustomPromise.js'

const promise = new CustomPromise((resolve, reject) => reject('Hello, world!'))
promise.then((value) => {
  console.log(value) // Данный обработчик будет пропущен
})

// Обработчик onReject не передан, поэтому значение из reject проходит дальше без изменений
const result = await promise.then((x) => x.toUpperCase())
console.log(result) // 'Hello, world!'
```

Подсказки
Задача опирается на возможности промисов, описанные в документации.

Если почувствуете, что нужны дополнительные материалы:

курс "Синхронная асинхронность", чуть глубже погружающий в тему
курс "Автоматное программирование" о конечных автоматах, чем является промис
// */
