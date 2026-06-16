import _ from 'lodash'

const freeEmailDomains = ['gmail.com', 'yandex.ru', 'hotmail.com', 'yahoo.com']

const emails = [
  'info@gmail.com',
  'info@yandex.ru',
  'info@hotmail.com',
  'mk@host.com',
  'support@hexlet.io',
  'key@yandex.ru',
  'sergey@gmail.com',
  'vovan@gmail.com',
  'vovan@hotmail.com',
]

const getFreeDomainsCount = (emails) => {
  return emails
    .map((email) => {
      const [, domain] = email.split('@')
      return domain
    })
    .filter((item) => freeEmailDomains.includes(item))
    .reduce((acc, item) => {
      const count = _.get(acc, item, 0) + 1
      return { ...acc, [item]: count }
    }, {})
}
console.log(getFreeDomainsCount(emails))

export default getFreeDomainsCount
