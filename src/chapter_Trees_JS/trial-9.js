/*
const flatten = (arr) => {
  const result = []
  for (let i = 0; i < arr.length; i += 1) {
    if (Array.isArray(arr[i])) {
      const flatSubArray = flatten(arr[i])
      for (let j = 0; j < flatSubArray.length; j += 1) {
        result.push(flatSubArray[j])
      }
    } else {
      result.push(arr[i])
    }
  }
  return result
}
// */

//*
const flatten = (list) => {
  return list.reduce((acc, element) => {
    const result = Array.isArray(element)
      ? [...acc, ...flatten(element)]
      : [...acc, element]
    return result
  }, [])
}
// */

export default flatten

const list = [1, 2, [3, 5], [[4, 3], 2]]

console.log(flatten(list)) // [1, 2, 3, 5, 4, 3, 2]
