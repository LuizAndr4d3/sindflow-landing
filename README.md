# Landing page do SindFlow

Landing page oficial do SindFlow, plataforma de gestão condominial inteligente.
Site estático, single-page, pronto para hospedar em qualquer VPS ou CDN.

## Rodar localmente

Requer Node.js 20.19 ou mais novo (exigência do Vite 8). Confira com `node -v`.

```bash
npm install
npm run dev       # servidor de desenvolvimento em http://localhost:5173
npm run build     # build de produção em dist/
npm run preview   # serve o build de produção localmente
```

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v3** com design tokens no `tailwind.config.js`
- **Framer Motion** para reveals, stagger do hero e micro-interações
- **GSAP + ScrollTrigger** para parallax da torre no hero
- **Lenis** para scroll suave sincronizado com o ScrollTrigger
- **lucide-react** para ícones
- Fontes servidas pelo próprio site em `public/fonts/` (sem Google Fonts): Fraunces
  (display), Inter (corpo) e JetBrains Mono (dados e labels), só o subset latin

## Desempenho (como a página carrega)

- A primeira pintura monta só o menu e o hero. O resto da página fica em
  `src/sections/Restante.tsx`, carregado em paralelo num arquivo separado
- GSAP, ScrollTrigger e Lenis só carregam depois da primeira pintura
  (`src/lib/ocioso.ts`): não são necessários para o conteúdo aparecer
- As fontes do título e do texto são pré-carregadas no `index.html`, o que evita
  o "pulo" do layout quando a fonte chega
- Não escreva prefixos como `-webkit-` à mão no CSS: o autoprefixer já cuida disso.
  Escritos à mão, o minificador do build pode descartar a versão sem prefixo (foi o
  que tirou o desfoque do menu em Chrome e Firefox)

## Camada de animações

- Scroll suave (Lenis), desativado com `prefers-reduced-motion`
- Hero: rede de pontos conectados em canvas (pausa fora da viewport), título com
  stagger palavra a palavra em 3D, parallax de saída, indicador de scroll
- Torre: janelas acendem em sequência, flicker ambiente contínuo, chips de eventos
- Títulos de seção revelados palavra a palavra ao entrar na viewport
- Cards com spotlight que segue o cursor; planos com tilt 3D sutil
- Marquee infinito dos 12 módulos (pausa no hover)
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

1. Nav fixa com barra de progresso de scroll, âncoras e acesso ao app
2. Hero ("Quer uma gestão mais leve?") com stagger do título, torre animada e parallax
3. O Problema (3 dores + fecho editorial)
4. A Solução (5 frentes + os 12 módulos)
5. Diferenciais (PWA, WhatsApp, segurança, preço) + roadmap discreto
6. Planos (Lite, Pro e Max, com o Pro em destaque) + condições comerciais
7. Contato (#contato): WhatsApp, e-mail e agendamento de demonstração
8. Chamada final "Comece hoje"
9. Rodapé com contatos e copyright

As seções de Equipe e de números de mercado foram removidas por decisão de
produto: o site fala com o comprador, não com investidores.

## O que foi feito

- Copy oficial em pt-BR, sem travessões, IA citada apenas como roadmap futuro
- Parceiro de pagamentos: FitPay (confirmado)
- Contatos e links centralizados em `src/config/contato.ts`: número e mensagens do
  WhatsApp, e-mail, site e app (`https://app.sindflow.com.br`). Nenhum componente
  tem número, e-mail ou URL escrito direto; para trocar, edite só esse arquivo
- Os botões "Começar agora" dos planos estão sem destino de propósito: vão apontar
  para a página de vendas, que ainda será criada
- Responsivo mobile-first, testado em 390, 768 e 1440 px, sem overflow horizontal
- Acessibilidade WCAG 2.2 AA verificada com axe-core (zero violações nas três
  larguras): contraste, foco visível, link "Pular para o conteúdo", menu que fecha
  com Esc, alvos de toque de 44px e `prefers-reduced-motion` respeitado
- O azul de destaque em texto pequeno é `text-flow-texto` (#207EEA), 1% mais claro
  que o oficial #1E7BE8, que fica logo abaixo do contraste mínimo nesse tamanho.
  No logotipo o oficial continua valendo
- Animações apenas com `transform` e `opacity`
- SEO: title, meta description, canonical, Open Graph, favicon, `robots.txt`,
  `sitemap.xml` e `lang="pt-BR"`
- Lighthouse: 100 em tudo no desktop; no celular 91 de desempenho e 100 em
  acessibilidade, boas práticas e SEO

## Assets da marca

Gerados a partir do logo oficial (`logo 3.png`), recortados no símbolo com folga
uniforme e otimizados. Ficam em `public/`:

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `logo-mark.webp` | 108px | Marca no menu e no rodapé (1,9 KB) |
| `logo-mark.png` | 192px | Original de onde os outros tamanhos são gerados |
| `favicon.ico` | 32px | Navegadores e robôs que pedem o ícone por esse nome |
| `favicon-32.png` | 32px | Aba do navegador |
| `favicon-192.png` | 192px | Android e atalho na tela inicial |
| `apple-touch-icon.png` | 180px | Atalho no iOS |
| `og-image.jpg` | 512px | Prévia ao compartilhar o link (WhatsApp, redes) |

Conforme a identidade visual, ícones usam apenas o símbolo, sem o nome.
