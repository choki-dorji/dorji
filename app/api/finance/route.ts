import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { financeCookie, verifyFinanceSession } from '@/lib/finance-auth'
import { addTransaction, deleteTransaction, listTransactions, TransactionType } from '@/lib/finance-db'

async function isAuthenticated() {
  return verifyFinanceSession((await cookies()).get(financeCookie.name)?.value)
}

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ transactions: await listTransactions() })
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json().catch(() => null) as Record<string, unknown> | null
  const type = body?.type as TransactionType
  const amount = Number(body?.amount)
  const category = typeof body?.category === 'string' ? body.category.trim() : ''
  const note = typeof body?.note === 'string' ? body.note.trim() : ''
  const date = typeof body?.date === 'string' ? body.date : ''

  if (!['income', 'expense'].includes(type) || !Number.isFinite(amount) || amount <= 0 || !category || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Please provide valid transaction details.' }, { status: 400 })
  }

  return NextResponse.json({ transaction: await addTransaction({ type, amount, category, note, date }) }, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = new URL(request.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Transaction ID is required.' }, { status: 400 })
  return (await deleteTransaction(id))
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: 'Transaction not found.' }, { status: 404 })
}
