import { FC, useEffect } from 'react';
import { styles } from '../data/styles';
import { T } from '../data/tokens';
import type { CSSProperties } from 'react';

interface Props {
  onDone: () => void;
}

export const SplashScreen: FC<Props> = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={styles.splash as CSSProperties}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(239,209,159,.04) 59px,rgba(239,209,159,.04) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(239,209,159,.04) 59px,rgba(239,209,159,.04) 60px)' }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={styles.splashTitle as CSSProperties}>
          <span style={styles.splashB as CSSProperties}>B</span>ALLPARK
        </div>
        <div style={styles.splashSub as CSSProperties}>MLB Fan Platform · Temporada 2026</div>
        <div style={{ width: '180px', height: '1px', background: `linear-gradient(90deg,transparent,${T.beige},transparent)`, marginTop: '32px' }} />
        <div style={{ display: 'flex', gap: '5px', marginTop: '20px' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: T.beige, opacity: 0.4, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  );
};
