// Applies db/migrations/*.sql in filename order.
// Run: node --env-file=.env.local scripts/migrate.mjs
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import net from 'node:net'
import pg from 'pg'

// Neon resolves to several addresses. Node's default 250ms happy-eyeballs
// attempt timeout gives up on a distant region before the handshake lands.
net.setDefaultAutoSelectFamilyAttemptTimeout(5000)

const dir = join(process.cwd(), 'db', 'migrations')
const files = readdirSync(dir).filter((f) => f.endsWith('.sql')).sort()

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set')
  process.exit(1)
}

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true },
})

await client.connect()
for (const file of files) {
  process.stdout.write(`applying ${file} ... `)
  await client.query(readFileSync(join(dir, file), 'utf8'))
  console.log('ok')
}
await client.end()
console.log(`\n${files.length} migration(s) applied.`)
