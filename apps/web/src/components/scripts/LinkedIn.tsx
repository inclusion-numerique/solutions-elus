import Script from 'next/script'

const LinkedIn = () => {
  const isProd = process.env.NODE_ENV === 'production'

  if (!isProd) {
    // eslint-disable-next-line no-console
    console.warn('LinkedIn tracking is disabled in non-production environment');
    return;
  }

  return (
    <>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://px.ads.linkedin.com/collect/?pid=3110769&fmt=gif" height="1" width="1" style={{display:'none'}} alt="" />
      </noscript>
      <Script id="linkedin" src="/scripts/linkedin.min.js" strategy="afterInteractive" />
    </>
  );
}

export default LinkedIn;