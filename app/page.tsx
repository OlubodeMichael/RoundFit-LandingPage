"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type InstructionIcon = "walk" | "bike" | "run" | "stairs";

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

/* ─────────────────────────────────────────────────
   Email form: dark and light variants
───────────────────────────────────────────────── */
function EmailForm({
  email,
  setEmail,
  submitted,
  onSubmit,
  dark,
}: {
  email: string;
  setEmail: (v: string) => void;
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
  dark?: boolean;
}) {
  if (submitted) {
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

  return (
    <form className="form-row" onSubmit={onSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className={dark ? "input-dark" : "input-light"}
      />
      <button type="submit" className="btn-orange">
        {dark ? "Get Early Access" : "Join the Waitlist"}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────────
   Page data
───────────────────────────────────────────────── */
const SOLUTION = [
  {
    q: "Ate too much?",
    a: "We calculate exactly how to make up for it before your day ends.",
  },
  {
    q: "Didn't move enough?",
    a: "We give you one specific action, with the time and effort required.",
  },
  {
    q: "On track?",
    a: "We confirm it and adjust in real time so you stay there.",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Connect your smartwatch",
    desc: "Apple Watch or Fitbit. Real calorie burn data, not estimates.",
  },
  {
    n: 2,
    title: "Log your food",
    desc: "Snap a photo or speak it. GPT-4 Vision identifies and logs your calories in seconds.",
  },
  {
    n: 3,
    title: "Get real-time instructions",
    desc: "One clear action, recalculated every hour. No dashboard to decode.",
  },
];

type FeatureIconId = "delta" | "watch" | "camera" | "streak";

const FEATURES: { name: string; desc: string; icon: FeatureIconId }[] = [
  {
    name: "Real-time calorie delta",
    desc: "Your live position against your goal, updated throughout the day.",
    icon: "delta",
  },
  {
    name: "Smartwatch integration",
    desc: "Apple Watch and Fitbit supported. Real burn data, not estimates.",
    icon: "watch",
  },
  {
    name: "AI food recognition",
    desc: "Photograph any meal. Calories logged in under 3 seconds.",
    icon: "camera",
  },
  {
    name: "Daily score + streaks",
    desc: "A simple daily score and streak to keep consistency rewarding.",
    icon: "streak",
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
  }
}

/* ─────────────────────────────────────────────────
   Page
───────────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [heroEmail, setHeroEmail] = useState("");
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  /* Scroll-aware nav */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll reveal — sync pass catches nodes already on screen (IO alone can miss first paint). */
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
            aria-label="Calore home"
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
              calore
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
            {["How it works", "Features"].map((l) => (
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
              AI Decision Engine
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
            <span style={{ color: "#fff" }}>Stop guessing</span>
            <br />
            <span style={{ color: "rgba(255,255,255,.5)" }}>your fitness.</span>
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
            Connect your smartwatch. Track your food.
            Get told exactly what to do to hit your goal.
          </p>

          {/* Form bigger button, clear CTA */}
          <div
            className="h4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <form
              className="form-row"
              onSubmit={(e) => {
                e.preventDefault();
                setHeroSubmitted(true);
              }}
            >
              {heroSubmitted ? (
                <div className="success-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  You&apos;re on the list. We&apos;ll be in touch soon.
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
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
                    style={{
                      padding: "clamp(13px, 3.5vw, 15px) clamp(18px, 5vw, 28px)",
                      fontSize: "clamp(0.9rem, 2.8vw, 1rem)",
                      borderRadius: 10,
                      boxSizing: "border-box",
                    }}
                  >
                    Join the Waitlist →
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Social proof */}
          {!heroSubmitted && (
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
              Most fitness apps
              <br />
              give you numbers.
              <br />
              <span style={{ color: "var(--text-2)" }}>Not answers.</span>
            </h2>

            <div
              data-reveal
              data-d="2"
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              {[
                "You log your meals",
                "You track your workouts",
                "You still don't know if you're on track",
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
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
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
            Everything you need.
            <br />
            <span style={{ color: "var(--text-2)" }}>
              Nothing you don&apos;t.
            </span>
          </h2>

          <div className="feature-grid">
            {FEATURES.map(({ name, desc, icon }, i) => (
              <article
                key={name}
                className="feature-card"
                data-reveal
                data-d={String((i % 2) + 1)}
                aria-labelledby={`feature-${i}`}
              >
                <span className="feature-card__index" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="feature-card__icon" aria-hidden>
                  <FeatureCardGlyph icon={icon} />
                </div>
                <h3 className="feature-card__title" id={`feature-${i}`}>
                  {name}
                </h3>
                <p className="feature-card__desc">{desc}</p>
              </article>
            ))}
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
            Ready to stop
            <br />guessing?
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
            Launching soon at{" "}
            <span style={{ color: "rgba(255,255,255,.8)", fontWeight: 500 }}>
              calore.fit
            </span>
            . Join the waitlist now.
          </p>

          <div
            data-reveal
            data-d="3"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <EmailForm
              email={ctaEmail}
              setEmail={setCtaEmail}
              submitted={ctaSubmitted}
              onSubmit={(e) => {
                e.preventDefault();
                setCtaSubmitted(true);
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
          <div style={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
            <span
              className="display"
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                letterSpacing: "-.03em",
                color: "rgba(255,255,255,.7)",
              }}
            >
              calore
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
          </div>

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
