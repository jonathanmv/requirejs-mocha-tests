require.config({
  baseUrl: 'src/',
  paths: {
    mocha: '../bower_components/mocha/mocha',
    chai: '../bower_components/chai/chai'
  },
  shim: {
    mocha: {
      exports: 'mocha'
    },
    chai: {
      exports: 'chai'
    }
  },
  urlArgs: 'v=' + (new Date()).getTime()
});

require([
  'require',
  'mocha',
  'chai'
], function (require, mocha, chai) {

  mocha.setup('bdd');

  assert = chai.assert;
  should = chai.should();
  expect = chai.expect;

  require([
    // Specify tests in here
    '../spec/queryInterpreterTest'
  ], function () {
    mocha.run();
  });

});
