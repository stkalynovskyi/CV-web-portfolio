import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const content = {
  es: {
    sectionLabel: '03 / Experiencia',
    titleStart: 'Trayectoria ',
    titleHighlight: 'profesional',
    subtitle: 'Experiencia real en entorno empresarial durante las prácticas del CFGS DAM.',
    nextRole: 'Próximo rol',
    yourCompany: 'Tu empresa aquí',
    highlights: 'Highlights',
    durationLabel: 'Duración',
    sectorLabel: 'Sector',
    areaLabel: 'Área',
    modeLabel: 'Modalidad',
    onSite: 'Presencial',
    experiences: [
      {
        id: 'ahora',
        company: 'AHORA ERP',
        type: 'Prácticas FCT',
        role: 'Desarrollador de Software',
        period: 'Feb 2025 — Jun 2025',
        duration: '5 meses',
        status: 'Completado',
        statusColor: '#10b981',
        location: 'Valencia, España',
        tech: ['C#', '.NET Framework', 'T-SQL', 'SQL Server', 'Git', 'Visual Studio'],
        description: 'Prácticas realizadas durante el último módulo del CFGS DAM en una empresa de software ERP. Trabajé en el equipo de desarrollo backend colaborando en proyectos reales de producción.',
        bullets: [
          { cmd: 'backend.dev',   text: 'Desarrollo de lógica de negocio y nuevas funcionalidades backend usando C# y .NET Framework en el contexto de un ERP empresarial.' },
          { cmd: 'db.design',     text: 'Diseño y optimización de consultas complejas en bases de datos relacionales SQL Server usando T-SQL, incluyendo procedimientos almacenados.' },
          { cmd: 'git.workflow',  text: 'Gestión del control de versiones con Git y trabajo colaborativo con el equipo de desarrollo siguiendo metodologías ágiles.' },
          { cmd: 'debug.resolve', text: 'Detección y resolución de bugs en módulos existentes, mejorando la estabilidad y el rendimiento de funcionalidades críticas.' },
        ],
      },
    ]
  },
  en: {
    sectionLabel: '03 / Experience',
    titleStart: 'Professional ',
    titleHighlight: 'trajectory',
    subtitle: 'Real enterprise environment experience during my Multi-platform App Development internship.',
    nextRole: 'Next role',
    yourCompany: 'Your company here',
    highlights: 'Highlights',
    durationLabel: 'Duration',
    sectorLabel: 'Sector',
    areaLabel: 'Area',
    modeLabel: 'Mode',
    onSite: 'On-site',
    experiences: [
      {
        id: 'ahora',
        company: 'AHORA ERP',
        type: 'Internship',
        role: 'Software Developer',
        period: 'Feb 2025 — Jun 2025',
        duration: '5 months',
        status: 'Completed',
        statusColor: '#10b981',
        location: 'Valencia, Spain',
        tech: ['C#', '.NET Framework', 'T-SQL', 'SQL Server', 'Git', 'Visual Studio'],
        description: 'Internship completed during the final module of my Higher Degree in Multi-platform App Development at an ERP software company. I worked on the backend development team collaborating on real production projects.',
        bullets: [
          { cmd: 'backend.dev',   text: 'Development of business logic and new backend features using C# and .NET Framework in an enterprise ERP context.' },
          { cmd: 'db.design',     text: 'Design and optimization of complex queries in SQL Server relational databases using T-SQL, including stored procedures.' },
          { cmd: 'git.workflow',  text: 'Version control management with Git and collaborative work with the development team following agile methodologies.' },
          { cmd: 'debug.resolve', text: 'Detection and resolution of bugs in existing modules, improving the stability and performance of critical features.' },
        ],
      },
    ]
  }
};

