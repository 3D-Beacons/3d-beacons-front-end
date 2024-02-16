// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: true,
  debug: false,
  apiHost: '${BEACONS_API_URL}',
  uniprotApiUrl: 'https://www.ebi.ac.uk/proteins/api/proteins/',
  gaTag: '${BEACONS_GA_TAG}'
};
