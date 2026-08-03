import { useRef, useState } from 'react';
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

const contacts = [
  {
    label: 'Email',
    value: 'st.kalynovskyi@gmail.com',
    href: 'mailto:st.kalynovskyi@gmail.com',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Teléfono',
    value: '+34 687 63 13 60',
    href: 'tel:+34687631360',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/stanislavkalynovskyi',
    href: 'https://linkedin.com/in/stanislavkalynovskyi',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/skalynovskyi',
    href: 'https://github.com/skalynovskyi',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens mail client as fallback
    window.location.href = `mailto:st.kalynovskyi@gmail.com?subject=Contacto desde portfolio — ${form.name}&body=${encodeURIComponent(form.message)}`;
    setSent(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    color: 'var(--text-1)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'var(--font-body)',
    boxSizing: 'border-box',
  };

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container" style={{ maxWidth: '680px' }}>

        <FadeIn>
          <p className="section-label">Contacto</p>
          <h1 className="section-title">Hablemos</h1>
          <p className="section-subtitle">
            Iniciando mi carrera profesional y abierto a nuevos retos técnicos.
            Si tienes un proyecto o una oportunidad, escríbeme.
          </p>
        </FadeIn>

        <div style={{ height: '1px', background: 'var(--border)', margin: '4rem 0' }} />

        {/* Contact links */}
        <FadeIn delay={0.06}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '4rem' }}>
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.label !== 'Email' ? '_blank' : undefined}
                rel="noreferrer"
                className="card"
                style={{
                  display: 'flex', alignItems: 'center', gap: '1.25rem',
                  padding: '1.25rem 1.5rem', textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <span style={{ color: 'var(--cyan)', display: 'flex', flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-3)', letterSpacing: '0.15em', marginBottom: '0.25rem' }}>{c.label}</p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-1)', fontWeight: 500 }}>{c.value}</p>
                </div>
                <svg style={{ marginLeft: 'auto', color: 'var(--text-3)' }} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            ))}
          </div>
        </FadeIn>

        <div style={{ height: '1px', background: 'var(--border)', margin: '0 0 4rem' }} />

        {/* Quick form */}
        <FadeIn delay={0.1}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</p>
              <p style={{ color: 'var(--cyan)', fontWeight: 600, marginBottom: '0.5rem' }}>¡Mensaje enviado!</p>
              <p style={{ color: 'var(--text-3)', fontSize: '0.85rem' }}>Gracias por contactarme. Respondo en menos de 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.2em', marginBottom: '1.75rem' }}>
                MENSAJE RÁPIDO
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-3)', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>NOMBRE</label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(0,245,255,0.35)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-3)', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>EMAIL</label>
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(0,245,255,0.35)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-3)', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>MENSAJE</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Cuéntame sobre el proyecto o la oportunidad..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(0,245,255,0.35)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', cursor: 'pointer', border: 'none' }}>
                    Enviar mensaje
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          )}
        </FadeIn>

      </div>
    </main>
  );
}
