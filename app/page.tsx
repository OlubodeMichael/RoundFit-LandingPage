"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type InstructionIcon = "walk" | "bike" | "run" | "stairs" | "recovery" | "dumbbell";

type InstructionSlide = {
  context: string;
  amount: number;
  unit: string;
  move: string;
  progress: number;
  icon: InstructionIcon;
};

const INSTRUCTION_SLIDES: InstructionSlide[] = [
  {
    context: "You need to burn",
    amount: 300,
    unit: "calories",
    move: "Walk 40 minutes",
    progress: 74,
    icon: "walk",
  },
  {
    context: "Make up for lunch",
    amount: 180,
    unit: "calories",
    move: "Brisk stairs, 20 min",
    progress: 62,
    icon: "stairs",
  },
  {
    context: "Almost at your goal",
    amount: 90,
    unit: "calories left",
    move: "Light jog, 12 min",
    progress: 91,
    icon: "run",
  },
  {
    context: "Evening catch-up",
    amount: 240,
    unit: "calories",
    move: "Cycling, 25 minutes",
    progress: 55,
    icon: "bike",
  },
  {
    context: "Recovery check",
    amount: 78,
    unit: "recovery score",
    move: "Light session today",
    progress: 78,
    icon: "recovery",
  },
  {
    context: "Post-workout burn",
    amount: 340,
    unit: "cal burned",
    move: "Great lift, rest tonight",
    progress: 88,
    icon: "dumbbell",
  },
];

function InstructionGlyph({ icon }: { icon: InstructionIcon }) {
  const stroke = "var(--accent)";
  const common = {
    width: 13,
    height: 13,
    viewBox: "0 0 24 24" as const,
    fill: "none" as const,
    stroke,
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (icon) {
    case "walk":
      return (
        <svg {...common}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      );
    case "bike":
      return (
        <svg {...common}>
          <circle cx="6.5" cy="15.5" r="3.5" />
          <circle cx="17.5" cy="15.5" r="3.5" />
          <path d="M6.5 15.5 10 8h3l2 7.5M13 8l4.5 7.5h3" />
        </svg>
      );
    case "run":
      return (
        <svg {...common}>
          <path d="M13 4v3M9 20l3-6 2 3 4-7M9 11h6" />
        </svg>
      );
    case "stairs":
      return (
        <svg {...common}>
          <path d="M4 20h4v-4h4v-4h4v-4h4M8 16h4M12 12h4M16 8h4" />
        </svg>
      );
    case "recovery":
      return (
        <svg {...common}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "dumbbell":
      return (
        <svg {...common}>
          <path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4M6 8h12M6 16h12" />
        </svg>
      );
  }
}

function AppCardBody({ data }: { data: InstructionSlide }) {
  return (
    <>
      <p style={{ fontSize: ".76rem", color: "#aaa", marginBottom: 6 }}>
        {data.context}
      </p>
      <p
        className="display"
        style={{
          fontSize: "clamp(2.65rem, 11vw, 4.25rem)",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-.05em",
          color: "var(--accent)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {data.amount}
      </p>
      <p
        style={{
          fontSize: ".9rem",
          color: "#666",
          fontWeight: 500,
          marginTop: 5,
          marginBottom: 20,
        }}
      >
        {data.unit}
      </p>

      <div style={{ height: 1, background: "#f0f0f0", marginBottom: 18 }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 22,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "rgba(249,115,22,.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <InstructionGlyph icon={data.icon} />
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: ".69rem", color: "#aaa", marginBottom: 3 }}>
            Your move
          </p>
          <p
            className="display"
            style={{
              fontSize: "1.22rem",
              fontWeight: 700,
              letterSpacing: "-.02em",
              color: "#0a0a0a",
              lineHeight: 1.2,
            }}
          >
            {data.move}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: ".7rem", color: "#aaa" }}>Daily goal</span>
        <span
          style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--accent)" }}
        >
          {data.progress}%
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: "#f0f0f0",
          borderRadius: 100,
          overflow: "hidden",
        }}
      >
        <div
          className="app-card-progress-fill"
          style={{
            width: `${data.progress}%`,
            height: "100%",
            background: "var(--accent)",
            borderRadius: 100,
          }}
        />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────
   Hero app-card mockup
   White card on dark bg (the "product proof")
