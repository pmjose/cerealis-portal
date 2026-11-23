import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

const LINES = [
  'Há mais de um século que transformamos o grão.',
  'Mais de 400 mil toneladas de cereal por ano.',
  'Da seara à mesa de milhões, em cinco continentes.',
  'Agora, cada grão vai ganhar inteligência.',
];

type Stalk = { x: number; h: number; layer: number; phase: number; flex: number; grains: number; lean: number; tone: number };
type Mote = { x: number; y: number; vx: number; vy: number; r: number; a: number; tw: number };
type Orb = { e: number; th: number; sp: number; r: number; a: number; born: number };
type Stream = { x0: number; y0: number; cx: number; cy: number; p: number; sp: number; e: number; th: number };
type Star = { x: number; y: number; r: number; tw: number };

const TAU = Math.PI * 2;

function Seara({ burst, onPointer }: { burst: boolean; onPointer?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const burstT = useRef(-1);
  useEffect(() => { if (burst) burstT.current = 0; }, [burst]);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0, t = 0, last = performance.now(), spawn = 0;
    let stalks: Stalk[] = [], motes: Mote[] = [], orbs: Orb[] = [], streams: Stream[] = [], stars: Star[] = [];
    const mouse = { x: -9999, y: -9999, f: 0, lx: -9999 };

    const newMote = (anywhere: boolean): Mote => ({
      x: Math.random() * w, y: anywhere ? h * (0.35 + Math.random() * 0.65) : h * (0.9 + Math.random() * 0.1),
      vx: (Math.random() - 0.3) * 0.25 * dpr, vy: -(0.08 + Math.random() * 0.35) * dpr,
      r: (0.6 + Math.random() * 1.8) * dpr, a: 0.2 + Math.random() * 0.6, tw: Math.random() * TAU,
    });

    const resize = () => {
      w = c.width = Math.floor(innerWidth * dpr); h = c.height = Math.floor(innerHeight * dpr);
      c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px';
      stalks = [];
      const counts = [Math.round(innerWidth / 3.4), Math.round(innerWidth / 6.5), Math.round(innerWidth / 12)];
      const heights = [0.11, 0.19, 0.3];
      counts.forEach((n, layer) => {
        for (let i = 0; i < n; i++) stalks.push({
          x: (i / n) * w + (Math.random() - 0.5) * (w / n) * 2.2, h: heights[layer] * h * (0.72 + Math.random() * 0.5), layer,
          phase: Math.random() * TAU, flex: 0.65 + Math.random() * 0.6, grains: layer === 0 ? 0 : layer === 1 ? 5 : 8,
          lean: (Math.random() - 0.5) * 0.22, tone: Math.random(),
        });
      });
      motes = Array.from({ length: 150 }, () => newMote(true));
      stars = Array.from({ length: 130 }, () => ({ x: Math.random() * w, y: Math.random() * h * 0.55, r: (Math.random() * 1.1 + 0.25) * dpr, tw: Math.random() * TAU }));
      orbs = [];
      for (let e = 0; e < 2; e++) for (let i = 0; i < 300; i++)
        orbs.push({ e, th: Math.random() * TAU, sp: (0.16 + Math.random() * 0.2) * (e ? -1 : 1), r: (0.5 + Math.random() * 1.5) * dpr, a: 0.25 + Math.random() * 0.75, born: -10 });
      streams = [];
    };
    resize();
    addEventListener('resize', resize);
    const move = (e: PointerEvent) => {
      const x = e.clientX * dpr; mouse.f = Math.min(1.4, mouse.f + Math.abs(x - mouse.lx) / (90 * dpr));
      mouse.lx = x; mouse.x = x; mouse.y = e.clientY * dpr;
    };
    addEventListener('pointermove', move);

    const orbitGeom = () => {
      const b = burstT.current > 0 ? burstT.current : 0;
      const R = Math.min(w, h) * 0.235 * (1 + b * b * 3.2);
      return { cx: w / 2, cy: h * 0.4, R, ry: 0.36, tilt: 0.62, spin: t * 0.035 };
    };
    const orbitPoint = (e: number, th: number) => {
      const g = orbitGeom();
      const ang = (e ? -g.tilt : g.tilt) + g.spin;
      const x = Math.cos(th) * g.R, y = Math.sin(th) * g.R * g.ry;
      return { x: g.cx + x * Math.cos(ang) - y * Math.sin(ang), y: g.cy + x * Math.sin(ang) + y * Math.cos(ang), depth: Math.sin(th) };
    };

    const wind = (x: number, burstAmp: number) => {
      const xs = x / dpr;
      const front = ((t * 0.16) % 1.9) - 0.4;
      const gust = Math.exp(-Math.pow((x / w - front) * 4.2, 2)) * 0.85;
      const m = Math.exp(-Math.pow((x - mouse.x) / (140 * dpr), 2)) * mouse.f * (x > mouse.x ? 1 : -1) * 0.9;
      return 0.32 * Math.sin(t * 0.85 + xs * 0.0042) + 0.2 * Math.sin(t * 1.95 + xs * 0.013 + 1.3) + gust + m + burstAmp;
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      t += dt * (reduce ? 0.35 : 1);
      if (burstT.current >= 0) burstT.current += dt / 1.65;
      const b = Math.max(0, burstT.current);
      mouse.f *= 0.94;

      // Céu ao crepúsculo
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#040302'); sky.addColorStop(0.55, '#0B0805'); sky.addColorStop(0.82, '#1C1307'); sky.addColorStop(1, '#0A0703');
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
      stars.forEach(s => {
        ctx.globalAlpha = (0.25 + Math.sin(t * 1.3 + s.tw) * 0.2) * (1 - b);
        ctx.fillStyle = '#FFF4D6'; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, TAU); ctx.fill();
      });
      ctx.globalAlpha = 1;
      const sun = ctx.createRadialGradient(w / 2, h * 0.86, 0, w / 2, h * 0.86, h * (0.95 + b * 0.8));
      sun.addColorStop(0, `rgba(255,190,40,${0.34 + b * 0.4})`); sun.addColorStop(0.35, 'rgba(253,160,10,0.12)'); sun.addColorStop(1, 'rgba(253,150,0,0)');
      ctx.fillStyle = sun; ctx.fillRect(0, 0, w, h);

      // Órbitas de grão
      const g = orbitGeom();
      ctx.lineWidth = 1 * dpr;
      for (let e = 0; e < 2; e++) {
        ctx.save(); ctx.translate(g.cx, g.cy); ctx.rotate((e ? -g.tilt : g.tilt) + g.spin);
        ctx.strokeStyle = `rgba(253,183,4,${0.1 + b * 0.2})`;
        ctx.beginPath(); ctx.ellipse(0, 0, g.R, g.R * g.ry, 0, 0, TAU); ctx.stroke();
        ctx.restore();
      }
      ctx.globalCompositeOperation = 'lighter';
      const speed = 1 + b * 9;
      orbs.forEach(o => {
        o.th += o.sp * dt * speed;
        const p = orbitPoint(o.e, o.th);
        const fade = Math.min(1, (t - o.born) / 0.8);
        const lum = (0.45 + (p.depth + 1) * 0.3) * o.a * fade;
        ctx.fillStyle = `rgba(255,${190 + (p.depth > 0 ? 40 : 0)},90,${lum * 0.16})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, o.r * 4.2, 0, TAU); ctx.fill();
        ctx.fillStyle = `rgba(255,236,170,${lum})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, o.r * (p.depth > 0 ? 1.15 : 0.8), 0, TAU); ctx.fill();
      });
      const core = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, g.R * 0.9);
      core.addColorStop(0, `rgba(255,200,70,${0.13 + Math.sin(t * 1.4) * 0.03 + b * 0.4})`); core.addColorStop(1, 'rgba(255,180,40,0)');
      ctx.fillStyle = core; ctx.fillRect(g.cx - g.R, g.cy - g.R, g.R * 2, g.R * 2);

      // Pólen / palha a flutuar
      motes.forEach((m, i) => {
        m.x += m.vx + wind(m.x, b * 6) * 0.35 * dpr; m.y += m.vy * (1 + b * 6);
        if (m.y < h * 0.1 || m.x > w + 20 || m.x < -20) motes[i] = newMote(false);
        const a = m.a * (0.6 + Math.sin(t * 2 + m.tw) * 0.4);
        ctx.fillStyle = `rgba(255,214,120,${a * 0.18})`; ctx.beginPath(); ctx.arc(m.x, m.y, m.r * 3.5, 0, TAU); ctx.fill();
        ctx.fillStyle = `rgba(255,232,170,${a})`; ctx.beginPath(); ctx.arc(m.x, m.y, m.r * 0.7, 0, TAU); ctx.fill();
      });

      // Correntes de grão: da seara para a inteligência
      spawn += dt * (b > 0 ? 70 : 3.2);
      const near = stalks.length;
      while (spawn > 1 && near) {
        spawn -= 1;
        const s = stalks[(stalks.length * 0.5 + Math.random() * stalks.length * 0.5) | 0];
        const baseY = h * [0.84, 0.92, 1.0][s.layer];
        const e = Math.random() < 0.5 ? 0 : 1, th = Math.random() * TAU;
        streams.push({ x0: s.x, y0: baseY - s.h, cx: s.x + (w / 2 - s.x) * 0.2, cy: h * (0.55 + Math.random() * 0.2), p: 0, sp: 0.32 + Math.random() * 0.4, e, th });
      }
      streams = streams.filter(s => {
        s.p += dt * s.sp * (1 + b * 3);
        const target = orbitPoint(s.e, s.th);
        const u = Math.min(1, s.p), eu = u * u * (3 - 2 * u);
        const x = (1 - eu) * (1 - eu) * s.x0 + 2 * (1 - eu) * eu * s.cx + eu * eu * target.x;
        const y = (1 - eu) * (1 - eu) * s.y0 + 2 * (1 - eu) * eu * s.cy + eu * eu * target.y;
        ctx.fillStyle = `rgba(255,220,130,${0.22 * (1 - u * 0.5)})`; ctx.beginPath(); ctx.arc(x, y, 4 * dpr, 0, TAU); ctx.fill();
        ctx.fillStyle = 'rgba(255,245,210,0.95)'; ctx.beginPath(); ctx.arc(x, y, 1.1 * dpr, 0, TAU); ctx.fill();
        if (u >= 1) {
          if (orbs.length < 1100) orbs.push({ e: s.e, th: s.th, sp: (0.16 + Math.random() * 0.2) * (s.e ? -1 : 1), r: (0.6 + Math.random() * 1.2) * dpr, a: 0.9, born: t });
          return false;
        }
        return true;
      });

      // A seara — três planos, desenhados em lote
      ctx.globalCompositeOperation = 'source-over';
      const burstWind = b * b * 5;
      for (let layer = 0; layer < 3; layer++) {
        const baseY = h * [0.84, 0.92, 1.0][layer];
        const stem = new Path2D(), grain = new Path2D(), awn = new Path2D();
        const gsz = [0, 3.1, 4.6][layer] * dpr;
        for (const s of stalks) {
          if (s.layer !== layer) continue;
          const wv = wind(s.x, burstWind) * s.flex;
          const dx = (wv * 0.42 + s.lean + Math.sin(t * 2.2 + s.phase) * 0.025) * s.h;
          const p0x = s.x, p0y = baseY, p1x = s.x + dx * 0.18, p1y = baseY - s.h * 0.55;
          const p2x = s.x + dx, p2y = baseY - s.h + Math.abs(dx) * 0.28;
          stem.moveTo(p0x, p0y); stem.quadraticCurveTo(p1x, p1y, p2x, p2y);
          if (layer === 0) { // espigas distantes: um traço espesso
            const tx = p2x - p1x, ty = p2y - p1y, l = Math.hypot(tx, ty) || 1;
            stem.moveTo(p2x, p2y); stem.lineTo(p2x + (tx / l) * 7 * dpr, p2y + (ty / l) * 7 * dpr);
            continue;
          }
          for (let i = 0; i < s.grains; i++) {
            const u = 0.8 + (i / (s.grains - 1)) * 0.2;
            const bx = (1 - u) * (1 - u) * p0x + 2 * (1 - u) * u * p1x + u * u * p2x;
            const by = (1 - u) * (1 - u) * p0y + 2 * (1 - u) * u * p1y + u * u * p2y;
            const tx = 2 * (1 - u) * (p1x - p0x) + 2 * u * (p2x - p1x), ty = 2 * (1 - u) * (p1y - p0y) + 2 * u * (p2y - p1y);
            const ang = Math.atan2(ty, tx);
            const sz = gsz * (1 - (i / s.grains) * 0.38);
            for (const side of [-1, 1]) {
              const a = ang + side * 0.45;
              const gx = bx + Math.cos(a) * sz * 0.85, gy = by + Math.sin(a) * sz * 0.85;
              grain.moveTo(gx + sz * 1.15 * Math.cos(a), gy + sz * 1.15 * Math.sin(a));
              grain.ellipse(gx, gy, sz * 1.15, sz * 0.46, a, 0, TAU);
              if (layer === 2) { awn.moveTo(gx + Math.cos(a) * sz, gy + Math.sin(a) * sz); awn.lineTo(gx + Math.cos(a + side * 0.12) * sz * 4.4, gy + Math.sin(a + side * 0.12) * sz * 4.4); }
            }
          }
        }
        const fade = 1 - Math.min(1, b * 0.6);
        ctx.lineCap = 'round';
        ctx.strokeStyle = [`rgba(120,82,18,${0.55 * fade})`, `rgba(176,122,24,${0.75 * fade})`, `rgba(214,152,30,${0.9 * fade})`][layer];
        ctx.lineWidth = [1.6, 1.1, 1.6][layer] * dpr;
        ctx.stroke(stem);
        if (layer > 0) {
          ctx.fillStyle = layer === 1 ? `rgba(214,150,22,${0.85 * fade})` : `rgba(253,190,40,${0.96 * fade})`;
          ctx.fill(grain);
        }
        if (layer === 2) { ctx.strokeStyle = `rgba(255,214,120,${0.35 * fade})`; ctx.lineWidth = 0.6 * dpr; ctx.stroke(awn); }
        if (layer === 1) { // névoa entre planos
          const fog = ctx.createLinearGradient(0, h * 0.8, 0, h);
          fog.addColorStop(0, 'rgba(10,7,3,0)'); fog.addColorStop(1, 'rgba(10,7,3,0.55)');
          ctx.fillStyle = fog; ctx.fillRect(0, h * 0.8, w, h * 0.2);
        }
      }

      // Vinheta + transição para creme
      const vig = ctx.createRadialGradient(w / 2, h * 0.45, h * 0.3, w / 2, h * 0.45, h * 1.05);
      vig.addColorStop(0, 'rgba(0,0,0,0)'); vig.addColorStop(1, 'rgba(0,0,0,0.62)');
      ctx.fillStyle = vig; ctx.fillRect(0, 0, w, h);
      if (b > 0.42) { ctx.fillStyle = `rgba(252,250,226,${Math.min(1, (b - 0.42) * 1.9)})`; ctx.fillRect(0, 0, w, h); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('pointermove', move); };
  }, []);
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, cursor: onPointer ? 'default' : undefined }} aria-hidden />;
}

