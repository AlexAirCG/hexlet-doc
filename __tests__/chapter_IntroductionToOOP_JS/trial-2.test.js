import make from '../../src/chapter_IntroductionToOOP_JS/trial-2.js'

describe('rational', () => {
  test('getters and toString', () => {
    const rat = make(3, 8)
    expect(rat.getNumer()).toBe(3)
    expect(rat.getDenom()).toBe(8)
    expect(rat.toString()).toBe('3/8')

    const negative = make(-4, 16)
    expect(negative.getNumer()).toBe(-4)
    expect(negative.getDenom()).toBe(16)
    expect(negative.toString()).toBe('-4/16')
  })

  test('setters', () => {
    const rat = make()
    rat.setNumer(10)
    rat.setDenom(3)
    expect(rat.getNumer()).toBe(10)
    expect(rat.getDenom()).toBe(3)
  })

  test('add', () => {
    const rat1 = make(3, 8)
    const rat2 = make(10, 3)
    const result = rat1.add(rat2)
    expect(result.getNumer()).toBe(89)
    expect(result.getDenom()).toBe(24)
  })

  test('add does not mutate operands', () => {
    const rat1 = make(3, 8)
    const rat2 = make(10, 3)
    const rat1Snapshot = rat1.toString()
    const rat2Snapshot = rat2.toString()

    rat1.add(rat2)

    expect(rat1.toString()).toBe(rat1Snapshot)
    expect(rat2.toString()).toBe(rat2Snapshot)
  })

  test('add with negative numerator', () => {
    const rat1 = make(-4, 16)
    const rat2 = make(12, 5)
    const result = rat1.add(rat2)
    expect(result.getNumer()).toBe(172)
    expect(result.getDenom()).toBe(80)
  })
})
