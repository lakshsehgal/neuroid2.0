'use client';
import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';
import { useVideoVisibility } from '@/lib/useVideoVisibility';
import { useReveal } from '@/lib/useReveal';
import { vid } from '@/lib/videos';

const INK = 'var(--neuroid-ink)';
const YEL = 'var(--neuroid-yellow)';

function buildItems() {
  // [fileName, brand, category] — hand-shuffled so clips from the same brand
  // never land next to each other on the wall.
  const V = [
    ['HK%20Cotton%20Yellow%20V1.mp4', 'Haus & Kinder', 'perf'],
    ['CC60_FRECKLES_VIDEO.mp4', 'Freckles', 'ugc'],
    ['CC101_Bedtime%20Supremacy.mp4', 'Silverfied', 'social'],
    ['Sequence%2001%20(1).mp4', 'Wooden Street', 'film'],
    ['PU%203%20_%20Hook%202%20(1).mp4', 'Period Underwear', 'ugc'],
    ['Svarn%20Jewels_CC146.mp4', 'Svarn Jewels', 'perf'],
    ['SSU%20PPT%20V1.mp4', 'Superbottoms', 'film'],
    ['Yoho%20Pitstop%20H1_V2%20(3).mp4', 'Yoho', 'perf'],
    ['HnK_Sheer_V2.mp4', 'Haus & Kinder', 'social'],
    ['CC5%20Final.mp4', 'Kisah', 'film'],
    ['CC67%20Silverfied%20Stack%20you%20forget%20to%20take%20off.mp4', 'Silverfied', 'social'],
    ['CC14_Girls%20Leggings_V2.mp4', 'Superbottoms', 'perf'],
    ['CC115%20Bestseller%20Rings.mp4', 'Jewelsmars', 'perf'],
    ['H1%20CupJi%20V1%20(3).mp4', 'Cup Ji', 'ugc'],
    ['Period%20Underwear%20_%20Hook%202.mp4', 'Period Underwear', 'ugc'],
    ['CC11_Understyling%20your%20eyes.mp4', 'Huesfab', 'social'],
    ['H&K%20Blackout%20Curtain%20V1%20(1).mp4', 'Haus & Kinder', 'film'],
    ['9X16_V1.mp4', 'Spirit Animal', 'perf'],
    ['CC56%20silvercied%20Msgs%20in%20DM%20Final.mp4', 'Silverfied', 'social'],
    ['Karassa%20UGC%202%20(2).mp4', 'Karassa', 'ugc'],
    ['DFL_01.mp4', 'Superbottoms', 'perf'],
    ['CC15_V3.mp4', 'Jewelsmars', 'perf'],
    ['9x16_V3.mp4', 'Lifelong', 'perf'],
    ['Cotton+Sheer%20(1).mp4', 'Haus & Kinder', 'perf'],
    ['CC14%20(1).mp4', 'Superbottoms', 'perf'],
    ['CC60%20Silverfied%20Screen%20Freeze%20Product%20final.mp4', 'Silverfied', 'social'],
    ['PU%2002%20May%20H2.wav%20(1).mp4', 'Period Underwear', 'ugc'],
    ['CC33_PowerShift%20Pants_video.mp4', 'PowerShift', 'perf'],
    ['Svarn%20Jewels_CC140.MP4', 'Svarn Jewels', 'social'],
    ['Podcast%20V1.mp4', 'Superbottoms', 'film'],
    ['9x16.mp4', 'Vaaree', 'perf'],
    ['H&K%20Sheer+Blackout%20V2.mp4', 'Haus & Kinder', 'film'],
    ['CC12%20ceratine%20Final.mp4', 'Ceratine', 'perf'],
    ['CC16%20_%20People%20looking_02.mp4', 'People Looking', 'ugc'],
    ['CC27%20Huesfab%20All%20collection%20Final.mp4', 'Huesfab', 'social'],
    ['Polo_Gif.mp4', 'Mackly', 'social'],
    ['CC3%20_%20Hard%20Launch%20-%20Short%20Kurta.mp4', 'Kisah', 'film'],
  ].map((r) => ({ type: 'video', src: vid(r[0]), brand: r[1], cat: r[2] }));

  const statics = [
    ['c01.png', 'Wooden Street'], ['c02.png', 'Jewelsmars'], ['c03.png', 'Lifelong'],
    ['c04.png', 'Silverfied'], ['c05.png', 'Kisah'], ['c06.png', 'Yoho'],
    ['c07.png', 'Superbottoms'], ['c08.png', 'Huesfab'], ['c09.png', 'Vaaree'],
    ['c10.jpg', 'Mackly'], ['c11.jpg', 'Nourish You'], ['c12.jpg', 'Spirit Animal'],
    ['c13.jpg', 'Awenest'], ['c14.jpg', 'Ghani Putri'], ['c15.jpg', 'Loving Crafts'],
    ['c16.jpg', 'Chowkhat'], ['c17.jpg', 'Supersox'], ['c18.jpg', 'Vedansh'],
    ['c19.jpg', 'Jaipuri Crown'], ['c20.jpg', 'Gataca'], ['c21.jpg', 'Truth & Hair'],
    ['c22.png', 'Deep Impact'], ['c23.png', 'Evara'], ['c24.jpg', 'Wooden Street'],
    ['c25.jpg', 'Jewelsmars'], ['c26.jpg', 'Lifelong'],
  ].map((r) => {
    const p = '/assets/cmp/' + r[0].replace(/\.(png|jpg|jpeg)$/i, '.jpg');
    return { type: 'img', src: p, brand: r[1], cat: 'static' };
  });

  // Interleave videos and statics for a lively, mixed wall
  const out = [];
  const n = Math.max(V.length, statics.length);
  for (let i = 0; i < n; i++) {
    if (i < V.length) out.push(V[i]);
    if (i % 2 === 1 && (i >> 1) < statics.length) out.push(statics[i >> 1]);
  }
  // append remaining statics
  statics.forEach((s, i) => { if (i % 2 === 0) out.push(s); });
  return out;
}

