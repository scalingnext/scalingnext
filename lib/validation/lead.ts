/**
 * Shared lead validation — the single source of truth used by BOTH the client
 * form (`components/community/SignupForm.tsx`) and the server route handler
 * (`app/api/community-signup/route.ts`).
 *
 * Client-side validation is a UX affordance only. The server re-runs the exact
 * same rules on every request, so a crafted payload cannot bypass them.
 */

export const CHANNEL_SOURCES = [
  "twitter",
  "instagram",
  "youtube",
  "linkedin",
  // /join has no referring social channel — someone arrived directly.
  "direct",
] as const;
export type ChannelSource = (typeof CHANNEL_SOURCES)[number];

export const ROLES = [
  "Student",
  "Founder",
  "Developer",
  "Designer",
  "Marketer",
  "Freelancer",
  "Creator",
  "Entrepreneur",
  "Other",
] as const;

export const EXPERIENCE_LEVELS = [
  "0 years",
  "1 year",
  "2 years",
  "3 years",
  "4 years",
  "5+ years",
] as const;

export type LeadInput = {
  name: string;
  email: string;
  country: string;
  phoneCode: string;
  phone: string;
  knowsCoding: boolean | null;
  role: string;
  experience: string;
  marketingOptIn: boolean;
  source: string;
};

export type LeadFieldErrors = Partial<Record<keyof LeadInput, string>>;

export type ValidatedLead = {
  name: string;
  email: string;
  country: string;
  phoneCode: string;
  phone: string;
  knowsCoding: boolean;
  role: string;
  experience: string;
  marketingOptIn: boolean;
  source: ChannelSource;
};

export type ValidationResult =
  | { ok: true; value: ValidatedLead }
  | { ok: false; errors: LeadFieldErrors };

// Deliberately pragmatic: rejects the common mistakes (missing @, missing TLD,
// whitespace) without pretending to implement RFC 5322.
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export function validateLead(input: Partial<LeadInput>): ValidationResult {
  const errors: LeadFieldErrors = {};

  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > 120) {
    errors.name = "Name must be 120 characters or fewer.";
  }

  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (email.length > 254 || !EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const country = typeof input.country === "string" ? input.country.trim() : "";
  if (!country) {
    errors.country = "Please select your country.";
  } else if (country.length > 80) {
    errors.country = "Country name is too long.";
  }

  const phoneCode = typeof input.phoneCode === "string" ? input.phoneCode.trim() : "";
  if (!/^\+\d{1,4}$/.test(phoneCode)) {
    errors.phoneCode = "Please select a country code.";
  }

  const rawPhone = typeof input.phone === "string" ? input.phone : "";
  const phone = rawPhone.replace(/[^\d]/g, "");
  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (phone.length < 7 || phone.length > 15) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (typeof input.knowsCoding !== "boolean") {
    errors.knowsCoding = "Please choose Yes or No.";
  }

  const role = typeof input.role === "string" ? input.role.trim() : "";
  if (!role) {
    errors.role = "Please select what describes you best.";
  } else if (!(ROLES as readonly string[]).includes(role)) {
    errors.role = "Please select a valid option.";
  }

  const experience = typeof input.experience === "string" ? input.experience.trim() : "";
  if (!experience) {
    errors.experience = "Please select your years of experience.";
  } else if (!(EXPERIENCE_LEVELS as readonly string[]).includes(experience)) {
    errors.experience = "Please select a valid option.";
  }

  const source = typeof input.source === "string" ? input.source.trim() : "";
  if (!(CHANNEL_SOURCES as readonly string[]).includes(source)) {
    errors.source = "Unknown signup source.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      country,
      phoneCode,
      phone,
      knowsCoding: input.knowsCoding as boolean,
      role,
      experience,
      marketingOptIn: input.marketingOptIn === true,
      source: source as ChannelSource,
    },
  };
}
