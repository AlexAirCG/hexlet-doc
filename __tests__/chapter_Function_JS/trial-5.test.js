import takeOldest from '../../src/chapter_Function_JS/trial-5.js'

describe('takeOldest', () => {
  const users = [
    { name: 'Tirion', birthday: 'Nov 19, 1988' },
    { name: 'Sam', birthday: 'Nov 22, 1999' },
    { name: 'Rob', birthday: 'Jan 11, 1975' },
    { name: 'Sansa', birthday: 'Mar 20, 2001' },
    { name: 'Tisha', birthday: 'Feb 27, 1992' },
    { name: 'Chris', birthday: 'Dec 25, 1995' },
  ]

  it('test 1', () => {
    const expected = [{ name: 'Rob', birthday: 'Jan 11, 1975' }]
    expect(takeOldest(users)).toEqual(expected)
  })

  it('test 2', () => {
    const expected = [
      { name: 'Rob', birthday: 'Jan 11, 1975' },
      { name: 'Tirion', birthday: 'Nov 19, 1988' },
    ]
    expect(takeOldest(users, 2)).toEqual(expected)
  })

  it('test 3', () => {
    const expected = [
      { name: 'Rob', birthday: 'Jan 11, 1975' },
      { name: 'Tirion', birthday: 'Nov 19, 1988' },
      { name: 'Tisha', birthday: 'Feb 27, 1992' },
      { name: 'Chris', birthday: 'Dec 25, 1995' },
      { name: 'Sam', birthday: 'Nov 22, 1999' },
    ]
    expect(takeOldest(users, 5)).toEqual(expected)
  })
})
