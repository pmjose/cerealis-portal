import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, animate, type MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Database, Brain, Bot, Share2, ShieldCheck, Store, Check, UserCheck, Sparkles, ChevronDown, Wheat, Factory, Truck, LineChart, Users,
} from 'lucide-react';
import { useData } from '../data';
import { pick, LangToggle } from '../i18n';
import { fmtNum, fmtEurM } from '../i18n/format';
import * as H from './copy/home';

const EASE = [0.16, 1, 0.3, 1] as const;

// O HashRouter trata "#valor" como rota (e volta à porta de acesso), por isso a navegação interna faz scroll por id.
const scrollToId = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export function CerealisSymbol({ size = 120, draw = false, color = '#121210', delay = 0 }: { size?: number; draw?: boolean; color?: string; delay?: number }) {
  const paths = [
    'M32.76,14.56c.51,2.38-.26,4.56-1.72,4.87-1.46.31-3.06-1.37-3.57-3.75-.51-2.38.26-4.57,1.72-4.88,1.46-.31,3.05,1.37,3.56,3.76Z',
    'M44.29,39.77c7.7-8.97,10.72-18.94,6.77-22.27-3.95-3.34-13.4,1.23-21.09,10.19-7.69,8.96-10.72,18.93-6.77,22.27,3.95,3.33,13.39-1.23,21.09-10.19ZM21.83,52.69c-5.12-4.36-1.78-16.68,7.54-27.44,9.32-10.76,21.09-15.9,26.21-11.54,5.11,4.36,1.71,16.62-7.61,27.39-9.32,10.76-21.02,15.96-26.14,11.59',
    'M30.43,25.51c1.41.61,3.89,1.82,5.32,2.62,4.55,2.56,8.34,5.62,10.93,8.61.81-1.11,1.54-2.22,2.2-3.32-3.13-3.23-7.37-6.41-12.38-9.05-.74-.39-2.74-1.43-3.48-1.76-9.5-4.28-21.98-6.1-25.3.18-2.65,5.01,2.64,13.24,12.18,19.74.16-.7.35-1.41.57-2.14-6.62-5.21-10.11-11.14-8.12-14.68,2.3-4.07,10.36-3.55,18.08-.21',
    'M35.22,49.74c8.28,2.51,16.46,1.94,18.81-2.51,1.5-2.84.44-6.71-2.51-10.71-.78,1.13-1.63,2.26-2.54,3.37,1.57,2.68,2,5.14.97,6.97-1.62,2.87-6.47,3.55-13,1.8-4.12-1.1-7.3-2.48-10.4-4.22-1.61-.9-3.12-1.87-4.52-2.87-.19.72-.34,1.41-.43,2.07,1.15.72,2.35,1.42,3.61,2.08,2.63,1.39,6.97,3.08,10.01,4.01',
  ];
  return (
    <svg viewBox="4 9 54 46" width={size} height={size * 46 / 54} aria-label="Cerealis">
      {paths.map((d, i) => draw ? (
        <motion.path key={i} d={d} fillRule="evenodd" stroke={color} strokeWidth={0.35}
          initial={{ pathLength: 0, fill: 'rgba(0,0,0,0)' }} animate={{ pathLength: 1, fill: color }}
          transition={{ pathLength: { duration: 1.8, delay: delay + i * 0.18, ease: 'easeInOut' }, fill: { duration: .8, delay: delay + 1.5 + i * 0.1 } }} />
      ) : <path key={i} d={d} fill={color} fillRule="evenodd" />)}
    </svg>
  );
}

