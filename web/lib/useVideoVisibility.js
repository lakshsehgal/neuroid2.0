'use client';
// Transform-aware video visibility: plays only the clips whose live rect is
// on-screen, pauses the rest. Returns a ref-callback to register <video> els.
// Mirrors the handoff's _registerVideo (a single polling loop over a Set).
import { useEffect, useRef, useCallback } from 'react';

export function useVideoVisibility() {
  const vids = useRef(new Set());
  useEffect(() => {
    const set = vids.current;
    const tick = () => {
      const vh = window.innerHeight, vw = window.innerWidth;
      set.forEach((v) => {
        if (!v.isConnected) { set.delete(v); return; }
        const r = v.getBoundingClientRect();
        const onScreen = r.bottom > -80 && r.top < vh + 80 && r.right > 0 && r.left < vw;
        if (onScreen) { if (v.paused) v.play().catch(() => {}); }
        else if (!v.paused) v.pause();
      });
    };
    const id = setInterval(tick, 450);
    const t = setTimeout(tick, 60);
    return () => { clearInterval(id); clearTimeout(t); };
  }, []);
  return useCallback((el) => {
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    vids.current.add(el);
  }, []);
}
