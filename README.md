# React Node Boilerplate ![Build Status](https://travis-ci.org/actuallymentor/react-node-boilerplate.svg?branch=development)  ![GitHub version](https://badge.fury.io/gh/actuallymentor%2Freact-node-boilerplate.svg)

<img height="50px" alt="react" src="http://i.imgur.com/84PLMw0.jpg" />
<img height="50px" alt="webpack" src="http://i.imgur.com/ZtANAeL.png />
<img height="50px" alt="browsersync" src="http://i.imgur.com/L5peje9.png" />
<img height="50px" alt="node" src="http://i.imgur.com/PYufxoi.png" />

<img height="50px" alt="postgres" src="http://i.imgur.com/84PLMw0.jpg" />
<img height="50px" alt="sequeluze" src="http://i.imgur.com/84PLMw0.jpg" />
<img height="50px" alt="passport" src="http://i.imgur.com/84PLMw0.jpg" />
<img height="50px" alt="mocha" src="http://i.imgur.com/84PLMw0.jpg" />


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