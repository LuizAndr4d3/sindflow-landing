import type { SVGProps } from 'react'

/**
 * Ícone do Instagram no mesmo traço dos ícones do lucide (24px, linha 2). O
 * lucide-react 1.x não traz mais ícones de marcas, por isso ele fica aqui.
 */
export function IconeInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  )
}
