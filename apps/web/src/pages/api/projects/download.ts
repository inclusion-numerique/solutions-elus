import { NextApiHandler } from 'next'
import { stringify } from 'csv-stringify'
import { sessionTokenFromCookies } from '@sde/web/security/authentication'
import { sessionUserFromSessionToken } from '@sde/web/auth/sessionUserFromSessionToken'
import {
  generateShareProjectSubmissionsData,
  shareProjectSubmissionsCsvFilename,
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

  const data = await generateShareProjectSubmissionsData()
  const csv = stringify(data)

  res
    .setHeader('Content-Type', 'text/csv')
    .setHeader(
      'Content-Disposition',
      `attachment;filename=${shareProjectSubmissionsCsvFilename()}`,
    )
    .send(csv)
}

export default download
