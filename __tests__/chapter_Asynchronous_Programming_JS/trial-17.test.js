import CustomPromise from '../../src/chapter_Asynchronous_Programming_JS/trial-17.js'

const resolveMessage = 'Resolved!'

test('is not Promise', () => {
  expect(new CustomPromise(() => {})).not.toBeInstanceOf(Promise)
})

test('then()', async () => {
  const resolvedPromise = new CustomPromise((resolve) => {
    resolve(resolveMessage)
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
})
