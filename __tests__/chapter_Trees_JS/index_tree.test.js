import {
  filterEmpty,
  buildHtml,
} from '../../src/chapter_Trees_JS/index_tree.js'

describe('HTML Builder', () => {
  test('buildHtml', () => {
    const textNode = { type: 'text', content: 'Hello' }
    const leafNode = { type: 'tag-leaf', name: 'br' }

    expect(buildHtml(textNode)).toBe('Hello')
    expect(buildHtml(leafNode)).toBe('<br>')
  })

  test('filterEmpty', () => {
    const tree = {
      type: 'tag-internal',
      name: 'div',
      children: [
        { type: 'tag-internal', name: 'p', children: [] },
        { type: 'tag-leaf', name: 'hr' },
      ],
    }

    const expected = {
      type: 'tag-internal',
      name: 'div',
      children: [{ type: 'tag-leaf', name: 'hr' }],
    }

    expect(filterEmpty(tree)).toEqual(expected)
  })
})
