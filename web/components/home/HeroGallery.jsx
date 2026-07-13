'use client';
import React from 'react';
import { useVideoVisibility } from '@/lib/useVideoVisibility';
import { vid } from '@/lib/videos';

// Order is hand-shuffled so clips from the same brand never sit next to each
// other on the wall. No poster: the clips themselves are the point.
const VIDEOS = [
  'HK%20Cotton%20Yellow%20V1.mp4',
  'CC60_FRECKLES_VIDEO.mp4',
  'CC101_Bedtime%20Supremacy.mp4',
  'Sequence%2001%20(1).mp4',
  'PU%203%20_%20Hook%202%20(1).mp4',
  'Svarn%20Jewels_CC146.mp4',
  'SSU%20PPT%20V1.mp4',
  'Yoho%20Pitstop%20H1_V2%20(3).mp4',
  'HnK_Sheer_V2.mp4',
  'CC5%20Final.mp4',
  'CC67%20Silverfied%20Stack%20you%20forget%20to%20take%20off.mp4',
  'CC14_Girls%20Leggings_V2.mp4',
  'CC115%20Bestseller%20Rings.mp4',
  'H1%20CupJi%20V1%20(3).mp4',
  'Period%20Underwear%20_%20Hook%202.mp4',
  'CC11_Understyling%20your%20eyes.mp4',
  'H&K%20Blackout%20Curtain%20V1%20(1).mp4',
  'SuperBottoms%20UGC1%20V3.mp4',
  '9X16_V1.mp4',
  'CC56%20silvercied%20Msgs%20in%20DM%20Final.mp4',
  'Karassa%20UGC%202%20(2).mp4',
  'DFL_01.mp4',
  'CC15_V3.mp4',
  '9x16_V3.mp4',
  'Cotton+Sheer%20(1).mp4',
  'CC14%20(1).mp4',
  'CC60%20Silverfied%20Screen%20Freeze%20Product%20final.mp4',
  'PU%2002%20May%20H2.wav%20(1).mp4',
  'CC33_PowerShift%20Pants_video.mp4',
  'Svarn%20Jewels_CC140.MP4',
  'Podcast%20V1.mp4',
  '9x16.mp4',
  'H&K%20Sheer+Blackout%20V2.mp4',
  'CC12%20ceratine%20Final.mp4',
  'SB_UGC_PU2_V3.mp4',
  'CC16%20_%20People%20looking_02.mp4',
  'CC27%20Huesfab%20All%20collection%20Final.mp4',
  'Polo_Gif.mp4',
  'CC3%20_%20Hard%20Launch%20-%20Short%20Kurta.mp4',
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
