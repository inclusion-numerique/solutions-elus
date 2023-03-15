import { Argument, Command } from '@commander-js/extra-typings'
import { output } from '@sde/cli/output'
import { listSecrets } from '@sde/config/secrets/listSecrets'
import { findSecretByName } from '@sde/config/secrets/findSecretByName'
import { getSecretValue as configGetSecretValue } from '@sde/config/secrets/getSecretValue'

/**
 * This command outputs available secrets names
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export const getSecretValue = new Command()
  .command('secrets:get')
  .addArgument(new Argument('<name>', 'Name of the secret'))
  .action(async (name) => {
    const { secrets } = await listSecrets()
    const { id } = findSecretByName(secrets, name)
    const value = await configGetSecretValue({ id })

    output(value)
  })