function Counter({ to, dec = 0, prefix = '', suffix = '' }: { to: number; dec?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: EASE, onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{prefix}{fmtNum(v, dec)}{suffix}</span>;
}

function Reveal({ children, delay = 0, y = 50, style }: { children: React.ReactNode; delay?: number; y?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, y, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12%' }} transition={{ duration: 1.1, delay, ease: EASE }} style={style}>{children}</motion.div>
  );
}

/* ── Herói ── */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const op = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const glow = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const tx = pick(H).hero;
  return (
    <section ref={ref} style={{ height: '150vh', position: 'relative' }}>
      <motion.div style={{ scale, opacity: op, y, position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <motion.div style={{ scale: glow, position: 'absolute', width: 760, height: 760, borderRadius: '50%', background: 'radial-gradient(circle, rgba(253,183,4,.28), rgba(253,183,4,0) 65%)', top: '50%', left: '50%', marginLeft: -380, marginTop: -470, pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5, duration: 1 }} style={{ position: 'relative' }}>
          <CerealisSymbol size={124} draw delay={0.5} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 1, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: 18, margin: '26px 0 34px' }}>
          <img src="./logos/cerealis-wordmark.svg" height={30} alt="Cerealis" />
          <span style={{ fontSize: 22, color: 'var(--faint)', fontWeight: 300 }}>×</span>
          <img src="./logos/snowflake.svg" height={30} alt="Snowflake" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, delay: 1.9, ease: EASE }}
          className="h-xl" style={{ fontSize: 'clamp(40px, 5.7vw, 92px)', maxWidth: 1340 }}>
          {tx.title}<br /><span className="gold-text">{tx.titleGold}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1.2 }} className="lead" style={{ maxWidth: 780, marginTop: 30 }}>
          {tx.leadPre}<b style={{ color: 'var(--ink)' }}>Espiga</b>{tx.leadPost}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.9, duration: .9 }} style={{ display: 'flex', gap: 12, marginTop: 38 }}>
          <Link to="/portal" className="btn">{tx.enter} <ArrowRight size={16} /></Link>
          <button onClick={scrollToId('valor')} className="btn-ghost" style={{ padding: '12px 20px', fontSize: 15 }}>{tx.discover}</button>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.4, 1] }} transition={{ delay: 3.6, duration: 2.4, repeat: Infinity, repeatType: 'reverse' }}
          style={{ position: 'absolute', bottom: 34, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontSize: 12, letterSpacing: '.16em' }} className="faint">
          {tx.scroll} <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── 1919 → hoje, sobre a colheita ── */
