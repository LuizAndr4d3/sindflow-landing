import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300 ease-out will-change-transform active:scale-[0.97]'

const variants = {
  primary:
    'btn-shine bg-azure text-white shadow-[0_8px_30px_rgba(60,111,214,0.35)] hover:-translate-y-0.5 hover:bg-sky hover:text-midnight hover:shadow-[0_12px_40px_rgba(96,157,255,0.45)]',
  ghost:
    'border border-[rgba(96,157,255,0.25)] text-ink hover:-translate-y-0.5 hover:border-sky hover:bg-[rgba(96,157,255,0.08)]',
}

export function Button({ children, variant = 'primary', className = '', ...rest }: ButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  )
}
