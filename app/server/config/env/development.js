module.exports = {
  app: {
    title: 'Node react Redux - Development Environment',
    baseUrl: '/api/'
  },
  database:{
    url: 'mongodb://localhost/nodereact'
  },
  logging: {
    deployment: 'development',
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
  facebook: {
    clientID: process.env.FACEBOOK_ID || 'APP_ID',
    clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/facebook/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || 'APP_ID',
    clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/google/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/github/callback'
  }
};