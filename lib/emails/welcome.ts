/**
 * Confirmation email sent immediately after a successful community signup.
 *
 * Called by `app/api/community-signup/route.ts` after the Supabase insert.
 * Returns both HTML and plaintext parts; `lib/email.ts` sends them together.
 *
 * Inline styles only — email clients strip <style> blocks and ignore external
 * CSS, so Tailwind classes would render as unstyled text here.
 */

export type WelcomeEmailInput = {
  name: string;
  channelLabel: string;
  inviteUrl: string;
};

export function buildWelcomeEmail({
  name,
  channelLabel,
  inviteUrl,
}: WelcomeEmailInput): { subject: string; html: string; text: string } {
  const firstName = name.split(/\s+/)[0] || name;
  const subject = "You're in — join the ScalingNext WhatsApp community";

  const text = [
    `Hi ${firstName},`,
    ``,
    `You're in. Thanks for joining ScalingNext via our ${channelLabel}.`,
    ``,
    `Here's your invite to the community — this is where the AI updates, tools,`,
    `resources, and live sessions actually get shared:`,
    ``,
    inviteUrl,
    ``,
    `What to expect:`,
    `  - Practical AI updates without the noise`,
    `  - Curated tools, guides, and workflows`,
    `  - Live sessions and community discussions`,
    ``,
    `ScalingNext is completely free. No fees, no upsells.`,
    ``,
    `See you inside,`,
    `The ScalingNext Team`,
    `https://scalingnext.in`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0a0a0a;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      Your invite link to the ScalingNext AI community is inside.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#141414;border:1px solid #262626;border-radius:16px;">
            <tr>
              <td style="padding:32px 32px 8px 32px;">
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#888888;">
                  ScalingNext
                </p>
                <h1 style="margin:16px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:28px;line-height:1.2;font-weight:700;color:#ffffff;">
                  You're in.
                </h1>
                <p style="margin:16px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#b8b8b8;">
                  Hi ${escapeHtml(firstName)}, thanks for joining ScalingNext via our ${escapeHtml(channelLabel)}.
                  Your invite to the community is below — that's where the AI updates, tools, resources,
                  and live sessions actually get shared.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px 32px;">
                <a href="${escapeAttr(inviteUrl)}"
                   style="display:block;background-color:#ffffff;color:#111111;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;text-align:center;text-decoration:none;padding:15px 24px;border-radius:12px;">
                  Join the WhatsApp community &rarr;
                </a>
                <p style="margin:14px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#777777;word-break:break-all;">
                  Button not working? Paste this link into your browser:<br />
                  <a href="${escapeAttr(inviteUrl)}" style="color:#999999;">${escapeHtml(inviteUrl)}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px 32px;">
                <div style="border-top:1px solid #262626;padding-top:20px;">
                  <p style="margin:0 0 10px 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#888888;">
                    What to expect
                  </p>
                  <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.8;color:#b8b8b8;">
                    Practical AI updates without the noise<br />
                    Curated tools, guides, and workflows<br />
                    Live sessions and community discussions
                  </p>
                  <p style="margin:18px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:#888888;">
                    ScalingNext is completely free. No fees, no upsells.
                  </p>
                </div>
              </td>
            </tr>
          </table>
          <p style="margin:20px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#666666;text-align:center;">
            You received this because you signed up at
            <a href="https://scalingnext.in" style="color:#888888;">scalingnext.in</a>.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value);
}
