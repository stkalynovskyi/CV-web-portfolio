import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const linksDict = {
  es: [
    { label: 'Sobre mí',   href: '/sobre-mi'  },
    { label: 'Currículum', href: '/curriculum' },
    { label: 'Proyectos',  href: '/proyectos'  },
    { label: 'Contacto',   href: '/contacto'   },
  ],
  en: [
    { label: 'About',    href: '/en/about'    },
    { label: 'Resume',   href: '/en/resume'   },
    { label: 'Projects', href: '/en/projects' },
    { label: 'Contact',  href: '/en/contact'  },
  ]
};

const routeMap = {
  '/': '/en',
  '/sobre-mi': '/en/about',
  '/curriculum': '/en/resume',
  '/proyectos': '/en/projects',
  '/contacto': '/en/contact',
};
const getAltRoute = (activePage, lang) => {
  if (lang === 'es') {
    return routeMap[activePage] || '/en';
  } else {
    const esRoute = Object.keys(routeMap).find(key => routeMap[key] === activePage);
    return esRoute || '/';
  }
};

export default function Navbar({ activePage = '', lang = 'es' }) {
  const currentLinks = linksDict[lang] || linksDict.es;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const altRoute = getAltRoute(activePage, lang);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(6,6,9,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        padding: scrolled ? '0.875rem 0' : '1.25rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href={lang === 'en' ? '/en' : '/'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '1.1rem',
            letterSpacing: '0.12em',
            color: 'var(--text-1)',
          }}>
            [<span style={{ color: 'var(--cyan)' }}>SK</span>]
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}
             className="desktop-nav">
          {currentLinks.map((link) => {
            const isActive = activePage === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--cyan)' : 'var(--text-2)',
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                  transition: 'color 0.2s',
                  position: 'relative',
                  paddingBottom: '2px',
                  borderBottom: isActive ? '1px solid var(--cyan)' : '1px solid transparent',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-1)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-2)'; }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={altRoute}
            style={{
              fontSize: '0.75rem', fontWeight: 700,
              color: 'var(--text-3)', textDecoration: 'none',
              letterSpacing: '0.05em', transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </a>

          <a
            href="/Stanislav_Kalynovskyi_CV.pdf"
            download="Stanislav_Kalynovskyi_CV.pdf"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.55rem 1.25rem',
              fontSize: '0.78rem', fontWeight: 600,
              color: 'var(--cyan)',
              border: '1px solid rgba(0,245,255,0.3)',
              borderRadius: '8px',
              background: 'rgba(0,245,255,0.05)',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.05)'; }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {lang === 'es' ? 'Descargar CV' : 'Download CV'}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-nav"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: 'var(--text-2)', alignItems: 'center' }}
          aria-label="Menú"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', background: 'rgba(6,6,9,0.96)' }}
          >
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '0', paddingTop: '0.5rem', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <a
                  href={altRoute}
                  style={{
                    fontSize: '0.8rem', fontWeight: 700,
                    color: 'var(--text-1)', textDecoration: 'none',
                    letterSpacing: '0.05em'
                  }}
                >
                  {lang === 'es' ? '🌐 English' : '🌐 Español'}
                </a>
              </div>
              {currentLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '0.875rem 0',
                    fontSize: '0.9rem', fontWeight: 500,
                    color: activePage === link.href ? 'var(--cyan)' : 'var(--text-2)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a href="/Stanislav_Kalynovskyi_CV.pdf" download="Stanislav_Kalynovskyi_CV.pdf" style={{ marginTop: '1rem', textAlign: 'center', padding: '0.75rem', color: 'var(--cyan)', border: '1px solid rgba(0,245,255,0.25)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                {lang === 'es' ? 'Descargar CV' : 'Download CV'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
