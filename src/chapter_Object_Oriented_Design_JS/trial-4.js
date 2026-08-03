/* // Испытание-4: FLUENT INTERFACE


export default normalize
// */

/* // example
const countries = [
  { name: 'Miami', country: 'usa' },
  { name: 'samarA', country: '  ruSsiA' },
  { name: 'Moscow ', country: ' Russia' },
]

console.log(normalize(countries))
// {
//   russia: [
//     'moscow',
//     'samara',
//   ],
//   usa: [
//     'miami',
//   ],
// }
// */

/* // description
Реализуйте и экспортируйте по умолчанию функцию normalize() которая принимает на вход список городов и стран, нормализует их имена, сортирует города и группирует их по стране.

Подсказки
- Сигналы
- Получить только уникальные значения можно через специальный объект Set
- Урок Set
// */
