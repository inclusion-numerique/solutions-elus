import { headers } from 'next/headers'
import { Matomo } from '@sde/web/app/Matomo'
import { PublicWebAppConfig, ServerWebAppConfig } from '@sde/web/webAppConfig'
import { Dsfr } from '@sde/web/app/Dsfr'

const fontsToPreload = ['Marianne-Regular', 'Marianne-Bold', 'Marianne-Medium']

const Head = () => {
  // Do we want to disable SSG for CSFR on this website ?
  // const nonce = headers().get('x-sde-script-nonce') ?? undefined
  const nonce = undefined

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {ServerWebAppConfig.isMain ? null : (
        // Do not index preview environments
        <meta name="robots" content="noindex" />
      )}
      <title>{PublicWebAppConfig.projectTitle}</title>
      <meta name="theme-color" content="#000091" />
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
      <link
        rel="shortcut icon"
        href="/favicon/favicon.ico"
        type="image/x-icon"
      />
      <link
        rel="manifest"
        href="/favicon/manifest.webmanifest"
        crossOrigin="use-credentials"
      />
      <meta name="description" content={PublicWebAppConfig.projectTitle} />
      <link rel="icon" href="/favicon.ico" />
      {fontsToPreload.map((font) => (
        <link
          key={font}
          rel="preload"
          crossOrigin="anonymous"
          href={`/dsfr/fonts/${font}.woff2`}
          as="font"
          type="font/woff2"
        />
      ))}
      <Dsfr nonce={nonce} />
      <Matomo nonce={nonce} />
    </>
  )
}

export default Head
