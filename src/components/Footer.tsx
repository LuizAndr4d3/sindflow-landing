const produtoLinks = [
  { label: 'Problema', href: '/#problema' },
  { label: 'Solução', href: '/#solucao' },
  { label: 'Planos', href: '/#planos' },
  { label: 'Contato', href: '/#contato' },
]

const legalLinks = [
  { label: 'Termos de Uso', href: '/termos-de-uso' },
  { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[rgba(96,157,255,0.14)]">
      <div className="mx-auto max-w-wrap px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <a href="/" className="flex items-center gap-2.5" aria-label="SindFlow, ir para a página inicial">
              <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
                <rect width="32" height="32" rx="7" fill="#10233F" />
                <rect x="9" y="7" width="14" height="19" rx="1.5" fill="none" stroke="#609DFF" strokeWidth="1.6" />
                <rect x="12.2" y="10.5" width="3" height="3" fill="#609DFF" />
                <rect x="17" y="10.5" width="3" height="3" fill="#2c4a7c" />
                <rect x="12.2" y="15.5" width="3" height="3" fill="#2c4a7c" />
                <rect x="17" y="15.5" width="3" height="3" fill="#609DFF" />
                <rect x="14.5" y="20.5" width="3.4" height="5.5" fill="#3C6FD6" />
              </svg>
              <span className="font-display text-xl font-medium tracking-tight text-ink">SindFlow</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel">
              Gestão condominial inteligente: comunicação, documentos, obrigações legais e
              financeiro em um só lugar.
            </p>
          </div>

          <div>
            <p className="eyebrow">Produto</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {produtoLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-steel transition-colors duration-200 hover:text-sky">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Legal</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-steel transition-colors duration-200 hover:text-sky">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:contato@sindflow.com.br"
                  className="text-sm text-steel transition-colors duration-200 hover:text-sky"
                >
                  contato@sindflow.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[rgba(96,157,255,0.14)] pt-8 text-xs text-steel/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} SindFlow. Todos os direitos reservados.</p>
          <p className="font-mono">sindflow.com.br</p>
        </div>
      </div>
    </footer>
  )
}
