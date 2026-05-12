import right1 from '../src/getDaysInMonth/getDaysInMonth.js'
import wrong1 from '../src/getDaysInMonth/wrong1.js'
import wrong2 from '../src/getDaysInMonth/wrong2.js'
import wrong3 from '../src/getDaysInMonth/wrong3.js'
import wrong4 from '../src/getDaysInMonth/wrong4.js'

const implementator = { right1, wrong1, wrong2, wrong3, wrong4 }

Object.entries(implementator).forEach(([name, getDaysInMonth]) => {
  describe(`function getDaysInMonth ${name}`, () => {
    test('30 days for month', () => {
      expect(getDaysInMonth(4, 2023)).toBe(30)
    })
    test('31 days for month', () => {
      expect(getDaysInMonth(1, 2023)).toBe(31)
    })
    test('28 days for February', () => {
      expect(getDaysInMonth(2, 2023)).toBe(28)
      expect(getDaysInMonth(2, 1900)).toBe(28)
    })
    test('29 days for February', () => {
      expect(getDaysInMonth(2, 2024)).toBe(29)
      expect(getDaysInMonth(2, 2000)).toBe(29)
    })
    test('return null', () => {
      expect(getDaysInMonth(0, 2023)).toBeNull()
      expect(getDaysInMonth(13, 2023)).toBeNull()
      expect(getDaysInMonth(-5, 2023)).toBeNull()
    })
  })
})
