import type { CSSProperties } from 'react';
import { T } from './tokens';

type StyleMap = Record<string, CSSProperties | ((...args: any[]) => CSSProperties)>;

export const styles: StyleMap = {
  // Global
  app: {
    fontFamily: T.font,
    background: T.cream,
    color: T.text,
    height: '100vh',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    WebkitFontSmoothing: 'antialiased',
    fontSize: '14px',
  },

  // Splash
  splash: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: T.navy,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashTitle: {
    fontSize: 'clamp(52px,8vw,88px)',
    fontWeight: 700,
    letterSpacing: '-4px',
    color: T.cream,
    lineHeight: 1,
  },
  splashB: { color: T.red },
  splashSub: {
    fontSize: '10px',
    letterSpacing: '6px',
    color: T.beige,
    opacity: 0.6,
    textTransform: 'uppercase',
    marginTop: '14px',
  },

  // Auth
  auth: {
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    background: T.cream,
    display: 'grid',
    gridTemplateColumns: '1fr 480px',
  },
  authLeft: {
    background: T.navy,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '60px',
    position: 'relative',
    overflow: 'hidden',
  },
  authRight: {
    background: T.cream,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    borderLeft: `1px solid ${T.border}`,
  },

  // Nav
  nav: {
    background: T.navy,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    borderRight: '1px solid rgba(239,209,159,.1)',
  },
  navBrand: {
    padding: '20px 20px 16px',
    borderBottom: '1px solid rgba(239,209,159,.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative',
    zIndex: 1,
  },
  navLogo: {
    fontSize: '20px',
    fontWeight: 700,
    letterSpacing: '-1px',
    color: 'white',
  },

  // Main
  main: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    background: T.cream,
  },
  view: { flex: 1, overflowY: 'auto', padding: '28px 32px' },
  viewHdr: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${T.border}`,
  },
  viewTitle: {
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '-1px',
    color: T.navy,
  },
  viewSub: {
    fontSize: '9px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: T.brown,
    marginTop: '2px',
  },

  // Buttons
  btnPrimary: {
    fontFamily: T.font,
    cursor: 'pointer',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '8px 18px',
    borderRadius: '4px',
    background: T.red,
    color: 'white',
    border: `2px solid ${T.red}`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  btnOutline: {
    fontFamily: T.font,
    cursor: 'pointer',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '8px 18px',
    borderRadius: '4px',
    background: 'transparent',
    color: T.navy,
    border: `2px solid ${T.navy}`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  btnGhost: {
    fontFamily: T.font,
    cursor: 'pointer',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '6px 12px',
    borderRadius: '4px',
    background: 'transparent',
    color: T.brown,
    border: `1.5px solid ${T.border}`,
  },

  // Card
  card: {
    background: 'white',
    border: `1px solid ${T.border}`,
    borderRadius: '6px',
    overflow: 'hidden',
  },
  widget: {
    background: 'white',
    border: `1px solid ${T.border}`,
    borderRadius: '6px',
    padding: '14px',
  },
  widgetTitle: {
    fontSize: '8px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: T.brown,
    fontWeight: 700,
    paddingBottom: '10px',
    marginBottom: '10px',
    borderBottom: `1px solid ${T.border}`,
  },

  // Table
  th: {
    fontSize: '8px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: T.brown,
    fontWeight: 700,
    padding: '9px 12px',
    textAlign: 'left',
    borderBottom: `1.5px solid ${T.border}`,
    background: T.cream,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  td: {
    padding: '9px 12px',
    borderBottom: `1px solid ${T.border}`,
    fontSize: '11px',
    whiteSpace: 'nowrap',
  },

  // Scoreboard
  scoreboard: {
    background: T.navy,
    borderRadius: '6px',
    padding: '18px 24px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '16px',
  },

  // Modal
  modalBg: {
    position: 'fixed',
    inset: 0,
    zIndex: 400,
    background: 'rgba(0,45,114,.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  modalBox: {
    background: 'white',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,45,114,.2)',
    overflow: 'hidden',
  },
};

// Dynamic style functions
export const navLinkStyle = (active: boolean): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '9px 10px',
  borderRadius: '5px',
  color: active ? T.beige : 'rgba(239,209,159,.45)',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  cursor: 'pointer',
  position: 'relative',
  width: '100%',
  textAlign: 'left',
  border: 'none',
  background: active ? 'rgba(239,209,159,.1)' : 'transparent',
  fontFamily: T.font,
});

export const tagStyle = (color: string): CSSProperties => ({
  display: 'inline-block',
  padding: '2px 7px',
  fontSize: '9px',
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  borderRadius: '3px',
  background:
    color === 'navy'
      ? T.navyGhost
      : color === 'red'
        ? 'rgba(213,0,50,.1)'
        : color === 'orange'
          ? 'rgba(253,90,30,.1)'
          : 'rgba(0,198,94,.1)',
  color:
    color === 'navy'
      ? T.navy
      : color === 'red'
        ? T.red
        : color === 'orange'
          ? T.orange
          : T.green,
});
