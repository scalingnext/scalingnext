import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://scalingnext.in"),
  title: {
    default: "ScalingNext — Stay Ahead in AI | Free AI Content Community",
    template: "%s | ScalingNext",
  },
  description:
    "ScalingNext is a free AI content community for practical AI tips, curated tools, important updates, step-by-step workflows, and live sessions — all in one place.",
  keywords: [
    "ScalingNext",
    "AI community",
    "free AI tools",
    "AI workflows",
    "AI prompt engineering",
    "AI news and updates",
    "practical AI tips",
    "AI tutorials",
    "AI webinars",
    "generative AI",
    "ChatGPT",
    "Claude",
    "Cursor AI",
  ],
  authors: [{ name: "ScalingNext Team", url: "https://scalingnext.in" }],
  creator: "ScalingNext",
  publisher: "ScalingNext",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "3Xiv23R9rU9lTQ3CDGeQdKxyjT6V4id-OUCZqaOnOQ8",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scalingnext.in",
    siteName: "ScalingNext",
    title: "ScalingNext — Stay Ahead in AI | Free AI Content Community",
    description:
      "A free community for practical AI tips, useful tools, important updates, and live sessions — keeping you ahead without the noise.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ScalingNext — Free AI Content Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScalingNext — Stay Ahead in AI",
    description:
      "A free community for practical AI tips, useful tools, important updates, and live sessions.",
    site: "@scalingnext",
    creator: "@scalingnext",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://scalingnext.in/#organization",
      "name": "ScalingNext",
      "url": "https://scalingnext.in",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://scalingnext.in/#logo",
        "url": "https://scalingnext.in/logo.png",
        "contentUrl": "https://scalingnext.in/logo.png",
        "caption": "ScalingNext Logo"
      },
      "sameAs": [
        "https://x.com/scalingnext",
        "https://www.instagram.com/scalingnext"
      ],
      "description": "ScalingNext is a free AI content community helping people stay ahead in the AI era with practical tips, curated tools, news, and live webinars."
    },
    {
      "@type": "WebSite",
      "@id": "https://scalingnext.in/#website",
      "url": "https://scalingnext.in",
      "name": "ScalingNext",
      "description": "Stay ahead in AI with practical tips, useful tools, and community discussions.",
      "publisher": {
        "@id": "https://scalingnext.in/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "OnlineCommunity",
      "@id": "https://scalingnext.in/#community",
      "name": "ScalingNext AI Community",
      "url": "https://scalingnext.in",
      "about": [
        "Artificial Intelligence",
        "AI Tools",
        "Prompt Engineering",
        "AI Workflows",
        "Generative AI"
      ],
      "isAccessibleForFree": true
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${caveat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
