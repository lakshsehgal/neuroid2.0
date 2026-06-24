'use client';
import React, { useRef } from 'react';
import { useReveal } from '@/lib/useReveal';
import Button from '@/components/Button';
import Nav from '@/components/home/Nav';
import Footer from '@/components/home/Footer';
import HeroGallery from '@/components/home/HeroGallery';
import { Ribbon, LogoRow } from '@/components/home/marquees';
import { LoopDesktop, LoopVertical } from '@/components/home/Loop';
import Services from '@/components/home/Services';
import WorkGrid from '@/components/home/WorkGrid';
import WhyNeuroid from '@/components/home/WhyNeuroid';
import Faq from '@/components/home/Faq';

const redSquare = { display: 'inline-block', width: '0.16em', height: '0.16em', background: 'var(--neuroid-red)', verticalAlign: 'baseline', marginLeft: '0.05em' };
const eyebrowSq = { width: '8px', height: '8px', background: 'var(--neuroid-red)', display: 'inline-block', flex: 'none' };
const eyebrow = { display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '18px' };

const PARTNERS = [
  { src: '/assets/partners/meta-partner.png', alt: 'Meta Business Partner', h: 34 },
  { src: '/assets/partners/google-partner.png', alt: 'Google Partner', h: 34 },
  { src: '/assets/partners/shopify-partner.png', alt: 'Shopify Partner', h: 19 },
  { src: '/assets/partners/gokwik.png', alt: 'GoKwik', h: 21 },
];

const STEPS = [
  ['01', 'Deep dive', 'Audit the account, the funnel, the creative - find the leak.'],
  ['02', 'Hypothesise', 'Form sharp bets on what will move the system.'],
  ['03', 'Ship', 'Put it live fast - creative and media together.'],
  ['04', 'Learn & iterate', 'Read the signal, sharpen, compound the wins.'],
];

const QUOTES = [
  ['Their ownership mindset and solution-focused approach make them a trusted extension of our team.', 'Pulkit Tiwari', 'CMO, Wooden Street', '/assets/logos/woodenstreet.png', 22],
  ['Creative and media finally moved as one system - they found the leak we’d missed for a year.', 'Founder', 'Inbath', '/assets/logos/inbath.avif', 30],
  ['Brand visibility and engagement scaled fast. Neuroid tops our charts when it comes to recommendations.', 'Ishan Kukadia', 'Co-founder, Sylvi', '/assets/logos/sylvi.webp', 26],
  ['An impactful performance team that worked hard to lift our numbers.', 'Varshikha Jyoti', 'Founder, Shyr Beauty', '/assets/logos/shyr.avif', 24],
];

const VALUES = [
  { hero: true, img: '/assets/values/strategically-experimental.min.jpg', num: '01', pre: 'Strategically ', em: 'experimental', post: '', body: "We test like scientists, not gamblers. Every bet has a hypothesis behind it - and the data decides what's next." },
  { img: '/assets/values/action-over-perfect.min.jpg', num: '02', pre: '', em: 'Action', post: ' over perfect', body: "We'd rather ship, learn and sharpen than wait for the perfect plan. Speed is a growth lever, and we treat it like one." },
  { img: '/assets/values/energetic-optimistic.min.jpg', num: '03', pre: 'Energetic & ', em: 'optimistic', post: '', body: 'We bring real energy to your brand. We actually care whether you win - and it shows in the room.' },
  { img: '/assets/values/committed.min.jpg', num: '04', pre: '', em: 'Committed', post: '', body: 'We treat your P&L like it’s ours. (Ask our clients about the 3am problem-solving.)' },
];

