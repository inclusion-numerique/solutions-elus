import Script from 'next/script'

// The Next <Script> tag expect a nonce as Next directly inject the code from the script file in an inline <script> tag
export const AdForm = ({ nonce }: { nonce?: string }) => {
  const isProd = process.env.NODE_ENV === 'production'

  // eslint-disable-next-line no-console
  !isProd && console.warn('AdForm is disabled in non-production environment')

  return isProd ? (
    <>
      <noscript>
        <p style={{ margin:0, padding:0, border:0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://server.adform.net/Serving/TrackPoint/?pm=2867381&ADFPageName=2023-11-solutionsdelus.gouv.fr-PageArrivee-Solutiondelus&ADFdivider=|" width="1" height="1" alt="" />
        </p>
      </noscript>
      <Script nonce={nonce} src="/adform/adform.min.js" strategy="lazyOnload" />
    </>
  ) : null;
}