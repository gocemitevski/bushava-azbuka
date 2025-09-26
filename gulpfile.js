var gulp = require('gulp');

// JavaScript assets
gulp.task('js', function () {
  return gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
    ])
    .pipe(gulp.dest('assets/js'));
});

// Watch for file changes
gulp.task('watch', function () {
  gulp.watch(['assets/js/**/*.js'], gulp.parallel('js'));
});

// The default Gulp.js task
gulp.task('default', gulp.series('js', 'watch'));
