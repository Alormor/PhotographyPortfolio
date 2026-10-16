import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 md:h-28 bg-bg px-5 sm:px-12 md:px-20 flex items-center justify-between">
      {/* Brand: Stacked Clara Menéndez */}
      <a href="#" className="flex flex-col leading-tight group">
        <span className="text-xl sm:text-2xl font-bold text-text">
          Clara
        </span>
        <span className="text-md sm:text-xl uppercase text-muted">
          Menéndez
        </span>
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-12 font-serif">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-2xl text-text hover:text-accent transition-colors"
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-between w-7 h-5 focus:outline-none"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        <span
          className={`block h-0.5 w-full bg-text rounded transition-transform duration-300 ${
            isOpen ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-text rounded transition-opacity duration-300 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-text rounded transition-transform duration-300 ${
            isOpen ? '-translate-y-2.5 -rotate-45' : ''
          }`}
        />
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-surface py-8 shadow-2xl z-40 border-t border-neutral-800">
          <ul className="flex flex-col items-center gap-6 font-serif">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl text-text hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