function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const scale = useTransform(p, [0, 1], [1.22, 1]);
  const dark = useTransform(p, [0, 0.15, 0.9], [0.15, 0.55, 0.7]);
  const { alt, lines } = pick(H).story;
  return (
    <section ref={ref} style={{ height: '320vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <motion.img src="./img/colheita.jpg" alt={alt} style={{ scale, position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <motion.div style={{ opacity: dark, position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0F0E0B 0%, rgba(15,14,11,.55) 45%, #0F0E0B 100%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'grid', placeItems: 'center', padding: 32 }}>
          {lines.map(([y, t], i) => <StoryLine key={y} p={p} i={i} n={lines.length} year={y} text={t} />)}
        </div>
      </div>
    </section>
  );
}
function StoryLine({ p, i, n, year, text }: { p: MotionValue<number>; i: number; n: number; year: string; text: string }) {
  const a = 0.08 + (i / n) * 0.86, b = a + 0.86 / n;
  const last = i === n - 1;
  const op = useTransform(p, last ? [a, a + 0.08, 1] : [a, a + 0.06, b - 0.06, b], last ? [0, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(p, [a, b], [60, -60]);
  return (
    <motion.div style={{ opacity: op, y, position: 'absolute', textAlign: 'center', color: '#FFF8E6', maxWidth: 1000, padding: '0 24px' }}>
      <div className="h-xl" style={{ fontSize: 'clamp(70px, 13vw, 190px)', color: last ? '#FDB704' : '#FFF8E6', textShadow: '0 10px 60px rgba(0,0,0,.4)' }}>{year}</div>
      <div className="display" style={{ fontSize: 'clamp(22px, 2.6vw, 36px)', fontWeight: 600, marginTop: 14, letterSpacing: '-0.025em', lineHeight: 1.2, textWrap: 'balance' }}>{text}</div>
    </motion.div>
  );
}

/* ── Faixa amarela com números ── */
function Numbers() {
  const { GROUP } = useData().facts;
  const { m, kt, numbers: tx } = pick(H);
  const values: React.ReactNode[] = [
    <Counter to={GROUP.revenue2026E} dec={0} prefix="€" suffix={m} />,
    <Counter to={226} suffix={kt} />,
    <Counter to={GROUP.employees} />,
    <Counter to={140} suffix="+" />,
  ];
  const items = values.map((v, i): [React.ReactNode, string] => [v, tx.labels[i]]);
  return (
    <section className="yellow-band" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -120, top: -80, opacity: .1 }}><CerealisSymbol size={620} /></div>
      <div className="v-section" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <Reveal><div className="eyebrow" style={{ color: 'var(--ink)', opacity: .7 }}>{tx.eyebrow}</div></Reveal>
        <Reveal delay={.1}><h2 className="h-lg" style={{ fontSize: 'clamp(38px, 5vw, 72px)', marginTop: 14, maxWidth: 900 }}>{tx.title}</h2></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 28, marginTop: 70 }}>
          {items.map(([v, l], i) => (
            <Reveal key={i} delay={.1 + i * .1}>
              <div style={{ borderTop: '2px solid var(--ink)', paddingTop: 20 }}>
                <div className="h-lg" style={{ fontSize: 'clamp(38px, 4.4vw, 64px)' }}>{v}</div>
                <div style={{ fontSize: 16, marginTop: 8, lineHeight: 1.45, opacity: .8 }}>{l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Fontes dispersas que convergem ── */
function Sources() {
  const tx = pick(H).sources;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const coreScale = useTransform(p, [0.45, 0.75], [0.2, 1]);
  const coreOp = useTransform(p, [0.45, 0.7], [0, 1]);
  const t1 = useTransform(p, [0, 0.06, 0.24, 0.32], [0, 1, 1, 0]);
  const t2 = useTransform(p, [0.62, 0.75], [0, 1]);
  return (
    <section ref={ref} className="ink-band" style={{ height: '300vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 40% at 50% 50%, rgba(41,181,232,.12), transparent 70%)' }} />
        <motion.div style={{ opacity: t1, position: 'absolute', top: '11vh', width: '100%', textAlign: 'center', padding: '0 24px' }}>
          <div className="eyebrow">{tx.eyebrow}</div>
          <h2 className="h-lg" style={{ fontSize: 'clamp(34px, 4.6vw, 64px)', marginTop: 14, textWrap: 'balance' }}>{tx.title}<br /><span style={{ color: '#8E897C' }}>{tx.titleMuted}</span></h2>
        </motion.div>
        {tx.chips.map((s, i) => <SourceChip key={s} p={p} i={i} n={tx.chips.length} label={s} />)}
        <motion.div style={{ scale: coreScale, opacity: coreOp, position: 'absolute', left: '50%', top: '50%', width: 300, height: 300, marginLeft: -150, marginTop: -150, borderRadius: '50%', display: 'grid', placeItems: 'center',
          background: 'radial-gradient(circle at 50% 40%, rgba(41,181,232,.45), rgba(17,86,127,.25) 55%, rgba(17,86,127,0) 72%)' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="./logos/snowflake.svg" height={34} alt="Snowflake" style={{ margin: '0 auto', filter: 'brightness(0) invert(1)' }} />
            <div className="display" style={{ fontSize: 28, fontWeight: 700, marginTop: 14, letterSpacing: '-0.03em' }}>Espiga</div>
            <div style={{ fontSize: 13, color: '#BDE9F8', marginTop: 4 }}>{tx.core}</div>
          </div>
        </motion.div>
        <motion.div style={{ opacity: t2, position: 'absolute', bottom: '10vh', width: '100%', textAlign: 'center', padding: '0 24px' }}>
          <h2 className="h-lg" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>{tx.end}<span className="sf-text">{tx.endSf}</span></h2>
          <p style={{ color: '#A9A496', fontSize: 18, marginTop: 14 }}>{tx.endSub}</p>
        </motion.div>
      </div>
    </section>
  );
}
function SourceChip({ p, i, n, label }: { p: MotionValue<number>; i: number; n: number; label: string }) {
  const ang = (i / n) * Math.PI * 2;
  const sx = Math.cos(ang * 3.1 + i) * (28 + (i % 4) * 4), sy = 12 + Math.sin(ang * 2.3 + i * 1.7) * (14 + (i % 3) * 4);
  const rx = Math.cos(ang) * 26, ry = Math.sin(ang) * 24;
  const x = useTransform(p, [0, 0.38, 0.62], [`${sx}vw`, `${rx}vw`, '0vw']);
  const y = useTransform(p, [0, 0.38, 0.62], [`${sy}vh`, `${ry}vh`, '0vh']);
  const op = useTransform(p, [0, 0.05, 0.55, 0.64], [0, 1, 1, 0]);
  const sc = useTransform(p, [0.4, 0.62], [1, 0.3]);
  return (
    <motion.div style={{ x, y, opacity: op, scale: sc, position: 'absolute', left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}>
      <div style={{ padding: '9px 15px', borderRadius: 999, border: '1px solid rgba(255,255,255,.14)', background: 'rgba(255,255,255,.06)', backdropFilter: 'blur(10px)', fontSize: 14, whiteSpace: 'nowrap', color: '#EAE6DA' }}>{label}</div>
    </motion.div>
  );
}

/* ── Cadeia de valor em scroll horizontal ── */
const CHAIN = [
  { img: 'seara', icon: Wheat, step: '01' },
  { img: 'colheita', icon: ShieldCheck, step: '02' },
  { img: 'farinhas', icon: Factory, step: '03' },
  { img: 'forno', icon: LineChart, step: '04' },
  { img: 'massas', icon: Truck, step: '05' },
  { img: 'cereais', icon: Users, step: '06' },
];
function Chain() {
  const tx = pick(H).chain;
  const steps = CHAIN.map((c, i) => ({ ...c, ...tx.steps[i] }));
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(p, [0.05, 0.95], ['0vw', '-196vw']);
  const bar = useTransform(p, [0.05, 0.95], ['0%', '100%']);
  return (
    <section ref={ref} id="plataforma" style={{ height: '420vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ padding: '0 6vw', marginBottom: 40 }}>
          <div className="eyebrow">{tx.eyebrow}</div>
          <h2 className="h-lg" style={{ fontSize: 'clamp(36px, 4.6vw, 68px)', marginTop: 12 }}>{tx.title}<span className="gold-text">{tx.titleGold}</span></h2>
        </div>
        <motion.div style={{ x, display: 'flex', gap: 28, paddingLeft: '6vw', width: 'max-content' }}>
          {steps.map(c => (
            <div key={c.step} className="card" style={{ width: 'min(46vw, 640px)', borderRadius: 30, overflow: 'hidden', display: 'grid', gridTemplateRows: '300px auto', flexShrink: 0 }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={`./img/${c.img}.jpg`} alt={c.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 18, left: 18, padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,.88)', backdropFilter: 'blur(8px)', fontSize: 13, fontWeight: 600, display: 'flex', gap: 8, alignItems: 'center' }}><c.icon size={15} /> {c.step}</div>
              </div>
              <div style={{ padding: '26px 30px 30px' }}>
                <div className="display" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em' }}>{c.t}</div>
                <p className="muted" style={{ fontSize: 16, lineHeight: 1.6, marginTop: 10, minHeight: 104 }}>{c.d}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 14, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                  <span className="h-lg" style={{ fontSize: 40 }}>{c.k}</span><span className="muted">{c.kl}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        <div style={{ margin: '40px 6vw 0', height: 3, background: 'var(--line)', borderRadius: 3, overflow: 'hidden' }}><motion.div style={{ width: bar, height: '100%', background: 'var(--gold)' }} /></div>
      </div>
    </section>
  );
}

/* ── Seis razões ── */
const PILLAR_ICONS = [Database, Brain, Bot, Share2, ShieldCheck, Store];
function Pillars() {
  const tx = pick(H).pillars;
  const pillars = tx.items.map((p, i) => ({ icon: PILLAR_ICONS[i], ...p }));
  return (
    <section className="v-section">
      <Reveal><div className="eyebrow" style={{ textAlign: 'center' }}>{tx.eyebrow}</div></Reveal>
      <Reveal delay={.1}><h2 className="h-lg" style={{ fontSize: 'clamp(40px, 5.4vw, 80px)', textAlign: 'center', marginTop: 14 }}>{tx.title}<br /><span className="faint">{tx.titleMuted}</span></h2></Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 18, marginTop: 70 }}>
        {pillars.map(({ icon: I, t, d }, i) => (
          <motion.div key={t} className="glass" whileHover={{ y: -6 }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ delay: i * .08, duration: .8, ease: EASE }}
            style={{ padding: 32, minHeight: 250, background: i === 2 ? 'linear-gradient(160deg, #FFF3C4, #FFFFFF)' : undefined }}>
            <div style={{ width: 50, height: 50, borderRadius: 15, display: 'grid', placeItems: 'center', background: i % 2 ? '#E6F6FD' : 'var(--gold-wash)', marginBottom: 22 }}>
              <I size={24} color={i % 2 ? '#1D8FC4' : '#B37F00'} />
            </div>
            <h3 className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.02em' }}>{t}</h3>
            <p className="muted" style={{ lineHeight: 1.62, fontSize: 15.5 }}>{d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Valor ── */
// € M por ano em regime, pela ordem dos casos de uso em copy/home.ts.
const VALUE_M = [3.4, 2.6, 1.9, 1.3, 1.1, 1.0, 0.6, 0.5];
function Value() {
  const { GROUP } = useData().facts;
  const { m, value: tx } = pick(H);
  return (
    <section id="valor" style={{ background: '#fff', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="v-section" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 70, alignItems: 'center' }}>
        <div>
          <Reveal><div className="eyebrow">{tx.eyebrow}</div></Reveal>
          <Reveal delay={.1}><div className="h-xl" style={{ fontSize: 'clamp(64px, 9vw, 140px)', marginTop: 18 }}><Counter to={GROUP.valueRunRate} dec={1} prefix="€" suffix={m} /></div></Reveal>
          <Reveal delay={.2}><p className="display" style={{ fontSize: 30, fontWeight: 650, letterSpacing: '-0.03em', marginTop: 8 }}>{tx.perYear}</p></Reveal>
          <Reveal delay={.3}><p className="lead" style={{ marginTop: 22, fontSize: 18 }}>{tx.leadPre}<b style={{ color: 'var(--ink)' }}>{tx.captured(fmtEurM(GROUP.valueYTD))}</b>{tx.leadPost}</p></Reveal>
        </div>
        <div style={{ display: 'grid', gap: 18 }}>
          {tx.cases.map(([t, f], i) => { const v = VALUE_M[i]; return (
            <Reveal key={t} delay={i * .06} y={24}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div><span style={{ fontWeight: 600, fontSize: 15.5 }}>{t}</span> <span className="faint" style={{ fontSize: 13 }}>· {f}</span></div>
                <span className="display" style={{ fontWeight: 700, fontSize: 18 }}>{fmtEurM(v)}</span>
              </div>
              <div className="bar" style={{ height: 10 }}>
                <motion.i initial={{ width: 0 }} whileInView={{ width: `${(v / 3.4) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: .2 + i * .07, ease: EASE }}
                  style={{ background: i === 0 ? 'linear-gradient(90deg, #E09A00, #FDB704)' : 'var(--ink)' }} />
              </div>
            </Reveal>
          ); })}
        </div>
      </div>
    </section>
  );
}

/* ── Agente ao vivo ── */
function AgentLive() {
  const { PLATFORM } = useData();
  const tx = pick(H).agent;
  const AGENT = tx.steps;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20%' });
  const [s, setS] = useState(-1);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setS(x => (x >= AGENT.length + 2 ? 0 : x + 1)), 1300);
    return () => clearInterval(id);
  }, [inView, AGENT.length]);
  return (
    <section className="v-section" id="agentes" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 70, alignItems: 'center' }}>
      <div>
        <Reveal><div className="eyebrow">{tx.eyebrow}</div></Reveal>
        <Reveal delay={.1}><h2 className="h-lg" style={{ fontSize: 'clamp(38px, 4.8vw, 70px)', marginTop: 14 }}>{tx.title}<br /><span className="faint">{tx.titleMuted}</span></h2></Reveal>
        <Reveal delay={.2}><p className="lead" style={{ marginTop: 24, fontSize: 18 }}>{tx.lead(PLATFORM.agents)}</p></Reveal>
        <Reveal delay={.3}>
          <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
            <span className="chip" style={{ padding: '7px 14px', fontSize: 13 }}><Bot size={14} /> {tx.auto(PLATFORM.auto)}</span>
            <span className="chip gold" style={{ padding: '7px 14px', fontSize: 13 }}><UserCheck size={14} /> {tx.human(PLATFORM.human)}</span>
            <span className="chip sf" style={{ padding: '7px 14px', fontSize: 13 }}><Sparkles size={14} /> {tx.actions}</span>
          </div>
        </Reveal>
      </div>
      <div ref={ref} className="glass" style={{ padding: 30, borderRadius: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div><div className="faint" style={{ fontSize: 12, letterSpacing: '.1em', fontWeight: 600 }}>{tx.cardEyebrow}</div><div className="display" style={{ fontSize: 21, fontWeight: 700, marginTop: 4 }}>{tx.cardTitle}</div></div>
          <span className="chip gold"><UserCheck size={12} /> {tx.hitl}</span>
        </div>
        {AGENT.map(([t, d], i) => {
          const done = i < s, active = i === s, isApproval = i === 4;
          const col = done ? '#17924B' : active ? (isApproval ? '#D99A00' : '#1D8FC4') : '#C9C4B6';
          return (
            <div key={t} style={{ display: 'flex', gap: 14, opacity: i <= s ? 1 : .38, transition: 'opacity .5s' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', border: `2px solid ${col}`, display: 'grid', placeItems: 'center', background: done ? '#17924B18' : '#fff', transition: '.4s' }}>
                  {done ? <Check size={13} color="#17924B" /> : <span style={{ fontSize: 11, fontWeight: 600, color: col }}>{i + 1}</span>}
                </div>
                {i < AGENT.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 16, background: done ? '#17924B55' : 'var(--line)' }} />}
              </div>
              <div style={{ paddingBottom: 15 }}>
                <div style={{ fontSize: 13.5, fontWeight: 650, color: i <= s ? col : undefined }}>{t}</div>
                <div style={{ fontSize: 14, marginTop: 2, lineHeight: 1.5 }} className={i <= s ? '' : 'muted'}>{d}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Três países / integrações ── */
const NODES = [{ x: 14, y: 70, flag: 'PT' }, { x: 33, y: 46, flag: 'ES' }, { x: 78, y: 26, flag: 'CZ' }];
function Countries() {
  const tx = pick(H).countries;
  const nodes = NODES.map((n, i) => ({ ...n, ...tx.nodes[i] }));
  return (
    <section className="ink-band" style={{ overflow: 'hidden' }}>
      <div className="v-section">
        <Reveal><div className="eyebrow">{tx.eyebrow}</div></Reveal>
        <Reveal delay={.1}><h2 className="h-lg" style={{ fontSize: 'clamp(38px, 5vw, 74px)', marginTop: 14, maxWidth: 900 }}>{tx.title}<span style={{ color: '#FDB704' }}>{tx.titleGold}</span></h2></Reveal>
        <div style={{ position: 'relative', height: 420, marginTop: 50, borderRadius: 30, background: 'radial-gradient(60% 80% at 50% 50%, rgba(41,181,232,.10), transparent 70%)', border: '1px solid rgba(255,255,255,.08)' }}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {nodes.map(n => <line key={n.flag} x1={n.x} y1={n.y} x2={52} y2={56} stroke="#29B5E8" strokeWidth={0.25} className="flow" vectorEffect="non-scaling-stroke" />)}
          </svg>
          <motion.div initial={{ scale: .6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }}
            style={{ position: 'absolute', left: '52%', top: '56%', transform: 'translate(-50%,-50%)', width: 170, height: 170, marginLeft: -85, marginTop: -85, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'radial-gradient(circle, rgba(41,181,232,.5), rgba(17,86,127,.2) 60%, transparent 72%)' }}>
            <div style={{ textAlign: 'center' }}><img src="./logos/snowflake.svg" height={20} alt="Snowflake" style={{ filter: 'brightness(0) invert(1)', margin: '0 auto' }} /><div style={{ fontWeight: 700, marginTop: 8 }}>Espiga</div></div>
          </motion.div>
          {nodes.map((n, i) => (
            <motion.div key={n.flag} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .3 + i * .2, duration: .9 }}
              style={{ position: 'absolute', left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%,-50%)', marginLeft: -110, marginTop: -50 }}>
              <div className="glass-dark" style={{ padding: '14px 18px', width: 220, borderRadius: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="chip dark" style={{ background: '#FDB704', color: '#121210', borderColor: '#FDB704', fontWeight: 700 }}>{n.flag}</span><b>{n.t}</b></div>
                <div style={{ fontSize: 13, color: '#B8B3A5', marginTop: 6 }}>{n.d}</div>
                <div style={{ fontSize: 12.5, color: '#7DD8F7', marginTop: 4 }}>{n.s}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 18, marginTop: 28 }}>
          {tx.milestones.map(([y, t, d], i) => (
            <Reveal key={y} delay={i * .1}>
              <div style={{ borderTop: '1px solid rgba(255,255,255,.18)', paddingTop: 18 }}>
                <div style={{ color: '#FDB704', fontWeight: 700, fontSize: 14 }}>{y}</div>
                <div className="display" style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{t}</div>
                <p style={{ color: '#A9A496', marginTop: 8, lineHeight: 1.55 }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Marcas ── */
function Brands() {
  const { BRANDS } = useData().facts;
  const tx = pick(H).brands;
  const shelf = BRANDS.filter(b => b.img);
  return (
    <section style={{ padding: '140px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: '0 32px' }}>
        <Reveal><div className="eyebrow">{tx.eyebrow}</div></Reveal>
        <Reveal delay={.1}><h2 className="h-lg" style={{ fontSize: 'clamp(38px, 5vw, 74px)', marginTop: 14 }}>{tx.title}<span className="faint">{tx.titleMuted}</span></h2></Reveal>
        <Reveal delay={.2}><p className="lead" style={{ maxWidth: 760, marginTop: 18, fontSize: 18 }}>{tx.lead}</p></Reveal>
      </div>
      <div style={{ display: 'flex', gap: 22, marginTop: 60, width: 'max-content', animation: 'marquee 60s linear infinite' }}>
        {[...shelf, ...shelf].map((b, i) => (
          <div key={i} className="card" style={{ width: 460, padding: '20px 22px 10px', borderRadius: 26, flexShrink: 0 }}>
            <img src={`./brands/${b.img}`} alt={b.name} style={{ width: '100%', height: 220, objectFit: 'contain' }} loading="lazy" />
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 4px 8px', fontSize: 13.5 }}><b>{b.name}</b><span className="muted">{b.cat}</span></div>
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

/* ── Confiança ── */
function Trust() {
  const tx = pick(H).trust;
  const items = tx.items;
  return (
    <section style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
      <div className="v-section" style={{ textAlign: 'center' }}>
        <Reveal><ShieldCheck size={44} style={{ margin: '0 auto' }} color="#D99A00" /></Reveal>
        <Reveal delay={.1}><h2 className="h-lg" style={{ fontSize: 'clamp(38px, 5vw, 72px)', marginTop: 20 }}>{tx.title}</h2></Reveal>
        <Reveal delay={.2}><p className="lead" style={{ maxWidth: 760, margin: '18px auto 0', fontSize: 18 }}>{tx.lead}</p></Reveal>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40, maxWidth: 900, marginInline: 'auto' }}>
          {items.map((t, i) => (
            <motion.span key={t} className="chip" initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .05 }}
              style={{ padding: '9px 16px', fontSize: 14 }}><Check size={14} color="#17924B" /> {t}</motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { PLATFORM } = useData();
  const { nav, cta, footer } = pick(H);
  return (
    <div style={{ overflowX: 'clip', background: '#FBF9EE' }}>
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ position: 'fixed', inset: 0, background: '#FCFAE2', zIndex: 300, pointerEvents: 'none' }} />
      <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: .9, ease: EASE }} className="glass"
        style={{ position: 'fixed', top: 14, left: '50%', translateX: '-50%', zIndex: 100, display: 'flex', alignItems: 'center', gap: 22, padding: '9px 10px 9px 20px', borderRadius: 999 }}>
        <img src="./logos/cerealis.svg" height={30} alt="Cerealis" />
        <span className="faint">×</span>
        <img src="./logos/snowflake.svg" height={18} alt="Snowflake" />
        <nav style={{ display: 'flex', gap: 18, fontSize: 14, marginLeft: 8 }} className="muted">
          <button onClick={scrollToId('plataforma')}>{nav.platform}</button><button onClick={scrollToId('valor')}>{nav.value}</button><button onClick={scrollToId('agentes')}>{nav.agents}</button>
        </nav>
        <LangToggle />
        <Link to="/portal" className="btn btn-sm">Espiga <ArrowRight size={14} /></Link>
      </motion.header>

      <Hero />
      <Story />
      <Numbers />
      <Sources />
      <Chain />
      <Pillars />
      <Value />
      <AgentLive />
      <Countries />
      <Brands />
      <Trust />

      <section className="yellow-band" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: -160, bottom: -200, opacity: .12 }}><CerealisSymbol size={700} /></div>
        <div className="v-section" style={{ textAlign: 'center', paddingTop: 150, paddingBottom: 150 }}>
          <Reveal><h2 className="h-xl" style={{ fontSize: 'clamp(44px, 7vw, 110px)' }}>{cta.title[0]}<br />{cta.title[1]}</h2></Reveal>
          <Reveal delay={.2}><Link to="/portal" className="btn" style={{ marginTop: 44, fontSize: 18, padding: '18px 32px' }}>{cta.enter} <ArrowRight size={18} /></Link></Reveal>
          <Reveal delay={.3}><div style={{ marginTop: 26, display: 'flex', gap: 22, justifyContent: 'center', fontSize: 14, opacity: .75 }}>{cta.counts(PLATFORM.functions, PLATFORM.units, PLATFORM.agents, PLATFORM.models).map(s => <span key={s}>{s}</span>)}</div></Reveal>
        </div>
      </section>
      <footer style={{ padding: '34px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1220, margin: '0 auto', fontSize: 13 }} className="muted">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><img src="./logos/cerealis.svg" height={26} alt="Cerealis" /><span>{footer.tagline}</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Powered by <img src="./logos/snowflake.svg" height={14} alt="Snowflake" /> {footer.demo}</div>
      </footer>
    </div>
  );
}
