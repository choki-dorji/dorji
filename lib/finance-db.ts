import { randomBytes, scryptSync, timingSafeEqual, randomUUID } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'

export type TransactionType = 'income' | 'expense'

export type FinanceTransaction = {
  id: string
  type: TransactionType
  amount: number
  category: string
  note: string
  date: string
  createdAt: string
}

type FinanceDatabase = {
  auth: { pinSalt: string; pinHash: string }
  transactions: FinanceTransaction[]
}

const databasePath = path.join(process.cwd(), 'data', 'finance.json')

async function readDatabase(): Promise<FinanceDatabase> {
  return JSON.parse(await fs.readFile(databasePath, 'utf8')) as FinanceDatabase
}

async function writeDatabase(database: FinanceDatabase) {
  const temporaryPath = `${databasePath}.tmp`
  await fs.writeFile(temporaryPath, `${JSON.stringify(database, null, 2)}\n`, 'utf8')
  await fs.rename(temporaryPath, databasePath)
}

export async function verifyPin(pin: string) {
  const database = await readDatabase()
  const supplied = scryptSync(pin, database.auth.pinSalt, 64)
  const expected = Buffer.from(database.auth.pinHash, 'hex')
  return supplied.length === expected.length && timingSafeEqual(supplied, expected)
}

export async function listTransactions() {
  const database = await readDatabase()
  return database.transactions.sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))
}

export async function addTransaction(input: Omit<FinanceTransaction, 'id' | 'createdAt'>) {
  const database = await readDatabase()
  const transaction: FinanceTransaction = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  }
  database.transactions.push(transaction)
  await writeDatabase(database)
  return transaction
}

export async function deleteTransaction(id: string) {
  const database = await readDatabase()
  const originalLength = database.transactions.length
  database.transactions = database.transactions.filter((transaction) => transaction.id !== id)
  if (database.transactions.length === originalLength) return false
  await writeDatabase(database)
  return true
}

export async function changePin(newPin: string) {
  const database = await readDatabase()
  const salt = randomBytes(16).toString('hex')
  database.auth = { pinSalt: salt, pinHash: scryptSync(newPin, salt, 64).toString('hex') }
  await writeDatabase(database)
}
