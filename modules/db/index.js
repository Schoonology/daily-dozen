/*!
 * An in-memory DataSource for development.
 */
var loopback = require('loopback');
var mongoConn = require('loopback-connector-mongodb');

module.exports = loopback.createDataSource({
  connector: mongoConn
});
