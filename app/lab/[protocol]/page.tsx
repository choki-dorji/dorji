import { notFound } from 'next/navigation'
import ProtocolPageClient from './protocol-page-client'

const protocolNames: Record<string, string> = {
  pow: 'Proof of Work',
  pos: 'Proof of Stake',
  dpos: 'Delegated Proof of Stake',
  poa: 'Proof of Authority',
  pbft: 'Practical Byzantine Fault Tolerance',
}

export function generateStaticParams() {
  return Object.keys(protocolNames).map((protocol) => ({ protocol }))
}

export async function generateMetadata({ params }: { params: Promise<{ protocol: string }> }) {
  const { protocol } = await params
  const name = protocolNames[protocol]
  return name ? { title: `${name} / Consensus Lab`, description: `Learn how ${name} adds transactions to a blockchain.` } : {}
}

export default async function ProtocolPage({ params }: { params: Promise<{ protocol: string }> }) {
  const { protocol } = await params
  if (!protocolNames[protocol]) notFound()
  return <ProtocolPageClient protocolId={protocol} />
}