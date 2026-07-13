#!/usr/bin/env bash
# One-time encode of source clips for ImageKit. Produces small 480px-wide,
# silent H.264 mp4s so ImageKit serves them as-is: no video processing units
# are spent (the free tier only has 500/month) and the 20 GB/month bandwidth
# allowance stretches much further than full-size uploads would.
#
# Usage: ./encode-videos.sh <source-dir> <out-dir>
# Then drag the contents of <out-dir> into the `neuroid/` folder in the
# ImageKit dashboard, keeping the file names (see video-manifest.txt).
set -euo pipefail

src=${1:?usage: encode-videos.sh <source-dir> <out-dir>}
out=${2:?usage: encode-videos.sh <source-dir> <out-dir>}
mkdir -p "$out"

for f in "$src"/*; do
  [ -f "$f" ] || continue
  name=$(basename "$f")
  name=${name%.*}
  echo "encoding $name"
  ffmpeg -y -i "$f" \
    -vf "scale=480:-2" \
    -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p \
    -movflags +faststart -an \
    "$out/$name.mp4"
done

echo "done → $out"
