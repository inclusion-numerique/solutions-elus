import { Command } from '@commander-js/extra-typings'
import { output } from '@sde/cli/output'
import axios from 'axios'
import { projectTitle } from '@sde/config/config'

export const checkDeploymentStatus = new Command()
  .command('deployment:check-status')
  .argument('<url>', 'deployment url')
  .action(async (url) => {
    const client = axios.create({
      baseURL: url,
      headers: {
        Accept: 'text/html',
      },
    })

    const statusResponse = await client.get<{ status: string }>('/api/health')
    output(`Status is ${statusResponse.data.status}`)

    const homePageResponse = await client.get<string>('/')
    if (!homePageResponse.data.startsWith('<!DOCTYPE html>')) {
      throw new Error('Home page is not valid html')
    }

    if (!homePageResponse.data.includes(projectTitle)) {
      throw new Error(
        `Project title "${projectTitle}" is not present on the homepage`,
      )
    }

    output(`Homepage looks like valid html`)
  })
