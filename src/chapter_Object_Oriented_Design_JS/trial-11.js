/* // ПОД ЗАМКОМ


export default protect
// */

/* // example (comment during testing)
class Course {
  constructor(name) {
    this._name = name
  }

  getName() {
    return this._name
  }
}

const course = new Course('Object-oriented design')
const protectedCourse = protect(course)

console.log(course.getName()) // "Object-oriented design"
console.log(protectedCourse.getName()) // "Object-oriented design"
console.log(course._name) // "Object-oriented design"
console.log(course._nonExists) // undefined

console.log(protectedCourse._name) // Error
console.log((protectedCourse._name = 'OOD')) // Error
console.log(protectedCourse._nonExists) // Error
// */

/* // description
Реализуйте и экспортируйте по умолчанию функцию, которая принимает объект и позволяет обращаться только к "публичным" свойствам и методам. При попытке прочитать или перезаписать приватное, или несуществующее свойство должно выбрасываться исключение.

В реализации используйте Proxy.

Подсказки

- Чтобы избежать потери контекста для методов, используйте связывание через bind.
- Определить, что по ключу возвращается метод можно через оператор typeof.
- Документация обработчика set
// */
