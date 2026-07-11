import PageLayout from './PageLayout'
import { images, pagesText } from '../../data/content'

/** Página 3 — Romântica (foto do casal + versículo no rodapé) */
export default function RomanticPage() {
  return (
    <PageLayout image={images.romantic} overlay="bg-black/35">
      <div className="flex-1" />

      {/* Versículo / texto romântico no rodapé */}
      <div className="text-center">
        <span className="mx-auto mb-5 block h-px w-12 bg-gold/70" />
        <p className="font-serif text-xl italic leading-relaxed text-white text-shadow-soft">
          {pagesText.romantic.quote}
        </p>
        <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.3em] text-gold-light text-shadow-soft">
          {pagesText.romantic.ref}
        </p>
      </div>
    </PageLayout>
  )
}
