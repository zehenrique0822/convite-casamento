import { forwardRef, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import HTMLFlipBook from 'react-pageflip'
import { ChevronsRight } from 'lucide-react'

import CoverPage from './pages/CoverPage'
// SaveTheDatePage ocultada a pedido — descomente o import e o <Page> abaixo p/ reativar.
// import SaveTheDatePage from './pages/SaveTheDatePage'
import RomanticPage from './pages/RomanticPage'
import InteractivePage from './pages/InteractivePage'
import ClosingPage from './pages/ClosingPage'

/**
 * Page — wrapper exigido pelo react-pageflip (recebe a ref na raiz).
 * data-density="soft" -> a folha DOBRA como papel (a ponta curva e vira),
 * que é o efeito de livro pedido.
 */
const Page = forwardRef(function Page({ children }, ref) {
  return (
    <div
      ref={ref}
      data-density="soft"
      className="relative h-full w-full overflow-hidden bg-olive-deep"
      // pan-y: o navegador só cuida do scroll vertical; o gesto horizontal
      // fica para o react-pageflip (deixa o arraste para virar bem mais fácil)
      style={{ touchAction: 'pan-y' }}
    >
      {children}
    </div>
  )
})

/**
 * InvitationBook — livreto com efeito real de página de livro virando
 * (react-pageflip / StPageFlip): arraste a partir da borda/canto e a
 * folha dobra e passa. Sem setas — só um indicador discreto.
 */
export default function InvitationBook({ onOpenModal }) {
  const bookRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [hint, setHint] = useState(true)
  const [size, setSize] = useState({ w: 360, h: 560 })
  const [ready, setReady] = useState(false)

  // Detecção própria de swipe -> dispara a virada nativa (flipNext/flipPrev).
  // Assim os dois lados ficam iguais e fáceis (o arraste interno da lib para
  // "frente" exigia pegar o canto, por isso era difícil).
  const swipeRef = useRef({ x: 0, y: 0, t: 0 })
  const movedRef = useRef(false)
  const lockRef = useRef(false)

  const doFlip = (dir) => {
    if (lockRef.current) return
    const pf = bookRef.current?.pageFlip?.()
    if (!pf) return
    if (dir === 'next' && pf.getCurrentPageIndex() >= total - 1) return
    if (dir === 'prev' && pf.getCurrentPageIndex() <= 0) return
    lockRef.current = true
    if (dir === 'next') pf.flipNext()
    else pf.flipPrev()
    setHint(false)
    setTimeout(() => {
      lockRef.current = false
    }, 1150)
  }

  const onPointerDown = (e) => {
    swipeRef.current = { x: e.clientX, y: e.clientY, t: Date.now() }
    movedRef.current = false
  }

  const onPointerUp = (e) => {
    const dx = e.clientX - swipeRef.current.x
    const dy = e.clientY - swipeRef.current.y
    const dt = Date.now() - swipeRef.current.t
    const horizontal = Math.abs(dx) > Math.abs(dy) * 1.3
    // swipe normal (35px) OU flick rápido (movimento curto e veloz)
    if (horizontal && (Math.abs(dx) > 35 || (dt < 250 && Math.abs(dx) > 18))) {
      movedRef.current = true
      doFlip(dx < 0 ? 'next' : 'prev')
    }
  }

  // Se houve swipe, engole o clique para não abrir modal sem querer
  const onClickCapture = (e) => {
    if (movedRef.current) {
      e.stopPropagation()
      e.preventDefault()
      movedRef.current = false
    }
  }

  // Tamanho responsivo (mobile-first). Recria o flipbook ao mudar (key).
  useEffect(() => {
    const compute = () => {
      const w = Math.min(window.innerWidth - 24, 430)
      const h = Math.min(window.innerHeight - 28, Math.round(w * 1.5))
      setSize({ w: Math.round(w), h })
      setReady(true)
    }
    compute()
    window.addEventListener('resize', compute)
    window.addEventListener('orientationchange', compute)
    return () => {
      window.removeEventListener('resize', compute)
      window.removeEventListener('orientationchange', compute)
    }
  }, [])

  const total = 4 // capa, romântica, interativa, fechamento (Save the Date oculta)

  if (!ready) return <div className="h-[100dvh] w-full" />

  return (
    <div className="no-select flex h-[100dvh] w-full items-center justify-center">
      <div
        className="relative overflow-hidden rounded-md"
        // overflow-hidden: corta qualquer página "fantasma" que o react-pageflip
        // posicione fora da caixa do livro (era o bug visual de página duplicada
        // aparecendo embaixo do convite).
        style={{ width: size.w, height: size.h, touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClickCapture={onClickCapture}
      >
        <HTMLFlipBook
          key={`${size.w}x${size.h}`}
          ref={bookRef}
          width={size.w}
          height={size.h}
          size="fixed"
          minWidth={280}
          maxWidth={430}
          minHeight={380}
          maxHeight={760}
          drawShadow={true}
          maxShadowOpacity={0.85}
          flippingTime={1100}
          usePortrait={true}
          showCover={false}
          mobileScrollSupport={false}
          // Arrasto interno desligado: nós detectamos o swipe e chamamos
          // flipNext()/flipPrev() (mesmo efeito, mas fácil nos dois sentidos).
          useMouseEvents={false}
          showPageCorners={false}
          className="rounded-md shadow-card"
          onFlip={(e) => {
            setIndex(e.data)
            setHint(false)
          }}
        >
          <Page>
            <CoverPage />
          </Page>
          {/* Save the Date ocultada a pedido — reative descomentando:
          <Page>
            <SaveTheDatePage />
          </Page> */}
          <Page>
            <RomanticPage />
          </Page>
          <Page>
            <InteractivePage onOpenModal={onOpenModal} />
          </Page>
          <Page>
            <ClosingPage />
          </Page>
        </HTMLFlipBook>

        {/* Indicador discreto de páginas */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-4 bg-gold' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Dica pequena para arrastar como um livro (some após a 1ª virada) */}
        {hint && index === 0 && (
          <motion.div
            className="pointer-events-none absolute bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center justify-center gap-1.5 rounded-full bg-black/35 px-3 py-1.5 text-center backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center"
            >
              <ChevronsRight className="h-4 w-4 text-gold-light" />
            </motion.span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/85">
              arraste para virar
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
