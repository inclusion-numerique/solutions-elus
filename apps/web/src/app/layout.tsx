import '@sde/web/app/app.css'
import { PropsWithChildren } from 'react'
import { Metadata, Viewport } from 'next'
// import { headers } from 'next/headers'
import { Matomo } from '@sde/web/app/Matomo'
import { PublicWebAppConfig, ServerWebAppConfig } from '@sde/web/webAppConfig'
import { Dsfr } from '@sde/web/app/Dsfr'
import { EnvInformation } from './EnvInformation'
import { getServerBaseUrl } from '../utils/baseUrl'

const fontsToPreload = ['Marianne-Regular', 'Marianne-Bold', 'Marianne-Medium']

export const metadata: Metadata = {
  metadataBase: new URL(getServerBaseUrl()),
  title: {
    default: PublicWebAppConfig.projectTitle,
    template: `%s | ${PublicWebAppConfig.projectTitle}`
  },
  description: PublicWebAppConfig.projectDescription,
  keywords: [
    "Transition écologique collectivité",
    "Transition écologique commune",
    "Transition écologique EPCI",
    "Aides collectivité",
    "Projet collectivité",
    "Développement rural",
    "Projets ruraux",
    "Exemple projet rural",
    "Accompagnement commune",
    "Projet développement rural",
    "Solution territoire",
    "Projets communes",
    "Collaboration collectivités"
  ],
  authors: [
    {
      name: "Agence Nationale de la Cohésion des Territoires",
      url: new URL("https://agence-cohesion-territoires.gouv.fr/"),
    },
    {
      name: "Ministère de la Transition écologique et de la Cohésion des territoires",
      url: new URL("https://www.ecologie.gouv.fr/"),
    },
    {
      name: "Conseil national de la refondation",
      url: new URL("https://conseil-refondation.fr/"),
    }
  ],
  openGraph: {
    title: PublicWebAppConfig.projectTitle,
    description: PublicWebAppConfig.projectDescription,
    url: getServerBaseUrl(),
    siteName: PublicWebAppConfig.projectTitle,
    images: [
      {
        url: new URL("/images/village.webp", getServerBaseUrl()),
        width: 1920,
        height: 1280,
        alt: PublicWebAppConfig.projectTitle,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: PublicWebAppConfig.projectTitle,
      template: `%s | ${PublicWebAppConfig.projectTitle}`
    },
    description: PublicWebAppConfig.projectDescription,
    site: "@ANCTerritoires",
    siteId: "2527819680",
    creator: "@ANCTerritoires",
    creatorId: "2527819680",
    images: [
      {
        url: new URL("/images/village.webp", getServerBaseUrl()),
        width: 1920,
        height: 1280,
        alt: PublicWebAppConfig.projectTitle,
        type: "image/webp",
      },
    ],
  },
  verification: {
    google: "ECqXks0iXLp-h0vSlonlvDmmtnvT1oGe1inVMw4EMwQ"
  },
  alternates: {
    canonical: getServerBaseUrl(),
  },
  robots: ServerWebAppConfig.isMain
    ? { index: true, follow: true }
    : { index: false, follow: false, noimageindex: true },
  referrer: "origin-when-cross-origin",
  icons: [
    {
      rel: "icon",
      url: "/favicon/favicon.ico",
      sizes: "any",
      type: "image/x-icon",
    },
    {
      rel: "icon",
      url: "/favicon/favicon.svg",
      sizes: "any",
      type: "image/svg+xml",
    },
    {
      rel: "shortcut icon",
      url: "/favicon/favicon.ico",
      sizes: "any",
      type: "image/x-icon",
    },
    {
      rel: "apple-touch-icon",
      url: "/favicon/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  ],
  manifest: new URL("/favicon/manifest.webmanifest", getServerBaseUrl()),
}

export const viewport: Viewport = {
  themeColor: "#000091",
  colorScheme: "only light",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const RootLayout = ({ children }: PropsWithChildren) => {
  // Do we want to disable SSG for CSFR on this website ?
  // const nonce = headers().get('x-sde-script-nonce') ?? undefined
  const nonce = undefined

  return (
    <html lang="fr" data-fr-theme="light" data-fr-scheme="light">
      <head>
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
      </head>
      <body>
        <EnvInformation />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
