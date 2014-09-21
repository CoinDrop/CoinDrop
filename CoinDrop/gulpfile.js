var gulp = require('gulp'); 

// Include Our Plugins
//includes the gulp core plugins associated with the tasks
//that we will be performing.  Next we setup each of our separate
//tasks.  These tasks are lint, sass, scripts, and default.
var g = require('gulp-load-plugins')({lazy:false});
var karma = require('karma').server;
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['clean', 'jshint', 'scripts','styles', 'browser-sync', 'serve']);

//clean build directory
gulp.task('clean', function(){
  gulp.src('./dist', {read: false} )
    .pipe( g.clean());
});

gulp.task('test', function(done){
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

// // Lint Task
gulp.task('jshint', function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(g.jshint())
        .pipe(g.jshint.reporter('default'));
});

// // Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(g.concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(g.rename('all.min.js'))
        .pipe(g.uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    return gulp.src('./public/css/**/*.css')
    .pipe( g.minifyCss({keyBreaks:true}))
    .pipe(gulp.dest('./dist'))
});

gulp.task('browser-sync', ['styles'], function() {
    browserSync({
        notify: false,
        server: './public'
    });
    gulp.watch(['./public/index.html'], reload);
    gulp.watch(['./public/views/**/*.html'], reload);
    gulp.watch(['./public/css/**/*.{scss,css}',], ['styles', reload]);
    gulp.watch(['./public/js/**/*.js'], ['jshint']);
    gulp.watch(['./public/images/**/*'], reload);
});

//start node server
gulp.task('serve', function() {
    // return nodemon({ script: './app/server.js' });
    require('./app/server.js');
});

// Watch Files For Changes
// gulp.task('watch', function() {
//     gulp.watch('./public/js/**/*.js', ['lint', 'scripts', 'styles']);
// });


