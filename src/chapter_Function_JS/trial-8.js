const groupBy = (students, key) => {
  if (!key) return {}

  return students.reduce((acc, student) => {
    const groupName = student[key]
    const group = acc[groupName] ?? []
    return { ...acc, [groupName]: group.concat(student) }
  }, {})
}

export default groupBy
