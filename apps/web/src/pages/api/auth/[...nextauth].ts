import '@sde/web/auth/nextAuthSetup'
import EmailProvider from 'next-auth/providers/email'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { ServerWebAppConfig } from '@sde/web/webAppConfig'
import { sendVerificationRequest } from '@sde/web/auth/sendVerificationRequest'
import { nextAuthAdapter } from '@sde/web/auth/nextAuthAdapter'

const whitelistedSigninEmailDomains = [
  '@anct.gouv.fr',
  '@ecologie-territoires.gouv.fr',
]

export const authOptions: NextAuthOptions = {
  adapter: nextAuthAdapter,
  pages: {
    signIn: '/connexion/login',
    signOut: '/connexion/logout',
    error: '/connexion/erreur',
    verifyRequest: '/connexion/verification',
  },
  providers: [
    EmailProvider({
      ...ServerWebAppConfig.Auth.Email,
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    signIn: ({ user: { email } }) => {
      if (!email) {
        return false
      }
      return whitelistedSigninEmailDomains.some((domain) =>
        email.endsWith(domain),
      )
    },
    session: ({ session, user }) => {
      session.user.id = user.id
      return session
    },
  },
}

export default NextAuth(authOptions)
