/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @next/next/no-img-element */

const Manageo = () => {
  const isProd = process.env.NODE_ENV === 'production'

  if (!isProd) {
    // eslint-disable-next-line no-console
    console.warn('Manageo tracking is disabled in non-production environment');
    return;
  }

  return (
    <noscript>
      <img src="https://secure.adnxs.com/seg?t=2&add=35313705" width="1" height="1" alt="" />
      <img src="https://secure.adnxs.com/px?id=1726839&t=2" width="1" height="1" alt="" />
    </noscript>
  );
}

export default Manageo;