import { motion } from 'framer-motion';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/stanislav-kalynovskyi',
    color: '#0077b5',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/stkalynovskyi',
    color: '#ffffff',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:stanislav.kalynovskyi@gmail.com',
    color: '#00f5ff',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

const content = {
  es: {
    sectionLabel: '05 / Contacto',
    titleStart: 'Trabajemos ',
    titleHighlight: 'juntos',
    subtitle: 'Iniciando mi carrera profesional y abierto a nuevos retos técnicos. Si tienes un proyecto interesante o una oportunidad, hablemos.',
    sendEmail: 'Enviar Email',
    downloadCv: 'Descargar CV',
  },
  en: {
    sectionLabel: '05 / Contact',
    titleStart: "Let's work ",
    titleHighlight: 'together',
    subtitle: 'Starting my professional career and open to new technical challenges. If you have an interesting project or opportunity, let\'s talk.',
    sendEmail: 'Send Email',
    downloadCv: 'Download CV',
  }
};

export default function Footer({ lang = 'es' }) {
  const currentYear = new Date().getFullYear();
  const t = content[lang] || content.es;

  return (
    <footer id="contact" className="relative py-24 overflow-hidden">
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      {/* Glow blob */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,245,255,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="section-container relative z-10">
        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="rounded-2xl p-10 sm:p-14 mb-16 text-center relative overflow-hidden"
          style={{
            background: 'rgba(0,245,255,0.04)',
            border: '1px solid rgba(0,245,255,0.12)',
          }}
        >
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-cyan-400/40" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-cyan-400/40" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-cyan-400/40" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-cyan-400/40" />

          <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase">
            {t.sectionLabel}
          </span>

          <h2
            className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t.titleStart}
            <span
              style={{
                background: 'linear-gradient(135deg, #00f5ff 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t.titleHighlight}
            </span>
          </h2>

          <p className="text-white/50 text-base max-w-lg mx-auto mb-8">
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:stanislav.kalynovskyi@gmail.com"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 font-bold text-sm text-black rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
                boxShadow: '0 0 30px rgba(0,245,255,0.3)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {t.sendEmail}
            </a>

            <a
              href="/Stanislav_Kalynovskyi_CV.pdf"
              download="Stanislav_Kalynovskyi_CV.pdf"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white/70 hover:text-white rounded-xl border border-white/10 hover:border-white/25 transition-all duration-300 hover:bg-white/5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t.downloadCv}
            </a>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <a
            href="#"
            className="font-black text-lg tracking-widest hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-white">[</span>
            <span
              style={{
                background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SK
            </span>
            <span className="text-white">]</span>
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel="noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={link.label}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = link.color + '40';
                  e.currentTarget.style.boxShadow = `0 0 20px ${link.color}25`;
                  e.currentTarget.style.color = link.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-white/20 text-xs font-mono">
            © {currentYear} Stanislav Kalynovskyi
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
