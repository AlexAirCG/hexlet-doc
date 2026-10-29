/* // вопросы
1 - Что делает resolve, а что reject, и почему повторный вызов игнорируется?
2 - Почему then возвращает новый промис, а не тот же самый?
3 - Что будет, если в then вернуть другой промис? (Как раз за это отвечает isThenable.)
4 - Что делает catch и почему он не должен трогать успешное значение?
// */

/* //
const errorMessage = 'Executor must be a function'
const defaultFulfilledHandler = (arg) => arg
const defaultRejectedHandler = (arg) => {
  throw arg
}

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
    if (this.PromiseState !== this.states.pending) {
      return
    }

    if (this.isThenable(result)) {
      result.then(this.resolve.bind(this), this.reject.bind(this))
      return
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

CustomPromise.resolve(5).catch(console.log).then(console.log)
// 5

CustomPromise.resolve(1)
  .then(() => CustomPromise.resolve('data'))
  .then(console.log)
// data

CustomPromise.reject('error')
  .catch((error) => 'recovered')
  .then(console.log)
// recovered
// */

/* // ответы
1 - resolve и reject меняют состояние, записывают результат и запускают реакции. Повторный вызов игнорируется из-за проверки pending.
2 - then возвращает новый промис, потому что результат обработчика нужно положить в новый промис: исходный уже завершён.
3 - Если обработчик вернул промис, новый промис ждёт его и принимает его значение или ошибку.
4 - catch обрабатывает отклонение, а успешное значение пропускает дальше без изменений.
// */
