import { Environment } from '@abp/ng.core';

const baseUrl = 'https://vote.cmc-u.edu.vn';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'CMCUVote',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://api-vote.cmc-u.edu.vn/',
    redirectUri: 'https://vote.cmc-u.edu.vn',
    clientId: 'CMCUVote_App',
    responseType: 'code',
    scope: 'offline_access CMCUVote',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://api-vote.cmc-u.edu.vn',
      rootNamespace: 'CMCUVote',
    },
  },
} as Environment;
