const collection = (objColl, fn) => {
  objColl.forEach((obj) => fn.call(obj))
}

const objects = [{ name: 'Karl' }, { name: 'Mia' }]
collection(objects, function callback() {
  this.name = this.name.split('').reverse().join('')
})

console.log(objects)
// [
//   { name: 'lraK' },
//   { name: 'aiM' },
// ];

/*
1. Создать функцию collection(objColl, fn).
2. Внутри неё запустить цикл, чтобы перебрать каждый объект из массива objColl.
3. На каждом шаге цикла взять текущий объект и запустить для него функцию fn, насильно сделав этот объект контекстом (this).
4. Вспоминаем, какой метод умеет мгновенно запускать функцию и подменять this? Метод .call().
// */

export default collection
