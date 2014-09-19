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
var shell = require('gulp-shell');
var karma = require('karma').server;


gulp.task('default', ['clean', 'lint', 'test', 'scripts', 'serve', 'watch']);


//clean build directory
gulp.task('clean', function(){
  gulp.src('./dist', {read: false} )
    .pipe(clean());
});

gulp.task('test', function(done){
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

// // Lint Task
gulp.task('lint', function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// // Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

//start node server
gulp.task('serve', function() {
    return nodemon({ script: './app/server.js' });
})

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./public/js/**/*.js', ['lint', 'scripts']);
});


