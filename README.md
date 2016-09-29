# Webapp skeleton

Frontend:
* MaterializeCSS
* jQuery ( modular setup with gulp )
* SASS (  compiled to gulp )
* PUG as view structure ( compiled with gulp )

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

I haven't used it to build anything serious, but might use it for some quick and dirty hackathon projects.