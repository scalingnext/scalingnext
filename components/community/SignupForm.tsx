"use client";

/**
 * Signup form card for the community landing pages.
 *
 * Validation rules live in `lib/validation/lead.ts` and are shared verbatim
 * with the server route, so the two can never disagree.
 */

import { useEffect, useRef, useState } from "react";
import { Loader2, Lock, ArrowRight, Check } from "lucide-react";
import {
  validateLead,
  ROLES,
  EXPERIENCE_LEVELS,
  type LeadFieldErrors,
  type LeadInput,
} from "@/lib/validation/lead";
import { COUNTRIES, DEFAULT_COUNTRY, detectCountry, findByName } from "@/lib/countries";
import { FloatingSelect, type SelectOption } from "@/components/ui/FloatingSelect";
import type { ChannelConfig } from "./channels";

const FIELD =
  "w-full rounded-xl bg-[#0F0F0F] border border-[#2A2A2A] px-4 py-3 text-[15px] text-white " +
  "placeholder:text-[#5C5C5C] outline-none transition-colors duration-200 " +
  "focus:border-[#4A4A4A] focus:ring-1 focus:ring-[#4A4A4A]";

const LABEL = "block text-[13px] font-medium text-[#C4C4C4] mb-2";

const COUNTRY_OPTIONS: SelectOption[] = COUNTRIES.map((c) => ({
  value: c.name,
  label: c.name,
  hint: c.dial,
}));

const ROLE_OPTIONS: SelectOption[] = ROLES.map((r) => ({ value: r, label: r }));
const EXPERIENCE_OPTIONS: SelectOption[] = EXPERIENCE_LEVELS.map((e) => ({ value: e, label: e }));

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: LeadInput = {
  name: "",
  email: "",
  country: DEFAULT_COUNTRY.name,
  phoneCode: DEFAULT_COUNTRY.dial,
  phone: "",
  knowsCoding: null,
  role: "",
  experience: "",
  marketingOptIn: true,
  source: "",
};

