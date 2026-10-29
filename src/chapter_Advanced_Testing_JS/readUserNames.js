import fs from 'fs'

const readUserNames = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8')
  const lines = content.trim().split('\n')
  return lines.map((line) => line.split(':')[0])
}

export default readUserNames
