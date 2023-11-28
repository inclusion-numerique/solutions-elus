import { NextRequest, NextResponse } from 'next/server'
import { ServerWebAppConfig } from '@sde/web/webAppConfig'

const nodeEnvironment = process.env.NODE_ENV
const isProd = nodeEnvironment === 'production'

const contentSecurityPolicy = `
  default-src 'self' https://matomo.incubateur.anct.gouv.fr https://*.adform.net https://sentry.incubateur.net https://secure.adnxs.com https://www.googletagmanager.com https://*.doubleclick.net https://snap.licdn.com https://px.ads.linkedin.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://matomo.incubateur.anct.gouv.fr https://*.adform.net https://secure.adnxs.com https://www.googletagmanager.com https://*.doubleclick.net https://snap.licdn.com https://px.ads.linkedin.com;
  script-src-attr 'none';
  style-src 'self' https: 'unsafe-inline';
  img-src 'self' data: https://secure.adnxs.com https://www.googletagmanager.com https://*.doubleclick.net https://snap.licdn.com https://px.ads.linkedin.com;
  frame-src https://www.youtube-nocookie.com/ https://*.adform.net https://secure.adnxs.com https://www.googletagmanager.com https://*.doubleclick.net https://snap.licdn.com https://px.ads.linkedin.com;
  object-src 'none';
  connect-src 'self' https://${ServerWebAppConfig.S3.documentsBucket}.${ServerWebAppConfig.S3.host} https://matomo.incubateur.anct.gouv.fr https://*.adform.net https://sentry.incubateur.net https://openmaptiles.geo.data.gouv.fr https://openmaptiles.github.io https://aides-territoires.beta.gouv.fr https://secure.adnxs.com https://www.googletagmanager.com https://*.doubleclick.net https://snap.licdn.com https://px.ads.linkedin.com;
  worker-src 'self' blob:;
  font-src 'self' https: data:;
  frame-ancestors 'self' https://matomo.incubateur.anct.gouv.fr https://*.adform.net https://secure.adnxs.com https://www.googletagmanager.com https://*.doubleclick.net https://snap.licdn.com https://px.ads.linkedin.com;
  form-action 'self';
  base-uri 'self';
  ${isProd ? 'upgrade-insecure-requests;' : ''}
`
  .replace(/\s{2,}/g, ' ')
  .trim()

const middleware = (request: NextRequest) => {
  // const forwardedProto = request.headers.get('X-Forwarded-Proto')
  // const requestHost = request.headers.get('host')
  // const baseUrl = process.env.BASE_URL

  /**
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
   * The MDN documentation states "Note: This is more secure than simply
   * configuring a HTTP to HTTPS (301) redirect on your server, where the
   * initial HTTP connection is still vulnerable to a man-in-the-middle attack."
   * But they keep applying this redirect in recommended SSL configs: https://ssl-config.mozilla.org/
   */
  // if (
  //   isProd &&
  //   // We redirect if protocol is not secure https
  //   (forwardedProto === 'http' ||
  //     // If we have a base url defined and the host is different
  //     // we redirect to the main domain defined in base_url
  //     (!!baseUrl && requestHost !== baseUrl))
  // ) {
  //   const domain = baseUrl || requestHost
  //   const httpsBase = `https://${domain ?? ''}`
  //   const requestUrl = new URL(request.url)
  //   const path = `${requestUrl.pathname}${requestUrl.search}`
  //   const redirectTo = `${httpsBase}${path}`

  //   return NextResponse.redirect(redirectTo)
  // }

  const response = NextResponse.next()

  if (nodeEnvironment === 'development') {
    response.headers.append('Access-Control-Allow-Headers', '*')
    response.headers.append('Access-Control-Allow-Origin', '*')
  }

  response.headers.append('X-Frame-Options', 'DENY')
  response.headers.append('X-Content-Type-Options', 'nosniff')
  response.headers.append('X-XSS-Protection', '1; mode=block')
  response.headers.delete('X-Powered-By')
  response.headers.append('Strict-Transport-Security', 'max-age=63072000')

  response.headers.append('Content-Security-Policy', contentSecurityPolicy)

  return response
}

export default middleware
