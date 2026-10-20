// Receives contact and assessment form submissions and emails them to the
// firm via Resend (https://resend.com). Requires RESEND_API_KEY; ENQUIRY_TO
// and ENQUIRY_FROM override the default recipient / sender.

const MAX_FIELD = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[enquiry] RESEND_API_KEY is not set — submission not sent");
    return Response.json(
      { error: "Online submissions are not configured yet." },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (String(form.get("company_website") ?? "")) {
    return Response.json({ ok: true });
  }

  const fields = new Map<string, string[]>();
  for (const [key, value] of form.entries()) {
    if (typeof value !== "string" || key === "company_website") continue;
    const v = value.trim().slice(0, MAX_FIELD);
    if (!v) continue;
    fields.set(key, [...(fields.get(key) ?? []), v]);
  }

  const kind = fields.get("formType")?.[0] === "assessment" ? "Assessment" : "Enquiry";
  fields.delete("formType");

  const email = fields.get("email")?.[0] ?? "";
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  const name =
    fields.get("name")?.[0] ??
    [fields.get("firstName")?.[0], fields.get("lastName")?.[0]].filter(Boolean).join(" ");

  const rows = [...fields.entries()].map(([k, v]) => [k, v.join(", ")] as const);
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#6b7585;vertical-align:top"><b>${escapeHtml(k)}</b></td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? "Chrome Visa Website <onboarding@resend.dev>",
      to: (process.env.ENQUIRY_TO ?? "info@chromevisa.ca").split(",").map((s) => s.trim()),
      reply_to: email,
      subject: `New ${kind.toLowerCase()} from ${name || email}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[enquiry] Resend error", res.status, await res.text());
    return Response.json(
      { error: "We couldn't send your submission. Please email or call us." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
