const gulp = require('gulp');
const git = require('gulp-git');
const runSequence = require('run-sequence');
const request = require('request');

// http://sc.ftqq.com/3.version

const sendMessage = () => {
    const url = `https://sc.ftqq.com/SCU4033T165470d6b883bb3d1a649022022d86cf5833be77c4590.send?text=blog-db-backup&desp=fail`;
    request.get(url);
}
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

gulp.task('default', () => {
    runSequence(
        'status',
        'add',
        'commit',
        'push',
        (error) => {
        if (error) {
            sendMessage();
        }
    });
});