// TEMPORARY diagnostic — remove once the R2 migration is verified.
// HEAD-checks every video clip the site references against the R2 bucket
// and reports the ones that don't resolve, so mismatched file names can
// be fixed without guessing tile-by-tile.
import { NextResponse } from 'next/server';
import { VIDEO_BASE } from '@/lib/videos';

export const dynamic = 'force-dynamic';

const FILES = [
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
  'Video-582.mp4',
  'Video-493.mp4',
  'Video-696.mp4',
  'Video-875.mp4',
];

async function exists(encodedName) {
  try {
    const res = await fetch(VIDEO_BASE + encodedName, { method: 'HEAD', cache: 'no-store' });
    return res.status === 200;
  } catch {
    return false;
  }
}

// For a file that 404s at its expected name, probe common naming variants
// (case, extension case, " (n)" suffixes, space/underscore swaps) and return
// the first variant that exists in the bucket.
function variants(decodedName) {
  const dot = decodedName.lastIndexOf('.');
  const stem = decodedName.slice(0, dot);
  const ext = decodedName.slice(dot);
  const stems = new Set([stem]);
  for (const s of [...stems]) {
    stems.add(s.replace(/\s*\(\d+\)\s*$/, ''));      // drop " (n)"
    stems.add(`${s} (1)`);                            // add " (1)"
  }
  for (const s of [...stems]) {
    stems.add(s.replace(/9x16/gi, '9x16'));
    stems.add(s.replace(/9x16/gi, '9X16'));
    stems.add(s.replace(/_/g, ' '));
    stems.add(s.replace(/ /g, '_'));
    stems.add(s.replace(/\s+_\s+/g, '_'));
    stems.add(s.replace(/\s{2,}/g, ' ').trim());
    stems.add(s.toLowerCase());
    stems.add(s.toUpperCase());
  }
  const exts = [ext, ext.toLowerCase(), ext.toUpperCase()];
  const out = new Set();
  for (const s of stems) for (const e of exts) out.add(s + e);
  out.delete(decodedName);
  return [...out].slice(0, 40);
}

export async function GET() {
  const results = await Promise.all(
    FILES.map(async (file) => ({ file, ok: await exists(file) }))
  );
  const missing = results.filter((r) => !r.ok);

  const probed = await Promise.all(
    missing.map(async ({ file }) => {
      const decoded = decodeURIComponent(file.replace(/\+/g, '%2B'));
      for (const cand of variants(decoded)) {
        const enc = encodeURIComponent(cand).replace(/[!'()*]/g, (c) => c === '(' || c === ')' ? c : encodeURIComponent(c));
        if (await exists(enc)) return { expected: file, foundAs: enc };
      }
      return { expected: file, foundAs: null };
    })
  );

  return NextResponse.json({
    base: VIDEO_BASE,
    checked: results.length,
    ok: results.length - missing.length,
    resolved: probed.filter((p) => p.foundAs),
    notFoundAnywhere: probed.filter((p) => !p.foundAs).map((p) => p.expected),
  });
}
