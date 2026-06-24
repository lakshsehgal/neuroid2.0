'use client';
// Plays only clips whose live rect is on-screen, pauses the rest, and caps how
// many play at once so a wall of clips doesn't saturate bandwidth or jank the
// scroll (extras just show their poster). `max` defaults to unlimited; phones
// are clamped tighter. Returns a ref-callback to register <video> els.
import { useEffect, useRef, useCallback } from 'react';

export function useVideoVisibility(max = Infinity) {
  const vids = useRef(new Set());
  useEffect(() => {
    const set = vids.current;
    const tick = () => {
      const vh = window.innerHeight, vw = window.innerWidth;
      const cap = vw < 700 ? Math.min(max, 3) : max;
      let playing = 0;
      const waiting = [];
      set.forEach((v) => {
        if (!v.isConnected) { set.delete(v); return; }
        const r = v.getBoundingClientRect();
        const onScreen = r.bottom > -80 && r.top < vh + 80 && r.right > 0 && r.left < vw;
        if (!onScreen) { if (!v.paused) v.pause(); return; }
        if (!v.paused) playing++;
        else waiting.push(v);
      });
      for (const v of waiting) {
        if (playing >= cap) break;
        const p = v.play(); if (p && p.catch) p.catch(() => {});
        playing++;
      }
    };
    const id = setInterval(tick, 450);
    const t = setTimeout(tick, 60);
    return () => { clearInterval(id); clearTimeout(t); };
  }, [max]);
  return useCallback((el) => {
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    vids.current.add(el);
  }, []);
}
