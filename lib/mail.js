import { Resend } from 'resend'

// Resend only delivers from a verified domain. Until solanaghana.dev (or
// another owned domain) is verified, the shared onboarding@resend.dev sender
// can reach the Resend account owner and nobody else — so organiser mail works
// and applicant confirmations are skipped rather than silently bounced.
// Verify a domain, set RESEND_FROM to it and RESEND_VERIFIED=true, and the
// applicant mail starts sending with no code change.
const verified = () => process.env.RESEND_VERIFIED === 'true'

let client = null
function resend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!client) client = new Resend(key)
  return client
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function table(fields) {
  const rows = Object.entries(fields)
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;vertical-align:top;color:#666;white-space:nowrap">${escapeHtml(
          label,
        )}</td><td style="padding:6px 0;vertical-align:top">${escapeHtml(value).replace(
          /\n/g,
          '<br />',
        )}</td></tr>`,
    )
    .join('')
  return `<table style="border-collapse:collapse;font:14px/1.6 -apple-system,Segoe UI,sans-serif">${rows}</table>`
}

async function send(message) {
  const api = resend()
  if (!api) {
    console.warn('[mail] RESEND_API_KEY not set; skipping send')
    return { skipped: 'no-api-key' }
  }
  const from = process.env.RESEND_FROM || 'Solana Ghana <onboarding@resend.dev>'
  const { data, error } = await api.emails.send({ from, ...message })
  if (error) {
    console.error('[mail] send failed', error)
    return { error }
  }
  console.log(`[mail] sent ${data?.id} to ${[message.to].flat().join(', ')}`)
  return { id: data?.id }
}

function organiserRecipients() {
  const raw = process.env.ORGANISER_EMAIL || ''
  return raw
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)
}

// Sends the submission to the founding circle. The submitter's address goes in
// reply_to so a reply reaches them directly.
export async function notifyOrganisers({ subject, heading, fields, replyTo }) {
  const to = organiserRecipients()
  if (!to.length) {
    console.warn('[mail] ORGANISER_EMAIL not set; skipping organiser notification')
    return { skipped: 'no-recipient' }
  }
  return send({
    to,
    subject,
    replyTo,
    html: `<div style="font:14px/1.6 -apple-system,Segoe UI,sans-serif;color:#111">
  <h2 style="margin:0 0 4px;font-size:18px">${escapeHtml(heading)}</h2>
  <p style="margin:0 0 16px;color:#666">Solana Ghana community site</p>
  ${table(fields)}
</div>`,
  })
}

export async function confirmToApplicant({ to, subject, heading, body }) {
  if (!verified()) {
    console.warn(
      `[mail] RESEND_VERIFIED is not true; skipping applicant confirmation to ${to}`,
    )
    return { skipped: 'unverified-domain' }
  }
  return send({
    to,
    subject,
    html: `<div style="font:14px/1.6 -apple-system,Segoe UI,sans-serif;color:#111">
  <h2 style="margin:0 0 12px;font-size:18px">${escapeHtml(heading)}</h2>
  <p style="margin:0 0 16px">${escapeHtml(body)}</p>
  <p style="margin:0;color:#666">Solana Ghana — build, connect, empower.</p>
</div>`,
  })
}
