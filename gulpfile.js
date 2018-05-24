const gulp = require('gulp');

gulp.task('default', function() {
    // 将你的默认的任务代码放在这
    const watcher = gulp.watch('*.md');
    watcher.on('change', (event) => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...', event);
    });
});