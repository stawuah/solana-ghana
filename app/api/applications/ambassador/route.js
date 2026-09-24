import { query } from '@/lib/db'
import { confirmToApplicant, notifyOrganisers } from '@/lib/mail'
import { handleSubmission } from '@/lib/submit'
import { RULES } from '@/lib/validate'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request) {
  return handleSubmission(request, {
    limitKey: 'ambassador',
    rules: RULES.ambassador,
    persist: (values, ipHash) =>
      query(
        `insert into ambassador_applications (name, email, university, github, plan, ip_hash)
         values ($1, $2, $3, $4, $5, $6)`,
        [values.name, values.email, values.university, values.github, values.plan, ipHash],
      ),
    notify: async (values) => {
      await notifyOrganisers({
        subject: `Ambassador application — ${values.university} — ${values.name}`,
        heading: 'New ambassador application',
        replyTo: values.email,
        fields: {
          Name: values.name,
          Email: values.email,
          University: values.university,
          'GitHub / portfolio': values.github,
          'Campus plan': values.plan,
        },
      })
      await confirmToApplicant({
        to: values.email,
        subject: 'Your Solana Ghana ambassador application',
        heading: 'Application received.',
        body: 'Thanks for applying to the founding ambassador programme. Applications are reviewed manually and we will follow up about next steps.',
      })
    },
  })
}
