var gulp = require('gulp'); 

// Include Our Plugins
//includes the gulp core plugins associated with the tasks
//that we will be performing.  Next we setup each of our separate
//tasks.  These tasks are lint, sass, scripts, and default.
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');//used for bootstrap.less
var nodemon = require('gulp-nodemon');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');

//Express startup
// gulp.task('express', function() {
//     var express = require('express');
//     var app = express();
//     app.use(express.static(__dirname));
//     app.listen(4000);
// })

//clean build directory
// gulp.task('clean', function(){
//   gulp.src(paths.client.build, {read: false} )
//     .pipe(clean());
// });


// // Lint Task
// //checks any javascript file in our js/ directory and makes
// //there are no errors in our code
gulp.task('lint', function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('serve', function() {
    nodemon({ script: './server.js' });
})

// // Compile Our Sass
// //compiles any of our sass files in our scss/ directory into .css
// //and saves the compiled .css file in our css/ directory
// gulp.task('sass', function() {
//     return gulp.src('scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('css'));
// });

//Compile LESS -> CSS
// gulp.task('build-less', function() {
// 	return gulp.src('styles.less')
// 		.pipe(less())
// 		.pipe(gulp.dest('./source/css'));
// });

// // Concatenate & Minify JS
// //concats all javascript files in our js/ directory and saves the
// //output to our dist/ directory.  Then gulp takes that concatenated
// //file, minifies it, renames it, and saves it to the dist/ directory
// //alongside the concatenated file
gulp.task('scripts', function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// gulp.task('serve', ['build'], function(){
//   return nodemon({
//     script: 'server.js' //options: '-i client/*'
//   });
// });

// // Watch Files For Changes
// //watch task is used to run tasks as we make changes to our files.
// //As code is written and files are modified, gulp.watch() method will
// //listen for changes and automatically run our tasks again so we don't
// //have to continuously run it in the command line.
// gulp.task('watch', function() {
//     gulp.watch('public/js/**/*.js', ['lint', 'scripts']);
// });

// gulp.task('livereload', ['serve'], function(){
//   var server = livereload();
//   var all_build_files = paths.client.build + '/**/*';
//   return gulp.watch(all_build_files, function(evt){
//     server.changed(evt.path);
//   });
// });

// Default Task
//this is a wrapper to our other tasks.  This will be the task that
//is ran upon entering gulp into the command line without any additional
// parameters.
// gulp.task('default', ['serve', 'lint', 'scripts', 'watch']);
gulp.task('default', ['lint', 'serve', 'scripts']);

//after this, run gulp in terminal