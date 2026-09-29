import { createHmac, timingSafeEqual } from 'node:crypto'

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8

function secret() {
  return process.env.FINANCE_SESSION_SECRET || 'change-this-development-secret'
}

function signature(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

export function createFinanceSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 })).toString('base64url')
  return `${payload}.${signature(payload)}`
}

export function verifyFinanceSession(token?: string) {
  if (!token) return false
  const [payload, suppliedSignature] = token.split('.')
  if (!payload || !suppliedSignature) return false

  const expected = Buffer.from(signature(payload))
  const supplied = Buffer.from(suppliedSignature)
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return false

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { exp: number }
    return Number.isFinite(session.exp) && session.exp > Date.now()
  } catch {
    return false
  }
}

export const financeCookie = {
  name: 'finance_session',
  options: {
    httpOnly: true,
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  },
}
