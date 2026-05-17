import takeOldest from '../../src/chapter_Function_JS/trial-5.js'

let users

beforeEach(() => {
  users = [
    { name: 'Tirion', birthday: 'Nov 19, 1988' },
    { name: 'Sam', birthday: 'Nov 22, 1999' },
    { name: 'Rob', birthday: 'Jan 11, 1975' },
    { name: 'Sansa', birthday: 'Mar 20, 2001' },
    { name: 'Tisha', birthday: 'Feb 27, 1992' },
    { name: 'Chris', birthday: 'Dec 25, 1995' },
  ]
})

test('takeOldest default', () => {
  expect(takeOldest(users)).toEqual([{ name: 'Rob', birthday: 'Jan 11, 1975' }])
})

test('takeOldest num = 2', () => {
  expect(takeOldest(users, 2)).toEqual([
    { name: 'Rob', birthday: 'Jan 11, 1975' },
    { name: 'Tirion', birthday: 'Nov 19, 1988' },
  ])
})
