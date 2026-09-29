// import LabClient from './lab-client'

// export const metadata = {
//   title: 'Consensus Lab / Blockchain Learning Environment',
//   description: 'An interactive blockchain learning environment by No-body. See how networks agree.',
// }

// export default function LabPage() {
//   return <LabClient />
// }
import ModuleLabClient from './module-lab-client'

export const metadata = {
  title: 'Technology Learning Lab | Choki Dorji',
  description:
    'An interactive learning environment for blockchain, project management, backend development and frontend development.',
}

export default function LabPage() {
  return <ModuleLabClient />
}