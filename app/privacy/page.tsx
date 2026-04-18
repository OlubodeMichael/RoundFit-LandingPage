import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How RoundFit collects, uses, and protects your personal and health data. Our commitment to your privacy.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "article",
    url: "/privacy",
    title: "Privacy Policy | RoundFit",
    description:
      "How RoundFit collects, uses, and protects your personal and health data.",
    siteName: "RoundFit",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | RoundFit",
    description:
      "How RoundFit collects, uses, and protects your personal and health data.",
  },
};

const LAST_UPDATED = "April 2026";

type Section = {
  id: string;
  number: string;
  title: string;
};

const SECTIONS: Section[] = [
  { id: "who-we-are", number: "01", title: "Who we are" },
  { id: "what-we-collect", number: "02", title: "What data we collect" },
  { id: "why-we-collect", number: "03", title: "Why we collect it" },
  { id: "how-we-use-ai", number: "04", title: "How we use AI" },
  { id: "sensitive-data", number: "05", title: "Health & sensitive data" },
  { id: "sharing", number: "06", title: "Who we share data with" },
  { id: "healthkit", number: "07", title: "Apple HealthKit specific terms" },
  { id: "retention", number: "08", title: "Data retention" },
  { id: "your-rights", number: "09", title: "Your rights" },
  { id: "security", number: "10", title: "Data security" },
  { id: "children", number: "11", title: "Children" },
  { id: "changes", number: "12", title: "Changes to this policy" },
  { id: "contact", number: "13", title: "Contact" },
];

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: "RoundFit Privacy Policy",
    url: `${SITE_URL}/privacy`,
    dateModified: "2026-04-01",
    publisher: {
      "@type": "Organization",
      name: "RoundFit",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ══════════════════════════════════════════
          NAV light, static (no hero behind it)
      ══════════════════════════════════════════ */}
      <nav className="nav scrolled" aria-label="Primary">
        <div
          className="page-wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            aria-label="RoundFit home"
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
                color: "var(--text-1)",
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

          <Link
            href="/#waitlist"
            className="btn-orange nav-cta-compact"
            style={{
              padding: "9px 20px",
              fontSize: ".875rem",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Join waitlist
          </Link>
        </div>
      </nav>

      <main id="main-content">
        {/* ══════════════════════════════════════════
            HEADER dark band with title
        ══════════════════════════════════════════ */}
        <section
          style={{
            background: "#0a0a0a",
            color: "#fff",
            paddingTop: "clamp(6.5rem, 14vw, 9rem)",
            paddingBottom: "clamp(3rem, 7vw, 5rem)",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <div className="page-wrap" style={{ maxWidth: 760 }}>
            <span className="eyebrow-muted" style={{ marginBottom: 18 }}>
              Legal
            </span>
            <h1
              className="display"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 3.75rem)",
                fontWeight: 800,
                letterSpacing: "-.04em",
                lineHeight: 1.02,
                margin: "14px 0 20px",
              }}
            >
              Privacy Policy
            </h1>
            <p
              style={{
                fontSize: ".95rem",
                color: "rgba(255,255,255,.6)",
                lineHeight: 1.6,
                maxWidth: 560,
              }}
            >
              How we collect, use, and protect your personal and health data.
              We treat every line of this like a promise.
            </p>
            <div
              style={{
                marginTop: 28,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px 6px 10px",
                borderRadius: 100,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                fontSize: ".78rem",
                color: "rgba(255,255,255,.75)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
              Last updated {LAST_UPDATED}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            ARTICLE body
        ══════════════════════════════════════════ */}
        <article className="policy">
          <div className="page-wrap policy-wrap">
            {/* Table of contents */}
            <aside className="policy-toc" aria-label="On this page">
              <p className="policy-toc__title">On this page</p>
              <ol className="policy-toc__list">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>
                      <span className="policy-toc__n">{s.number}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <div className="policy-body">
              <Section id="who-we-are" number="01" title="Who we are">
                <p>
                  RoundFit is a personal nutrition and health intelligence app
                  built to help you understand your body through data. RoundFit
                  is operated by the RoundFit team.
                </p>
                <p>
                  If you have any questions about this policy, contact us at{" "}
                  <a href="mailto:privacy@roundfit.com" className="policy-a">
                    privacy@roundfit.com
                  </a>
                  .
                </p>
              </Section>

              <Section id="what-we-collect" number="02" title="What data we collect">
                <SubHeading>Data you give us directly</SubHeading>
                <ul className="policy-list">
                  <li>Name, email address, and password when you create an account</li>
                  <li>Physical stats including age, biological sex, height, and weight</li>
                  <li>Health goals and activity level</li>
                  <li>
                    Menstrual cycle data including period start dates, cycle
                    length, and life stage — if you choose to provide it
                  </li>
                  <li>Food logs including meal names, calories, and macronutrients</li>
                  <li>
                    Morning check-in responses including sleep quality, energy
                    level, and workout details
                  </li>
                  <li>Weight logs you choose to record</li>
                  <li>Any notes or manual entries you add</li>
                </ul>

                <SubHeading>Data we collect automatically from your device</SubHeading>
                <ul className="policy-list">
                  <li>
                    Steps, active calories burned, and distance from Apple
                    HealthKit or Google Health Connect — if you grant permission
                  </li>
                  <li>
                    Sleep duration and quality from Apple HealthKit or Google
                    Health Connect — if you grant permission
                  </li>
                  <li>
                    Resting heart rate and heart rate variability, if available
                    from your connected devices
                  </li>
                  <li>App usage data including screens visited and features used</li>
                </ul>

                <SubHeading>Data from third-party services</SubHeading>
                <ul className="policy-list">
                  <li>
                    Food and nutrition data from Edamam and Open Food Facts
                    when you search for or log food
                  </li>
                  <li>
                    Subscription and payment status from RevenueCat — we never
                    see or store your payment card details
                  </li>
                </ul>
              </Section>

              <Section id="why-we-collect" number="03" title="Why we collect it">
                <p>
                  We collect your data for one reason — to give you accurate,
                  personalised nutrition and health guidance. Specifically, we
                  use your data to:
                </p>
                <ul className="policy-list">
                  <li>
                    Calculate your daily calorie and macro targets based on your
                    body and goals
                  </li>
                  <li>
                    Adjust your targets daily based on your activity, sleep, and
                    recovery
                  </li>
                  <li>
                    Adjust your targets based on your menstrual cycle phase if
                    you are a woman
                  </li>
                  <li>
                    Generate personalised daily insights about your nutrition
                    and health patterns
                  </li>
                  <li>
                    Identify patterns in your data over time — for example the
                    connection between your sleep quality and calorie intake
                  </li>
                  <li>
                    Power our AI-generated insights for premium subscribers
                    using Anthropic&apos;s Claude API
                  </li>
                  <li>
                    Send you notifications you have opted into, such as morning
                    check-in reminders
                  </li>
                  <li>Process your subscription and manage your account</li>
                </ul>
              </Section>

              <Section id="how-we-use-ai" number="04" title="How we use AI">
                <p>
                  Premium subscribers receive personalised insights generated
                  by Anthropic&apos;s Claude AI. To generate these insights we
                  send a summary of your recent health and nutrition data to
                  Anthropic&apos;s API. This includes:
                </p>
                <ul className="policy-list">
                  <li>Your last 7 days of food logs</li>
                  <li>Your last 7 days of check-in responses</li>
                  <li>Your current cycle phase if you are a female user</li>
                  <li>Any confirmed patterns we have detected in your data</li>
                  <li>Your calorie and macro targets</li>
                </ul>
                <p>
                  We do not send your name, email, or any directly identifying
                  information to Anthropic. The data is used only to generate
                  your insight and is not used to train AI models.
                  Anthropic&apos;s data handling practices are governed by
                  their privacy policy at{" "}
                  <a
                    href="https://www.anthropic.com/privacy"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="policy-a"
                  >
                    anthropic.com/privacy
                  </a>
                  .
                </p>
              </Section>

              <Section
                id="sensitive-data"
                number="05"
                title="Health & sensitive data"
              >
                <p>
                  We collect health data including menstrual cycle information,
                  sleep data, heart rate, and body metrics. This is sensitive
                  data and we treat it as such.
                </p>
                <ul className="policy-list">
                  <li>We never sell your health data to anyone.</li>
                  <li>We never share your health data with advertisers.</li>
                  <li>
                    We never use your health data to make inferences unrelated
                    to the health guidance you asked for.
                  </li>
                  <li>
                    Menstrual cycle data is used only to adjust your nutrition
                    targets and generate cycle-specific insights.
                  </li>
                  <li>
                    You can delete all of your data at any time from the
                    profile screen.
                  </li>
                </ul>
              </Section>

              <Section id="sharing" number="06" title="Who we share data with">
                <p>
                  We share your data only with the following third parties,
                  and only to the extent necessary to operate the app.
                </p>

                <div className="policy-partners">
                  <PartnerRow
                    name="Supabase"
                    purpose="Database and authentication provider. Your data is stored on Supabase's servers. Supabase is SOC 2 compliant."
                    href="https://supabase.com/privacy"
                    hrefLabel="supabase.com/privacy"
                  />
                  <PartnerRow
                    name="Anthropic"
                    purpose="AI provider used to generate personalised insights for premium users. Anonymised data summary only. No identifying information shared."
                    href="https://www.anthropic.com/privacy"
                    hrefLabel="anthropic.com/privacy"
                  />
                  <PartnerRow
                    name="Edamam"
                    purpose="Food and nutrition database used when you search for food. Search queries only, no personal data shared."
                    href="https://www.edamam.com/privacy"
                    hrefLabel="edamam.com/privacy"
                  />
                  <PartnerRow
                    name="Open Food Facts"
                    purpose="Open-source food database used for barcode lookups. Barcode queries only, no personal data shared."
                    href="https://openfoodfacts.org/privacy"
                    hrefLabel="openfoodfacts.org/privacy"
                  />
                  <PartnerRow
                    name="RevenueCat"
                    purpose="Subscription management. They handle your subscription status. We never see your payment details."
                    href="https://www.revenuecat.com/privacy"
                    hrefLabel="revenuecat.com/privacy"
                  />
                  <PartnerRow
                    name="Apple HealthKit"
                    purpose="If you grant permission, we read health data from your iPhone or Apple Watch. We do not write data back to HealthKit. We do not share HealthKit data with third parties, including advertisers."
                  />
                  <PartnerRow
                    name="Google Health Connect"
                    purpose="Same as above for Android users."
                  />
                </div>

                <p className="policy-callout">
                  We do not sell your data. We do not share your data with
                  advertisers. We do not share your data with data brokers.
                </p>
              </Section>

              <Section
                id="healthkit"
                number="07"
                title="Apple HealthKit specific terms"
              >
                <p>
                  Data obtained from Apple HealthKit is used only to provide
                  and improve health and fitness features within RoundFit. We
                  do not use HealthKit data for advertising, market research,
                  or any purpose unrelated to health and fitness. We do not
                  share HealthKit data with third parties except as required to
                  provide the service, and never for advertising purposes. This
                  is required by Apple and we comply fully.
                </p>
              </Section>

              <Section id="retention" number="08" title="Data retention">
                <p>
                  We keep your data for as long as your account is active. If
                  you delete your account, all of your personal data is
                  permanently deleted from our servers within 30 days. This
                  includes all food logs, health data, check-ins, cycle logs,
                  insights, and patterns.
                </p>
                <p>
                  If you stop using the app but do not delete your account,
                  your data is retained indefinitely so it is available when
                  you return.
                </p>
              </Section>

              <Section id="your-rights" number="09" title="Your rights">
                <p>
                  Depending on where you live, you have the following rights.
                </p>

                <SubHeading>All users</SubHeading>
                <ul className="policy-list">
                  <li>
                    <strong>Access your data</strong> — view all your data in
                    the app at any time.
                  </li>
                  <li>
                    <strong>Delete your data</strong> — delete your account
                    from profile settings and all data is permanently removed.
                  </li>
                  <li>
                    <strong>Export your data</strong> — contact us at{" "}
                    <a href="mailto:privacy@roundfit.com" className="policy-a">
                      privacy@roundfit.com
                    </a>{" "}
                    and we will send you a copy of your data within 30 days.
                  </li>
                  <li>
                    <strong>Correct your data</strong> — update any of your
                    personal information from the profile screen at any time.
                  </li>
                </ul>

                <SubHeading>European users (GDPR)</SubHeading>
                <ul className="policy-list">
                  <li>Right to restrict processing</li>
                  <li>Right to object to processing</li>
                  <li>Right to data portability</li>
                  <li>Right to lodge a complaint with your supervisory authority</li>
                </ul>

                <SubHeading>California users (CCPA)</SubHeading>
                <ul className="policy-list">
                  <li>Right to know what personal information is collected</li>
                  <li>
                    Right to know whether personal information is sold or
                    disclosed and to whom
                  </li>
                  <li>
                    Right to opt out of the sale of personal information — we
                    do not sell personal information
                  </li>
                  <li>Right to non-discrimination for exercising your rights</li>
                </ul>

                <p>
                  To exercise any of these rights, contact us at{" "}
                  <a href="mailto:privacy@roundfit.com" className="policy-a">
                    privacy@roundfit.com
                  </a>
                  .
                </p>
              </Section>

              <Section id="security" number="10" title="Data security">
                <p>
                  We take reasonable technical and organisational measures to
                  protect your data including:
                </p>
                <ul className="policy-list">
                  <li>All data is encrypted in transit using TLS</li>
                  <li>All data is encrypted at rest in our database</li>
                  <li>
                    Authentication is handled by Supabase, which implements
                    industry-standard security practices
                  </li>
                  <li>API access requires authentication on every request</li>
                  <li>
                    Row level security ensures users can only access their own
                    data
                  </li>
                  <li>We never store payment card details</li>
                </ul>
                <p>
                  No system is completely secure. If you discover a security
                  vulnerability please contact us immediately at{" "}
                  <a href="mailto:security@roundfit.com" className="policy-a">
                    security@roundfit.com
                  </a>
                  .
                </p>
              </Section>

              <Section id="children" number="11" title="Children">
                <p>
                  RoundFit is not intended for users under the age of 16. We
                  do not knowingly collect personal data from children under
                  16. If you believe a child has created an account, please
                  contact us at{" "}
                  <a href="mailto:privacy@roundfit.com" className="policy-a">
                    privacy@roundfit.com
                  </a>{" "}
                  and we will delete the account immediately.
                </p>
              </Section>

              <Section id="changes" number="12" title="Changes to this policy">
                <p>
                  We may update this policy from time to time. If we make
                  significant changes we will notify you via email or an in-app
                  notification before the changes take effect. The date at the
                  top of this policy shows when it was last updated. Continued
                  use of the app after changes take effect means you accept the
                  updated policy.
                </p>
              </Section>

              <Section id="contact" number="13" title="Contact">
                <p>
                  If you have any questions about this privacy policy or how
                  we handle your data, contact us:
                </p>
                <div className="policy-contact">
                  <div className="policy-contact__row">
                    <span className="policy-contact__label">Email</span>
                    <a
                      href="mailto:privacy@roundfit.com"
                      className="policy-a"
                    >
                      privacy@roundfit.com
                    </a>
                  </div>
                  <div className="policy-contact__row">
                    <span className="policy-contact__label">Security</span>
                    <a
                      href="mailto:security@roundfit.com"
                      className="policy-a"
                    >
                      security@roundfit.com
                    </a>
                  </div>
                  <div className="policy-contact__row">
                    <span className="policy-contact__label">Company</span>
                    <span>RoundFit</span>
                  </div>
                </div>
              </Section>

              <div className="policy-footer-note">
                <p>
                  Thanks for reading all the way through. If there&apos;s
                  anything unclear, tell us — this document gets better every
                  time someone asks a good question.
                </p>
                <Link href="/" className="policy-back">
                  ← Back to home
                </Link>
              </div>
            </div>
          </div>
        </article>
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
          <Link
            href="/"
            aria-label="RoundFit home"
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

          <div className="footer-links">
            <a href="mailto:privacy@roundfit.com" className="footer-link">
              Contact
            </a>
            <Link href="/privacy" className="footer-link">
              Privacy
            </Link>
            <a
              href="https://twitter.com/roundfit"
              target="_blank"
              rel="noreferrer noopener"
              className="footer-link"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com/roundfit"
              target="_blank"
              rel="noreferrer noopener"
              className="footer-link"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="policy-section">
      <div className="policy-section__head">
        <span className="policy-section__num">{number}</span>
        <h2 className="policy-section__title">{title}</h2>
      </div>
      <div className="policy-section__body">{children}</div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="policy-subheading">{children}</h3>;
}

function PartnerRow({
  name,
  purpose,
  href,
  hrefLabel,
}: {
  name: string;
  purpose: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="policy-partner">
      <div className="policy-partner__name">{name}</div>
      <div className="policy-partner__purpose">
        {purpose}
        {href && hrefLabel ? (
          <>
            {" "}
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="policy-a policy-a--muted"
            >
              {hrefLabel} ↗
            </a>
          </>
        ) : null}
      </div>
    </div>
  );
}
