import fs from 'fs/promises'

export default async (filepath) => {
  const content = await fs.readFile(filepath, 'utf-8')
  const sortedLines = content.trim().split('\n').sort().join('\n')
  await fs.writeFile(filepath, sortedLines)
}
