'use client';
import React from 'react';
import { useVideoVisibility } from '@/lib/useVideoVisibility';

// Eco-quality clips at ~400px (tiles render small) — lighter to load, identical
// at this size. No poster: the clips themselves are the point of this wall.
const CLV = 'https://res.cloudinary.com/dbuklvo6b/video/upload/f_auto,q_auto:eco,w_400/';
const VIDEOS = [
  'v1782322750/HK_Video_2_d54lku', 'v1782043217/UNO_Luxe_V2_lefbae',
  'v1782322787/HnK_Sheer_V1_lesdwj', 'v1782042891/Yoho_Pitstop_H1_V2_3_jdlfvv',
  'v1782042845/H1_CupJi_V1_3_nb1jzu', 'v1782042844/PU_3___Hook_2_1_egyvbl',
  'v1782042843/9X16_V1_r2yjdc', 'v1782042842/Karassa_UGC_2_2_w1avqf',
  'v1782042839/Svarn_Jewels_CC146_inm6hs', 'v1782042838/CC15_V3_ad3uqu',
  'v1782042836/CC60_FRECKLES_VIDEO_silix5', 'v1782042833/Svarn_Jewels_CC140_wkdu2m',
  'v1782042831/CC33_PowerShift_Pants_video_jfrtn6', 'v1782042826/Period_Underwear___Hook_2_oc2mad',
  'v1782042826/CC14_Girls_Leggings_V2_l7z8a6', 'v1782042820/CC14_1_smi6hm',
  'v1782042817/9x16_V3_bscyvw', 'v1782042816/CC5_Final_x5ejpn',
  'v1782042815/CC11_Understyling_your_eyes_npetnn', 'v1782042814/CC101_Bedtime_Supremacy_ptdoos',
  'v1782042812/CC115_Bestseller_Rings_ajsz9s', 'v1782042807/CC60_Silverfied_Screen_Freeze_Product_final_lmtvvo',
  'v1782042806/CC67_Silverfied_Stack_you_forget_to_take_off_fkuonn', 'v1782042805/CC56_silvercied_Msgs_in_DM_Final_srazws',
  'v1782042799/Sequence_01_1_f4rpm7', 'v1782042791/CC27_Huesfab_All_collection_Final_vi2rjm',
  'v1782042790/PU_02_May_H2.wav_1_lvicth', 'v1782042780/CC12_ceratine_Final_svatid',
  'v1782042777/Polo_Gif_ybhdjd', 'v1782042777/9x16_cova4q',
  'v1782042774/CC3___Hard_Launch_-_Short_Kurta_oxl7wu',
].map((p) => ({ video: CLV + p + '.mp4' }));
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
