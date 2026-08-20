/**
 * Server-only email transport.
 *
 * Sends through Gmail SMTP using an App Password (requires 2-Step Verification
 * on the account). Kept behind a single `sendMail()` function so switching to a
 * domain sender or adding admin notifications is a change to this file only.
 *
 * SECURITY: reads GMAIL_APP_PASSWORD. Never import from a "use client" file.
 *
 * KNOWN LIMITATION: mail sent from an @gmail.com address cannot carry
 * SPF/DKIM alignment for scalingnext.in, so inbox placement is measurably worse
 * than a domain sender. Moving to hello@scalingnext.in later means changing the
 * transport config here and two env vars — nothing else.
 */

import nodemailer, { type Transporter } from "nodemailer";

export class MissingEmailConfigError extends Error {
  constructor(missing: string[]) {
    super(`Missing email environment variables: ${missing.join(", ")}`);
    this.name = "MissingEmailConfigError";
  }
}

export type MailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

const FROM_NAME = "ScalingNext";

let cachedTransporter: Transporter | null = null;

function getTransporter(user: string, pass: string): Transporter {
  // Reused across warm invocations so we are not renegotiating TLS per request.
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  return cachedTransporter;
}

export async function sendMail(payload: MailPayload): Promise<void> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  const missing: string[] = [];
  if (!user) missing.push("GMAIL_USER");
  if (!pass) missing.push("GMAIL_APP_PASSWORD");
  if (missing.length > 0) {
    throw new MissingEmailConfigError(missing);
  }

  await getTransporter(user!, pass!).sendMail({
    from: `"${FROM_NAME}" <${user}>`,
    replyTo: user,
    to: payload.to,
    subject: payload.subject,
    // Both parts are sent: a text/plain alternative measurably improves spam
    // scoring versus an HTML-only message.
    text: payload.text,
    html: payload.html,
  });
}
