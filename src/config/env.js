/**
 * src/config/env.js
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for all environment variables.
 * Validates at startup — throws clear errors if required vars missing.
 * Import this everywhere instead of accessing import.meta.env directly.
 * ─────────────────────────────────────────────────────────────────
 */

const get = (key, fallback = undefined) => {
  const val = import.meta.env[key];
  if (val === undefined || val === '') {
    if (fallback !== undefined) return fallback;
    throw new Error(`[NOCTURN] Missing required environment variable: ${key}`);
  }
  return val;
};

const bool = (key, fallback = false) =>
  (import.meta.env[key] ?? String(fallback)).toLowerCase() === 'true';

// ── App ───────────────────────────────────────────────────────────
export const APP_NAME    = get('VITE_APP_NAME', 'NOCTURN');
export const APP_TAGLINE = get('VITE_APP_TAGLINE', 'Dark Luxury Accessories');
export const SITE_URL    = get('VITE_SITE_URL', 'http://localhost:5173');

// ── API ───────────────────────────────────────────────────────────
export const API_URL     = get('VITE_API_URL', 'http://localhost:4000/v1');

// ── Stripe ────────────────────────────────────────────────────────
export const STRIPE_PUBLIC_KEY = get('VITE_STRIPE_PUBLIC_KEY', '');

// ── CDN ───────────────────────────────────────────────────────────
// Falls back to empty string → use relative/Unsplash URLs in dev
export const CDN_URL = get('VITE_CDN_URL', '');

// ── Feature Flags ─────────────────────────────────────────────────
export const ENABLE_ANALYTICS  = bool('VITE_ENABLE_ANALYTICS', false);
export const ENABLE_WISHLIST   = bool('VITE_ENABLE_WISHLIST', true);
export const MAINTENANCE_MODE  = bool('VITE_MAINTENANCE_MODE', false);

// ── Runtime helpers ───────────────────────────────────────────────
export const IS_DEV        = import.meta.env.DEV;
export const IS_PROD       = import.meta.env.PROD;
export const IS_STAGING    = SITE_URL.includes('staging.');

/**
 * Resolve an image URL through the CDN if configured,
 * otherwise return the original URL unchanged.
 *
 * Usage:  cdnUrl('/products/ring-001.jpg')
 *         cdnUrl('https://images.unsplash.com/...')  → passthrough in dev
 */
export const cdnUrl = (path) => {
  if (!CDN_URL || !path) return path;
  // Only prefix relative paths — absolute URLs (Unsplash, etc.) pass through
  if (path.startsWith('http')) return path;
  return `${CDN_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export default {
  APP_NAME, APP_TAGLINE, SITE_URL,
  API_URL, STRIPE_PUBLIC_KEY, CDN_URL,
  ENABLE_ANALYTICS, ENABLE_WISHLIST, MAINTENANCE_MODE,
  IS_DEV, IS_PROD, IS_STAGING,
  cdnUrl,
};
