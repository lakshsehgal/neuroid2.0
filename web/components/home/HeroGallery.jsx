'use client';
import React from 'react';
import { useVideoVisibility } from '@/lib/useVideoVisibility';
import { vid } from '@/lib/videos';

// Order is hand-shuffled so similar clips never sit next to each other on
// the wall. No poster: the clips themselves are the point.
const VIDEOS = [
  '3%20@%20599%20(1).mp4',
  'CC112%20silverfied%20Wear%20on%20repeats.mp4',
  'CC6_Blackout%20Curtains_3%20(1).mp4',
  'CC13%20Mackly%20UGC%20Girls%20Innershorts%20Final.mp4',
  'Yoho%20Pitstop%20H1_V2%20(4).mp4',
  'Podcast%20H3%20V1.mp4',
  'Blinkit%20Pureflow%20V2.mp4',
  'MAY_PU_03_H2V2.mp4',
  'TMC%20Concept%2010_V1.mp4',
  'CC124%20Islverfied%20New%20arrivals.mp4',
  'NH_UGC_03_01.mp4',
  'CC5%20Final%20(1).mp4',
  'CC105%20mackly%20innershort%20Proven%20Fit.mp4',
  'Cotton+Sheer%20(3).mp4',
  'UNO%20MAY%20H2.mp4',
  'UGC%2010%20Yoho%20archflex%20CTA%202%20Final%20(1).mp4',
  'Video%201%20(2)%20(2).mp4',
  'CC42%20silverfied%20Final%20(1).mp4',
  'H1%20CupJi%20V1%20(4).mp4',
  'CC14%20(2).mp4',
  'Karassa%20UGC%202%20(3).mp4',
  'CC79_Mumbai%20Tour.mp4',
  'PU%2002%20May%20H2.wav%20(2).mp4',
  '4%20Reasons%20V1%20(2).mp4',
  'H&K%20Sheer+Blackout%20V2%20(2).mp4',
  'CC56%20silvercied%20Msgs%20in%20DM%20Final%20(1).mp4',
  '9x16%20(2).mp4',
  'No%20diet%20Cola_V1.mp4',
  'Unboxing_V1.mp4',
  'LifeLong%20Walking%20pad%20V1%20(1).mp4',
  'CC87%20-%20No%20Such%20Thing%20As%20Too%20Much%20V2.mp4',
  'Yoho_UGC04_RushHour%20(2).mp4',
  'CC122_V1.mp4',
  '9X16%20(3).mp4',
  'Venn%20Diagram_V3%20(1).mp4',
  'SSU_01_H3V2.mp4',
  'UGC_04_Natural%20Hege_1.mp4',
  'HnK_Sheer_V1%20(1).mp4',
  'UNO%20Repurpose_01_V2.mp4',
  'CC99%20mackly%20Raaghavi%20Tiwari%20UGC.mp4',
  '3%20@%20599.mp4',
  'CC67%20Silverfied%20Stack%20you%20forget%20to%20take%20off%20(1).mp4',
  'PU2_Graded_no%20hook.mp4',
  'Preflow%20Shark%20Fails_V2.mp4',
  'UGC01_Ethnic%20Rug_V2.mp4',
  'Video%203%20(1)%20(1).mp4',
  'UGC%205%20Rush%20hourV2%20(3).mp4',
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
