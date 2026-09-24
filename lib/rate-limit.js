// Per-IP sliding window, held in process memory.
//
// The site runs as a single Render instance, so one process sees every request
// and this is sufficient. If the service is ever scaled to more than one
// instance, each instance would keep its own counts and the effective limit
// would multiply — move this to Postgres or Redis before scaling out.

const hits = new Map()

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

// Stop the map growing without bound on a long-lived process.
function sweep(now) {
  for (const [key, times] of hits) {
    const live = times.filter((t) => now - t < WINDOW_MS)
    if (live.length) hits.set(key, live)
    else hits.delete(key)
  }
}

let lastSweep = 0

export function rateLimit(key, { max = MAX_PER_WINDOW, windowMs = WINDOW_MS } = {}) {
  if (!key) return { allowed: true, remaining: max }

  const now = Date.now()
  if (now - lastSweep > windowMs) {
    sweep(now)
    lastSweep = now
  }

  const times = (hits.get(key) || []).filter((t) => now - t < windowMs)

  if (times.length >= max) {
    const retryAfter = Math.ceil((times[0] + windowMs - now) / 1000)
    return { allowed: false, remaining: 0, retryAfter }
  }

  times.push(now)
  hits.set(key, times)
  return { allowed: true, remaining: max - times.length }
}
