import Script from 'next/script'

const AdForm = () => {
  const isProd = process.env.NODE_ENV === 'production'

  if (!isProd) {
    // eslint-disable-next-line no-console
    console.warn('AdForm tracking is disabled in non-production environment');
    return;
  }

  return (
    <>
      <noscript>
        <p style={{ margin:0, padding:0, border:0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://server.adform.net/Serving/TrackPoint/?pm=2867381&ADFPageName=2023-11-solutionsdelus.gouv.fr-PageArrivee-Solutiondelus&ADFdivider=|" width="1" height="1" alt="" />
        </p>
      </noscript>
      <Script id="adform" src="/scripts/adform.min.js" strategy="afterInteractive" />
    </>
  );
};

export default AdForm;