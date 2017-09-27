// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var rs = require('run-sequence');
var browserSync = require('browser-sync').create();

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('site/js'));
});

// Watch SCSS and HTML files, doing different things with each.
gulp.task('browser-sync', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: 'site',
        port: 3010
    });
});

// Run Sequence
gulp.task('build', function(done) {
  rs(
    ['html', 'scripts', 'lint'],'browser-sync',
    done);
});

// Define HTML source
gulp.task('html', function() {
  gulp.src('site/*.html')
    .pipe(gulp.dest('site'))
    .pipe(browserSync.stream());
});

gulp.task('watch', ['build'], function () {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('site/*.html', ['html']);
});

gulp.task('default', ['watch']);