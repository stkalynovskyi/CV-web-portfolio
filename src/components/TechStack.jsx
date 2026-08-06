import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const content = {
  es: {
    sectionLabel: '02 / Stack Técnico',
    titleStart: 'Tecnologías ',
    titleHighlight: 'dominadas',
    subtitle: 'Stack versátil orientado a aplicaciones full-stack empresariales y móviles.',
    techCategories: [
      {
        label: 'Backend & Core',
        color: '#9b59b6',
        items: [
          { name: 'C#',        color: '#9b59b6', emoji: '🔷', desc: 'Lenguaje principal' },
          { name: '.NET',      color: '#6c3dc8', emoji: '💜', desc: 'Framework backend'   },
          { name: 'Node.js',   color: '#68a063', emoji: '🟢', desc: 'Runtime JS'          },
          { name: 'Java',      color: '#e76f00', emoji: '☕', desc: 'Orientación a objetos' },
        ],
      },
      {
        label: 'Frontend',
        color: '#61dafb',
        items: [
          { name: 'Swift',      color: '#f05138', emoji: '🍎',  desc: 'iOS Nativo'        },
          { name: 'Angular',    color: '#dd0031', emoji: '🅰️',  desc: 'Framework SPA'     },
          { name: 'TypeScript', color: '#3178c6', emoji: '📘', desc: 'JS tipado'          },
          { name: 'Ionic',      color: '#3880ff', emoji: '📱', desc: 'Apps multiplataforma' },
        ],
      },
      {
        label: 'Bases de Datos',
        color: '#00aee1',
        items: [
          { name: 'SQL',        color: '#00aee1', emoji: '🗄️', desc: 'Bases relacionales' },
          { name: 'T-SQL',      color: '#cc2927', emoji: '🔴', desc: 'SQL Server'         },
          { name: 'MongoDB',    color: '#47a248', emoji: '🍃', desc: 'NoSQL / Documentos' },
        ],
      },
      {
        label: 'Herramientas',
        color: '#f97316',
        items: [
          { name: 'Git',        color: '#f97316', emoji: '🔀', desc: 'Control de versiones' },
          { name: 'GitHub',     color: '#ffffff', emoji: '🐙', desc: 'Repositorios'        },
          { name: 'VS Code',    color: '#007acc', emoji: '💻', desc: 'Editor principal'    },
          { name: 'Postman',    color: '#ff6c37', emoji: '📬', desc: 'Testing APIs'        },
        ],
      },
    ]
  },
  en: {
    sectionLabel: '02 / Tech Stack',
    titleStart: 'Mastered ',
    titleHighlight: 'technologies',
    subtitle: 'Versatile stack focused on enterprise full-stack and mobile applications.',
    techCategories: [
      {
        label: 'Backend & Core',
        color: '#9b59b6',
        items: [
          { name: 'C#',        color: '#9b59b6', emoji: '🔷', desc: 'Main language' },
          { name: '.NET',      color: '#6c3dc8', emoji: '💜', desc: 'Backend framework'   },
          { name: 'Node.js',   color: '#68a063', emoji: '🟢', desc: 'JS runtime'          },
          { name: 'Java',      color: '#e76f00', emoji: '☕', desc: 'Object-oriented' },
        ],
      },
      {
        label: 'Frontend',
        color: '#61dafb',
        items: [
          { name: 'Swift',      color: '#f05138', emoji: '🍎',  desc: 'Native iOS'        },
          { name: 'Angular',    color: '#dd0031', emoji: '🅰️',  desc: 'SPA Framework'     },
          { name: 'TypeScript', color: '#3178c6', emoji: '📘', desc: 'Typed JS'          },
          { name: 'Ionic',      color: '#3880ff', emoji: '📱', desc: 'Cross-platform apps' },
        ],
      },
      {
        label: 'Databases',
        color: '#00aee1',
        items: [
          { name: 'SQL',        color: '#00aee1', emoji: '🗄️', desc: 'Relational databases' },
          { name: 'T-SQL',      color: '#cc2927', emoji: '🔴', desc: 'SQL Server'         },
          { name: 'MongoDB',    color: '#47a248', emoji: '🍃', desc: 'NoSQL / Documents' },
        ],
      },
      {
        label: 'Tools',
        color: '#f97316',
        items: [
          { name: 'Git',        color: '#f97316', emoji: '🔀', desc: 'Version control' },
          { name: 'GitHub',     color: '#ffffff', emoji: '🐙', desc: 'Repositories'        },
          { name: 'VS Code',    color: '#007acc', emoji: '💻', desc: 'Main editor'    },
          { name: 'Postman',    color: '#ff6c37', emoji: '📬', desc: 'API testing'        },
        ],
      },
    ]
  }
};

const getAllItems = (categories) => categories.flatMap((c) => c.items.map((item) => ({ ...item, category: c.label })));
const getRow1 = (items) => [...items, ...items, ...items];
const getRow2 = (items) => {
  const r2 = [...items].reverse();
  r2.push(...r2.slice());
  return r2;
};

function TechPill({ name, color, emoji, category, desc }) {
  return (
    <div
      className="group flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl glass border border-white/[0.07] cursor-default mx-2 transition-all duration-300 hover:scale-105 hover:border-white/20"
      style={{ minWidth: 'max-content' }}
    >
      <span className="text-xl leading-none select-none">{emoji}</span>
      <div>
        <span className="text-sm font-semibold text-white block">{name}</span>
        <span className="text-[11px] text-white/30 font-mono block">{desc}</span>
      </div>
    </div>
  );
}

export default function TechStack({ lang = 'es' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const t = content[lang] || content.es;
  const allItems = getAllItems(t.techCategories);
  const row1 = getRow1(allItems);
  const row2 = getRow2(allItems);

  return (
    <section id="stack" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="section-container mb-14">
        <motion.div ref={ref} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-xs font-mono tracking-[0.3em] text-purple-400 uppercase">{t.sectionLabel}</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2" style={{ fontFamily: 'var(--font-display)' }}>
            {t.titleStart}
            <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {t.titleHighlight}
            </span>
          </h2>
          <p className="text-white/35 text-sm mt-3 max-w-lg font-mono">
            {t.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Category grid overview */}
      <div className="section-container mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {t.techCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-4 border border-white/[0.07]"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                <span className="text-xs font-mono text-white/40 uppercase tracking-wider">{cat.label}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item.name}
                    className="text-xs px-2 py-0.5 rounded-md font-medium"
                    style={{ background: `${item.color}14`, color: item.color, border: `1px solid ${item.color}25` }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee row 1 */}
      <div className="relative mb-3">
        <div className="flex animate-marquee-left whitespace-nowrap">
          {row1.map((item, i) => <TechPill key={`r1-${i}`} {...item} />)}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }} />
      </div>

      {/* Marquee row 2 */}
      <div className="relative">
        <div className="flex animate-marquee-right whitespace-nowrap">
          {row2.map((item, i) => <TechPill key={`r2-${i}`} {...item} />)}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }} />
      </div>
    </section>
  );
}
