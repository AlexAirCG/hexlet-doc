//* // Промисы: catch
const defaultOnFulfilledHandler = (arg) => arg
const defaultOnRejectedHandler = (arg) => {
  throw arg
}

class CustomPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('error')
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
          : defaultOnFulfilledHandler

      const onRejectedHandler =
        typeof onRejected === 'function' ? onRejected : defaultOnRejectedHandler

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
    return this.then(defaultOnFulfilledHandler, onRejected)
  }
}

export default CustomPromise
// */

/* // description
В данном испытании вы реализуете собственную версию объекта Promise.

Реализуйте в классе CustomPromise из файла CustomPromise.js конструктор, принимающий колбек executor(resolve, reject), методы then(onFulfill, onReject) и catch(onReject), и обеспечьте корректный перехват ошибок с передачей в соответствующие обработчики.

Алгоритм
Промис завершается один раз, поэтому вызовы resolve() и reject() после первого из них игнорируются. Обработчики из then() вызываются асинхронно, даже если промис уже завершён. Ошибка, выброшенная в обработчике then() или catch(), отклоняет промис, который вернул этот метод. Значение, возвращённое из catch(), выполняет этот промис. Отклонённый промис пропускает обработчики then() без onReject до ближайшего catch().

В решении должны отсутствовать встроенные Promise и ключевое слово async. Только таймеры и вызовы функций из функций.

Примеры использования

```js
import CustomPromise from './CustomPromise.js'

const resolvedPromise = new CustomPromise((resolve) => resolve('Hello, world!'))
resolvedPromise
  .then((value) => {
    console.log(value) // 'Hello, world!'
    throw new Error('Goodbye, world!')
  })
  .catch((err) => console.error(err)) // 'Error: Goodbye, world!'

const rejectedPromise = new CustomPromise((_, reject) =>
  reject('Hello, world!'),
)
const result = await rejectedPromise
  .catch((rejectMessage) => rejectMessage.split(' '))
  .then(([firstWord]) => firstWord + ' Pepe!')
console.log(result) // Hello, Pepe!
```

Подсказки
Задача опирается на возможности промисов, описанные в документации.

Если почувствуете, что нужны дополнительные материалы:

описание стандарта, который имплементируется в упражнении
курс "Синхронная асинхронность", чуть глубже погружающий в тему
курс "Автоматное программирование" о конечных автоматах, чем является промис
// */
