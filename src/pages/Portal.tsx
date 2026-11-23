import { useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, LayoutDashboard, Inbox, Store, Package, IdCard, Cog, Snowflake, Bell, ChevronRight } from 'lucide-react';
import { Icon } from '../ui/icons';
import { modules, findModule, allAgents, executiveQuestions, svOf } from '../data/modules';
import { customers, products, employees, assets, findCustomer, findProduct, findEmployee, findAsset } from '../data/c360';
import ChatPanel from '../components/ChatPanel';
import { useToast } from '../ui/toast';
import { FiltersProvider, useFilters, BUS, CHANNELS, isFiltered } from '../filters';
import { Avatar } from '../ui/kit';

export { Icon };

const pending = allAgents.filter(a => a.mode === 'humano').length;

function GlobalSearch() {
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const hits = useMemo(() => {
    if (q.length < 2) return [];
    const t = q.toLowerCase();
    const ent = [
      ...customers.filter(c => (c.name + c.segment + c.country).toLowerCase().includes(t)).map(c => ({ key: 'c' + c.id, icon: 'Store', label: c.name, sub: 'Cliente 360', to: `/portal/360/clientes/${c.id}` })),
      ...products.filter(p => (p.name + p.brand + p.ean).toLowerCase().includes(t)).map(p => ({ key: 'p' + p.id, icon: 'Package', label: p.name, sub: 'Produto 360', to: `/portal/360/produtos/${p.id}` })),
      ...employees.filter(e => (e.name + e.role + e.site).toLowerCase().includes(t)).map(e => ({ key: 'e' + e.id, icon: 'IdCard', label: e.name, sub: 'Colaborador 360 · ' + e.role, to: `/portal/360/colaboradores/${e.id}` })),
      ...assets.filter(a => (a.name + a.id + a.site).toLowerCase().includes(t)).map(a => ({ key: 'a' + a.id, icon: 'Cog', label: a.id, sub: 'Ativo 360 · ' + a.name, to: `/portal/360/ativos/${a.id}` })),
    ];
    const mods = modules.flatMap(m => m.sections.map(s => ({ m, s })))
      .filter(({ m, s }) => (m.name + ' ' + s.label + ' ' + JSON.stringify(s.blocks)).toLowerCase().includes(t))
      .map(({ m, s }) => ({ key: m.slug + s.id, icon: m.icon, label: m.name, sub: s.label, to: `/portal/${m.slug}/${s.id}` }));
    return [...ent, ...mods].slice(0, 9);
  }, [q]);
  return (
    <div style={{ position: 'relative' }}>
      <div className="search"><Search size={16} className="muted" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Pesquisar clientes, SKUs, lotes, linhas, colaboradores…" />
        <span className="chip" style={{ padding: '1px 7px', fontSize: 11, color: 'var(--muted)' }}>⌘K</span>
      </div>
      {hits.length > 0 && (
        <div className="card" style={{ position: 'absolute', top: 50, left: 0, right: 0, zIndex: 80, padding: 6 }}>
          {hits.map(h => (
            <button key={h.key} onClick={() => { nav(h.to); setQ(''); }}
              style={{ display: 'flex', gap: 10, alignItems: 'center', width: '100%', padding: '9px 10px', borderRadius: 10, textAlign: 'left', fontSize: 13 }}
              onMouseEnter={e => (e.currentTarget.style.background = '#FFF8DE')} onMouseLeave={e => (e.currentTarget.style.background = '')}>
              <Icon name={h.icon} size={15} /><span style={{ fontWeight: 550 }}>{h.label}</span><span className="muted">› {h.sub}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const sel: React.CSSProperties = { background: '#fff', border: '1px solid var(--line)', borderRadius: 999, padding: '7px 12px', fontSize: 13, outline: 0 };
function FilterBar() {
  const { f, set } = useFilters();
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', padding: 3, borderRadius: 999, background: '#fff', border: '1px solid var(--line)' }}>
        {(['3M', '6M', '12M'] as const).map(p => (
          <button key={p} onClick={() => set({ period: p })} style={{ padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 550, background: f.period === p ? 'var(--ink)' : undefined, color: f.period === p ? '#fff' : undefined }}>{p}</button>
        ))}
      </div>
      <select style={sel} value={f.bu} onChange={e => set({ bu: e.target.value })}>{BUS.map(b => <option key={b}>{b}</option>)}</select>
      <select style={sel} value={f.channel} onChange={e => set({ channel: e.target.value })}>{CHANNELS.map(b => <option key={b}>{b}</option>)}</select>
      {isFiltered(f) && <button className="chip gold" onClick={() => set({ bu: BUS[0], channel: CHANNELS[0], period: '12M' })}><X size={12} /> Limpar</button>}
    </div>
  );
}

const KIND360: Record<string, string> = { clientes: 'Cliente 360', produtos: 'Produto 360', colaboradores: 'Colaborador 360', ativos: 'Ativo 360' };

function Shell() {
  const loc = useLocation();
  const toast = useToast();
  const [, , slug, section, entity] = loc.pathname.split('/');
  const m = findModule(slug);
  const is360 = slug === '360';
  const kind360 = KIND360[section ?? ''] ?? '';
  const ent = is360 && entity ? (section === 'clientes' ? findCustomer(entity) : section === 'produtos' ? findProduct(entity) : section === 'colaboradores' ? findEmployee(entity) : findAsset(entity)) : undefined;
  const entName = ent ? ('name' in ent ? ent.name : '') : '';
  const entQuestions = ent && 'questions' in ent ? ent.questions : undefined;
  const sectionLabel = m?.sections.find(s => s.id === section)?.label ?? m?.sections[0].label;
  const pageName = m?.name ?? (is360 ? kind360 : slug === 'decisoes' ? 'Decisões & Agentes' : 'Cockpit Executivo');
  const sv = m ? svOf(m.slug) : is360 ? `SV_${(section ?? 'grupo').toUpperCase()}_360` : 'SV_GRUPO_EXECUTIVO';
  const groups: [string, 'funcoes' | 'negocio' | 'plataforma'][] = [['Funções', 'funcoes'], ['Unidades de negócio', 'negocio'], ['Plataforma', 'plataforma']];

  return (
    <div className="shell">
      <aside className="side">
        <Link to="/inicio" style={{ padding: '2px 8px 14px', display: 'flex', alignItems: 'center', gap: 11 }}>
          <img src="./logos/cerealis-simbolo.svg" width={36} height={36} alt="Cerealis" style={{ borderRadius: 10 }} />
          <div style={{ lineHeight: 1.15 }}><div className="display" style={{ fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' }}>Espiga</div><div style={{ fontSize: 10.5, color: '#8A8577' }}>Cerealis · Dados, IA & Agentes</div></div>
        </Link>
        <div className="label" style={{ marginTop: 6 }}>Início</div>
        <NavLink end to="/portal" className="nav"><LayoutDashboard size={17} /> Cockpit Executivo</NavLink>
        <NavLink to="/portal/decisoes" className="nav"><Inbox size={17} /> Decisões & Agentes <span className="chip" style={{ marginLeft: 'auto', padding: '0 7px', background: '#FDB704', borderColor: '#FDB704', color: '#121210', fontWeight: 700, fontSize: 11 }}>{pending}</span></NavLink>
        <div className="label">Visão 360</div>
        <NavLink to="/portal/360/clientes" className="nav"><Store size={17} /> Cliente 360</NavLink>
        <NavLink to="/portal/360/produtos" className="nav"><Package size={17} /> Produto 360</NavLink>
        <NavLink to="/portal/360/colaboradores" className="nav"><IdCard size={17} /> Colaborador 360</NavLink>
        <NavLink to="/portal/360/ativos" className="nav"><Cog size={17} /> Ativo 360</NavLink>
        {groups.map(([label, g]) => (
          <div key={g} style={{ display: 'contents' }}>
            <div className="label">{label}</div>
            {modules.filter(x => x.group === g).map(x => <NavLink key={x.slug} to={`/portal/${x.slug}`} className="nav"><Icon name={x.icon} size={17} color={loc.pathname.includes(`/portal/${x.slug}`) ? '#FDB704' : undefined} /> {x.short}</NavLink>)}
          </div>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: 14 }}>
          <div style={{ padding: '12px 10px', display: 'flex', gap: 10, alignItems: 'center', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <Avatar name="Sofia Martins" size={34} />
            <div style={{ fontSize: 13, lineHeight: 1.3 }}><div style={{ color: '#fff' }}>Sofia Martins</div><div style={{ fontSize: 11, color: '#8A8577' }}>Comissão Executiva</div></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', fontSize: 10.5, color: '#8A8577' }}>
            Powered by <img src="./logos/snowflake.svg" height={11} alt="Snowflake" style={{ filter: 'brightness(0) invert(1)', opacity: .65 }} />
          </div>
        </div>
      </aside>
      <main className="main">
        <div className="warm-glow" />
        <div style={{ position: 'relative' }}>
          <div className="topbar">
            <GlobalSearch />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="chip"><span className="dot ok" /> Dados em tempo real · 09:42</span>
              <span className="chip sf"><Snowflake size={12} /> WH_ESPIGA_BI</span>
              <button className="chip" onClick={() => {
                toast('info', 'Alerta crítico · Operações', 'Moinho B3 de Lisboa: vibração do rolo +38% — intervenção em ≤ 6 dias');
                setTimeout(() => toast('info', 'Alerta · Compras & Cereais', 'Cobertura de trigo duro em 6,1 semanas (política: 8)'), 350);
                setTimeout(() => toast('info', 'Alerta · Supply Chain', 'Rutura prevista: Milaneza Esparguete 500 g no Pingo Doce em 4 dias'), 700);
              }}><Bell size={13} /> 3</button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <div className="muted" style={{ fontSize: 13, display: 'flex', gap: 6, alignItems: 'center' }}>
              <Link to="/portal">Espiga</Link><ChevronRight size={13} />
              {m ? <><span>{m.group === 'negocio' ? 'Unidades de negócio' : m.group === 'plataforma' ? 'Plataforma' : 'Funções'}</span><ChevronRight size={13} /><Link to={`/portal/${m.slug}`}>{m.name}</Link><ChevronRight size={13} /><span style={{ color: 'var(--ink)', fontWeight: 550 }}>{sectionLabel}</span></>
                : is360 ? <><span>Visão 360</span><ChevronRight size={13} />{ent ? <><Link to={`/portal/360/${section}`}>{kind360}</Link><ChevronRight size={13} /><span style={{ color: 'var(--ink)', fontWeight: 550 }}>{entName}</span></> : <span style={{ color: 'var(--ink)', fontWeight: 550 }}>{kind360}</span>}</>
                  : <span style={{ color: 'var(--ink)', fontWeight: 550 }}>{pageName}</span>}
            </div>
            <FilterBar />
          </div>
          <motion.div key={is360 ? loc.pathname : slug ?? 'home'} initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: .35 }}>
            <Outlet />
          </motion.div>
        </div>
      </main>
      <ChatPanel context={m ? `${m.name} › ${sectionLabel}` : ent ? `${kind360} › ${entName}` : pageName} questions={m?.questions ?? entQuestions ?? executiveQuestions} sv={sv} />
    </div>
  );
}

export default function Portal() {
  return <FiltersProvider><Shell /></FiltersProvider>;
}
