/* // ЛЕНИВЫЕ КОЛЛЕКЦИИ
import cloneDeep from 'es-toolkit/compat/cloneDeep'



// */

/* // example
const elements = [{ key: 'value' }, { key: '' }]
const coll = Enumerable.wrap(elements)
console.log(coll.all()) // [{ key: 'value' }, { key: '' }]
const result = coll.where('key', 'value')

console.log(result.all()) // [{ key: 'value' }]
// */

/* // description
Реализуйте и экспортируйте по умолчанию класс, который предназначен для обработки коллекций объектов. Основная особенность работы данного класса заключается в том, что он использует lazy вариант обработки.

Подсказки
- Подробнее способы использования описаны в тестах
- Усложнённый вариант: добавьте метод allWithMemoization() с мемоизацией и протестируйте его, запуская командой make test-memo в терминале упражнения
- Ленивые коллекции
// */
