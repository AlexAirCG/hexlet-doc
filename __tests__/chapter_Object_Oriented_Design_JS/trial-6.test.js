import util from 'util'
import protect from '../../src/chapter_Object_Oriented_Design_JS/trial-6.js'

const user = {
  name: 'John',
  age: 25,
  password: 'secret',
}

const protectedProps = ['password']

test('Using Proxy', () => {
  const protectedUser = protect(user, protectedProps)
  expect(util.types.isProxy(protectedUser)).toBe(true)
})

test('Check getters', () => {
  const protectedUser = protect(user, protectedProps)
  expect(protectedUser.name).toEqual(user.name)
  expect(protectedUser.age).toEqual(user.age)
})

test('Check setters', () => {
  const protectedUser = protect(user, protectedProps)
  protectedUser.name = 'Jane'
  protectedUser.age = 21
  expect(protectedUser.name).toEqual('Jane')
  expect(protectedUser.age).toEqual(21)
})

test('Check protected', () => {
  const protectedUser = protect(user, protectedProps)
  expect(protectedUser.name).toEqual(user.name)
  expect(() => protectedUser.password).toThrow()
  expect(() => {
    protectedUser.password = '12345'
  }).toThrow()
})
