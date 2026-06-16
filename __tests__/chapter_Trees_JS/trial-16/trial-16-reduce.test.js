import * as fsTrees from '@hexlet/immutable-fs-trees'
import { reduce } from '../../../src/chapter_Trees_JS/trial-16.js'

test('reduce 1', () => {
  const tree = fsTrees.mkdir('/', [
    fsTrees.mkdir('eTc', [
      fsTrees.mkdir('NgiNx'),
      fsTrees.mkdir('CONSUL', [fsTrees.mkfile('config.json')]),
    ]),
    fsTrees.mkfile('hOsts'),
  ])
  const actual = reduce((acc) => acc + 1, tree, 0)
  expect(actual).toEqual(6)

  const actual2 = reduce(
    (acc, n) => (n.type === 'file' ? acc + 1 : acc),
    tree,
    0,
  )
  expect(actual2).toEqual(2)

  const actual3 = reduce(
    (acc, n) => (n.type === 'directory' ? acc + 1 : acc),
    tree,
    0,
  )
  expect(actual3).toEqual(4)
})
