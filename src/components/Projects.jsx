import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    id: 'photopin',
    title: 'PhotoPin',
    type: 'Proyecto de Fin de Grado',
    badge: 'Full-Stack · Mobile',
    badgeColor: '#00f5ff',
    grade: '10/10',
    description:
      'Aplicación móvil multiplataforma que permite a los usuarios capturar y descubrir fotografías geolocalizadas en tiempo real. Los usuarios pueden publicar fotos vinculadas a su ubicación GPS, explorarlas en un mapa interactivo y filtrarlas por categorías.',
    features: [
      'Geolocalización en tiempo real con Google Maps API + marcadores personalizados',
      'Backend RESTful con autenticación JWT y gestión de sesiones seguras',
      'App multiplataforma iOS/Android/Web con Ionic + Angular',
      'Base de datos documental MongoDB con esquemas optimizados',
      'Galería de fotos por zona, filtros y sistema de categorías',
      'Perfil de usuario, subida de imágenes y gestión de publicaciones propias',
    ],
    tech: ['Angular', 'Ionic', 'Node.js', 'Express', 'MongoDB', 'Google Maps API', 'JWT'],
    gradient: 'from-cyan-500/15 via-blue-500/8 to-transparent',
    accentColor: '#00f5ff',
    emoji: '📍',
    links: { github: 'https://github.com/skalynovskyi', demo: null },
  },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? project.accentColor + '45' : 'rgba(255,255,255,0.07)'}`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 0 50px ${project.accentColor}12, 0 0 100px ${project.accentColor}06` : 'none',
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}80, transparent)`, opacity: hovered ? 1 : 0 }} />

      {/* BG gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} pointer-events-none`} />

      <div className="relative p-7 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{ background: `${project.accentColor}14`, border: `1px solid ${project.accentColor}28` }}
            >
              {project.emoji}
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                {project.title}
              </h3>
              <p className="text-xs font-mono text-white/35">{project.type}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ color: project.accentColor, background: `${project.accentColor}16`, border: `1px solid ${project.accentColor}32` }}>
              {project.badge}
            </span>
            {project.grade && (
              <span className="text-xs font-mono text-emerald-400 font-bold">⭐ {project.grade}</span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Features */}
        <div className="mb-6">
          <p className="text-[11px] font-mono text-white/25 uppercase tracking-wider mb-2.5">Funcionalidades</p>
          <ul className="space-y-2">
            {project.features.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="flex items-start gap-2.5 text-xs text-white/55"
              >
                <span style={{ color: project.accentColor }} className="mt-0.5 shrink-0">▹</span>
                {f}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 text-[11px] font-mono rounded-lg"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)' }}>
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-white/[0.06]">
          <a href={project.links.github} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Ver código
          </a>
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all"
              style={{ color: project.accentColor, background: `${project.accentColor}12`, border: `1px solid ${project.accentColor}30` }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Demo live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12">
          <span className="text-xs font-mono tracking-[0.3em] text-purple-400 uppercase">04 / Proyectos</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2" style={{ fontFamily: 'var(--font-display)' }}>
            Trabajo{' '}
            <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #00f5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              destacado
            </span>
          </h2>
          <p className="text-white/35 text-sm mt-3 max-w-xl">
            Proyectos que demuestran mi capacidad técnica, criterio de diseño y atención al detalle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}

          {/* Coming soon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-dashed border-white/[0.09] p-10 flex flex-col items-center justify-center gap-4 min-h-[240px] hover:border-white/20 transition-colors group"
          >
            <div className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity">🚀</div>
            <p className="text-white/25 text-sm font-mono text-center">Más proyectos en desarrollo...</p>
            <p className="text-white/15 text-xs font-mono text-center">Actualmente aprendiendo Astro, Three.js & WebGL</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