export function SignupForm({ channel }: { channel: ChannelConfig }) {
  const [values, setValues] = useState<LeadInput>({ ...EMPTY, source: channel.source });
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  // Ref guard, not state: state updates are async and a fast double-click can
  // land two submits before React re-renders with status === "submitting".
  const inFlight = useRef(false);
  // Set once the visitor edits the country themselves, so auto-detect never
  // overwrites a deliberate choice.
  const countryTouched = useRef(false);

  // Auto-detect on mount. Runs client-side only (navigator/Intl), so the
  // server-rendered HTML stays identical for every visitor and stays cacheable.
  useEffect(() => {
    if (countryTouched.current) return;
    const detected = detectCountry();
    setValues((prev) =>
      prev.country === detected.name
        ? prev
        : { ...prev, country: detected.name, phoneCode: detected.dial },
    );
  }, []);

  const set = <K extends keyof LeadInput>(key: K, value: LeadInput[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const onCountryChange = (name: string) => {
    countryTouched.current = true;
    const match = findByName(name);
    setValues((prev) => ({
      ...prev,
      country: name,
      // Keep the dial code in lockstep with the country selection.
      phoneCode: match ? match.dial : prev.phoneCode,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.country;
      delete next.phoneCode;
      return next;
    });
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const result = validateLead(values);
    if (!result.ok) {
      setErrors(result.errors);
      setFormError(null);
      const firstKey = Object.keys(result.errors)[0];
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }

    inFlight.current = true;
    setStatus("submitting");
    setFormError(null);

    try {
      const response = await fetch("/api/community-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.value),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data?.fields) setErrors(data.fields as LeadFieldErrors);
        setFormError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "success") {
    return <SuccessPanel />;
  }

  const submitting = status === "submitting";

  return (
    <div className="rounded-[22px] border border-[#232323] bg-[#131313] p-6 sm:p-8">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="field-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "error-name" : undefined}
            className={FIELD}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <input
            id="field-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
            className={FIELD}
          />
        </Field>

        <Field id="country" label="Country" error={errors.country}>
          <FloatingSelect
            id="field-country"
            options={COUNTRY_OPTIONS}
            value={values.country}
            onChange={onCountryChange}
            placeholder="Select your country"
            searchable
            ariaLabel="Country"
            invalid={Boolean(errors.country)}
            describedBy={errors.country ? "error-country" : undefined}
          />
        </Field>

        <Field id="phone" label="Phone number" error={errors.phone ?? errors.phoneCode}>
          {/* Dial code is content-sized; the number input takes all remaining
              width, so a "+1" code no longer occupies the same box as "+971". */}
          <div className="flex gap-2.5">
            <FloatingSelect
              id="field-phoneCode"
              className="w-[92px] shrink-0"
              buttonClassName="px-3"
              options={COUNTRY_OPTIONS}
              value={values.country}
              onChange={onCountryChange}
              searchable
              ariaLabel="Country calling code"
              renderValue={(option) => {
                const match = option ? findByName(option.value) : undefined;
                return <span className="tabular-nums">{match?.dial ?? values.phoneCode}</span>;
              }}
            />
            <input
              id="field-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="Phone number"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "error-phone" : undefined}
              className={`${FIELD} min-w-0 flex-1`}
            />
          </div>
        </Field>

        <fieldset>
          <legend className={LABEL}>Do you know Coding?</legend>
          <div className="flex gap-2.5">
            {[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ].map((option) => {
              const selected = values.knowsCoding === option.value;
              return (
                <label
                  key={option.label}
                  className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[15px] transition-colors duration-200 ${
                    selected
                      ? "border-[#4A4A4A] bg-[#1E1E1E] text-white"
                      : "border-[#2A2A2A] bg-[#0F0F0F] text-[#9A9A9A] hover:border-[#3A3A3A]"
                  }`}
                >
                  <input
                    id={option.value ? "field-knowsCoding" : undefined}
                    type="radio"
                    name="knowsCoding"
                    className="sr-only"
                    checked={selected}
                    onChange={() => set("knowsCoding", option.value)}
                  />
                  <span
                    aria-hidden
                    className={`h-3.5 w-3.5 rounded-full border ${
                      selected ? "border-white bg-white" : "border-[#4A4A4A]"
                    }`}
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
          {errors.knowsCoding && <FieldError id="error-knowsCoding">{errors.knowsCoding}</FieldError>}
        </fieldset>

        <Field id="role" label="What describes you best?" error={errors.role}>
          <FloatingSelect
            id="field-role"
            options={ROLE_OPTIONS}
            value={values.role}
            onChange={(v) => set("role", v)}
            ariaLabel="What describes you best?"
            invalid={Boolean(errors.role)}
            describedBy={errors.role ? "error-role" : undefined}
          />
        </Field>

        <Field
          id="experience"
          label="How many years of work experience do you have?"
          error={errors.experience}
        >
          <FloatingSelect
            id="field-experience"
            options={EXPERIENCE_OPTIONS}
            value={values.experience}
            onChange={(v) => set("experience", v)}
            ariaLabel="Years of work experience"
            invalid={Boolean(errors.experience)}
            describedBy={errors.experience ? "error-experience" : undefined}
          />
        </Field>

        <label className="flex cursor-pointer items-start gap-3 pt-1">
          <span className="relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center">
            <input
              type="checkbox"
              name="marketingOptIn"
              checked={values.marketingOptIn}
              onChange={(e) => set("marketingOptIn", e.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border border-[#3A3A3A] bg-[#0F0F0F] transition-colors duration-200 peer-checked:border-white peer-checked:bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#4A4A4A]"
            >
              {values.marketingOptIn && <Check size={13} strokeWidth={3} className="text-[#111111]" />}
            </span>
          </span>
          <span className="text-[13px] leading-relaxed text-[#9A9A9A]">
            I want to receive ScalingNext updates and community announcements
          </span>
        </label>

        {formError && (
          <p role="alert" className="rounded-xl border border-[#4A2A2A] bg-[#1C1414] px-4 py-3 text-[13px] text-[#E5A3A3]">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-[15px] text-[15px] font-semibold text-[#111111] transition-all duration-200 hover:bg-[#EDEDED] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Joining…
            </>
          ) : (
            <>
              Join ScalingNext
              <ArrowRight size={16} />
            </>
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-[12px] text-[#6B6B6B]">
          <Lock size={12} strokeWidth={2} />
          Your data is safe. No spam.
        </p>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className={LABEL}>
        {label}
      </label>
      {children}
      {error && <FieldError id={`error-${id}`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-[12px] text-[#E58A8A]">
      {children}
    </p>
  );
}

function SuccessPanel() {
  return (
    <div className="rounded-[22px] border border-[#232323] bg-[#131313] p-8 text-center sm:p-10">
      <span className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#2E2E2E] bg-[#1C1C1C]">
        <Check size={18} className="text-white" strokeWidth={2.5} />
      </span>
      <h2 className="text-[26px] font-bold tracking-tight text-white sm:text-[28px]">You&apos;re in.</h2>
      <p className="mt-3 text-[15px] text-[#B0B0B0]">Welcome to ScalingNext.</p>
      <p className="mx-auto mt-2 max-w-[380px] text-[14px] leading-relaxed text-[#8A8A8A]">
        We&apos;ll send the latest AI updates, tools, and community opportunities to your inbox.
      </p>
      <a
        href="/"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-[15px] text-[15px] font-semibold text-[#111111] transition-colors duration-200 hover:bg-[#EDEDED]"
      >
        Back to ScalingNext
        <ArrowRight size={16} />
      </a>
    </div>
  );
}
