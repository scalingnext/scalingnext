/**
 * Per-channel configuration for the community signup pages.
 *
 * One shared page component (`CommunitySignup.tsx`) renders all five routes
 * (/twitter, /insta, /yt, /linkedin, /join) from these configs, so the pages
 * cannot drift apart without an intentional edit here.
 *
 * `source` differs per page so /admin can attribute signups by channel, but
 * everything the visitor reads says "Free WhatsApp Community" — because that is
 * literally what they are joining. Naming the referring social network in the
 * hero implied the community lived there, which was misleading.
 */

import type { ChannelSource } from "@/lib/validation/lead";

export type ChannelConfig = {
  /** Value written to community_leads.source — the only per-page difference */
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

// Identical visitor-facing copy across every page. Only `source` and `path`
// vary, so attribution still works while the message stays honest.
const SHARED = {
  badge: "WhatsApp Community",
  channelLine: "Free WhatsApp Community",
  emailLabel: "free WhatsApp community",
  metaTitle: "ScalingNext — Join the Free WhatsApp AI Community",
  metaDescription:
    "Join the free ScalingNext WhatsApp community for practical AI tips, curated tools, important updates, workflows, and live sessions. No fees, no upsells.",
} as const;

export const CHANNELS: Record<
  "twitter" | "insta" | "yt" | "linkedin" | "join",
  ChannelConfig
> = {
  twitter: { ...SHARED, source: "twitter", path: "/twitter" },
  insta: { ...SHARED, source: "instagram", path: "/insta" },
  yt: { ...SHARED, source: "youtube", path: "/yt" },
  linkedin: { ...SHARED, source: "linkedin", path: "/linkedin" },
  join: { ...SHARED, source: "direct", path: "/join" },
};

/**
 * Maps a stored `source` value back to a human label for the email.
 * All five share the same label now, but the mapping is kept exhaustive so
 * adding a channel with different copy stays a one-line change.
 */
export const SOURCE_LABELS: Record<ChannelSource, string> = {
  twitter: CHANNELS.twitter.emailLabel,
  instagram: CHANNELS.insta.emailLabel,
  youtube: CHANNELS.yt.emailLabel,
  linkedin: CHANNELS.linkedin.emailLabel,
  direct: CHANNELS.join.emailLabel,
};
