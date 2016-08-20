const gulp 		 = require( 'gulp' )
const rimraf	 = require( 'rimraf' )
const sass 		 = require( 'gulp-sass' )
const babel 	 = require( 'gulp-babel' )
const sourcemaps = require( 'gulp-sourcemaps' )
const concat 	 = require( 'gulp-concat' )
const pug 		 = require( 'gulp-pug' )
const watch 	 = require( 'gulp-watch' )

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

gulp.task( 'default', () => {
  // Gulp default
  console.log( 'Gulp works, but this command does nothing' )
} )


gulp.task( 'clean', ( cb ) => {
	rimraf( paths.build.root, cb )
}) 

gulp.task( 'styles', ['clean'], ( cb ) => {
	console.log( 'writing styles from ' + paths.source.scss )
	console.log( 'writing styles to ' + paths.build.css )
	return gulp.src( paths.source.scss )
	.pipe( sass().on( 'error', sass.logError ) )
	.pipe( gulp.dest( paths.build.css ) )
} )

gulp.task( 'scripts', ['clean'], ( cb ) => {
	console.log( 'writing scripts from ' + paths.source.js )
	console.log( 'writing scripts to ' + paths.build.js )
	return gulp.src( paths.source.js )
	.pipe( sourcemaps.init() )
	.pipe( babel({
		presets: ['es2015']
	}))
	.pipe( concat('all.js') )
	.pipe( sourcemaps.write('.') )
	.pipe( gulp.dest( paths.build.js ) )
} )

gulp.task( 'views', ['clean'], ( cb ) => {
	console.log( 'writing views from ' + paths.source.pug )
	console.log( 'writing views to ' + paths.build.html )
  return gulp.src( paths.source.pug )
  .pipe( pug({}) )
  .pipe( gulp.dest( paths.build.html ) )
} )

gulp.task('build', ['clean', 'styles', 'scripts', 'views'], () => {})

gulp.task( 'watch', ['build'], () => {
  return watch( paths.source.root, () => {
    gulp.start( 'build' )
  } )
} )