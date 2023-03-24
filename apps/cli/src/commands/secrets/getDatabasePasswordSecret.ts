import { Argument, Command } from '@commander-js/extra-typings'
import { output } from '@sde/cli/output'
import { listSecrets } from '@sde/config/secrets/listSecrets'
import { findSecretByName } from '@sde/config/secrets/findSecretByName'
import { getSecretValue as configGetSecretValue } from '@sde/config/secrets/getSecretValue'
import { databasePasswordSecretName } from '@sde/config/secrets/databasePasswordSecretName'

/**
 * This command outputs available secrets names
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export const getDatabasePasswordSecret = new Command()
  .command('secrets:database-password')
  .addArgument(
    new Argument('<namespace>', 'Namespace of the target deployment'),
  )
  .action(async (namespace) => {
    const secretName = databasePasswordSecretName(namespace)

    const { secrets } = await listSecrets({ tags: ['database'] })
    const { id } = findSecretByName(secrets, secretName)
    const value = await configGetSecretValue({ id })

    output(value)
  })
