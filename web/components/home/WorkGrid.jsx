'use client';
import React, { useEffect, useRef } from 'react';

const INK = 'var(--neuroid-ink)', YEL = 'var(--neuroid-yellow)';
const CARDS = [
  { brand: 'Wooden Street', stat: '5x+', label: 'ROAS at scale', bg: YEL, numColor: INK, labelColor: 'rgba(12,12,12,0.62)', video: 'https://res.cloudinary.com/dbuklvo6b/video/upload/v1782212460/Video-875_blwuip.mp4' },
  { brand: 'Kisah', stat: '7x', label: 'jump in MRR', bg: INK, numColor: YEL, labelColor: 'rgba(255,255,255,0.65)', video: 'https://res.cloudinary.com/dbuklvo6b/video/upload/v1782212490/Video-582_qsssrj.mp4' },
  { brand: 'Jewelsmars', stat: '207%', label: 'MRR in 5 months', bg: YEL, numColor: INK, labelColor: 'rgba(12,12,12,0.62)', video: 'https://res.cloudinary.com/dbuklvo6b/video/upload/v1782212460/Video-493_cqwg5m.mp4' },
  { brand: 'Lifelong', stat: '7.5x', label: 'peak ROAS', bg: INK, numColor: YEL, labelColor: 'rgba(255,255,255,0.65)', video: 'https://res.cloudinary.com/dbuklvo6b/video/upload/v1782212463/Video-696_m6abg3.mp4' },
];

export default function WorkGrid() {
  const sectionRef = useRef(null);
  const ovRefs = useRef([]);
  const hoverRef = useRef(false);
  const idxRef = useRef(-1);

  useEffect(() => {
    const id = setInterval(() => {
      const sec = sectionRef.current;
      if (!sec || hoverRef.current) return;
      const r = sec.getBoundingClientRect();
      if (r.bottom < 60 || r.top > window.innerHeight - 60) return;
      const ovs = ovRefs.current.filter(Boolean);
      if (!ovs.length) return;
      idxRef.current = (idxRef.current + 1) % ovs.length;
      ovs.forEach((ov, i) => { ov.style.clipPath = i === idxRef.current ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)'; });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={sectionRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 'clamp(16px,2vw,26px)' }}>
      {CARDS.map((c, i) => (
        <div key={i} data-reveal>
          <div
            style={{ position: 'relative', border: '1.5px solid ' + INK, boxShadow: '5px 5px 0 0 ' + INK, overflow: 'hidden', aspectRatio: '4 / 5', cursor: 'pointer', transition: 'transform .22s var(--ease-snap), box-shadow .22s var(--ease-snap)' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.boxShadow = '9px 9px 0 0 ' + YEL; hoverRef.current = true; const ov = ovRefs.current[i]; if (ov) ov.style.clipPath = 'inset(0% 0 0 0)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '5px 5px 0 0 ' + INK; hoverRef.current = false; const ov = ovRefs.current[i]; if (ov) ov.style.clipPath = 'inset(52% 0 0 0)'; }}
          >
            <video src={c.video} autoPlay loop muted playsInline controls={false} disablePictureInPicture preload="metadata" aria-label={c.brand + ' creative'}
              ref={(el) => { if (el) { el.muted = true; el.defaultMuted = true; el.volume = 0; const p = el.play(); if (p && p.catch) p.catch(() => {}); } }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#0C0C0C' }} />
            <div className="nrd-work-ov" ref={(el) => { ovRefs.current[i] = el; }}
              style={{ position: 'absolute', inset: 0, background: `color-mix(in srgb, ${c.bg} ${c.bg === YEL ? '60%' : '70%'}, transparent)`, clipPath: 'inset(52% 0 0 0)', transition: 'clip-path .55s var(--ease-snap)', zIndex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '18px', pointerEvents: 'none' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: c.labelColor, marginBottom: '4px' }}>{c.label}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.92, fontSize: 'clamp(2.4rem,5vw,3.4rem)', color: c.numColor }}>{c.stat}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start', marginTop: '16px', padding: '9px 16px 9px 18px', borderRadius: '999px', background: c.numColor, color: c.bg, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '14px', letterSpacing: '-0.01em' }}>View<span style={{ fontSize: '16px', lineHeight: 1 }}>→</span></div>
            </div>
          </div>
          <a href="#contact" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', textDecoration: 'none', color: INK, fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.02em', fontSize: 'clamp(1.15rem,1.6vw,1.45rem)' }}>{c.brand}<span style={{ fontSize: '1.1em', lineHeight: 1 }}>→</span></a>
        </div>
      ))}
    </div>
  );
}
