# contrl.one - Application

## Running The App

To run the app, follow these steps.

## Installation

All the Aurelia-related files are in the `client` directory and all NodeJS files in `server`. To install, clone this repo to your target folder and then do the following:

1. Do `git submodule update --init` to pull the NodeJS API into the `server` directory
2. `cd` into `server` and do `npm install`
3. Run the Node server by doing `node server.js`
4. `cd` into `client` and do `npm install` followed by `jspm install`
5. Do `gulp watch` to run the Gulp tasks
6. View the app in your browser at localhost:8000

#### Configuration
The configuration is done by ```bundles.js``` file.