import { maxBy, minBy } from 'es-toolkit'
import { get } from 'es-toolkit/compat'
import * as octokitRest from '@octokit/rest'

const { Octokit } = octokitRest

const getUserMainLanguage = async (username, client = new Octokit()) => {
  const { data } = await client.repos.listForUser({ username })
  if (data.length === 0) {
    return null
  }
  const languages = data
    .map((repo) => repo.language)
    .reduce((acc, name) => {
      const count = get(acc, `${name}.count`, 0) + 1
      return { ...acc, [name]: { count, name } }
    }, {})
  const { name } = maxBy(Object.values(languages), (lang) => lang.count)
  return name
}

const wrong1 = async (username, client = new Octokit()) => {
  const { data } = await client.repos.listForUser({ username })
  if (data.length === 0) {
    return ''
  }
  const languages = data
    .map((repo) => repo.language)
    .reduce((acc, name) => {
      const count = get(acc, `${name}.count`, 0) + 1
      return { ...acc, [name]: { count, name } }
    }, {})
  const { name } = maxBy(Object.values(languages), (lang) => lang.count)
  return name
}

const wrong2 = async (username, client = new Octokit()) => {
  const { data } = await client.repos.listForUser({ username })
  if (data.length === 0) {
    return null
  }
  const languages = data
    .map((repo) => repo.language)
    .reduce((acc, name) => {
      const count = get(acc, `${name}.count`, 0) + 1
      return { ...acc, [name]: { count, name } }
    }, {})
  const { name } = minBy(Object.values(languages), (lang) => lang.count)
  return name
}

const functions = {
  right1: getUserMainLanguage,
  wrong1,
  wrong2,
}

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1'
  return functions[name]
}
