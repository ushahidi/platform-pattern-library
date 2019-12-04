
var {src, task, series, dest, watch} = require('gulp'),
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

function webserver (done) {
    connect.server({
        port: process.env.PORT || 8000,
        livereload: true
    });
    done();
}
task('webserver', webserver)

/**
* Task: `gulp html`
* livereloads when html changes
*/

function html() {
    return src([
        './*.html',
        './pattern-library/**/*.html',
        //'!./pattern-library/partials/*.html'
        ])
    .pipe(fileinclude())
    .pipe(dest('./assets/html/'))
    .pipe(livereload());
};
task('html', html);

/**
 * HTML5 Lint
 */
function html5Lint () {
    return src([
            './*.html',
            './assets/html/**/*.html',
            '!./assets/html/partials/**/*.html'
        ])
        .pipe(html5Lint());
};
task('html5-lint', html5Lint);

var buildSass = function(rtl, compressed) {
    var destName, source;
    if (rtl) {
        source = './assets/sass/utils/rtl/rtl.scss';
        destName = 'rtl-style';
    } else {
        source = './assets/sass/utils/rtl/ltr.scss';
        destName = 'style';
    }

    if (compressed) {
        destName = destName + '.min';
    }
    destName = destName + '.css';

    return src([source])
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
        .pipe(dest('./assets/css'))
        .pipe(notify('CSS compiled'))
        .pipe(livereload());
};

/**
* Task: `sass`
* Converts Sass files to CSS (includes RTL support)
*/

/**
* Task: `rtl`
* Converts RTL Sass files to RTL CSS
*/
task('rtl', function() {
    return buildSass(true, false);
});

task('rtlMin', function() {
    return buildSass(true, true);
});

task('sassMin', function() {
    return buildSass(false, true);
});

task('sass', series('rtl', 'sassMin', 'rtlMin', function() {
    return buildSass(false, false);
}));

/**
* Task: `templates`
* Handlebars templates
*/
function templates (){
    // Assume all partials start with an underscore
    // You could also put them in a folder such as source/templates/partials/*.hbs
    var partials = src(['./assets/templates/partials/_*.hbs', './assets/templates/front-end-guidelines/partials/_*.hbs'])
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

    var templates = src('./assets/templates/**/*.hbs')
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
        .pipe(dest('./assets/js/handlebars'));
};
task('templates', templates); 

/**
* Task: `uglify`
* Minimizes and concatenates js files
*/
function uglifyJS() {
    return src(['./assets/js/pattern-library/*','./assets/js/custom/*'])
    .pipe(plumber({
        errorHandler: errorHandler
    }))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(plumber.stop())
    .pipe(dest('./assets/js'))
    .pipe(notify('JS minified and concatenated into app.js'))
    .pipe(livereload());
};
task('uglifyJS', uglifyJS);

function uglifyHandlebars () {
    return src('./assets/js/handlebars/*')
    .pipe(plumber({
        errorHandler: errorHandler
    }))
    .pipe(uglify())
    .pipe(concat('handlebars.js'))
    .pipe(plumber.stop())
    .pipe(dest('./assets/js'))
    .pipe(notify('Handlebars JS minified and concatenated into handlebars.js'))
    .pipe(livereload());
};
task('uglifyHandlebars', uglifyHandlebars);

function uglifyCloudJS () {
    return src([
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
    .pipe(dest('./assets/js'))
    .pipe(notify('JS minified and concatenated into cloud.js'))
    .pipe(livereload());
};
task('uglifyCloudJS',uglifyCloudJS);

/**
* Task: `default`
* Default task optimized for development
*/
function watchFiles () {
// LiveReload
livereload.listen();

// Watch Handlebars templates
watch('./assets/templates/**/*.hbs', series('templates'))

// Watch JS
watch(['./assets/js/pattern-library/*', './assets/js/custom/*'], series('uglifyJS'));
watch(['./assets/js/handlebars/*'], series('uglifyHandlebars'));
watch(['./assets/js/cloud/*'], series('uglifyCloudJS'));

// Watch Sass
watch(['./assets/sass/**/*.scss'], series('sass'));

// Watch HTML
watch(['./*.html', './pattern-library/**/*.html'], series('html'));
}
task('default', series('webserver', watchFiles));

/**
* Task: `build`
* Builds sass, fonts and js
*/
task('build', series('sass', 'templates', 'uglifyJS', 'uglifyHandlebars', 'uglifyCloudJS', 'html'));