const STATS = [
  ['200+', 'Creatives / month'],
  ['100+', 'D2C brands'],
  ['7.5x', 'Peak ROAS'],
  ['₹450Cr+', 'Revenue influenced'],
];

function LogoRow({ brands, reverse, dur }) {
  const cell = (b, i) => (
    <div
      key={i}
      style={{ flex: 'none', width: '180px', height: '84px', marginRight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 26px', border: '1px solid var(--neuroid-ink)', background: 'var(--neuroid-paper)', transition: 'background .22s var(--ease-snap), box-shadow .22s var(--ease-snap), transform .22s var(--ease-snap)' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--neuroid-yellow)'; e.currentTarget.style.boxShadow = '3px 3px 0 0 var(--neuroid-ink)'; e.currentTarget.style.transform = 'translate(-1px,-1px)'; const img = e.currentTarget.querySelector('img'); if (img) { img.style.filter = 'none'; img.style.opacity = '1'; } }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--neuroid-paper)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; const img = e.currentTarget.querySelector('img'); if (img) { img.style.filter = 'grayscale(1)'; img.style.opacity = '0.82'; } }}
    >
      <img
        src={'/assets/logos/' + b[1]}
        alt={b[0]}
        loading="lazy"
        style={{ maxWidth: '100%', maxHeight: '38px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', filter: 'grayscale(1)', opacity: 0.82, transition: 'filter .22s var(--ease-snap), opacity .22s var(--ease-snap)' }}
      />
    </div>
  );
  const set = (kp) => brands.map((b, i) => cell(b, kp + i));
  return (
    <div style={{ display: 'flex', width: 'max-content', willChange: 'transform', animation: (reverse ? 'nrd-marquee-rev' : 'nrd-marquee') + ' ' + dur + ' linear infinite' }}>
      <div style={{ display: 'flex', flex: 'none' }}>{set('a')}</div>
      <div style={{ display: 'flex', flex: 'none' }} aria-hidden="true">{set('b')}</div>
    </div>
  );
}