export default function Experience({ lang = 'es' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeId, setActiveId] = useState('ahora');

  const t = content[lang] || content.es;
  const active = t.experiences.find((e) => e.id === activeId);

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase">{t.sectionLabel}</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2" style={{ fontFamily: 'var(--font-display)' }}>
            {t.titleStart}
            <span style={{ background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {t.titleHighlight}
            </span>
          </h2>
          <p className="text-white/35 text-sm mt-3 max-w-lg">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Timeline sidebar ── */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            <div className="relative">
              <div className="absolute left-[15px] top-6 bottom-6 w-px bg-gradient-to-b from-cyan-400/60 via-purple-500/30 to-transparent" />

              <div className="flex flex-col gap-3">
                {t.experiences.map((job, i) => (
                  <motion.button
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    onClick={() => setActiveId(job.id)}
                    className={`relative pl-10 pr-4 py-4 rounded-xl text-left border transition-all duration-300 ${
                      activeId === job.id
                        ? 'glass border-cyan-400/30 bg-cyan-400/5'
                        : 'border-white/[0.06] hover:border-white/15 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div
                      className={`absolute left-[11px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 transition-all ${
                        activeId === job.id ? 'border-cyan-400 bg-cyan-400 scale-125' : 'border-white/25 bg-transparent'
                      }`}
                    />
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-bold text-white text-sm">{job.company}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-mono shrink-0" style={{ color: job.statusColor, background: `${job.statusColor}18` }}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 font-mono">{job.role}</p>
                    <p className="text-xs text-white/25 font-mono mt-0.5">{job.type} · {job.duration}</p>
                  </motion.button>
                ))}

                {/* Future slot */}
                <div className="relative pl-10 pr-4 py-4 rounded-xl border border-dashed border-white/[0.08] opacity-35">
                  <div className="absolute left-[11px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-white/20" />
                  <p className="text-xs text-white/30 font-mono">{t.nextRole}</p>
                  <p className="text-xs text-white/20 font-mono mt-1">{t.yourCompany}</p>
                </div>
              </div>
            </div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="glass rounded-xl p-4 border border-white/[0.06] mt-2"
            >
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">{t.highlights}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: active?.duration || t.experiences[0].duration, l: t.durationLabel },
                  { v: 'ERP', l: t.sectorLabel },
                  { v: 'Backend', l: t.areaLabel },
                  { v: t.onSite, l: t.modeLabel },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-sm font-bold text-cyan-400" style={{ fontFamily: 'var(--font-display)' }}>{s.v}</p>
                    <p className="text-[11px] text-white/30 font-mono">{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Terminal Panel ── */}
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-2 rounded-2xl overflow-hidden border border-white/[0.07]"
            >
              {/* Chrome bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.07]" style={{ background: 'rgba(0,0,0,0.45)' }}>
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="ml-4 text-xs font-mono text-white/25">~/career/{active.company.toLowerCase().replace(/ /g, '-')}</span>
                <span className="ml-auto text-[10px] font-mono text-white/20">{active.period}</span>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8" style={{ background: 'rgba(0,0,0,0.3)', fontFamily: 'var(--font-mono)' }}>
                {/* whoami */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className="text-cyan-400">❯</span>
                    <span className="text-white/25">whoami</span>
                  </div>
                  <div className="ml-5">
                    <p className="text-emerald-400 font-bold text-base">{active.role}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <p className="text-white/35 text-xs"><span className="text-purple-400">{active.company}</span> · {active.type}</p>
                      <p className="text-white/35 text-xs">📍 {active.location}</p>
                    </div>
                  </div>
                </div>

                {/* description */}
                <div className="mb-6 ml-5 pl-3 border-l border-white/[0.07]">
                  <p className="text-white/45 text-xs leading-relaxed">{active.description}</p>
                </div>

                {/* responsibilities */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <span className="text-cyan-400">❯</span>
                    <span className="text-white/25">cat responsibilities.log</span>
                  </div>
                  <div className="space-y-3.5 ml-5">
                    {active.bullets.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.35 }}
                        viewport={{ once: true }}
                        className="flex gap-3 items-start"
                      >
                        <span className="text-purple-400 text-[11px] mt-0.5 shrink-0 font-bold">[{b.cmd}]</span>
                        <p className="text-white/55 text-xs sm:text-sm leading-relaxed">{b.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* tech stack */}
                <div className="pt-5 border-t border-white/[0.07]">
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <span className="text-cyan-400">❯</span>
                    <span className="text-white/25">cat tech_stack.txt</span>
                  </div>
                  <div className="ml-5 flex flex-wrap gap-2">
                    {active.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs rounded-lg font-mono text-cyan-300"
                        style={{ background: 'rgba(0,245,255,0.07)', border: '1px solid rgba(0,245,255,0.18)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Blinking cursor */}
                <div className="mt-5 flex items-center gap-1.5">
                  <span className="text-cyan-400 text-sm">❯</span>
                  <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
