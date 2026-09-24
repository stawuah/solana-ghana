import { NextResponse } from 'next/server'
import { clientIp, hashIp } from './db.js'
import { rateLimit } from './rate-limit.js'
import { isBot, validate } from './validate.js'

// Shared pipeline for every public form: bot check, rate limit, validate,
// persist, then notify. Mail is deliberately last and non-fatal — once the row
// is written the submission is safe, and a mail outage must not show the
// applicant an error or tempt them into submitting twice.
export async function handleSubmission(request, { rules, persist, notify, limitKey }) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  // Accepted, stored nowhere. A bot that gets an error learns what to change.
  if (isBot(body)) {
    return NextResponse.json({ ok: true })
  }

  const ip = clientIp(request)
  const limit = rateLimit(`${limitKey}:${ip}`)
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: 'Too many submissions. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter ?? 600) } },
    )
  }

  const { ok, errors, values } = validate(body, rules)
  if (!ok) {
    return NextResponse.json(
      { ok: false, errors, message: 'Please check the highlighted fields.' },
      { status: 400 },
    )
  }

  try {
    await persist(values, hashIp(ip))
  } catch (error) {
    if (error?.code === '23505') {
      // Already on the list. Idempotent from the visitor's point of view.
      return NextResponse.json({ ok: true, duplicate: true })
    }
    console.error(`[${limitKey}] persist failed`, error)
    return NextResponse.json(
      { ok: false, message: 'Something went wrong on our side. Please try again.' },
      { status: 500 },
    )
  }

  try {
    await notify(values)
  } catch (error) {
    console.error(`[${limitKey}] notify failed`, error)
  }

  return NextResponse.json({ ok: true })
}
