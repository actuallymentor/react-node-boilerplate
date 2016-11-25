# React Node Boilerplate ![Build Status](https://travis-ci.org/actuallymentor/react-node-boilerplate.svg?branch=development)  ![GitHub version](https://badge.fury.io/gh/actuallymentor%2Freact-node-boilerplate.svg)

<img height="50px" alt="react" src="http://i.imgur.com/D19TgT8.png" />
<img height="50px" alt="webpack" src="http://i.imgur.com/ZtANAeL.png" />
<img height="50px" alt="browsersync" src="http://i.imgur.com/L5peje9.png" />
<img height="50px" alt="node" src="http://i.imgur.com/PYufxoi.png" />
<img height="50px" alt="postgres" src="http://i.imgur.com/AldJhsu.png" />
<img height="50px" alt="sequelize" src="http://i.imgur.com/Tb20nQM.png" />
<img height="50px" alt="passport" src="http://i.imgur.com/AFsm9Z1.png" />
<img height="50px" alt="mocha" src="http://i.imgur.com/yo9d9Qe.png" />

**WORK IN PROGRESS**

| Component | System |
| ---------- | -------- |
| View engine | React.js |
| ES6 / SASS compiler | Webpack with babel and Browsersync |
| Backend engine | Node.js |
| Database | PostgreSQL |
| ORM | Sequelize |
| Authentication | Passport.js |
| Testing framework | Mocha with Chai and Supertest |

Integrates well with TravisCI

## Getting started

Git clone this repository and npm install.

``` shell
git clone https://github.com/actuallymentor/react-node-boilerplate my-app
cd my-app
npm install
```

**Environment**

After installing set all the required environment variables. This application uses the [ dotenv ]( https://github.com/bkeepers/dotenv ) package. Ann environment variables should be put into a .env file in the root of the project.

You can disable dotenv by setting the environment variable noenv. This is useful for example when testing with TravisCI since the .env file should not be synced to your git repository.

```shell
noenv=true
```

**Compiling the frontend**

The frontend source in frontend/src is compiled using webpack. Make sure you have it globally installed:

```shell
npm install -g webpack
```

You can then fun webpack either once:

```shell
webpack --progress -d # for development mode, no minification etc
webpack --progress -p # for production code

```

Or as a watching service that rebuilds when the frontend is edited

```shell
webpack --progress -d --watch # for development mode, no minification etc
webpack --progress -p --watch # for production code
```

Note that webpack with --watch will trigger browsersync, this does not mean your backend is running. Only that your frontend is statically served.

**Starting the backend**

The backend uses app.js as the central file. When sterted through npm the application is monitored by [ nodemon ]( https://github.com/remy/nodemon ) and thus restarts whenever you make an edit:

```shell
npm start
```

While nodemon is a dev dependency I recommend installing is globally.

**Testing**

Before getting started on development I recommend running the test command to see if the app functions as expected.

```shell
npm test
```
