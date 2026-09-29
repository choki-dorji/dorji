import { promises as fs } from 'node:fs'
import { randomBytes, scryptSync } from 'node:crypto'
import path from 'node:path'

const pin = process.argv[2]
if (!/^\d{4}$/.test(pin || '')) {
  console.error('Usage: node scripts/set-finance-pin.mjs 1234')
  process.exit(1)
}
const file = path.join(process.cwd(), 'data', 'finance.json')
const database = JSON.parse(await fs.readFile(file, 'utf8'))
const salt = randomBytes(16).toString('hex')
database.auth = { pinSalt: salt, pinHash: scryptSync(pin, salt, 64).toString('hex') }
await fs.writeFile(file, `${JSON.stringify(database, null, 2)}\n`)
console.log('Finance PIN updated.')
