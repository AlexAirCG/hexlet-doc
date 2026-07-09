import Time from '../../src/chapter_IntroductionToOOP_JS/trial-9.js'

test('#1', () => {
  const time = Time.fromString('10:23')
  expect(time).toBeInstanceOf(Time)
  expect(`The time is ${time}`).toEqual('The time is 10:23')
})

test('#2', () => {
  const time = Time.fromString('3:8')
  expect(time).toBeInstanceOf(Time)
  expect(`The time is ${time}`).toEqual('The time is 3:8')
})
