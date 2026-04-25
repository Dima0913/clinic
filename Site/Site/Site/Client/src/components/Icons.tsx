type IconProps = { className?: string }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconLogo({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <path
        {...stroke}
        d="M6 16h6l2-6 4 12 4-12 2 6h6"
      />
    </svg>
  )
}

export function IconMRI({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" {...stroke} />
      <path {...stroke} d="M8 9v6M12 8v8M16 9v6" />
    </svg>
  )
}

export function IconCT({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <ellipse cx="12" cy="12" rx="8" ry="5" {...stroke} />
      <path {...stroke} d="M4 12h16M12 7v10" />
    </svg>
  )
}

export function IconUS({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M8 4v16M8 8h6a4 4 0 010 8H8" />
    </svg>
  )
}

export function IconLab({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M9 3h6l-1 7 4 11H6l4-11-1-7z" />
    </svg>
  )
}

export function IconHeart({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        {...stroke}
        d="M12 21s-7-4.35-7-10a4 4 0 017-2 4 4 0 017 2c0 5.65-7 10-7 10z"
      />
    </svg>
  )
}

export function IconBrain({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        {...stroke}
        d="M12 4c-2 0-3 1.5-3 3.5V9c0 1-1 2-2 2v5c0 1.5 1 2.5 2.5 2.5h5c1.5 0 2.5-1 2.5-2.5v-5c-1 0-2-1-2-2V7.5C15 5.5 14 4 12 4z"
      />
      <path {...stroke} d="M9 14h6M12 11v6" />
    </svg>
  )
}

export function IconShield({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
    </svg>
  )
}

export function IconCell({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="3" {...stroke} />
      <path {...stroke} d="M12 5v2M12 17v2M5 12h2M17 12h2" />
    </svg>
  )
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M5 12l5 5L20 7" />
    </svg>
  )
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        {...stroke}
        d="M6 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 016 5a2 2 0 012-2z"
      />
    </svg>
  )
}

export function IconMail({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" {...stroke} />
      <path {...stroke} d="M3 7l9 6 9-6" />
    </svg>
  )
}

export function IconMap({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M9 3L3 5v16l6-2 6 2 6-2V3l-6 2-6-2zM9 3v16M15 5v16" />
    </svg>
  )
}

export function IconClock({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path {...stroke} d="M12 7v6l4 2" />
    </svg>
  )
}
