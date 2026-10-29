import CustomPromise from '../../src/chapter_Asynchronous_Programming_JS/trial-22.js'

const resolveMessage = 'Resolved!'
const fulfillMessage = 'Fulfilled'
const rejectError = new Error('Rejected!')
const resolveMessages = []
const expectedResolveMessages = [fulfillMessage, resolveMessage]

test('is not Promise', () => {
  expect(new CustomPromise(() => {})).not.toBeInstanceOf(Promise)
})

test('then()', async () => {
  const resolvedPromise = new CustomPromise((resolve, reject) => {
    resolve(resolveMessage)
    reject(rejectError) // должно игнорироваться
  })
  const resolveString = await resolvedPromise.then(
    (message) => `Another ${message}`,
  )
  expect(resolveString).toEqual(`Another ${resolveMessage}`)

  const resolveChainResult = await resolvedPromise
    .then((message) => `New another ${message}`)
    .then((message) => message.split(' '))
    .then((array) => array.reverse())
    .then((array) => array.join(''))
  expect(resolveChainResult).toEqual(
    `New another ${resolveMessage}`.split(' ').reverse().join(''),
  )

  const rejectedPromise = new CustomPromise((resolve, reject) => {
    reject(rejectError)
    resolve(resolveMessage) // должно игнорироваться
  })
  const rejectResult = await rejectedPromise.then(
    (message) => `Another ${message}`,
  ) // должно игнорироваться
  expect(rejectResult.message).toEqual(`${rejectError.message}`)
})

test('event loop', async () => {
  const resolvedPromise = new CustomPromise((resolve) => {
    resolve(resolveMessage)
  })
  expect(resolveMessages).toHaveLength(0)

  const modifiedPromise = resolvedPromise.then(() => {
    resolveMessages.push(fulfillMessage)
  })
  expect(resolveMessages).toHaveLength(0)

  await modifiedPromise.then(() => resolveMessages.push(resolveMessage))
  expect(resolveMessages).toEqual(expectedResolveMessages)
})
