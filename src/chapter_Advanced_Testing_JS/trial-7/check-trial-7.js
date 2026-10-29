import { execSync } from 'child_process'

const checks = [
  {
    version: 'right1',
    shouldPass: true,
    msg: 'Правильная версия успешно ПРОШЛА все тесты!',
  },
  {
    version: 'wrong1',
    shouldPass: false,
    msg: 'УПАЛ в тесте — это правильно!',
  },
  {
    version: 'wrong2',
    shouldPass: false,
    msg: 'УПАЛ в тесте — это правильно!',
  },
]

console.log(
  `make: Entering directory 'src/chapter_Advanced_Testing_JS/trial-7'`,
)

let allChecksPassed = true

checks.forEach(({ version, shouldPass, msg }) => {
  try {
    execSync(
      `FUNCTION_VERSION=${version} npm run test2 src/chapter_Advanced_Testing_JS/trial-7/trial-7.test.js`,
      { stdio: 'ignore' },
    )

    if (shouldPass) {
      // Подсвечиваем успешный шаг зеленым цветом (\x1b[32m)
      console.log(`suppressor pass 'make check'\n \x1b[32m${msg}\x1b[0m`)
    } else {
      console.log(
        `${version} suppressor fail 'make check'\n \x1b[31m❌ ERROR: Тесты пройдены, но они ДОЛЖНЫ БЫЛИ ПРОВАЛИТЬСЯ\x1b[0m`,
      )
      allChecksPassed = false
    }
  } catch (err) {
    if (!shouldPass) {
      // Подсвечиваем успешное падение (ведь мы его и ждали!) тоже зеленым цветом
      console.log(
        `${version} suppressor fail 'make check'\n \x1b[32m${msg}\x1b[0m`,
      )
    } else {
      console.log(
        `\x1b[31m❌ ERROR: Тесты для реализации right1 не пройдены!\n ${err.message}\x1b[0m`,
      )
      allChecksPassed = false
    }
  }
})

console.log("make: Leaving directory 'src/chapter_Advanced_Testing_JS/trial-7'")

if (!allChecksPassed) {
  process.exit(1)
}
