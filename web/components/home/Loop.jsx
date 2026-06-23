'use client';
import React from 'react';

function LoopNode({ num, title, body }) {
  return (
    <div
      style={{ position: 'relative', background: 'var(--neuroid-paper)', border: '1.5px solid var(--neuroid-ink)', boxShadow: '5px 5px 0 0 var(--neuroid-yellow)', padding: '15px 16px 16px', textAlign: 'left', transition: 'transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s cubic-bezier(.16,1,.3,1)' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '8px 8px 0 0 var(--neuroid-yellow)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '5px 5px 0 0 var(--neuroid-yellow)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '9px' }}>
        <span style={{ width: '30px', height: '30px', flex: 'none', background: 'var(--neuroid-yellow)', border: '1.5px solid var(--neuroid-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '14px', letterSpacing: '-0.02em', color: 'var(--neuroid-ink)' }}>{num}</span>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '15px', letterSpacing: '-0.02em', color: 'var(--neuroid-ink)', lineHeight: 1.1 }}>{title}</span>
      </div>
      <div style={{ fontSize: '12px', lineHeight: 1.4, color: 'var(--neuroid-grey)' }}>{body}</div>
    </div>
  );
}

const NODES = [
  ['01', 'Ship', 'Put creative + media live, fast.'],
  ['02', 'Read the signal', 'Signal from noise in the data.'],
  ['03', 'Sharpen', 'Cut what fails, back the winners.'],
  ['04', 'Scale', 'Compound winners, profitably.'],
];

export function LoopDesktop() {
  return (
    <div data-reveal style={{ position: 'relative', width: 'min(620px,86vw)', height: 'min(620px,86vw)', margin: '0 auto' }}>
      <svg viewBox="0 0 620 620" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <filter id="loopGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="310" cy="310" r="252" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" strokeDasharray="1 13" strokeLinecap="round" />
        <circle cx="310" cy="310" r="150" fill="none" stroke="rgba(254,239,36,0.32)" strokeWidth="1.5" strokeDasharray="6 12" style={{ animation: 'nrd-dashflow 3.5s linear infinite' }} />
        <g filter="url(#loopGlow)">
          <circle cx="310" cy="310" r="218" fill="none" stroke="var(--neuroid-yellow)" strokeWidth="3.5" />
        </g>
        <g fill="var(--neuroid-yellow)">
          <path d="M464 156 l16 2 -7 14 z" />
          <path d="M464 464 l-2 16 -14 -7 z" />
          <path d="M156 464 l-16 -2 7 -14 z" />
          <path d="M156 156 l2 -16 14 7 z" />
        </g>
        <g fill="var(--neuroid-yellow)" stroke="var(--neuroid-ink)" strokeWidth="1.5">
          <rect x="303" y="85" width="14" height="14" transform="rotate(45 310 92)" />
          <rect x="521" y="303" width="14" height="14" transform="rotate(45 528 310)" />
          <rect x="303" y="521" width="14" height="14" transform="rotate(45 310 528)" />
          <rect x="85" y="303" width="14" height="14" transform="rotate(45 92 310)" />
        </g>
        <g style={{ transformBox: 'view-box', transformOrigin: '310px 310px', animation: 'nrd-spin 9s linear infinite' }}>
          <circle cx="310" cy="92" r="15" fill="var(--neuroid-yellow)" opacity="0.4" filter="url(#loopGlow)" />
          <circle cx="310" cy="92" r="7" fill="var(--neuroid-yellow)" />
          <circle cx="310" cy="89" r="2.6" fill="#fff" />
        </g>
        <circle cx="310" cy="310" r="108" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" strokeDasharray="2 10" />
        <circle cx="310" cy="310" r="90" fill="#141414" stroke="var(--neuroid-yellow)" strokeWidth="1.5" />
      </svg>

      <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%,-2%)', width: '180px' }}><LoopNode num={NODES[0][0]} title={NODES[0][1]} body={NODES[0][2]} /></div>
      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translate(2%,-50%)', width: '180px' }}><LoopNode num={NODES[1][0]} title={NODES[1][1]} body={NODES[1][2]} /></div>
      <div style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translate(-50%,2%)', width: '180px' }}><LoopNode num={NODES[2][0]} title={NODES[2][1]} body={NODES[2][2]} /></div>
      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translate(-2%,-50%)', width: '180px' }}><LoopNode num={NODES[3][0]} title={NODES[3][1]} body={NODES[3][2]} /></div>

      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', width: '172px', pointerEvents: 'none' }}>
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" style={{ animation: 'nrd-spin 14s linear infinite', display: 'inline-block' }}>
          <path d="M41 24a17 17 0 1 1-5-12.05" stroke="var(--neuroid-yellow)" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M41 7v10.5H30.5" stroke="var(--neuroid-yellow)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '15px', letterSpacing: '-0.02em', marginTop: '12px', color: '#fff', lineHeight: 1.3 }}>One team. One loop.<br /><span style={{ color: 'var(--neuroid-yellow)' }}>No handoff.</span></div>
      </div>
    </div>
  );
}

export function LoopVertical() {
  const steps = [
    ['01', 'Ship', 'Put creative and media live, fast.'],
    ['02', 'Read the signal', 'Separate signal from noise in the data.'],
    ['03', 'Sharpen', 'Cut what fails, double down on what works.'],
    ['04', 'Scale', 'Compound the winners profitably.'],
  ];
  return (
    <div data-reveal style={{ maxWidth: '420px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ background: 'var(--neuroid-paper)', border: '1.5px solid var(--neuroid-ink)', boxShadow: '4px 4px 0 0 var(--neuroid-yellow)', padding: '16px 18px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', color: 'var(--neuroid-red)', fontWeight: 700 }}>{s[0]}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '17px', color: 'var(--neuroid-ink)', margin: '4px 0 3px' }}>{s[1]}</div>
              <div style={{ fontSize: '13px', lineHeight: 1.45, color: 'var(--neuroid-grey)' }}>{s[2]}</div>
            </div>
            <div style={{ textAlign: 'center', color: 'var(--neuroid-yellow)', fontSize: '22px', padding: '8px 0' }}>{i < 3 ? '↓' : '↻'}</div>
          </React.Fragment>
        ))}
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-sans)', fontWeight: 700, color: '#fff', fontSize: '15px' }}>Loops back to 01 - one team, no handoff.</div>
      </div>
    </div>
  );
}
