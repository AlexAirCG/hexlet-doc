/* // Испытание-6: ПРОКСИ


export default protect
// */

/* // example (comment during testing)
const user = {
  name: 'John',
  age: 25,
  password: 'secret',
}

const protectedProps = ['password']

const protectedUser = protect(user, protectedProps)
console.log(protectedUser.name) // John
console.log(protectedUser.age) // 25
console.log(protectedUser.password) // Error: Access to 'password' is restricted

console.log((protectedUser.name = 'Jane')) // установит значение 'Jane' в свойство 'name'
console.l((protectedUser.password = 'newPassword')) // Error: Access to 'password' is restricted
// */

/* // description
Реализуйте и экспортируйте по умолчанию функцию, которая принимает объект и список полей объекта, к которым она будет ограничивать доступ. При попытке прочитать или перезаписать поле, включенное в список защищенных, должно выбрасываться исключение.

В реализации используйте Proxy.
// */
