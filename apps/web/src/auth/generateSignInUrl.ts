export const generateSignInUrl = (callbackPath: string) => {
  return `/api/auth/signin?callbackUrl=${encodeURIComponent(callbackPath)}`
}
