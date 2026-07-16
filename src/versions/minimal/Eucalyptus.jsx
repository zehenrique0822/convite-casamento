/**
 * Eucalyptus — ramos de eucalipto desenhados em SVG (sem imagem externa).
 *
 * Cada "sprig" é uma curva de Bézier quadrática (o galho) com folhas em
 * elipse distribuídas ao longo dela, alternando os lados e giradas conforme
 * a tangente da curva — é isso que dá o aspecto orgânico.
 */

const P0 = { x: 0, y: 0 }
const P1 = { x: 46, y: -52 }
const P2 = { x: 118, y: -34 }

const bezier = (t) => ({
  x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * P1.x + t ** 2 * P2.x,
  y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y,
})

const tangentDeg = (t) => {
  const dx = 2 * (1 - t) * (P1.x - P0.x) + 2 * t * (P2.x - P1.x)
  const dy = 2 * (1 - t) * (P1.y - P0.y) + 2 * t * (P2.y - P1.y)
  return (Math.atan2(dy, dx) * 180) / Math.PI
}

// Duas paletas: sobre o cartão claro usamos verdes fechados; sobre o painel
// verde oliva os mesmos tons sumiriam, então clareamos para a folhagem aparecer.
const TONES = {
  onLight: { leaf: ['#828A55', '#5B6236', '#6E7845', '#3E4427'], stem: '#5B6236' },
  onDark: { leaf: ['#D9DEC9', '#A9B37C', '#8C9758', '#6E7845'], stem: '#A9B37C' },
}

function Sprig({ count = 9, transform, opacity = 1, tones }) {
  const leaves = []

  for (let i = 0; i < count; i++) {
    const t = 0.16 + (i / (count - 1)) * 0.84
    const p = bezier(t)
    const angle = tangentDeg(t)
    const side = i % 2 === 0 ? 1 : -1
    const grow = 1 - t * 0.45 // folhas menores na ponta do galho
    const rad = ((angle + side * 90) * Math.PI) / 180

    leaves.push(
      <ellipse
        key={i}
        cx={p.x + Math.cos(rad) * 11}
        cy={p.y + Math.sin(rad) * 11}
        rx={13 * grow}
        ry={9 * grow}
        fill={tones.leaf[i % tones.leaf.length]}
        transform={`rotate(${angle + side * 32} ${p.x + Math.cos(rad) * 11} ${
          p.y + Math.sin(rad) * 11
        })`}
      />
    )
  }

  return (
    <g transform={transform} opacity={opacity}>
      <path
        d={`M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
        fill="none"
        stroke={tones.stem}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {leaves}
    </g>
  )
}

/**
 * Cluster de ramos para decorar um canto.
 * `className` posiciona/dimensiona; `on` escolhe a paleta ('light' = cartão
 * creme, 'dark' = painel verde); `flip` espelha para o canto oposto.
 */
export default function Eucalyptus({ className = '', flip = false, on = 'light' }) {
  const tones = on === 'dark' ? TONES.onDark : TONES.onLight

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <Sprig transform="translate(30 150) rotate(-38) scale(1.05)" opacity={0.95} tones={tones} />
      <Sprig transform="translate(52 172) rotate(-8) scale(0.85)" opacity={0.8} tones={tones} />
      <Sprig transform="translate(18 190) rotate(-66) scale(0.7)" opacity={0.7} tones={tones} />
      <Sprig transform="translate(96 196) rotate(-22) scale(0.6)" opacity={0.55} tones={tones} />
    </svg>
  )
}
