'use client';
// Service-card motion figure: a 16:9 card that plays a Stage scene on loop,
// chromeless (no playback bar), filling the card edge-to-edge. Mirrors the
// Home page's service grid cards from the handoff.
import React from 'react';
import { Stage } from '@/lib/animations';

export default function Figure({ children, duration = 7.4, title, body }) {
  return (
    <div data-reveal style={{
      border: '1.5px solid var(--neuroid-ink)', boxShadow: '8px 8px 0 0 var(--neuroid-ink)',
      overflow: 'hidden', background: '#0a0a0a',
      transition: 'box-shadow .22s var(--ease-snap), transform .22s var(--ease-snap)',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '12px 12px 0 0 var(--neuroid-yellow)'; e.currentTarget.style.transform = 'translate(-2px,-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '8px 8px 0 0 var(--neuroid-ink)'; e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', background: '#0a0a0a' }}>
        <div className="svc-fig-stage" style={{ position: 'absolute', inset: 0 }}>
          <Stage width={1280} height={720} duration={duration} background="#ffffff" loop showBar={false}>
            {children}
          </Stage>
        </div>
      </div>
      <div style={{ padding: 'clamp(18px,2.2vw,28px)', borderTop: '1.5px solid var(--neuroid-ink)', background: '#0c0c0c' }}>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.03em', fontSize: 'clamp(1.3rem,2vw,1.85rem)', lineHeight: 1.05, margin: '0 0 6px', color: '#fff' }}>{title}</h3>
        <p style={{ fontSize: 'clamp(0.92rem,1.15vw,1.05rem)', lineHeight: 1.45, margin: 0, color: 'rgba(255,255,255,0.72)', maxWidth: '46ch' }}>{body}</p>
      </div>
    </div>
  );
}
