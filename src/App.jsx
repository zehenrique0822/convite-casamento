import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Envelope from './components/Envelope'
import InvitationBook from './components/InvitationBook'
import Modal from './components/Modal'
import SealScreen from './versions/minimal/SealScreen'
import MinimalInvite from './versions/minimal/MinimalInvite'
import { version as configuredVersion } from './data/content'

/**
 * App — escolhe a versão do convite e orquestra o fluxo.
 *
 *   'minimal' (nova)  -> selo -> UMA tela com todas as informações.
 *   'classic' (antiga)-> envelope -> livreto com páginas viradas.
 *
 * A versão padrão vem de `version` em src/data/content.js e pode ser trocada
 * na hora pela URL, sem mexer no código:  ?v=classic  ou  ?v=minimal
 *
 * Em ambas, o Modal é controlado aqui para sobrepor o convite inteiro.
 */
function resolveVersion() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('v')
    if (fromUrl === 'classic' || fromUrl === 'minimal') return fromUrl
  } catch {
    /* SSR/ambientes sem window: cai no padrão do content.js */
  }
  return configuredVersion === 'classic' ? 'classic' : 'minimal'
}

export default function App() {
  const [version] = useState(resolveVersion)
  const [opened, setOpened] = useState(false) // selo/envelope já aberto?
  const [modalData, setModalData] = useState(null) // conteúdo do modal ativo

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden">
      {version === 'minimal' ? (
        <>
          {/* O cartão já fica montado por baixo — o selo abre e o revela. */}
          <MinimalInvite onOpenModal={setModalData} revealed={opened} />
          <SealScreen onOpen={() => setOpened(true)} />
        </>
      ) : (
        <>
          {opened && <InvitationBook onOpenModal={setModalData} />}
          <AnimatePresence>
            {!opened && <Envelope key="envelope" onOpen={() => setOpened(true)} />}
          </AnimatePresence>
        </>
      )}

      {/* Modal global — sobrepõe tudo */}
      <Modal open={!!modalData} data={modalData} onClose={() => setModalData(null)} />
    </main>
  )
}
