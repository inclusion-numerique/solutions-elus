import { Command } from '@commander-js/extra-typings'
import { createDotEnvFromSecrets } from '@sde/cli/commands/secrets/createDotEnvFromSecrets'
import { createGithubDeployment } from '@sde/cli/commands/github/createGithubDeployment'
import { updateGithubDeployment } from '@sde/cli/commands/github/updateGithubDeployment'
import { deactivateGithubDeployment } from '@sde/cli/commands/github/deactivateGithubDeployment'
import { createDotEnvFromCdk } from '@sde/cli/commands/infrastructure/createDotEnvFromCdk'
import { listSecrets } from '@sde/cli/commands/secrets/listSecrets'
import { getSecretValue } from '@sde/cli/commands/secrets/getSecretValue'
import { setupDatabaseSecret } from '@sde/cli/commands/secrets/setupDatabaseSecret'
import { createTfVarsFileFromEnvironment } from '@sde/cli/commands/infrastructure/createTfVarsFileFromEnvironment'

const program = new Command()

program.addCommand(listSecrets)
program.addCommand(getSecretValue)
program.addCommand(setupDatabaseSecret)
program.addCommand(createDotEnvFromCdk)
program.addCommand(createDotEnvFromSecrets)
program.addCommand(createGithubDeployment)
program.addCommand(updateGithubDeployment)
program.addCommand(deactivateGithubDeployment)
program.addCommand(createTfVarsFileFromEnvironment)

program.parse()
