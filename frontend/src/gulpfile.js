// Dependency declaration, don't forget tp 'npm install' in the frontend/src folder
const gulp 		 = require( 'gulp' )
const rimraf	 = require( 'rimraf' )
const sass 		 = require( 'gulp-sass' )
const babel 	 = require( 'gulp-babel' )
const sourcemaps = require( 'gulp-sourcemaps' )
const concat 	 = require( 'gulp-concat' )
const pug 		 = require( 'gulp-pug' )
const watch 	 = require( 'gulp-watch' )
const uglify 	 = require( 'gulp-uglify' )
const uglifycss  = require( 'gulp-uglifycss' )

// Error handling
function swallowError (error) {

  // Details of the error in the console
  console.log( error.toString() )

  this.emit( 'end' )
}

// Put all relevamt paths in one place
const paths = {
	source: {
		root: 	__dirname,
		styles: __dirname + '/styles/*',
		js: {
			app: 	__dirname + '/scripts/*.js',
			deps: 	__dirname + '/scripts/dependencies/*.js'
		},
		pug: 	__dirname + '/views/**/*.pug',
		fonts: __dirname + '/fonts/**/*'
	},
	build: {
		root: 	__dirname + '/../public/',
		css: 	__dirname + '/../public/css/',
		js: 	__dirname + '/../public/js/',
		html: 	__dirname + '/../public/',
		fonts:  __dirname + '/../public/fonts/'
	}
}

// Make the default task listen for changes
gulp.task( 'default', () => {
	gulp.start( 'watch' )
} )

// Rmrf task that deletes the build files before tasks
gulp.task( 'clean', ( cb ) => {
	rimraf( paths.build.root, cb )
}) 

// Compiling and writing styles
gulp.task( 'styles', ( cb ) => {
	return gulp.src( paths.source.styles )
	.pipe( sourcemaps.init() )
	.pipe( sass() )
	.on( 'error', swallowError )
	.pipe( concat('styles.css') )
	.pipe( uglifycss({}) )
	.on( 'error', swallowError )
	.pipe( sourcemaps.write('.') )
	.pipe( gulp.dest( paths.build.css ) )
} )

// Compiling and writing styles
gulp.task( 'fonts', ( cb ) => {
	return gulp.src([paths.source.fonts])
	.pipe(gulp.dest(paths.build.fonts));
} )

// Compiling and writing scripts, they are all combined into one all.js file
gulp.task( 'dependency-scripts', ( cb ) => {
	return gulp.src( paths.source.js.deps )
	.pipe( sourcemaps.init() )
	.pipe( concat('dependencies.js') )
	.pipe( uglify() )
	.pipe( sourcemaps.write('.') )
	.pipe( gulp.dest( paths.build.js ) )
} )

// Compiling and writing scripts, they are all combined into one all.js file
gulp.task( 'scripts', ( cb ) => {
	return gulp.src( paths.source.js.app )
	.pipe( sourcemaps.init() )
	.pipe( concat('app.js') )
	.pipe( babel({
		presets: ['es2015']
	}))
	.on( 'error', swallowError )
	.pipe( uglify() )
	.pipe( sourcemaps.write('.') )
	.pipe( gulp.dest( paths.build.js ) )
} )

// Compiling and writing the pug synax views to html
gulp.task( 'views', ( cb ) => {
	return gulp.src( paths.source.pug )
	.pipe( pug() )
	.pipe( gulp.dest( paths.build.html ) )
} )

// Have one task that completes all build tasks
gulp.task('build', ['clean', 'styles', 'fonts', 'dependency-scripts', 'scripts', 'views'], () => {})

// Watch the source directory for changes and compile when changes are detected
gulp.task( 'watch', ['clean'], () => {
	gulp.start( 'build' )
	gulp.watch( paths.source.js.app, ['scripts'] )
	gulp.watch( paths.source.js.deps, ['dependency-scripts'] )
	gulp.watch( paths.source.styles, ['styles'] )
	gulp.watch( paths.source.fonts, ['fonts'] )
	gulp.watch( paths.source.pug, ['views'] )
} )