'use strict';

module.exports = {
  app: {
    title: 'Node react Redux- Production Environment',
    baseUrl: '/api/'
  },
  database:{
    url: 'mongodb://localhost/nodereact'
  },
  logging: {
    deployment: 'production',
    level: 'info'
  },
  session: {
    secret: 'nodereact',
    name: 'sessionId',
    cookie: {
      // session expiration is set by default to 24 hours
      maxAge: 24 * (60 * 60 * 1000),
      // httpOnly flag makes sure the cookie is only accessed
      // through the HTTP protocol and not JS/browser
      httpOnly: true,
      // secure cookie should be turned to true to provide additional
      // layer of security so that the cookie is set only when working
      // in HTTPS mode.
      secure: false
    }
  },
  secure: {
    ssl: true,
    privateKey: './config/sslcerts/key.pem',
    certificate: './config/sslcerts/cert.pem',
    caBundle: './config/sslcerts/cabundle.crt'
  }
};