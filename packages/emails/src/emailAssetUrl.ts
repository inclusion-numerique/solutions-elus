// TODO This @sde/web import is a cyclic dependency. See how to resolve this.
// eslint-disable-next-line import/no-extraneous-dependencies
import { getServerBaseUrl } from '@sde/web/utils/baseUrl'

export const emailAssetUrl = (assetPath: string): string =>
  `${getServerBaseUrl()}${assetPath}`
