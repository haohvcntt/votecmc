import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'CMCUVote',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44344/',
    redirectUri: baseUrl,
    clientId: 'CMCUVote_App',
    responseType: 'code',
    scope: 'offline_access CMCUVote',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44344',
      rootNamespace: 'CMCUVote',
    },
  },
} as Environment;
