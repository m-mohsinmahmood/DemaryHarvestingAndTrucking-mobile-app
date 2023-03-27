// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://dht-prod.azure-api.net/dht-dev',
  azureUrl: 'https://dht-prod.azurewebsites.net/api/',

  firebase: {
    apiKey: "AIzaSyD5PQuHhPv-82wkMtoi05KVBLqxwrzOci4",
    authDomain: "dht-fb-prod.firebaseapp.com",
    projectId: "dht-fb-prod",
    storageBucket: "dht-fb-prod.appspot.com",
    messagingSenderId: "864143335811",
    appId: "1:864143335811:web:aaa117ef3fddaa502796b6"
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
