import { useRef, Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Stars, Torus, shaderMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useMotionTemplate, animate } from 'framer-motion';
import * as THREE from 'three';

/* ── Shared mutable state (no re-renders) ─────────────────── */
const S = {
  mouseX: 0, mouseY: 0,
  mouseVX: 0, mouseVY: 0,   // velocity
  scroll: 0,
  // Cinematic Intro State
  introScale: 0.001,
  introWireframe: 1,
  introSolid: 0,
  introCameraZ: 25,
  introFlash: 0,
  introVignette: 1,
};

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const easeInOut3 = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ══════════════════════════════════════════════════════════════
   SPHERE — stays in place, mouse rotates it like a globe
   + distortion reacts to mouse speed
   + specular light follows mouse around it
══════════════════════════════════════════════════════════════ */
function Sphere() {
  const outerRef = useRef();
  const innerRef = useRef();
  const innerWireRef = useRef();
  const coreRef = useRef();
  const lightRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const groupRef = useRef();

  // Smooth rotation targets driven by mouse
  const rotX = useRef(0);
  const rotY = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const sc = S.scroll;

    // ── Scroll phases ──────────────────────────────────────
    const explodeT = easeInOut3(clamp((sc - 0.12) / 0.45, 0, 1));
    const fadeInT = clamp((sc - 0.70) / 0.20, 0, 1);

    // ── Mouse-driven rotation (sphere stays, rotates like a globe) ──
    // Map mouse to rotation target
    const targetRotX = -S.mouseY * 0.9;  // up/down → tilt
    const targetRotY = S.mouseX * 1.2;  // left/right → spin

    rotX.current = lerp(rotX.current, targetRotX, 0.04);
    rotY.current = lerp(rotY.current, targetRotY, 0.04);

    if (groupRef.current) {
      groupRef.current.rotation.x = rotX.current + t * 0.04 * (1 - explodeT);
      groupRef.current.rotation.y = rotY.current + t * 0.06 * (1 - explodeT * 0.8);

      // Animación épica de creación
      groupRef.current.scale.setScalar(S.introScale);
    }

    // ── Distortion reacts to mouse speed ──
    const speed = Math.sqrt(S.mouseVX ** 2 + S.mouseVY ** 2);
    const targetDistort = lerp(0.28, 0.85, clamp(speed * 15, 0, 1));

    if (innerRef.current?.material) {
      S.distort = lerp(S.distort || 0.28, targetDistort, 0.06);
      innerRef.current.material.distort = S.distort;
      // Desvanece en scroll y depende de introSolid al cargar
      const scrollOpacity = lerp(0.22, 0.0, easeInOut3(clamp(explodeT * 1.3, 0, 1)));
      innerRef.current.material.opacity = scrollOpacity * S.introSolid;
    }
    if (innerWireRef.current?.material) {
      innerWireRef.current.material.distort = S.distort;
      innerWireRef.current.material.opacity = 0.8 * S.introWireframe;
    }

    // ── Specular probe light follows mouse around sphere ──
    if (lightRef.current) {
      const lx = S.mouseX * 3.5;
      const ly = S.mouseY * 2.5;
      lightRef.current.position.x = lerp(lightRef.current.position.x, lx, 0.08);
      lightRef.current.position.y = lerp(lightRef.current.position.y, ly, 0.08);
    }

    // ── Outer wireframe ──
    if (outerRef.current) {
      const outerOpacity = lerp(0.12, 0.0, explodeT);
      outerRef.current.material.opacity = outerOpacity;
      const outerScale = lerp(1.0, 18, explodeT);
      outerRef.current.scale.setScalar(outerScale);
    }

    // ── Glowing core ──
    if (coreRef.current) {
      const breathing = 1 + Math.sin(t * 1.4) * 0.06;
      const coreScale = lerp(breathing, 0.01, easeInOut3(clamp(explodeT * 1.5, 0, 1)));
      coreRef.current.scale.setScalar(coreScale);
      if (coreRef.current.material) {
        coreRef.current.material.emissiveIntensity = lerp(1.8, 8, clamp(explodeT * 2, 0, 1));
      }
    }

    // ── Rotating rings ──
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.35 + rotX.current * 0.3;
      ring1Ref.current.rotation.y = t * 0.22;
      const rScale = lerp(1, 22, explodeT);
      ring1Ref.current.scale.setScalar(rScale);
      ring1Ref.current.material.opacity = lerp(0.18, 0, clamp(explodeT * 1.8, 0, 1));
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.28 + rotY.current * 0.3;
      ring2Ref.current.rotation.z = t * 0.18 + Math.PI / 3;
      const rScale = lerp(0.85, 22, explodeT);
      ring2Ref.current.scale.setScalar(rScale);
      ring2Ref.current.material.opacity = lerp(0.14, 0, clamp(explodeT * 1.6, 0, 1));
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.2 + Math.PI / 5;
      ring3Ref.current.rotation.z = -t * 0.15;
      const rScale = lerp(0.72, 22, explodeT);
      ring3Ref.current.scale.setScalar(rScale);
      ring3Ref.current.material.opacity = lerp(0.10, 0, clamp(explodeT * 1.4, 0, 1));
    }
  });

  return (
    <group ref={groupRef}>
      {/* Probe / specular light that orbits with the mouse */}
      <pointLight ref={lightRef} position={[3, 2, 4]} color="#00f5ff" intensity={3.5} distance={10} />
      <pointLight position={[0, 0, 3]} color="#ffffff" intensity={0.4} distance={6} />

      {/* Outer icosahedron wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.6}
          transparent opacity={0.12} wireframe depthWrite={false} />
      </mesh>

      {/* Distorted sphere — main body */}
      <Float speed={1.2} floatIntensity={0.4} rotationIntensity={0}>
        <mesh ref={innerRef}>
          <sphereGeometry args={[0.72, 64, 64]} />
          <MeshDistortMaterial
            color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.4}
            distort={0.28} speed={3} roughness={0.1} metalness={0.6}
            transparent opacity={0.0} depthWrite={false}
          />
        </mesh>
        <mesh ref={innerWireRef}>
          <sphereGeometry args={[0.725, 32, 32]} />
          <MeshDistortMaterial
            color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.8}
            distort={0.28} speed={3} wireframe transparent opacity={0.8} depthWrite={false}
          />
        </mesh>
      </Float>

      {/* Glowing core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#00f5ff"
          emissiveIntensity={1.8} transparent opacity={1} depthWrite={false} />
      </mesh>

      {/* Three orbital rings */}
      <Torus ref={ring1Ref} args={[1.35, 0.008, 8, 128]}>
        <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.5}
          transparent opacity={0.18} depthWrite={false} />
      </Torus>
      <Torus ref={ring2Ref} args={[1.35, 0.006, 8, 128]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.2}
          transparent opacity={0.14} depthWrite={false} />
      </Torus>
      <Torus ref={ring3Ref} args={[1.35, 0.005, 8, 128]} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.0}
          transparent opacity={0.10} depthWrite={false} />
      </Torus>
    </group>
  );
}

