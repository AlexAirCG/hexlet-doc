let now

// Запускается перед каждым тестом
beforeEach(() => {
  now = Date.now() // текущий timestamp
})

test('first example', () => console.log(now))
test('second example', () => console.log(now))

//  console.log __tests__/index.test.js:9
//    1583871515943
//
//  console.log __tests__/index.test.js:10
//    1583871515950
