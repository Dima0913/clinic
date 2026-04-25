import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'ГОЛОВНА' },
  { to: '/services', label: 'ПОСЛУГИ' },
  { to: '/about', label: 'ПРО НАС' },
  { to: '/branches', label: 'ФІЛІЇ' },
  { to: '/gallery', label: 'ФОТОГАЛЕРЕЯ' },
  { to: '/prices', label: 'ЦІНИ' },
  { to: '/contacts', label: 'КОНТАКТИ' },
] as const

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="nx-nav-wrap">
      <nav className="nx-nav" aria-label="Головна навігація">
        <Link to="/" className="nx-brand" onClick={close}>
          <div className="nx-logo">
            <img src="/logo.png" alt="" width={40} height={40} />
          </div>
          <div className="nx-brand-text">
            <span className="nx-brand-name">ЖИТТЯ без варикозу</span>
          </div>
        </Link>

        <ul className="nx-menu">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => (isActive ? 'nx-active' : undefined)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nx-nav-actions">
          <Link to="/contacts#booking" className="nx-btn-cta" onClick={close}>
            ЗАПИСАТИСЬ
          </Link>
          <button
            type="button"
            className="nx-menu-toggle"
            aria-expanded={open}
            aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '×' : '≡'}
          </button>
        </div>
      </nav>

      <div
        className={`nx-mobile-overlay${open ? ' is-open' : ''}`}
        onClick={close}
        onKeyDown={(e) => e.key === 'Escape' && close()}
        role="presentation"
      >
        <div className="nx-mobile-drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
          <ul>
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => (isActive ? 'nx-active' : undefined)}
                  onClick={close}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contacts#booking" className="nx-btn-cta" onClick={close}>
            ЗАПИСАТИСЬ
          </Link>
        </div>
      </div>
    </header>
  )
}
