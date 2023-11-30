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
      {/* eslint-disable-next-line @next/next/no-img-element, no-template-curly-in-string */}
      <img src="https://ad.doubleclick.net/ddm/activity/src=3689183;type=solelus;cat=2023-0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?" width="1" height="1" alt=""/>
    </>
  );
}

export default GoogleTagManager;