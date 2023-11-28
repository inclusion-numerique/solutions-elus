import Script from 'next/script'

const Matomo = () => {
  const isProd = process.env.NODE_ENV === 'production'

  if (!isProd) {
    // eslint-disable-next-line no-console
    console.warn('Matomo tracking is disabled in non-production environment');
    return;
  }

  return (
    <Script id="matomo" src="/scripts/matomo.min.js" strategy="afterInteractive" />
  );
}

export default Matomo;