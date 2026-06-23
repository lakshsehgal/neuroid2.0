'use client';
import React from 'react';

// ── Proof ribbon (one moving strip of stats) ──────────────────────────────────
export function Ribbon({ items, numColor, labelColor, labelOpacity, reverse, speed = 26 }) {
  const stat = (it, key) => (
    <div key={key} style={{ display: 'flex', alignItems: 'baseline', gap: '10px', padding: '10px 28px' }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(18px,1.9vw,26px)', letterSpacing: '-0.03em', color: numColor }}>{it[0]}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: labelColor, opacity: labelOpacity }}>{it[1]}</span>
    </div>
  );
  const dot = (key) => <span key={key} style={{ width: '7px', height: '7px', background: 'var(--neuroid-red)', alignSelf: 'center', flex: 'none' }} />;
  const make = (prefix) => {
    const kids = [];
    items.forEach((it, i) => { kids.push(stat(it, prefix + i)); kids.push(dot(prefix + 'd' + i)); });
    return <div key={prefix} style={{ display: 'flex', alignItems: 'center', flex: 'none' }}>{kids}</div>;
  };
  return (
    <div style={{ display: 'flex', width: 'max-content', willChange: 'transform', animation: `${reverse ? 'nrd-marquee-rev' : 'nrd-marquee'} ${speed}s linear infinite` }}>
      {make('a')}{make('b')}
    </div>
  );
}

// ── Logo marquee row (grayscale → color + yellow tile on hover) ───────────────
export function LogoRow({ brands, reverse, dur = '46s' }) {
  const cell = (b, i) => (
    <div key={i}
      style={{ flex: 'none', width: '186px', height: '88px', marginRight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 26px', border: '1px solid var(--neuroid-ink)', borderRadius: '12px', background: 'var(--neuroid-paper)', transition: 'background .22s var(--ease-snap), box-shadow .22s var(--ease-snap), transform .22s var(--ease-snap)' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--neuroid-yellow)'; e.currentTarget.style.boxShadow = '3px 3px 0 0 var(--neuroid-ink)'; e.currentTarget.style.transform = 'translate(-1px,-1px)'; const img = e.currentTarget.querySelector('img'); if (img) { img.style.filter = 'none'; img.style.opacity = '1'; } }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--neuroid-paper)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; const img = e.currentTarget.querySelector('img'); if (img) { img.style.filter = 'grayscale(1)'; img.style.opacity = '0.82'; } }}
    >
      <img src={`/assets/logos/${b[1]}`} alt={b[0]} loading="lazy"
        style={{ maxWidth: '100%', maxHeight: '40px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', filter: 'grayscale(1)', opacity: 0.82, transition: 'filter .22s var(--ease-snap), opacity .22s var(--ease-snap)' }} />
    </div>
  );
  const set = (kp) => brands.map((b, i) => cell(b, kp + i));
  return (
    <div style={{ display: 'flex', width: 'max-content', willChange: 'transform', animation: `${reverse ? 'nrd-marquee-rev' : 'nrd-marquee'} ${dur} linear infinite` }}>
      <div style={{ display: 'flex', flex: 'none' }}>{set('a')}</div>
      <div style={{ display: 'flex', flex: 'none' }} aria-hidden="true">{set('b')}</div>
    </div>
  );
}
