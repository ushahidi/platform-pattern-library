var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
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
gulp.task('html', function() {
    return gulp.src([
        './index.html'
        ])
        .pipe(livereload());
    });


/**
* Task: `sass`
* Converts SASS files to CSS
*/
gulp.task('sass', function() {
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
        .pipe(gulp.dest('./assets/css'))
        .pipe(notify('CSS compiled'))
        .pipe(livereload())
        ;
});

/**
* Task: `uglify`
* Minimizes and concatenates js files
*/
gulp.task('uglifyJS', function() {
    gulp.src('./assets/js/custom/*')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./assets/js'))
    ;
});

/**
* Task: `font`
* Copies font files to public directory.
*/
gulp.task('font', function() {
    gulp.src(['bower_components/fontawesome/fonts/fontawesome-*', 'bower_components/fontawesome/fonts/FontAwesome*'])
        .pipe(gulp.dest('./assets/fonts'))
        .pipe(livereload())
        ;
});

/**
* Task: `default`
* Default task optimized for development
*/
gulp.task('default', ['webserver'], function() {
    // LiveReload
    livereload.listen();

    // Watch JS
    gulp.watch('./assets/js/main.js', ['uglifyjs']);

    // Watch Sass
    gulp.watch(['./assets/sass/**/*.scss'], ['sass']);

    // Watch HTML and livereload
    gulp.watch('./index.html', ['html']);


});

/**
* Task: `build`
* Builds sass, fonts and js
*/
gulp.task('build', ['font', 'sass', 'uglifyJS'], function() {
});
