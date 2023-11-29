import Script from 'next/script'

const GoogleTagManager = () => {
  const isProd = process.env.NODE_ENV === 'production'

  if (!isProd) {
    // eslint-disable-next-line no-console
    console.warn('Google Tag Manager tracking is disabled in non-production environment');
    return;
  }

  return (
    <>
      <Script async id="google-tag-manager" src="https://www.googletagmanager.com/gtag/js?id=DC-3689183" strategy="afterInteractive"/>
      <Script id="googe-analytics" src="/scripts/google-analytics.min.js" strategy="afterInteractive"/>
    </>
  );
}

export default GoogleTagManager;