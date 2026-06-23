'use client';
import React from 'react';
import Figure from '@/components/Figure';
import Button from '@/components/Button';
import CeilingBreak from '@/components/figures/ceiling-break';
import SignalMatch from '@/components/figures/signal-match';
import BuiltForRecall from '@/components/figures/built-for-recall';
import CompoundingLayer from '@/components/figures/compounding-layer';

const eyebrow = { display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '18px' };
const sq = { width: '8px', height: '8px', background: 'var(--neuroid-red)', display: 'inline-block', flex: 'none' };

export default function Services() {
  return (
    <section id="services" style={{ padding: 'clamp(56px,8vw,112px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div data-reveal style={eyebrow}><span style={sq} /><span>Services</span></div>
        <h2 data-reveal style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.04, fontSize: 'clamp(1.8rem,3.6vw,3rem)', margin: '0 0 44px', maxWidth: '760px' }}>Four disciplines. One <span className="nrd-highlight">operating system</span><span style={{ display: 'inline-block', width: '0.16em', height: '0.16em', background: 'var(--neuroid-red)', verticalAlign: 'baseline', marginLeft: '0.05em' }} /></h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(460px,100%),1fr))', gap: 'clamp(20px,2.6vw,34px)' }}>
          <Figure duration={6.5} title="Performance Marketing" body="Meta + Google, run as growth strategy."><CeilingBreak /></Figure>
          <Figure duration={7.4} title="Performance Creatives & UGC" body="200+ money-printing creatives a month."><SignalMatch /></Figure>
          <Figure duration={7.4} title="Socials, Campaigns & IPs" body="Content, campaigns, ad films and IPs that build recall."><BuiltForRecall /></Figure>
          <Figure duration={7.4} title="CRO & Retention" body="The layer that compounds your spend."><CompoundingLayer /></Figure>
        </div>

        <div data-reveal style={{ marginTop: 'clamp(28px,3.5vw,44px)' }}>
          <a href="/lets-talk" className="nrd-btnlink" style={{ textDecoration: 'none' }}>
            <Button variant="primary" block size="md">Explore all services →</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
