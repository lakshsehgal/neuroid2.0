// Single source of truth for hosted video clips (Cloudinary account is
// deactivated; clips are moving to ImageKit).
//
// Before this goes live:
//   1. Replace <IMAGEKIT_ID> below with the real ImageKit URL-endpoint ID
//      (ImageKit dashboard → URL endpoint, looks like https://ik.imagekit.io/abc123).
//   2. Upload every clip listed in scripts/video-manifest.txt to the `neuroid/`
//      folder in ImageKit, keeping the exact file names from the manifest.
//      Encode them first with scripts/encode-videos.sh — clips are served as-is
//      (no URL transforms) so the free tier only spends bandwidth, not video
//      processing units.
export const VIDEO_BASE = 'https://ik.imagekit.io/<IMAGEKIT_ID>/neuroid/';

export const vid = (name) => VIDEO_BASE + name + '.mp4';
