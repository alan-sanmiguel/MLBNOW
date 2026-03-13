import { useState, useCallback, CSSProperties } from 'react';
import { T } from './data/tokens';
import { styles, navLinkStyle } from './data/styles';
import { SectionLabel, Badge, Toast } from './components/UI';
import { SplashScreen } from './views/SplashScreen';
import { AuthScreen } from './views/AuthScreen';
import {
  FeedView, LiveView, StatsView, PitchesView,
  NewsView, PollsView, MarketplaceView, EditorView,
  BoxScoreView, MinigameView, SchemaView, ProfileView,
} from './views/Views';
import type { ScreenId, ViewId, NavGroup } from './types';

const s = styles as Record<string, CSSProperties>;

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap');
  @keyframes pulse{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:.8;transform:scale(1.2)}}
  *{margin:0;padding:0;box-sizing:border-box}
  button{font-family:'IBM Plex Mono',monospace}
  ::-webkit-scrollbar{width:4px;height:4px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:#E5E0D5;border-radius:2px}
  ::-webkit-scrollbar-thumb:hover{background:#AE8F6F}
`;

const NAV_ITEMS: NavGroup[] = [
  {
    section: 'Principal',
    items: [
      { id: 'feed', icon: '◉', label: 'Feed' },
      { id: 'live', icon: '▶', label: 'En Vivo', badge: 'live' },
    ],
  },
  {
    section: 'Béisbol',
    items: [
      { id: 'stats', icon: '◈', label: 'Estadísticas' },
      { id: 'pitches', icon: '◎', label: 'Pitcheos' },
      { id: 'boxscore', icon: '▦', label: 'Mi Box Score' },
      { id: 'minigame', icon: '⚾', label: 'Batter Sim' },
    ],
  },
  {
    section: 'Comunidad',
    items: [
      { id: 'news', icon: '▣', label: 'Noticias', badge: 'new' },
      { id: 'polls', icon: '◧', label: 'Encuestas' },
      { id: 'marketplace', icon: '◈', label: 'Marketplace' },
    ],
  },
  {
    section: 'Admin',
    items: [
      { id: 'editor', icon: '✎', label: 'Editor' },
    ],
  },
];

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('splash');
  const [view, setView] = useState<ViewId>('feed');
  const [pts, setPts] = useState(1240);
  const [toast, setToast] = useState({ msg: '', visible: false });

  const showToast = useCallback((msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2500);
  }, []);

  const addPts = useCallback((n: number) => {
    setPts(p => Math.max(0, p + n));
  }, []);

  // Screens
  if (screen === 'splash') {
    return (
      <>
        <style>{globalStyles}</style>
        <SplashScreen onDone={() => setScreen('auth')} />
      </>
    );
  }

  if (screen === 'auth') {
    return (
      <>
        <style>{globalStyles}</style>
        <AuthScreen onLogin={() => setScreen('app')} />
      </>
    );
  }

  return (
    <>
      <style>{globalStyles}</style>
      <div style={s.app}>
        {/* ── SIDEBAR ── */}
        <nav style={s.nav}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(239,209,159,.03) 39px,rgba(239,209,159,.03) 40px)' }} />
          <div style={s.navBrand}>
            <div style={s.navLogo}><span style={{ color: T.red }}>B</span>ALLPARK</div>
            <div style={{ fontSize: '9px', letterSpacing: '2px', color: T.beige, opacity: 0.4, marginLeft: 'auto' }}>2026</div>
          </div>
          <div style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '1px', overflowY: 'auto', position: 'relative', zIndex: 1 }}>
            {NAV_ITEMS.map(group => (
              <div key={group.section}>
                <SectionLabel>{group.section}</SectionLabel>
                {group.items.map(item => (
                  <button key={item.id} onClick={() => setView(item.id as ViewId)} style={navLinkStyle(view === item.id)}>
                    {view === item.id && <div style={{ position: 'absolute', left: 0, top: '25%', bottom: '25%', width: '2px', background: T.red, borderRadius: '0 2px 2px 0' }} />}
                    <span style={{ fontSize: '13px', width: '16px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && <Badge type={item.badge}>{item.badge === 'live' ? 'LIVE' : 'NEW'}</Badge>}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(239,209,159,.1)', position: 'relative', zIndex: 1 }}>
            <div style={{ height: '2px', background: 'rgba(239,209,159,.1)', borderRadius: '1px', overflow: 'hidden', marginBottom: '10px' }}>
              <div style={{ height: '100%', background: T.beige, borderRadius: '1px', width: `${(pts / 1628 * 100).toFixed(0)}%` }} />
            </div>
            <div onClick={() => setView('profile')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '5px', cursor: 'pointer' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: T.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white', flexShrink: 0 }}>DH</div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: T.cream }}>User</div>
                <div style={{ fontSize: '9px', color: T.beige, opacity: 0.6, letterSpacing: '1px', marginTop: '1px' }}>⬡ {pts.toLocaleString()} pts · Plata</div>
              </div>
            </div>
          </div>
        </nav>

        {/* ── MAIN ── */}
        <main style={s.main}>
          <div style={s.view}>
            {view === 'feed' && <FeedView pts={pts} onAddPts={addPts} showToast={showToast} />}
            {view === 'live' && <LiveView showToast={showToast} />}
            {view === 'stats' && <StatsView />}
            {view === 'pitches' && <PitchesView />}
            {view === 'news' && <NewsView showToast={showToast} />}
            {view === 'polls' && <PollsView pts={pts} onAddPts={addPts} showToast={showToast} />}
            {view === 'marketplace' && <MarketplaceView pts={pts} onAddPts={addPts} showToast={showToast} />}
            {view === 'editor' && <EditorView showToast={showToast} />}
            {view === 'boxscore' && <BoxScoreView showToast={showToast} />}
            {view === 'minigame' && <MinigameView />}
            {view === 'schema' && <SchemaView showToast={showToast} />}
            {view === 'profile' && <ProfileView pts={pts} />}
          </div>
        </main>
      </div>
      <Toast message={toast.msg} visible={toast.visible} />
    </>
  );
}
