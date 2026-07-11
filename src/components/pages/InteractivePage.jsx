import { motion } from 'framer-motion'
import { MapPin, CalendarCheck, Gift, BookOpen } from 'lucide-react'
import PageLayout from './PageLayout'
import { images, interactions } from '../../data/content'

// Mapa nome -> componente de ícone (definido em content.js)
const ICONS = { MapPin, CalendarCheck, Gift, BookOpen }

/**
 * Página 4 — Interativa.
 * Caixa glassmorphism + grid 2x2 de botões circulares.
 * Ao tocar, chama onOpenModal(item) -> o App exibe o Modal por cima.
 *
 * O Modal é controlado pelo App (e não aqui dentro) porque os elementos
 * do react-pageflip recebem transform/overflow, o que quebraria um
 * position:fixed renderizado dentro da página.
 */
export default function InteractivePage({ onOpenModal }) {
  return (
    <PageLayout image={images.interactive} overlay="bg-black/50">
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* Caixa translúcida (glassmorphism) */}
        <div className="glass w-full max-w-sm rounded-3xl px-6 py-8 shadow-soft">
          <h2 className="text-center font-serif text-2xl italic text-white text-shadow-soft">
            Toque nos ícones para interagir
          </h2>
          <div className="gold-divider mx-auto my-5 w-16" />

          {/* Grid 2x2 */}
          <div className="grid grid-cols-2 gap-5">
            {interactions.map((item, i) => {
              const Icon = ICONS[item.icon] ?? MapPin
              return (
                <motion.button
                  key={item.key}
                  onClick={() => onOpenModal(item)}
                  className="flex flex-col items-center gap-3 rounded-2xl p-2 text-center"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                  whileTap={{ scale: 0.92 }}
                >
                  {/* Ícone circular dourado.
                      pointer-events-none nos filhos: garante que o alvo do
                      clique seja o próprio <button>, para o react-pageflip
                      encaminhar o clique (clickEventForward) em vez de tentar
                      virar a página. */}
                  <span
                    className="pointer-events-none flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-white/10"
                    style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.3)' }}
                  >
                    <Icon className="h-7 w-7 text-gold-light" strokeWidth={1.5} />
                  </span>
                  <span className="pointer-events-none font-sans text-[11px] uppercase leading-tight tracking-[0.15em] text-white/90">
                    {item.label}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
