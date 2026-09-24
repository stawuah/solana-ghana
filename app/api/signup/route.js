import { query } from '@/lib/db'
import { confirmToApplicant, notifyOrganisers } from '@/lib/mail'
import { handleSubmission } from '@/lib/submit'
import { RULES } from '@/lib/validate'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request) {
  return handleSubmission(request, {
    limitKey: 'signup',
    rules: RULES.signup,
    persist: (values, ipHash) =>
      query(
        `insert into signups (email, source, ip_hash) values ($1, $2, $3)`,
        [values.email, 'site', ipHash],
      ),
    notify: async (values) => {
      await notifyOrganisers({
        subject: `New signup — ${values.email}`,
        heading: 'New founding cohort signup',
        replyTo: values.email,
        fields: { Email: values.email },
      })
      await confirmToApplicant({
        to: values.email,
        subject: 'You are on the Solana Ghana list',
        heading: 'Thanks for signing up.',
        body: 'We will be in touch when the founding cohort opens. Founding cohort updates only, no noise.',
      })
    },
  })
}
