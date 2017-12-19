var _ = require('lodash');

module.exports = require(`./webpack.${process.env.NODE_ENV}`);
