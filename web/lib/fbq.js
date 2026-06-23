// Fire a Meta Pixel standard event from a client component. The base pixel
// (window.fbq) is loaded site-wide in app/layout.js via next/script
// (afterInteractive), so on a page mount fbq may not exist yet — poll briefly
// until it's ready, then track. fbq also self-queues, but this guards the race
// where window.fbq is still undefined when a page effect runs.
export function fbqTrack(event, params) {
  if (typeof window === 'undefined') return;
  const fire = () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', event, params);
      return true;
    }
    return false;
  };
  if (fire()) return;
  let tries = 0;
  const id = setInterval(() => {
    if (fire() || ++tries > 40) clearInterval(id);
  }, 150);
}
