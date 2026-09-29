import { NextResponse } from 'next/server'
import { financeCookie } from '@/lib/finance-auth'

export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(financeCookie.name, '', { ...financeCookie.options, maxAge: 0 })
  return response
}
