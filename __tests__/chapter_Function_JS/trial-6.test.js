import getChildren from '../../src/chapter_Function_JS/trial-6.js'

describe('getChildren', () => {
  it('should be empty', () => {
    expect(getChildren([])).toEqual([])
  })

  it('test 1', () => {
    const users = [
      {
        name: 'Tirion',
        children: [{ name: 'Mira', birthday: '1983-03-23' }],
      },
      { name: 'Bronn', children: [] },
      {
        name: 'Sam',
        children: [
          { name: 'Aria', birthday: '2012-11-03' },
          { name: 'Keit', birthday: '1933-05-14' },
        ],
      },
      {
        name: 'Rob',
        children: [{ name: 'Tisha', birthday: '2012-11-03' }],
      },
    ]

    const expected = [
      { name: 'Mira', birthday: '1983-03-23' },
      { name: 'Aria', birthday: '2012-11-03' },
      { name: 'Keit', birthday: '1933-05-14' },
      { name: 'Tisha', birthday: '2012-11-03' },
    ]

    expect(getChildren(users)).toEqual(expected)
  })
})
