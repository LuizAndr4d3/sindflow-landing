import type { IncomingMessage, ServerResponse } from 'node:http'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Durante `vite dev` e `vite preview`, o Vite sempre cai de volta para o
 * index.html da raiz quando a URL não bate exatamente com um arquivo — o
 * que impede o acesso direto (ou por link) às páginas de um site
 * multi-página como este. Este plugin reescreve a URL para o index.html
 * correto antes que esse fallback padrão entre em ação.
 */
function mpaRoutes(): Plugin {
  const routes: Record<string, string> = {
    '/termos-de-uso': '/termos-de-uso/index.html',
    '/politica-de-privacidade': '/politica-de-privacidade/index.html',
  }

  const middleware =
    () => (req: IncomingMessage, _res: ServerResponse, next: () => void) => {
      const url = req.url?.split('?')[0]?.replace(/\/$/, '')
      if (url && routes[url]) {
        req.url = routes[url]
      }
      next()
    }

  return {
    name: 'mpa-routes',
    configureServer(server) {
      server.middlewares.use(middleware())
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware())
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mpaRoutes()],
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        termosDeUso: resolve(__dirname, 'termos-de-uso/index.html'),
        politicaDePrivacidade: resolve(__dirname, 'politica-de-privacidade/index.html'),
      },
    },
  },
})
