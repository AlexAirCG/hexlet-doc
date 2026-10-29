import { execSync } from 'child_process'

const checks = [
  {
    version: 'right',
    shouldPass: true,
    msg: 'Правильная версия успешно ПРОШЛА все тесты!',
  },
]

console.log(
  `make: Entering directory 'src/chapter_Advanced_Testing_JS/trial-9'`,
)

let allChecksPassed = true

checks.forEach(({ version, shouldPass, msg }) => {
  try {
    execSync(
      `FUNCTION_VERSION=${version} NODE_OPTIONS=--experimental-vm-modules npx jest --env=node src/chapter_Advanced_Testing_JS/trial-9/trial-9.test.js`,
      { stdio: 'pipe' },
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
        `\x1b[31m❌ ERROR: Тесты для реализации ${version} не пройдены!\n ${err.stdout}\n ${err.stderr}\x1b[0m`,
      )
      allChecksPassed = false
    }
  }
})

console.log("make: Leaving directory 'src/chapter_Advanced_Testing_JS/trial-9'")

if (!allChecksPassed) {
  process.exit(1)
}
