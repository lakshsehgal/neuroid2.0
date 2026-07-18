// Static creatives hosted in the same Cloudflare R2 bucket as the videos
// (folder `images/`), via its public r2.dev development URL. Same encoding
// rules as lib/videos.js: spaces as %20; parentheses literal; extension
// included. Object keys are case-sensitive, folder name included. Older
// statics remain local under /assets/cmp.
export const IMAGE_BASE = 'https://pub-d8f7d40c14a64599b5c193ee2717a7e0.r2.dev/images/';

export const rimg = (file) => IMAGE_BASE + file;
