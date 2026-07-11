import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { couple } from '../data/content'

/**
 * Envelope — tela inicial.
 *
 * IMPORTANTE: a centralização (translate) fica em wrappers SEM animação,
 * e o Framer Motion anima só Y (cartão) ou scale (selo). Misturar
 * translate do CSS com transform animado do Framer faz o Framer
 * sobrescrever a centralização (era a causa do papel/selo "torto").
 *
 * Fechado: aparece SÓ o envelope + aba + selo (cartão escondido atrás).
 * Ao tocar no selo: aba abre -> cartão sobe e sai de dentro -> fade out.
 */
export default function Envelope({ onOpen }) {
  const [stage, setStage] = useState('idle') // 'idle' | 'opening' | 'done'

  const handleClick = () => {
    if (stage !== 'idle') return
    setStage('opening')
    setTimeout(() => setStage('done'), 2400)
  }

  const opening = stage !== 'idle'

  return (
    <AnimatePresence onExitComplete={onOpen}>
      {stage !== 'done' && (
        <motion.div
          key="envelope-screen"
          className="no-select fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          <motion.p
            className="mb-12 text-center font-sans text-[11px] uppercase tracking-[0.35em] text-gold-light/90"
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            Você recebeu um convite
          </motion.p>

          {/* Palco do envelope */}
          <div
            className="relative"
            style={{ width: 'min(86vw, 360px)', height: 'min(60vw, 252px)', perspective: 1500 }}
          >
            {/* CARTÃO — wrapper centraliza (z-20, atrás da frente z-30); motion anima só Y */}
            <div
              className="absolute left-1/2 top-[6%] -translate-x-1/2"
              style={{ width: '84%', height: '86%', zIndex: 20 }}
            >
              <motion.div
                className="h-full w-full overflow-hidden rounded-md bg-cream shadow-card"
                initial={false}
                animate={{ y: opening ? '-120%' : '0%' }}
                transition={{ delay: opening ? 0.85 : 0, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-full flex-col items-center justify-center gap-2.5 px-6 text-center">
                  <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-gold-dark">
                    Casamento
                  </span>
                  <span className="font-script text-5xl leading-none text-ink">
                    {couple.names}
                  </span>
                  <div className="gold-divider w-20" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink/60">
                    {couple.date}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* FRENTE do envelope — z-30, cobre todo o cartão */}
            <div className="absolute inset-0 overflow-hidden rounded-md shadow-card" style={{ zIndex: 30 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blush to-cream" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,0,0,0.05) 0 50%, transparent 50%), linear-gradient(225deg, rgba(0,0,0,0.05) 0 50%, transparent 50%)',
                }}
              />
              {/* aba inferior (triângulo para cima) */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0 100%, 100% 100%, 50% 40%)',
                  background: 'linear-gradient(180deg, #ece0d9 0%, #e3d3cb 100%)',
                  boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
                }}
              />
            </div>

            {/* ABA superior — z-40 fechada / z-10 ao abrir; anima só rotateX */}
            <motion.div
              className="absolute left-0 right-0 top-0 origin-top"
              style={{ height: '56%', zIndex: opening ? 10 : 40, transformStyle: 'preserve-3d' }}
              initial={false}
              animate={{ rotateX: opening ? 180 : 0 }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            >
              <div
                className="h-full w-full"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  background: 'linear-gradient(180deg, #f3e8e2 0%, #e7d7cf 100%)',
                  backfaceVisibility: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                }}
              />
            </motion.div>

            {/* SELO — wrapper centraliza; motion anima só scale (fica sempre centrado) */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 50 }}
            >
              <motion.button
                onClick={handleClick}
                aria-label="Abrir convite"
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #d8b87a, #a6864a 70%)',
                  boxShadow:
                    '0 6px 16px rgba(0,0,0,0.35), inset 0 2px 6px rgba(255,255,255,0.4)',
                }}
                animate={opening ? { scale: 0, opacity: 0 } : { scale: [1, 1.06, 1] }}
                transition={
                  opening ? { duration: 0.4 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="h-7 w-7 text-cream" fill="currentColor" />
                <span className="pointer-events-none absolute inset-1 rounded-full border border-cream/40" />
              </motion.button>
            </div>
          </div>

          <motion.p
            className="mt-14 text-center font-sans text-[11px] uppercase tracking-[0.3em] text-gold-light/70"
            animate={{ opacity: opening ? 0 : [0.5, 1, 0.5] }}
            transition={opening ? { duration: 0.4 } : { duration: 2.5, repeat: Infinity }}
          >
            Toque no selo para abrir
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
