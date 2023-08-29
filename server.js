require('module-alias/register');
require('./config/db');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 14 || (major === 14 && minor <= 0)) {
  console.log('Please go to nodejs.org and download version 8 or greater. 👌\n ');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.variables.env' });



const glob = require('glob');
const path = require('path');

glob.sync('./models/**/*.js').forEach(function (file) {
  require(path.resolve(file));
});

// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → On PORT : ${server.address().port}`);
});
