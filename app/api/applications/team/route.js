import { query } from '@/lib/db'
import { confirmToApplicant, notifyOrganisers } from '@/lib/mail'
import { handleSubmission } from '@/lib/submit'
import { RULES } from '@/lib/validate'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request) {
  return handleSubmission(request, {
    limitKey: 'team',
    rules: RULES.team,
    persist: (values, ipHash) =>
      query(
        `insert into team_applications (name, email, team, contribution, ip_hash)
         values ($1, $2, $3, $4, $5)`,
        [values.name, values.email, values.team, values.contribution, ipHash],
      ),
    notify: async (values) => {
      await notifyOrganisers({
        subject: `Team application — ${values.team} — ${values.name}`,
        heading: 'New team application',
        replyTo: values.email,
        fields: {
          Name: values.name,
          Email: values.email,
          Team: values.team,
          Contribution: values.contribution,
        },
      })
      await confirmToApplicant({
        to: values.email,
        subject: 'Your Solana Ghana team application',
        heading: 'Application received.',
        body: `Thanks for applying to ${values.team}. Shortlisted builders will be invited to an interview round before team placement.`,
      })
    },
  })
}
