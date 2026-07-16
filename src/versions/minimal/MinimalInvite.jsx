import { motion } from 'framer-motion'
import { MapPin, CalendarCheck, Gift, BookOpen } from 'lucide-react'
import { couple, interactions, minimal } from '../../data/content'
import Eucalyptus from './Eucalyptus'

// Mapa nome -> componente de ícone (o nome vem de content.js)
const ICONS = { MapPin, CalendarCheck, Gift, BookOpen }

/**
 * MinimalInvite — versão nova: UMA única tela com tudo.
 * Fica montada por baixo da SealScreen; quando o selo é aberto, as metades
 * verdes deslizam e revelam este cartão.
 */
export default function MinimalInvite({ onOpenModal, revealed }) {
  // Só anima a entrada depois que o selo abriu.
  const enter = (delay) => ({
    initial: { opacity: 0, y: 14 },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { delay, duration: 0.6, ease: 'easeOut' },
  })

  return (
    <div className="no-select flex h-[100dvh] w-full items-center justify-center p-3">
      <div
        className="relative h-full w-full max-w-[430px] overflow-hidden rounded-lg bg-cream shadow-card"
        style={{ backgroundImage: 'radial-gradient(#00000008 1px, transparent 1px)', backgroundSize: '4px 4px' }}
      >
        {/* Eucalipto no canto superior direito (como na referência) */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 rotate-180">
          <Eucalyptus className="h-full w-full" />
        </div>

        {/* Rola quando não couber; `m-auto` no miolo centraliza sem cortar o topo */}
        <div className="hide-scrollbar relative flex h-full flex-col overflow-y-auto px-7 py-9">
          <div className="m-auto flex w-full flex-col items-center text-center">
          {/* Monograma */}
          <motion.p
            className="font-script text-2xl italic tracking-wide text-olive"
            {...enter(0.05)}
          >
            {minimal.monogram}
          </motion.p>

          {/* Versículo */}
          <motion.div className="mt-7 max-w-[19rem]" {...enter(0.15)}>
            <p className="font-serif text-[13px] italic leading-relaxed text-olive">
              {minimal.verse.text}
            </p>
            <p className="mt-1.5 font-serif text-[12px] italic text-olive/75">
              {minimal.verse.ref}
            </p>
          </motion.div>

          {/* Nomes */}
          <motion.h1
            className="mt-8 whitespace-pre-line font-script text-[2.6rem] italic leading-[1.15] text-olive-dark"
            {...enter(0.25)}
          >
            {couple.names.replace(' & ', '\ne ')}
          </motion.h1>

          {/* Convite */}
          <motion.p
            className="mt-7 max-w-[18rem] whitespace-pre-line font-serif text-[13px] italic leading-relaxed text-ink/70"
            {...enter(0.35)}
          >
            {minimal.intro}
          </motion.p>

          {/* Data */}
          <motion.div className="mt-8" {...enter(0.45)}>
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-olive/80">
              {minimal.when.month}
            </p>
            <div className="mt-2 flex items-center justify-center gap-4">
              <span className="border-y border-olive/30 py-1 font-sans text-[11px] uppercase tracking-[0.15em] text-ink/70">
                {minimal.when.weekday}
              </span>
              <span className="font-serif text-5xl leading-none text-olive-dark">
                {minimal.when.day}
              </span>
              <span className="border-y border-olive/30 py-1 font-sans text-[11px] uppercase tracking-[0.15em] text-ink/70">
                {minimal.when.time}
              </span>
            </div>
            <p className="mt-2 font-sans text-[11px] tracking-[0.3em] text-ink/55">
              {minimal.when.year}
            </p>
          </motion.div>

          {/* Botões interativos — uma linha só, uma coluna por item */}
          <motion.div
            className="mt-9 grid w-full max-w-[21rem] items-start gap-x-2"
            style={{ gridTemplateColumns: `repeat(${interactions.length}, minmax(0, 1fr))` }}
            {...enter(0.55)}
          >
            {interactions.map((item) => {
              const Icon = ICONS[item.icon] ?? MapPin
              return (
                <motion.button
                  key={item.key}
                  onClick={() => onOpenModal(item)}
                  className="flex flex-col items-center gap-2 text-center"
                  whileTap={{ scale: 0.92 }}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-olive to-olive-dark"
                    style={{ boxShadow: '0 5px 14px rgba(0,0,0,0.22)' }}
                  >
                    <Icon className="h-5 w-5 text-cream" strokeWidth={1.6} />
                  </span>
                  <span className="font-serif text-[10px] italic leading-tight text-ink/65">
                    {item.label}
                  </span>
                </motion.button>
              )
            })}
          </motion.div>

          <motion.p
            className="mt-7 font-serif text-[11px] italic text-ink/45"
            {...enter(0.7)}
          >
            {minimal.footer}
          </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}
