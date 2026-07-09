import ParseError from '../../src/chapter_IntroductionToOOP_JS/ParseError.js'
import { parseJson } from '../../src/chapter_IntroductionToOOP_JS/trial-10.js'

test('testing parse json', () => {
  const json = '{ "key": "value" }'
  expect(parseJson(json)).toEqual({ key: 'value' })
})

test('testing parse invalid json', () => {
  const json = '{ key": "value" }'
  expect(() => parseJson(json)).toThrow(ParseError)
})
