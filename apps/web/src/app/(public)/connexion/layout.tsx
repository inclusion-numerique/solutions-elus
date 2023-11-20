import { PropsWithChildren } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Connexion",
}

const ConnexionLayout = ({ children }: PropsWithChildren) => (
  <div className="fr-container">{children}</div>
)

export default ConnexionLayout