const ROW_A = [['Wooden Street', 'woodenstreet.png'], ['Lifelong', 'lifelong-k.png'], ['Jewelsmars', 'jewelsmars.png'], ['Silverfied', 'silverfied.png'], ['Spirit Animal', 'spiritanimal.png'], ['Awenest', 'awenest.avif'], ['Truth & Hair', 'truthandhair.png'], ['Deep Impact', 'deepimpact.png'], ['Sylvi', 'sylvi.webp']];
const ROW_B = [['Superbottoms', 'superbottoms.avif'], ['Kisah', 'kisah.avif'], ['Yoho', 'yoho.png'], ['Jaipuri Crown', 'jaipuricrown.png'], ['Ghani Putri', 'ghaniputri.png'], ['Gataca', 'gataca.png'], ['Loving Crafts', 'lovingcrafts.avif'], ['Haus & Kinder', 'hausandkinder.avif'], ['Shyr Beauty', 'shyr.avif']];
const ROW_C = [['Vaaree', 'vaaree-k.png'], ['Supersox', 'supersox-k.png'], ['Nourish You', 'nourishyou.png'], ['Evara', 'evara.svg'], ['Mackly', 'mackly.avif'], ['Vedansh', 'vedansh-k.png'], ['Chowkhat', 'chowkhat.avif']];

const INK_RIBBON = [['₹450Cr+', 'revenue influenced'], ['4.2x', 'net blended ROAS'], ['200+', 'creatives / month'], ['236%', 'brand recall'], ['94%', 'client retention']];
const YEL_RIBBON = [['200+', 'creatives / month'], ['94%', 'client retention'], ['₹450Cr+', 'revenue influenced'], ['236%', 'brand recall'], ['4.2x', 'net blended ROAS']];

