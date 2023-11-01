/** @type {import('next-sitemap').IConfig} */

import { getServerUrl } from '@sde/web/utils/baseUrl';

module.exports = {
  // siteUrl: 'https://solutionsdelus.gouv.fr',
  siteUrl: getServerUrl(),
  generateRobotsTxt: true,
};
