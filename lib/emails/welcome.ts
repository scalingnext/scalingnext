/**
 * Confirmation email sent immediately after a successful community signup.
 *
 * Called by `app/api/community-signup/route.ts` after the Supabase insert.
 * Returns both HTML and plaintext parts; `lib/email.ts` sends them together.
 *
 * Email-client constraints this template works around:
 *   - Outlook ignores <style> blocks → every rule is inline
 *   - Gmail strips <head> CSS → no external or embedded stylesheets
 *   - Outlook ignores padding on <div> → nested <table> for layout
 *   - Dark mode inverts colours unpredictably → we ship a dark design so
 *     inversion has less to break
 */

export type WelcomeEmailInput = {
  name: string;
  channelLabel: string;
  inviteUrl: string;
};

const BRAND = "#FF5000";

export function buildWelcomeEmail({
  name,
  channelLabel,
  inviteUrl,
}: WelcomeEmailInput): { subject: string; html: string; text: string } {
  const firstName = name.split(/\s+/)[0] || name;

  // Personalised, no marketing punctuation, no ALL CAPS, no emoji — subject
  // lines that read like a transactional receipt score better with spam filters.
  const subject = `${firstName}, here's your ScalingNext community link`;

  const text = [
    `Hi ${firstName},`,
    ``,
    `You're in. Thanks for joining ScalingNext through our ${channelLabel}.`,
    ``,
    `Here is your invite link to the community:`,
    inviteUrl,
    ``,
    `This is where we share AI updates, tools, resources, and live sessions.`,
    ``,
    `WHAT YOU'LL GET`,
    ``,
    `AI Updates - the launches and changes that actually matter.`,
    `Curated Resources - tools, guides, and workflows worth your time.`,
    `Community Sessions - live discussions and practical workshops.`,
    `AI Tools - what we are testing and what is worth using.`,
    ``,
    `ScalingNext is completely free. No fees, no upsells.`,
    ``,
    `See you inside,`,
    `The ScalingNext Team`,
    `https://scalingnext.in`,
    ``,
    `---`,
    `You received this because you signed up at scalingnext.in.`,
  ].join("\n");

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark light" />
  <meta name="supported-color-schemes" content="dark light" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0; padding:0; width:100%; background-color:#0A0A0A; -webkit-font-smoothing:antialiased;">

  <!-- Preview text: what shows next to the subject in the inbox list -->
  <div style="display:none; font-size:1px; color:#0A0A0A; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
    Your invite link is inside — plus what to expect from the community.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#0A0A0A;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px; margin:0 auto;">

          <!-- Wordmark -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:15px; font-weight:700; letter-spacing:-0.02em; color:#FFFFFF;">
                Scaling<span style="color:${BRAND};">Next</span>
              </span>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background-color:#131313; border:1px solid #232323; border-radius:20px; padding:0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">

                <!-- Headline -->
                <tr>
                  <td style="padding:40px 36px 0 36px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:#1C1C1C; border:1px solid #2A2A2A; border-radius:100px; padding:6px 14px;">
                          <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#A8A8A8;">
                            You're in
                          </span>
                        </td>
                      </tr>
                    </table>

                    <h1 style="margin:24px 0 0 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:32px; line-height:1.15; font-weight:700; letter-spacing:-0.03em; color:#FFFFFF;">
                      Welcome, ${escapeHtml(firstName)}.
                    </h1>

                    <p style="margin:16px 0 0 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:15px; line-height:1.65; color:#9A9A9A;">
                      Thanks for joining through our ${escapeHtml(channelLabel)}. Your invite link is
                      below — that's where the AI updates, tools, and live sessions actually happen.
                    </p>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td style="padding:32px 36px 0 36px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td align="center" style="background-color:#FFFFFF; border-radius:12px;">
                          <a href="${escapeAttr(inviteUrl)}" style="display:block; padding:16px 24px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:15px; font-weight:600; letter-spacing:-0.01em; color:#111111; text-decoration:none;">
                            Join the WhatsApp community &nbsp;&rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:36px 36px 0 36px;">
                    <div style="height:1px; background-color:#232323; line-height:1px; font-size:0;">&nbsp;</div>
                  </td>
                </tr>

                <!-- What you'll get -->
                <tr>
                  <td style="padding:28px 36px 0 36px;">
                    <p style="margin:0 0 20px 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#6B6B6B;">
                      What you'll get
                    </p>
                    ${[
                      ["AI Updates", "The launches and changes that actually matter."],
                      ["Curated Resources", "Tools, guides, and workflows worth your time."],
                      ["Community Sessions", "Live discussions and practical workshops."],
                      ["AI Tools", "What we're testing, and what's worth using."],
                    ]
                      .map(
                        ([title, body], index) => `
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:${index === 0 ? 0 : 16}px;">
                      <tr>
                        <td width="28" valign="top" style="width:28px;">
                          <div style="width:6px; height:6px; margin-top:7px; background-color:${BRAND}; border-radius:100px; line-height:6px; font-size:0;">&nbsp;</div>
                        </td>
                        <td valign="top">
                          <p style="margin:0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; font-weight:600; letter-spacing:-0.01em; color:#EDEDED;">${title}</p>
                          <p style="margin:3px 0 0 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:13.5px; line-height:1.5; color:#828282;">${body}</p>
                        </td>
                      </tr>
                    </table>`,
                      )
                      .join("")}
                  </td>
                </tr>

                <!-- Free note -->
                <tr>
                  <td style="padding:32px 36px 40px 36px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#0F0F0F; border:1px solid #202020; border-radius:12px;">
                      <tr>
                        <td style="padding:14px 18px;">
                          <p style="margin:0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:13px; line-height:1.55; color:#8A8A8A;">
                            ScalingNext is <span style="color:#EDEDED; font-weight:600;">completely free</span>. No fees, no upsells, no spam.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Fallback link -->
          <tr>
            <td style="padding:24px 12px 0 12px;">
              <p style="margin:0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12px; line-height:1.6; color:#5F5F5F; text-align:center;">
                Button not working? Copy this link:<br />
                <a href="${escapeAttr(inviteUrl)}" style="color:#8A8A8A; word-break:break-all;">${escapeHtml(inviteUrl)}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 12px 0 12px;">
              <p style="margin:0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12px; line-height:1.7; color:#4F4F4F; text-align:center;">
                You received this because you signed up at
                <a href="https://scalingnext.in" style="color:#6B6B6B; text-decoration:underline;">scalingnext.in</a>.<br />
                ScalingNext &middot; Stay ahead in AI
              </p>
            </td>
          </tr>

        </table>
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