export default function Home() {
  const rootRef = useRef(null);
  useReveal(rootRef, { stagger: true });

  return (
    <div ref={rootRef} style={{ fontFamily: 'var(--font-sans)', background: '#F4F1EA', color: 'var(--neuroid-ink)', overflowX: 'hidden' }}>
      <Nav />

      {/* HERO */}
      <section id="top" style={{ position: 'relative', minHeight: '94vh', background: 'radial-gradient(circle at center, rgba(12,12,12,0.07) 1.3px, transparent 1.9px) 0 0 / 22px 22px, #F4F1EA', color: 'var(--neuroid-ink)', display: 'flex', alignItems: 'center', padding: 'clamp(40px,5vw,72px) clamp(18px,4vw,56px)', overflow: 'hidden' }}>
        <div className="nrd-hero" style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          <div className="nrd-hero-copy">
            <div style={{ ...eyebrow, marginBottom: '26px', color: 'var(--neuroid-ink)' }}><span style={eyebrowSq} /><span>Integrated Growth &amp; Creative Studio</span></div>
            <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0, fontSize: 'clamp(2.6rem,5.6vw,4.8rem)', margin: 0, textWrap: 'balance', color: 'var(--neuroid-ink)' }}>Content that <span className="nrd-highlight">connects</span>. Performance that <span className="nrd-highlight">compounds</span><span style={redSquare} /></h1>
            <p style={{ fontSize: 'clamp(1.05rem,1.6vw,1.3rem)', lineHeight: 1.5, maxWidth: '560px', margin: '28px 0 0', color: 'var(--neuroid-grey)' }}>Scroll-stopping creatives and the performance marketing that scales it - built by one team, run on one loop, so your ROAS and your brand grow together.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 22px', marginTop: '38px' }}>
              <a href="/lets-talk" className="nrd-btnlink" style={{ textDecoration: 'none' }}><Button variant="primary" block size="lg">Book a Growth Audit</Button></a>
              <a href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--neuroid-ink)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '16px', letterSpacing: '-0.01em', borderBottom: '2px solid var(--neuroid-ink)', paddingBottom: '3px' }}>See the work <span aria-hidden="true">→</span></a>
            </div>
            <div className="nrd-hero-partners" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 16px', marginTop: '42px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--neuroid-grey)', fontWeight: 700 }}>Trusted partner</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: '10px' }}>
                {PARTNERS.map((p, i) => (
                  <div key={i} style={{ height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', background: '#fff', border: '1.5px solid var(--neuroid-ink)' }}>
                    <img src={p.src} alt={p.alt} style={{ height: p.h + 'px', width: 'auto', display: 'block' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <HeroGallery />
        </div>
      </section>

      {/* PROOF RIBBONS */}
      <section className="nrd-rib-sec" style={{ position: 'relative', background: 'radial-gradient(circle at center, rgba(12,12,12,0.07) 1.3px, transparent 1.9px) 0 0 / 22px 22px, #F4F1EA', overflow: 'hidden', height: 'clamp(150px,16vw,196px)', margin: '-1px 0' }}>
        <div className="nrd-rib-y" style={{ position: 'absolute', left: '-6%', top: '50%', width: '112%', transform: 'translateY(-50%) rotate(3.4deg)', background: 'var(--neuroid-yellow)', borderTop: '1.5px solid var(--neuroid-ink)', borderBottom: '1.5px solid var(--neuroid-ink)', overflow: 'hidden', zIndex: 1, boxShadow: '0 8px 18px rgba(0,0,0,0.10)' }}>
          <Ribbon items={YEL_RIBBON} numColor="var(--neuroid-ink)" labelColor="var(--neuroid-ink)" labelOpacity={0.62} reverse />
        </div>
        <div className="nrd-rib-i" style={{ position: 'absolute', left: '-6%', top: '50%', width: '112%', transform: 'translateY(-50%) rotate(-3.4deg)', background: 'var(--neuroid-ink)', borderTop: '1.5px solid var(--neuroid-ink)', borderBottom: '1.5px solid var(--neuroid-ink)', overflow: 'hidden', zIndex: 2, boxShadow: '0 12px 26px rgba(0,0,0,0.22)' }}>
          <Ribbon items={INK_RIBBON} numColor="var(--neuroid-yellow)" labelColor="#fff" labelOpacity={0.7} />
        </div>
      </section>

      {/* LOGO WALL */}
      <section id="brands" style={{ padding: 'clamp(56px,8vw,104px) 0', borderBottom: '1.5px solid var(--neuroid-ink)', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(18px,4vw,56px)' }}>
          <div data-reveal style={{ display: 'flex', alignItems: 'center', gap: '9px', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--neuroid-red)', marginBottom: '22px' }}><span>/</span><span>The Portfolio</span></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', margin: '0 0 clamp(40px,6vw,64px)' }}>
            <h2 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.04, fontSize: 'clamp(1.9rem,4vw,3.2rem)', margin: 0, maxWidth: '680px' }}>Growth partners to some of the <span className="nrd-highlight" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}>top</span> D2C brands in India.</h2>
            <p data-reveal style={{ fontSize: '1rem', lineHeight: 1.5, color: 'var(--neuroid-grey)', maxWidth: '360px', margin: '0 0 6px' }}>A glimpse of the <strong style={{ color: 'var(--neuroid-ink)', fontWeight: 600 }}>100+ brands</strong> we&rsquo;ve scaled - driving <strong style={{ color: 'var(--neuroid-ink)', fontWeight: 600 }}>₹400Cr+</strong> in attributed client revenue.</p>
          </div>
        </div>
        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '4px clamp(18px,4vw,56px) 0', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)', maskImage: 'linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)' }}>
          <div style={{ overflow: 'hidden' }}><LogoRow brands={ROW_A} reverse={false} dur="44s" /></div>
          <div style={{ overflow: 'hidden' }}><LogoRow brands={ROW_B} reverse dur="57s" /></div>
          <div style={{ overflow: 'hidden' }}><LogoRow brands={ROW_C} reverse={false} dur="50s" /></div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section id="about" style={{ padding: 'clamp(56px,8vw,112px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'clamp(28px,5vw,72px)' }}>
          <div data-reveal style={{ flex: '1 1 320px', minWidth: '280px' }}>
            <div style={eyebrow}><span style={eyebrowSq} /><span>Who we are</span></div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.02, fontSize: 'clamp(2rem,4.3vw,3.5rem)', margin: 0, textWrap: 'balance' }}>An extension of your team. Not another vendor<span style={redSquare} /></h2>
          </div>
          <div data-reveal style={{ flex: '1 1 380px', minWidth: '280px', display: 'flex', alignItems: 'flex-end' }}>
            <p style={{ fontSize: 'clamp(1.05rem,1.5vw,1.3rem)', lineHeight: 1.6, margin: 0 }}>We're a senior team of growth marketers, creative strategists, filmmakers and lifecycle operators. We don't hand you a deck and disappear - we sit inside your business and treat your account like an <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>operating problem</span>: what's the system, where's the leak, what compounds.</p>
          </div>
        </div>
      </section>

      {/* THE LOOP */}
      <section id="loop" style={{ position: 'relative', background: 'var(--neuroid-ink)', color: 'var(--neuroid-paper)', padding: 'clamp(64px,9vw,128px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1.6px)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: '1180px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,72px)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--neuroid-yellow)', marginBottom: '22px' }}><span style={eyebrowSq} /><span>The Neuroid Loop</span></div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.04, fontSize: 'clamp(1.9rem,4.2vw,3.4rem)', margin: '0 auto', maxWidth: '880px', color: '#fff', textWrap: 'balance' }}>Most agencies build a wall between creative and performance. We built a <span className="nrd-highlight">loop</span><span style={redSquare} /></h2>
          </div>
          <div className="nrd-loop-desktop"><LoopDesktop /></div>
          <div className="nrd-loop-mobile"><LoopVertical /></div>
        </div>
      </section>

      {/* ONE ENGINE, TWO WAYS IN */}
      <section style={{ padding: 'clamp(56px,8vw,112px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div data-reveal style={eyebrow}><span style={eyebrowSq} /><span>Two ways in</span></div>
          <h2 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.04, fontSize: 'clamp(1.8rem,3.6vw,3rem)', margin: '0 0 16px', maxWidth: '820px' }}>However you come to us, you plug into the <span className="nrd-highlight">same loop</span><span style={redSquare} /></h2>
          <p data-reveal style={{ fontSize: '1.05rem', lineHeight: 1.55, margin: '0 0 44px', maxWidth: '640px', opacity: 0.86 }}>Most brands arrive with one of two problems. Both lead to the same engine - data sharpens the creative, creative feeds the data. Start wherever you're stuck.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(420px,100%),1fr))', gap: '24px' }}>
            <TwoWayCard variant="growth" />
            <TwoWayCard variant="creative" />
          </div>
        </div>
      </section>

      <Services />

      {/* THE WORK */}
      <section id="work" style={{ padding: 'clamp(56px,8vw,112px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div data-reveal style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '44px' }}>
            <div>
              <div style={eyebrow}><span style={eyebrowSq} /><span>Selected Work</span></div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.02, fontSize: 'clamp(1.9rem,4vw,3.3rem)', margin: 0 }}>Brands that <span className="nrd-highlight">scaled</span> with us<span style={redSquare} /></h2>
            </div>
          </div>
          <WorkGrid />
          <div data-reveal style={{ marginTop: '36px' }}>
            <a href="/portfolio" className="nrd-btnlink" style={{ textDecoration: 'none' }}><Button variant="outline" size="md">See all work →</Button></a>
          </div>
        </div>
      </section>

      <WhyNeuroid />

      {/* HOW WE WORK */}
      <section style={{ background: 'var(--neuroid-ink)', color: 'var(--neuroid-paper)', padding: 'clamp(56px,8vw,112px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div data-reveal style={{ ...eyebrow, color: 'var(--neuroid-yellow)' }}><span style={eyebrowSq} /><span>How we work</span></div>
          <h2 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.04, fontSize: 'clamp(1.8rem,3.6vw,3rem)', margin: '0 0 48px', maxWidth: '820px', color: '#fff' }}>From strategy to execution - with the <span className="nrd-highlight">least resistance</span><span style={redSquare} /></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(220px,100%),1fr))', gap: '1.5px', background: 'rgba(255,255,255,0.16)', border: '1.5px solid rgba(255,255,255,0.16)' }}>
            {STEPS.map((s, i) => (
              <div key={i} data-reveal style={{ background: 'var(--neuroid-ink)', padding: 'clamp(24px,3vw,34px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 700, color: 'var(--neuroid-yellow)', letterSpacing: '-0.02em', lineHeight: 1 }}>{s[0]}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.1rem,1.7vw,1.4rem)', letterSpacing: '-0.02em', color: '#fff', margin: '18px 0 10px' }}>{s[1]}</div>
                <div style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--neuroid-grey-dark)' }}>{s[2]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section id="values" style={{ position: 'relative', background: '#F7F3EA', padding: 'clamp(72px,10vw,140px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at center, rgba(12,12,12,0.05) 1px, transparent 1.6px)', backgroundSize: '26px 26px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ maxWidth: '760px', margin: '0 0 clamp(48px,6.5vw,84px)' }}>
            <div data-reveal style={{ ...eyebrow, marginBottom: '22px', color: 'var(--neuroid-ink)' }}><span style={eyebrowSq} /><span>What we believe</span></div>
            <h2 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.0, fontSize: 'clamp(2.3rem,5vw,4rem)', margin: 0, color: 'var(--neuroid-ink)' }}>How we show <span className="nrd-highlight">up</span>.</h2>
            <p data-reveal style={{ fontSize: 'clamp(1.1rem,1.7vw,1.4rem)', lineHeight: 1.5, margin: '24px 0 0', color: 'var(--neuroid-grey-dark)', maxWidth: '560px' }}>Driven by data. Run by <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--neuroid-ink)' }}>humans</span>. That's not a contradiction - it's the whole point.</p>
          </div>
          <div className="nrd-vgrid">
            {VALUES.map((v, i) => (
              <a key={i} href="/lets-talk" className={'nrd-vcard' + (v.hero ? ' nrd-vcard--hero' : '')}>
                <img className="nrd-vcard__img" src={v.img} alt="" loading="lazy" />
                <span className="nrd-vcard__scrim" aria-hidden="true" />
                <div className="nrd-vcard__panel">
                  <div className="nrd-vcard__num">{v.num}</div>
                  <h3 className="nrd-vcard__h">
                    <span className="nrd-vcard__title">{v.pre}<em>{v.em}</em>{v.post}</span>
                    <span className="nrd-vcard__arrow" aria-hidden="true">→</span>
                  </h3>
                  <div className="nrd-vcard__body"><p>{v.body}</p></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: 'clamp(56px,8vw,112px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div data-reveal style={eyebrow}><span style={eyebrowSq} /><span>Testimonials</span></div>
          <h2 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.04, fontSize: 'clamp(1.8rem,3.6vw,3rem)', margin: '0 0 44px', maxWidth: '760px' }}>Trusted by partners that <span className="nrd-highlight">scaled</span> with us<span style={redSquare} /></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: '24px' }}>
            {QUOTES.map((q, i) => <QuoteCard key={i} q={q} />)}
          </div>
        </div>
      </section>

      <Faq />

      {/* FINAL CTA */}
      <section id="contact" style={{ position: 'relative', background: 'var(--neuroid-yellow)', padding: 'clamp(72px,11vw,160px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at center, rgba(12,12,12,0.08) 1.4px, transparent 2px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div data-reveal style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.98, fontSize: 'clamp(2.6rem,7vw,6rem)', margin: 0, textWrap: 'balance' }}>Let's create something <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}>great</span><span style={redSquare} /></h2>
          <p style={{ fontSize: 'clamp(1.05rem,1.7vw,1.35rem)', lineHeight: 1.5, maxWidth: '680px', margin: '28px auto 0' }}>Whether you've hit a ceiling or you need a creative engine that delivers - let's find your edge.</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <a href="/lets-talk" className="nrd-btnlink" style={{ textDecoration: 'none' }}><Button variant="inverse" block size="lg">Book a Growth Audit</Button></a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function TwoWayCard({ variant }) {
  const growth = variant === 'growth';
  const cardStyle = { background: growth ? 'var(--neuroid-paper)' : 'var(--neuroid-yellow)', border: '1.5px solid var(--neuroid-ink)', boxShadow: '6px 6px 0 0 var(--neuroid-ink)', padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column' };
  const muted = growth ? 'var(--neuroid-grey)' : 'var(--neuroid-ink)';
  const bullet = { width: '9px', height: '9px', background: 'var(--neuroid-ink)', flex: 'none', marginTop: '6px' };
  const row = (text) => (
    <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start' }}><span style={bullet} /><span style={{ fontSize: '1rem', lineHeight: 1.45 }}>{text}</span></div>
  );
  return (
    <div data-reveal style={cardStyle}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, opacity: growth ? 1 : 0.6 }}>{growth ? 'A - Start with growth' : 'B - Start with creative'}</div>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.03em', fontSize: 'clamp(1.5rem,2.6vw,2.1rem)', margin: '14px 0 14px' }}>{growth ? '"We\'ve hit a ceiling."' : '"We need creative that delivers."'}</h3>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.5, margin: '0 0 18px', opacity: growth ? 0.86 : 1 }}>{growth ? "You're pushing spend, but revenue won't follow." : "Your media's solid - the creative can't keep up."}</p>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, opacity: growth ? 1 : 0.55, marginBottom: '12px' }}>This is you if</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
          {growth ? (<>{row('ROAS drops every time you scale budget')}{row("Your team can't think past the ad account")}</>)
            : (<>{row('You need volume: quality ads, every week, on time')}{row("Creative that's actually built to perform")}</>)}
        </div>
      </div>
      <div style={{ borderTop: growth ? '1.5px solid rgba(12,12,12,0.16)' : '1.5px solid rgba(12,12,12,0.22)', paddingTop: '14px', margin: '22px 0 22px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, opacity: growth ? 1 : 0.55, marginBottom: '5px' }}>You leave with</div>
        <div style={{ fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.3 }}>{growth ? 'A profit-first growth system.' : 'A reliable creative engine.'}</div>
      </div>
      <a href="/lets-talk" className="nrd-btnlink" style={{ textDecoration: 'none', alignSelf: 'flex-start' }}><Button variant="inverse" size="md">{growth ? 'Come in for growth →' : 'Come in for creative →'}</Button></a>
    </div>
  );
}

function QuoteCard({ q }) {
  return (
    <div data-reveal style={{ border: '1.5px solid var(--neuroid-ink)', background: 'var(--neuroid-paper)', boxShadow: '5px 5px 0 0 var(--neuroid-ink)', padding: 'clamp(26px,3vw,34px)', display: 'flex', flexDirection: 'column', transition: 'transform .22s var(--ease-snap), box-shadow .22s var(--ease-snap)' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.boxShadow = '9px 9px 0 0 var(--neuroid-yellow)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '5px 5px 0 0 var(--neuroid-ink)'; }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '40px', lineHeight: 0.6, color: 'var(--neuroid-red)', height: '24px' }}>{'“'}</div>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.1rem,1.5vw,1.3rem)', lineHeight: 1.45, margin: '0 0 28px', flex: 1, color: 'var(--neuroid-ink)' }}>{q[0]}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', borderTop: '1px solid rgba(12,12,12,0.12)', paddingTop: '18px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '14px' }}>{q[1]}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--neuroid-grey)', marginTop: '2px' }}>{q[2]}</div>
        </div>
        <img src={q[3]} alt={q[2]} loading="lazy" style={{ height: q[4] + 'px', width: 'auto', maxWidth: '120px', objectFit: 'contain', flex: 'none' }} />
      </div>
    </div>
  );
}
