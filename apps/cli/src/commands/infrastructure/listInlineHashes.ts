import { Command } from '@commander-js/extra-typings'
import { glob } from 'glob'
import { resolve } from 'node:path'

export const listInlineHashes = new Command()
  .command('csp:list-inline-hashes')
  .action(async () => {
    const builtHtmlFiles = await glob(
      resolve(__dirname, '../../../../web/.next/server', '**/*.html'),
      { ignore: 'node_modules/**' },
    )
    console.log('BUILT HTML FILES', builtHtmlFiles)
  })
