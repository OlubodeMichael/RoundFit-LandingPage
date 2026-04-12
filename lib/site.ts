/** Canonical production origin (https://calore.fit). Override per env if needed. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://calore.fit";
