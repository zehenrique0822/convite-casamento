import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Envelope from './components/Envelope'
import InvitationBook from './components/InvitationBook'
import Modal from './components/Modal'

/**
 * App — orquestra o fluxo:
 *   1. Envelope (tela inicial) -> ao abrir, revela o livreto.
 *   2. InvitationBook (livreto com page flip).
 *   3. Modal global (controlado aqui para sobrepor todo o livreto).
 */
export default function App() {
  const [opened, setOpened] = useState(false) // envelope já aberto?
  const [modalData, setModalData] = useState(null) // conteúdo do modal ativo

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden">
      {/* Livreto (fica por baixo; aparece quando o envelope some) */}
      {opened && <InvitationBook onOpenModal={setModalData} />}

      {/* Envelope (por cima até abrir) */}
      <AnimatePresence>
        {!opened && <Envelope key="envelope" onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {/* Modal global — sobrepõe tudo */}
      <Modal open={!!modalData} data={modalData} onClose={() => setModalData(null)} />
    </main>
  )
}
