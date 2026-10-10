/* // HTTP-запросы
// Для тестировния нужно запустить в терминале
// node server.mjs
// затем тесты
// WEB_PORT=8080 make test file=__tests__/chapter_Asynchronous_Programming_JS/trial-13.test.js
import { URL } from 'url'
import axios from 'axios'

const extractLinks = (content) => {
  const host = 'http://localhost:8080'
  const linkRx = /href="(.+?)"/gi
  const results = content.matchAll(linkRx)
  return Array.from(results)
    .map((r) => r[1])
    .map((rawLink) => new URL(rawLink, host).toString())
}



export default getBadLinks
// */

/* // example
const links = await getBadLinks('http://localhost:8080/first')
console.log(links)
// [
//   'http://localhost:8080/pages/products',
//   'http://localhost:8080/pages/users',
//   'http://localhost:8080/pages/reports',
// ]
// */

/* // description
Реализуйте и экспортируйте по умолчанию в файле checker.js функцию, которая принимает на вход ссылку на страницу какого-то сайта, загружает содержимое этой страницы, извлекает из него ссылки и проверяет их доступность. Функция возвращает промис со списком битых ссылок.

В практике по адресу http://localhost:8080 работает сайт, на котором проверяется функция. На странице /first шесть ссылок, и три из них отвечают кодом 404.

Битыми считаются любые ссылки, возвращающие коды ответа, кроме 2xx (любых двухсотых). Axios по умолчанию считает ошибочными все коды кроме 2xx и отклоняет промис запроса. Если запрос axios.get() завершился успешно, страница отдаёт 2xx код ответа. Если промис запроса отклонён, ответа либо нет, либо это не 2xx код, и такая ссылка считается битой.

Подсказки

- Функция extractLinks(content) уже есть в файле checker.js. Она принимает HTML-код страницы строкой, то есть response.data из ответа axios.get(), и возвращает массив полных ссылок.
- Запросы к ссылкам можно запустить одновременно и дождаться всех через Promise.all(). Чтобы одна битая ссылка не отклонила весь Promise.all(), ошибку каждого запроса перехватывают на его собственном промисе и превращают в значение.
// */
