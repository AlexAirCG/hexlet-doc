import Fakerator from 'fakerator'

const fakerator = Fakerator()

const getDefaultData = () => ({
  email: fakerator.internet.email(),
  firstName: fakerator.names.firstName(),
  lastName: fakerator.names.lastName(),
})

const buildUser = (data) => {
  const defaultData = getDefaultData()
  return { ...defaultData, ...data }
}

const buildUser2 = () => ({
  email: fakerator.internet.email(),
  firstName: fakerator.names.firstName(),
})

const buildUser3 = (data) => {
  fakerator.seed(1)
  const defaultData = getDefaultData()
  return { ...defaultData, ...data }
}

const buildUser4 = () => {
  const defaultData = getDefaultData()
  return { ...defaultData }
}

const functions = {
  right1: buildUser,
  wrong1: buildUser2,
  wrong2: buildUser3,
  wrong3: buildUser4,
}

const getFunction = () => {
  const name = process.env.FUNCTION_VERSION || 'right1'
  return functions[name]
}

export default getFunction
