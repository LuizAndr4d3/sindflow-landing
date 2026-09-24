import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Problema', href: '#problema', id: 'problema' },
  { label: 'Solução', href: '#solucao', id: 'solucao' },
  { label: 'Planos', href: '#planos', id: 'planos' },
  { label: 'Contato', href: '#contato', id: 'contato' },
]

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5" aria-label="SindFlow, voltar ao topo">
      <img
        src="/logo-mark.png"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 rounded-[0.5rem]"
        aria-hidden="true"
      />
      <span className="font-display text-xl font-medium tracking-tight text-ink">SindFlow</span>
    </a>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    let ticking = false
    const update = () => {
      setScrolled(window.scrollY > 24)
      const probe = window.scrollY + 140
      let current = ''
      for (const link of links) {
        const el = document.getElementById(link.id)
        if (el && el.offsetTop <= probe) current = link.id
      }
      setActive(current)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'glass border-b border-[rgba(96,157,255,0.14)]' : 'bg-transparent'
      }`}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-azure to-sky"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <nav className="mx-auto flex h-[4.5rem] max-w-wrap items-center justify-between px-5 sm:px-8">
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                aria-current={active === link.id ? 'true' : undefined}
                className={`text-sm transition-colors duration-200 hover:text-ink ${
                  active === link.id ? 'text-ink' : 'text-steel'
                }`}
              >
                {link.label}
              </a>
              <span
                className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-sky transition-all duration-300 ${
                  active === link.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://app.sindflow.com.br"
            className="rounded-full border border-[rgba(96,157,255,0.25)] px-5 py-2 text-sm text-ink transition-all duration-200 hover:border-sky hover:bg-[rgba(96,157,255,0.08)]"
          >
            Entrar
          </a>
          <a
            href="https://app.sindflow.com.br"
            className="btn-shine rounded-full bg-azure px-5 py-2 text-sm font-medium text-ink transition-all duration-200 hover:bg-sky hover:text-midnight"
          >
            Acessar painel
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="glass border-b border-[rgba(96,157,255,0.14)] px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-base text-ink transition-colors hover:bg-[rgba(96,157,255,0.08)]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://app.sindflow.com.br"
            className="mt-4 block rounded-full bg-azure px-5 py-3 text-center text-sm font-medium text-ink"
          >
            Acessar painel
          </a>
        </div>
      ) : null}
    </header>
  )
}
