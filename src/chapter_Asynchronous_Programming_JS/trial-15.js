//* // Промисы: thenable и static
const errorMessage = 'Executor must be a function'

export default class CustomPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError(errorMessage)
    }
    this.state = 'pending'
    this.value = undefined
    this.handlers = [] // список функций которые ждут результата

    const resolve = (data) => {
      this.state = 'fulfilled'
      this.value = data
      this.handlers.forEach((handler) => handler.onFulfill(data))
    }

    const reject = (reason) => {
      this.state = 'rejected'
      this.value = reason
      this.handlers.forEach((hendler) => hendler.onReject(reason))
    }

    executor(resolve, reject)
  }

  then(onFulfill, onReject) {
    return new CustomPromise((resolve, reject) => {
      const handleFunfill = (data) => {
        if (typeof onFulfill === 'function') {
          resolve(onFulfill(data))
        } else {
          resolve(data)
        }
      }

      const handleReject = (reason) => {
        if (typeof onReject === 'function') {
          reject(onReject(reason))
        } else {
          reject(reason)
        }
      }

      if (this.state === 'pending') {
        this.handlers.push({ onFulfill: handleFunfill, onReject: handleReject })
      } else if (this.state === 'fulfilled') {
        handleFunfill(this.value)
      } else {
        handleReject(this.value)
      }
    })
  }

  catch(onReject) {
    return this.then(undefined, onReject)
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
