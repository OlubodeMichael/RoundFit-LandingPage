import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const defaultTitle = "RoundFit: Calories, Train & Recovery";
const defaultDescription =
  "RoundFit tracks your calories, guides your training, and monitors your recovery. One clear daily decision. Health app sync, AI food logging, and real-time workout guidance.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "RoundFit",
      description: defaultDescription,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "RoundFit",
      url: SITE_URL,
      description: defaultDescription,
    },
    {
      "@type": "SoftwareApplication",
      name: "RoundFit",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web, iOS, Android",
      description: defaultDescription,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Join the waitlist for early access",
      },
    },
  ],
};

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "RoundFit",
  title: {
    default: defaultTitle,
    template: "%s | RoundFit",
  },
  description: defaultDescription,
  keywords: [
    "RoundFit",
    "fitness app",
    "calorie goal",
    "Apple Watch fitness",
    "Fitbit",
    "AI food log",
    "weight loss app",
    "activity tracker",
    "daily fitness plan",
    "recovery score",
    "HRV tracking",
    "workout guidance",
    "sleep tracking",
  ],
  authors: [{ name: "RoundFit", url: SITE_URL }],
  creator: "RoundFit",
  publisher: "RoundFit",
  category: "health",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: defaultTitle,
    description:
      "Calories, training, and recovery unified into one clear daily decision.",
    siteName: "RoundFit",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description:
      "Track calories. Train smart. Recover right. RoundFit gives you one clear action every day.",
  },
  /* Use app/favicon.ico as the primary site icon */
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
    apple: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${syne.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
