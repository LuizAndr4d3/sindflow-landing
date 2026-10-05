/** Decorativo (alt vazio): o nome da marca sempre aparece em texto ao lado. */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <img
      src="/logo-mark.webp"
      alt=""
      width={36}
      height={36}
      className={`rounded-[22%] ${className}`}
    />
  )
}

/** "Sind" e "Flow" sem espaço entre eles: na identidade visual é uma palavra só. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display font-medium tracking-tight ${className}`}>
      <span className="text-white">Sind</span>
      <span className="text-flow">Flow</span>
    </span>
  )
}
