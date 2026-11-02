/**
 * Bandcamp fan page username. Its collection must be public; the page returns 404 for unknown
 * handles, which the site degrades to "no MP3 row".
 */
export const BANDCAMP_USERNAME = "shrimpingvessel";

export const BANDCAMP_FAN_URL = `https://bandcamp.com/${BANDCAMP_USERNAME}`;

/**
 * Bandcamp fronts browser user agents with a JavaScript challenge, but serves its own app's
 * user agent the plain page, including the embedded page data.
 */
export const BANDCAMP_USER_AGENT = "Bandcamp/8.0.2 (Android; 13)";
