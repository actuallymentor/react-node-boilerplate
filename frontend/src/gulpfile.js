const gulp 		 = require( 'gulp' )
const rimraf	 = require( 'rimraf' )
const sass 		 = require( 'gulp-sass' )
const babel 	 = require( 'gulp-babel' )
const sourcemaps = require( 'gulp-sourcemaps' )
const concat 	 = require( 'gulp-concat' )
const pug 		 = require( 'gulp-pug' )

const paths = {
	source: {
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

gulp.task('default', function() {
  // Gulp default
  console.log( 'Gulp works, but this command does nothing' )
})


gulp.task('clean', function(cb) {
	rimraf( paths.build.root, cb )
})

gulp.task('styles', ['clean'], function(cb) {
	console.log( 'writing styles from ' + paths.source.scss )
	console.log( 'writing styles to ' + paths.build.css )
	return gulp.src( paths.source.scss )
	.pipe( sass().on( 'error', sass.logError ) )
	.pipe( gulp.dest( paths.build.css ) )
})

gulp.task('scripts', ['clean'], function(cb) {
	console.log( 'writing scripts from ' + paths.source.js )
	console.log( 'writing scripts to ' + paths.build.js )
	return gulp.src( paths.source.js )
	.pipe(sourcemaps.init())
	.pipe( babel({
		presets: ['es2015']
	}))
	.pipe(concat('all.js'))
	.pipe(sourcemaps.write('.'))
	.pipe( gulp.dest( paths.build.js ) )
})


gulp.task('views', ['clean'], function (cb) {
	console.log( 'writing views from ' + paths.source.pug )
	console.log( 'writing views to ' + paths.build.html )
  return gulp.src( paths.source.pug )
  .pipe(pug({}))
  .pipe( gulp.dest( paths.build.html ) )
});

gulp.task('build', ['clean', 'styles', 'scripts', 'views'], (  ) => {
  console.log( "Build complete" )
});

// gulp.task('views', function buildHTML() {
//   return gulp.src( paths.source.views )
//   .pipe(pug({
//     // Your options in here. 
//   }))
// });


// gulp.task('default', () => {
//     return gulp.src('src/**/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(concat('all.js'))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('dist'));
// });


// var gulp = require('gulp');
// var babel = require('gulp-babel');
// var watch = require('gulp-watch');
// var rimraf = require('rimraf');
// var paths = {
//   babel: 'src/main.js',
//   build: 'dist'
// };

// gulp.task('clean', function(cb) {
//   rimraf(paths.build, cb);
// });

// gulp.task('build', ['clean'], function() {
//   return gulp
//     .src(paths.babel)
//     .pipe(babel())
//     .pipe(gulp.dest(paths.build));
// });

// gulp.task('watch', ['build'], function() {
//   return watch(paths.babel, function() {
//     gulp.start('build');
//   });
// });

// gulp.task('default', ['build']);

// gulp.task('build', ['clean'], function() {

// 	// Compile app
// 	return gulp
// 	.src(paths.babel)
// 	.pipe(babel({
// 		presets: ['es2016', 'react']
// 	}))
// 	.pipe(gulp.dest(paths.build))

// })

// 	// Compile sass
// 	return gulp.src( __dirname + '/src/frontend/*.scss' )
//     .pipe( sass().on( 'error', sass.logError ) )
//     .pipe( gulp.dest( __dirname + '/public/static/css' ) )