'use client';
import React, { useEffect, useRef, useState } from 'react';

const eyebrow = { display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '18px' };
const sq = { width: '8px', height: '8px', background: 'var(--neuroid-red)', display: 'inline-block', flex: 'none' };
const pillBase = { padding: '9px 15px', border: '1.5px solid var(--neuroid-ink)', fontWeight: 700, fontSize: 'clamp(0.82rem,1vw,0.94rem)' };

const INPUTS = [
  { t: 'Performance media', bg: 'var(--neuroid-yellow)', rot: -4, mt: 10 },
  { t: 'Meta & Google', bg: '#fff', rot: 3 },
  { t: 'UGC creative', bg: '#fff', rot: -6, mt: 14 },
  { t: 'Ad films', bg: 'var(--neuroid-ink)', c: '#fff', rot: 4, mt: 4 },
  { t: 'AI Content', bg: '#fff', rot: -3, mt: 16 },
  { t: 'Landing pages', bg: 'var(--neuroid-yellow)', rot: 5, mt: 2 },
  { t: 'Retention', bg: '#fff', rot: -5, mt: 12 },
  { t: 'CRO', bg: '#fff', rot: 2 },
  { t: 'Brand & IP', bg: 'var(--neuroid-ink)', c: '#fff', rot: -4, mt: 11 },
  { t: 'Social content', bg: '#fff', rot: 6 },
  { t: 'Analytics', bg: 'var(--neuroid-yellow)', rot: -3, mt: 14 },
  { t: '…and more', bg: '#fff', rot: 4, mt: 5 },
];

const OUTCOMES = [
  { label: 'More revenue', bg: 'var(--neuroid-ink)', c: '#fff', arrow: 'var(--neuroid-yellow)', val: '+213%', valColor: 'var(--neuroid-yellow)', delay: '0.1s' },
  { label: 'Higher ROAS', bg: '#fff', arrow: 'var(--neuroid-red)', val: '4.8×', delay: '0.25s' },
  { label: 'Lower CAC', bg: '#fff', arrow: 'var(--neuroid-red)', val: '−38%', delay: '0.4s' },
  { label: 'Brand recall', bg: 'var(--neuroid-yellow)', arrow: 'var(--neuroid-red)', val: 'that sticks', serif: true, delay: '0.55s' },
  { label: 'Retention & LTV', bg: '#fff', arrow: 'var(--neuroid-red)', val: '↑', delay: '0.7s' },
];

const FAN_PATHS = [
  'M40,90 C 240,90 320,180 500,180', 'M40,180 L 500,180', 'M40,270 C 240,270 320,180 500,180',
  'M500,180 C 700,180 760,40 1000,40', 'M500,180 C 700,180 760,110 1000,110', 'M500,180 L 1000,180',
  'M500,180 C 700,180 760,250 1000,250', 'M500,180 C 700,180 760,320 1000,320',
];

// ── Comparison scorecard ──────────────────────────────────────────────────────
const ROWS = [
  ['Creative + performance, one loop', 'yes', 'no', 'no'],
  ['Owns growth strategy', 'yes', 'yes', 'no'],
  ['Creative volume at scale', 'yes', 'no', 'yes'],
  ['Retention & CRO', 'yes', 'partial', 'no'],
  ['Socials, IPs & recall', 'yes', 'no', 'yes'],
  ['Reliable timelines', 'yes', 'yes', 'partial'],
  ['Feels like your own team', 'yes', 'no', 'no'],
];

