'use client';

import { useRef, useEffect } from 'react';
import { useReveal } from '@/lib/useReveal';
import { fbqTrack } from '@/lib/fbq';

export default function BookingConfirmedPage() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  // Reaching the confirmation page means a call was booked.
  useEffect(() => {
    fbqTrack('Schedule');
    // Google Ads — Submit lead form conversion
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: 'AW-18308117157/MmzICJi_sc0cEKXl_plE' });
    }
  }, []);

  return (
    <div
      ref={rootRef}
      style={{
        fontFamily: 'var(--font-sans)',
        background: '#F4F1EA',
        color: 'var(--neuroid-ink)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* NAV */}
      <header
        style={{
          background: 'rgba(244,241,234,0.92)',
          borderBottom: '1.5px solid var(--neuroid-ink)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '14px clamp(18px,4vw,48px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 'none',
              textDecoration: 'none',
            }}
          >
            <img
              src="/assets/brand/neuroid-logo-black.svg"
              alt="Neuroid"
              style={{ height: '34px', width: 'auto', display: 'block' }}
            />
          </a>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              background: 'transparent',
              color: 'var(--neuroid-ink)',
              border: '1.5px solid var(--neuroid-ink)',
              padding: '10px 16px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              transition: 'background .15s var(--ease-snap),color .15s var(--ease-snap)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--neuroid-ink)';
              e.currentTarget.style.color = 'var(--neuroid-paper)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--neuroid-ink)';
            }}
          >
            Back to home
          </a>
        </div>
      </header>

      {/* SUCCESS */}
      <main
        style={{
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(40px,7vw,96px) clamp(18px,4vw,48px)',
        }}
      >
        <div style={{ maxWidth: '680px', width: '100%' }}>
          <div data-reveal style={{ marginBottom: 'clamp(28px,4vw,40px)' }}>
            <svg
              className="bc-check"
              width="76"
              height="76"
              viewBox="0 0 76 76"
              fill="none"
              style={{ display: 'block' }}
            >
              <rect
                x="1.5"
                y="1.5"
                width="73"
                height="73"
                fill="var(--neuroid-yellow)"
                stroke="var(--neuroid-ink)"
                strokeWidth="2"
              ></rect>
              <path
                d="M20 39.5 L33 52 L57 25"
                stroke="var(--neuroid-ink)"
                strokeWidth="5"
                strokeLinecap="square"
                strokeLinejoin="miter"
                fill="none"
                style={{
                  strokeDasharray: 80,
                  strokeDashoffset: 80,
                  animation: 'bc-draw .5s cubic-bezier(.65,0,.35,1) .45s forwards',
                }}
              ></path>
            </svg>
          </div>

          <div
            data-reveal
            data-d1
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '18px',
              color: 'var(--neuroid-grey-dark)',
            }}
          >
            <span
              style={{
                width: '9px',
                height: '9px',
                background: 'var(--neuroid-red)',
                display: 'inline-block',
              }}
            ></span>
            <span>You're booked</span>
          </div>

          <h1
            data-reveal
            data-d2
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: '1.0',
              fontSize: 'clamp(2.6rem,6.2vw,4.6rem)',
              margin: '0 0 22px',
              textWrap: 'balance',
            }}
          >
            Thank you for booking a call.{' '}
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              See you on the other side.
            </span>
          </h1>

          <p
            data-reveal
            data-d3
            style={{
              fontSize: 'clamp(1.05rem,1.7vw,1.3rem)',
              lineHeight: '1.5',
              maxWidth: '560px',
              margin: '0 0 32px',
              color: 'var(--neuroid-ink)',
            }}
          >
            A calendar invite is on its way to your inbox. Come with your numbers - we'll come with the teardown.
          </p>

          <div
            data-reveal
            data-d4
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              border: '1.5px solid var(--neuroid-ink)',
              background: '#fff',
              padding: 'clamp(16px,2.2vw,20px) clamp(18px,2.4vw,24px)',
              maxWidth: '580px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                background: 'var(--neuroid-ink)',
                color: 'var(--neuroid-paper)',
                padding: '4px 8px',
                flex: 'none',
                marginTop: '2px',
              }}
            >
              Note
            </span>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: '12.5px',
                lineHeight: '1.6',
                letterSpacing: '0.01em',
                color: 'var(--neuroid-grey-dark)',
              }}
            >
              If your brand is currently spending under{' '}
              <strong style={{ color: 'var(--neuroid-ink)' }}>₹2L / month</strong> on ads, the call may be automatically cancelled - we focus on brands ready to scale.
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: 'var(--neuroid-ink)', color: 'var(--neuroid-paper)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '28px clamp(18px,4vw,48px)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 24px',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '11.5px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--neuroid-grey-dark)',
          }}
        >
          <span>New Delhi, India · hello@neuroidmedia.com</span>
          <span>www.neuroidmedia.com</span>
        </div>
      </footer>
    </div>
  );
}
