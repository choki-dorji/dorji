import { NextRequest, NextResponse } from 'next/server'
import { createFinanceSession, financeCookie } from '@/lib/finance-auth'
import { verifyPin } from '@/lib/finance-db'

const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  const now = Date.now()
  const record = attempts.get(ip)
  if (record && record.resetAt > now && record.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null) as { pin?: unknown } | null
  const pin = typeof body?.pin === 'string' ? body.pin : ''
  if (!/^\d{4}$/.test(pin) || !(await verifyPin(pin))) {
    const current = record && record.resetAt > now ? record : { count: 0, resetAt: now + WINDOW_MS }
    attempts.set(ip, { ...current, count: current.count + 1 })
    return NextResponse.json({ error: 'Incorrect PIN.' }, { status: 401 })
  }

  attempts.delete(ip)
  const response = NextResponse.json({ ok: true })
  response.cookies.set(financeCookie.name, createFinanceSession(), financeCookie.options)
  return response
}
