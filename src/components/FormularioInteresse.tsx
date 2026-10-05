import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import { LEAD_ENDPOINT, MENSAGEM_GERAL, NOVA_ABA, whatsappLink } from '../config/contato'

const PLANOS = ['Lite', 'Pro', 'Max', 'Ainda não sei'] as const
const CANAIS = ['WhatsApp', 'Ligação', 'E-mail'] as const
const HORARIOS = ['Manhã', 'Tarde', 'Noite', 'Qualquer horário'] as const

type Estado = 'preenchendo' | 'enviando' | 'enviado' | 'erro'

function mascaraTelefone(valor: string) {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const campo =
  'w-full rounded-xl border border-[rgba(96,157,255,0.2)] bg-midnight/60 px-4 py-3 text-sm text-ink placeholder:text-steel/60 transition-colors focus:border-sky focus:outline-none'

function Rotulo({ children, obrigatorio }: { children: ReactNode; obrigatorio?: boolean }) {
  return (
    <span className="mb-1.5 block text-xs font-medium text-steel">
      {children}
      {obrigatorio ? <span className="text-sky"> *</span> : null}
    </span>
  )
}

function Opcoes<T extends string>({
  opcoes,
  valor,
  onChange,
  rotulo,
}: {
  opcoes: readonly T[]
  valor: T | ''
  onChange: (v: T | '') => void
  rotulo: string
}) {
  return (
    <div role="radiogroup" aria-label={rotulo} className="flex flex-wrap gap-2">
      {opcoes.map((op) => {
        const ativo = valor === op
        return (
          <button
            key={op}
            type="button"
            role="radio"
            aria-checked={ativo}
            onClick={() => onChange(ativo ? '' : op)}
            className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
              ativo
                ? 'border-sky bg-[rgba(96,157,255,0.15)] text-ink'
                : 'border-[rgba(96,157,255,0.2)] text-steel hover:border-sky/60 hover:text-ink'
            }`}
          >
            {op}
          </button>
        )
      })}
    </div>
  )
}

export default function FormularioInteresse({
  planoInicial,
  onClose,
}: {
  planoInicial?: string
  onClose: () => void
}) {
  const reduzir = useReducedMotion()
  const primeiroCampo = useRef<HTMLInputElement>(null)

  const [estado, setEstado] = useState<Estado>('preenchendo')
  const [erro, setErro] = useState('')

  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [condominio, setCondominio] = useState('')
  const [cidade, setCidade] = useState('')
  const [blocos, setBlocos] = useState('')
  const [unidades, setUnidades] = useState('')
  const [plano, setPlano] = useState<(typeof PLANOS)[number] | ''>(
    PLANOS.includes(planoInicial as (typeof PLANOS)[number])
      ? (planoInicial as (typeof PLANOS)[number])
      : '',
  )
  const [canal, setCanal] = useState<(typeof CANAIS)[number] | ''>('WhatsApp')
  const [horario, setHorario] = useState<(typeof HORARIOS)[number] | ''>('')
  const [mensagem, setMensagem] = useState('')
  const [website, setWebsite] = useState('') // honeypot

  // trava o scroll da página, foca o primeiro campo e fecha com Esc
  useEffect(() => {
    const anterior = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    primeiroCampo.current?.focus()
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', tecla)
    return () => {
      document.documentElement.style.overflow = anterior
      window.removeEventListener('keydown', tecla)
    }
  }, [onClose])

  const enviar = async (e: FormEvent) => {
    e.preventDefault()
    setErro('')

    const digitos = whatsapp.replace(/\D/g, '')
    if (!nome.trim() || !email.trim() || !condominio.trim()) {
      setErro('Preencha os campos obrigatórios.')
      return
    }
    if (digitos.length < 10) {
      setErro('Informe o WhatsApp com DDD.')
      return
    }

    setEstado('enviando')
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          whatsapp: digitos,
          email,
          nome_condominio: condominio,
          cidade,
          qtd_blocos: blocos ? Number(blocos) : null,
          qtd_unidades: unidades ? Number(unidades) : null,
          plano: plano || null,
          canal_preferido: canal || null,
          melhor_horario: horario || null,
          mensagem,
          website,
        }),
      })
      const corpo = await res.json().catch(() => null)
      if (!res.ok || !corpo?.ok) {
        throw new Error(corpo?.error ?? 'Não foi possível enviar agora.')
      }
      setEstado('enviado')
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível enviar agora.')
      setEstado('erro')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      data-lenis-prevent
    >
      <motion.div
        className="absolute inset-0 bg-midnight/80 backdrop-blur-sm"
        initial={reduzir ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="formulario-titulo"
        className="glass relative flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl border border-[rgba(96,157,255,0.25)] shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:rounded-3xl"
        initial={reduzir ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[rgba(96,157,255,0.14)] px-6 py-5 sm:px-8">
          <div>
            <p className="eyebrow">Começar agora</p>
            <h2 id="formulario-titulo" className="mt-2 font-display text-2xl font-medium text-ink">
              {estado === 'enviado' ? 'Recebemos seu contato!' : 'Fale com a gente'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-steel transition-colors hover:bg-[rgba(96,157,255,0.1)] hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {estado === 'enviado' ? (
          <div className="flex flex-col items-center px-6 py-12 text-center sm:px-8">
            <CheckCircle2 className="h-14 w-14 text-sky" aria-hidden="true" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-steel">
              Obrigado, {nome.split(' ')[0]}. Nossa equipe vai entrar em contato
              {canal ? ` por ${canal.toLowerCase()}` : ''} para apresentar o SindFlow
              {plano && plano !== 'Ainda não sei' ? ` e o plano ${plano}` : ''}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-azure px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-sky hover:text-midnight"
            >
              Voltar ao site
            </button>
          </div>
        ) : (
          <form onSubmit={enviar} className="overflow-y-auto px-6 py-6 sm:px-8" noValidate>
            <p className="mb-6 text-sm leading-relaxed text-steel">
              Conte um pouco sobre o seu condomínio. Retornamos em até 1 dia útil.
            </p>

            {/* honeypot: invisível para pessoas */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden="true"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <Rotulo obrigatorio>Seu nome</Rotulo>
                <input ref={primeiroCampo} className={campo} value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" maxLength={120} required />
              </label>
              <label>
                <Rotulo obrigatorio>WhatsApp</Rotulo>
                <input className={campo} value={whatsapp} onChange={(e) => setWhatsapp(mascaraTelefone(e.target.value))} placeholder="(00) 00000-0000" inputMode="tel" autoComplete="tel" required />
              </label>
              <label>
                <Rotulo obrigatorio>E-mail</Rotulo>
                <input className={campo} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" maxLength={160} required />
              </label>

              <label className="sm:col-span-2">
                <Rotulo obrigatorio>Nome do condomínio</Rotulo>
                <input className={campo} value={condominio} onChange={(e) => setCondominio(e.target.value)} maxLength={160} required />
              </label>
              <label className="sm:col-span-2">
                <Rotulo>Cidade / UF</Rotulo>
                <input className={campo} value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Ex.: Montes Claros/MG" maxLength={120} />
              </label>
              <label>
                <Rotulo>Quantidade de blocos</Rotulo>
                <input className={campo} type="number" min={1} value={blocos} onChange={(e) => setBlocos(e.target.value)} inputMode="numeric" />
              </label>
              <label>
                <Rotulo>Quantidade de unidades</Rotulo>
                <input className={campo} type="number" min={1} value={unidades} onChange={(e) => setUnidades(e.target.value)} inputMode="numeric" />
              </label>

              <div className="sm:col-span-2">
                <Rotulo>Plano de interesse</Rotulo>
                <Opcoes opcoes={PLANOS} valor={plano} onChange={setPlano} rotulo="Plano de interesse" />
              </div>
              <div className="sm:col-span-2">
                <Rotulo>Como prefere ser contatado?</Rotulo>
                <Opcoes opcoes={CANAIS} valor={canal} onChange={setCanal} rotulo="Como prefere ser contatado" />
              </div>
              <div className="sm:col-span-2">
                <Rotulo>Melhor horário</Rotulo>
                <Opcoes opcoes={HORARIOS} valor={horario} onChange={setHorario} rotulo="Melhor horário" />
              </div>

              <label className="sm:col-span-2">
                <Rotulo>Quer contar algo mais?</Rotulo>
                <textarea className={`${campo} min-h-[88px] resize-y`} value={mensagem} onChange={(e) => setMensagem(e.target.value)} maxLength={1000} />
              </label>
            </div>

            {erro ? (
              <p className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
                {erro}
                {estado === 'erro' ? (
                  <>
                    {' '}Se preferir,{' '}
                    <a href={whatsappLink(MENSAGEM_GERAL)} {...NOVA_ABA} className="underline">
                      fale com a gente no WhatsApp
                    </a>
                    .
                  </>
                ) : null}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={estado === 'enviando'}
              className="btn-shine mt-6 w-full rounded-full bg-azure px-7 py-3.5 text-sm font-medium text-white shadow-[0_8px_30px_rgba(60,111,214,0.35)] transition-all duration-300 hover:bg-sky hover:text-midnight disabled:opacity-60"
            >
              {estado === 'enviando' ? 'Enviando...' : 'Quero ser contatado'}
            </button>
            <p className="mt-3 text-center text-[0.6875rem] text-steel/80">
              Usamos seus dados só para entrar em contato sobre o SindFlow. Veja a{' '}
              <a href="/politica-de-privacidade/" className="underline">
                Política de Privacidade
              </a>
              .
            </p>
          </form>
        )}
      </motion.div>
    </div>
  )
}
