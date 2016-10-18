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
const browserify = require( 'browserify' )
const watchify	 = require( 'watchify' )
const source     = require( 'vinyl-source-stream' )
const buffer 	 = require( 'vinyl-buffer' )

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
		styles: {
			root: __dirname + '/frontend/src/styles/',
			materialize: __dirname + '/node_modules/materialize-css/dist/'
		},
		js: __dirname + '/frontend/src/scripts/',
		pug: 	__dirname + '/frontend/src/views/**/*.pug',
		fonts: __dirname + '/frontend/src/fonts/**/*'
	},
	build: {
		root: 	__dirname + '/frontend/public/',
		css: 	__dirname + '/frontend/public/css/',
		js: 	__dirname + '/frontend/public/js/',
		html: 	__dirname + '/frontend/public/',
		fonts:  __dirname + '/frontend/public/fonts/'
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
	return gulp.src( paths.source.styles.root + '*' )
	.pipe( sourcemaps.init() )
	.pipe( sass() )
	.on( 'error', swallowError )
	.pipe( concat('styles.css') )
	.pipe( uglifycss({}) )
	.on( 'error', swallowError )
	.pipe( sourcemaps.write('.') )
	.pipe( gulp.dest( paths.build.css ) )
} )

// Dependencies
gulp.task( 'materialize', ( cb ) => {
	// Get materialize css
	gulp.src(paths.source.styles.materialize + 'css/materialize.css')
	.pipe(gulp.dest(paths.source.styles.root))

	// Get materialize fonts
	gulp.src(paths.source.styles.materialize + 'fonts/roboto/*')
	.pipe(gulp.dest(paths.build.fonts + '/roboto'))
	return
} )


var browser
browser = browser || watchify(
	browserify( paths.source.js + 'main.js', {
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	} )
	.transform("babelify", {
		presets: ["es2015"]
	})
	)
// Compiling and writing scripts, they are all combined into one all.js file
function bundle() {
	console.log('Building scripts')
	return browser
	.bundle()
	.on( 'error', swallowError )
	.pipe( source('app.js') )
	.pipe( buffer() )
	.pipe( sourcemaps.init({loadMaps: true}) )
	.pipe( uglify() )
	.pipe( sourcemaps.write('.') )
	.pipe( gulp.dest(paths.build.js) )
	.on( 'end', () => {
		console.log( 'Scripts done' )
	} )
}
browser.on( 'update', bundle )
gulp.task( 'scripts-watch', bundle )

gulp.task( 'scripts-init', () => {
	return browserify( paths.source.js + 'main.js', {
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	} )
	.transform("babelify", {
		presets: ["es2015"]
	})
	.bundle()
	.on( 'error', swallowError )
	.pipe( source('app.js') )
	.pipe( buffer() )
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe( uglify() )
	.pipe(sourcemaps.write('.'))
	.pipe( gulp.dest(paths.build.js) )
} )

// Compiling and writing the pug synax views to html
gulp.task( 'views', ( cb ) => {
	return gulp.src( paths.source.pug )
	.pipe( pug() )
	.pipe( gulp.dest( paths.build.html ) )
} )

// Have one task that completes all build tasks
gulp.task('build', ['clean','materialize' ,'styles', 'scripts-init', 'views'], () => {})

// Watch the source directory for changes and compile when changes are detected
gulp.task( 'watch', ['clean'], () => {
	gulp.start( 'build' )
	gulp.watch( paths.source.styles, ['styles'] )
	gulp.watch( paths.source.fonts, ['fonts'] )
	gulp.watch( paths.source.pug, ['views'] )
	gulp.start( 'scripts-watch' )
} )