───────────────────────────────────────────────── */
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function AppCard() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const tick = () => {
      if (document.hidden) return;
      setCurrent((i) => (i + 1) % INSTRUCTION_SLIDES.length);
    };
    const id = window.setInterval(tick, 7800);
    return () => window.clearInterval(id);
  }, []);

  const body = (
    <div
      key={current}
      className={prefersReducedMotion() ? undefined : "app-card-body-slot"}
    >
      <AppCardBody data={INSTRUCTION_SLIDES[current]} />
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        boxSizing: "border-box",
        background: "#fff",
        borderRadius: "clamp(18px, 4vw, 24px)",
        padding: "clamp(18px, 4.5vw, 28px) clamp(16px, 4vw, 28px) clamp(16px, 3.5vw, 24px)",
        boxShadow:
          "0 2px 4px rgba(0,0,0,.15), 0 clamp(20px, 8vw, 32px) clamp(48px, 18vw, 96px) rgba(0,0,0,.6)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 22,
        }}
      >
        <span
          style={{
            fontSize: ".66rem",
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "#aaa",
          }}
        >
          Today&apos;s instruction
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span
            style={{ fontSize: ".68rem", fontWeight: 700, color: "#22c55e" }}
          >
            Live
          </span>
        </div>
      </div>
      {body}
    </div>
  );
}

type WaitlistSubmitResult =
  | { ok: true; alreadyOnWaitlist?: boolean }
  | { ok: false; error: string };

async function submitWaitlist(email: string): Promise<WaitlistSubmitResult> {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    alreadyOnWaitlist?: boolean;
  };
  if (!res.ok) {
    return { ok: false, error: data.error ?? "Something went wrong. Try again." };
  }
  if (data.alreadyOnWaitlist) {
    return { ok: true, alreadyOnWaitlist: true };
  }
  return { ok: true };
}

type WaitlistOutcome = null | "joined" | "already";

/** How long the “already on waitlist” notice stays visible before the form returns. */
const WAITLIST_ALREADY_DISMISS_MS = 4000;

