var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    insert = require('gulp-insert'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    fileinclude = require('gulp-file-include'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify');

function errorHandler (err) {
    gutil.beep();
    gutil.log(err.message || err);
    notify.onError('Error: <%= error.message %>')(err);
}

/**
* Task: `gulp webserver`
* spins up a webserver and livereloads
*/
gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});

/**
* Task: `gulp html`
* livereloads when html changes
*/
gulp.task('html', ['fileinclude'], function() {
    return gulp.src([
        './index.html',
        './pattern-library/**/*.html'
        ])
        .pipe(notify('HTML reloaded'))
        .pipe(livereload());
});

gulp.task('fileinclude', function() {
    gulp.src([
        './pattern-library/**/*.html',
        '!./pattern-library/partials/*.html'
        ])
    .pipe(fileinclude())
    .pipe(gulp.dest('./assets/html/'));
});

/**
* Task: `sass`
* Converts SASS files to CSS (includes RTL support)
*/

gulp.task('sass', ['rtl'], function() {
    gulp.src(['./assets/sass/style.scss'])
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(sass({
            includePaths : [
                'bower_components/bourbon/app/assets/stylesheets',
                'bower_components/neat/app/assets/stylesheets',
                'bower_components/font-awesome/scss'
            ],
            sourceComments: 'map'
        }))
        .pipe(autoprefixer())
        .pipe(plumber.stop())
        .pipe(minifyCSS({keepBreaks:true}))
        // Since we need the style.css file in the repo for gh-pages, but we do not review the file in Phabricator
        // gulp-insert appends '/* @generated */' to the style.css file
        // which automatically folds file in Phabricator
        .pipe(insert.append('/* @generated */'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(notify('CSS compiled'))
        .pipe(livereload());
});

/**
* Task: `rtl`
* Converts RTL SASS files to RTL CSS
*/

gulp.task('rtl', function() {
    gulp.src(['./assets/sass/style.scss'])
        .pipe(sass({
            includePaths : [
                'bower_components/bourbon/app/assets/stylesheets',
                'bower_components/neat/app/assets/stylesheets',
                'bower_components/font-awesome/scss'
            ],
            sourceComments: 'map'
        }))
        .pipe(autoprefixer())
        .pipe(minifyCSS({keepBreaks:true}))
        // Since we need the style.css file in the repo for gh-pages, but we do not review the file in Phabricator
        // gulp-insert appends '/* @generated */' to the style.css file
        // which automatically folds file in Phabricator
        .pipe(insert.append('/* @generated */'))
        .pipe(rename('rtl-style.css'))
        .pipe(gulp.dest('./assets/css'));
});

/**
* Task: `uglify`
* Minimizes and concatenates js files
*/
gulp.task('uglifyJS', function() {
    gulp.src(['./assets/js/pattern-library/*','./assets/js/custom/*'])
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

/**
* Task: `font`
* Copies font files to public directory.
*/
gulp.task('font', function() {
    gulp.src(['bower_components/fontawesome/fonts/fontawesome-*', 'bower_components/fontawesome/fonts/FontAwesome*'])
        .pipe(gulp.dest('./assets/fonts'))
        .pipe(livereload());
});

/**
* Task: `default`
* Default task optimized for development
*/
gulp.task('default', ['webserver'], function() {
    // LiveReload
    livereload.listen();

    // Watch JS
    gulp.watch(['./assets/js/pattern-library/*','./assets/js/custom/*'], ['uglifyJS']);

    // Watch Sass
    gulp.watch(['./assets/sass/**/*.scss'], ['sass']);

    // Watch HTML and livereload
    gulp.watch(['./index.html', './pattern-library/**/*.html'], ['html']);

});

/**
* Task: `build`
* Builds sass, fonts and js
*/
gulp.task('build', ['sass', 'uglifyJS', 'html', 'font'], function() {
});
