//* // Испытание-1: КОНФИГУРАЦИЯ

// */

/* // example
const validator = new PasswordValidator({ containNumbers: false })
console.log(validator.validate('qwertyui')) // {}
console.log(validator.validate('qwerty')) // { minLength: 'too small' }
// */

/* // description
Реализуйте и экспортируйте по умолчанию класс PasswordValidator, ориентируясь на тесты.

Этот валидатор поддерживает следующие опции:
- minLength (по умолчанию 8) - минимальная длина пароля
- containNumbers (по умолчанию true) - требование содержать хотя бы одну цифру

Объект ошибок в ключах содержит название опции, а в значениях текст, указывающий на ошибку (тексты можно подсмотреть в тестах).
// */
