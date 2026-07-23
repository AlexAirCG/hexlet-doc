/* // Испытание-5: СБОРЩИКИ
import * as yup from 'yup'

const genres = ['drama', 'horror', 'fantasy', 'classic']



export default getInvalidBooks
// */

/* // example
const books = [{ name: 'book', author: 'author' }, { author: 'author 2' }]
const invalidBooks = getInvalidBooks(books) // [{ author: 'author 2' }]
console.log(invalidBooks)
// */

/* // description
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список книг, находит среди них невалидные и возвращает их наружу.

Описания формата каждой книги:
- name – строка, обязательное
- author – строка, обязательное
- pagesCount – целое положительное число, необязательное
- link – строка url, необязательное, не может быть пустой строкой; ссылка на книгу в интернете
- genre – строка, необязательное; жанр книги. Должен входить в список определенный в файле index.js
// */
