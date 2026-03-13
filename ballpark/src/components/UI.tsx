import type { FC, ReactNode } from 'react';
import { T } from '../data/tokens';

// ── Section Label ──
export const SectionLabel: FC<{ children: ReactNode }> = ({ children }) => (
  <div style={{ fontSize: '7px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(239,209,159,.3)', padding: '10px 10px 4px' }}>
    {children}
  </div>
);

// ── Badge ──
export const Badge: FC<{ type: 'live' | 'new'; children: ReactNode }> = ({ type, children }) => (
  <span style={{
    fontSize: '7px', fontWeight: 700, letterSpacing: '1px', padding: '2px 5px', borderRadius: '2px',
    background: type === 'live' ? T.red : T.orange, color: 'white',
    animation: type === 'live' ? 'pulse 1.5s ease-in-out infinite' : 'none',
  }}>
    {children}
  </span>
);

// ── Toast ──
export const Toast: FC<{ message: string; visible: boolean }> = ({ message, visible }) => (
  <div style={{
    position: 'fixed', bottom: '24px', left: '50%',
    transform: `translateX(-50%) translateY(${visible ? '0' : '80px'})`,
    background: T.navy, color: 'white', fontSize: '11px', fontWeight: 700,
    letterSpacing: '1.5px', textTransform: 'uppercase', padding: '11px 22px',
    borderRadius: '5px', boxShadow: '0 20px 60px rgba(0,45,114,.2)',
    zIndex: 9000, whiteSpace: 'nowrap',
    transition: 'transform .35s cubic-bezier(.16,1,.3,1)', fontFamily: T.font,
  }}>
    {message}
  </div>
);
