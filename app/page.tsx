"use client";

import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────
   Hero app-card mockup
   White card on dark bg (the "product proof")
───────────────────────────────────────────────── */
function AppCard() {
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
      {/* Card header */}
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

      {/* Goal number */}
      <p
        style={{ fontSize: ".76rem", color: "#aaa", marginBottom: 6 }}
      >
        You need to burn
      </p>
      <p
        className="display"
        style={{
          fontSize: "clamp(2.65rem, 11vw, 4.25rem)",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-.05em",
          color: "var(--accent)",
        }}
      >
        300
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
        calories
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: "#f0f0f0", marginBottom: 18 }} />

      {/* Instruction */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}
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
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <div>
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
            }}
          >
            Walk 40 minutes
          </p>
        </div>
      </div>

      {/* Progress */}
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
          74%
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
          style={{
            width: "74%",
            height: "100%",
            background: "var(--accent)",
            borderRadius: 100,
          }}
        />
      </div>
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

const FEATURES = [
  {
    name: "Real-time calorie delta",
    desc: "Your live position against your goal, updated throughout the day.",
  },
  {
    name: "Smartwatch integration",
    desc: "Apple Watch and Fitbit supported. Real burn data, not estimates.",
  },
  {
    name: "AI food recognition",
    desc: "Photograph any meal. Calories logged in under 3 seconds.",
  },
  {
    name: "Daily score + streaks",
    desc: "A simple daily score and streak to keep consistency rewarding.",
  },
];

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

  /* Scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>

      {/* ══════════════════════════════════════════
          NAV transparent on dark, white on light
      ══════════════════════════════════════════ */}
      <nav className={`nav ${scrolled ? "scrolled" : "top"}`}>
        <div
          className="page-wrap"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
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
          </div>

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
          <button
            type="button"
            className="btn-orange nav-cta-compact"
            style={{ padding: "9px 20px", fontSize: ".875rem", borderRadius: "8px" }}
          >
            Join waitlist
          </button>
        </div>
      </nav>

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

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "clamp(1.75rem, 4vw, 2.5rem) clamp(2rem, 6vw, 5rem)",
            }}
          >
            {FEATURES.map(({ name, desc }, i) => (
              <div
                key={name}
                className="feature-row"
                data-reveal
                data-d={String((i % 2) + 1)}
              >
                <div
                  style={{
                    color: "var(--accent)",
                    marginTop: 3,
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: 5,
                      color: "var(--text-1)",
                    }}
                  >
                    {name}
                  </p>
                  <p
                    style={{
                      fontSize: ".875rem",
                      color: "var(--text-2)",
                      lineHeight: 1.65,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA dark, bookends the page like Tesla
      ══════════════════════════════════════════ */}
      <section
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

    </div>
  );
}
