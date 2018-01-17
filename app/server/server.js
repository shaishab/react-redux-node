'use strict';
/**
 * Module dependencies.
 */
var  config = require('./config/config'),
  mongoose = require('mongoose'),
  chalk = require('chalk'),
  Promise = require('bluebird');

mongoose.Promise = Promise;

Promise.coroutine(function*(){
  // Bootstrap db connection
  try {
    var db = yield mongoose.connect(config.database.url, { useMongoClient: true });
    console.info(chalk.green('Connecting to mongo on ' + config.database.url));
    var app = require('./config/express').init(db);

    // Start the app by listening on <port>
    app.listen(config.port, () => {
      console.log(chalk.green(config.app.title + ' started on port ' + config.port));
      console.info(chalk.green('Serving requests on url ' + config.app.baseUrl));
      module.exports = app;
    });

  } catch (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(chalk.red(err));
    yield mongoose.disconnect();
  }
})();
