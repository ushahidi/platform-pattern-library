var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    declare = require('gulp-declare'),
    fileinclude = require('gulp-file-include'),
    gutil = require('gulp-util'),
    handlebars = require('gulp-handlebars'),
    html5Lint = require('gulp-html5-lint'),
    insert = require('gulp-insert'),
    livereload = require('gulp-livereload'),
    merge = require('merge-stream'),
    notify = require('gulp-notify'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    wrap = require('gulp-wrap');

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
        port: process.env.PORT || 8000,
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
//    .pipe(notify('HTML reloaded'))
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
                'node_modules/bourbon/core',
                'node_modules/bourbon-neat/app/assets/stylesheets'
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

// Handlebars

gulp.task('templates', function(){
    // Assume all partials start with an underscore
    // You could also put them in a folder such as source/templates/partials/*.hbs
    var partials = gulp.src(['./assets/templates/partials/_*.hbs'])
        .pipe(handlebars())
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function(fileName) {
                    // Strip the extension and the underscore
                    // Escape the output with JSON.stringify
                    return JSON.stringify(path.basename(fileName, '.js').substr(1));
                }
            }
        }));

    var templates = gulp.src('./assets/templates/*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Ushahidi.templates',
            noRedeclare: true // Avoid duplicate declarations
        }));

    // Output both the partials and the templates as build/js/templates.js
    return merge(partials, templates)
        .pipe(concat('handlebars.compiled.js'))
        .pipe(gulp.dest('./assets/js/handlebars'));
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

gulp.task('uglifyHandlebars', function() {
    return gulp.src('./assets/js/handlebars/*')
    .pipe(plumber({
        errorHandler: errorHandler
    }))
    .pipe(uglify())
    .pipe(concat('handlebars.js'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./assets/js'))
    .pipe(notify('Handlebars JS minified and concatenated into handlebars.js'))
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

/**
* Task: `default`
* Default task optimized for development
*/
gulp.task('default', ['webserver'], function() {
    // LiveReload
    livereload.listen();

    // Watch Handlebars templates
    gulp.watch('./assets/templates/*.hbs', ['templates']);

    // Watch JS
    gulp.watch(['./assets/js/pattern-library/*', './assets/js/custom/*'], ['uglifyJS']);
    gulp.watch(['./assets/js/handlebars/*'], ['uglifyHandlebars']);
    gulp.watch(['./assets/js/cloud/*'], ['uglifyCloudJS']);

    // Watch Sass
    gulp.watch(['./assets/sass/**/*.scss'], ['sass']);

    // Watch HTML
    gulp.watch(['./*.html', './pattern-library/**/*.html'], ['html']);
});

/**
* Task: `build`
* Builds sass, fonts and js
*/
gulp.task('build', ['sass', 'templates', 'uglifyJS', 'uglifyHandlebars', 'uglifyCloudJS', 'html'], function() {
});
