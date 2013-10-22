/*!
 * The Application module is responsible for attaching other modules to an Loopback application.
 */
var path = require('path');
var loopback = require('loopback');
var ecstatic = require('ecstatic');
var config = require('./config');
var app = loopback();
var transports = config.transports || [];
var started = new Date();

/**
 * If we've defined transports for remoting, attach those to the Application.
 */
transports.forEach(function (name) {
  var fn = loopback[name];

  if (typeof fn === 'function') {
    app.use(fn.call(loopback));
  } else {
    console.error('Invalid transport: %s', name);
  }
});

/**
 * Start the server.
 */
var port = process.env.PORT || config.port || 3000;
var hostname = process.env.HOSTNAME || process.env.HOST || process.env.IP || config.hostname || '0.0.0.0';
var server = app.listen(port, hostname, function (err) {
  if (err) {
    console.error('Failed to start daily-dozen.');
    console.error(err.stack || err.message || err);
    process.exit(1);
  }

  var info = server.address();
  var base = 'http://' + info.address + ':' + info.port;

  console.log('daily-dozen running at %s.', base);
  console.log('To see the available routes, open %s/routes', base);
});

/**
 * Favicon!
 */
app.use(loopback.favicon(path.resolve(__dirname, '..', '..', 'client', 'favicon.ico')));

/**
 * Serve static client.
 */
app.use(ecstatic({
  root: path.resolve(__dirname, '..', '..', 'client')
}));

/*!
 * Export `app` for use in other modules.
 */
module.exports = app;
