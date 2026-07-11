/**
 * PageLayout — moldura base de cada página do convite.
 * Aplica: imagem de fundo + overlay escuro (legibilidade) + moldura dourada.
 *
 * props:
 *  - image: URL da imagem de fundo
 *  - overlay: classe do overlay (padrão bg-black/30)
 *  - children: conteúdo da página
 */
export default function PageLayout({ image, overlay = 'bg-black/30', children }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-olive-deep">
      {/* Imagem de fundo */}
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      )}

      {/* Overlay escuro para legibilidade do texto branco */}
      <div className={`absolute inset-0 ${overlay}`} />
      {/* Vinheta suave para profundidade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Moldura dourada fina */}
      <div className="pointer-events-none absolute inset-3 rounded-sm border border-gold/40" />

      {/* Conteúdo */}
      <div className="relative z-10 flex h-full flex-col px-8 py-12 text-white">{children}</div>
    </div>
  )
}
