import PageLayout from './PageLayout'
import { couple, images, pagesText } from '../../data/content'

/** Página 2 — Save the Date */
export default function SaveTheDatePage() {
  return (
    <PageLayout image={images.saveTheDate} overlay="bg-black/45">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-light text-shadow-soft">
          {pagesText.saveTheDate.subtitle}
        </p>

        <h2 className="mt-4 font-script text-6xl text-white text-shadow-soft">
          {pagesText.saveTheDate.title}
        </h2>

        <div className="gold-divider my-7 w-24" />

        {/* Data em destaque */}
        <p className="font-serif text-3xl italic tracking-wide text-white text-shadow-soft">
          {couple.date}
        </p>

        <p className="mt-10 block w-full text-center font-script text-4xl leading-tight text-gold-light text-shadow-soft">
          {couple.names}
        </p>
      </div>
    </PageLayout>
  )
}
