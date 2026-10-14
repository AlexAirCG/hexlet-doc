import util from 'util'
import CustomPromise from '../../src/chapter_Asynchronous_Programming_JS/trial-16.js'

const fulfillMessage = 'Fulfilled'
const resolveMessage = 'Resolved'
const messages = []
const expectedMessages = [fulfillMessage, resolveMessage]

test('is not Promise', () => {
  expect(new CustomPromise(() => {})).not.toBeInstanceOf(Promise)
})

test('then() and states', async () => {
  const resolvedPromise = new CustomPromise((resolve) => {
    setTimeout(() => resolve(resolveMessage), 100)
  })
  expect(util.inspect(resolvedPromise).toLowerCase()).toContain('pending')

  const resolveChainResult = await resolvedPromise
    .then((message) => `New another ${message}`)
    .then((message) => message.split(' '))
    .then((array) => array.reverse())
    .then((array) => array.join(''))
  expect(util.inspect(resolvedPromise).toLowerCase()).toContain('fulfilled')
  expect(resolveChainResult).toEqual(
    `New another ${resolveMessage}`.split(' ').reverse().join(''),
  )
})

test('event loop', async () => {
  const resolvedPromise = new CustomPromise((resolve) => {
    resolve(resolveMessage)
  })
  expect(messages).toHaveLength(0)

  const modifiedPromise = resolvedPromise.then(() => {
    messages.push(fulfillMessage)
  })
  expect(messages).toHaveLength(0)

  await modifiedPromise.then(() => {
    messages.push(resolveMessage)
  })
  expect(messages).toEqual(expectedMessages)
})
