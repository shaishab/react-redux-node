module.exports = {
  client: {
    css: ['public/bundles/app.css'],
    js: ['public/bundles/app.js']
  },
  server: {
    gulpConfig: ['gulpfile.js'],
    models: 'app/server/models/**/*.js',
    routes: 'app/server/routes/*.js',
    strategies: 'app/server/config/auth/strategies/*.js',
    allJS: ['server.js', 'server/config/**/*.js', 'server/**/*.js'],
    views: ['server/views/*.html']
  }
};