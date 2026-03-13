import { FC, useState, CSSProperties } from 'react';
import { styles } from '../data/styles';
import { T } from '../data/tokens';

interface Props {
  onLogin: () => void;
}

export const AuthScreen: FC<Props> = ({ onLogin }) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  const inputStyle: CSSProperties = {
    padding: '10px 12px', background: 'white', border: `1.5px solid ${T.border}`,
    borderRadius: '4px', fontFamily: T.font, fontSize: '13px', color: T.text, outline: 'none', width: '100%',
  };
  const labelStyle: CSSProperties = {
    fontSize: '8px', letterSpacing: '3px', fontWeight: 700, color: T.brown, textTransform: 'uppercase',
  };

  return (
    <div style={styles.auth as CSSProperties}>
      <div style={styles.authLeft as CSSProperties}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 80px,rgba(239,209,159,.03) 80px,rgba(239,209,159,.03) 81px)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '44px', fontWeight: 700, letterSpacing: '-2px', color: T.cream, marginBottom: '28px' }}>
            <span style={{ color: T.red }}>B</span>ALLPARK
          </div>
          <div style={{ fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 700, color: T.cream, lineHeight: 1.2, letterSpacing: '-1px', marginBottom: '16px' }}>
            Baseball.<br /><span style={{ color: T.beige }}>Sabermetría.</span><br />Comunidad.
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(239,209,159,.6)', lineHeight: 1.8, maxWidth: '400px' }}>
            La plataforma definitiva para fans del béisbol en México. Estadísticas profundas, chat en vivo durante los partidos, tarjetas virtuales y mucho más.
          </div>
          <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {['◎ Análisis de pitcheos con física real', '💬 Chat en vivo sincronizado', '⬡ Sistema de puntos y marketplace', '📊 Estadísticas Statcast', '🎴 Tarjetas virtuales de jugadores'].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: T.beige, opacity: 0.8, letterSpacing: '.5px' }}>{f}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={styles.authRight as CSSProperties}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: T.navy, letterSpacing: '-1px', marginBottom: '4px' }}>Bienvenido</div>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: T.brown, textTransform: 'uppercase', marginBottom: '28px' }}>al ballpark digital</div>
          <div style={{ display: 'flex', gap: 0, borderBottom: `2px solid ${T.border}`, marginBottom: '24px' }}>
            {(['login', 'signup'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '10px 0', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: tab === t ? T.navy : T.text3, borderBottom: tab === t ? `2px solid ${T.red}` : '2px solid transparent', marginBottom: '-2px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.font }}>
                {t === 'login' ? 'Iniciar sesión' : 'Registrarse'}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {tab === 'signup' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><div style={labelStyle}>Nombre</div><input style={inputStyle} placeholder="Alan" /></div>
                <div><div style={labelStyle}>Apellido</div><input style={inputStyle} placeholder="Sanmiguel" /></div>
              </div>
            )}
            {tab === 'signup' && (
              <div>
                <div style={labelStyle}>Equipo favorito</div>
                <select style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option>Selecciona tu equipo...</option>
                  {['Diablos Rojos del México', 'Los Angeles Dodgers', 'New York Yankees', 'Houston Astros', 'Atlanta Braves', 'San Diego Padres', 'Chicago Cubs'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            )}
            <div><div style={labelStyle}>Email</div><input style={inputStyle} type="email" placeholder="tu@email.com" /></div>
            <div><div style={labelStyle}>Contraseña</div><input style={inputStyle} type="password" placeholder="••••••••" /></div>
            <button onClick={onLogin} style={{ ...(styles.btnPrimary as CSSProperties), width: '100%', padding: '12px' }}>
              {tab === 'login' ? 'Entrar al Ballpark →' : 'Crear cuenta gratuita →'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '9px', letterSpacing: '2px', color: T.text3, textTransform: 'uppercase' }}>
              <span style={{ flex: 1, height: '1px', background: T.border }} />
              <span>o</span>
              <span style={{ flex: 1, height: '1px', background: T.border }} />
            </div>
            <button onClick={onLogin} style={{ ...(styles.btnPrimary as CSSProperties), width: '100%', padding: '12px', background: 'white', color: T.text, border: `1.5px solid ${T.border}` }}>
              Continuar con demo
            </button>
          </div>
          <div style={{ display: 'flex', gap: 0, marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${T.border}` }}>
            {[{ n: '8.2M', l: 'Fans MX' }, { n: '30', l: 'Equipos' }, { n: '162', l: 'Juegos' }].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < 2 ? `1px solid ${T.border}` : 'none' }}>
                <span style={{ display: 'block', fontSize: '20px', fontWeight: 700, color: T.navy, letterSpacing: '-1px' }}>{s.n}</span>
                <span style={{ display: 'block', fontSize: '8px', letterSpacing: '2px', color: T.brown, textTransform: 'uppercase', marginTop: '2px' }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
