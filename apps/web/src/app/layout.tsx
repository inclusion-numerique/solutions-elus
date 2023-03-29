import '@sde/web/app/app.css'
import { PropsWithChildren } from 'react'
import { EnvInformation } from './EnvInformation'

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="fr" data-fr-theme="light" data-fr-scheme="light">
    <body>
      <EnvInformation />
      {children}
    </body>
  </html>
)

export default RootLayout
