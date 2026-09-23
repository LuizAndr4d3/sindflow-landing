# SindFlow — Landing Page

Landing page oficial do SindFlow, plataforma de gestão condominial inteligente.
Site estático, single-page, pronto para hospedar em qualquer VPS ou CDN.

## Rodar localmente

```bash
npm install
npm run dev       # servidor de desenvolvimento em http://localhost:5173
npm run build     # build de produção em dist/
npm run preview   # serve o build de produção localmente
```

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v3** com design tokens no `tailwind.config.js`
- **Framer Motion** para reveals, stagger do hero, contadores e micro-interações
- **GSAP + ScrollTrigger** para parallax da torre no hero
- **Lenis** para scroll suave sincronizado com o ScrollTrigger
- **lucide-react** para ícones
- Fontes via Google Fonts: Fraunces (display), Inter (corpo), JetBrains Mono (dados e labels)

## Camada de animações

- Scroll suave (Lenis), desativado com `prefers-reduced-motion`
- Hero: rede de pontos conectados em canvas (pausa fora da viewport), título com
  stagger letra a letra em 3D, parallax de saída, indicador de scroll
- Torre: janelas acendem em sequência, flicker ambiente contínuo, chips de eventos
- Títulos de seção revelados palavra a palavra ao entrar na viewport
- Cards com spotlight que segue o cursor; planos com tilt 3D sutil
- Marquee infinito dos 10 módulos (pausa no hover)
- Nav com scrollspy (seção ativa marcada), barra de progresso e glassmorphism
- Botões magnéticos com física de mola e brilho que atravessa no hover
- Grain cinematográfico global
- Tudo animado só com transform/opacity, interrompível, e com
  `prefers-reduced-motion` respeitado em todas as camadas

## Design system

| Token      | Valor     | Uso                        |
| ---------- | --------- | -------------------------- |
| `midnight` | `#09151A` | Fundo base                 |
| `navy`     | `#10233F` | Fundos secundários         |
| `surface`  | `#16294A` | Superfícies e cards        |
| `azure`    | `#3C6FD6` | Ações primárias            |
| `sky`      | `#609DFF` | Destaques e acentos        |
| `ink`      | `#EAF0F8` | Texto principal            |
| `steel`    | `#8FA6C4` | Texto secundário           |

Assinatura visual: torre de condomínio em line-art no hero, com janelas que
acendem em sequência no carregamento e chips de eventos do painel conectados
por linhas de rede.

## Seções

1. Nav fixa com barra de progresso de scroll, âncoras e CTA para o painel
2. Hero com stagger do título, torre animada e parallax
3. O Problema (3 dores + fecho editorial)
4. A Solução (5 frentes + os 10 módulos da v1.0)
5. Diferenciais (PWA, WhatsApp, segurança, preço) + roadmap discreto
6. Planos (3 níveis como jornada, Pro em destaque)
7. CTA final + rodapé

As seções de Equipe e de números de mercado foram removidas por decisão de
produto: o site fala com o comprador, não com investidores.

## O que foi feito

- Copy oficial em pt-BR, sem travessões, IA citada apenas como roadmap futuro
- Parceiro de pagamentos: FitPay (confirmado)
- Links de painel apontando para https://painel.sindflow.com.br (confirmado)
- Responsivo mobile-first, testado em 390, 768 e 1440 px, sem overflow horizontal
- Acessibilidade: contraste AA, foco visível, navegação por teclado, `aria-label`
  nos elementos gráficos, `prefers-reduced-motion` desativando animações
- Animações apenas com `transform` e `opacity`
- SEO: title, meta description, Open Graph com imagem, favicon, `lang="pt-BR"`

## Assets da marca

Gerados a partir do logo oficial (`logo 3.png`), recortados no símbolo com folga
uniforme e otimizados. Ficam em `public/`:

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `logo-mark.png` | 192px | Marca na nav (exibida a 36px, 4x para telas retina) |
| `favicon-32.png` | 32px | Aba do navegador |
| `favicon-192.png` | 192px | Android e atalho na tela inicial |
| `apple-touch-icon.png` | 180px | Atalho no iOS |
| `og-image.jpg` | 512px | Prévia ao compartilhar o link (WhatsApp, redes) |

Conforme a identidade visual, ícones usam apenas o símbolo, sem o nome.
