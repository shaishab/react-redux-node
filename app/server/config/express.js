'use strict';

/**
 * Module dependencies.
 */
var fs 							 = require('fs'),
  	https 					 = require('https'),
  	express 				 = require('express'),
  	bodyParser 			 = require('body-parser'),
  	compress 				 = require('compression'),
		asset						 = require('./assets/all'),
  	config 					 = require('./config'),
  	path 						 = require('path'),
    multer 					 = require('multer'),
    expressValidator = require('express-validator'),
    cors   					 = require("cors"),
		passport 				 =  require('passport'),
		session 				 = require('express-session'),
		cookieParser 		 = require('cookie-parser');

module.exports = function(db) {
	var app = express();
	app.use(cors());

	// Globing model files
	config.getGlobbedFiles(asset.server.models).forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));
	app.use(express.static(path.resolve('./dist')));
	app.set('view engine', 'html');
	app.use(cookieParser());
	app.use(session(config.sessionInfo));
	app.use(passport.initialize());
	app.use(passport.session());

	/**
	 * Bootstrap passport config
	 */
	require('./auth/passport')();

	// Showing stack errors
	app.set('showStackError', true);

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json({limit: '5mb'}));

  app.use(multer({
      dest: './public/uploads/',
      limits: {
          fileSize: 1024 * 1024 * 100
      },
      onFileSizeLimit: function(file) {
          fs.unlinkSync('./' + file.path);
      }
  }).array('files'));

	// use for field validation and customizing the messages
	app.use(expressValidator({
	  errorFormatter: function(param, msg, value) {
	    return {
	 			message: msg
	    };
	  }
	}));	

	// Globbing routing files
	config.getGlobbedFiles(asset.server.routes).forEach(function(routePath) {
    // skip middlewares as it is not a routese
    if( routePath.indexOf("middlewares") == -1)
    {
        require(path.resolve(routePath))(app);
    }
	});

  app.set('json spaces', 2);
  app.set('jwtTokenSecret', 'jwt-secret-key');

	app.use('*', function (req, res, next) {
		const filename = path.join('./dist/', 'index.html');
		fs.readFile(filename, (err, result) => {
			if (err) {
				return next(err)
			}
			app.locals.title = config.app.title;
			res.set('content-type', 'text/html');
			res.send(result);
			res.end();
		})
	});

	// Assume 'not found' in the error msgs is a 404.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		//logger.error(err.stack);

		// Error page
		res.status(500).send('Error Please see log for details.');
	});

	// Assume 404 since no middleware responded
	app.use(function(err, req, res, next) {
		if (!err) return next();
		res.status(404).send('Uknown Error');
	});

	if (process.env.NODE_ENV === 'production') {
		// Log SSL usage
		console.log('Securely using https protocol');

		// Load SSL key and certificate
		var privateKey = fs.readFileSync('./app/server/config/sslcerts/key.pem', 'utf8');
		var certificate = fs.readFileSync('./app/server/config/sslcerts/cert.pem', 'utf8');

		// Create HTTPS Server
		var httpsServer = https.createServer({
			key: privateKey,
			cert: certificate
		}, app);

		// Return HTTPS server instance
		return httpsServer;
	}

	// Return Express server instance
	return app;
};