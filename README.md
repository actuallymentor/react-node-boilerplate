# React Node Boilerplate ![Build Status](https://travis-ci.org/actuallymentor/react-node-boilerplate.svg?branch=development)  ![GitHub version](https://badge.fury.io/gh/actuallymentor%2Freact-node-boilerplate.svg)
--------------------

**WORK IN PROGRESS**

Frontend:
* React.js
* SASS
* Webpack compilation

Backend:
* NodeJS + Express
* Sequelize with postgres
* Passport with local strategy
* Testing with Mocha

Environment variables:

```shell
export port=8080
export dbHost=localhost
export dbDialect=postgres
export dbName=app
export dbUser=app
export dbPass=app
export dbForce=true
export dbTimestamps=true
export cookieSecret='super mega ukulele'
export cookieMaxage=3600000
export cookieSecure=false
export sessionSecret='super mega ukulele'
export appURL='http://www.web.dev'
```


This repository was a little experiment in building a simple web app structure with a separate frontend codebase and backend codebase ( no server side rendering ).