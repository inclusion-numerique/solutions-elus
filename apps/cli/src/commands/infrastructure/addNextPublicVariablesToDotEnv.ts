// eslint-disable-next-line unicorn/prevent-abbreviations
import 'tsconfig-paths/register'
import { Argument, Command } from '@commander-js/extra-typings'
import { appendEnvVariablesToDotEnvFile } from '@sde/cli/dotEnvFile'
import { getTerritoiresJWT } from '@sde/cli/territoires'
import { output } from '@sde/cli/output'

// eslint-disable-next-line unicorn/prevent-abbreviations
export const addNextPublicVariablesToDotEnv = new Command()
  .command('dotenv:add-next-public')
  .addArgument(new Argument('<namespace>', 'deployment namespace'))
  .action(async (namespace) => {
    const environmentVariables = [
      { name: 'NEXT_PUBLIC_SENTRY_ENVIRONMENT', value: namespace },
    ]

    const territoiresJWT = await getTerritoiresJWT()
    environmentVariables.push(
      { name: 'NEXT_PUBLIC_TERRITOIRES_JWT', value: territoiresJWT }
    )
    
    await appendEnvVariablesToDotEnvFile({
      comment: 'Next public environment needed at build time',
      environmentVariables,
    })

    output(`${environmentVariables.length} secrets added to .env file`)
  })
