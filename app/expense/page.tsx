import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { financeCookie, verifyFinanceSession } from '@/lib/finance-auth'
import FinanceDashboard from './finance-dashboard'


export default async function ExpensePage() {
  // const token = (await cookies()).get(financeCookie.name)?.value
  // if (!verifyFinanceSession(token)) redirect('/expense/login')
  return <FinanceDashboard />
}
