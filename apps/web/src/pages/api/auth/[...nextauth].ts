import '@sde/web/auth/nextAuthSetup'
import EmailProvider from 'next-auth/providers/email'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { ServerWebAppConfig } from '@sde/web/webAppConfig'
import { sendVerificationRequest } from '@sde/web/auth/sendVerificationRequest'
import { nextAuthAdapter } from '@sde/web/auth/nextAuthAdapter'

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
    signIn: ({ user }) => !!user.email?.endsWith('@anct.gouv.fr'),

    session: ({ session, user }) => {
      session.user.id = user.id
      return session
    },
  },
}

export default NextAuth(authOptions)
