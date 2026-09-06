/* // ФИЛЬТР АНАГРАММ


export default filterAnagrams
// */

/* // example
console.log(filterAnagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']))
// ['aabb', 'bbaa']

console.log(
  filterAnagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']),
)
// ['carer', 'racer']

console.log(filterAnagrams('laser', ['lazing', 'lazy', 'lacer']))
// []
// */

/* // description
Анаграммы — это слова, которые состоят из одинаковых букв. Например:

- спаниель — апельсин
- карат — карта — катар
- топор — ропот — отпор

Реализуйте и экспортируйте по умолчанию функцию, которая находит все анаграммы слова. Функция принимает исходное слово и список для проверки (массив), а возвращает массив всех анаграмм. Если в списке слов отсутствуют анаграммы, то возвращается пустой массив.
// */
