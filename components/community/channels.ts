/**
 * Per-channel configuration for the community signup pages.
 *
 * One shared page component (`CommunitySignup.tsx`) renders all three routes
 * (/twitter, /insta, /yt) from these configs, so the pages cannot drift apart
 * without an intentional edit here.
 */

import type { ChannelSource } from "@/lib/validation/lead";

export type ChannelConfig = {
  /** Value written to community_leads.source */
  source: ChannelSource;
  /** Text inside the hero pill, after "Free · " */
  badge: string;
  /** Small subtle line beneath the hero paragraph */
  channelLine: string;
  /** Human-readable channel name used in the confirmation email */
  emailLabel: string;
  /** Page <title> */
  metaTitle: string;
  metaDescription: string;
  /** Canonical path for this route */
  path: string;
};

export const WHATSAPP_INVITE_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_INVITE_URL ??
  "https://chat.whatsapp.com/CKzAuoLtl8w8jzeTWyBWU6";

export const CHANNELS: Record<"twitter" | "insta" | "yt", ChannelConfig> = {
  twitter: {
    source: "twitter",
    badge: "X Community",
    channelLine: "X / Twitter Community",
    emailLabel: "X / Twitter community",
    metaTitle: "ScalingNext — AI Community on X",
    metaDescription:
      "Join ScalingNext on X for curated AI updates, tools, resources, and community opportunities.",
    path: "/twitter",
  },
  insta: {
    source: "instagram",
    badge: "Instagram Community",
    channelLine: "Instagram Community",
    emailLabel: "Instagram community",
    metaTitle: "ScalingNext — AI Community on Instagram",
    metaDescription:
      "Join ScalingNext on Instagram for curated AI updates, tools, resources, and community opportunities.",
    path: "/insta",
  },
  yt: {
    source: "youtube",
    badge: "YouTube Community",
    channelLine: "YouTube Community",
    emailLabel: "YouTube community",
    metaTitle: "ScalingNext — AI Community on YouTube",
    metaDescription:
      "Join ScalingNext on YouTube for curated AI updates, tools, resources, and community opportunities.",
    path: "/yt",
  },
};

/** Maps a stored `source` value back to a human label for the email. */
export const SOURCE_LABELS: Record<ChannelSource, string> = {
  twitter: CHANNELS.twitter.emailLabel,
  instagram: CHANNELS.insta.emailLabel,
  youtube: CHANNELS.yt.emailLabel,
};
