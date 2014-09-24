
// Include Our Plugins
//includes the gulp core plugins associated with the tasks
//that we will be performing.  Next we setup each of our separate
//tasks.  These tasks are lint, sass, scripts, and default.
var gulp = require('gulp'); 
var g = require('gulp-load-plugins')({lazy:false});
var karma = require('karma').server;
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var ngAnnotate = require('gulp-ng-annotate');
var mocha = require('gulp-mocha');
var del = require('del');

//run gulp in command line to perform all of these actions
gulp.task('default', ['clean', 'inject', 'jshint', 'mocha', 'scripts', 'styles', 'browser-sync', 'serve']);

//clean build directory
// gulp.task('clean', function(){
//   gulp.src('./dist', {read: false} )
//     .pipe( g.clean());
// });

//without this our dist file will not be cleared out
gulp.task('clean', del.bind(null, ['./dist']));

//without this our browser testing will not work
gulp.task('test', ['jshint'], function(done){
  //runs browser tests
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

//without this our command line tests and browsers tests will not work
gulp.task('mocha', ['test'], function () {
    return gulp.src('specs/app/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
        // .pipe(exit());
});

//without this our dependencies will not be auto injected into index.html
// auto-inject JS scripts into <script> in index.html
gulp.task('inject', function(){
  var target = gulp.src('./public/index.html');
  var scripts = gulp.src(['./public/scripts/app.js', './public/scripts/**/*.js'], {read:false});
  return target
    .pipe(g.inject(scripts, {
      name:'AngularFiles',
      ignorePath:'public',
      addRootSlash:false
    }))
    .pipe(gulp.dest('./public'));
});


//without this our js files will not be checked for syntax errors
gulp.task('jshint', function() {
    return gulp.src(['./public/scripts/**/*.js', './specs/*/**.js'])
        .pipe(g.jshint())
        .pipe(g.jshint.reporter('default'));
});

//without this our js files will not be concatenated and minified
gulp.task('scripts', function() {
    return gulp.src('./public/scripts/**/*.js')
        .pipe(ngAnnotate())
        .pipe(g.concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(g.rename('all.min.js'))
        .pipe(g.uglify())
        .pipe(gulp.dest('./dist'));
});

//without this our styles will not be minified
gulp.task('styles', function() {
    return gulp.src('./public/css/**/*.css')
    .pipe( g.minifyCss({keyBreaks:true}))
    .pipe(gulp.dest('./dist'))
});

//without this our files will not be watched for changes and
//our browser will not reload automatically when changes are made
//our tests will also re-run automaitcally when changes are made
//to the spec files
gulp.task('browser-sync', ['styles'], function() {
    browserSync({
        notify: false,
        server: './public'
    });
    gulp.watch(['./public/index.html'], reload);
    gulp.watch(['./public/**/*.html'], reload);
    gulp.watch(['./public/css/**/*.{scss,css}',], ['styles', reload]);
    gulp.watch(['./public/scripts/**/*.js'], ['jshint']);
    gulp.watch(['./specs/*/**.js'], ['mocha']);
    gulp.watch(['./public/images/**/*'], reload);
});

//without this our server will not start up automatically
gulp.task('serve', function() {
    // return nodemon({ script: './app/server.js' });
    require('./server.js');
});

gulp.task('copy-bower-components', function () {
  gulp.src('./public/lib/**')
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('copy-html-files', function () {
  gulp.src('./public/**/*.html')
    .pipe(gulp.dest('dist/'));
});

