import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

const experience = [
  {
    company: 'AHORA ERP',
    role: 'Desarrollador de Software',
    type: 'Prácticas FCT · 3 meses',
    period: 'Mar 2026 — Jun 2026',
    location: 'Valencia, España',
    tech: ['C#', '.NET Framework', 'T-SQL', 'SQL Server', 'Git'],
    bullets: [
      'Desarrollo de lógica de negocio y funcionalidades backend con C# y .NET Framework en contexto de ERP empresarial.',
      'Diseño y optimización de consultas complejas en SQL Server mediante T-SQL, incluyendo procedimientos almacenados.',
      'Gestión de control de versiones con Git y trabajo colaborativo en equipo de desarrollo.',
      'Detección y resolución de bugs en módulos existentes, mejorando estabilidad de funcionalidades críticas.',
    ],
  },
  {
    company: 'MobiTech',
    role: 'Técnico en Mantenimiento y Soporte Informático',
    type: 'Prácticas',
    period: 'Mar 2024 — Jul 2024',
    location: 'Valencia, España',
    tech: ['Hardware', 'Software', 'Redes locales'],
    bullets: [
      'Reparación y mantenimiento de hardware y software en equipos informáticos.',
      'Soporte técnico a usuarios y configuración de equipos de impresión.',
    ],
  },
];

const techGroups = [
  {
    label: 'Backend & Core',
    items: ['C#', '.NET', 'Node.js', 'Java', 'Express'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Angular', 'TypeScript', 'Ionic', 'HTML/CSS'],
  },
  {
    label: 'Bases de Datos',
    items: ['SQL Server', 'T-SQL', 'MongoDB'],
  },
  {
    label: 'Herramientas',
    items: ['Git', 'GitHub', 'Visual Studio', 'VS Code', 'Postman'],
  },
];

export default function CurriculumPage() {
  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container">

        <FadeIn>
          <p className="section-label">Currículum</p>
          <h1 className="section-title">Experiencia & Stack</h1>
          <p className="section-subtitle">
            Trayectoria profesional y tecnologías con las que trabajo.
          </p>
        </FadeIn>

        <div style={{ height: '1px', background: 'var(--border)', margin: '4rem 0' }} />

        {/* ── Experience ── */}
        <FadeIn delay={0.04}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.2em', marginBottom: '2rem' }}>
            EXPERIENCIA
          </h2>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '5rem' }}>
          {experience.map((job, i) => (
            <FadeIn key={job.company} delay={0.08}>
              <div className="card" style={{ padding: '2.5rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-1)', marginBottom: '0.3rem' }}>
                      {job.role}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--cyan)', fontWeight: 500, marginBottom: '0.2rem' }}>{job.company}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{job.type} · {job.location}</p>
                  </div>
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 500,
                    padding: '0.3rem 0.875rem', borderRadius: '999px',
                    background: 'rgba(74,222,128,0.07)',
                    border: '1px solid rgba(74,222,128,0.2)',
                    color: '#4ade80', whiteSpace: 'nowrap',
                  }}>
                    {job.period}
                  </span>
                </div>

                {/* Responsibilities */}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  {job.bullets.map((b) => (
                    <li key={b} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
                      <span style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.7rem' }}>▹</span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tech */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {job.tech.map((t) => <span key={t} className="tag tag-cyan">{t}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div style={{ height: '1px', background: 'var(--border)', margin: '0 0 4rem' }} />

        {/* ── Tech Stack ── */}
        <FadeIn delay={0.04}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.2em', marginBottom: '2rem' }}>
            STACK TÉCNICO
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techGroups.map((group, i) => (
            <FadeIn key={group.label} delay={0.06 * i}>
              <div className="card">
                <p style={{ fontSize: '0.68rem', color: 'var(--text-3)', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                  {group.label.toUpperCase()}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {group.items.map((item) => (
                    <span key={item} style={{ fontSize: '0.88rem', color: 'var(--text-1)', fontWeight: 500 }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div style={{ height: '1px', background: 'var(--border)', margin: '4rem 0' }} />

        {/* ── Download CV ── */}
        <FadeIn delay={0.04}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', marginBottom: '1.5rem' }}>
              ¿Prefieres ver el currículum completo en PDF?
            </p>
            <a href="/Stanislav_Kalynovskyi_CV.pdf" download="Stanislav_Kalynovskyi_CV.pdf" className="btn-primary">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Descargar CV en PDF
            </a>
          </div>
        </FadeIn>

      </div>
    </main>
  );
}
