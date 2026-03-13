import { FC, useState, useEffect, useRef, CSSProperties } from 'react';
import { T } from '../data/tokens';
import { styles, tagStyle } from '../data/styles';
import { Badge } from '../components/UI';
import {
  BATTING_DATA, PITCHING_DATA, PITCHERS, ARTICLES,
  PLAYER_CARDS, DEMO_POLLS, DEMO_POSTS, LIVE_GAME,
  CHAT_MSGS_DEMO, SUPABASE_SCHEMA,
} from '../data';
import type {
  BattingPlayer, PitchingPlayer, Article, ChatMessage, PitcherKey,
} from '../types';

// ── Shared prop interfaces ──
interface ToastProps { showToast: (msg: string) => void }
interface PtsProps { pts: number; onAddPts: (n: number) => void }

const s = styles as Record<string, CSSProperties>;

// ════════════════════════════════════════════
// FEED VIEW
// ════════════════════════════════════════════
export const FeedView: FC<PtsProps & ToastProps> = ({ pts, onAddPts, showToast }) => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set([2]));

  const toggleLike = (id: number) => {
    const next = new Set(likedPosts);
    if (next.has(id)) next.delete(id); else { next.add(id); onAddPts(2); }
    setLikedPosts(next);
  };

  return (
    <div>
      <div style={s.viewHdr}>
        <div><div style={s.viewTitle}>Feed</div><div style={s.viewSub}>Lo más reciente del béisbol</div></div>
        <button style={s.btnPrimary} onClick={() => showToast('+10 pts por publicar')}>+ Post</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }}>
        <div>
          {/* Stories */}
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '2px', marginBottom: '20px' }}>
            {['LAD', 'PIT', 'NYY', 'HOU', 'NYM', 'SEA', 'CLE'].map((team, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer', flexShrink: 0 }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: T.cream2, border: i === 0 ? `2.5px solid ${T.red}` : `2.5px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: T.navy }}>{team}</div>
                <span style={{ fontSize: '8px', letterSpacing: '1px', color: T.text3, textAlign: 'center', whiteSpace: 'nowrap' }}>{team}</span>
              </div>
            ))}
          </div>
          {/* Posts */}
          {DEMO_POSTS.map(p => (
            <div key={p.id} style={{ ...s.card, padding: '16px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: p.isOfficial ? T.navy : T.navyGhost, border: `1.5px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: p.isOfficial ? 'white' : T.navy, flexShrink: 0 }}>{p.initials}</div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: T.navy }}>{p.author}</div>
                  <div style={{ fontSize: '9px', color: T.text3, letterSpacing: '.5px' }}>{p.time}</div>
                </div>
              </div>
              <div style={{ fontSize: '13px', lineHeight: 1.7, color: T.text, marginBottom: '12px' }}>{p.body}</div>
              {p.tags.length > 0 && <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '12px' }}>{p.tags.map((t, i) => <span key={i} style={tagStyle('navy')}>{t}</span>)}</div>}
              <div style={{ display: 'flex', gap: '16px', paddingTop: '10px', borderTop: `1px solid ${T.border}` }}>
                <button onClick={() => toggleLike(p.id)} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', fontWeight: 600, letterSpacing: '1px', color: likedPosts.has(p.id) ? T.red : T.text3, cursor: 'pointer', border: 'none', background: 'none', fontFamily: T.font }}>♥ {p.likes + (likedPosts.has(p.id) ? 1 : 0)}</button>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', fontWeight: 600, letterSpacing: '1px', color: T.text3, cursor: 'pointer' }}>💬 {p.comments}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={s.widget}>
            <div style={s.widgetTitle}>Trending</div>
            {['#Skenes', '#Ohtani', '#SerieM', '#MLB', '#Statcast'].map((tag, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', cursor: 'pointer', borderBottom: i < 4 ? `1px solid ${T.border}` : 'none' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: T.navy }}>{tag}</span>
                <span style={{ fontSize: '9px', color: T.text3 }}>{(Math.random() * 2000 + 500 | 0).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div style={s.widget}>
            <div style={s.widgetTitle}>Próximos juegos</div>
            {[{ t: 'LAD vs PIT', time: 'EN VIVO' }, { t: 'NYY vs HOU', time: '7:10 PM' }, { t: 'NYM vs ATL', time: '8:05 PM' }].map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 0', borderBottom: i < 2 ? `1px solid ${T.border}` : 'none' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: T.navy, flex: 1 }}>{g.t}</span>
                <span style={{ fontSize: '9px', color: g.time === 'EN VIVO' ? T.red : T.text3, fontWeight: g.time === 'EN VIVO' ? 700 : 400 }}>{g.time}</span>
              </div>
            ))}
          </div>
          <div style={{ ...s.widget, textAlign: 'center' }}>
            <div style={s.widgetTitle}>Tus puntos</div>
            <div style={{ fontSize: '38px', fontWeight: 700, color: T.navy, letterSpacing: '-2px', lineHeight: 1, margin: '8px 0 2px' }}>{pts.toLocaleString()}</div>
            <div style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: T.brown }}>Nivel Plata</div>
            <div style={{ height: '4px', background: T.cream2, borderRadius: '2px', margin: '10px 0 5px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: `linear-gradient(90deg,${T.navy},${T.navy3})`, borderRadius: '2px', width: `${(pts / 1628 * 100).toFixed(0)}%` }} />
            </div>
            <div style={{ fontSize: '9px', color: T.text3 }}>Siguiente: Oro (1,628 pts)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════
// LIVE VIEW
// ════════════════════════════════════════════
export const LiveView: FC<ToastProps> = ({ showToast }) => {
  const [chatMsgs, setChatMsgs] = useState<ChatMessage[]>(CHAT_MSGS_DEMO);
  const [chatInput, setChatInput] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMsgs([...chatMsgs, { user: '@tú', initials: 'DH', text: chatInput, mine: true }]);
    setChatInput('');
    showToast('+3 pts por chat');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width = 240, H = canvas.height = 200;
    ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);
    const zx = W * .25, zy = H * .15, zw = W * .5, zh = H * .6;
    ctx.strokeStyle = 'rgba(239,209,159,.4)'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]);
    ctx.strokeRect(zx, zy, zw, zh); ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(239,209,159,.12)'; ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(zx + zw * i / 3, zy); ctx.lineTo(zx + zw * i / 3, zy + zh); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(zx, zy + zh * i / 3); ctx.lineTo(zx + zw, zy + zh * i / 3); ctx.stroke();
    }
    const bx = zx + .45 * zw, by = zy + (1 - .65) * zh;
    ctx.beginPath(); ctx.arc(bx, by, 9, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(213,0,50,.2)'; ctx.fill();
    ctx.beginPath(); ctx.arc(bx, by, 4, 0, Math.PI * 2);
    ctx.fillStyle = T.red; ctx.fill();
    ctx.fillStyle = 'rgba(239,209,159,.3)'; ctx.font = '8px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('ZONA DE STRIKE', W / 2, H - 8);
  }, []);

  const g = LIVE_GAME;
  const makeDots = (n: number, color: string, total: number) =>
    Array.from({ length: total }, (_, i) => (
      <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', border: '1.5px solid rgba(239,209,159,.3)', background: i < n ? color : 'transparent' }} />
    ));

  return (
    <div>
      <div style={s.viewHdr}>
        <div><div style={s.viewTitle}>En Vivo</div><div style={s.viewSub}>LAD @ PIT · Temporada 2026</div></div>
        <Badge type="live">● EN VIVO</Badge>
      </div>
      {/* Scoreboard */}
      <div style={s.scoreboard}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(239,209,159,.03) 40px,rgba(239,209,159,.03) 41px)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: T.beige, opacity: 0.7 }}>LAD</div>
            <div style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-3px', lineHeight: 1 }}>{g.away.score}</div>
          </div>
          <div style={{ textAlign: 'center', padding: '0 24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: T.beige, letterSpacing: '2px' }}>{g.inning} ▲</div>
            <div style={{ fontSize: '9px', color: T.red, letterSpacing: '3px', textTransform: 'uppercase', marginTop: '2px' }}>● EN VIVO</div>
            <div style={{ display: 'flex', gap: '14px', marginTop: '6px' }}>
              <div style={{ textAlign: 'center' }}><span style={{ fontSize: '7px', letterSpacing: '2px', color: 'rgba(239,209,159,.4)', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>B</span><div style={{ display: 'flex', gap: '3px' }}>{makeDots(g.balls, '#4ade80', 4)}</div></div>
              <div style={{ textAlign: 'center' }}><span style={{ fontSize: '7px', letterSpacing: '2px', color: 'rgba(239,209,159,.4)', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>S</span><div style={{ display: 'flex', gap: '3px' }}>{makeDots(g.strikes, T.red, 3)}</div></div>
              <div style={{ textAlign: 'center' }}><span style={{ fontSize: '7px', letterSpacing: '2px', color: 'rgba(239,209,159,.4)', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>O</span><div style={{ display: 'flex', gap: '3px' }}>{makeDots(g.outs, T.red, 3)}</div></div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: T.beige, opacity: 0.7 }}>PIT</div>
            <div style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-3px', lineHeight: 1 }}>{g.home.score}</div>
          </div>
          <div style={{ marginLeft: 'auto', paddingLeft: '20px', borderLeft: '1px solid rgba(239,209,159,.1)' }}>
            <div style={{ display: 'flex', fontSize: '11px' }}>
              {g.innings.map((_, i) => <div key={i} style={{ width: '28px', textAlign: 'center', padding: '3px 0', borderRight: '1px solid rgba(239,209,159,.1)', fontSize: '8px', letterSpacing: '1px', color: 'rgba(239,209,159,.4)' }}>{i + 1}</div>)}
              <div style={{ width: '28px', textAlign: 'center', padding: '3px 0', fontSize: '8px', color: 'rgba(239,209,159,.4)' }}>R</div>
            </div>
            <div style={{ display: 'flex', fontSize: '11px', fontWeight: 600 }}>
              {g.innings.map((inn, i) => <div key={i} style={{ width: '28px', textAlign: 'center', padding: '3px 0', borderRight: '1px solid rgba(239,209,159,.1)' }}>{inn[0]}</div>)}
              <div style={{ width: '28px', textAlign: 'center', padding: '3px 0' }}>{g.away.score}</div>
            </div>
            <div style={{ display: 'flex', fontSize: '11px', fontWeight: 600 }}>
              {g.innings.map((inn, i) => <div key={i} style={{ width: '28px', textAlign: 'center', padding: '3px 0', borderRight: '1px solid rgba(239,209,159,.1)' }}>{inn[1]}</div>)}
              <div style={{ width: '28px', textAlign: 'center', padding: '3px 0' }}>{g.home.score}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ ...s.card, padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: T.navy }}>4-Seam Fastball</span>
              <span style={{ fontSize: '28px', fontWeight: 700, color: T.red, letterSpacing: '-2px' }}>98.2</span>
            </div>
            <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginTop: '10px' }}>
              {[{ v: '98.2', l: 'Velocidad' }, { v: '83', l: 'Exit Vel.' }, { v: '2650', l: 'RPM' }, { v: 'STRIKE', l: 'Resultado', c: T.red }].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center', background: T.cream, borderRadius: '4px', padding: '7px 4px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: stat.c || T.navy, letterSpacing: '-1px' }}>{stat.v}</div>
                  <div style={{ fontSize: '7px', letterSpacing: '2px', color: T.brown, textTransform: 'uppercase', marginTop: '1px' }}>{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...s.card, padding: '14px' }}>
            <div style={s.widgetTitle}>Jugada a jugada</div>
            {['4-Seam Fastball 98.2 mph — Strike mirando', 'Sweeper 84.5 mph — Foul Ball', 'Split-Finger 93.7 mph — Bola', '4-Seam Fastball 97.8 mph — En juego → rolling a 2B', 'Slider 85.3 mph — Strike sacando'].map((play, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', padding: '5px 0', borderBottom: i < 4 ? `1px solid ${T.border}` : 'none', fontSize: '11px' }}>
                <span style={{ fontSize: '8px', color: T.brown, letterSpacing: '1px', whiteSpace: 'nowrap', minWidth: '48px', paddingTop: '2px' }}>7ᵃ ▲</span>
                <span style={{ flex: 1, color: play.includes('juego') ? T.red : play.includes('Bola') ? T.text : T.text3, fontWeight: play.includes('juego') ? 700 : 400, lineHeight: 1.5 }}>{play}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Chat */}
        <div style={{ ...s.card, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 260px)' }}>
          <div style={{ padding: '10px 14px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: T.navy }}>Chat en vivo</span>
            <span style={{ fontSize: '9px', color: T.green, letterSpacing: '1px' }}>● 847 online</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {chatMsgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: '7px', alignItems: 'flex-start' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: m.mine ? T.navy : T.cream2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 700, color: m.mine ? 'white' : T.navy, flexShrink: 0 }}>{m.initials}</div>
                <div style={{ flex: 1, ...(m.mine ? { background: T.navyGhost, padding: '5px 8px', borderRadius: '4px' } : {}) }}>
                  <div style={{ fontSize: '9px', fontWeight: 700, color: T.navy, letterSpacing: '.5px' }}>{m.user}</div>
                  <div style={{ fontSize: '11px', color: T.text, lineHeight: 1.5 }}>{m.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px', padding: '10px 14px', borderTop: `1px solid ${T.border}` }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} placeholder="Escribe un mensaje..." style={{ flex: 1, padding: '8px 10px', fontSize: '11px', background: T.cream, border: `1px solid ${T.border}`, borderRadius: '4px', outline: 'none', fontFamily: T.font }} />
            <button onClick={sendChat} style={{ padding: '8px 12px', background: T.navy, color: 'white', borderRadius: '4px', fontSize: '12px', border: 'none', cursor: 'pointer', fontFamily: T.font }}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════
// STATS VIEW
// ════════════════════════════════════════════
export const StatsView: FC = () => {
  const [statType, setStatType] = useState<'batting' | 'pitching'>('batting');
  const [sortCol, setSortCol] = useState<string>('AVG');
  const [sortDir, setSortDir] = useState(-1);

  const battingCols = ['rank', 'name', 'team', 'pos', 'G', 'AB', 'H', 'HR', 'RBI', 'BB', 'SO', 'AVG', 'OBP', 'SLG', 'OPS', 'wRC'];
  const pitchingCols = ['rank', 'name', 'team', 'W', 'L', 'ERA', 'IP', 'SO', 'WHIP', 'K9', 'FIP', 'WAR'];

  const data = statType === 'batting'
    ? [...BATTING_DATA].sort((a, b) => ((b[sortCol] as number) - (a[sortCol] as number)) * sortDir || 0)
    : [...PITCHING_DATA].sort((a, b) => {
        if (sortCol === 'ERA' || sortCol === 'WHIP' || sortCol === 'FIP')
          return ((a[sortCol] as number) - (b[sortCol] as number)) * sortDir;
        return ((b[sortCol] as number) - (a[sortCol] as number)) * sortDir;
      });
  const cols = statType === 'batting' ? battingCols : pitchingCols;

  const leaders = statType === 'batting'
    ? [{ cat: 'AVG', val: '.321', name: 'Shohei Ohtani', team: 'LAD' }, { cat: 'HR', val: '48', name: 'Aaron Judge', team: 'NYY' }, { cat: 'OPS', val: '1.050', name: 'Shohei Ohtani', team: 'LAD' }, { cat: 'wRC+', val: '188', name: 'Shohei Ohtani', team: 'LAD' }]
    : [{ cat: 'ERA', val: '1.88', name: 'Paul Skenes', team: 'PIT' }, { cat: 'SO', val: '266', name: 'Paul Skenes', team: 'PIT' }, { cat: 'WHIP', val: '0.95', name: 'Paul Skenes', team: 'PIT' }, { cat: 'WAR', val: '8.4', name: 'Paul Skenes', team: 'PIT' }];

  return (
    <div>
      <div style={s.viewHdr}>
        <div><div style={s.viewTitle}>Estadísticas</div><div style={s.viewSub}>Temporada 2025 · Fuente: Baseball Savant / Statcast</div></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '20px' }}>
        {leaders.map((l, i) => (
          <div key={i} style={{ ...s.card, padding: '14px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: T.navy }} />
            <div style={{ fontSize: '7px', letterSpacing: '3px', textTransform: 'uppercase', color: T.brown, marginBottom: '6px' }}>{l.cat}</div>
            <div style={{ fontSize: '30px', fontWeight: 700, color: T.navy, letterSpacing: '-2px', lineHeight: 1 }}>{l.val}</div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: T.text2, marginTop: '4px' }}>{l.name}</div>
            <div style={{ fontSize: '8px', color: T.brown, letterSpacing: '1px' }}>{l.team}</div>
          </div>
        ))}
      </div>
      <div style={s.card}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '12px 14px', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', gap: '2px', background: T.cream, border: `1px solid ${T.border}`, borderRadius: '4px', padding: '2px' }}>
            {(['batting', 'pitching'] as const).map(t => (
              <button key={t} onClick={() => { setStatType(t); setSortCol(t === 'batting' ? 'AVG' : 'ERA'); }} style={{ padding: '5px 10px', borderRadius: '3px', fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: statType === t ? 'white' : T.brown, background: statType === t ? T.navy : 'transparent', cursor: 'pointer', border: 'none', fontFamily: T.font }}>
                {t === 'batting' ? 'Bateo' : 'Pitcheo'}
              </button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto', maxHeight: '500px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>{cols.map(c => <th key={c} onClick={() => { setSortCol(c); setSortDir(d => -d); }} style={s.th}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'white' : T.cream }}>
                  {cols.map(c => (
                    <td key={c} style={{ ...s.td, ...(c === 'name' ? { fontWeight: 700, color: T.navy, cursor: 'pointer' } : {}), ...(c === sortCol ? { color: T.red, fontWeight: 700 } : {}) }}>
                      {typeof row[c] === 'number' && (row[c] as number) < 1 && c !== 'rank' ? (row[c] as number).toFixed(3).replace(/^0/, '') : row[c]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════
// PITCHES VIEW
// ════════════════════════════════════════════
export const PitchesView: FC = () => {
  const [selectedPitcher, setSelectedPitcher] = useState<PitcherKey>('skenes');
  const p = PITCHERS[selectedPitcher];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width = 320, H = canvas.height = 320;
    ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(239,209,159,.15)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(W / 2, 20); ctx.lineTo(W / 2, H - 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20, H / 2); ctx.lineTo(W - 20, H / 2); ctx.stroke();
    ctx.fillStyle = 'rgba(239,209,159,.4)'; ctx.font = '9px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('← Glove Side    Arm Side →', W / 2, H - 6);
    ctx.save(); ctx.translate(12, H / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Drop ←    → Rise', 0, 0); ctx.restore();
    p.pitches.forEach(pitch => {
      const x = W / 2 + pitch.hB * 7;
      const y = H / 2 - pitch.vB * 7;
      const r = Math.max(8, pitch.use * 60);
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = pitch.color + '33'; ctx.fill();
      ctx.strokeStyle = pitch.color; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = pitch.color;
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 9px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText(pitch.id, x, y - r - 6);
    });
  }, [selectedPitcher]);

  return (
    <div>
      <div style={s.viewHdr}>
        <div><div style={s.viewTitle}>Análisis de Pitcheos</div><div style={s.viewSub}>Movimiento, velocidad y uso — Datos Statcast 2026</div></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {(Object.entries(PITCHERS) as [PitcherKey, typeof p][]).map(([key, pitcher]) => (
            <button key={key} onClick={() => setSelectedPitcher(key)} style={{ ...s.card, padding: '12px', cursor: 'pointer', border: selectedPitcher === key ? `2px solid ${T.navy}` : `1.5px solid ${T.border}`, background: selectedPitcher === key ? T.navyGhost : 'white', textAlign: 'left' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: T.red, letterSpacing: '-1px' }}>{pitcher.num}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: T.navy, marginTop: '2px' }}>{pitcher.name}</div>
              <div style={{ fontSize: '9px', color: T.brown, letterSpacing: '1px' }}>{pitcher.team} · {pitcher.hand}HP</div>
              <div style={{ fontSize: '8px', color: T.text3, marginTop: '4px' }}>⚾ {pitcher.angle}° arm angle</div>
            </button>
          ))}
        </div>
        <div style={{ ...s.card, padding: '14px' }}>
          <div style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: T.brown, marginBottom: '10px' }}>Perfil de movimiento — {p.name}</div>
          <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto', borderRadius: '4px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: T.brown, marginBottom: '4px' }}>Arsenal</div>
          {p.pitches.map(pitch => (
            <div key={pitch.id} style={{ ...s.card, padding: '10px 12px', borderLeft: `3px solid ${pitch.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: T.navy }}>{pitch.name}</span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: T.red, letterSpacing: '-1px' }}>{pitch.mph}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', fontSize: '9px', color: T.text3 }}>
                <span>hB: {pitch.hB}&quot;</span><span>vB: {pitch.vB}&quot;</span><span>Uso: {(pitch.use * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════
// NEWS VIEW
// ════════════════════════════════════════════
export const NewsView: FC<ToastProps> = ({ showToast }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  return (
    <div>
      <div style={s.viewHdr}>
        <div><div style={s.viewTitle}>Noticias</div><div style={s.viewSub}>Artículos · Análisis · Educación</div></div>
      </div>
      {selectedArticle ? (
        <div>
          <button onClick={() => setSelectedArticle(null)} style={s.btnGhost}>← Volver</button>
          <div style={{ ...s.card, padding: '32px', maxWidth: '720px', marginTop: '16px' }}>
            <span style={tagStyle('navy')}>{selectedArticle.cat}</span>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: T.navy, letterSpacing: '-1px', lineHeight: 1.3, margin: '12px 0' }}>{selectedArticle.title}</h1>
            <div style={{ fontSize: '11px', color: T.text3, marginBottom: '16px' }}>{selectedArticle.author} · {selectedArticle.date} · {selectedArticle.reads.toLocaleString()} lecturas</div>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: T.text }}>{selectedArticle.summary}</p>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: T.text2, marginTop: '16px' }}>Este artículo le pertenece a Ballpark copyright etc etc derechos etc equis</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {ARTICLES.map(a => (
            <div key={a.id} onClick={() => { setSelectedArticle(a); showToast('+5 pts por leer'); }} style={{ ...s.card, cursor: 'pointer', overflow: 'hidden' }}>
              <div style={{ height: '160px', background: `linear-gradient(135deg,${T.navy},${T.navy3})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>{a.emoji}</div>
              <div style={{ padding: '16px' }}>
                <span style={tagStyle('navy')}>{a.cat}</span>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: T.navy, letterSpacing: '-.5px', lineHeight: 1.4, margin: '8px 0' }}>{a.title}</h3>
                <p style={{ fontSize: '11px', color: T.text2, lineHeight: 1.6, marginBottom: '8px' }}>{a.summary}</p>
                <div style={{ fontSize: '9px', color: T.text3 }}>{a.date} · {a.reads.toLocaleString()} lecturas</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════
// POLLS VIEW
// ════════════════════════════════════════════
export const PollsView: FC<PtsProps & ToastProps> = ({ onAddPts, showToast }) => {
  const [voted, setVoted] = useState<Set<string>>(new Set());
  const vote = (pollId: string) => {
    if (voted.has(pollId)) return;
    setVoted(new Set([...voted, pollId]));
    onAddPts(5);
    showToast('+5 pts por votar');
  };

  return (
    <div>
      <div style={s.viewHdr}>
        <div><div style={s.viewTitle}>Encuestas</div><div style={s.viewSub}>La voz de los fans</div></div>
        <button style={s.btnPrimary}>+ Nueva encuesta</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          {DEMO_POLLS.filter(p => p.active).map(poll => {
            const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
            return (
              <div key={poll.id} style={{ ...s.card, padding: '16px', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: T.navy, marginBottom: '14px', lineHeight: 1.4 }}>{poll.question}</div>
                {poll.options.map((opt, i) => {
                  const pct = ((opt.votes / totalVotes) * 100).toFixed(0);
                  return (
                    <div key={i} onClick={() => vote(poll.id)} style={{ padding: '10px', borderRadius: '4px', marginBottom: '6px', cursor: voted.has(poll.id) ? 'default' : 'pointer', position: 'relative', overflow: 'hidden', border: `1px solid ${T.border}` }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, background: T.navyGhost, transition: 'width .5s' }} />
                      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ fontWeight: 600, color: T.navy }}>{opt.text}</span>
                        <span style={{ color: T.brown, fontWeight: 700 }}>{pct}%</span>
                      </div>
                    </div>
                  );
                })}
                <div style={{ fontSize: '9px', color: T.text3, marginTop: '6px' }}>{totalVotes.toLocaleString()} votos · +{poll.pts} pts</div>
              </div>
            );
          })}
        </div>
        <div>
          <div style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: T.brown, marginBottom: '12px', fontWeight: 700 }}>Encuestas cerradas</div>
          {DEMO_POLLS.filter(p => !p.active).map(poll => {
            const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
            return (
              <div key={poll.id} style={{ ...s.card, padding: '14px', opacity: 0.7, marginBottom: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: T.navy, marginBottom: '8px' }}>{poll.question}</div>
                {poll.options.map((opt, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', padding: '4px 0', color: T.text2 }}>
                    <span>{opt.text}</span><span style={{ fontWeight: 700 }}>{((opt.votes / totalVotes) * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════
// MARKETPLACE VIEW
// ════════════════════════════════════════════
export const MarketplaceView: FC<PtsProps & ToastProps> = ({ pts, onAddPts, showToast }) => {
  const [tab, setTab] = useState<'cards' | 'rewards' | 'history'>('cards');
  const [ownedCards, setOwnedCards] = useState<Set<string>>(new Set());

  const buyCard = (card: { id: string; name: string; cost: number }) => {
    if (pts < card.cost || ownedCards.has(card.id)) return;
    onAddPts(-card.cost);
    setOwnedCards(new Set([...ownedCards, card.id]));
    showToast(`Tarjeta ${card.name} adquirida!`);
  };

  return (
    <div>
      <div style={s.viewHdr}>
        <div><div style={s.viewTitle}>Marketplace</div><div style={s.viewSub}>Tarjetas virtuales · Recompensas</div></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: T.navy, padding: '8px 16px', borderRadius: '4px', color: T.beige }}>
          <span style={{ fontSize: '14px' }}>⬡</span>
          <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-1px' }}>{pts.toLocaleString()}</span>
          <span style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.7 }}>puntos</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '2px', marginBottom: '20px', background: T.cream2, border: `1px solid ${T.border}`, borderRadius: '4px', padding: '2px', alignSelf: 'start', width: 'fit-content' }}>
        {(['cards', 'rewards', 'history'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '6px 14px', borderRadius: '3px', fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: tab === t ? 'white' : T.brown, background: tab === t ? T.navy : 'transparent', cursor: 'pointer', border: 'none', fontFamily: T.font }}>
            {t === 'cards' ? 'Tarjetas' : t === 'rewards' ? 'Recompensas' : 'Mis Canjes'}
          </button>
        ))}
      </div>
      {tab === 'cards' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {PLAYER_CARDS.map(card => (
            <div key={card.id} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,45,114,.14)', cursor: 'pointer', border: ownedCards.has(card.id) ? `2px solid ${T.green}` : 'none' }}>
              <div style={{ background: `linear-gradient(135deg,${card.color},${card.color}cc)`, padding: '20px', color: 'white', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', background: 'rgba(255,255,255,.15)', padding: '2px 6px', borderRadius: '2px' }}>{card.rarity}</div>
                <div style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-3px', lineHeight: 1, opacity: 0.2, position: 'absolute', right: '16px', bottom: '8px' }}>⚾</div>
                <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-1px' }}>{card.name}</div>
                <div style={{ fontSize: '10px', opacity: 0.8, letterSpacing: '1px', marginTop: '2px' }}>{card.team} · {card.pos}</div>
              </div>
              <div style={{ background: 'white', padding: '14px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  {Object.entries(card.stats).map(([k, v]) => (
                    <div key={k} style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: T.navy }}>{v}</div>
                      <div style={{ fontSize: '7px', letterSpacing: '2px', color: T.brown, textTransform: 'uppercase' }}>{k}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => buyCard(card)} disabled={ownedCards.has(card.id) || pts < card.cost} style={{ ...s.btnPrimary, width: '100%', opacity: (ownedCards.has(card.id) || pts < card.cost) ? 0.5 : 1 }}>
                  {ownedCards.has(card.id) ? '✓ En colección' : `⬡ ${card.cost} pts`}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === 'rewards' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
          {[{ name: 'Pack de 3 tarjetas', cost: 100, emoji: '🎴' }, { name: 'Avatar exclusivo', cost: 200, emoji: '👤' }, { name: 'Badge verificado', cost: 500, emoji: '✓' }, { name: 'Acceso beta', cost: 1000, emoji: '🚀' }, { name: 'Nombre en créditos', cost: 2000, emoji: '⭐' }].map((r, i) => (
            <div key={i} style={{ ...s.card, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{r.emoji}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: T.navy, marginBottom: '4px' }}>{r.name}</div>
              <button style={{ ...s.btnGhost, marginTop: '8px' }}>⬡ {r.cost} pts</button>
            </div>
          ))}
        </div>
      )}
      {tab === 'history' && (
        <div style={{ textAlign: 'center', padding: '40px', color: T.text3, fontSize: '12px', letterSpacing: '2px' }}>
          {ownedCards.size > 0 ? [...ownedCards].map(id => {
            const card = PLAYER_CARDS.find(c => c.id === id);
            return card ? (
              <div key={id} style={{ ...s.card, padding: '14px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><div style={{ fontSize: '12px', fontWeight: 700, color: T.navy }}>{card.name}</div><div style={{ fontSize: '9px', color: T.text3 }}>Tarjeta {card.rarity}</div></div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: T.red }}>-{card.cost} pts</div>
              </div>
            ) : null;
          }) : 'No hay canjes registrados'}
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════
// EDITOR VIEW
// ════════════════════════════════════════════
export const EditorView: FC<ToastProps> = ({ showToast }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Análisis');
  const inputStyle: CSSProperties = { padding: '10px 12px', background: 'white', border: `1.5px solid ${T.border}`, borderRadius: '4px', fontFamily: T.font, fontSize: '13px', color: T.text, outline: 'none', width: '100%' };

  return (
    <div>
      <div style={s.viewHdr}>
        <div><div style={s.viewTitle}>Editor de Noticias</div><div style={s.viewSub}>Panel de administración · Crear artículos</div></div>
        <button onClick={() => showToast('Artículo publicado!')} style={s.btnPrimary}>Publicar</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '8px', letterSpacing: '3px', fontWeight: 700, color: T.brown, textTransform: 'uppercase', marginBottom: '4px' }}>Título</div>
            <input value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} placeholder="Título del artículo..." />
          </div>
          <div>
            <div style={{ fontSize: '8px', letterSpacing: '3px', fontWeight: 700, color: T.brown, textTransform: 'uppercase', marginBottom: '4px' }}>Categoría</div>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {['Análisis', 'Sabermetría', 'México', 'Tecnología', 'Noticias', 'Opinión'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: '8px', letterSpacing: '3px', fontWeight: 700, color: T.brown, textTransform: 'uppercase', marginBottom: '4px' }}>Contenido (Markdown)</div>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={16} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7, fontSize: '12px' }} placeholder="Escribe tu artículo en markdown..." />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '8px', letterSpacing: '3px', fontWeight: 700, color: T.brown, textTransform: 'uppercase', marginBottom: '10px' }}>Vista previa del artículo</div>
          <div style={{ ...s.card, padding: '24px', minHeight: '300px' }}>
            {title && <span style={tagStyle('navy')}>{category}</span>}
            {title && <h2 style={{ fontSize: '20px', fontWeight: 700, color: T.navy, letterSpacing: '-1px', margin: '10px 0', lineHeight: 1.3 }}>{title}</h2>}
            {content ? <p style={{ fontSize: '13px', lineHeight: 1.8, color: T.text }}>{content}</p> : <p style={{ fontSize: '12px', color: T.text3, fontStyle: 'italic' }}>El contenido aparecerá aquí...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════
// BOX SCORE VIEW
// ════════════════════════════════════════════
export const BoxScoreView: FC<ToastProps> = ({ showToast }) => {
  const innings = 9;
  const [homeTeam, setHomeTeam] = useState('LAD');
  const [awayTeam, setAwayTeam] = useState('PIT');
  const [homeRuns, setHomeRuns] = useState<string[]>(Array(9).fill(''));
  const [awayRuns, setAwayRuns] = useState<string[]>(Array(9).fill(''));

  const updateRuns = (setter: React.Dispatch<React.SetStateAction<string[]>>, idx: number, val: string) => {
    setter(prev => { const next = [...prev]; next[idx] = val; return next; });
  };
  const total = (arr: string[]) => arr.reduce((sum, v) => sum + (parseInt(v) || 0), 0);
  const teamInput: CSSProperties = { padding: '8px 10px', background: 'white', border: `1.5px solid ${T.border}`, borderRadius: '4px', fontFamily: T.font, fontSize: '13px', fontWeight: 700, color: T.navy, outline: 'none', width: '80px', textTransform: 'uppercase' };
  const cellInput: CSSProperties = { width: '28px', textAlign: 'center', border: 'none', background: 'transparent', fontFamily: T.font, fontSize: '13px', fontWeight: 600, color: T.text, outline: 'none' };

  return (
    <div>
      <div style={s.viewHdr}>
        <div><div style={s.viewTitle}>Mi Box Score</div><div style={s.viewSub}>Crea tu propio marcador personalizado</div></div>
        <button onClick={() => showToast('+15 pts por crear box score')} style={s.btnPrimary}>Guardar</button>
      </div>
      <div style={{ ...s.card, padding: '20px', maxWidth: '800px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '8px', letterSpacing: '3px', fontWeight: 700, color: T.brown, textTransform: 'uppercase', marginBottom: '4px' }}>Visitante</div>
            <input value={awayTeam} onChange={e => setAwayTeam(e.target.value)} style={teamInput} />
          </div>
          <div>
            <div style={{ fontSize: '8px', letterSpacing: '3px', fontWeight: 700, color: T.brown, textTransform: 'uppercase', marginBottom: '4px' }}>Local</div>
            <input value={homeTeam} onChange={e => setHomeTeam(e.target.value)} style={teamInput} />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ ...s.th, width: '60px' }}>Team</th>
                {Array.from({ length: innings }, (_, i) => <th key={i} style={s.th}>{i + 1}</th>)}
                <th style={{ ...s.th, background: T.cream2 }}>R</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...s.td, fontWeight: 700, color: T.navy }}>{awayTeam}</td>
                {awayRuns.map((v, i) => <td key={i} style={s.td}><input value={v} onChange={e => updateRuns(setAwayRuns, i, e.target.value)} style={cellInput} maxLength={2} /></td>)}
                <td style={{ ...s.td, fontWeight: 700, color: T.red, background: T.cream2 }}>{total(awayRuns)}</td>
              </tr>
              <tr>
                <td style={{ ...s.td, fontWeight: 700, color: T.navy }}>{homeTeam}</td>
                {homeRuns.map((v, i) => <td key={i} style={s.td}><input value={v} onChange={e => updateRuns(setHomeRuns, i, e.target.value)} style={cellInput} maxLength={2} /></td>)}
                <td style={{ ...s.td, fontWeight: 700, color: T.red, background: T.cream2 }}>{total(homeRuns)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════
// SCHEMA VIEW
// ════════════════════════════════════════════
export const SchemaView: FC<ToastProps> = ({ showToast }) => (
  <div>
    <div style={s.viewHdr}>
      <div><div style={s.viewTitle}>Arquitectura Supabase</div><div style={s.viewSub}>Schema · RLS · Edge Functions</div></div>
      <button onClick={() => { navigator.clipboard?.writeText(SUPABASE_SCHEMA); showToast('Schema SQL copiado'); }} style={s.btnOutline}>Copiar SQL</button>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
      {[{ title: 'profiles', desc: 'Datos del usuario, puntos, nivel, equipo favorito' }, { title: 'articles', desc: 'Artículos de noticias con markdown y metadata' }, { title: 'polls / poll_votes', desc: 'Encuestas con opciones y conteo de votos' }, { title: 'live_chat', desc: 'Mensajes de chat en vivo sincronizados' }, { title: 'player_cards', desc: 'Tarjetas virtuales de jugadores y rareza' }, { title: 'redemptions', desc: 'Historial de canjes de puntos' }, { title: 'posts', desc: 'Posts del feed, tags, likes' }, { title: 'box_scores', desc: 'Box scores personalizados por usuario' }, { title: 'leaderboard', desc: 'Scores del minijuego batter sim' }, { title: 'pitch_data', desc: 'Datos de pitcheos con Statcast metrics' }].map((t, i) => (
        <div key={i} style={{ ...s.card, padding: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: T.navy, marginBottom: '4px' }}>{t.title}</div>
          <div style={{ fontSize: '10px', color: T.text2 }}>{t.desc}</div>
        </div>
      ))}
    </div>
    <div style={{ background: '#0a1628', borderRadius: '6px', padding: '16px', overflow: 'auto' }}>
      <pre style={{ fontSize: '10px', lineHeight: 1.7, color: '#7dd3fc', fontFamily: T.font, whiteSpace: 'pre-wrap' }}>{SUPABASE_SCHEMA}</pre>
    </div>
  </div>
);

// ════════════════════════════════════════════
// PROFILE VIEW
// ════════════════════════════════════════════
export const ProfileView: FC<{ pts: number }> = ({ pts }) => (
  <div>
    <div style={{ background: T.navy, margin: '-28px -32px 0', padding: '36px 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(239,209,159,.03) 40px,rgba(239,209,159,.03) 41px)' }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: T.red, border: '3px solid rgba(239,209,159,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 700, color: 'white', flexShrink: 0 }}>DH</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: 'white', letterSpacing: '-1px' }}>Alan Sanmiguel</div>
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: T.beige, opacity: 0.7, marginTop: '2px' }}>@alansz</div>
          <div style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(239,209,159,.1)', padding: '4px 10px', borderRadius: '3px', fontSize: '10px', color: T.beige, letterSpacing: '1px' }}>⚾ Placeholder team</div>
        </div>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginTop: '24px' }}>
      {[{ n: pts.toLocaleString(), l: 'Puntos' }, { n: 'Plata', l: 'Nivel' }, { n: '47', l: 'Posts' }, { n: '12', l: 'Tarjetas' }].map((stat, i) => (
        <div key={i} style={{ ...s.card, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: T.navy, letterSpacing: '-2px' }}>{stat.n}</div>
          <div style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: T.brown, marginTop: '3px' }}>{stat.l}</div>
        </div>
      ))}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '20px', marginTop: '20px' }}>
      <div>
        <div style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: T.brown, marginBottom: '12px' }}>Actividad reciente</div>
        {['Votó en "MVP 2026"', 'Publicó en el feed', 'Compró tarjeta de Ohtani', 'Comentó en chat en vivo', 'Leyó artículo sobre wRC+'].map((a, i) => (
          <div key={i} style={{ ...s.card, padding: '10px 12px', marginBottom: '6px', fontSize: '11px', color: T.text2 }}>{a}</div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {['Editar perfil', 'Notificaciones', 'Equipo favorito', 'Idioma', 'Cerrar sesión'].map((setting, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'white', border: `1px solid ${T.border}`, borderRadius: '4px', fontSize: '11px', fontWeight: 600, color: T.navy, cursor: 'pointer' }}>
            {setting}<span style={{ color: T.text3 }}>→</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ════════════════════════════════════════════
// MINIGAME VIEW
// ════════════════════════════════════════════
export const MinigameView: FC = () => (
  <div>
    <div style={s.viewHdr}>
      <div><div style={s.viewTitle}>Batter Simulator</div><div style={s.viewSub}>Prueba tu reacción contra pitchers MLB</div></div>
    </div>
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <div style={{ fontSize: '80px', marginBottom: '16px' }}>⚾</div>
      <div style={{ fontSize: '24px', fontWeight: 700, color: T.navy, letterSpacing: '-1px', marginBottom: '8px' }}>ENFRÉNTATE A LOS PITCHERS MLB</div>
      <div style={{ fontSize: '12px', color: T.brown, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>Vista del bateador · Física exacta · 9 lanzamientos</div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
        {(Object.entries(PITCHERS) as [PitcherKey, Pitcher][]).map(([key, p]) => (
          <div key={key} style={{ ...s.card, padding: '16px', width: '180px', textAlign: 'left' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: T.red, letterSpacing: '-2px', lineHeight: 1 }}>{p.num}</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: T.navy, marginTop: '4px' }}>{p.name}</div>
            <div style={{ fontSize: '9px', color: T.brown, letterSpacing: '1px' }}>{p.team} · {p.hand}HP</div>
            <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap', marginTop: '8px' }}>
              {p.pitches.map(pitch => <span key={pitch.id} style={{ fontSize: '8px', padding: '2px 4px', borderRadius: '2px', background: T.navyGhost, color: T.navy, fontWeight: 600 }}>{pitch.id} {pitch.mph}</span>)}
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '11px', color: T.text2, maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
        Los scores se guardan y los puntos se suman a tu perfil.
      </p>
      <div style={{ marginTop: '16px' }}>
        <button style={s.btnPrimary}>🏆 Ver Leaderboard</button>
      </div>
    </div>
  </div>
);
