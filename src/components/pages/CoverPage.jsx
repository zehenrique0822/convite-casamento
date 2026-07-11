import PageLayout from './PageLayout'
import { couple, images, pagesText } from '../../data/content'

/** Página 1 — Capa */
export default function CoverPage() {
  return (
    <PageLayout image={images.cover} overlay="bg-black/40">
      {/* Topo */}
      <p className="text-center font-sans text-[11px] uppercase leading-relaxed tracking-[0.3em] text-white/90 text-shadow-soft">
        {pagesText.cover.top}
      </p>

      {/* Centro — nomes em script */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <span className="mb-2 h-px w-10 bg-gold/70" />
        <h1 className="w-full text-center font-script text-7xl leading-none text-white text-shadow-soft">
          {couple.names}
        </h1>
        <span className="mt-4 h-px w-10 bg-gold/70" />
      </div>

      {/* Rodapé */}
      <p className="text-center font-sans text-[10px] uppercase tracking-[0.3em] text-gold-light text-shadow-soft">
        {pagesText.cover.bottom}
      </p>
    </PageLayout>
  )
}