export default function Gate() {
  const nav = useNavigate();
  const [i, setI] = useState(0);
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => { const id = setInterval(() => setI(x => (x + 1) % LINES.length), 3200); return () => clearInterval(id); }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === 'Snow2026') {
      setOk(true); sessionStorage.setItem('unlocked', '1');
      setTimeout(() => nav('/inicio'), 1950);
    } else { setErr(true); setTimeout(() => setErr(false), 900); }
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden', position: 'relative', background: '#050403', color: '#FFF8E6' }}>
      <Seara burst={ok} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(44% 30% at 50% 47%, rgba(5,4,3,.55), transparent 72%)', pointerEvents: 'none' }} />
      <motion.div animate={{ opacity: ok ? 0 : 1, y: ok ? -16 : 0 }} transition={{ duration: .6 }}
        style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px', paddingTop: '6vh' }}>
        <motion.div initial={{ opacity: 0, letterSpacing: '.5em' }} animate={{ opacity: 1, letterSpacing: '.28em' }} transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 11, fontWeight: 600, color: 'rgba(253,200,80,.85)', marginBottom: 26, padding: '6px 14px', border: '1px solid rgba(253,183,4,.28)', borderRadius: 999, background: 'rgba(253,183,4,.06)' }}>
          ACESSO RESTRITO · 2026
        </motion.div>
        <div style={{ height: 'clamp(84px, 11vw, 132px)', display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: 1040 }}>
          <AnimatePresence mode="wait">
            <motion.h1 key={i} initial={{ opacity: 0, y: 22, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -22, filter: 'blur(12px)' }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}
              className="display" style={{ fontSize: 'clamp(30px, 4.2vw, 58px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.04em', textShadow: '0 4px 40px rgba(0,0,0,.6)', textWrap: 'balance', maxWidth: 940 }}>
              {i === LINES.length - 1 ? <>Agora, cada grão vai ganhar <span className="gold-text">inteligência</span>.</> : LINES[i]}
            </motion.h1>
          </AnimatePresence>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1.4 }}
          style={{ margin: '14px 0 34px', fontSize: 16, color: 'rgba(255,240,210,.62)', maxWidth: 560, lineHeight: 1.55 }}>
          Desde 1919 a alimentar o futuro. Agora, com dados em cada grão.
        </motion.p>
        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 14 }} animate={err ? { x: [0, -12, 12, -8, 8, 0], opacity: 1, y: 0 } : { opacity: 1, y: 0 }} transition={{ delay: err ? 0 : 1.6, duration: err ? .5 : .9 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 6, paddingLeft: 18, borderRadius: 999, width: 'min(390px, 90vw)', background: 'rgba(20,15,8,.55)', border: `1px solid ${err ? 'rgba(239,68,68,.6)' : 'rgba(253,183,4,.25)'}`, backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', boxShadow: '0 20px 60px rgba(0,0,0,.45)' }}>
          <Lock size={16} color="rgba(253,200,80,.7)" />
          <input type="password" autoFocus placeholder="Palavra-passe" value={pw} onChange={e => setPw(e.target.value)} aria-label="Palavra-passe"
            style={{ flex: 1, background: 'none', border: 0, outline: 0, fontSize: 15, color: '#FFF8E6', letterSpacing: pw ? '.2em' : 0 }} />
          <button aria-label="Entrar" style={{ width: 42, height: 42, borderRadius: 999, background: '#FDB704', color: '#121210', display: 'grid', placeItems: 'center', boxShadow: '0 8px 28px rgba(253,183,4,.45)' }}>
            <ArrowRight size={18} />
          </button>
        </motion.form>
        <div style={{ height: 22, marginTop: 12, fontSize: 13, color: '#F87171' }}>{err && 'Palavra-passe incorreta'}</div>
      </motion.div>
      <div style={{ position: 'absolute', bottom: 18, width: '100%', textAlign: 'center', fontSize: 11, letterSpacing: '.18em', color: 'rgba(255,230,180,.35)', zIndex: 2 }}>
        MAIA · TROFA · PORTO · LISBOA · LITOVEL · VENTA DE BAÑOS
      </div>
    </div>
  );
}
