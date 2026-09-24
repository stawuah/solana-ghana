// Small hand-rolled validators. The forms are simple enough that a schema
// library would be more dependency than the site needs.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const TEAMS = [
  'Validators',
  'Stablecoin Sandbox',
  'Agentic Payments',
  'Mobile & Consumer',
]

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function validate(body, rules) {
  const errors = {}
  const values = {}

  for (const [field, rule] of Object.entries(rules)) {
    const value = clean(body?.[field])

    if (!value) {
      if (rule.required) errors[field] = 'Required'
      else values[field] = null
      continue
    }

    if (rule.max && value.length > rule.max) {
      errors[field] = `Must be ${rule.max} characters or fewer`
      continue
    }
    if (rule.email && !EMAIL.test(value)) {
      errors[field] = 'Enter a valid email address'
      continue
    }
    if (rule.oneOf && !rule.oneOf.includes(value)) {
      errors[field] = 'Choose one of the listed options'
      continue
    }

    values[field] = value
  }

  return { ok: Object.keys(errors).length === 0, errors, values }
}

// Bots fill every field they find. A field hidden from humans that arrives
// populated is a bot, and is dropped without an error so it cannot probe.
export function isBot(body) {
  return Boolean(clean(body?.website))
}

export const RULES = {
  signup: {
    email: { required: true, email: true, max: 254 },
  },
  team: {
    name: { required: true, max: 120 },
    email: { required: true, email: true, max: 254 },
    team: { required: true, oneOf: TEAMS },
    contribution: { required: true, max: 4000 },
  },
  ambassador: {
    name: { required: true, max: 120 },
    email: { required: true, email: true, max: 254 },
    university: { required: true, max: 200 },
    github: { required: false, max: 300 },
    plan: { required: true, max: 4000 },
  },
}
