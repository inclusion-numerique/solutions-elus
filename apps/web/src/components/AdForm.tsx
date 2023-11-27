import Script from 'next/script'

// The Next <Script> tag expect a nonce as Next directly inject the code from the script file in an inline <script> tag
export const AdForm = ({ nonce }: { nonce?: string }) => {
  const isProd = process.env.NODE_ENV === 'production'

  // eslint-disable-next-line no-console
  !isProd && console.warn('AdForm is disabled in non-production environment')

  return isProd ? <Script nonce={nonce} src="/adform/adform.min.js" strategy="lazyOnload" /> : null;
}