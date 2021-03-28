# Code Test documentation

My local Versions are currently
- Node: v14.15.1
- NPM: v6.14.8
- @angular/cli: 11.2.6
  
## NB
If you want to deploy and serve the compiled Angular app, complete the Client Setup first, or just note that you will have to kill and restart the Node server once the Anuglar app has been deployed.

## Client Setup
Navigate to nitro-test > posts-client

Run 
> npm install

And depending on your system, run this for Windows
> npm run build:deploy:win

Or this for Bash
> npm run build:deploy:bash


This will compile and deploy the angular app to a public folder for the Node server to present.
If for what ever reason the deploy commands aren't working for you, you can always run the Angular App using:
> $ nitro-test/posts-client> npm run start | ng serve

The CORS issue was taken care of for the purposes of developement.

## Server setup
Navigate to the top level of the project setup and run
> npm install

> node index.js

Expected result is
> Server running: listening on port 3000

## Testing
Navigate to the Angular app and run 
> ng test


## Package Versions

Package | Version | 
------------ | ------------- | 
@angular-devkit/architect | 0.1102.6 |
@angular-devkit/build-angular | 0.1102.6 |
@angular-devkit/core | 11.2.6 |
@angular-devkit/schematics | 11.2.6 |
@angular/cli | 11.2.6 |
@schematics/angular | 11.2.6 |
@schematics/update | 0.1102.6 |
rxjs | 6.6.6 |
typescript | 4.1.5 |
