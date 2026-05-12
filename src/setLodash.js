const setLodash = (obj, path, value) => {
  const keys = path
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean)

  let current = obj

  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i]

    if (current[key] === undefined) {
      current[key] = {}
    }

    current = current[key]
  }

  const lastKey = keys[keys.length - 1]
  current[lastKey] = value

  return obj
}

export default setLodash
