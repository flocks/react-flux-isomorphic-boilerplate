# react-flux-isomorphic-boilerplate
***

This boilerplate is a kickstarter if you like to work with the following stack

- ReactJS for UI component
- Flux as global pattern 
- Browserify as dependancy management
- gulp as workflow tool
- react-router for routes handling
- scss for css
- nodejs with expressjs for isomorphic app
- karma and jasmine for testing
- heroku for hosting the App

***

## Quick Start

```sh
$ git clone https://github.com/flocks/react-flux-isomorphic-boilerplate.git
$ npm install
$ gulp 
```
open localhost:3090

To launch tests 
```sh
$ npm test
```
### Heroku

Please notice, this boilerplate is optimised for heroku applications. That's why all the gulp dependencies are in `dependencies` instead of `devDependencies`. Because Heroku will run npm install --production and will skip all devDependicies, yet we need gulp to compile the project. Also please notice the npm hook script `postinstall` will run the task `gulp production` after running `npm install` on heroku server. It's not 

If you don't use Heroku to host your app, you can easily modify the gulpfile and the package.json to fill your needs.


### Gulp process

`gulp default` task will prepare the /dist folder by copying all the assets ( images, fonts ) and index.ejs. It will compile all scss file into one single css file called main.css. Browserify will also compile all your js file into a single main.js file. Then it will launch the nodeJS app
which renders the index.ejs. Obvisously, the task "watchify" is launched, so any change on your file will trigger Browserify to recompile the js. Please notice, it only re-compile the dependencies affected by the change. 

`Gulp production` task will achieve pretty much the same except it will uglify the js and the css and optimize images with gulp-imagemin.


***

## Isomorphic Javascript

Isomorphic javascript, or rather now Universal Javascript, means a javascript codebase which can be exectuted both server and client side. You app become easily indexable by google. Plus it considerably increase the "perceived time load" of your app. The user experence become improved, especially on mobile device with small brandwitdh. 

[ link to my article ]

***

## Tests

Simply run npm test to launch test. Tests are launched by Karma and written with Jasmine. I choose Jasmine because I noticed Jest was really slow when it comes to test react components.

Reactify is used to inject getter and setter to the object you want to test. It can be convenient in some cases.
