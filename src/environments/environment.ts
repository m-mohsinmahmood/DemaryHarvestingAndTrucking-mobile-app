// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://dht-prod.azure-api.net/dht-dev',
  azureUrl: 'https://dht-prod.azurewebsites.net/api/',

  firebase: {
  // dev account
  apiKey: 'AIzaSyCdMGmwBIclPi-IKUyzFkSMLqhlMYTJmvI',
  authDomain: 'dht-fb-dev.firebaseapp.com',
  projectId: 'dht-fb-dev',
  storageBucket: 'dht-fb-dev.appspot.com',
  messagingSenderId: '595303405617',
  appId: '1:595303405617:web:882b17fba69067596cdd10',
  measurementId: 'G-BD6QK30Y3Z'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
