import * as fsTrees from '@hexlet/immutable-fs-trees'
import { filter } from '../../../src/chapter_Trees_JS/trial-16.js'

test('filter 1', () => {
  const tree = fsTrees.mkdir('/', [
    fsTrees.mkdir('etc', [
      fsTrees.mkdir('nginx', [fsTrees.mkdir('conf.d')]),
      fsTrees.mkdir('consul', [fsTrees.mkfile('config.json')]),
    ]),
    fsTrees.mkfile('hosts'),
  ])
  const actual = filter((n) => n.type === 'directory', tree)

  const expected = {
    children: [
      {
        children: [
          {
            children: [
              {
                children: [],
                meta: {},
                name: 'conf.d',
                type: 'directory',
              },
            ],
            meta: {},
            name: 'nginx',
            type: 'directory',
          },
          {
            children: [],
            meta: {},
            name: 'consul',
            type: 'directory',
          },
        ],
        meta: {},
        name: 'etc',
        type: 'directory',
      },
    ],
    meta: {},
    name: '/',
    type: 'directory',
  }

  expect(actual).toEqual(expected)
})

test('filter 2', () => {
  const tree = fsTrees.mkdir('/', [
    fsTrees.mkdir('etc', [
      fsTrees.mkdir('nginx', [fsTrees.mkdir('conf.d')]),
      fsTrees.mkdir('consul', [fsTrees.mkfile('config.json')]),
    ]),
    fsTrees.mkfile('hosts'),
  ])
  const names = new Set(['/', 'hosts', 'etc', 'consul'])
  const actual = filter((n) => names.has(n.name), tree)

  const expected = {
    children: [
      {
        children: [
          {
            children: [],
            meta: {},
            name: 'consul',
            type: 'directory',
          },
        ],
        meta: {},
        name: 'etc',
        type: 'directory',
      },
      {
        name: 'hosts',
        meta: {},
        type: 'file',
      },
    ],
    meta: {},
    name: '/',
    type: 'directory',
  }
  expect(actual).toEqual(expected)
})
