'use client'

import { FormEvent, KeyboardEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FinanceLoginPage() {
  const router = useRouter()
  const [digits, setDigits] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const inputs = useRef<Array<HTMLInputElement | null>>([])

  function updateDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1)
    setDigits((current) => current.map((item, itemIndex) => itemIndex === index ? digit : item))
    setError('')
    if (digit && index < 3) inputs.current[index + 1]?.focus()
  }

  function handleKey(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) inputs.current[index - 1]?.focus()
  }

  async function submit(event: FormEvent) {
    event.preventDefault()
    const pin = digits.join('')
    if (pin.length !== 4) return setError('Enter all four digits.')
    setLoading(true)
    const response = await fetch('/api/finance/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    })
    const result = await response.json()
    setLoading(false)
    if (!response.ok) {
      setDigits(['', '', '', ''])
      inputs.current[0]?.focus()
      return setError(result.error || 'Unable to sign in.')
    }
    router.replace('/expense')
    router.refresh()
  }

  return (
    <main className="login-shell">
      <a href="/" className="back">← Back home</a>
      <form onSubmit={submit} className="login-card">
        <div className="mark">CD</div>
        <p className="eyebrow">PRIVATE FINANCE</p>
        <h1>Unlock your tracker</h1>
        <p className="hint">Enter your 4-digit PIN to view income and expenses.</p>
        <div className="pin-row">
          {digits.map((digit, index) => <input key={index} ref={(element) => { inputs.current[index] = element }} autoFocus={index === 0} inputMode="numeric" pattern="[0-9]" maxLength={1} value={digit} aria-label={`PIN digit ${index + 1}`} onChange={(event) => updateDigit(index, event.target.value)} onKeyDown={(event) => handleKey(index, event)} />)}
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <button disabled={loading}>{loading ? 'VERIFYING…' : 'UNLOCK FINANCE'}</button>
        <small>Protected with an encrypted, HTTP-only session.</small>
      </form>
      <style jsx>{`
        :global(*){box-sizing:border-box} :global(body){margin:0;background:#07110e;color:#edf9f3;font-family:Arial,sans-serif}
        .login-shell{min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 50% 35%,#123229 0,transparent 42%)}
        .back{position:fixed;top:24px;left:24px;color:#9bb8aa;text-decoration:none;font-size:14px}
        .login-card{width:min(440px,100%);padding:48px 42px;border:1px solid #28493d;background:rgba(8,24,19,.94);box-shadow:0 24px 80px #0007;text-align:center}
        .mark{display:grid;place-items:center;width:54px;height:54px;margin:0 auto 28px;border:1px solid #46d89a;border-radius:50%;color:#46d89a;font-weight:700}
        .eyebrow{color:#e3a23b;font:11px monospace;letter-spacing:.18em}.hint{color:#91aa9f;line-height:1.6}.pin-row{display:flex;gap:12px;justify-content:center;margin:32px 0 18px}
        input{width:60px;height:68px;border:1px solid #31584a;background:#07110e;color:#fff;text-align:center;font-size:28px;outline:none}input:focus{border-color:#46d89a;box-shadow:0 0 0 3px #46d89a22}
        button{width:100%;margin-top:16px;padding:16px;border:0;background:#43d797;color:#03110b;font-weight:800;letter-spacing:.08em;cursor:pointer}button:disabled{opacity:.55}.error{color:#ff837d;font-size:13px}small{display:block;margin-top:18px;color:#688378;font-size:11px}
      `}</style>
    </main>
  )
}
