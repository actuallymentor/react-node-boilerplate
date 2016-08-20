// Dependency declaration, don't forget tp 'npm install' in the frontend/src folder
const gulp 		 = require( 'gulp' )
const rimraf	 = require( 'rimraf' )
const sass 		 = require( 'gulp-sass' )
const babel 	 = require( 'gulp-babel' )
const sourcemaps = require( 'gulp-sourcemaps' )
const concat 	 = require( 'gulp-concat' )
const pug 		 = require( 'gulp-pug' )
const watch 	 = require( 'gulp-watch' )

// Put all relevamt paths in one place
const paths = {
	source: {
		root: __dirname,
		scss: 	__dirname + '/styles/*.scss',
		js: 	__dirname + '/scripts/*.js',
		pug: 	__dirname + '/views/*.pug'
	},
	build: {
		root: 	__dirname + '/../public/',
		css: 	__dirname + '/../public/css/',
		js: 	__dirname + '/../public/js/',
		html: 	__dirname + '/../public/'
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
gulp.task( 'styles', ['clean'], ( cb ) => {
	return gulp.src( paths.source.scss )
	.pipe( sass().on( 'error', sass.logError ) )
	.pipe( gulp.dest( paths.build.css ) )
} )

// Compiling and writing scripts, they are all combined into one all.js file
gulp.task( 'scripts', ['clean'], ( cb ) => {
	return gulp.src( paths.source.js )
	.pipe( sourcemaps.init() )
	.pipe( babel({
		presets: ['es2015']
	}))
	.pipe( concat('all.js') )
	.pipe( sourcemaps.write('.') )
	.pipe( gulp.dest( paths.build.js ) )
} )

// Compiling and writing the pug synax views to html
gulp.task( 'views', ['clean'], ( cb ) => {
  return gulp.src( paths.source.pug )
  .pipe( pug() )
  .pipe( gulp.dest( paths.build.html ) )
} )

// Have one task that completes all build tasks
gulp.task('build', ['clean', 'styles', 'scripts', 'views'], () => {})

// Watch the source directory for changes and compile when changes are detected
gulp.task( 'watch', ['build'], () => {
  return watch( paths.source.root, () => {
    gulp.start( 'build' )
  } )
} )