/**
 * Created by Shahwar Maiwandi on 9/30/2015.
 */
var winston = require('winston');
var config = require('../config/config');
require('winston-loggly');
winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
        name: 'console-logging',
        level: config.logging.level,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: false,
        colorize: true,

        timestamp: function() {
            var d = new Date();//Date.now();
            return d.getFullYear() + ' ' + ( d.getMonth() >= 10 ? d.getMonth(): '0'+ d.getMonth()) + ' '+d.getDate() + ' '+ d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+':'+d.getMilliseconds();//d.format('yyyy-MM-dd-HH:mm:ss');
        },

        formatters: function(options) {
            // Return string will be passed to logger.
            return   options.timestamp() +' '+ winston.config.colorize(options.level, options.level.toUpperCase() ) +' '+ (undefined !== options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        }

    }),
    new winston.transports.Loggly({
      inputToken: 'node-react-redux-example',
      subdomain: 'node-react-redux',
      tags: ['node-react-redux'],
      json: true,
      handleExceptions: true,
      name: 'loggly-logging',
      level: config.logging.level
    })
  ],
    exitOnError: false
});

module.exports = logger;

module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};