/** Canonical production origin (https://roundfit.com). Override per env if needed. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://roundfit.com";
