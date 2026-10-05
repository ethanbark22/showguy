import "server-only";

/**
 * A simple per-visitor limit: 5 sends per 10 minutes. It lives in server
 * memory, so on Vercel it is a speed bump rather than a wall (each server
 * instance counts separately). For stronger protection add Cloudflare
 * Turnstile or Vercel BotID later. See README → "Spam protection".
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, number[]>();

export function tooManyRequests(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}
