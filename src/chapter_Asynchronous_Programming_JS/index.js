//* //
const STATES = {
  pending: 'pending',
  fulfulled: 'fulfilled',
}

class CusPromise {
  constructor(executor) {
    this.PromiseState = STATES.pending
    this.PromiseResult = null
    this.PromiseFulfillReactions = []

    executor(this.resolve.bind(this))
  }

  resolve(result) {
    this.PromiseState = STATES.fulfulled
    this.PromiseResult = result
    this.PromiseFulfillReactions.forEach((onFulfilled) => onFulfilled(result))
  }

  then(onFulfilledHandler) {
    return new CusPromise((resolve) => {
      const onFulfilledReaction = (result) => {
        resolve(onFulfilledHandler(result))
      }

      if (this.PromiseState === STATES.fulfulled) {
        setTimeout(() => onFulfilledReaction(this.PromiseResult), 0)
        return
      } else {
        this.PromiseFulfillReactions.push(onFulfilledReaction)
      }
    })
  }
}

const messages = []

const resolvedPromise = new CusPromise((resolve) => {
  resolve('Сначала резолвим?')
})

const modifiedPromise = resolvedPromise.then(() => {
  messages.push('Сначала меняем статус.')
})

await modifiedPromise.then(() => {
  messages.push('А уже потом резолвим.')
})

console.log(messages.join(' ')) // Сначала меняем статус. А уже потом резолвим.

const delayedPromise = new CusPromise((resolve) => {
  setTimeout(() => resolve('Resolved'), 100)
})

const result = await delayedPromise
  .then((message) => `New another ${message}`)
  .then((message) => message.toUpperCase())
console.log(result) // NEW ANOTHER RESOLVED
// */
