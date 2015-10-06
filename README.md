
The boilerplate is a kickstarter if you like to work with the following stack

- ReactJS for UI component
- Flux as global pattern 
- Browserify as dependancy management
- gulp as workflow tool
- react-router for routes handling
- nodejs with expressjs for isomorphic app ( The nodeJS server is able to read reactJS and render directly HTML : great for SEO and perceived load time)
- heroku for hosting the App

- git clone
- npm install
- gulp in one tab, node server/app.js in another tab
- open localhost:3090
- npm test to run tests


This boilerplate is optimised for heroku app. That's why all the gulp dependencies are in "dependencies" instead of "devDependencies". Because
Heroku will run npm install --production and will skip all devDependicies, yet we need gulp to compile the project ( browserify the js, uglify it, copy assets, optimise image..and so on  )