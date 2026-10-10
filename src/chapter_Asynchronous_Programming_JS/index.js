/* //
class CusPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('must be function')
    }

    this.state = 'pending'
    this.value = undefined
    this.handlers = []

    const resolve = (data) => {
      this.state = 'fulfilled'
      this.value = data
      this.handlers.forEach((handler) => handler.onFulfill(data))
    }

    const reject = (reason) => {
      this.state = 'rejected'
      this.value = reason
      this.handlers.forEach((handler) => handler.onReject(reason))
    }

    executor(resolve, reject)
  }

  then(onFulfill, onReject) {
    return new CusPromise((resolve, reject) => {
      const handleFulfill = (value) => {
        resolve(onFulfill(value))
      }

      const handleReject = (reason) => {
        reject(onReject(reason))
      }

      if (this.state === 'pending') {
        this.handlers.push({ onFulfill: handleFulfill, onReject: handleReject })
      } else if (this.state === 'fulfilled') {
        handleFulfill(this.value)
      } else {
        handleReject(this.value)
      }
    })
  }
}

let saveResolve

const p = new CusPromise((resolve) => {
  saveResolve = resolve
})

p.then((value) => {
  console.log('1 -', value)
  return value + 1
})
  .then((value) => {
    console.log('2 -', value)
    return value + 1
  })
  .then((value) => {
    console.log('3 -', value)
    return value + 1
  })

saveResolve(100)
// */

/* //
class CusPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('must be function')
    }

    this.state = 'pending'
    this.value = undefined
    this.handlers = []

    const resolve = (data) => {
      this.state = 'fulfilled'
      this.value = data
      this.handlers.forEach((handler) => handler.onFulfill(data))
    }

    const reject = (reason) => {
      this.state = 'rejected'
      this.value = reason
      this.handlers.forEach((handler) => handler.onReject(reason))
    }

    executor(resolve, reject)
  }

  then(onFulfill, onReject) {
    return new CusPromise((resolve, reject) => {
      const handleFulfill = (data) => {
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
        this.handlers.push({ onFulfill: handleFulfill, onReject: handleReject })
      } else if (this.state === 'fulfilled') {
        handleFulfill(this.value)
      } else {
        handleReject(this.value)
      }
    })
  }

  catch(onReject) {
    return this.then(undefined, onReject)
  }
}

let saveReject

const p = new CusPromise((resolve, reject) => {
  saveReject = reject
})

p.then((value) => console.log('успех:', value)).catch((reason) =>
  console.log('поймали:', reason),
)

saveReject('ошибка')
// */

class CusPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('must be function')
    }

    this.state = 'pending'
    this.value = undefined
    this.handlers = []

    const resolve = (data) => {
      this.state = 'fulfilled'
      this.value = data
      this.handlers.forEach((handler) => handler.onFulfill(data))
    }

    const reject = (reason) => {
      this.state = 'rejected'
      this.value = reason
      this.handlers.forEach((handler) => handler.onReject(reason))
    }

    executor(resolve, reject)
  }

  then(onFulfill, onReject) {
    return new CusPromise((resolve, reject) => {
      const handleFulfill = (data) => {
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
        this.handlers.push({ onFulfill: handleFulfill, onReject: handleReject })
      } else if (this.state === 'fulfilled') {
        handleFulfill(this.value)
      } else {
        handleReject(this.value)
      }
    })
  }

  catch(onReject) {
    return this.then(undefined, onReject)
  }
}

let saveReject

const p = new CusPromise((resolve, reject) => {
  saveReject = reject
})

p.then((value) => console.log(value)).catch((reason) =>
  console.log('поймали:', reason),
)
saveReject('error')
