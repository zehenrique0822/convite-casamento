/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // >>> FONTE ÚNICA: tudo usa Cormorant Garamond. <<<
      // Antes era Playfair Display, trocada porque o "J" itálico dela é um
      // swash (𝒥) que era lido como "F" — aparecia em "K&J" e em "João".
      // Para REVERTER (às fontes originais ou à Playfair), veja FONTES-BACKUP.md.
      fontFamily: {
        sans: ['"Cormorant Garamond"', 'serif'],
        script: ['"Cormorant Garamond"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        // Paleta do casamento: VERDE OLIVA + DOURADO (com cream/branco de apoio).
        gold: {
          DEFAULT: '#C8A96A',
          light: '#E2CFA6',
          dark: '#A6864A',
        },
        // Verde oliva — tom principal (fundo profundo, detalhes).
        olive: {
          DEFAULT: '#5B6236',
          light: '#828A55',
          dark: '#3E4427',
          deep: '#23261A',
        },
        cream: '#F7F2EA',
        blush: '#EFE3DD',
        sage: '#D9DEC9',
        ink: '#2B2B2B',
      },
      boxShadow: {
        card: '0 20px 50px -12px rgba(0,0,0,0.45)',
        soft: '0 10px 30px -10px rgba(0,0,0,0.25)',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
