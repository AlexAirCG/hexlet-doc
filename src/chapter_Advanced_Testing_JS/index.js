/* //
const functionWithExpection = (number) => {
  if (number === 0) {
    throw new Error('divide by zero')
  }

  return 10 / number
}

export default functionWithExpection
// */

/* //
// Библиотека для работы с GitHub API
import { Octokit } from '@octokit/rest'

const getPrivateForksNames = async (org, client = new Octokit()) => {
  // Клиент выполняет запрос на гитхаб и возвращает список приватных репозиториев указанной организации
  // Данные хранятся в свойстве data возвращаемого ответа
  const { data } = await client.repos.listForOrg({
    org,
    type: 'private',
  })
  // Оставляем только имена форков
  return data.filter((repo) => repo.fork).map((repo) => repo.name)
}

export default getPrivateForksNames
// */

/* // new Date
const daysInMonth = (month, year) => {
  const days = new Date(year, month, 0).getDate()
  return days
}

console.log(daysInMonth(1, 2023)) // => 31
console.log(daysInMonth(4, 2023)) // => 30
console.log(daysInMonth(2, 2023)) // => 28
console.log(daysInMonth(2, 2024)) // => 29
console.log(daysInMonth(2, 1900)) // => 28
console.log(daysInMonth(2, 2000)) // => 29
// */

/* // if/else
const daysInMonth = (month, year) => {
  if (month === 2) {
    const isLeap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
    return isLeap ? 29 : 28
  }

  if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30
  }

  return 31
}

console.log(daysInMonth(1, 2023)) // => 31
console.log(daysInMonth(4, 2023)) // => 30
console.log(daysInMonth(2, 2023)) // => 28
console.log(daysInMonth(2, 2024)) // => 29
console.log(daysInMonth(2, 1900)) // => 28
console.log(daysInMonth(2, 2000)) // => 29
// */
