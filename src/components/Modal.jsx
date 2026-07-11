import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Copy, Check, Send, MapPin, Navigation } from 'lucide-react'
import { couple } from '../data/content'

/* ============================================================
 *  Modal / Bottom Sheet animado (controlado pelo App).
 *  Renderiza um conteúdo diferente conforme data.type:
 *    'maps' | 'rsvp' | 'pix' | 'guide'  (fallback: texto simples)
 * ============================================================ */
export default function Modal({ open, onClose, data }) {
  return (
    <AnimatePresence>
      {open && data && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={data.title}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-t-3xl bg-cream shadow-card sm:rounded-3xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose()
            }}
          >
            {/* Alça de arraste */}
            <div className="flex justify-center pt-3">
              <span className="h-1.5 w-12 rounded-full bg-ink/15" />
            </div>

            {/* Fechar */}
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink/60 transition hover:bg-ink/10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="hide-scrollbar max-h-[78vh] overflow-y-auto px-7 pb-9 pt-5">
              <h3 className="font-serif text-3xl italic text-ink">{data.title}</h3>
              <div className="gold-divider my-4 w-16" />
              <ModalBody data={data} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Seleciona o corpo conforme o tipo ---------- */
function ModalBody({ data }) {
  switch (data.type) {
    case 'maps':
      return <MapsContent data={data} />
    case 'rsvp':
      return <RsvpContent data={data} />
    case 'pix':
      return <PixContent data={data} />
    case 'guide':
      return <GuideContent data={data} />
    default:
      return <p className="font-sans text-[15px] leading-relaxed text-ink/75">{data.body}</p>
  }
}

/* ============================================================
 *  COMO CHEGAR — mapa embutido (sem chave de API)
 * ============================================================ */
function MapsContent({ data }) {
  // Suporta vários locais (cerimônia + jantar). Se vier no formato antigo
  // (venueName/address/mapsQuery soltos), monta uma lista de 1 item.
  const venues =
    data.venues && data.venues.length
      ? data.venues
      : [
          {
            name: data.venueName,
            address: data.address,
            mapsQuery: data.mapsQuery,
          },
        ]

  return (
    <div className="space-y-6">
      {venues.map((v, i) => (
        <VenueBlock key={i} venue={v} />
      ))}

      {data.note && (
        <p className="font-sans text-sm leading-relaxed text-ink/65">{data.note}</p>
      )}
    </div>
  )
}

/* Um local: título + endereço + horário + mapa embutido + botão do Maps */
function VenueBlock({ venue }) {
  const query = encodeURIComponent(venue.mapsQuery || venue.address || '')
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`
  const openSrc = `https://www.google.com/maps/search/?api=1&query=${query}`

  return (
    <div>
      {venue.name && (
        <p className="font-sans text-base font-semibold text-ink">{venue.name}</p>
      )}
      {venue.address && (
        <p className="mt-1 flex items-start gap-1.5 font-sans text-sm text-ink/70">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
          {venue.address}
        </p>
      )}
      {venue.time && (
        <p className="mt-1 font-sans text-xs font-medium uppercase tracking-wide text-gold-dark">
          {venue.time}
        </p>
      )}

      <div className="mt-3 overflow-hidden rounded-2xl border border-ink/10 shadow-soft">
        <iframe
          title={`Mapa — ${venue.name || 'local'}`}
          src={embedSrc}
          className="h-48 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <a
        href={openSrc}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 font-sans text-[12px] uppercase tracking-[0.2em] text-white shadow-soft transition active:scale-95"
      >
        <Navigation className="h-4 w-4" />
        Abrir no Google Maps
      </a>
    </div>
  )
}

/* ============================================================
 *  CONFIRMAR PRESENÇA — envia pelo WhatsApp (sem backend)
 *  Guarda a última confirmação no localStorage do aparelho.
 * ============================================================ */
const RSVP_STORAGE_KEY = 'convite:rsvp'

function RsvpContent({ data }) {
  const saved = readRsvp()
  const [name, setName] = useState(saved?.name || '')
  const [guests, setGuests] = useState(saved?.guests || '1')
  const [attending, setAttending] = useState(saved?.attending || 'sim')
  const [message, setMessage] = useState(saved?.message || '')
  const [sent, setSent] = useState(!!saved)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    const text =
      `*Confirmação de presença — Casamento ${couple.names}*\n` +
      `Nome: ${name}\n` +
      `Vou comparecer: ${attending === 'sim' ? 'Sim ✅' : 'Não 😢'}\n` +
      (attending === 'sim' ? `Nº de convidados: ${guests}\n` : '') +
      (message ? `Recado: ${message}\n` : '')

    // Salva no aparelho e abre o WhatsApp já com a mensagem pronta
    writeRsvp({ name, guests, attending, message })
    setSent(true)
    const url = `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-sans text-sm leading-relaxed text-ink/70">{data.intro}</p>
      {data.deadline && (
        <p className="mt-1 font-sans text-xs font-medium uppercase tracking-wide text-gold-dark">
          Confirme até {data.deadline}
        </p>
      )}

      {sent && (
        <p className="mt-4 rounded-xl bg-sage/40 px-4 py-2 font-sans text-sm text-ink/75">
          ✅ Confirmação registrada neste aparelho. Você pode reenviar se algo mudar.
        </p>
      )}

      <div className="mt-4 space-y-3">
        <Field label="Seu nome">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome completo"
            className="input"
            required
          />
        </Field>

        <Field label="Você vai?">
          <div className="flex gap-2">
            {[
              ['sim', 'Sim, eu vou!'],
              ['nao', 'Não poderei'],
            ].map(([val, lbl]) => (
              <button
                type="button"
                key={val}
                onClick={() => setAttending(val)}
                className={`flex-1 rounded-xl border px-3 py-2.5 font-sans text-sm transition ${
                  attending === val
                    ? 'border-gold bg-gold/15 text-ink'
                    : 'border-ink/15 text-ink/60'
                }`}
              >
                {lbl}
              </button>
            ))}
          </div>
        </Field>

        {attending === 'sim' && (
          <Field label="Quantas pessoas (incluindo você)">
            <input
              type="number"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="input"
            />
          </Field>
        )}

        <Field label="Recado aos noivos (opcional)">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder="Deixe um carinho..."
            className="input resize-none"
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3.5 font-sans text-[12px] uppercase tracking-[0.2em] text-white shadow-soft transition active:scale-95"
      >
        <Send className="h-4 w-4" />
        Enviar pelo WhatsApp
      </button>
    </form>
  )
}

function readRsvp() {
  try {
    return JSON.parse(localStorage.getItem(RSVP_STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}
function writeRsvp(v) {
  try {
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(v))
  } catch {
    /* ignora se o storage estiver indisponível */
  }
}

/* ============================================================
 *  PRESENTE — PIX (chave + Copia e Cola gerado no navegador)
 * ============================================================ */
function PixContent({ data }) {
  return (
    <div>
      <p className="font-sans text-sm leading-relaxed text-ink/70">{data.intro}</p>

      <div className="mt-4 rounded-2xl border border-gold/30 bg-white/60 p-4">
        <p className="font-sans text-[11px] uppercase tracking-wider text-ink/50">Chave PIX</p>
        <p className="mt-0.5 break-all font-sans text-base font-semibold text-ink">
          {data.pixKey}
        </p>
        <CopyButton value={data.pixKey} label="Copiar chave" />
      </div>

      {data.giftListUrl && (
        <a
          href={data.giftListUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-center gap-2 rounded-full border border-gold/50 px-6 py-3 font-sans text-[12px] uppercase tracking-[0.2em] text-gold-dark transition active:scale-95"
        >
          Ver lista de presentes
          <ExternalLink className="h-4 w-4" />
        </a>
      )}

      <p className="mt-4 text-center font-sans text-xs text-ink/45">
        Em nome de {data.pixName}
      </p>
    </div>
  )
}

/* ============================================================
 *  MANUAL DOS CONVIDADOS — seções de texto
 * ============================================================ */
function GuideContent({ data }) {
  return (
    <div className="space-y-4">
      {(data.sections || []).map((s, i) => (
        <div key={i}>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark">
            {s.heading}
          </p>
          <p className="mt-0.5 font-sans text-sm leading-relaxed text-ink/75">{s.text}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------- Helpers de UI ---------- */
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block font-sans text-[11px] uppercase tracking-wide text-ink/50">
        {label}
      </span>
      {children}
    </label>
  )
}

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* navegadores sem clipboard: usuário copia manualmente */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="mt-2 flex items-center gap-1.5 font-sans text-[12px] font-medium text-gold-dark transition active:scale-95"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copiado!' : label}
    </button>
  )
}
