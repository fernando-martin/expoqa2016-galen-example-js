var spawn = require('child_process').spawn,

    async = require('async'),
    del = require('del'),
    index = require('serve-index'),

    gulp = require('gulp-param')(require('gulp'), process.argv),
    serve = require('gulp-serve'),
    tap = require('gulp-tap'),

    reportsDir = 'reports',

    suitesGlob = 'tests/*.test';

gulp.task('clean', function() {
    return del([reportsDir]).then(paths => {
        if (paths.length > 0) {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        }
    });
});

gulp.task('test', ['clean'], function(name) {
    var testPath = 'tests/'.concat(name).concat('.test');
    
    if (name) {
        var child = spawn('galen', [
            'test',
            testPath,
            '--htmlreport',
            reportsDir + '/' + name
        ], { 'stdio': 'inherit' });

        child.on('error', function(err){
            if(err.code === 'ENOENT'){
                console.log('Maybe Galen is not installed');
            }
        });

    } else {
        console.log('Test name parameter is missing\nRun: gulp test --name "testName"');
    }
});

gulp.task('serve', serve({
    'root': reportsDir,
    'middleware': function(req, res, next) {
        index(reportsDir, {
            'filter': false,
            'hidden': true,
            'icons': true,
            'stylesheet': false,
            'template': false,
            'view': 'details'
        })(req, res, next);
    }
}));

gulp.task('default', ['test']);
