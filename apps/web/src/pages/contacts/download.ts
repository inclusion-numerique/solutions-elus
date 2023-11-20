import { NextApiHandler } from 'next'
import { stringify } from 'csv-stringify'
import { sessionTokenFromCookies } from '@sde/web/security/authentication'
import { sessionUserFromSessionToken } from '@sde/web/auth/sessionUserFromSessionToken'
import {
  generateGetLeadSubmissionsData,
  getLeadSubmissionsCsvFilename,
} from '@sde/web/shareProject/shareProjectSubmissionsDownload'

const download: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed')
  }
  const user = await sessionUserFromSessionToken(
    sessionTokenFromCookies(req.cookies),
  )

  if (!user) {
    return res.status(401).send('Unauthenticated')
  }

  const data = await generateGetLeadSubmissionsData()
  const csv = stringify(data)

  res
    .setHeader('Content-Type', 'text/csv')
    .setHeader(
      'Content-Disposition',
      `attachment;filename=${getLeadSubmissionsCsvFilename()}`,
    )
    .send(csv)
}

export default download
