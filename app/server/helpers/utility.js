var _ = require("lodash");
var os = require('os');
//var logger = require('../helpers/logger');
var config = require('../config/config');
var util = require('util');

var _this = this;

exports.getIPAddress = function()
{
  return _.chain(os.networkInterfaces())
    .values()
    .flatten()
    .filter(function(val) {
      return (val.family == 'IPv4' && val.internal == false)
    })
    .map('address')
    .first()
    .value();
};

exports.logMessage = function(level, data, logMsg){

  var logData = {
    sourceIp: _this.getIPAddress(),
    remoteHost: ( data.req.headers ? data.req.headers['x-forwarded-for'] : ''),
    url: data.req.url,
    id: ''+data.id+'',
    action: data.action,
    location: data.location,
    deployment: config.logging.deployment,
    params: data.req.params,
    body: data.req.body,
    status:data.status
  };

  if(data.req && data.req.query){
    try{
      var query = data.req.query;
      logData.url = data.req.path;
      logData.query = JSON.stringify(query).replace(/\\/g, "");
    }catch(e){
      //logger.log('error', 'Error Parsing query in utility.logMessage', logData);
    }
  }

  //logger.log(level, logMsg, logData );
};