/* ══════════════════════════════════════════════════════════════
   PARTICLES — burst outward on scroll, glitching 1s and 0s
══════════════════════════════════════════════════════════════ */
const GlitchParticleMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color("#00f5ff"),
    opacity: 0.45,
    size: 0.06
  },
  // vertex
  `
  uniform float size;
  attribute float randVal;
  varying float vRand;
  void main() {
    vRand = randVal;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (800.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  // fragment
  `
  uniform float time;
  uniform vec3 color;
  uniform float opacity;
  varying float vRand;

  float hash(float n) { return fract(sin(n) * 1e4); }

  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float glitch = step(0.5, hash(vRand + floor(time * 6.0)));
    
    float alpha = 0.0;
    
    if (glitch < 0.5) {
      // Draw '0'
      float dOuter = max(abs(p.x) - 0.25, abs(p.y) - 0.4);
      float dInner = max(abs(p.x) - 0.12, abs(p.y) - 0.25);
      if (dOuter < 0.0 && dInner > 0.0) alpha = 1.0;
    } else {
      // Draw '1'
      float dLine = max(abs(p.x) - 0.08, abs(p.y) - 0.4);
      // p.y is -0.5 at top. Hook at top left.
      float dHook = max(abs(p.x + 0.1) - 0.1, abs(p.y + 0.25) - 0.1);
      if (dLine < 0.0 || (dHook < 0.0 && p.x < 0.0)) alpha = 1.0;
    }
    
    if (alpha < 0.5) discard;
    gl_FragColor = vec4(color, opacity);
  }
  `
);
extend({ GlitchParticleMaterial });

function Particles({ count = 300 }) {
  const ref = useRef();
  const matRef = useRef();

  const { positions, originals, speeds, rands } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 1.6 + Math.random() * 3.2;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      orig[i3] = pos[i3] = r * Math.sin(ph) * Math.cos(th);
      orig[i3 + 1] = pos[i3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.5;
      orig[i3 + 2] = pos[i3 + 2] = r * Math.cos(ph);
      spd[i] = 0.7 + Math.random() * 0.6;
      rnd[i] = Math.random() * 100.0;
    }
    return { positions: pos, originals: orig, speeds: spd, rands: rnd };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current || !ref.current.geometry.attributes.position) return;
    const t = clock.elapsedTime;
    const sc = S.scroll;
    const arr = ref.current.geometry.attributes.position.array;

    ref.current.rotation.y = t * 0.025;

    const explodeT = easeInOut3(clamp((sc - 0.12) / 0.45, 0, 1));
    const fadeOut = clamp((sc - 0.65) / 0.25, 0, 1);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ox = originals[i3], oy = originals[i3 + 1], oz = originals[i3 + 2];

      const wave = Math.sin(t * 0.55 + ox * 0.65 + oy) * 0.05 * (1 - explodeT);
      const burst = lerp(1.0, 6.0 * speeds[i], explodeT);
      const tx = ox * burst + wave;
      const ty = oy * burst + wave;
      const tz = oz * burst;

      arr[i3] += (tx - arr[i3]) * 0.1;
      arr[i3 + 1] += (ty - arr[i3 + 1]) * 0.1;
      arr[i3 + 2] += (tz - arr[i3 + 2]) * 0.08;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;

    if (matRef.current) {
      matRef.current.time = t;
      matRef.current.opacity = lerp(0.45, 0, fadeOut);
      matRef.current.size = lerp(0.07, 0.02, explodeT);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-randVal" count={count} array={rands} itemSize={1} />
      </bufferGeometry>
      <glitchParticleMaterial ref={matRef} transparent depthWrite={false} />
    </points>
  );
}

/* ══════════════════════════════════════════════════════════════
   POSTPROCESSING — Bloom + Chromatic aberration on explosion
══════════════════════════════════════════════════════════════ */
function Effects() {
  const bloomRef = useRef();
  const chromRef = useRef();

  useFrame(() => {
    const sc = S.scroll;
    const ex = easeInOut3(clamp((sc - 0.12) / 0.45, 0, 1));

    if (bloomRef.current) {
      try {
        const loadFlash = S.introFlash;
        bloomRef.current.intensity = lerp(0.6 + loadFlash, 4.5, Math.sin(ex * Math.PI));
      } catch (e) { }
    }
    if (chromRef.current && chromRef.current.offset) {
      const ca = lerp(0, 0.004, Math.sin(ex * Math.PI));
      try {
        chromRef.current.offset.set(ca, ca);
      } catch (e) { }
    }
  });

  return (
    <EffectComposer>
      <Bloom ref={bloomRef} intensity={0.6} luminanceThreshold={0.15}
        luminanceSmoothing={0.9} mipmapBlur radius={0.8} />
      <ChromaticAberration ref={chromRef}
        blendFunction={BlendFunction.NORMAL}
        offset={[0, 0]} />
    </EffectComposer>
  );
}

/* ══════════════════════════════════════════════════════════════
   CAMERA controller
══════════════════════════════════════════════════════════════ */
function CameraRig() {
  useFrame(({ camera }) => {
    const sc = S.scroll;
    const ex = easeInOut3(clamp((sc - 0.12) / 0.45, 0, 1));

    // Camera zooms in from load, then stops just before center on scroll
    const targetZ = lerp(S.introCameraZ, 0.6, ex);
    camera.position.z = lerp(camera.position.z, targetZ, 0.06);

    // Pan to center while text fades out (0 to 0.12)
    const panT = easeInOut3(clamp(sc / 0.12, 0, 1));
    const baseOffsetX = lerp(-1.2, 0, panT);
    const idleX = baseOffsetX + S.mouseX * 0.08 * (1 - ex);
    const idleY = S.mouseY * 0.06 * (1 - ex);
    camera.position.x = lerp(camera.position.x, idleX, 0.04);
    camera.position.y = lerp(camera.position.y, idleY, 0.04);

    // FOV breath
    camera.fov = lerp(48, 78, ex * 0.6);
    camera.updateProjectionMatrix();
  });
  return null;
}

/* ══════════════════════════════════════════════════════════════
   PORTAL CARDS
══════════════════════════════════════════════════════════════ */
const portals = [
  { num: '01', label: 'Sobre mí', href: '/sobre-mi', desc: 'Quién soy' },
  { num: '02', label: 'Proyectos', href: '/proyectos', desc: 'Lo que construyo' },
  { num: '03', label: 'Currículum', href: '/curriculum', desc: 'Mi experiencia' },
  { num: '04', label: 'Contacto', href: '/contacto', desc: 'Hablemos' },
];

function PortalCard({ portal, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    mouseX.set(x - width / 2);
    mouseY.set(y - height / 2);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      href={portal.href}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '2rem 1.75rem', textDecoration: 'none', borderRadius: '24px',
        border: hovered ? '1px solid rgba(0,245,255,0.4)' : '1px solid rgba(0,245,255,0.08)',
        background: hovered ? 'rgba(0,245,255,0.02)' : 'rgba(6,6,9,0.7)',
        backdropFilter: 'blur(24px)', cursor: 'pointer',
        transition: 'border-color 0.4s, background 0.4s',
        minHeight: '160px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Spotlight */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: useMotionTemplate`radial-gradient(200px circle at calc(50% + ${mouseX}px) calc(50% + ${mouseY}px), rgba(0, 245, 255, 0.15), transparent 80%)`
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(30px)' }}>
        <span style={{ fontSize: '0.62rem', letterSpacing: '0.3em', color: 'rgba(0,245,255,0.5)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          {portal.num}
        </span>
      </div>

      <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(50px)' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: hovered ? 'var(--cyan)' : 'var(--text-1)', letterSpacing: '0.03em', marginBottom: '0.4rem', transition: 'color 0.4s' }}>
          {portal.label}
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{portal.desc}</p>
      </div>

      <motion.div animate={{ x: hovered ? 6 : 0 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', right: '1.75rem', bottom: '2rem', zIndex: 1, transform: 'translateZ(40px)' }}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={hovered ? 'var(--cyan)' : 'rgba(255,255,255,0.2)'} strokeWidth={2} style={{ transition: 'stroke 0.4s' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.div>
    </motion.a>
  );
}

/* ══════════════════════════════════════════════════════════════
   BACKGROUND SCENE (Memoized to prevent re-renders on scroll)
══════════════════════════════════════════════════════════════ */
import React from 'react';

const BackgroundScene = React.memo(() => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <Canvas
      camera={{ position: [0, 0, 25], fov: 48 }}
      gl={{ antialias: false, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.08} />
        <Stars radius={90} depth={80} count={2500} factor={3.5} saturation={0} fade speed={0.2} />
        <CameraRig />
        <Sphere />
        <Particles count={300} />
        <Effects />
      </Suspense>
    </Canvas>
  </div>
));

function VignetteOverlay() {
  const [v, setV] = useState(1);

  useEffect(() => {
    let raf;
    const loop = () => {
      setV(S.introVignette);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  // v: 1 = fully opaque (center covered), 0 = transparent (only edge vignette)
  return (
    <div
      style={{
        position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 40% 50%,
          rgba(6,6,9,${v}) 0%,
          rgba(6,6,9,${(v * 0.4).toFixed(3)}) 45%,
          rgba(6,6,9,0.65) 100%)`,
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN HERO
══════════════════════════════════════════════════════════════ */
export default function Hero() {
  const containerRef = useRef(null);
  const [appState, setAppState] = useState('loading'); // 'loading' | 'solid'
  const [scrollPct, setScrollPct] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    mass: 1.2,
    restDelta: 0.0001
  });

  useEffect(() => {
    const unsub = smoothProgress.on('change', (v) => {
      S.scroll = v;
      setScrollPct(v);
    });
    return unsub;
  }, [smoothProgress]);

  useEffect(() => {
    let lx = 0, ly = 0;
    const fn = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      S.mouseVX = nx - lx;
      S.mouseVY = ny - ly;
      S.mouseX = nx;
      S.mouseY = ny;
      lx = nx; ly = ny;
    };
    window.addEventListener('mousemove', fn);

    // ── Epic Igloo.inc style Timeline Orchestration ──
    const runIntro = async () => {
      animate(1, 0, { duration: 1.5, ease: "easeOut", onUpdate: v => S.introVignette = v });
      await new Promise(r => setTimeout(r, 800));
      animate(25, 5.5, { duration: 5.5, ease: [0.25, 0.1, 0.25, 1], onUpdate: v => S.introCameraZ = v });
      animate(0.001, 1.0, { duration: 3.0, ease: [0.16, 1, 0.3, 1], onUpdate: v => S.introScale = v });
      await new Promise(r => setTimeout(r, 2500));
      animate(0, 8, {
        duration: 0.8,
        ease: "circIn",
        onUpdate: v => S.introFlash = v,
        onComplete: () => {
          animate(8, 0, { duration: 1.5, ease: "easeOut", onUpdate: v => S.introFlash = v });
        }
      });
      await new Promise(r => setTimeout(r, 700));
      animate(1, 0, { duration: 0.5, onUpdate: v => S.introWireframe = v });
      animate(0, 1, { duration: 0.5, onUpdate: v => S.introSolid = v });
      await new Promise(r => setTimeout(r, 1200));
      setAppState('solid');
    };

    runIntro();
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.12], ['0px', '-50px']);
  const scrollHint = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  const portalsOpacity = useTransform(smoothProgress, [0.5, 0.75], [0, 1]);
  const portalsZ = useTransform(smoothProgress, [0.5, 1], [-1200, 0]);
  const portalsY = useTransform(smoothProgress, [0.5, 1], [500, 0]);
  const portalsRotX = useTransform(smoothProgress, [0.5, 1], [45, 0]);

  const showPortals = scrollPct > 0.53;
  const showHeroText = scrollPct < 0.15;
  const isExploding = scrollPct >= 0.12 && scrollPct < 0.55;
  const showEnter = isExploding && scrollPct > 0.16;

  return (
    <div ref={containerRef} style={{ height: '350vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' }}>

        <BackgroundScene />
        <VignetteOverlay />

        <motion.div style={{
          position: 'absolute', top: 0, left: 0, height: '1px', zIndex: 10,
          background: 'linear-gradient(to right, transparent, var(--cyan), transparent)',
          width: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
          opacity: useTransform(smoothProgress, [0, 0.04, 0.96, 1], [0, 0.6, 0.6, 0]),
        }} />

        {/* ══ PHASE 1 — Hero text ══ */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
            opacity: heroOpacity, y: heroY,
            pointerEvents: showHeroText ? 'auto' : 'none',
          }}
        >
          <div style={{ textAlign: 'left', paddingLeft: 'min(12vw, 180px)', width: '100%', maxWidth: '800px' }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={appState === 'solid' ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              style={{ marginBottom: '2rem' }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.38rem 1.1rem', borderRadius: '999px',
                fontSize: '0.63rem', letterSpacing: '0.26em', fontWeight: 500,
                color: '#4ade80',
                border: '1px solid rgba(74,222,128,0.2)',
                background: 'rgba(74,222,128,0.05)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', flexShrink: 0, animation: 'pulse 2s ease-in-out infinite' }} />
                DISPONIBLE PARA PROYECTOS
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 48, filter: 'blur(16px)' }}
              animate={appState === 'solid' ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 48, filter: 'blur(16px)' }}
              transition={{ delay: 0.3, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 9vw, 6rem)',
                fontWeight: 900, lineHeight: 1.05,
                letterSpacing: '-0.02em', marginBottom: '1.1rem',
                color: 'var(--text-1)',
              }}
            >
              Stanislav<br />
              <span style={{
                color: 'var(--cyan)',
                textShadow: '0 0 40px rgba(0,245,255,0.4)',
              }}>
                Kalynovskyi
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={appState === 'solid' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'var(--text-2)', fontWeight: 300, letterSpacing: '0.04em', marginBottom: '0.6rem' }}
            >
              Desarrollador Full-Stack
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={appState === 'solid' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}
            >
              Valencia, España
            </motion.p>
          </div>
        </motion.div>

        {/* ══ PHASE 2 — "Entering" center label ══ */}
        <AnimatePresence>
          {showEnter && (
            <motion.div
              key="entering"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 2,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '0.75rem', pointerEvents: 'none',
              }}
            >
              <motion.div
                animate={{ scaleX: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 32, height: 1, background: 'rgba(0,245,255,0.4)' }}
              />
              <p style={{
                fontSize: '0.6rem', letterSpacing: '0.5em', color: 'rgba(0,245,255,0.5)',
                fontFamily: 'var(--font-display)',
              }}>
                ENTRANDO
              </p>
              <motion.div
                animate={{ scaleX: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                style={{ width: 32, height: 1, background: 'rgba(0,245,255,0.4)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ PHASE 3 — Navigation portals (Scroll-driven 3D) ══ */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 3,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '2rem', gap: '2rem',
            opacity: portalsOpacity,
            y: portalsY,
            z: portalsZ,
            rotateX: portalsRotX,
            transformPerspective: 1600,
            transformStyle: 'preserve-3d',
            pointerEvents: showPortals ? 'auto' : 'none'
          }}
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={{ textAlign: 'center' }}
          >
            <p style={{
              fontSize: '0.6rem', letterSpacing: '0.4em', color: 'var(--text-3)',
              fontFamily: 'var(--font-display)', marginBottom: '0.4rem',
            }}>
              ELIGE TU DESTINO
            </p>
            <div style={{ width: '40px', height: '1px', background: 'rgba(0,245,255,0.25)', margin: '0 auto' }} />
          </motion.div>

          {/* Portal grid - Asymmetrical staggered layout */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem',
            width: '100%', maxWidth: '640px', padding: '1rem'
          }}>
            {portals.map((p, i) => (
              <div key={p.href} style={{ width: 'calc(50% - 0.625rem)', minWidth: '240px', marginTop: i % 2 === 1 ? '4rem' : '0' }}>
                <PortalCard portal={p} index={i} visible={showPortals} />
              </div>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '0.62rem', color: 'var(--text-3)', letterSpacing: '0.28em',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--font-display)', padding: '0.5rem 1rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-2)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
          >
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M5 15l7-7 7 7" />
            </svg>
            VOLVER AL INICIO
          </motion.button>
        </motion.div>

        {/* ══ Scroll hint ══ */}
        <motion.div
          style={{
            position: 'absolute', bottom: '2.5rem', left: '50%',
            transform: 'translateX(-50%)', zIndex: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
            opacity: scrollHint, pointerEvents: 'none',
            visibility: appState === 'solid' ? 'visible' : 'hidden'
          }}
        >
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.4em', color: 'var(--text-3)', textShadow: '0 0 10px rgba(0,245,255,0.4)' }}>SCROLL</span>
          <motion.div
            animate={{
              scaleY: [1, 1.4, 1],
              opacity: [0.4, 1, 0.4],
              filter: ['drop-shadow(0 0 2px rgba(0,245,255,0))', 'drop-shadow(0 0 10px rgba(0,245,255,0.8))', 'drop-shadow(0 0 2px rgba(0,245,255,0))']
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '2px', height: '44px',
              background: 'linear-gradient(to bottom, var(--cyan), transparent)',
              transformOrigin: 'top',
              borderRadius: '2px'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
