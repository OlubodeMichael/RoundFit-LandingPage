import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const defaultTitle = "Calore — Your fitness decision engine";
const defaultDescription =
  "Calore tells you exactly what to do to hit your calorie and fitness goals in real time. Smartwatch sync, AI food logging, and one clear daily instruction—not another dashboard.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Calore",
      description: defaultDescription,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Calore",
      url: SITE_URL,
      description: defaultDescription,
    },
    {
      "@type": "SoftwareApplication",
      name: "Calore",
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
  applicationName: "Calore",
  title: {
    default: defaultTitle,
    template: "%s | Calore",
  },
  description: defaultDescription,
  keywords: [
    "Calore",
    "fitness app",
    "calorie goal",
    "Apple Watch fitness",
    "Fitbit",
    "AI food log",
    "weight loss app",
    "activity tracker",
    "daily fitness plan",
  ],
  authors: [{ name: "Calore", url: SITE_URL }],
  creator: "Calore",
  publisher: "Calore",
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
      "Stop tracking. Start deciding. Real-time instructions from your smartwatch and meals.",
    siteName: "Calore",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description:
      "Stop tracking. Start deciding. Real-time fitness decisions from your data.",
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