const ROW_A = [
  ['Wooden Street', 'woodenstreet.png'], ['Lifelong', 'lifelong-k.png'], ['Jewelsmars', 'jewelsmars.png'], ['Silverfied', 'silverfied.png'],
  ['Spirit Animal', 'spiritanimal.png'], ['Awenest', 'awenest.avif'], ['Truth & Hair', 'truthandhair.png'], ['Deep Impact', 'deepimpact.png'],
  ['Superbottoms', 'superbottoms.avif'], ['Kisah', 'kisah.avif'], ['Yoho', 'yoho.png'],
];
const ROW_B = [
  ['Vaaree', 'vaaree-k.png'], ['Supersox', 'supersox-k.png'], ['Nourish You', 'nourishyou.png'], ['Evara', 'evara.svg'],
  ['Mackly', 'mackly.avif'], ['Vedansh', 'vedansh-k.png'], ['Chowkhat', 'chowkhat.avif'], ['Jaipuri Crown', 'jaipuricrown.png'],
  ['Ghani Putri', 'ghaniputri.png'], ['Gataca', 'gataca.png'], ['Loving Crafts', 'lovingcrafts.avif'],
];

const navLink = { textDecoration: 'none', color: 'var(--neuroid-ink)', padding: '8px 14px', letterSpacing: '-0.01em' };

