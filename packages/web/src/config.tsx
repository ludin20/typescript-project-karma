export const sessionCookieName = 'karma:sess';

const APP_URL_MAP = {
  local: 'localhost:7001',
};

export const APP_URL = APP_URL_MAP[process.env.RAZZLE_KARMA_ENV || 'production'];

export const KARMA_ENV = process.env.RAZZLE_KARMA_ENV;
export const GRAPHQL_URL = process.env.RAZZLE_GRAPHQL_URL;

export const GA_ID = process.env.RAZZLE_GA_ID;

export const COMMIT_SHA = process.env.COMMIT_SHA;
