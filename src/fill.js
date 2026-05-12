const fill = (arr, value, start = 0, end = arr.length) => {
  if (start >= arr.length) return arr

  const actualEnd = Math.min(end, arr.length)

  for (let i = start; i < actualEnd; i += 1) {
    arr[i] = value
  }
  return arr
}

export default fill

// fill(array, '*', 1, 3);
// console.log(array); // => [1, '*', '*', 4]
