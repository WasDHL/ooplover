const gulp = require('gulp');
const rimraf = require('rimraf');

gulp.task('clean',function (cb) {
    rimraf('./build',cb);
});

gulp.task('buildCode',function () {
    gulp.src(['package.json','process.json','version.txt','release.md'])
        .pipe(gulp.dest('build'));

    gulp.src(['logs/**']).pipe(gulp.dest('build/logs'));
    gulp.src(['spec/**']).pipe(gulp.dest('build/spec'));

    gulp.src(['sql/**'])
        .pipe(gulp.dest('build/sql'));
});

gulp.task('default',['buildCode']);

