// Single source of truth for hosted video clips, served from the Cloudflare
// R2 bucket via its public r2.dev development URL. The current clip pool
// (portfolio wall + home hero gallery) lives in the bucket folder `Videoss/`;
// the four case-study card clips on the home page still live in the older
// `Videos/` folder. Pass the full file name, URL-encoded exactly as stored —
// spaces as %20; &, +, @ and parentheses literal; extension included.
// R2 object keys are case-sensitive, folder name included.
const R2 = 'https://pub-d8f7d40c14a64599b5c193ee2717a7e0.r2.dev/';

export const VIDEO_BASE = R2 + 'Videoss/';
export const LEGACY_VIDEO_BASE = R2 + 'Videos/';

export const vid = (file) => VIDEO_BASE + file;
export const vidLegacy = (file) => LEGACY_VIDEO_BASE + file;
