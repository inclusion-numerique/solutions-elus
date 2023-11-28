import Script from 'next/script'

const Infopro = () => {
  const isProd = process.env.NODE_ENV === 'production'

  if (!isProd) {
    // eslint-disable-next-line no-console
    console.warn('Infopro tracking is disabled in non-production environment');
    return;
  }

  return (
    <>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src='https://pubads.g.doubleclick.net/activity;xsp=5273930;ord=1?' width="1" height="1" alt="" />
      </noscript>
      <Script id="infopro" src="/scripts/infopro.min.js" strategy="afterInteractive" />
    </>
  );
}

export default Infopro;