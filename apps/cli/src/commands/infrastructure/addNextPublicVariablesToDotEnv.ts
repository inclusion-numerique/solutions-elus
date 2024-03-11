// eslint-disable-next-line unicorn/prevent-abbreviations
import 'tsconfig-paths/register'
import { Argument, Command } from '@commander-js/extra-typings'
import { appendEnvVariablesToDotEnvFile } from '@sde/cli/dotEnvFile'
import { getTerritoiresJWT } from '@sde/cli/territoires'

// eslint-disable-next-line unicorn/prevent-abbreviations
export const addNextPublicVariablesToDotEnv = new Command()
  .command('dotenv:add-next-public')
  .addArgument(new Argument('<namespace>', 'deployment namespace'))
  .action(async (namespace) => {
    const territoiresJWT = await getTerritoiresJWT()
    await appendEnvVariablesToDotEnvFile({
      comment: 'Next public environment needed at build time',
      environmentVariables: [
        { name: 'NEXT_PUBLIC_SENTRY_ENVIRONMENT', value: namespace },
        { name: 'NEXT_PUBLIC_TERRITOIRES_JWT', value: territoiresJWT },
      ],
    })
  })
