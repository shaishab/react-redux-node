module.exports = {
  app: {
    title: 'Node React Redux - Development Environment',
    baseUrl: '/nodereact/api/'
  },
  database:{
    url: 'mongodb://localhost/nodereact'
  },
  logging: {
    deployment: 'development'
  },
  sessionInfo: {
    secret: 'keyboard cat',
    cookie: {},
    resave: false,
    saveUninitialized: true
  }
};