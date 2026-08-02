import { useRef, Suspense, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* ── Shared mouse state ─────────────────────────────────── */
const mouse = { x: 0, y: 0, active: false };

/* ── Orb (follows mouse gently) ─────────────────────────── */
function Orb() {
  const group = useRef();
  const inner = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!group.current) return;
    // Follow mouse
    group.current.position.x += (mouse.x * 1.2 - group.current.position.x) * 0.035;
    group.current.position.y += (mouse.y * 0.8 - group.current.position.y) * 0.035;
    // Slow self-rotation
    if (inner.current) {
      inner.current.rotation.x = t * 0.1;
      inner.current.rotation.y = t * 0.15;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.8} rotationIntensity={0.2}>
      <group ref={group}>
        {/* Outer wireframe */}
        <mesh ref={inner}>
          <icosahedronGeometry args={[1.0, 1]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={0.3}
            transparent opacity={0.08}
            wireframe
          />
        </mesh>
        {/* Glow core */}
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={1.2}
            transparent opacity={0.12}
          />
        </mesh>
        {/* Point light from orb */}
        <pointLight color="#00f5ff" intensity={2.5} distance={6} />
      </group>
    </Float>
  );
}

/* ── Particle field with mouse repulsion ────────────────── */
function Particles({ count = 250 }) {
  const ref = useRef();

  const { positions, originals } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread across a wide sphere shell
      const r = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.55; // flatten vertically
      const z = r * Math.cos(phi);
      pos[i3] = orig[i3] = x;
      pos[i3+1] = orig[i3+1] = y;
      pos[i3+2] = orig[i3+2] = z;
    }
    return { positions: pos, originals: orig };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const arr = ref.current.geometry.attributes.position.array;

    // Slow global drift
    ref.current.rotation.y = t * 0.04;

    // Mouse in scene space (approximate)
    const mx = mouse.x * 3.0;
    const my = mouse.y * 2.0;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ox = originals[i3];
      const oy = originals[i3 + 1];
      const oz = originals[i3 + 2];

      // Subtle idle wave
      const wave = Math.sin(t * 0.6 + ox * 0.8 + oy) * 0.05;

      // Mouse repulsion — only x/y plane (screen space)
      const dx = ox - mx;
      const dy = oy - my;
      const dist2d = Math.sqrt(dx * dx + dy * dy) + 0.001;
      const repelRadius = 2.2;
      const repelStrength = 0.9;
      const repel = Math.max(0, repelRadius - dist2d) / repelRadius;
      const rx = (dx / dist2d) * repel * repelStrength;
      const ry = (dy / dist2d) * repel * repelStrength;

      // Lerp toward target
      const tx = ox + rx + wave;
      const ty = oy + ry + wave;
      arr[i3]     += (tx - arr[i3])     * 0.1;
      arr[i3 + 1] += (ty - arr[i3 + 1]) * 0.1;
      arr[i3 + 2] += (oz - arr[i3 + 2]) * 0.06;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#00f5ff" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ── Framer Motion variants ─────────────────────────────── */
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } };
const item = {
  hidden: { opacity: 0, y: 45, filter: 'blur(12px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ── Hero ────────────────────────────────────────────────── */
export default function Hero() {
  useEffect(() => {
    const fn = (e) => {
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  return (
    <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

      {/* 3D Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 48 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.15} />
            <pointLight position={[5, 5, 5]} color="#ffffff" intensity={0.8} />
            <Stars radius={70} depth={60} count={1800} factor={3} saturation={0} fade speed={0.3} />
            <Orb />
            <Particles count={250} />
          </Suspense>
        </Canvas>
      </div>

      {/* Dark vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(6,6,9,0.92) 100%)',
      }} />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div variants={container} initial="hidden" animate="visible">

          {/* Available badge */}
          <motion.div variants={item} style={{ marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem',
              fontSize: '0.68rem', letterSpacing: '0.25em', fontWeight: 500,
              color: '#4ade80',
              border: '1px solid rgba(74,222,128,0.2)',
              borderRadius: '999px',
              background: 'rgba(74,222,128,0.06)',
            }}>
              <span className="pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              DISPONIBLE PARA PROYECTOS
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={item}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 10vw, 6.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
              color: 'var(--text-1)',
            }}
          >
            Stanislav<br />
            <span style={{ color: 'var(--cyan)' }}>Kalynovskyi.</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={item}
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', color: 'var(--text-2)', marginBottom: '2rem', fontWeight: 300, letterSpacing: '0.01em' }}
          >
            Desarrollador Full-Stack
          </motion.p>

          {/* Description */}
          <motion.p
            variants={item}
            style={{ fontSize: '0.95rem', color: 'var(--text-3)', maxWidth: '480px', margin: '0 auto 3rem', lineHeight: 1.8 }}
          >
            Construyendo software robusto desde{' '}
            <span style={{ color: 'var(--text-2)' }}>Valencia, España</span>.
            Apasionado por la arquitectura limpia y el detalle en la UI.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/sobre-mi" className="btn-primary">
              Conóceme
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="/proyectos" className="btn-ghost">Ver proyectos</a>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 2,
        }}
      >
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: 'var(--text-3)' }}>SCROLL</span>
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(0,245,255,0.4), transparent)', animation: 'pulse 2s ease-in-out infinite' }} />
      </motion.div>
    </section>
  );
}
