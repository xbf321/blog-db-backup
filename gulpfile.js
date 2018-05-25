const gulp = require('gulp');
const git = require('gulp-git');
const runSequence = require('run-sequence');
const request = require('request');
const fs = require('fs');
const path = require('path');

const WATCH_PATTERN = './*.db';

gulp.task('copy', () => {
    const sourceFile = 'xxx/xx.db';
    const destFile = path.join(__dirname, 'ghost.db');
    fs.createReadStream(sourceFile)
        .pipe(fs.createWriteStream(destFile));
});

gulp.task('add', () => {
    return gulp.src(WATCH_PATTERN)
        .pipe(git.add());
});

gulp.task('commit', () => {
    return gulp.src(WATCH_PATTERN)
                .pipe(git.commit('update *.db'));
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

gulp.task('default', ['copy'], () => {
    runSequence(
        'status',
        'add',
        'commit',
        'push',
        (error) => {
        if (error) {
            const url = `https://sc.ftqq.com/SCU4033T165470d6b883bb3d1a649022022d86cf5833be77c4590.send?text=blog-db-backup&desp=fail`;
            request.get(url);
        }
    });
});