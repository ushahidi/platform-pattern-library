var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    insert = require('gulp-insert'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    fileinclude = require('gulp-file-include'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    html5Lint = require('gulp-html5-lint'),
    request = require('request');

function errorHandler (err) {
    gutil.beep();
    gutil.log(err);
    notify.onError('Error: <%= error.message %>')(err);
}

/**
* Task: `gulp webserver`
* spins up a webserver and livereloads
*/
gulp.task('webserver', function() {
    connect.server({
        port: 8000,
        livereload: true
    });
});

/**
* Task: `gulp html`
* livereloads when html changes
*/
gulp.task('html', function() {
    return gulp.src([
        './*.html',
        './pattern-library/**/*.html',
        //'!./pattern-library/partials/*.html'
        ])
    .pipe(fileinclude())
    .pipe(gulp.dest('./assets/html/'))
    .pipe(notify('HTML reloaded'))
    .pipe(livereload());
});

/**
 * HTML5 Lint
 */
gulp.task('html5-lint', function() {
    return gulp.src([
            './*.html',
            './assets/html/**/*.html',
            '!./assets/html/partials/**/*.html'
        ])
        .pipe(html5Lint());
});

var buildSass = function(rtl, compressed) {
    var dest, source;
    if (rtl) {
        source = './assets/sass/utils/rtl/rtl.scss';
        dest = 'rtl-style';
    } else {
        source = './assets/sass/utils/rtl/ltr.scss';
        dest = 'style';
    }

    if (compressed) {
        dest = dest + '.min';
    }
    dest = dest + '.css';

    return gulp.src([source])
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths : [
                'bower_components/bourbon/app/assets/stylesheets',
                'bower_components/neat/app/assets/stylesheets'
            ],
            sourceComments: true,
            outputStyle : compressed ? 'compressed' : 'nested'
        }))
        .pipe(autoprefixer())
        .pipe(plumber.stop())
        // Since we need the style.css file in the repo for gh-pages, but we do not review the file in Phabricator
        // gulp-insert appends '/* @generated */' to the style.css file
        // which automatically folds file in Phabricator
        .pipe(insert.append('/* @generated */'))
        .pipe(rename(dest))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(notify('CSS compiled'))
        .pipe(livereload());
};

/**
* Task: `sass`
* Converts Sass files to CSS (includes RTL support)
*/

gulp.task('sass', ['rtl', 'sassMin', 'rtlMin'], function() {
    return buildSass(false, false);
});

/**
* Task: `rtl`
* Converts RTL Sass files to RTL CSS
*/

gulp.task('rtl', function() {
    return buildSass(true, false);
});

gulp.task('rtlMin', function() {
    return buildSass(true, true);
});

gulp.task('sassMin', function() {
    return buildSass(false, true);
});

/**
* Task: `uglify`
* Minimizes and concatenates js files
*/
gulp.task('uglifyJS', function() {
    return gulp.src(['./assets/js/pattern-library/*','./assets/js/custom/*'])
    .pipe(plumber({
        errorHandler: errorHandler
    }))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./assets/js'))
    .pipe(notify('JS minified and concatenated into app.js'))
    .pipe(livereload());
});

gulp.task('uglifyCloudJS', function() {
    return gulp.src([
        './assets/js/custom/_toggle.js',
        './assets/js/custom/survey-filter.js',
        './assets/js/custom/map.js',
        './assets/js/custom/_modal.js',
        './assets/js/cloud/*'
    ])
    .pipe(plumber({
        errorHandler: errorHandler
    }))
    .pipe(uglify())
    .pipe(concat('cloud.js'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./assets/js'))
    .pipe(notify('JS minified and concatenated into cloud.js'))
    .pipe(livereload());
});

function setStatus (state, targetUrl, description, context) {
    request.post({
        url:  'https://api.github.com/repos/' + process.env.TRAVIS_REPO_SLUG +
              '/statuses/' + process.env.TRAVIS_COMMIT,
        json: true,
        headers : {
            'Authorization' : 'token ' + process.env.GITHUB_TOKEN,
            'User-Agent' : 'Platform-Pattern-Library'
        },
        body : {
            state : state,
            target_url : targetUrl,
            description : description,
            context : context
        }
    }, function (error, response, body) {
        if (error) {
            return console.error(error);
        }
    });
}

gulp.task('setGithubStatusSuccess', function () {
    setStatus('success', process.env.DEPLOY_URL, 'Deploying to S3', 'travis-ci/s3');
});
gulp.task('setGithubStatusPending', function () {
    setStatus('pending', process.env.DEPLOY_URL, 'Deploying to S3', 'travis-ci/s3');
});

/**
* Task: `default`
* Default task optimized for development
*/
gulp.task('default', ['webserver'], function() {
    // LiveReload
    livereload.listen();

    // Watch JS
    gulp.watch(['./assets/js/pattern-library/*', './assets/js/custom/*'], ['uglifyJS']);
    gulp.watch(['./assets/js/cloud/*'], ['uglifyCloudJS']);

    // Watch Sass
    gulp.watch(['./assets/sass/**/*.scss'], ['sass']);

    // Watch HTML and livereload
    gulp.watch(['./*.html', './pattern-library/**/*.html'], ['html']);

});

/**
* Task: `build`
* Builds sass, fonts and js
*/
gulp.task('build', ['sass', 'uglifyJS', 'uglifyCloudJS', 'html'], function() {
});
