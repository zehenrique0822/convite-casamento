import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
