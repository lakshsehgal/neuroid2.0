'use client';
import React from 'react';
import { useVideoVisibility } from '@/lib/useVideoVisibility';
import { vid } from '@/lib/videos';

// Clips are pre-encoded to ~480px (tiles render small) — lighter to load,
// identical at this size. No poster: the clips themselves are the point.
const VIDEOS = [
  'HK_Video_2', 'UNO_Luxe_V2',
  'HnK_Sheer_V1', 'Yoho_Pitstop_H1_V2_3',
  'H1_CupJi_V1_3', 'PU_3___Hook_2_1',
  '9X16_V1', 'Karassa_UGC_2_2',
  'Svarn_Jewels_CC146', 'CC15_V3',
  'CC60_FRECKLES_VIDEO', 'Room_Tour_9x16_1', 'Svarn_Jewels_CC140',
  'CC33_PowerShift_Pants_video', 'Period_Underwear___Hook_2',
  'CC14_Girls_Leggings_V2', 'CC14_1',
  '9x16_V3', 'CC5_Final',
  'CC11_Understyling_your_eyes', 'CC101_Bedtime_Supremacy', 'Cotton_Sheer',
  'CC115_Bestseller_Rings', 'CC60_Silverfied_Screen_Freeze_Product_final',
  'CC67_Silverfied_Stack_you_forget_to_take_off', 'CC56_silvercied_Msgs_in_DM_Final',
  'Sequence_01_1', 'CC27_Huesfab_All_collection_Final',
  'PU_02_May_H2.wav_1', 'H_K_Blackout_Curtain_V1', 'CC12_ceratine_Final',
  'Polo_Gif', '9x16',
  'CC3___Hard_Launch_-_Short_Kurta',
].map((p) => ({ video: vid(p) }));
const STATICS = Array.from({ length: 26 }, (_, i) => `/assets/cmp/c${String(i + 1).padStart(2, '0')}.jpg`);
const AR = ['3/4', '1/1', '4/5', '3/4', '4/5', '1/1', '3/4', '4/5', '1/1'];
const ANIMS = [
  { anim: 'nrd-rise-up', dur: '52s' },
  { anim: 'nrd-rise-down', dur: '64s' },
  { anim: 'nrd-rise-up', dur: '58s' },
];

export default function HeroGallery() {
  const register = useVideoVisibility();

  // Interleave videos and statics, then distribute round-robin into 3 columns.
  const M = [];
  const n = Math.max(VIDEOS.length, STATICS.length);
  for (let i = 0; i < n; i++) {
    if (i < VIDEOS.length) M.push(VIDEOS[i]);
    if (i < STATICS.length) M.push({ img: STATICS[i] });
  }
  const cols = [[], [], []];
  M.forEach((m, i) => cols[i % 3].push(m));

  const tile = (m, ar, key) => {
    let inner;
    if (m.video) {
      inner = <video src={m.video} loop playsInline muted preload="none" ref={register}
        style={{ display: 'block', width: '100%', aspectRatio: ar, objectFit: 'cover', background: 'var(--neuroid-ink)' }} />;
    } else {
      inner = <img src={m.img} loading="lazy" decoding="async" alt=""
        style={{ display: 'block', width: '100%', aspectRatio: ar, objectFit: 'cover' }} />;
    }
    return (
      <div key={key} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--neuroid-ink)', boxShadow: '0 6px 18px rgba(12,12,12,0.16)', background: 'rgba(12,12,12,0.05)' }}>
        {inner}
      </div>
    );
  };

  return (
    <div className="nrd-hero-art" style={{ position: 'relative', height: 'min(88vh,880px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', height: '100%', overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%)', maskImage: 'linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%)' }}>
        {cols.map((items, ci) => {
          const set = (suffix) => items.map((m, i) => tile(m, AR[i % AR.length], `c${ci}-${i}${suffix}`));
          return (
            <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '14px', willChange: 'transform', animation: `${ANIMS[ci].anim} ${ANIMS[ci].dur} linear infinite` }}>
              {set('a')}
              <div aria-hidden="true" style={{ display: 'contents' }}>{set('b')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
