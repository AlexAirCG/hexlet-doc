//* // Испытание-6: ПРОКСИ

/* // example
const user = {
  name: 'John',
  age: 25,
  password: 'secret',
}

const protectedProps = ['password']

const protectedUser = protect(user, protectedProps)
protectedUser.name // John
protectedUser.age // 25
protectedUser.password // Error: Access to 'password' is restricted

protectedUser.name = 'Jane' // установит значение 'Jane' в свойство 'name'
protectedUser.password = 'newPassword' // Error: Access to 'password' is restricted
// */

/* // description
Реализуйте и экспортируйте по умолчанию функцию, которая принимает объект и список полей объекта, к которым она будет ограничивать доступ. При попытке прочитать или перезаписать поле, включенное в список защищенных, должно выбрасываться исключение.

В реализации используйте Proxy.
// */
