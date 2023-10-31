import '@sde/web/app/app.css'
import { PropsWithChildren } from 'react'
import { EnvInformation } from './EnvInformation'

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="fr" data-fr-theme="light" data-fr-scheme="light">
    <head>
      <meta name="google-site-verification" content="ECqXks0iXLp-h0vSlonlvDmmtnvT1oGe1inVMw4EMwQ" />
    </head>
    <body>
      <EnvInformation />
      {children}
    </body>
  </html>
)

export default RootLayout