/* ─────────────────────────────────────────────────
   Email form: dark and light variants
───────────────────────────────────────────────── */
function EmailForm({
  email,
  setEmail,
  outcome,
  onSubmit,
  dark,
  submitting,
  error,
}: {
  email: string;
  setEmail: (v: string) => void;
  outcome: WaitlistOutcome;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  dark?: boolean;
  submitting?: boolean;
  error?: string | null;
}) {
  if (outcome === "joined") {
    return (
      <div className="success-msg">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        You&apos;re on the list. We&apos;ll be in touch soon.
      </div>
    );
  }
  if (outcome === "already") {
    return (
      <div className="success-msg waitlist-already">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        You&apos;re already on the waitlist. We&apos;ll email you when we launch.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: 520 }}>
      <form className="form-row" onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={submitting}
          className={dark ? "input-dark" : "input-light"}
        />
        <button type="submit" className="btn-orange" disabled={submitting}>
          {submitting
            ? "Sending…"
            : dark
              ? "Get Early Access"
              : "Join the Waitlist"}
        </button>
      </form>
      {error ? (
        <p className={`form-error${dark ? " form-error--dark" : ""}`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Page data
───────────────────────────────────────────────── */
const SOLUTION = [
  {
    q: "Ate too much?",
    a: "We calculate exactly how to make up for it: a specific move, time, and effort, before your day ends.",
  },
  {
    q: "Skipped your workout?",
    a: "We adjust your calorie target and suggest a light recovery session so you still finish the week ahead.",
  },
  {
    q: "Feeling drained?",
    a: "We read your recovery score, lower the intensity, and protect tomorrow's performance today.",
  },
  {
    q: "Hit a plateau?",
    a: "We compare your weekly calorie delta against your weight log, adjust your daily budget, and tell you exactly what needs to change.",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Connect Apple Health or Google Fit",
    desc: "Your smartwatch already syncs data to your phone. RoundFit reads from there: calories burned, HRV, sleep, and steps, all pulled automatically. Works with Apple Watch, Fitbit, Garmin, WHOOP, and any device that syncs to your health app.",
  },
  {
    n: 2,
    title: "Log your food",
    desc: "Snap a photo, scan a barcode, or speak it. GPT-4 Vision identifies your meal and logs calories in under 3 seconds. Workouts sync automatically from your health app.",
  },
  {
    n: 3,
    title: "Get one clear decision",
    desc: "Eat less, train harder, or recover. One action, recalculated every hour. No dashboard to decode.",
  },
];

type FeatureIconId = "delta" | "watch" | "camera" | "streak" | "dumbbell" | "moon" | "barcode";

const FEATURE_PILLARS: {
  pillar: string;
  features: { name: string; desc: string; icon: FeatureIconId }[];
}[] = [
  {
    pillar: "Nutrition",
    features: [
      {
        name: "Real-time calorie delta",
        desc: "Your live position against your daily calorie goal, updated throughout the day.",
        icon: "delta",
      },
      {
        name: "AI food recognition",
        desc: "Photograph any meal, scan a barcode, or type it manually. GPT-4 Vision logs your calories in under 3 seconds.",
        icon: "camera",
      },
      {
        name: "Barcode scanner",
        desc: "Scan any packaged food. Powered by Open Food Facts. 2.8 million products across 150 countries. Instant calories, macros, and product image.",
        icon: "barcode",
      },
    ],
  },
  {
    pillar: "Train",
    features: [
      {
        name: "Smart workout guidance",
        desc: "Personalised exercise recommendations based on your goals and today's calorie state.",
        icon: "dumbbell",
      },
      {
        name: "Health app sync",
        desc: "RoundFit reads directly from Apple Health and Google Fit on your phone. Your smartwatch syncs there automatically. We pull everything from one place.",
        icon: "watch",
      },
    ],
  },
  {
    pillar: "Recovery",
    features: [
      {
        name: "Recovery readiness score",
        desc: "HRV, sleep quality, and resting heart rate combined into one daily readiness number. Pulled every morning from your health app.",
        icon: "moon",
      },
      {
        name: "Daily score + streaks",
        desc: "A simple score across all three pillars and a streak to keep consistency rewarding.",
        icon: "streak",
      },
    ],
  },
];

function FeatureCardGlyph({ icon }: { icon: FeatureIconId }) {
  const s = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24" as const,
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (icon) {
    case "delta":
      return (
        <svg {...s}>
          <path d="M4 19V5M4 19h16M8 17V9m4 8V6m4 11v-5" />
        </svg>
      );
    case "watch":
      return (
        <svg {...s}>
          <rect x="6" y="6" width="12" height="12" rx="3" />
          <path d="M9 6V4h6v2M9 18v2h6v-2M12 9v2" />
        </svg>
      );
    case "camera":
      return (
        <svg {...s}>
          <path d="M4 9h3l2-2h6l2 2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );
    case "streak":
      return (
        <svg {...s}>
          <path d="M8 21h8M12 3c-1 4-4 5-4 9a4 4 0 0 0 8 0c0-4-3-5-4-9z" />
        </svg>
      );
    case "dumbbell":
      return (
        <svg {...s}>
          <path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4M6 8h12M6 16h12" />
        </svg>
      );
    case "moon":
      return (
        <svg {...s}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    case "barcode":
      return (
        <svg {...s}>
          <path d="M3 5v14M7 5v14M11 5v14M15 5v14M19 5v14M21 5v14" />
          <path d="M3 9h18M3 15h18" strokeWidth={0} fill="none" />
        </svg>
      );
  }
}

/* ─────────────────────────────────────────────────
   Page
───────────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [heroEmail, setHeroEmail] = useState("");
  const [heroOutcome, setHeroOutcome] = useState<WaitlistOutcome>(null);
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const [heroError, setHeroError] = useState<string | null>(null);
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaOutcome, setCtaOutcome] = useState<WaitlistOutcome>(null);
  const [ctaSubmitting, setCtaSubmitting] = useState(false);
  const [ctaError, setCtaError] = useState<string | null>(null);

  useEffect(() => {
    if (heroOutcome !== "already") return;
    const id = window.setTimeout(() => {
      setHeroOutcome(null);
      setHeroEmail("");
    }, WAITLIST_ALREADY_DISMISS_MS);
    return () => window.clearTimeout(id);
  }, [heroOutcome]);

  useEffect(() => {
    if (ctaOutcome !== "already") return;
    const id = window.setTimeout(() => {
      setCtaOutcome(null);
      setCtaEmail("");
    }, WAITLIST_ALREADY_DISMISS_MS);
    return () => window.clearTimeout(id);
  }, [ctaOutcome]);

  /* Scroll-aware nav */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll reveal: sync pass catches nodes already on screen (IO alone can miss first paint). */
  useEffect(() => {
    const reveal = (el: Element) => {
      el.classList.add("in");
    };
    const isInViewport = (el: Element) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const vw = window.innerWidth || 0;
      return r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw;
    };

    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) reveal(e.target);
        }
      },
      {
        rootMargin: "100px 0px 100px 0px",
        threshold: [0, 0.08, 0.15],
      }
    );

    els.forEach((el) => {
      if (isInViewport(el)) reveal(el);
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════
          NAV transparent on dark, white on light
      ══════════════════════════════════════════ */}
      <nav className={`nav ${scrolled ? "scrolled" : "top"}`} aria-label="Primary">
        <div
          className="page-wrap"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >

          {/* Logo */}
          <Link
            href="/"
            aria-label="RoundFit home"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 3,
              textDecoration: "none",
            }}
          >
            <span
              className="display"
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                letterSpacing: "-.03em",
                color: scrolled ? "var(--text-1)" : "#fff",
                transition: "color .3s ease",
              }}
            >
              roundfit
            </span>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--accent)",
                marginTop: 3,
              }}
            />
          </Link>

          {/* Links */}
          <div
            className="hidden md:flex items-center"
            style={{ gap: 32 }}
          >
            {["How it works", "Features", "Recovery"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                style={{
                  fontSize: ".875rem",
                  color: scrolled ? "var(--text-2)" : "rgba(255,255,255,.65)",
                  textDecoration: "none",
                  transition: "color .3s ease",
                }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* CTA orange always: readable on dark hero AND white sections */}
          <a
            href="#waitlist"
            className="btn-orange nav-cta-compact"
            style={{
              padding: "9px 20px",
              fontSize: ".875rem",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Join waitlist
          </a>
        </div>
      </nav>

      <main id="main-content">
      {/* ══════════════════════════════════════════
          HERO dark, full-viewport
          WHOOP darkness + Apple centering + Tesla drama
      ══════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="page-wrap">

          {/* Subtle pill badge context without competing with the headline */}
          <div
            className="h1"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 100,
              padding: "5px 14px 5px 10px",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: ".68rem",
                fontWeight: 600,
                color: "rgba(255,255,255,.45)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
              }}
            >
              Nutrition · Train · Recovery · Decision
            </span>
          </div>

          {/* Headline "Stop guessing" commands, "your fitness." qualifies */}
          <h1
            className="display h2"
            style={{
              fontSize: "clamp(2.35rem, 9.5vw, 8rem)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-.05em",
              maxWidth: 820,
              margin: "0 auto clamp(1rem, 4vw, 1.75rem)",
            }}
          >
            <span style={{ color: "#fff" }}>Nutrition. Train.</span>
            <br />
            <span style={{ color: "rgba(255,255,255,.5)" }}>Recover.</span>
          </h1>

          {/* Subtext visible, not buried */}
          <p
            className="h3"
            style={{
              fontSize: "clamp(0.95rem, 2.8vw, 1.15rem)",
              color: "rgba(255,255,255,.62)",
              lineHeight: 1.75,
              maxWidth: 440,
              margin: "0 auto clamp(1.5rem, 6vw, 2.75rem)",
              paddingLeft: "clamp(0px, 2vw, 8px)",
              paddingRight: "clamp(0px, 2vw, 8px)",
            }}
          >
            RoundFit connects to your health app, logs your food in seconds, and monitors your recovery. Then gives you one clear action, every hour.
          </p>

          {/* Form bigger button, clear CTA */}
          <div
            className="h4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <form
              className="form-row"
              style={{ flexDirection: "column", alignItems: "stretch", gap: 0 }}
              onSubmit={async (e) => {
                e.preventDefault();
                setHeroError(null);
                setHeroSubmitting(true);
                try {
                  const r = await submitWaitlist(heroEmail.trim());
                  if (r.ok) {
                    setHeroOutcome(r.alreadyOnWaitlist ? "already" : "joined");
                  } else {
                    setHeroError(r.error ?? "Try again.");
                  }
                } finally {
                  setHeroSubmitting(false);
                }
              }}
            >
              {heroOutcome === "joined" ? (
                <div className="success-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  You&apos;re on the list. We&apos;ll be in touch soon.
                </div>
              ) : heroOutcome === "already" ? (
                <div className="success-msg waitlist-already">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  You&apos;re already on the waitlist. We&apos;ll email you when we launch.
                </div>
              ) : (
                <>
                  <div className="form-row" style={{ width: "100%" }}>
                  <input
                    type="email"
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={heroSubmitting}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      width: "100%",
                      boxSizing: "border-box",
                      background: "rgba(255,255,255,.09)",
                      color: "#fff",
                      border: "1.5px solid rgba(255,255,255,.14)",
                      borderRadius: 10,
                      padding: "15px 18px",
                      fontSize: "1rem",
                      fontFamily: "var(--font-geist)",
                      transition: "border-color .15s ease",
                      outline: "none",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(255,255,255,.4)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(255,255,255,.14)")
                    }
                  />
                  <button
                    type="submit"
                    className="btn-orange"
                    disabled={heroSubmitting}
                    style={{
                      padding: "clamp(13px, 3.5vw, 15px) clamp(18px, 5vw, 28px)",
                      fontSize: "clamp(0.9rem, 2.8vw, 1rem)",
                      borderRadius: 10,
                      boxSizing: "border-box",
                    }}
                  >
                    {heroSubmitting ? "Sending…" : "Join the Waitlist →"}
                  </button>
                  </div>
                  {heroError ? (
                    <p className="form-error form-error--dark" role="alert" style={{ marginTop: 12 }}>
                      {heroError}
                    </p>
                  ) : null}
                </>
              )}
            </form>
          </div>

          {/* Social proof */}
          {!heroOutcome && (
            <p
              className="h4"
              style={{
                marginTop: 14,
                fontSize: ".75rem",
                color: "rgba(255,255,255,.22)",
                letterSpacing: ".01em",
              }}
            >
              847 people already on the waitlist
            </p>
          )}

          {/* App card white on dark, dramatic shadow */}
          <div className="h5" style={{ marginTop: "clamp(2.5rem, 10vw, 5rem)" }}>
            <AppCard />
          </div>

          {/* Scroll hint */}
          <div
            style={{
              marginTop: "3.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ fontSize: ".68rem", color: "rgba(255,255,255,.18)", letterSpacing: ".1em", textTransform: "uppercase" }}>
              Scroll
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          THREE PILLARS: Calories · Train · Recovery
      ══════════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div className="page-wrap">
          <span className="eyebrow" style={{ marginBottom: 20 }} data-reveal>
            What we track
          </span>
          <h2
            className="display"
            data-reveal
            data-d="1"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)",
              fontWeight: 800,
              letterSpacing: "-.045em",
              lineHeight: 1.08,
              marginBottom: "clamp(2rem, 5vw, 3rem)",
              maxWidth: 620,
            }}
          >
            Three pillars.
            <br />
            <span style={{ color: "var(--text-2)" }}>One clear decision.</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "clamp(12px, 3vw, 20px)",
            }}
          >
            {[
              {
                label: "Nutrition",
                icon: (
                  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19V5M4 19h16M8 17V9m4 8V6m4 11v-5" />
                  </svg>
                ),
                desc: "AI food logging plus live health app data. Your real-time calorie position, not an estimate.",
              },
              {
                label: "Train",
                icon: (
                  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4M6 8h12M6 16h12" />
                  </svg>
                ),
                desc: "Workout guidance calibrated to your goals and today's calorie state. Live burn data pulled from your health app. Push when it matters. Rest when it doesn't.",
              },
              {
                label: "Recovery",
                icon: (
                  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
                desc: "Sleep, HRV, and readiness score pulled from Apple Health or Google Fit every morning. Know when to push hard and when to protect your gains.",
              },
            ].map(({ label, icon, desc }, i) => (
              <div
                key={label}
                data-reveal
                data-d={String(i + 1)}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "clamp(20px, 4vw, 28px)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(249,115,22,.08)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  {icon}
                </div>
                <h3
                  className="display"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    letterSpacing: "-.025em",
                    marginBottom: 10,
                    color: "var(--text-1)",
                  }}
                >
                  {label}
                </h3>
                <p style={{ fontSize: ".9rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROBLEM white, editorial punch
      ══════════════════════════════════════════ */}
      <section className="section-pad">
        <div className="page-wrap">
          <div style={{ maxWidth: 680 }}>

            <span
              className="eyebrow"
              style={{ marginBottom: 20 }}
              data-reveal
            >
              The problem
            </span>

            <h2
              className="display"
              data-reveal
              data-d="1"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)",
                fontWeight: 800,
                letterSpacing: "-.045em",
                lineHeight: 1.08,
                marginBottom: "clamp(1.5rem, 5vw, 2.75rem)",
              }}
            >
              Three apps.
              <br />
              Three dashboards.
              <br />
              <span style={{ color: "var(--text-2)" }}>Zero decisions.</span>
            </h2>

            <div
              data-reveal
              data-d="2"
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              {[
                "You track your meals",
                "You track your workouts",
                "You monitor your sleep",
                "You still don't know if you're making progress",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 14 }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: "1.5px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#d4d4d4",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "clamp(0.95rem, 2.8vw, 1.05rem)",
                      color: "var(--text-1)",
                      lineHeight: 1.45,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SOLUTION light surface, 3 cards
      ══════════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--surface)" }}>
        <div className="page-wrap">

          <span className="eyebrow" style={{ marginBottom: 20 }} data-reveal>
            The solution
          </span>

          <h2
            className="display"
            data-reveal
            data-d="1"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-.045em",
              lineHeight: 1.08,
              marginBottom: "clamp(2rem, 5vw, 3rem)",
              maxWidth: 600,
            }}
          >
            We turn your data
            <br />into decisions.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
              gap: "clamp(12px, 3vw, 16px)",
            }}
          >
            {SOLUTION.map(({ q, a }, i) => (
              <div
                key={q}
                className="sol-card"
                data-reveal
                data-d={String(i + 1)}
              >
                <p
                  style={{
                    fontSize: ".875rem",
                    color: "var(--text-3)",
                    marginBottom: 18,
                  }}
                >
                  {q}
                </p>
                <div
                  style={{
                    height: 1,
                    background: "var(--border)",
                    marginBottom: 20,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      color: "var(--accent)",
                      marginTop: 3,
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p
                    style={{
                      fontSize: ".95rem",
                      fontWeight: 600,
                      color: "var(--text-1)",
                      lineHeight: 1.55,
                    }}
                  >
                    {a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS white, 3 numbered steps
      ══════════════════════════════════════════ */}
      <section id="how-it-works" className="section-pad">
        <div className="page-wrap">

          <span className="eyebrow" style={{ marginBottom: 20 }} data-reveal>
            How it works
          </span>

          <h2
            className="display"
            data-reveal
            data-d="1"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-.045em",
              lineHeight: 1.08,
              marginBottom: "clamp(2rem, 6vw, 3.5rem)",
            }}
          >
            Three steps.
            <br />
            <span style={{ color: "var(--text-2)" }}>That&apos;s it.</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: "clamp(2rem, 6vw, 3rem)",
            }}
          >
            {STEPS.map(({ n, title, desc }, i) => (
              <div key={n} data-reveal data-d={String(i + 1)}>
                <div className="step-n" style={{ marginBottom: 22 }}>
                  {n}
                </div>
                <h3
                  className="display"
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    letterSpacing: "-.025em",
                    marginBottom: 10,
                    color: "var(--text-1)",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: ".9rem",
                    color: "var(--text-2)",
                    lineHeight: 1.72,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES surface, 2×2 grid
      ══════════════════════════════════════════ */}
      <section
        id="features"
        className="section-pad"
        style={{ background: "var(--surface)" }}
      >
        <div className="page-wrap">

          <span className="eyebrow" style={{ marginBottom: 20 }} data-reveal>
            Features
          </span>

          <h2
            className="display"
            data-reveal
            data-d="1"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-.045em",
              lineHeight: 1.08,
              marginBottom: "clamp(2rem, 6vw, 3.5rem)",
              maxWidth: 460,
            }}
          >
            Built around
            <br />
            <span style={{ color: "var(--text-2)" }}>three pillars.</span>
          </h2>

          {(() => {
            let globalIndex = 0;
            return FEATURE_PILLARS.map(({ pillar, features }) => (
              <div key={pillar} style={{ marginBottom: "clamp(2rem, 6vw, 3.5rem)" }}>
                {/* Pillar label */}
                <div
                  data-reveal
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: "clamp(1rem, 3vw, 1.5rem)",
                  }}
                >
                  <span
                    className="display"
                    style={{
                      fontSize: ".72rem",
                      fontWeight: 700,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                    }}
                  >
                    {pillar}
                  </span>
                  <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                </div>

                {/* Cards for this pillar */}
                <div className="feature-grid">
                  {features.map(({ name, desc, icon }) => {
                    const idx = globalIndex++;
                    return (
                      <article
                        key={name}
                        className="feature-card"
                        data-reveal
                        data-d={String((idx % 2) + 1)}
                        aria-labelledby={`feature-${idx}`}
                      >
                        <span className="feature-card__index" aria-hidden>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="feature-card__icon" aria-hidden>
                          <FeatureCardGlyph icon={icon} />
                        </div>
                        <h3 className="feature-card__title" id={`feature-${idx}`}>
                          {name}
                        </h3>
                        <p className="feature-card__desc">{desc}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
            ));
          })()}

        </div>
      </section>

      {/* ══════════════════════════════════════════
          RECOVERY dark callout
      ══════════════════════════════════════════ */}
      <section
        id="recovery"
        className="section-pad"
        style={{ background: "#0f0f0f" }}
      >
        <div className="page-wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: "clamp(2rem, 6vw, 4rem)",
              alignItems: "center",
            }}
          >
            <div>
              <span
                className="eyebrow-muted"
                style={{ marginBottom: 20 }}
                data-reveal
              >
                Recovery
              </span>
              <h2
                className="display"
                data-reveal
                data-d="1"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-.045em",
                  lineHeight: 1.08,
                  color: "#fff",
                  marginBottom: "clamp(1rem, 3vw, 1.5rem)",
                }}
              >
                Know when to push.
                <br />
                <span style={{ color: "rgba(255,255,255,.45)" }}>
                  Know when to rest.
                </span>
              </h2>
              <p
                data-reveal
                data-d="2"
                style={{
                  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                  color: "rgba(255,255,255,.5)",
                  lineHeight: 1.75,
                  maxWidth: 420,
                }}
              >
                RoundFit reads HRV, sleep quality, and resting heart rate from Apple Health or Google Fit every morning. Whatever watch you wear, Apple Watch, Fitbit, or Garmin, if it syncs to your health app, we read it. If you&apos;re under-recovered, we dial back intensity so you don&apos;t sabotage your gains.
              </p>
            </div>

            <div
              data-reveal
              data-d="3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {[
                { label: "Recovery Score", value: "78", unit: "/100", color: "#22c55e" },
                { label: "Sleep", value: "7.4", unit: "hrs", color: "var(--accent)" },
                { label: "HRV", value: "62", unit: "ms", color: "#a78bfa" },
                { label: "Resting HR", value: "54", unit: "bpm", color: "#38bdf8" },
                { label: "Soreness", value: "3", unit: "/10", color: "#fb923c" },
              ].map(({ label, value, unit, color }) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.07)",
                    borderRadius: 14,
                    padding: "clamp(14px, 3vw, 20px)",
                  }}
                >
                  <p style={{ fontSize: ".68rem", color: "rgba(255,255,255,.35)", marginBottom: 10, letterSpacing: ".05em", textTransform: "uppercase" }}>
                    {label}
                  </p>
                  <p style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-.04em", color, lineHeight: 1 }}>
                    {value}
                    <span style={{ fontSize: ".65em", fontWeight: 500, color: "rgba(255,255,255,.3)", marginLeft: 3 }}>{unit}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA dark, bookends the page like Tesla
      ══════════════════════════════════════════ */}
      <section
        id="waitlist"
        className="section-pad-cta"
        style={{
          background: "#0a0a0a",
          textAlign: "center",
        }}
      >
        <div className="page-wrap">

          <span
            className="eyebrow-muted"
            style={{ marginBottom: 24 }}
            data-reveal
          >
            Early access
          </span>

          <h2
            className="display"
            data-reveal
            data-d="1"
            style={{
              fontSize: "clamp(2rem, 6.5vw, 5rem)",
              fontWeight: 800,
              letterSpacing: "-.045em",
              lineHeight: 1.0,
              color: "#fff",
              marginBottom: "clamp(0.75rem, 3vw, 1.25rem)",
            }}
          >
            Nutrition. Training.
            <br />Recovery. One decision.
          </h2>

          <p
            data-reveal
            data-d="2"
            style={{
              fontSize: "clamp(0.95rem, 2.8vw, 1.05rem)",
              color: "rgba(255,255,255,.5)",
              marginBottom: "clamp(1.5rem, 5vw, 2.75rem)",
              lineHeight: 1.6,
              paddingLeft: "clamp(0px, 3vw, 12px)",
              paddingRight: "clamp(0px, 3vw, 12px)",
            }}
          >
            The first fitness app that connects all three and tells you exactly what to do. Launching soon at{" "}
            <span style={{ color: "rgba(255,255,255,.8)", fontWeight: 500 }}>
              roundfit.co
            </span>
            .
          </p>

          <div
            data-reveal
            data-d="3"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <EmailForm
              email={ctaEmail}
              setEmail={setCtaEmail}
              outcome={ctaOutcome}
              submitting={ctaSubmitting}
              error={ctaError}
              onSubmit={async (e) => {
                e.preventDefault();
                setCtaError(null);
                setCtaSubmitting(true);
                try {
                  const r = await submitWaitlist(ctaEmail.trim());
                  if (r.ok) {
                    setCtaOutcome(r.alreadyOnWaitlist ? "already" : "joined");
                  } else {
                    setCtaError(r.error ?? "Try again.");
                  }
                } finally {
                  setCtaSubmitting(false);
                }
              }}
              dark
            />
          </div>

        </div>
      </section>

      </main>

      {/* ══════════════════════════════════════════
          FOOTER dark, minimal
      ══════════════════════════════════════════ */}
      <footer
        style={{
          background: "#0a0a0a",
          borderTop: "1px solid rgba(255,255,255,.06)",
          padding: "24px 0 max(28px, env(safe-area-inset-bottom))",
        }}
      >
        <div className="page-wrap footer-inner">
          {/* Logo */}
          <Link
            href="/"
            aria-label="RoundFit home"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            style={{ display: "flex", alignItems: "flex-start", gap: 3, textDecoration: "none" }}
          >
            <span
              className="display"
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                letterSpacing: "-.03em",
                color: "rgba(255,255,255,.7)",
              }}
            >
              roundfit
            </span>
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--accent)",
                marginTop: 3,
              }}
            />
          </Link>

          {/* Links */}
          <div className="footer-links">
            {["Contact", "Privacy", "Twitter", "Instagram"].map((l) => (
              <a key={l} href="#" className="footer-link">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </>
  );
}
