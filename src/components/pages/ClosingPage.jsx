import { Heart } from 'lucide-react'
import PageLayout from './PageLayout'
import { images, pagesText } from '../../data/content'

/** Página 5 — Encerramento */
export default function ClosingPage() {
  return (
    <PageLayout image={images.closing} overlay="bg-black/45">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Heart className="mb-6 h-8 w-8 text-gold-light" fill="currentColor" />
        <h2 className="font-script text-6xl leading-tight text-white text-shadow-soft">
          {pagesText.closing.title}
        </h2>
        <div className="gold-divider my-7 w-24" />
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-light text-shadow-soft">
          {pagesText.closing.subtitle}
        </p>
      </div>
    </PageLayout>
  )
}
