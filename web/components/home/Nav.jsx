'use client';
import React, { useState } from 'react';
import Button from '@/components/Button';

const linkStyle = { textDecoration: 'none', color: 'var(--neuroid-ink)', padding: '8px 14px', letterSpacing: '-0.01em' };
const ddItem = { display: 'block', textDecoration: 'none', color: 'var(--neuroid-ink)', padding: '11px 14px', fontSize: '14px' };

function DropdownItem({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href="/#services" style={{ ...ddItem, background: hov ? 'var(--neuroid-yellow)' : 'transparent' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</a>
  );
}

export default function Nav({ desktop }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const mobileOpen = mobileMenu && !desktop;

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(244,241,234,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px clamp(18px,4vw,56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', flex: 'none', textDecoration: 'none' }}>
          <img src="/assets/brand/neuroid-logo-black.svg" alt="Neuroid" style={{ height: '40px', width: 'auto', display: 'block' }} />
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
          {desktop && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <a href="/portfolio" style={linkStyle}>Work</a>
              <div onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)} style={{ position: 'relative' }}>
                <a href="/#services" onClick={() => setServicesOpen(false)} style={{ ...linkStyle, display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>Services
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform .2s var(--ease-snap)', transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" /></svg>
                </a>
                {servicesOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, width: '280px', background: 'var(--neuroid-paper)', border: '1.5px solid var(--neuroid-ink)', boxShadow: '6px 6px 0 0 var(--neuroid-ink)', padding: '6px' }}>
                    <DropdownItem>Performance Marketing</DropdownItem>
                    <DropdownItem>Performance Creatives &amp; UGC</DropdownItem>
                    <DropdownItem>Socials, Campaigns &amp; IPs</DropdownItem>
                    <DropdownItem>CRO &amp; Retention</DropdownItem>
                  </div>
                )}
              </div>
              <a href="/#about" style={linkStyle}>About</a>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {desktop && (
              <a href="/lets-talk" className="nrd-btnlink" style={{ textDecoration: 'none' }}>
                <Button variant="primary" block size="sm">Book a Growth Audit</Button>
              </a>
            )}
            {!desktop && (
              <button onClick={() => setMobileMenu((v) => !v)} aria-label="Menu" style={{ background: 'none', border: '1.5px solid var(--neuroid-ink)', width: '42px', height: '38px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', padding: 0 }}>
                <span style={{ width: '18px', height: '2px', background: 'var(--neuroid-ink)', display: 'block' }} />
                <span style={{ width: '18px', height: '2px', background: 'var(--neuroid-ink)', display: 'block' }} />
                <span style={{ width: '18px', height: '2px', background: 'var(--neuroid-ink)', display: 'block' }} />
              </button>
            )}
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: '1.5px solid var(--neuroid-ink)', background: 'var(--neuroid-paper)', padding: '8px clamp(18px,4vw,56px) 18px' }}>
          <a href="/portfolio" onClick={() => setMobileMenu(false)} style={{ display: 'block', textDecoration: 'none', color: 'var(--neuroid-ink)', padding: '12px 0', fontWeight: 600, borderBottom: '1px solid rgba(12,12,12,0.1)' }}>Work</a>
          <a href="/#services" onClick={() => setMobileMenu(false)} style={{ display: 'block', textDecoration: 'none', color: 'var(--neuroid-ink)', padding: '12px 0', fontWeight: 600, borderBottom: '1px solid rgba(12,12,12,0.1)' }}>Services</a>
          <a href="/#about" onClick={() => setMobileMenu(false)} style={{ display: 'block', textDecoration: 'none', color: 'var(--neuroid-ink)', padding: '12px 0', fontWeight: 600, borderBottom: '1px solid rgba(12,12,12,0.1)' }}>About</a>
          <div style={{ paddingTop: '14px' }}>
            <a href="/lets-talk" onClick={() => setMobileMenu(false)} className="nrd-btnlink" style={{ display: 'block', textDecoration: 'none' }}>
              <Button variant="primary" block full size="md">Book a Growth Audit</Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
