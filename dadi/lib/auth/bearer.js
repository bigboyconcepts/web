var config = require(__dirname + '/../../../config.js');
var help = require(__dirname + '/../help');
var log = require(__dirname + '/../log');
var Passport = require(__dirname + '/../../../../passport/node/src'); // !!! TODO: Replace with NPM

var BearerAuthStrategy = function(options) {
  this.config = options;
  this.tokenRoute = options.tokenUrl || '/token';
  this.token = {};
};

// All auth strategies must announce its type via a `getType()` method,
// so other components upstream can make decisions accordingly.
BearerAuthStrategy.prototype.getType = function () {
  return 'bearer';
};

BearerAuthStrategy.prototype.getToken = function (datasource, done) {
  var strategy = datasource.authStrategy.config;

  Passport({
    issuer: {
      uri: (strategy.protocol || 'http') + '://' + strategy.host,
      port: strategy.port,
      endpoint: strategy.tokenUrl
    },
    credentials: strategy.credentials,
    wallet: 'file',
    walletOptions: {
      path: config.get('paths.tokenWallet') + '/' + help.generateTokenWalletFilename(strategy.host, strategy.port, strategy.credentials.clientId)
    }
  }).then(function (bearerToken) {
    return done(null, bearerToken);
  }).catch(function (errorData) {
    var err = new Error();
    err.name = errorData.title;
    err.message = errorData.detail;
    err.remoteIp = options.issuer.uri;
    err.remotePort = options.issuer.port;
    err.path = options.issuer.endpoint;

    return done(err);
  });
};

module.exports = function (options) {
  return new BearerAuthStrategy(options);
};

module.exports.BearerAuthStrategy = BearerAuthStrategy;
