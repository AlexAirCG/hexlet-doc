import setLodash from '../src/setLodash.js'
import _ from 'lodash'

let data
let dataCopy

describe('function set', () => {
  beforeEach(() => {
    data = { a: [{ b: { c: 3 } }] }
    dataCopy = _.cloneDeep(data)
  })

  test('plain set', () => {
    setLodash(data, 'a', 'value')
    dataCopy.a = 'value'
    expect(data).toEqual(dataCopy)
  })

  test('nested set', () => {
    setLodash(data, 'a[0].b.c', true)
    dataCopy.a[0].b.c = true
    expect(data).toEqual(dataCopy)
  })

  test('set new property', () => {
    setLodash(data, 'a[0].b.d', false)
    dataCopy.a[0].b.d = false
    expect(data).toEqual(dataCopy)
  })
})
