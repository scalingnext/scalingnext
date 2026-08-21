import type { Metadata } from "next";
import { CommunitySignup } from "@/components/community/CommunitySignup";
import { CHANNELS } from "@/components/community/channels";

const channel = CHANNELS.linkedin;

export const metadata: Metadata = {
  title: channel.metaTitle,
  description: channel.metaDescription,
  alternates: { canonical: channel.path },
  // Social-referral landing page, not a search destination. See app/twitter/page.tsx.
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: channel.path,
    siteName: "ScalingNext",
    title: channel.metaTitle,
    description: channel.metaDescription,
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "ScalingNext" }],
  },
  twitter: {
    card: "summary_large_image",
    title: channel.metaTitle,
    description: channel.metaDescription,
    images: ["/logo.png"],
  },
};

export default function LinkedInCommunityPage() {
  return <CommunitySignup channel={channel} />;
}
