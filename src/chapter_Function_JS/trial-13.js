const filterAnagrams = (word, words) => {
  const normalize = (str) => str.split('').sort().join('')
  const normal = normalize(word)

  return words.filter((item) => normalize(item) === normal)
}

console.log(
  filterAnagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']),
)
// ['carer', 'racer']

export default filterAnagrams
