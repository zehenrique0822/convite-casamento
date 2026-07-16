import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { couple, minimal } from '../../data/content'
import Eucalyptus from './Eucalyptus'

/**
 * SealScreen — tela inicial da versão 'minimal'.
 *
 * Fechado: fundo verde oliva dividido ao meio + selo dourado com monograma.
 * Ao tocar no selo: o selo some e as duas metades abrem como portas,
 * revelando o convite que já está montado por baixo.
 */
export default function SealScreen({ onOpen }) {
  const [stage, setStage] = useState('idle') // 'idle' | 'opening' | 'done'
  const opening = stage !== 'idle'

  const handleClick = () => {
    if (opening) return
    setStage('opening')
    // Avisa o App na hora: o cartão vai aparecendo enquanto as metades abrem.
    onOpen()
    // Tempo do selo sumir + as metades abrirem por completo.
    setTimeout(() => setStage('done'), 1500)
  }

  const panel = 'absolute inset-y-0 w-1/2 bg-gradient-to-b from-olive to-olive-dark'

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          key="seal-screen"
          className="no-select fixed inset-0 z-50"
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {/* Metade esquerda */}
          <motion.div
            className={`${panel} left-0`}
            initial={false}
            animate={{ x: opening ? '-100%' : '0%' }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.25 }}
          >
            <div className="absolute inset-y-0 right-0 w-px bg-black/15" />
            <p className="absolute left-6 top-10 font-script text-lg italic text-cream/85">
              {couple.names}
            </p>
          </motion.div>

          {/* Metade direita */}
          <motion.div
            className={`${panel} right-0 overflow-hidden`}
            initial={false}
            animate={{ x: opening ? '100%' : '0%' }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.25 }}
          >
            <Eucalyptus on="dark" className="absolute -bottom-6 -right-10 h-72 w-72" />
          </motion.div>

          {/* Selo + dica (por cima das duas metades) */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-10">
            <motion.button
              onClick={handleClick}
              aria-label="Abrir convite"
              className="pointer-events-auto flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 34% 28%, #d8b87a, #a6864a 62%, #7d6435 100%)',
                boxShadow:
                  '0 10px 26px rgba(0,0,0,0.45), inset 0 3px 8px rgba(255,255,255,0.35), inset 0 -3px 8px rgba(0,0,0,0.25)',
              }}
              animate={
                opening ? { scale: 0, opacity: 0 } : { scale: [1, 1.05, 1] }
              }
              transition={
                opening
                  ? { duration: 0.35, ease: 'easeIn' }
                  : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
              }
              whileTap={{ scale: 0.92 }}
            >
              <span className="font-script text-3xl italic text-olive-deep/85">
                {minimal.monogram}
              </span>
              <span className="pointer-events-none absolute inset-1.5 rounded-full border border-cream/25" />
            </motion.button>

            <motion.p
              className="whitespace-pre-line text-center font-script text-base italic leading-relaxed text-cream/80"
              animate={{ opacity: opening ? 0 : [0.55, 1, 0.55] }}
              transition={
                opening ? { duration: 0.3 } : { duration: 2.6, repeat: Infinity }
              }
            >
              {minimal.seal.hint}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
