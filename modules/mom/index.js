/*!
 * A CRUD-capable model.
 */
var loopback = require('loopback');
var properties = require('./properties');
var config = require('./config');
var mom = loopback.User.extend('mom', properties, config);
var applications = config.applications || [];

if (config['data-source']) {
  mom.attachTo(require('../' + config['data-source']));
}

applications.forEach(function (name) {
  var app = require('../' + name);
  app.model(mom);
});

module.exports = mom;
