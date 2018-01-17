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
		session 				 = require('express-session'),
		MongoStore 			 = require('connect-mongo')(session),
		cookieParser 		 = require('cookie-parser');

module.exports.initMiddleware = function (app) {
  // Allow cross origin
	app.use(cors());

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function (req, res) {
			return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(express.static(path.resolve('./public')));
	app.use(express.static(path.resolve('./dist')));
	app.set('view engine', 'html');
	app.use(cookieParser());

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
};

// Initialize error route
module.exports.initErrorRoutes = function (app) {
	// Assume 'not found' in the error msgs is a 404.
	app.use(function(err, req, res, next) {
		if (!err) return next();
		// Error page
		res.status(500).send('Error Please see log for details.');
	});

	// Assume 404 since no middleware responded
	app.use(function(err, req, res, next) {
		if (!err) return next();
		res.status(404).send('Uknown Error');
	});
};

// Express MongoDB session storage
module.exports.initSession = function (app, db) {
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.session.secret,
		cookie: config.session.cookie,
		name: config.session.name,
		store: new MongoStore({
			mongooseConnection: db
		})
	}));
};

// Globing routes files
module.exports.initServerRoutes = function (app) {
	config.getGlobbedFiles(asset.server.routes).forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});
};

//return client index.html with response
module.exports.initClientHomePage = function (app) {
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
};


/**
 * Initialize the Express application
 */
module.exports.init = function(db) {
	var app = express();
	// Initialize middleware
	this.initMiddleware(app);

	// Initialize session
	this.initSession(app, db);

	//Bootstrap passport config
	require('./auth/passport.server.config')(app);

	// Showing stack errors
	app.set('showStackError', true);

	// Initialize models
	//this.initServerModels();


	// Initialize routes
	this.initServerRoutes(app);

  //app.set('json spaces', 2);

	// Initialize error routes
	this.initErrorRoutes(app);

	// Initialize client home page. should call at the end
	this.initClientHomePage(app);

	if (process.env.NODE_ENV === 'production') {
		// Create HTTPS Server
		var httpsServer = https.createServer({
			key: 'privateKey',
			cert: 'certificate'
		}, app);

		// Return HTTPS server instance
		return httpsServer;
	}

	// Return Express server instance
	return app;
};