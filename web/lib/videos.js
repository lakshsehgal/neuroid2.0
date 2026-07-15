// Single source of truth for hosted video clips, served from the Cloudflare
// R2 bucket (folder `videos/`) via its public r2.dev development URL. Pass
// the full file name, URL-encoded exactly as stored — spaces as %20; &, +
// and parentheses literal; extension included (one file is uppercase .MP4).
// R2 object keys are case-sensitive, folder name included.
export const VIDEO_BASE = 'https://pub-d8f7d40c14a64599b5c193ee2717a7e0.r2.dev/videos/';

export const vid = (file) => VIDEO_BASE + file;
