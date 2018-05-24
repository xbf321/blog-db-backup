const gulp = require('gulp');
const git = require('gulp-git');
const runSequence = require('run-sequence');


const WATCH_PATTERN = './*.md';

gulp.task('add', () => {
    return gulp.src(WATCH_PATTERN)
        .pipe(git.add());
});

gulp.task('commit', () => {
    return gulp.src(WATCH_PATTERN)
                .pipe(git.commit('update *.md'));
});

gulp.task('push', () => {
    git.push('origin', 'master', (err) => {
        if (err) throw err;
    });
});

gulp.task('status', () => {
    git.status({args: '--porcelain'}, function (err, stdout) {
        if (err) throw err;
    });
});

gulp.task('upload', () => {
    runSequence(
        'status',
        'add',
        'commit',
        'push',
        (error) => {
        if (error) throw error;
        console.info('success');
    });
});

gulp.task('default', function() {
    gulp.watch(WATCH_PATTERN, ['upload']);
});