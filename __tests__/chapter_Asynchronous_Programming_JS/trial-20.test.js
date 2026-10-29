import last from 'es-toolkit/compat/last'
import makeTimer from '../../src/chapter_Asynchronous_Programming_JS/trial-20.js'

const collectLaps = (time, duration) =>
  new Promise((resolve) => {
    const laps = []
    const timer = makeTimer(time, (data) => laps.push(data))
    timer.start()
    setTimeout(() => resolve(laps), duration)
  })

test('timer 1', async () => {
  const laps = await collectLaps(50, 300)
  const states = laps.map(({ state }) => state)
  expect(
    states,
    // 'Таймер на 50 миллисекунд не отдаёт ни одного тика working и один раз вызывает колбек со state finished',
  ).toEqual(['finished'])
})

test('timer 2', async () => {
  const laps = await collectLaps(1000, 1200)

  const firstLap = laps[0]
  expect(
    firstLap?.state,
    // 'Пока таймер идёт, колбек получает state со значением working',
  ).toBe('working')
  expect(
    firstLap.elapsedTime,
    // 'Первый тик приходит через 100 миллисекунд после старта',
  ).toBeGreaterThanOrEqual(100)
  expect(
    firstLap.elapsedTime,
    // 'Первый тик приходит через 100 миллисекунд после старта',
  ).toBeLessThan(150)

  const lastLap = last(laps)
  expect(
    lastLap.state,
    // 'После окончания времени колбек получает state со значением finished',
  ).toBe('finished')
})
