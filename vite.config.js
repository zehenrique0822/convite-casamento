import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serve o site em https://<usuario>.github.io/convite-casamento/,
  // ou seja, num subcaminho — sem isso os assets (JS/CSS) quebram no ar.
  // Se um dia usar domínio próprio na raiz, troque para '/'.
  base: '/convite-casamento/',
  server: {
    host: true, // expõe na rede local (0.0.0.0) p/ acessar pelo celular
    port: 5173,
    strictPort: true,
    // Libera domínios de túnel (cloudflared/ngrok/localtunnel) — só dev/demo
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  },
})
