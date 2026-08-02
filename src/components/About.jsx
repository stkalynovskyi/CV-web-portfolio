import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function BentoCard({ children, className = '', index = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const rx = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -7;
    const ry = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  7;
    cardRef.current.style.setProperty('--rx', `${rx}deg`);
    cardRef.current.style.setProperty('--ry', `${ry}deg`);
  };
  const handleMouseLeave = () => {
    cardRef.current.style.setProperty('--rx', '0deg');
    cardRef.current.style.setProperty('--ry', '0deg');
  };

  return (
    <motion.div ref={ref} custom={index} variants={cardVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
      <div
        ref={cardRef}
        className={`bento-card glass rounded-2xl p-6 h-full cursor-default transition-all duration-200 ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </motion.div>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-white/55">
      {children}
    </span>
  );
}

const educationItems = [
  {
    short: 'DAM', level: 'FPGS',
    title: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma',
    note: '⭐ Nota media: 9/10', icon: '🎓', color: '#00f5ff',
  },
  {
    short: 'SMR', level: 'FPGM',
    title: 'Técnico en Sistemas Microinformáticos y Redes',
    note: null, icon: '🖥️', color: '#8b5cf6',
  },
];

const languages = [
  { name: 'Español',    level: 'Nativo',   pct: 100, color: '#f59e0b' },
  { name: 'Ucraniano',  level: 'Nativo',   pct: 100, color: '#3b82f6' },
  { name: 'Ruso',       level: 'Avanzado', pct: 88,  color: '#a855f7' },
  { name: 'Inglés',     level: 'Avanzado', pct: 80,  color: '#00f5ff' },
  { name: 'Alemán',     level: 'Básico',   pct: 38,  color: '#10b981' },
];

const interests = ['Arquitectura limpia', 'Performance Web', 'Open Source', 'UI/UX', 'DevOps', 'Sistemas embebidos'];

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-28 relative">
      <div className="section-container">

        {/* Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase">01 / Sobre mí</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2" style={{ fontFamily: 'var(--font-display)' }}>
            El{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              perfil
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* ── Bio (wide) ── */}
          <BentoCard index={0} className="lg:col-span-2">
            <div className="flex items-start gap-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.25)' }}
              >
                👤
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    Stanislav Kalynovskyi
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded-full font-mono" style={{ color: '#10b981', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}>
                    Disponible
                  </span>
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-4">
                  Desarrollador Full-Stack recién graduado, apasionado por construir soluciones robustas,
                  eficientes y bien estructuradas. Me gradué con matrícula de honor en DAM (nota 9/10)
                  y cuento con experiencia real gracias a mis prácticas en <strong className="text-white/80">AHORA</strong>,
                  donde trabajé con <strong className="text-cyan-400/80">C#, .NET y T-SQL</strong> en un
                  entorno empresarial real. Busco mi primera oportunidad de empleo para seguir creciendo
                  y aportar valor desde el primer día.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['C# / .NET', 'Node.js', 'React', 'Angular', 'MongoDB', 'T-SQL', 'Git'].map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* ── Location & Status ── */}
          <BentoCard index={1}>
            <div className="flex flex-col gap-4 h-full">
              <div>
                <span className="text-3xl mb-3 block">📍</span>
                <p className="text-xs font-mono text-white/35 uppercase tracking-widest mb-1">Ubicación</p>
                <p className="text-lg font-bold text-white">Valencia, España</p>
                <p className="text-white/35 text-xs mt-1 font-mono">Open to Remote & On-site</p>
              </div>
              <div className="border-t border-white/[0.07] pt-4">
                <p className="text-xs font-mono text-white/35 uppercase tracking-widest mb-2">Contacto</p>
                <div className="flex flex-col gap-2">
                  <a href="https://linkedin.com/in/skalynovskyi" target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                  <a href="https://github.com/skalynovskyi" target="_blank" rel="noreferrer" className="text-xs text-white/50 hover:text-white font-mono transition-colors flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a href="mailto:stanislav.kalynovskyi@gmail.com" className="text-xs text-white/50 hover:text-white font-mono transition-colors flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Email
                  </a>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* ── Education ── */}
          <BentoCard index={2}>
            <p className="text-xs font-mono text-white/35 uppercase tracking-widest mb-5">🎓 Formación</p>
            <div className="flex flex-col gap-5">
              {educationItems.map((edu) => (
                <div key={edu.short} className="flex gap-3 items-start">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${edu.color}14`, border: `1px solid ${edu.color}30` }}
                  >
                    {edu.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: `${edu.color}20`, color: edu.color }}>
                        {edu.short}
                      </span>
                      <span className="text-[10px] text-white/30 font-mono">{edu.level}</span>
                    </div>
                    <p className="text-xs text-white/60 leading-snug mb-1">{edu.title}</p>
                    {edu.note && <p className="text-xs text-emerald-400 font-semibold">{edu.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* ── Languages ── */}
          <BentoCard index={3} className="md:col-span-1">
            <p className="text-xs font-mono text-white/35 uppercase tracking-widest mb-5">🌐 Idiomas — Políglota</p>
            <div className="flex flex-col gap-3.5">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-3">
                  <span className="text-xs text-white/65 w-20 shrink-0 font-medium">{lang.name}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: lang.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.pct}%` }}
                      transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <span className="text-xs font-mono w-16 text-right shrink-0" style={{ color: lang.color }}>
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* ── Interests ── */}
          <BentoCard index={4}>
            <p className="text-xs font-mono text-white/35 uppercase tracking-widest mb-4">⚡ Intereses</p>
            <div className="flex flex-wrap gap-2">
              {interests.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:border-cyan-400/30 hover:text-cyan-300 cursor-default"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.55)' }}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/[0.07]">
              <p className="text-xs text-white/30 font-mono leading-relaxed">
                "Código limpio, tests que cubren, documentación que se entiende."
              </p>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
