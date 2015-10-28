var path = require('path');
var should = require('should');
var sinon = require('sinon');
var log = require(__dirname + '/../../bantam/lib/log');
var help = require(__dirname + '/help');
var config = require(path.resolve(__dirname + '/../../config.js'));

describe('Logger', function (done) {

  it('should export a `debug()` function', function (done) {
    log.debug.should.be.Function;
    done();
  });

  it('should export a `stage()` function', function (done) {
    log.stage.should.be.Function;
    done();
  });

  it('should export a `prod()` function', function (done) {
    log.prod.should.be.Function;
    done();
  });

  it('should use bunyan log.debug when log.debug is called', function (done) {

    var message = 'Hello';
    
    var logger = log.get();
    var method = sinon.spy(logger, 'debug');
    
    log.debug(message);
    logger.debug.restore();

    method.called.should.eql(true);

    done();
  });

  it('should use bunyan log.info when log.stage is called', function (done) {

    var message = 'Hello';
    
    var logger = log.get();
    var method = sinon.spy(logger, 'info');
    
    log.stage(message);
    logger.info.restore();

    method.called.should.eql(true);

    done();
  });

  it('should use bunyan log.info when log.prod is called', function (done) {

    var message = 'Hello';
    
    var logger = log.get();
    var method = sinon.spy(logger, 'info');
    
    log.prod(message);
    logger.info.restore();

    method.called.should.eql(true);

    done();
  });

});