const gulp = require('gulp');
const git = require('gulp-git');


const WATCH_PATTERN = './*.md';
function gitAdd(event) {
    // gulp.src(event.file)
    console.info(event);
}

gulp.task('add', () => {
    console.info('add');
    git.add();
});

gulp.task('commit', () => {
    console.info('commit');
    return gulp.src(WATCH_PATTERN)
                .pipe(git.commit('update *.md'));
});

gulp.task('push', () => {
    console.info('push');
    git.push('origin', 'master', (err) => {
        if (err) throw err;
    });
});

gulp.task('status', () => {
    console.info('status');
    git.status({args: '--porcelain'}, function (err, stdout) {
        if (err) throw err;
    });
});

gulp.task('default', function() {
    // 将你的默认的任务代码放在这
    const watcher = gulp.watch(WATCH_PATTERN, ['add', 'status', 'commit', 'push']);
    watcher.on('change', gitAdd);
});

// gulp.task('release', function(callback) {
//     runSequence('', function(error) {
//         if (error) {
//             console.log(error.message);
//         } else {
//         console.log('RELEASE FINISHED SUCCESSFULLY');
//         }
//         callback(error);
//     });
// });