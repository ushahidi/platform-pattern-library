# platform-pattern-library
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

* generates fonts
* compiles sass
* minifies and concatenates js

`gulp`

* starts a webserver
* watches for changes
* compiles sass
* minifies and concatenates js
* live reloads appropriate files (sass, js or html)
* sends a success notification

### Publish to NPM

`Pre-Release`
* npm version prerelease

`Release`
* npm version release

`NPM Publish`
* npm publish
* git push <new_version_tag>