export default function PortfolioPage() {
  const rootRef = useRef(null);
  const registerVideo = useVideoVisibility();
  useReveal(rootRef);

  const [w, setW] = useState(1280);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const desktopNav = w >= 920;
  const mobileMenuOpen = mobileMenu && !desktopNav;

  const items = buildItems();
  const total = items.length;
  const resultCount = total + ' creatives';

  return (
    <div ref={rootRef} style={{ fontFamily: 'var(--font-sans)', background: '#F4F1EA', color: 'var(--neuroid-ink)', overflowX: 'hidden' }}>

      {/* ============ NAV ============ */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(244,241,234,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '14px clamp(18px,4vw,56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', flex: 'none', textDecoration: 'none' }}>
            <img src="/assets/brand/neuroid-logo-black.svg" alt="Neuroid" style={{ height: '40px', width: 'auto', display: 'block' }} />
          </a>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
            <div className="nrd-nav-desktop" style={{ alignItems: 'center', gap: '6px' }}>
              <a href="/" style={navLink}>Home</a>
              <a href="#work" style={{ ...navLink, borderBottom: '2px solid var(--neuroid-ink)' }}>Work</a>
              <a href="/#services" style={navLink}>Services</a>
              <a href="/#about" style={navLink}>About</a>
              <a href="/lets-talk" className="nrd-btnlink" style={{ textDecoration: 'none', marginLeft: '4px' }}>
                <Button variant="primary" block size="sm">Book a Growth Audit</Button>
              </a>
            </div>

            <button className="nrd-nav-mobile" onClick={() => setMobileMenu((m) => !m)} aria-label="Menu" aria-expanded={mobileMenu} style={{ background: 'none', border: '1.5px solid var(--neuroid-ink)', width: '44px', height: '40px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', padding: 0 }}>
              <span style={{ width: '18px', height: '2px', background: 'var(--neuroid-ink)', display: 'block' }} />
              <span style={{ width: '18px', height: '2px', background: 'var(--neuroid-ink)', display: 'block' }} />
              <span style={{ width: '18px', height: '2px', background: 'var(--neuroid-ink)', display: 'block' }} />
            </button>
          </nav>
        </div>

        {mobileMenu && (
          <div className="nrd-nav-mobile-panel" style={{ borderTop: '1.5px solid var(--neuroid-ink)', background: 'var(--neuroid-paper)', padding: '8px clamp(18px,4vw,56px) 18px' }}>
            <a href="/" onClick={() => setMobileMenu(false)} style={{ display: 'block', textDecoration: 'none', color: 'var(--neuroid-ink)', padding: '12px 0', fontWeight: 600, borderBottom: '1px solid rgba(12,12,12,0.1)' }}>Home</a>
            <a href="#work" onClick={() => setMobileMenu(false)} style={{ display: 'block', textDecoration: 'none', color: 'var(--neuroid-ink)', padding: '12px 0', fontWeight: 600, borderBottom: '1px solid rgba(12,12,12,0.1)' }}>Work</a>
            <a href="/#services" onClick={() => setMobileMenu(false)} style={{ display: 'block', textDecoration: 'none', color: 'var(--neuroid-ink)', padding: '12px 0', fontWeight: 600, borderBottom: '1px solid rgba(12,12,12,0.1)' }}>Services</a>
            <a href="/#about" onClick={() => setMobileMenu(false)} style={{ display: 'block', textDecoration: 'none', color: 'var(--neuroid-ink)', padding: '12px 0', fontWeight: 600, borderBottom: '1px solid rgba(12,12,12,0.1)' }}>About</a>
            <div style={{ paddingTop: '14px' }}>
              <a href="/lets-talk" className="nrd-btnlink" style={{ textDecoration: 'none' }}>
                <Button variant="primary" block full size="md">Book a Growth Audit</Button>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ============ HERO ============ */}
      <section id="top" style={{ position: 'relative', background: 'radial-gradient(circle at center, rgba(12,12,12,0.07) 1.3px, transparent 1.9px) 0 0 / 22px 22px, #F4F1EA', padding: 'clamp(48px,7vw,96px) clamp(18px,4vw,56px) clamp(40px,5vw,64px)', borderBottom: '1.5px solid var(--neuroid-ink)', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div data-reveal style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '26px', color: 'var(--neuroid-ink)' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--neuroid-red)', display: 'inline-block', flex: 'none' }} />
            <span>Portfolio - Selected creative</span>
          </div>
          <h1 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.98, fontSize: 'clamp(2.7rem,7.2vw,6rem)', margin: 0, maxWidth: '16ch', textWrap: 'balance' }}>A wall of work that actually <span className="nrd-highlight" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}>performed</span><span style={{ display: 'inline-block', width: '0.15em', height: '0.15em', background: 'var(--neuroid-red)', verticalAlign: 'baseline', marginLeft: '0.04em' }} /></h1>
          <p data-reveal style={{ fontSize: 'clamp(1.05rem,1.6vw,1.32rem)', lineHeight: 1.5, maxWidth: '600px', margin: '30px 0 0', color: 'var(--neuroid-grey)' }}>Hundreds of scroll-stopping creatives - performance video, UGC, social and ad films - built for D2C brands and shipped at a volume most studios can&rsquo;t touch. This is a slice.</p>
        </div>
      </section>

      {/* ============ STAT STRIP ============ */}
      <section style={{ borderBottom: '1.5px solid var(--neuroid-ink)', background: 'var(--neuroid-ink)', color: 'var(--neuroid-paper)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(50%,180px),1fr))' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: 'clamp(22px,3vw,34px) clamp(18px,2.4vw,32px)', borderRight: '1px solid rgba(255,255,255,0.16)', borderBottom: '1px solid rgba(255,255,255,0.16)' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, fontSize: 'clamp(2rem,4vw,3.1rem)', color: 'var(--neuroid-yellow)' }}>{s[0]}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--neuroid-grey-dark)', marginTop: '10px' }}>{s[1]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section id="work" style={{ padding: 'clamp(44px,6vw,80px) clamp(18px,4vw,56px) clamp(56px,8vw,104px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div data-reveal style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px 32px', marginBottom: 'clamp(26px,3.4vw,40px)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--neuroid-red)', marginBottom: '16px' }}>
                <span>/</span><span>The creative wall</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.02, fontSize: 'clamp(1.7rem,3.4vw,2.8rem)', margin: 0, maxWidth: '18ch' }}>Every tile shipped, tested &amp; <span className="nrd-highlight">scaled</span><span style={{ display: 'inline-block', width: '0.16em', height: '0.16em', background: 'var(--neuroid-red)', verticalAlign: 'baseline', marginLeft: '0.05em' }} /></h2>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--neuroid-grey)', paddingBottom: '6px' }}>{resultCount}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(clamp(150px,15.5vw,210px),1fr))', gap: 'clamp(12px,1.4vw,18px)' }}>
            {items.map((it, i) => (
              <div
                key={it.cat + '-' + i + '-' + it.src}
                style={{ position: 'relative', aspectRatio: '9 / 16', overflow: 'hidden', border: '1.5px solid ' + INK, background: INK, cursor: 'pointer', transition: 'transform .22s var(--ease-snap), box-shadow .22s var(--ease-snap)', boxShadow: '0 0 0 0 ' + YEL }}
                onClick={() => setLightbox(it)}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.boxShadow = '7px 7px 0 0 ' + YEL; const ov = e.currentTarget.querySelector('[data-ov]'); if (ov) ov.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 0 0 ' + YEL; const ov = e.currentTarget.querySelector('[data-ov]'); if (ov) ov.style.opacity = '0'; }}
              >
                {it.type === 'video' ? (
                  <video
                    src={it.src}
                    loop
                    playsInline
                    preload="none"
                    ref={registerVideo}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', background: INK }}
                  />
                ) : (
                  <img
                    src={it.src}
                    loading="lazy"
                    alt={it.brand}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', background: 'rgba(12,12,12,0.05)' }}
                  />
                )}
                <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 3, fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: INK, background: it.type === 'video' ? YEL : '#fff', border: '1px solid ' + INK, padding: '3px 6px', lineHeight: 1, pointerEvents: 'none' }}>{it.type === 'video' ? 'Video' : 'Still'}</div>
                <div data-ov="" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '13px', background: 'linear-gradient(to top, rgba(12,12,12,0.72) 0%, rgba(12,12,12,0.0) 52%)', opacity: 0, transition: 'opacity .22s ease', zIndex: 2, pointerEvents: 'none' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', letterSpacing: '-0.01em', color: '#fff' }}>View<span style={{ fontSize: '15px', lineHeight: 1 }}>{'↗'}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BRAND WALL ============ */}
      <section style={{ padding: 'clamp(48px,7vw,88px) 0', borderBottom: '1.5px solid var(--neuroid-ink)', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(18px,4vw,56px)' }}>
          <div data-reveal style={{ display: 'flex', alignItems: 'center', gap: '9px', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--neuroid-red)', marginBottom: '18px' }}>
            <span>/</span><span>Made for</span>
          </div>
          <h2 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.04, fontSize: 'clamp(1.5rem,3vw,2.4rem)', margin: '0 0 clamp(32px,4.5vw,52px)', maxWidth: '22ch' }}>The brands behind the work - <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}>100+</span> and counting.</h2>
        </div>
        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 clamp(18px,4vw,56px)', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)', maskImage: 'linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)' }}>
          <div style={{ overflow: 'hidden' }}><LogoRow brands={ROW_A} reverse={false} dur="50s" /></div>
          <div style={{ overflow: 'hidden' }}><LogoRow brands={ROW_B} reverse={true} dur="62s" /></div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section id="contact" style={{ position: 'relative', background: 'var(--neuroid-yellow)', padding: 'clamp(64px,10vw,140px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at center, rgba(12,12,12,0.08) 1.4px, transparent 2px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div data-reveal style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.98, fontSize: 'clamp(2.4rem,6.4vw,5.4rem)', margin: 0, textWrap: 'balance' }}>Want work like <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}>this</span>?<span style={{ display: 'inline-block', width: '0.15em', height: '0.15em', background: 'var(--neuroid-red)', verticalAlign: 'baseline', marginLeft: '0.04em' }} /></h2>
          <p style={{ fontSize: 'clamp(1.05rem,1.7vw,1.35rem)', lineHeight: 1.5, maxWidth: '660px', margin: '26px auto 0' }}>A creative engine that ships volume and actually performs - plugged into the media that scales it.</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '38px' }}>
            <a href="/lets-talk" className="nrd-btnlink" style={{ textDecoration: 'none' }}>
              <Button variant="inverse" block size="lg">Book a Growth Audit</Button>
            </a>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '30px' }}>New Delhi, India · hello@neuroidmedia.com</div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ background: 'var(--neuroid-ink)', color: 'var(--neuroid-paper)', padding: 'clamp(56px,7vw,88px) clamp(18px,4vw,56px) 40px' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 320px', minWidth: '260px' }}>
              <img src="/assets/brand/neuroid-logo.svg" alt="Neuroid" style={{ height: '30px', marginBottom: '20px' }} />
              <p style={{ fontSize: '1.05rem', lineHeight: 1.5, maxWidth: '340px', margin: 0, color: 'var(--neuroid-grey-dark)' }}>An integrated growth &amp; creative studio for <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#fff' }}>D2C brands</span>.</p>
              <div className="nrd-pixels" style={{ marginTop: '24px' }}><i /><i /><i /></div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--neuroid-grey-dark)', marginBottom: '16px' }}>Explore</div>
                <a href="/" style={{ display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' }}>Home</a>
                <a href="#work" style={{ display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' }}>Work</a>
                <a href="/#services" style={{ display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' }}>Services</a>
                <a href="/#about" style={{ display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' }}>About</a>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--neuroid-grey-dark)', marginBottom: '16px' }}>Connect</div>
                <a href="https://instagram.com" style={{ display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' }}>Instagram</a>
                <a href="https://linkedin.com" style={{ display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' }}>LinkedIn</a>
                <a href="mailto:hello@neuroidmedia.com" style={{ display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' }}>Email</a>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '56px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.16)', display: 'flex', flexWrap: 'wrap', gap: '12px 24px', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11.5px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--neuroid-grey-dark)' }}>
            <span>New Delhi, India</span>
            <span>www.neuroidmedia.com</span>
          </div>
        </div>
      </footer>

      {/* ============ LIGHTBOX ============ */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(8,8,8,0.86)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(28px,5vw,72px) clamp(18px,4vw,56px)' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', border: '1.5px solid ' + INK, boxShadow: '0 18px 50px rgba(0,0,0,0.5)', lineHeight: 0, animation: 'nrd-pop .22s var(--ease-snap)' }}
          >
            {lightbox.type === 'video' ? (
              <video
                src={lightbox.src.replace('w_480', 'w_900')}
                loop
                controls
                autoPlay
                playsInline
                ref={(el) => { if (!el) return; el.muted = false; el.volume = 1; el.play().catch(() => { el.muted = true; el.play().catch(() => {}); }); }}
                style={{ display: 'block', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: 'min(86vh,820px)', aspectRatio: '9 / 16', objectFit: 'cover', background: INK }}
              />
            ) : (
              <img
                src={lightbox.src}
                alt={lightbox.brand}
                style={{ display: 'block', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: 'min(86vh,820px)', objectFit: 'contain', background: INK }}
              />
            )}
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(null)}
              style={{ position: 'absolute', top: '-13px', right: '-13px', width: '42px', height: '42px', cursor: 'pointer', background: YEL, border: '1.5px solid ' + INK, boxShadow: '3px 3px 0 0 ' + INK, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, zIndex: 2 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke={INK} strokeWidth="2" strokeLinecap="square" />
              </svg>
            </button>
            <div style={{ position: 'absolute', left: 0, bottom: '-44px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: INK, background: lightbox.type === 'video' ? YEL : '#fff', border: '1px solid ' + INK, padding: '4px 8px', lineHeight: 1 }}>{lightbox.type === 'video' ? 'Video creative' : 'Still creative'}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
