// Single source of truth for hosted video clips, served from the ImageKit
// media library (folder `Videos/`). Pass the full file name, URL-encoded
// exactly as ImageKit exposes it — spaces as %20; &, + and parentheses
// literal; extension included (one file is uppercase .MP4).
export const VIDEO_BASE = 'https://ik.imagekit.io/skks6m4go/Videos/';

export const vid = (file) => VIDEO_BASE + file;
