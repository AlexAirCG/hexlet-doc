import { faker } from '@faker-js/faker'
import getImplementation from '../../src/generTestData/function.js'

const filterUsers = getImplementation()

console.log(filterUsers)

let users = []

beforeEach(() => {
  users = Array.from({ length: 10 }, () => ({
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }))
})

test('One property', () => {
  const expected1 = users.filter((user) => user.email === users[0].email)
  expect(filterUsers(users, { email: users[0].email })).toEqual(expected1)

  const expected2 = users.filter(
    (user) => user.firstName === users[0].firstName,
  )
  expect(filterUsers(users, { firstName: users[0].firstName })).toEqual(
    expected2,
  )

  const expected3 = users.filter((user) => user.lastName === users[0].lastName)
  expect(filterUsers(users, { lastName: users[0].lastName })).toEqual(expected3)
})
