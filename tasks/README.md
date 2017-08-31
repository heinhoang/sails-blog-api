# Sailsjs Blog API
Using sailsjs to build blog API


### What tasks does Sails run automatically?

Sails runs some of these tasks (the ones in the `tasks/register` folder) automatically when you run certain commands.

###### `sails lift`

Runs the `default` task (`tasks/register/default.js`).

###### `sails lift --prod`

Runs the `prod` task (`tasks/register/prod.js`).

###### `sails www`

Runs the `build` task (`tasks/register/build.js`).

###### `sails www --prod` (production)

Runs the `buildProd` task (`tasks/register/buildProd.js`).

### More scripts
Use nodemon to watch project
```
# install nodemon
npm i -g nodemon
# Watch project for changing
nodemon app.js
```
Use [sails-generate-eslintrc](https://www.npmjs.com/package/sails-generate-eslintrc) to generate .eslinttr

### Can I customize this for SASS, Angular, client-side Jade templates, etc?

You can modify, omit, or replace any of these Grunt tasks to fit your requirements. You can also add your own Grunt tasks- just add a `someTask.js` file in the `grunt/config` directory to configure the new task, then register it with the appropriate parent task(s) (see files in `grunt/register/*.js`).


### 

