import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const pagina = (caminho: string) => fileURLToPath(new URL(caminho, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __ANO_BUILD__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    // sem isto o build só gera a página inicial, e as páginas legais dão 404 no site publicado
    rolldownOptions: {
      input: {
        main: pagina('./index.html'),
        termos: pagina('./termos-de-uso/index.html'),
        privacidade: pagina('./politica-de-privacidade/index.html'),
      },
    },
  },
})
