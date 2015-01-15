# platform-web-frontend
New Platform UI (w/ Pattern Library) based on the Platform Design Framework

### Libraries/Packages/Dependencies

* Nodejs
* Bower
* Browserify
* Gulp (and various gulp plugins)
* Libsass/node-sass (via gulp-sass)
* Bourbon
* Neat

### Install Build Requirements
`npm install -g gulp`

### Install Packages
`npm install`

*This will install both NPM and Bower dependencies! No separate `bower install` command is required.*

### Download and Activate Live Reload Plugin

http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions

### Navigate to project root and run Gulp

`gulp build`

* compiles sass
* compiles js
* generates fonts

`gulp`

* starts a webserver
* watches for changes
* compiles sass
* compiles js
* live reloads `index.html`
* sends a success notification
