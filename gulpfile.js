var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
const eslint = require('gulp-eslint');

gulp.task('default', ['watch']);

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('watch', ['browserSync'], function() {
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('src/css/**/*.css', browserSync.reload);
});

////////// COMBINE & MINIFY
gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(useref())
    // minify only if JavaScript
    .pipe(gulpif('*.js', babel()))
    .pipe(gulpif('*.js', uglify()))
    // minify only if CSS
    .pipe(gulpif('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

////////// BUILD DISTRIBUTION FOLDER
gulp.task('build', function (callback) {
  runSequence('clean', 'lint', 'minify', 'json',
    callback
  )
});

gulp.task('json', function() {
  return gulp.src('src/*.json')
      .pipe(gulp.dest('dist'))
});

////////// LINT
gulp.task('lint', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

////////// CLEAN DISTRIBUTION FOLDER
gulp.task('clean', function() {
  return del.sync('dist');
});
