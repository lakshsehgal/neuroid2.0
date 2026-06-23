'use client';
import React, { useState } from 'react';

const FAQS = [
  ['What do you actually do?', 'We run growth and creative as one system for D2C brands - performance marketing (Meta + Google), performance creatives & UGC, social campaigns & IPs, and CRO & retention. One team, one loop, so the creative and the media compound instead of fighting each other.'],
  ['How are you different from a performance agency or a creative agency?', "Most agencies build a wall between the two - creative throws ads over to media, nobody owns the result. We deleted the wall. The data briefs the next creative, sharper creative lowers CAC, and the loop compounds. That feedback loop is the thing competitors can't copy."],
  ['Do I have to buy everything, or can I start with one thing?', "Start wherever it hurts. Come in for growth, or come in for creative - either door opens to the same engine. Most brands that start with one end up using both, because once the loop is running it's hard to unsee."],
  ['How fast will we see results?', "We guard the floor first (don't break what's working), then chase the ceiling. You'll see signal in the first few weeks and compounding over the first quarter. We report weekly, tied to decisions - what to do next, not just what already happened."],
  ['What size brands do you work with?', "D2C brands ready to scale - typically already spending and serious about growth. We've taken brands from ₹29L to ₹3.84Cr, lifted MRR 200%+, and held 5x+ ROAS at scale. If you're pre-revenue, we're probably not your fit yet."],
  ['How many creatives do we get?', '50+ money-printing creatives a month - built to convert, not just to look good. Volume and quality, on schedule, no flaky-vendor chasing.'],
  ['Are we locked into a long contract?', "No handcuffs. We earn the next month with this month's results. The work keeps us in the room, not a clause."],
  ['How involved do I need to be?', "As involved as you want, but we don't need babysitting. We sit inside your business like an operating partner - you'll have a senior team that thinks past the ad account and treats your P&L like it's ours."],
];

function Row({ q, a, isOpen, onToggle }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ borderTop: '1.5px solid var(--neuroid-ink)' }}>
      <button type="button" onClick={onToggle} aria-expanded={isOpen}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ display: 'flex', width: '100%', boxSizing: 'border-box', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', background: hov ? 'rgba(254,239,36,0.12)' : 'transparent', border: 'none', textAlign: 'left', font: 'inherit', color: 'inherit', cursor: 'pointer', padding: '24px 6px 24px ' + (hov ? '14px' : '4px'), transition: 'background .18s var(--ease-snap), padding-left .18s var(--ease-snap)' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.05rem,1.5vw,1.35rem)', lineHeight: 1.25, letterSpacing: '-0.01em', color: isOpen ? 'var(--neuroid-ink)' : 'rgba(12,12,12,0.74)', transition: 'color .25s var(--ease-snap)', paddingRight: '18px' }}>{q}</span>
        <span style={{ flex: 'none', width: '34px', height: '34px', border: '1.5px solid var(--neuroid-ink)', background: 'var(--neuroid-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
          <span className="nrd-faq-icon" style={{ display: 'inline-block', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '22px', lineHeight: 1, color: 'var(--neuroid-ink)', transition: 'transform .3s var(--ease-snap)', transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)' }}>+</span>
        </span>
      </button>
      <div className="nrd-faq-panel" style={{ overflow: 'hidden', maxHeight: isOpen ? '520px' : '0px', opacity: isOpen ? 1 : 0, paddingBottom: isOpen ? '26px' : '0px', transition: 'max-height .34s var(--ease-snap), opacity .3s ease, padding-bottom .34s var(--ease-snap)' }}>
        <div style={{ padding: '0 48px 0 4px' }}>
          <p style={{ margin: 0, fontSize: 'clamp(0.98rem,1.2vw,1.1rem)', lineHeight: 1.6, color: 'rgba(12,12,12,0.74)', maxWidth: '60ch' }}>{a}</p>
          <div className="nrd-faq-mark" style={{ height: '2px', background: 'var(--neuroid-yellow)', width: isOpen ? '72px' : '0px', marginTop: '14px', transition: 'width .4s var(--ease-snap)' }} />
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(-1);
  return (
    <section id="faq" style={{ background: '#F4F1EA', padding: 'clamp(56px,8vw,112px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="nrd-faq-grid">
          <div className="nrd-faq-sticky" style={{ position: 'sticky', top: '96px' }}>
            <div data-reveal style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px', color: 'var(--neuroid-ink)' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--neuroid-red)', display: 'inline-block', flex: 'none' }} /><span>Questions, answered</span>
            </div>
            <h2 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.98, fontSize: 'clamp(2.4rem,5vw,4rem)', margin: 0, color: 'var(--neuroid-ink)' }}>Before you <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, background: 'linear-gradient(var(--neuroid-yellow),var(--neuroid-yellow)) no-repeat', backgroundPosition: '0 82%', backgroundSize: '100% 42%', padding: '0 2px' }}>ask</span><span style={{ display: 'inline-block', width: '0.14em', height: '0.14em', background: 'var(--neuroid-red)', verticalAlign: 'baseline', marginLeft: '0.04em' }} /></h2>
            <p data-reveal style={{ fontSize: 'clamp(1.05rem,1.5vw,1.25rem)', lineHeight: 1.5, margin: '22px 0 0', color: 'var(--neuroid-grey)', maxWidth: '340px' }}>Straight answers. <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--neuroid-ink)' }}>No agency fog.</span></p>
            <div data-reveal style={{ marginTop: '32px' }}>
              <a href="/lets-talk" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', background: 'var(--neuroid-ink)', color: 'var(--neuroid-paper)', border: '1.5px solid var(--neuroid-ink)', boxShadow: '4px 4px 0 0 var(--neuroid-ink)', padding: '14px 22px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '15px', letterSpacing: '-0.01em', transition: 'background .15s var(--ease-snap),color .15s var(--ease-snap),transform .15s var(--ease-snap),box-shadow .15s var(--ease-snap)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--neuroid-yellow)'; e.currentTarget.style.color = 'var(--neuroid-ink)'; e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 0 var(--neuroid-ink)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--neuroid-ink)'; e.currentTarget.style.color = 'var(--neuroid-paper)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '4px 4px 0 0 var(--neuroid-ink)'; }}
              >Book a Growth Audit</a>
            </div>
          </div>

          <div data-reveal>
            <div style={{ borderBottom: '1.5px solid var(--neuroid-ink)' }}>
              {FAQS.map((d, i) => <Row key={i} q={d[0]} a={d[1]} isOpen={open === i} onToggle={() => setOpen((o) => (o === i ? -1 : i))} />)}
            </div>
            <div data-reveal style={{ marginTop: '28px', fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.02em', color: 'var(--neuroid-grey)' }}>Still have a question? <a href="mailto:hello@neuroidmedia.com" style={{ color: 'var(--neuroid-ink)', fontWeight: 700, textDecoration: 'none', borderBottom: '2px solid var(--neuroid-yellow)', paddingBottom: '1px' }}>Talk to us →</a> &nbsp;·&nbsp; hello@neuroidmedia.com</div>
          </div>
        </div>
      </div>
    </section>
  );
}
