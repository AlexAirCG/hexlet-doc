import { execSync } from 'child_process'

const checks = [
  {
    version: 'right1',
    shouldPass: true,
    msg: 'Ожидалось, что тест будет пройден; тесты пройдены',
  },
  {
    version: 'wrong1',
    shouldPass: false,
    msg: 'Ожидалось, что тест будет пройден; тесты пройдены',
  },
  {
    version: 'wrong2',
    shouldPass: false,
    msg: 'Ожидалось, что тест будет пройден; тесты пройдены',
  },
]

console.log(`make: Entering directory '/usr/src/app'`)

let allChecksPassed = true

checks.forEach(({ version, shouldPass, msg }) => {
  try {
    execSync(
      `FUNCTION_VERSION=${version} npm run test2 src/chapter_Advanced_Testing_JS/trial-1/trial-1.test.js`,
      { stdio: 'ignore' },
    )

    if (shouldPass) {
      // Подсвечиваем успешный шаг зеленым цветом (\x1b[32m)
      console.log(`\x1b[32msuppressor pass 'make check'\n ${msg}\x1b[0m`)
    } else {
      console.log(
        `\x1b[31mFUNCTION_VERSION=${version} suppressor fail 'make check'\n ❌ ERROR: Tests passed, but they SHOULD HAVE FAILED!\x1b[0m`,
      )
      allChecksPassed = false
    }
  } catch (err) {
    if (!shouldPass) {
      // Подсвечиваем успешное падение (ведь мы его и ждали!) тоже зеленым цветом
      console.log(
        `\x1b[32mFUNCTION_VERSION=${version} suppressor fail 'make check'\n ${msg}\x1b[0m`,
      )
    } else {
      console.log(
        `\x1b[31m❌ ERROR: Tests failed on right1 implementation!\n ${err.message}\x1b[0m`,
      )
      allChecksPassed = false
    }
  }
})

console.log("make: Leaving directory '/usr/src/app'")

if (!allChecksPassed) {
  process.exit(1)
}
