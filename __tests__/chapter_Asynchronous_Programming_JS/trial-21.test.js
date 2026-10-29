import CustomPromise from '../../src/chapter_Asynchronous_Programming_JS/trial-21.js'

const resolveMessage = 'Resolved!'
const fulfillMessage = 'Fulfilled'
const rejectError = new Error('Rejected!')
const resolveMessages = []
const rejectMessages = []
const expectedResolveMessages = [fulfillMessage, resolveMessage]
const expectedRejectMessages = [rejectError.message, resolveMessage]

test('is not Promise', () => {
  expect(new CustomPromise(() => {})).not.toBeInstanceOf(Promise)
})

test('then() and catch()', async () => {
  const resolvedPromise = new CustomPromise((resolve, reject) => {
    resolve(resolveMessage)
    reject(rejectError) // должно игнорироваться
  })
  const resolveString = await resolvedPromise
    .catch((message) => `Catch! ${message}`) // должно игнорироваться
    .then((message) => `Another ${message}`)
  expect(resolveString).toEqual(`Another ${resolveMessage}`)

  const resolveChainResult = await resolvedPromise
    .then((message) => `New another ${message}`)
    .then((message) => message.split(' '))
    .then((array) => array.reverse())
    .then((array) => array.join(''))
    .catch((message) => `Catch! ${message}`) // должно игнорироваться
  expect(resolveChainResult).toEqual(
    `New another ${resolveMessage}`.split(' ').reverse().join(''),
  )

  const catchPromise = new CustomPromise((resolve, reject) => {
    resolve(resolveMessage)
    reject(resolveMessage) // должно игнорироваться
  })
  const catchString = await catchPromise
    .then(() => {
      throw rejectError
    })
    .catch((error) => `Catch! ${error.message}`)
  expect(catchString).toEqual(`Catch! ${rejectError.message}`)

  const rejectedPromise1 = new CustomPromise((resolve, reject) => {
    reject(rejectError)
    resolve(resolveMessage) // должно игнорироваться
  })
  const rejectString = await rejectedPromise1
    .then((message) => `Another ${message}`) // должно игнорироваться
    .catch((error) => `Catch! Reject message: ${error.message}`)
  expect(rejectString).toEqual(`Catch! Reject message: ${rejectError.message}`)

  const rejectedPromise2 = new CustomPromise((resolve, reject) => {
    reject(rejectError)
    resolve(resolveMessage) // должно игнорироваться
  })
  const rejectedPromiseResult = rejectedPromise2
    .then((message) => `Another ${message}`) // должно игнорироваться
    .catch((error) => {
      throw new Error(`Error message: ${error.message}`)
    })
  await expect(rejectedPromiseResult).rejects.toThrow(
    new Error(`Error message: ${rejectError.message}`),
  )
})

test('event loop', async () => {
  const resolvedPromise = new CustomPromise((resolve) => {
    resolve(resolveMessage)
  })
  expect(resolveMessages).toHaveLength(0)

  const processedResolvedPromise = resolvedPromise.then(() => {
    resolveMessages.push(fulfillMessage)
  })
  expect(resolveMessages).toHaveLength(0)

  await processedResolvedPromise.then(() =>
    resolveMessages.push(resolveMessage),
  )
  expect(resolveMessages).toEqual(expectedResolveMessages)

  const rejectedPromise = new CustomPromise((_, reject) => {
    reject(rejectError)
  })
  expect(rejectMessages).toHaveLength(0)

  const processedRejectedPromise = rejectedPromise.catch((err) => {
    rejectMessages.push(err.message)
  })
  expect(rejectMessages).toHaveLength(0)

  await processedRejectedPromise.then(() => rejectMessages.push(resolveMessage))
  expect(rejectMessages).toEqual(expectedRejectMessages)
})
