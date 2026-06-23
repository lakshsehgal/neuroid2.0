'use client';
// Scroll-reveal: finds [data-reveal] elements under `rootRef`, adds `.in`
// when they enter the viewport (once), with a safety timeout. Optional
// modulo-3 stagger mirrors the Home page's original reveal cadence.
import { useEffect } from 'react';

export function useReveal(rootRef, { stagger = false } = {}) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll('[data-reveal]'));
    const show = (el) => el.classList.add('in');
    if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
    if (stagger) {
      els.forEach((el, i) => {
        if (!el.hasAttribute('data-d1') && !el.hasAttribute('data-d2') && !el.hasAttribute('data-d3') && !el.hasAttribute('data-d4')) {
          el.style.transitionDelay = Math.min((i % 3) * 70, 180) + 'ms';
        }
      });
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    els.forEach((el) => io.observe(el));
    const safety = setTimeout(() => els.forEach(show), 2400);
    return () => { io.disconnect(); clearTimeout(safety); };
  }, [rootRef, stagger]);
}
