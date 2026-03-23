import { useState } from 'react'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import logo from '../assets/logomarca.png'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import type { Lang } from '../i18n/translations'

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: 'pt-PT', flag: '\u{1F1F5}\u{1F1F9}', label: 'PT' },
  { code: 'en',    flag: '\u{1F1FA}\u{1F1F8}', label: 'EN' },
  { code: 'de',    flag: '\u{1F1E9}\u{1F1EA}', label: 'DE' },
  { code: 'fr',    flag: '\u{1F1EB}\u{1F1F7}', label: 'FR' },
]

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const handleUnidadesClick = () => {
    alert(t.navbar.storesAlert)
    setMenuOpen(false)
  }

  const currentLang = LANGS.find(l => l.code === lang) ?? LANGS.find(l => l.code === 'pt-PT') ?? LANGS[0]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#008B91] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
        >
          <img src={logo} alt="Europhear" className="h-10 w-auto" />
          <span className="text-xl font-bold text-white">{t.navbar.brand}</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-8 text-white font-medium">
          <Link to="/" className="hover:scale-105 transition-transform duration-200">
            {t.navbar.home}
          </Link>
          <Link to="/garantia" className="hover:scale-105 transition-transform duration-200">
            {t.navbar.warranty}
          </Link>
          <Link to="/rastreio" className="hover:scale-105 transition-transform duration-200">
            {t.navbar.tracking}
          </Link>
          <button onClick={handleUnidadesClick} className="hover:scale-105 transition-transform duration-200">
            {t.navbar.stores}
          </button>
        </nav>

        {/* Right side: WhatsApp + Language switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(v => !v)}
              className="flex items-center gap-1 bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition"
            >
              <span>{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <FiChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-50 min-w-[120px]">
                {LANGS.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition hover:bg-gray-100 ${lang === l.code ? 'font-bold text-[#008B91]' : 'text-gray-700'}`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://tawk.to/chat/69bf5403977ac51c36884631/1jk9m0bi0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#008B91] px-4 py-2 rounded font-semibold hover:scale-105 hover:shadow transition-transform duration-200"
          >
            {t.navbar.whatsapp}
          </a>
        </div>

        {/* Mobile: lang + menu icon */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mini language selector for mobile */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(v => !v)}
              className="flex items-center gap-1 text-white text-sm font-semibold"
            >
              <span>{currentLang.flag}</span>
              <FiChevronDown size={12} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-50 min-w-[100px]">
                {LANGS.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-100 ${lang === l.code ? 'font-bold text-[#008B91]' : 'text-gray-700'}`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={26} color="white" /> : <FiMenu size={26} color="white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#008B91] px-6 py-4 space-y-4 text-white font-medium shadow-md">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">
            {t.navbar.home}
          </Link>
          <Link to="/garantia" onClick={() => setMenuOpen(false)} className="block">
            {t.navbar.warranty}
          </Link>
          <Link to="/rastreio" onClick={() => setMenuOpen(false)} className="block">
            {t.navbar.tracking}
          </Link>
          <button onClick={handleUnidadesClick} className="block">
            {t.navbar.stores}
          </button>
          <a
            href="https://tawk.to/chat/69bf5403977ac51c36884631/1jk9m0bi0"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white text-[#008B91] px-4 py-2 rounded font-semibold text-center"
          >
            {t.navbar.whatsapp}
          </a>
        </div>
      )}
    </header>
  )
}

