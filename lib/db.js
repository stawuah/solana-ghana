import { createHash } from 'node:crypto'
import net from 'node:net'
import pg from 'pg'

// Neon resolves to several A/AAAA records. Node races them with a 250ms
// per-address budget by default, which expires before a handshake to a distant
// region completes — and on hosts without working IPv6 the AAAA attempts only
// burn the budget. Give each address a realistic window.
net.setDefaultAutoSelectFamilyAttemptTimeout(5000)

// One pool per process. Next.js reloads modules in development, so the pool is
// cached on globalThis to avoid exhausting Neon's connection limit.
const globalForPg = globalThis

function createPool() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }
  return new pg.Pool({
    connectionString,
    ssl: { rejectUnauthorized: true },
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  })
}

export function getPool() {
  if (!globalForPg.__sgPool) {
    globalForPg.__sgPool = createPool()
  }
  return globalForPg.__sgPool
}

export function query(text, params) {
  return getPool().query(text, params)
}

// Submissions are public, so the raw IP is never stored. The hash is only used
// to recognise repeat submitters when reviewing abuse.
export function hashIp(ip) {
  if (!ip) return null
  const salt = process.env.IP_HASH_SALT || 'solana-ghana'
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32)
}

export function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || null
}
