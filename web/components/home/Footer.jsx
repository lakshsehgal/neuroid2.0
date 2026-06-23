'use client';
import React from 'react';

const col = { fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--neuroid-grey-dark)', marginBottom: '16px' };
const flink = { display: 'block', textDecoration: 'none', color: '#fff', fontSize: '14px', padding: '6px 0' };

export default function Footer() {
  return (
    <footer style={{ background: 'var(--neuroid-ink)', color: 'var(--neuroid-paper)', padding: 'clamp(56px,7vw,88px) clamp(18px,4vw,56px) 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 320px', minWidth: '260px' }}>
            <img src="/assets/brand/neuroid-logo.svg" alt="Neuroid" style={{ height: '30px', marginBottom: '20px' }} />
            <p style={{ fontSize: '1.05rem', lineHeight: 1.5, maxWidth: '340px', margin: 0, color: 'var(--neuroid-grey-dark)' }}>An integrated growth &amp; creative studio for <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#fff' }}>D2C brands</span>.</p>
            <div className="nrd-pixels" style={{ marginTop: '24px' }}><i /><i /><i /></div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px' }}>
            <div>
              <div style={col}>Services</div>
              <a href="/#services" style={flink}>Performance Marketing</a>
              <a href="/#services" style={flink}>Performance Creatives</a>
              <a href="/#services" style={flink}>Socials &amp; IPs</a>
              <a href="/#services" style={flink}>CRO &amp; Retention</a>
            </div>
            <div>
              <div style={col}>Company</div>
              <a href="/portfolio" style={flink}>Work</a>
              <a href="/#about" style={flink}>About</a>
              <a href="/lets-talk" style={flink}>Contact</a>
            </div>
            <div>
              <div style={col}>Connect</div>
              <a href="https://instagram.com" style={flink}>Instagram</a>
              <a href="https://linkedin.com" style={flink}>LinkedIn</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '56px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.16)', display: 'flex', flexWrap: 'wrap', gap: '12px 24px', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11.5px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--neuroid-grey-dark)' }}>
          <span>New Delhi, India</span>
          <span>www.neuroidmedia.com</span>
        </div>
      </div>
    </footer>
  );
}
