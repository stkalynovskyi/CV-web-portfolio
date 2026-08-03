import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const education = [
  {
    short: 'DAM', label: 'CFGS',
    title: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma',
    note: 'Nota media: 9 / 10',
    color: '#00f5ff',
  },
  {
    short: 'SMR', label: 'CFGM',
    title: 'Técnico en Sistemas Microinformáticos y Redes',
    note: null,
    color: 'rgba(255,255,255,0.35)',
  },
];

const languages = [
  { name: 'Español',   level: 'Nativo',   pct: 100 },
  { name: 'Ucraniano', level: 'Nativo',   pct: 100 },
  { name: 'Ruso',      level: 'Nativo',   pct: 100 },
  { name: 'Inglés',    level: 'Avanzado', pct: 80  },
  { name: 'Alemán',    level: 'Básico',   pct: 38  },
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container">

        {/* ── Header ── */}
        <FadeIn>
          <p className="section-label">Sobre mí</p>
          <h1 className="section-title">Stanislav Kalynovskyi</h1>
          <p className="section-subtitle">
            Desarrollador Full-Stack recién graduado con nota media de 9/10 en DAM.
            Experiencia real en entornos empresariales. Políglota. Apasionado por el
            software bien construido.
          </p>
        </FadeIn>

        <div style={{ height: '1px', background: 'var(--border)', margin: '4rem 0' }} />

        {/* ── Bio ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', maxWidth: '720px' }}>
          <FadeIn delay={0.05}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              PRESENTACIÓN
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.85, marginBottom: '1rem' }}>
              Soy un desarrollador Full-Stack con base sólida en{' '}
              <span style={{ color: 'var(--cyan)' }}>C#, .NET, Node.js y React</span>.
              Durante mis prácticas en <strong style={{ color: 'var(--text-1)', fontWeight: 600 }}>AHORA ERP</strong> trabajé
              en proyectos de producción real: lógica backend en .NET, consultas complejas
              en T-SQL y control de versiones con Git en equipo.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.85 }}>
              Me gradué en DAM (nota 9/10) y cuento con formación
              base en redes y sistemas gracias al SMR. Busco mi primera oportunidad
              laboral para seguir creciendo y aportar valor real desde el primer día.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Valencia, España', 'Disponible', 'Remoto / Presencial'].map((t) => (
                <span key={t} className={t === 'Disponible' ? 'tag tag-cyan' : 'tag'}>{t}</span>
              ))}
            </div>
          </FadeIn>
        </div>

        <div style={{ height: '1px', background: 'var(--border)', margin: '4rem 0' }} />

        {/* ── Education ── */}
        <FadeIn delay={0.05}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '2rem', letterSpacing: '0.05em' }}>
            FORMACIÓN
          </h2>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
          {education.map((edu, i) => (
            <FadeIn key={edu.short} delay={0.08 * (i + 1)}>
              <div className="card tilt" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: '52px', height: '52px', borderRadius: '10px',
                  border: `1px solid ${edu.color}30`,
                  background: `${edu.color}0c`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700,
                  color: edu.color, letterSpacing: '0.05em',
                }}>
                  {edu.short}
                </div>
                <div>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-3)', marginBottom: '0.35rem', letterSpacing: '0.15em' }}>{edu.label}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-1)', fontWeight: 500, marginBottom: '0.4rem', lineHeight: 1.4 }}>{edu.title}</p>
                  {edu.note && <p style={{ fontSize: '0.8rem', color: 'var(--cyan)', fontWeight: 600 }}>{edu.note}</p>}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div style={{ height: '1px', background: 'var(--border)', margin: '4rem 0' }} />

        {/* ── Languages ── */}
        <FadeIn delay={0.05}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '2rem', letterSpacing: '0.05em' }}>
            IDIOMAS
          </h2>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '480px' }}>
          {languages.map((lang, i) => (
            <FadeIn key={lang.name} delay={0.06 * (i + 1)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-1)', fontWeight: 500, width: '90px', flexShrink: 0 }}>{lang.name}</span>
                <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                  <motion.div
                    style={{ height: '100%', background: 'var(--cyan)', borderRadius: '99px' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.pct}%` }}
                    transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', width: '70px', textAlign: 'right', flexShrink: 0 }}>{lang.level}</span>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </main>
  );
}
