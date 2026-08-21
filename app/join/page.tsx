import type { Metadata } from "next";
import { CommunitySignup } from "@/components/community/CommunitySignup";
import { CHANNELS } from "@/components/community/channels";

const channel = CHANNELS.join;

export const metadata: Metadata = {
  title: channel.metaTitle,
  description: channel.metaDescription,
  alternates: { canonical: channel.path },
  // Noindex like the other four, for the same reason: all five now render
  // identical copy, so indexing any of them would compete with / — which
  // already owns the "join the free community" intent and is the stronger
  // page. /join exists as a clean, memorable URL to share, not to rank.
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

export default function JoinPage() {
  return <CommunitySignup channel={channel} />;
}
