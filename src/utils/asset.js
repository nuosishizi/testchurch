/** Resolve a file in /public against the deployed base path (e.g. /testchurch/). */
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
