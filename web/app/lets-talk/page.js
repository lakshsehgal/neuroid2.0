'use client';
import React, { useEffect, useRef } from 'react';
import { useReveal } from '@/lib/useReveal';

const LOGOS = [
  ['Lifelong', 'lifelong.png'],
  ['Wooden Street', 'woodenstreet.png'],
  ['Silverfied', 'silverfied.png'],
  ['Jewelsmars', 'jewelsmars.png'],
  ['Superbottoms', 'superbottoms.avif'],
  ['Evara', 'evara.svg'],
  ['Kisah', 'kisah.avif'],
  ['DeepImpact', 'deepimpact.png'],
  ['Chowkhat', 'chowkhat.avif'],
  ['Nourish You', 'nourishyou.png'],
  ['Gataca', 'gataca.png'],
  ['Haus & Kinder', 'hausandkinder.avif'],
  ['Supersox', 'supersox.png'],
  ['Yoho', 'yoho.png'],
  ['Shyr', 'shyr.avif'],
];

const STAT_BULLET = { width: '14px', height: '14px', background: 'var(--neuroid-yellow)', border: '1.5px solid var(--neuroid-ink)', flex: 'none' };

export default function LetsTalkPage() {
  const rootRef = useRef(null);
  const calRef = useRef(null);
  useReveal(rootRef);

  useEffect(() => {
    const url = 'https://calendly.com/lakshsehgal/bookacall?hide_gdpr_banner=1&primary_color=020202';
    if (!document.querySelector('link[data-calendly]')) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://assets.calendly.com/assets/external/widget.css';
      l.setAttribute('data-calendly', '1');
      document.head.appendChild(l);
    }
    if (!window.Calendly && !document.querySelector('script[data-calendly]')) {
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      s.setAttribute('data-calendly', '1');
      document.head.appendChild(s);
    }
    const init = () => {
      if (window.Calendly && calRef.current && !calRef.current.dataset.init) {
        calRef.current.dataset.init = '1';
        window.Calendly.initInlineWidget({ url, parentElement: calRef.current });
        return true;
      }
      return !!(calRef.current && calRef.current.dataset.init);
    };
    let t;
    if (!init()) {
      let n = 0;
      t = setInterval(() => { if (init() || ++n > 80) clearInterval(t); }, 150);
    }
    const onMsg = (e) => {
      if (e.data && typeof e.data === 'object' && e.data.event === 'calendly.event_scheduled') {
        window.location.href = '/booking-confirmed';
      }
    };
    window.addEventListener('message', onMsg);
    return () => { clearInterval(t); window.removeEventListener('message', onMsg); };
  }, []);

  return (
    <div ref={rootRef} style={{ fontFamily: 'var(--font-sans)', background: '#F4F1EA', color: 'var(--neuroid-ink)', overflowX: 'hidden' }}>

      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(244,241,234,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '14px clamp(18px,4vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', flex: 'none', textDecoration: 'none' }}><img src="/assets/brand/neuroid-logo-black.svg" alt="Neuroid" style={{ height: '34px', width: 'auto', display: 'block' }} /></a>
          <a
            href="#book"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', background: 'var(--neuroid-ink)', color: 'var(--neuroid-paper)', border: '1.5px solid var(--neuroid-ink)', boxShadow: '4px 4px 0 0 var(--neuroid-ink)', padding: '11px 18px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '14px', letterSpacing: '-0.01em', whiteSpace: 'nowrap', transition: 'background .15s var(--ease-snap),color .15s var(--ease-snap),transform .15s var(--ease-snap),box-shadow .15s var(--ease-snap)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--neuroid-yellow)'; e.currentTarget.style.color = 'var(--neuroid-ink)'; e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 0 var(--neuroid-ink)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--neuroid-ink)'; e.currentTarget.style.color = 'var(--neuroid-paper)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '4px 4px 0 0 var(--neuroid-ink)'; }}
          >Book a Growth Audit</a>
        </div>
      </header>

      {/* TRUST + BOOKING (two-column) */}
      <section style={{ padding: 'clamp(28px,4vw,52px) clamp(18px,4vw,48px) clamp(40px,5vw,72px)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }} className="lt-main">

          {/* LEFT: proof */}
          <div>
            <div data-reveal style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--neuroid-red)', display: 'inline-block', flex: 'none' }}></span>
              <span>Let&apos;s talk</span>
            </div>
            <h1 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.02, fontSize: 'clamp(1.9rem,3.6vw,3rem)', margin: 0, maxWidth: '560px', textWrap: 'balance', color: 'var(--neuroid-ink)' }}>Neuroid is trusted by India&apos;s <span className="nrd-highlight">fastest-growing</span> brands.</h1>

            <div data-reveal style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--neuroid-grey)', margin: 'clamp(26px,3.4vw,38px) 0 16px' }}>A few stats we&apos;re proud of</div>
            <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: 'clamp(30px,4vw,44px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                <span style={STAT_BULLET}></span>
                <span style={{ fontSize: 'clamp(1.02rem,1.4vw,1.18rem)', lineHeight: 1.4 }}><strong style={{ fontWeight: 700 }}>450Cr+</strong> revenue generated for brands</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                <span style={STAT_BULLET}></span>
                <span style={{ fontSize: 'clamp(1.02rem,1.4vw,1.18rem)', lineHeight: 1.4 }}><strong style={{ fontWeight: 700 }}>5+ years</strong> of transformative client success</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                <span style={STAT_BULLET}></span>
                <span style={{ fontSize: 'clamp(1.02rem,1.4vw,1.18rem)', lineHeight: 1.4 }}><strong style={{ fontWeight: 700 }}>4.3x</strong> average ROAS</span>
              </div>
            </div>

            <div data-reveal className="lw-grid">
              {LOGOS.map(([name, file]) => (
                <div className="lw-cell" key={file}>
                  <img className="lw-logo" src={'/assets/logos/' + file} alt={name} />
                </div>
              ))}
            </div>

            <div data-reveal style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--neuroid-grey)', margin: 'clamp(32px,4vw,48px) 0 16px' }}>What you get on the call</div>
            <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '13px', marginBottom: 'clamp(28px,3.4vw,40px)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}><span style={{ width: '14px', height: '14px', background: 'var(--neuroid-yellow)', border: '1.5px solid var(--neuroid-ink)', flex: 'none', marginTop: '4px' }}></span><span style={{ fontSize: 'clamp(1rem,1.3vw,1.12rem)', lineHeight: 1.5 }}>A teardown of your ad account and funnel</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}><span style={{ width: '14px', height: '14px', background: 'var(--neuroid-yellow)', border: '1.5px solid var(--neuroid-ink)', flex: 'none', marginTop: '4px' }}></span><span style={{ fontSize: 'clamp(1rem,1.3vw,1.12rem)', lineHeight: 1.5 }}>Where your spend is leaking - and why</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}><span style={{ width: '14px', height: '14px', background: 'var(--neuroid-yellow)', border: '1.5px solid var(--neuroid-ink)', flex: 'none', marginTop: '4px' }}></span><span style={{ fontSize: 'clamp(1rem,1.3vw,1.12rem)', lineHeight: 1.5 }}>The creative, CRO and retention levers to pull next</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}><span style={{ width: '14px', height: '14px', background: 'var(--neuroid-yellow)', border: '1.5px solid var(--neuroid-ink)', flex: 'none', marginTop: '4px' }}></span><span style={{ fontSize: 'clamp(1rem,1.3vw,1.12rem)', lineHeight: 1.5 }}>A clear 90-day plan, yours to keep either way</span></div>
            </div>
          </div>

          {/* RIGHT: booking (sticky) */}
          <div className="bk-col" id="book">
            <h2 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0, fontSize: 'clamp(1.7rem,3vw,2.5rem)', margin: '0 0 22px' }}>Book your Growth Audit<span style={{ display: 'inline-block', width: '0.16em', height: '0.16em', background: 'var(--neuroid-red)', verticalAlign: 'baseline', marginLeft: '0.04em' }}></span></h2>
            <div data-reveal style={{ border: '2px solid var(--neuroid-ink)', borderRadius: '6px', boxShadow: '12px 12px 0 0 var(--neuroid-yellow)', background: 'var(--neuroid-paper)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '13px 16px', borderBottom: '1.5px solid var(--neuroid-ink)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                <span>Pick a time</span>
                <span style={{ color: 'var(--neuroid-grey)' }}>Neuroid - Growth Audit</span>
              </div>
              <div ref={calRef} className="calendly-inline-widget cal-widget"></div>
              <a href="https://calendly.com/lakshsehgal/bookacall" target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px 16px', borderTop: '1.5px solid var(--neuroid-ink)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--neuroid-ink)', background: 'var(--neuroid-yellow)', fontWeight: 700 }}>Calendar not loading? Open scheduler &rarr;</a>
            </div>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS (full width) */}
      <section style={{ padding: '0 clamp(18px,4vw,48px) clamp(48px,6vw,80px)' }}>
        <div className="lt-tg" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px,2vw,24px)' }}>
          <div data-reveal style={{ display: 'flex', flexDirection: 'column', background: 'var(--neuroid-ink)', color: '#fff', border: '1.5px solid var(--neuroid-ink)', padding: 'clamp(24px,3vw,34px)' }}>
            <div style={{ color: 'var(--neuroid-yellow)', fontSize: '15px', letterSpacing: '0.12em', marginBottom: '14px' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '15px' }}>Pulkit Tiwari</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '13px', color: 'var(--neuroid-grey)', marginTop: '2px' }}>CMO</div>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1rem,1.35vw,1.16rem)', lineHeight: 1.55, margin: '18px 0 0', color: '#fff', flex: '1 1 auto' }}>&quot;They combine strong technical capability with a deep understanding of the D2C ecosystem - translating data into clear, actionable strategy. Their ownership mindset makes them a trusted extension of our team.&quot;</p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: '14px', marginTop: '20px' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '14px' }}>Wooden Street</div>
            </div>
          </div>
          <div data-reveal style={{ display: 'flex', flexDirection: 'column', background: 'var(--neuroid-ink)', color: '#fff', border: '1.5px solid var(--neuroid-ink)', padding: 'clamp(24px,3vw,34px)' }}>
            <div style={{ color: 'var(--neuroid-yellow)', fontSize: '15px', letterSpacing: '0.12em', marginBottom: '14px' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '15px' }}>Varshikha Jyoti</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '13px', color: 'var(--neuroid-grey)', marginTop: '2px' }}>Founder</div>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1rem,1.35vw,1.16rem)', lineHeight: 1.55, margin: '18px 0 0', color: '#fff', flex: '1 1 auto' }}>&quot;They have been a great growth partner for us - proactive, data-led and genuinely invested in the brand. The team moves fast, tests relentlessly and treats our budget like their own.&quot;</p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: '14px', marginTop: '20px' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '14px' }}>Shyr Beauty</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--neuroid-ink)', color: 'var(--neuroid-paper)', padding: 'clamp(48px,7vw,80px) clamp(18px,4vw,48px) 36px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 320px', minWidth: '260px' }}>
              <img src="/assets/brand/neuroid-logo.svg" alt="Neuroid" style={{ height: '30px', marginBottom: '20px' }} />
              <p style={{ fontSize: '1.05rem', lineHeight: 1.5, maxWidth: '340px', margin: 0, color: 'var(--neuroid-grey-dark)' }}>An integrated growth &amp; creative studio for <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#fff' }}>D2C brands</span>.</p>
              <div className="nrd-pixels" style={{ marginTop: '24px' }}><i></i><i></i><i></i></div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--neuroid-grey-dark)', marginBottom: '16px' }}>Company</div>
                <a href="/#work" style={{ display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' }}>Work</a>
                <a href="/#about" style={{ display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' }}>About</a>
                <a href="/#services" style={{ display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' }}>Services</a>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--neuroid-grey-dark)', marginBottom: '16px' }}>Connect</div>
                <a href="https://instagram.com" style={{ display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' }}>Instagram</a>
                <a href="https://linkedin.com" style={{ display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' }}>LinkedIn</a>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.16)', display: 'flex', flexWrap: 'wrap', gap: '12px 24px', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11.5px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--neuroid-grey-dark)' }}>
            <span>New Delhi, India · hello@neuroidmedia.com</span>
            <span>www.neuroidmedia.com</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
