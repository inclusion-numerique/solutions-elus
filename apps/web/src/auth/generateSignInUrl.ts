export const generateSignInUrl = (callbackPath: string) => `/api/auth/signin?callbackUrl=${encodeURIComponent(callbackPath)}`
