'use client';
// Neuroid — Button. Ported verbatim from the design-system bundle
// (_ds_bundle.js → components/core/Button.jsx). Brutalist, sharp-cornered;
// optional hard "printed" shadow block that presses on click.
import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  full = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { fontSize: '13px', padding: '8px 14px', gap: '7px' },
    md: { fontSize: '15px', padding: '12px 20px', gap: '9px' },
    lg: { fontSize: '17px', padding: '16px 28px', gap: '10px' },
  };
  const variants = {
    primary: { background: 'var(--neuroid-yellow)', color: 'var(--neuroid-ink)', border: '1.5px solid var(--neuroid-ink)' },
    inverse: { background: 'var(--neuroid-ink)', color: 'var(--neuroid-paper)', border: '1.5px solid var(--neuroid-ink)' },
    outline: { background: 'transparent', color: 'var(--neuroid-ink)', border: '1.5px solid var(--neuroid-ink)' },
    ghost: { background: 'transparent', color: 'var(--neuroid-ink)', border: '1.5px solid transparent' },
    danger: { background: 'var(--neuroid-paper)', color: 'var(--neuroid-red)', border: '1.5px solid var(--neuroid-red)' },
  };
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: sizes[size].gap, fontFamily: 'var(--font-sans)', fontWeight: 700,
    lineHeight: 1, letterSpacing: '-0.01em', borderRadius: 'var(--radius-0)',
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
    width: full ? '100%' : 'auto',
    transition: 'transform var(--dur-fast) var(--ease-snap), box-shadow var(--dur-fast) var(--ease-snap), background var(--dur-fast) var(--ease-out)',
    boxShadow: block ? '3px 3px 0 0 var(--neuroid-ink)' : 'none',
    ...sizes[size], ...variants[variant], ...style,
  };
  const onDown = (e) => {
    if (disabled) return;
    if (block) {
      e.currentTarget.style.transform = 'translate(3px, 3px)';
      e.currentTarget.style.boxShadow = '0 0 0 0 var(--neuroid-ink)';
    } else {
      e.currentTarget.style.transform = 'translateY(1px)';
    }
  };
  const reset = (e) => {
    e.currentTarget.style.transform = 'none';
    e.currentTarget.style.boxShadow = block ? '3px 3px 0 0 var(--neuroid-ink)' : 'none';
  };
  return (
    <button type="button" disabled={disabled} style={base} onMouseDown={onDown} onMouseUp={reset} onMouseLeave={reset} {...rest}>
      {iconLeft}{children}{iconRight}
    </button>
  );
}
