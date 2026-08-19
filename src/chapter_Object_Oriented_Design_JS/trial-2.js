//* // ИЗМЕНЯЕМАЯ КОНФИГУРАЦИЯ

// */

/* // example
const truncater = new Truncater()
console.log(truncater.truncate('one two')) // 'one two'
console.log(truncater.truncate('one two', { length: 6 })) // 'one tw...'

const truncater2 = new Truncater({ length: 6 })
console.log(truncater2.truncate('one two', { separator: '.' })) // 'one tw.'
console.log(truncater2.truncate('one two', { length: 3, separator: '.....' })) // 'one.....'
// */

/* // description
Реализуйте в классе Truncater конструктор и метод truncate(). Метод принимает текст и следующие опции:

- separator - символ, заменяющий обрезанную часть строки
- length - максимальная длина исходной строки. Если строка не длиннее, чем эта опция, то возвращается исходная строка.

Конфигурацию по умолчанию можно переопределить через конструктор класса и вторым аргументом метода truncate(). Оба способа можно комбинировать.

Подсказки
- Опции по умолчанию заданы, как статическое свойство класса. Обратите на это внимание при объединении исходных опций с пользовательскими.
- При решении можно (не обязательно) использовать методы String.prototype.substring() и String.prototype.concat()
// */
