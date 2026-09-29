'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { FinanceTransaction, TransactionType } from '@/lib/finance-db'

const money = new Intl.NumberFormat('en-BT', { style: 'currency', currency: 'BTN', maximumFractionDigits: 2 })

export default function FinanceDashboard() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<FinanceTransaction[]>([])
  const [type, setType] = useState<TransactionType>('expense')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const totals = useMemo(() => transactions.reduce((sum, item) => ({ ...sum, [item.type]: sum[item.type] + item.amount }), { income: 0, expense: 0 }), [transactions])

  async function load() {
    const response = await fetch('/api/finance', { cache: 'no-store' })
    if (response.status === 401) return router.replace('/expense/login')
    const result = await response.json()
    setTransactions(result.transactions || [])
    setLoading(false)
  }

  useEffect(() => { void load() }, [])

  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('')
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const response = await fetch('/api/finance', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, amount: form.get('amount'), category: form.get('category'), note: form.get('note'), date: form.get('date') }) })
    const result = await response.json()
    if (!response.ok) return setError(result.error)
    formElement.reset(); await load()
  }

  async function remove(id: string) {
    if (!confirm('Delete this transaction?')) return
    await fetch(`/api/finance?id=${encodeURIComponent(id)}`, { method: 'DELETE' }); await load()
  }

  async function logout() {
    await fetch('/api/finance/logout', { method: 'POST' }); router.replace('/expense/login'); router.refresh()
  }

  return <main className="shell">
    <header><div><p>PRIVATE / FINANCE</p><h1>Expense Tracker</h1></div><div className="actions"><a href="/">Home</a><button onClick={logout}>Lock & logout</button></div></header>
    <section className="summary"><article><span>AVAILABLE BALANCE</span><strong>{money.format(totals.income - totals.expense)}</strong></article><article><span>TOTAL INCOME</span><strong className="income">+ {money.format(totals.income)}</strong></article><article><span>TOTAL EXPENSE</span><strong className="expense">− {money.format(totals.expense)}</strong></article></section>
    <div className="grid"><form onSubmit={add}><p>NEW TRANSACTION</p><div className="switch"><button type="button" className={type === 'expense' ? 'active expense-bg' : ''} onClick={() => setType('expense')}>Expense</button><button type="button" className={type === 'income' ? 'active income-bg' : ''} onClick={() => setType('income')}>Income</button></div><label>Amount (Nu.)<input name="amount" type="number" min="0.01" step="0.01" required placeholder="0.00" /></label><label>Category<input name="category" required placeholder="Food, salary, travel…" /></label><label>Date<input name="date" type="date" required defaultValue={new Date().toISOString().slice(0,10)} /></label><label>Note<input name="note" placeholder="Optional details" /></label>{error && <div className="error">{error}</div>}<button className="save">Add {type}</button></form>
      <section className="records"><div className="records-head"><div><p>LEDGER</p><h2>Recent transactions</h2></div><span>{transactions.length} RECORDS</span></div>{loading ? <div className="empty">Loading…</div> : transactions.length === 0 ? <div className="empty">No transactions yet. Add your first record.</div> : <div className="list">{transactions.map(item => <article key={item.id}><div className={`icon ${item.type}`}>{item.type === 'income' ? '↗' : '↘'}</div><div><b>{item.category}</b><small>{item.note || 'No note'} · {item.date}</small></div><strong className={item.type}>{item.type === 'income' ? '+' : '−'} {money.format(item.amount)}</strong><button aria-label="Delete transaction" onClick={() => remove(item.id)}>×</button></article>)}</div>}</section>
    </div>
    <style jsx>{`
      :global(*){box-sizing:border-box}:global(body){margin:0;background:#07110e;color:#edf9f3;font-family:Arial,sans-serif}.shell{min-height:100vh;padding:clamp(22px,5vw,70px);background:linear-gradient(135deg,#07110e,#0b1d17)}header{display:flex;align-items:center;justify-content:space-between;max-width:1240px;margin:auto}p,span{font:11px monospace;letter-spacing:.12em;color:#86a295}h1{margin:8px 0;font-size:clamp(30px,5vw,56px)}.actions{display:flex;gap:10px}.actions a,.actions button{border:1px solid #315548;background:transparent;color:#dcece5;padding:11px 14px;text-decoration:none;cursor:pointer}.summary{max-width:1240px;margin:38px auto;display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #29483d}.summary article{padding:25px;border-right:1px solid #29483d}.summary article:last-child{border:0}.summary strong{display:block;margin-top:14px;font-size:clamp(20px,3vw,34px)}.income{color:#48dd9e}.expense{color:#ff837d}.grid{display:grid;grid-template-columns:360px 1fr;gap:22px;max-width:1240px;margin:auto}form,.records{border:1px solid #29483d;background:#0a1914;padding:26px}label{display:block;margin-top:18px;color:#9eb4aa;font-size:12px}input{width:100%;margin-top:8px;padding:13px;border:1px solid #315548;background:#07110e;color:white;outline:none}.switch{display:grid;grid-template-columns:1fr 1fr;margin:20px 0 4px}.switch button{padding:12px;background:#07110e;color:#9bb0a7;border:1px solid #315548;cursor:pointer}.switch .active{color:#06110d;border-color:transparent}.expense-bg{background:#ff837d!important}.income-bg{background:#48dd9e!important}.save{width:100%;margin-top:22px;padding:14px;border:0;background:#e3a23b;color:#100b02;font-weight:bold;text-transform:uppercase;cursor:pointer}.error{margin-top:14px;color:#ff837d;font-size:12px}.records-head{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #29483d;padding-bottom:20px}.records-head h2{margin:6px 0}.list article{display:grid;grid-template-columns:42px 1fr auto 28px;gap:14px;align-items:center;padding:17px 0;border-bottom:1px solid #20382f}.icon{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:#10261e}.list b,.list small{display:block}.list small{margin-top:6px;color:#789187}.list article>button{border:0;background:none;color:#70897f;font-size:20px;cursor:pointer}.empty{padding:60px 10px;text-align:center;color:#789187}@media(max-width:780px){header{align-items:flex-start}.actions{flex-direction:column}.summary{grid-template-columns:1fr}.summary article{border-right:0;border-bottom:1px solid #29483d}.grid{grid-template-columns:1fr}.list article{grid-template-columns:38px 1fr 26px}.list article>strong{grid-column:2}.records{padding:18px}}
    `}</style>
  </main>
}
