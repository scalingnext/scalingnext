import type { Metadata } from "next";
import { CommunitySignup } from "@/components/community/CommunitySignup";
import { CHANNELS } from "@/components/community/channels";

const channel = CHANNELS.twitter;

export const metadata: Metadata = {
  title: channel.metaTitle,
  description: channel.metaDescription,
  alternates: { canonical: channel.path },
  // Social-referral landing page, not a search destination. It shares its H1,
  // hero copy, and body with /insta and /yt, so leaving all three indexable
  // would split the same intent three ways against the homepage. `follow` is
  // kept so link equity still flows onward to /.
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

export default function TwitterCommunityPage() {
  return <CommunitySignup channel={channel} />;
}
