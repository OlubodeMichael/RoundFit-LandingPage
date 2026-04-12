import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST { "email": "user@example.com" }
 * Inserts into Supabase table `waitlist` (column `email`).
 *
 * Env (typical): SUPABASE_URL + SUPABASE_ANON_KEY
 * — add an RLS policy so `anon` can INSERT into `waitlist` (or use SUPABASE_SERVICE_ROLE_KEY
 *   server-only instead of anon; never expose service_role to the browser).
 *
 * Also accepts NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY if set.
 */
export async function POST(req: NextRequest) {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    "";

  if (!url || !key) {
    return NextResponse.json(
      { error: "Missing Supabase configuration" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const raw =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email
      : "";
  const email = raw.trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const supabase = createClient(url, key);

  const { error } = await supabase.from("waitlist").insert({ email });

  if (error) {
    // Unique violation — treat as success so UX stays friendly
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, alreadyOnWaitlist: true });
    }
    console.error("[waitlist]", error.message);
    return NextResponse.json(
      { error: "Could not join waitlist. Try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
