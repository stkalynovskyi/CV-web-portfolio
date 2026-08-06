import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

const content = {
  es: {
    label: 'Proyectos',
    title: 'Trabajo destacado',
    subtitle: 'Proyectos que demuestran mi capacidad técnica y criterio de diseño.',
    featuresLabel: 'FUNCIONALIDADES',
    moreProjects: 'Más proyectos en desarrollo',
    learning: 'Aprendiendo Astro, Three.js y WebGL',
    projects: [
      {
        id: 'photopin',
        title: 'PhotoPin',
        type: 'Proyecto de Fin de Grado',
        description:
          'Aplicación móvil multiplataforma para capturar y descubrir fotografías geolocalizadas en tiempo real. Los usuarios publican fotos vinculadas a su GPS y las exploran en un mapa interactivo.',
        features: [
          'Geolocalización en tiempo real con Google Maps API',
          'Backend RESTful con autenticación JWT',
          'App iOS/Android/Web con Ionic + Angular',
          'Base de datos MongoDB con esquemas optimizados',
          'Galería filtrable por categorías y zona geográfica',
        ],
        tech: ['Angular', 'Ionic', 'Node.js', 'Express', 'MongoDB', 'Google Maps API', 'JWT'],
        github: 'https://github.com/stkalynovskyi',
        demo: null,
      },
    ]
  },
  en: {
    label: 'Projects',
    title: 'Featured Work',
    subtitle: 'Projects that demonstrate my technical skills and design criteria.',
    featuresLabel: 'FEATURES',
    moreProjects: 'More projects in development',
    learning: 'Learning Astro, Three.js and WebGL',
    projects: [
      {
        id: 'photopin',
        title: 'PhotoPin',
        type: 'Final Degree Project',
        description:
          'Cross-platform mobile application to capture and discover real-time geolocated photos. Users post photos linked to their GPS and explore them on an interactive map.',
        features: [
          'Real-time geolocation with Google Maps API',
          'RESTful backend with JWT authentication',
          'iOS/Android/Web app with Ionic + Angular',
          'MongoDB database with optimized schemas',
          'Filterable gallery by categories and geographical area',
        ],
        tech: ['Angular', 'Ionic', 'Node.js', 'Express', 'MongoDB', 'Google Maps API', 'JWT'],
        github: 'https://github.com/stkalynovskyi',
        demo: null,
      },
    ]
  }
};

export default function ProjectsPage({ lang = 'es' }) {
  const t = content[lang] || content.es;
  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container">

        <FadeIn>
          <p className="section-label">{t.label}</p>
          <h1 className="section-title">{t.title}</h1>
          <p className="section-subtitle">
            {t.subtitle}
          </p>
        </FadeIn>

        <div style={{ height: '1px', background: 'var(--border)', margin: '4rem 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {t.projects.map((p, i) => (
            <FadeIn key={p.id} delay={0.08 * i}>
              <article className="card">
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-1)', marginBottom: '0.35rem' }}>
                      {p.title}
                    </h2>
                    <p style={{ fontSize: '0.78rem', color: 'var(--cyan)', fontWeight: 500 }}>{p.type}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.78rem' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.78rem' }}>
                        Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.92rem', color: 'var(--text-2)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '680px' }}>
                  {p.description}
                </p>

                {/* Features */}
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-3)', letterSpacing: '0.2em', marginBottom: '0.875rem' }}>{t.featuresLabel}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {p.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-2)' }}>
                        <span style={{ color: 'var(--cyan)', marginTop: '0.15rem', flexShrink: 0 }}>›</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {p.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </article>
            </FadeIn>
          ))}

          {/* Coming soon */}
          <FadeIn delay={0.12}>
            <div style={{
              border: '1px dashed rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
            }}>
              <p style={{ color: 'var(--text-3)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{t.moreProjects}</p>
              <p style={{ color: 'rgba(255,255,255,0.12)', fontSize: '0.75rem' }}>{t.learning}</p>
            </div>
          </FadeIn>
        </div>

      </div>
    </main>
  );
}
