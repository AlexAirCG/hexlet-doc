//* // Промисы: thenable и static
const errorMessage = 'Executor must be a function'
const defaultFulfilledHandler = (arg) => arg
const defaultRejectedHandler = (arg) => {
  throw arg
}
const STATES = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
}

export default class CustomPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError(errorMessage)
    }

    this.PromiseState = STATES.pending
    this.PromiseResult = null
    this.PromiseFulfillReactions = []
    this.PromiseRejectReactions = []

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }

  static resolve(value) {
    return new CustomPromise((resolve) => resolve(value))
  }

  static reject(value) {
    return new CustomPromise((_, reject) => reject(value))
  }

  isThenable(value) {
    return (
      value !== null &&
      (typeof value === 'object' || typeof value === 'function') &&
      typeof value.then === 'function'
    )
  }

  resolve(result) {
    if (this.PromiseState !== STATES.pending) {
      return
    }

    if (this.isThenable(result)) {
      result.then(this.resolve.bind(this), this.reject.bind(this))
      return
    }

    this.PromiseState = STATES.fulfilled
    this.PromiseResult = result
    this.PromiseFulfillReactions.forEach((onFulfilled) => {
      setTimeout(() => onFulfilled(result), 0)
    })
  }

  reject(error) {
    if (this.PromiseState !== STATES.pending) {
      return
    }

    this.PromiseState = STATES.rejected
    this.PromiseResult = error
    this.PromiseRejectReactions.forEach((onRejected) => {
      setTimeout(() => onRejected(error), 0)
    })
  }

  then(onFulfulled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      const onFulfilledHandler =
        typeof onFulfulled === 'function'
          ? onFulfulled
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

      if (this.PromiseState === STATES.fulfilled) {
        setTimeout(() => onFulfilledReaction(this.PromiseResult), 0)
        return
      }

      if (this.PromiseState === STATES.rejected) {
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

/* // example
const resolvedPromise = CustomPromise.resolve('Hello, world!')
resolvedPromise.then(console.log) // 'Hello, world!'

const rejectedPromise = CustomPromise.reject('Goodbye, world!')
rejectedPromise
  .then(console.log) // обработчик пропускается
  .catch(console.error) // 'Goodbye, world!'

// Thenable-объект
const thenable = { then: (onFulfill) => onFulfill('Hello, thenable!') }
CustomPromise.resolve(thenable).then(console.log) // 'Hello, thenable!'

// Методы экземпляра класса
const promise = new CustomPromise((resolve) => resolve('Hello, world!'))
promise
  .then((value) => {
    console.log(value) // 'Hello, world!'
    throw new Error('Goodbye, world!')
  })
  .catch((err) => console.error(err)) // 'Error: Goodbye, world!'
// */

/* // description
В данном испытании вы реализуете собственную версию объекта Promise.

Реализуйте в классе CustomPromise из файла CustomPromise.js конструктор, принимающий колбек executor(resolve, reject), методы then(onFulfill, onReject) и catch(onReject), и статические методы resolve(data) и reject(data). Добавьте в конструктор проверку типа параметра. Если конструктор получает не функцию, он выбрасывает TypeError с сообщением из подготовленной константы errorMessage. Обработчики по умолчанию тоже добавьте самостоятельно, чтобы все проверки остались внутри объекта. Вызов then() без аргументов передаёт значение дальше по цепочке, а catch() без аргумента передаёт дальше ошибку.

Алгоритм
Промис завершается один раз, поэтому вызовы resolve() и reject() после первого из них игнорируются. Обработчики из then() вызываются асинхронно, даже если промис уже завершён.

При разрешении промиса добавляется ещё одна проверка, на thenable. Так называют объект с собственным методом then(). Когда resolve() получает такой объект, промис вызывает его then() со своими resolve и reject и завершается тем, что тот передаст. Если then() объекта выбрасывает ошибку до вызова resolve, промис отклоняется этой ошибкой. Объект, у которого поле then не функция, считается обычным значением.

В решении должны отсутствовать встроенные Promise и ключевое слово async. Только таймеры и вызовы функций из функций.
// */
