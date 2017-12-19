'use strict';
/**
 * Module dependencies.
 */
//var init = require('./config/init')(),
var  config = require('./config/config'),
  mongoose = require('mongoose'),
  chalk = require('chalk'),
  Promise = require('bluebird');

mongoose.Promise = Promise;

Promise.coroutine(function*(){
  /**
   * Main application entry file.
   * Please note that the order of loading is important.
   */

  // Bootstrap db connection
  try {
    var db = yield mongoose.connect(config.database.url, { useMongoClient: true });
    console.info('Connecting to mongo on ' + config.database.url);
  } catch (connErr) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.info(chalk.red(connErr));
  }

  // Init the express application
  var app = require('./config/express')(db);


  // Bootstrap passport config
  //require('./config/passport')();

  // Start the app by listening on <port>
  app.listen(config.port, () => {
    console.info(config.app.title + ' started on port ' + config.port);
    console.info('Serving requests on url ' + config.app.baseUrl);
    module.exports = app;
  });

  // Expose app
  //module.exports = app;

})().catch(function(err){
  //logger.error(err);
  //logger.error('Could not start app !')
  console.error("Could not start app !", err);
  mongoose.disconnect(function(err) {
    console.info('Disconnected from MongoDB.');
    callback(err);
  });
});