function Check({ pop }) {
  return (
    <span className={'nrd-c2-mark' + (pop ? ' nrd-c2-mark--pop' : '')}>
      <svg width={pop ? 24 : 21} height={pop ? 24 : 21} viewBox="0 0 20 20" fill="none"><path d="M3.5 10.5l3.9 3.9L16.5 5.4" stroke="var(--neuroid-ink)" strokeWidth={pop ? 3 : 2.3} strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}
function Cross() {
  return (
    <span className="nrd-c2-mark">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M4 4l8 8" stroke="rgba(12,12,12,0.26)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 4l-8 8" stroke="rgba(12,12,12,0.26)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}
function Partial() {
  return (
    <span className="nrd-c2-mark"><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--neuroid-grey)', border: '1.2px solid rgba(12,12,12,0.26)', padding: '3px 8px', whiteSpace: 'nowrap' }}>Partial</span></span>
  );
}
function Mark({ v, pop }) { return v === 'yes' ? <Check pop={pop} /> : v === 'partial' ? <Partial /> : <Cross />; }

// Vertical animated connector shown only when the engine diagram stacks on
// phones (the horizontal .nrd-fansvg wiring is hidden there). Reuses the same
// dash-flow keyframe so the "inputs feeding the engine" motion stays visible.
function FanWire() {
  return (
    <div className="nrd-fan-wire" aria-hidden="true">
      <svg width="22" height="52" viewBox="0 0 22 52" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
        <line x1="11" y1="0" x2="11" y2="52" stroke="rgba(12,12,12,0.16)" strokeWidth="1.4" />
        <line x1="11" y1="0" x2="11" y2="52" stroke="var(--neuroid-yellow)" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 17" style={{ animation: 'nrd-dashflow2 2.6s linear infinite' }} />
      </svg>
    </div>
  );
}

function ComparisonMatrix() {
  const gridRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [hovRow, setHovRow] = useState(-1);
  const nNum = useRef(null), pNum = useRef(null), cNum = useRef(null);
  const nFill = useRef(null), pFill = useRef(null), cFill = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setBars = () => { if (nFill.current) nFill.current.style.width = '100%'; if (pFill.current) pFill.current.style.width = (2 / 7 * 100) + '%'; if (cFill.current) cFill.current.style.width = (2 / 7 * 100) + '%'; };
    const countUp = () => {
      const targets = [[nNum.current, 7], [pNum.current, 2], [cNum.current, 2]];
      const dur = 900, t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 2);
        targets.forEach(([el, tg]) => { if (el) el.textContent = String(Math.round(e * tg)); });
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (reduce || !('IntersectionObserver' in window)) {
      setInView(true); setBars();
      [[nNum.current, 7], [pNum.current, 2], [cNum.current, 2]].forEach(([el, tg]) => { if (el) el.textContent = String(tg); });
      return;
    }
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) {
          setInView(true);
          setTimeout(() => { setBars(); countUp(); }, ROWS.length * 60 + 300);
          io.disconnect();
        }
      });
    }, { threshold: 0.18 });
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  const labCls = (i) => 'nrd-c2-lab nrd-c2-rev' + (hovRow === i ? ' is-hov' : '');
  const cellCls = (i, neuroid) => 'nrd-c2-cell nrd-c2-rev' + (neuroid ? ' nrd-c2-cell--n' : '') + (hovRow === i ? ' is-hov' : '');
  const delay = (i) => ({ transitionDelay: ((ROWS.length - 1 - i) * 60) + 'ms' });
  const hov = (i) => ({ onMouseEnter: () => setHovRow(i), onMouseLeave: () => setHovRow(-1) });

  return (
    <div className="nrd-c2-host">
      <div ref={gridRef} className={'nrd-c2' + (inView ? ' is-in' : '')}>
        <div className="nrd-c2-labels">
          <div className="nrd-c2-hspace"><div className="nrd-c2-hspace-lab">What matters</div></div>
          {ROWS.map((r, i) => <div key={i} className={labCls(i)} style={delay(i)} {...hov(i)}>{r[0]}</div>)}
          <div className="nrd-c2-tlab">Where they net out</div>
        </div>

        <div className="nrd-c2-col nrd-c2-col--n">
          <div className="nrd-c2-h nrd-c2-h--n">
            <div className="nrd-c2-tag"><span>All of it</span>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M14.5 5.5a5 5 0 1 0 1.4 4.2" stroke="rgba(12,12,12,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M13.6 3.4l1.2 2.4-2.5.9" stroke="rgba(12,12,12,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="nrd-c2-brand">Neuroid</div>
            <div className="nrd-c2-sticker">The whole loop</div>
          </div>
          {ROWS.map((r, i) => <div key={i} className={cellCls(i, true)} style={delay(i)} {...hov(i)}><Mark v={r[1]} pop /></div>)}
          <div className="nrd-c2-tcell nrd-c2-tcell--n">
            <div className="nrd-c2-score"><span ref={nNum}>0</span><span style={{ opacity: 0.5, fontSize: '13px' }}>/7</span></div>
            <div className="nrd-c2-track nrd-c2-track--n"><div ref={nFill} className="nrd-c2-fill" /></div>
          </div>
        </div>

        <div className="nrd-c2-col">
          <div className="nrd-c2-h"><div className="nrd-c2-h-name">Paid Media Agency</div></div>
          {ROWS.map((r, i) => <div key={i} className={cellCls(i, false)} style={delay(i)} {...hov(i)}><Mark v={r[2]} /></div>)}
          <div className="nrd-c2-tcell">
            <div className="nrd-c2-score nrd-c2-score--c"><span ref={pNum}>0</span><span style={{ opacity: 0.5, fontSize: '13px' }}>/7</span></div>
            <div className="nrd-c2-track"><div ref={pFill} className="nrd-c2-fill nrd-c2-fill--c" /></div>
          </div>
        </div>

        <div className="nrd-c2-col">
          <div className="nrd-c2-h"><div className="nrd-c2-h-name">Creative Agency</div></div>
          {ROWS.map((r, i) => <div key={i} className={cellCls(i, false)} style={delay(i)} {...hov(i)}><Mark v={r[3]} /></div>)}
          <div className="nrd-c2-tcell">
            <div className="nrd-c2-score nrd-c2-score--c"><span ref={cNum}>0</span><span style={{ opacity: 0.5, fontSize: '13px' }}>/7</span></div>
            <div className="nrd-c2-track"><div ref={cFill} className="nrd-c2-fill nrd-c2-fill--c" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyNeuroid() {
  return (
    <section style={{ padding: 'clamp(56px,8vw,112px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div data-reveal style={eyebrow}><span style={sq} /><span>Why Neuroid</span></div>
        <h2 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.04, fontSize: 'clamp(1.8rem,3.6vw,3rem)', margin: '0 0 14px', maxWidth: '820px' }}>Every input we run feeds one <span className="nrd-highlight">engine</span><span style={{ display: 'inline-block', width: '0.16em', height: '0.16em', background: 'var(--neuroid-red)', verticalAlign: 'baseline', marginLeft: '0.05em' }} /></h2>
        <p data-reveal style={{ fontSize: '1.05rem', lineHeight: 1.55, margin: '0 0 clamp(40px,5vw,64px)', maxWidth: '600px', opacity: 0.86 }}>Performance agencies run media. Creative shops make assets. We run the whole loop - so everything you do compounds into the outcomes that actually matter.</p>

        <div data-reveal style={{ position: 'relative', border: '1.5px solid var(--neuroid-ink)', background: 'var(--neuroid-paper)', padding: 'clamp(28px,4vw,56px) clamp(20px,3vw,44px)', overflow: 'hidden' }}>
          <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: '46%', transform: 'translateY(-50%)', background: 'radial-gradient(ellipse at center, rgba(254,239,36,0.5), rgba(254,239,36,0) 72%)', pointerEvents: 'none' }} />
          <svg aria-hidden="true" className="nrd-fansvg" viewBox="0 0 1000 360" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
            <g fill="none" stroke="rgba(12,12,12,0.16)" strokeWidth="1.4">{FAN_PATHS.map((d, i) => <path key={i} d={d} />)}</g>
            <g fill="none" stroke="var(--neuroid-yellow)" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 17" style={{ animation: 'nrd-dashflow2 2.6s linear infinite' }}>{FAN_PATHS.map((d, i) => <path key={i} d={d} />)}</g>
          </svg>

          <div className="nrd-fanrow" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(14px,2.6vw,40px)' }}>
            <div className="nrd-fancol" style={{ flex: '1 1 0', minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--neuroid-grey)', marginBottom: '3px' }}>What we run</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--neuroid-grey)', marginBottom: '18px' }}>scattered &amp; disconnected</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '13px 11px', padding: '6px 0' }}>
                {INPUTS.map((p, i) => <span key={i} style={{ ...pillBase, background: p.bg, color: p.c || undefined, transform: `rotate(${p.rot}deg)`, marginTop: p.mt ? p.mt + 'px' : undefined }}>{p.t}</span>)}
              </div>
            </div>

            <FanWire />

            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', letterSpacing: '0.2em', color: 'var(--neuroid-ink)', lineHeight: 1, animation: 'nrd-spark 2.6s ease-in-out infinite' }}>→</div>
              <div style={{ width: 'clamp(96px,11vw,128px)', height: 'clamp(96px,11vw,128px)', background: 'var(--neuroid-ink)', border: '1.5px solid var(--neuroid-ink)', boxShadow: '6px 6px 0 0 var(--neuroid-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'nrd-breathe 1.9s ease-in-out infinite' }}>
                <img src="/assets/brand/neuroid-icon.svg" alt="Neuroid engine" style={{ display: 'block', width: '54%', height: '54%', objectFit: 'contain', margin: 'auto' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--neuroid-grey)' }}>The loop</div>
            </div>

            <FanWire />

            <div className="nrd-fancol" style={{ flex: '1 1 0', minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--neuroid-grey)', marginBottom: '3px', textAlign: 'right' }}>What you get</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--neuroid-grey)', marginBottom: '18px', textAlign: 'right' }}>ordered &amp; compounding</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {OUTCOMES.map((o, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', border: '1.5px solid var(--neuroid-ink)', background: o.bg, color: o.c || undefined, boxShadow: '4px 4px 0 0 var(--neuroid-ink)', animation: 'nrd-chipwave 3.4s ease-in-out infinite', animationDelay: o.delay }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: o.arrow, fontSize: '13px', flex: 'none' }}>→</span>
                    <span style={{ fontWeight: 700, fontSize: 'clamp(0.92rem,1.1vw,1.02rem)' }}>{o.label}</span>
                    <span style={{ marginLeft: 'auto', fontFamily: o.serif ? 'var(--font-serif)' : 'var(--font-mono)', fontStyle: o.serif ? 'italic' : 'normal', fontWeight: o.serif ? 400 : 700, color: o.valColor || undefined, fontSize: 'clamp(0.92rem,1.1vw,1.05rem)' }}>{o.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'clamp(40px,5.5vw,72px)' }}>
          <h3 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, fontSize: 'clamp(1.35rem,2.6vw,2.1rem)', margin: '0 0 8px' }}>Neuroid vs. the alternatives<span style={{ display: 'inline-block', width: '0.16em', height: '0.16em', background: 'var(--neuroid-red)', verticalAlign: 'baseline', marginLeft: '0.05em' }} /></h3>
          <p data-reveal style={{ fontSize: '1.02rem', lineHeight: 1.5, margin: '0 0 clamp(28px,3.5vw,40px)', color: 'rgba(12,12,12,0.66)', maxWidth: '580px' }}>A paid-media agency runs your ads. A creative shop makes your assets. Each owns a slice - we own the whole loop.</p>
          <ComparisonMatrix />
          <div data-reveal style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 24px', marginTop: 'clamp(28px,3.5vw,40px)' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.1rem,1.7vw,1.4rem)', letterSpacing: '-0.02em', lineHeight: 1.2, maxWidth: '540px' }}>Seven boxes. We're the only one that ticks <span className="nrd-highlight">all seven</span>.</p>
            <a href="/lets-talk" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', textDecoration: 'none', background: 'var(--neuroid-ink)', color: 'var(--neuroid-paper)', border: '1.5px solid var(--neuroid-ink)', boxShadow: '4px 4px 0 0 var(--neuroid-ink)', padding: '13px 20px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '14.5px', letterSpacing: '-0.01em', whiteSpace: 'nowrap', transition: 'background .15s var(--ease-snap),color .15s var(--ease-snap),transform .15s var(--ease-snap),box-shadow .15s var(--ease-snap)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--neuroid-yellow)'; e.currentTarget.style.color = 'var(--neuroid-ink)'; e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 0 var(--neuroid-ink)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--neuroid-ink)'; e.currentTarget.style.color = 'var(--neuroid-paper)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '4px 4px 0 0 var(--neuroid-ink)'; }}
            >Book a Growth Audit →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
