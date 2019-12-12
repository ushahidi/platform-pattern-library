# platform-pattern-library

[![Greenkeeper badge](https://badges.greenkeeper.io/ushahidi/platform-pattern-library.svg)](https://greenkeeper.io/)

New Platform UI (w/ Pattern Library) based on the Platform Design Framework

### Dependencies
* [Nodejs](https://nodejs.org/en/)
* [Browserify](http://browserify.org/)
* [Handlebars](http://handlebarsjs.com/)

### Install Packages
`npm install`

*This will install all NPM dependencies!

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

`NPM User`
* ```npm adduser <user_name>```

`Pre-Release`
* ```npm version prerelease```

`Release`
* ```npm version release```

`NPM Publish`
* ```npm publish```
* ```git tag <new_version>```
* ```git push origin <new_version_tag>```
